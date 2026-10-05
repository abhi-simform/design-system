"use client"

import * as React from "react"
import { cn } from "cn"

import { Box } from "@/components/ui/box"
import { Paper } from "@/components/ui/paper"
import { OptionalPortal } from "@/components/ui/portal"
import type { PortalProps } from "@/components/ui/portal"
import { useFloatingWindow } from "@/hooks/use-floating-window"
import type {
  SetFloatingWindowPosition,
  UseFloatingWindowOptions,
} from "@/hooks/use-floating-window"

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.RefObject<T | null>).current = node
    }
  }
}

interface FloatingWindowDimensions {
  /** Initial width of the floating window in px. */
  initialWidth?: number
  /** Minimum width of the floating window in px. */
  minWidth?: number
  /** Maximum width of the floating window in px. */
  maxWidth?: number
  /** Initial height of the floating window in px. */
  initialHeight?: number
  /** Minimum height of the floating window in px. */
  minHeight?: number
  /** Maximum height of the floating window in px. */
  maxHeight?: number
}

interface FloatingWindowSize {
  width: number
  height: number
}

interface FloatingWindowContextValue {
  rootRef: React.RefObject<HTMLDivElement | null>
  dimensions: FloatingWindowDimensions | undefined
  constrainToViewport: boolean | undefined
  constrainOffset: number | undefined
  onResizeStart: (() => void) | undefined
  onResizeEnd: (() => void) | undefined
  onSizeChange: ((size: FloatingWindowSize) => void) | undefined
}

const FloatingWindowContext =
  React.createContext<FloatingWindowContextValue | null>(null)

function useFloatingWindowContext() {
  const context = React.useContext(FloatingWindowContext)
  if (!context) {
    throw new Error(
      "FloatingWindow.ResizeHandle must be used within a FloatingWindow.",
    )
  }
  return context
}

function clampDimension(
  value: number,
  min: number | undefined,
  max: number | undefined,
  viewportMax?: number,
) {
  let v = value
  if (min != null) v = Math.max(v, min)
  if (max != null) v = Math.min(v, max)
  if (viewportMax != null) v = Math.min(v, viewportMax)
  return v
}

type FloatingWindowProps = Omit<
  React.ComponentProps<typeof Paper>,
  keyof UseFloatingWindowOptions
> &
  UseFloatingWindowOptions & {
    /** Ref that receives a function to set the window's position programmatically. */
    setPositionRef?: React.Ref<SetFloatingWindowPosition>
    /** Determines whether the window is rendered inside a `Portal`. @default true */
    withinPortal?: boolean
    /** Props passed down to the `Portal` component. Ignored when `withinPortal` is `false`. */
    portalProps?: Omit<PortalProps, "children">
    /** Root element `z-index`. @default 400 */
    zIndex?: React.CSSProperties["zIndex"]
    /** Dimensions configuration for a resizable floating window, paired with `FloatingWindow.ResizeHandle`. */
    dimensions?: FloatingWindowDimensions
    /** Called when the window is resized with `FloatingWindow.ResizeHandle`. */
    onSizeChange?: (size: FloatingWindowSize) => void
    /** Called when a pointer resize with `FloatingWindow.ResizeHandle` starts. Not called for keyboard resize. */
    onResizeStart?: () => void
    /** Called when a pointer resize with `FloatingWindow.ResizeHandle` stops. Not called for keyboard resize. */
    onResizeEnd?: () => void
  }

function FloatingWindow({
  enabled,
  constrainToViewport = true,
  constrainOffset,
  dragHandleSelector,
  excludeDragHandleSelector,
  axis,
  initialPosition,
  onPositionChange,
  onDragStart,
  onDragEnd,
  setPositionRef,
  withinPortal = true,
  portalProps,
  zIndex = 400,
  dimensions,
  onSizeChange,
  onResizeStart,
  onResizeEnd,
  className,
  style,
  ref,
  ...props
}: FloatingWindowProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)

  const floatingWindow = useFloatingWindow<HTMLDivElement>({
    enabled,
    constrainToViewport,
    constrainOffset,
    dragHandleSelector,
    excludeDragHandleSelector,
    axis,
    initialPosition,
    onPositionChange,
    onDragStart,
    onDragEnd,
  })

  React.useImperativeHandle(setPositionRef, () => floatingWindow.setPosition, [
    floatingWindow.setPosition,
  ])

  const mergedRef = React.useMemo(
    () => mergeRefs(floatingWindow.ref, rootRef, ref),
    [floatingWindow.ref, ref],
  )

  const width =
    dimensions?.initialWidth != null
      ? clampDimension(
          dimensions.initialWidth,
          dimensions.minWidth,
          dimensions.maxWidth,
        )
      : undefined
  const height =
    dimensions?.initialHeight != null
      ? clampDimension(
          dimensions.initialHeight,
          dimensions.minHeight,
          dimensions.maxHeight,
        )
      : undefined

  return (
    <FloatingWindowContext.Provider
      value={{
        rootRef,
        dimensions,
        constrainToViewport,
        constrainOffset,
        onSizeChange,
        onResizeStart,
        onResizeEnd,
      }}
    >
      <OptionalPortal withinPortal={withinPortal} {...portalProps}>
        <Paper
          data-slot="floating-window"
          data-dragging={floatingWindow.isDragging || undefined}
          ref={mergedRef}
          className={cn("fixed", className)}
          style={{
            zIndex,
            width: width != null ? `${width}px` : undefined,
            height: height != null ? `${height}px` : undefined,
            ...style,
          }}
          {...props}
        />
      </OptionalPortal>
    </FloatingWindowContext.Provider>
  )
}

const KEYBOARD_STEP = 10

function getViewportLimits(
  rect: DOMRect,
  constrainToViewport: boolean | undefined,
  constrainOffset: number | undefined,
) {
  if (!constrainToViewport) return { maxWidth: undefined, maxHeight: undefined }
  const offset = constrainOffset ?? 0
  return {
    maxWidth: window.innerWidth - rect.left - offset,
    maxHeight: window.innerHeight - rect.top - offset,
  }
}

type FloatingWindowResizeHandleProps = Omit<
  React.ComponentProps<typeof Box>,
  "role"
>

function FloatingWindowResizeHandle({
  className,
  ref,
  ...props
}: FloatingWindowResizeHandleProps) {
  const ctx = useFloatingWindowContext()
  const handleRef = React.useRef<HTMLDivElement>(null)
  const ctxRef = React.useRef(ctx)
  React.useEffect(() => {
    ctxRef.current = ctx
  })
  const valueNowRef = React.useRef<number | null>(null)
  const mergedRef = React.useMemo(() => mergeRefs(ref, handleRef), [ref])

  const hasWidth =
    ctx.dimensions?.initialWidth != null ||
    ctx.dimensions?.minWidth != null ||
    ctx.dimensions?.maxWidth != null
  const hasHeight =
    ctx.dimensions?.initialHeight != null ||
    ctx.dimensions?.minHeight != null ||
    ctx.dimensions?.maxHeight != null

  React.useEffect(() => {
    const handle = handleRef.current
    if (!handle) return

    const controller = new AbortController()
    const { signal } = controller
    let isResizing = false
    let startX = 0
    let startY = 0
    let startWidth = 0
    let startHeight = 0

    const applySize = (width: number | null, height: number | null) => {
      if (width === null && height === null) return

      const { dimensions, constrainToViewport, constrainOffset, onSizeChange } =
        ctxRef.current
      const root = ctxRef.current.rootRef.current
      if (!root) return

      const rect = root.getBoundingClientRect()
      const viewportLimits = getViewportLimits(
        rect,
        constrainToViewport,
        constrainOffset,
      )

      if (width !== null) {
        const nextWidth = clampDimension(
          width,
          dimensions?.minWidth,
          dimensions?.maxWidth,
          viewportLimits.maxWidth,
        )
        root.style.width = `${nextWidth}px`
      }

      if (height !== null) {
        const nextHeight = clampDimension(
          height,
          dimensions?.minHeight,
          dimensions?.maxHeight,
          viewportLimits.maxHeight,
        )
        root.style.height = `${nextHeight}px`
      }

      const resizedRect = root.getBoundingClientRect()

      if (width !== null) {
        valueNowRef.current = resizedRect.width
        handle.setAttribute(
          "aria-valuenow",
          String(Math.round(resizedRect.width)),
        )
      }

      onSizeChange?.({ width: resizedRect.width, height: resizedRect.height })
    }

    const onStart = (e: MouseEvent | TouchEvent) => {
      if ("button" in e && e.button !== 0) return

      e.stopPropagation()
      e.preventDefault()

      if (!hasWidth && !hasHeight) return

      const root = ctxRef.current.rootRef.current
      if (!root) return

      const point = "touches" in e ? e.touches[0] : e
      startX = point.clientX
      startY = point.clientY
      const rect = root.getBoundingClientRect()
      startWidth = rect.width
      startHeight = rect.height
      isResizing = true

      document.body.style.userSelect = "none"
      document.body.style.webkitUserSelect = "none"

      ctxRef.current.onResizeStart?.()

      document.addEventListener("mousemove", onMove, { signal })
      document.addEventListener("mouseup", onEnd, { signal })
      document.addEventListener("touchmove", onMove, { signal, passive: false })
      document.addEventListener("touchend", onEnd, { signal })
      document.addEventListener("touchcancel", onEnd, { signal })
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isResizing) return

      e.preventDefault()
      const point = "touches" in e ? e.touches[0] : e
      const deltaX = point.clientX - startX
      const deltaY = point.clientY - startY
      applySize(
        hasWidth ? startWidth + deltaX : null,
        hasHeight ? startHeight + deltaY : null,
      )
    }

    const onEnd = () => {
      if (!isResizing) return

      isResizing = false
      document.body.style.userSelect = ""
      document.body.style.webkitUserSelect = ""
      ctxRef.current.onResizeEnd?.()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const { dimensions } = ctxRef.current
      const root = ctxRef.current.rootRef.current
      if (!root) return

      const rect = root.getBoundingClientRect()
      let newWidth: number | null = null
      let newHeight: number | null = null

      if (e.key === "ArrowRight" && hasWidth)
        newWidth = rect.width + KEYBOARD_STEP
      else if (e.key === "ArrowLeft" && hasWidth)
        newWidth = rect.width - KEYBOARD_STEP
      else if (e.key === "ArrowDown" && hasHeight)
        newHeight = rect.height + KEYBOARD_STEP
      else if (e.key === "ArrowUp" && hasHeight)
        newHeight = rect.height - KEYBOARD_STEP
      else if (e.key === "Home") {
        if (hasWidth) newWidth = dimensions?.minWidth ?? rect.width
        if (hasHeight) newHeight = dimensions?.minHeight ?? rect.height
      } else if (e.key === "End") {
        if (hasWidth) newWidth = dimensions?.maxWidth ?? rect.width
        if (hasHeight) newHeight = dimensions?.maxHeight ?? rect.height
      }

      if (newWidth !== null || newHeight !== null) {
        e.preventDefault()
        applySize(newWidth, newHeight)
      }
    }

    handle.addEventListener("mousedown", onStart, { signal })
    handle.addEventListener("touchstart", onStart, { signal, passive: false })
    handle.addEventListener("keydown", onKeyDown, { signal })

    return () => {
      onEnd()
      controller.abort()
    }
  }, [hasWidth, hasHeight])

  React.useEffect(() => {
    const handle = handleRef.current
    if (!handle) return

    if (!hasWidth) {
      valueNowRef.current = null
      handle.removeAttribute("aria-valuenow")
      return
    }

    if (valueNowRef.current !== null) return

    const initialWidth = ctx.dimensions?.initialWidth
    if (initialWidth == null) {
      handle.removeAttribute("aria-valuenow")
      return
    }

    const width = clampDimension(
      initialWidth,
      ctx.dimensions?.minWidth,
      ctx.dimensions?.maxWidth,
    )
    handle.setAttribute("aria-valuenow", String(Math.round(width)))
  }, [
    hasWidth,
    ctx.dimensions?.initialWidth,
    ctx.dimensions?.minWidth,
    ctx.dimensions?.maxWidth,
  ])

  return (
    <Box
      data-slot="floating-window-resize-handle"
      role="separator"
      aria-label="Resize window"
      aria-valuemin={ctx.dimensions?.minWidth}
      aria-valuemax={ctx.dimensions?.maxWidth}
      tabIndex={0}
      ref={mergedRef}
      className={cn("touch-none", className)}
      {...props}
    />
  )
}

const FloatingWindowNamespace = Object.assign(FloatingWindow, {
  ResizeHandle: FloatingWindowResizeHandle,
})

export { FloatingWindowNamespace as FloatingWindow, FloatingWindowResizeHandle }
export type {
  FloatingWindowProps,
  FloatingWindowResizeHandleProps,
  FloatingWindowDimensions,
  FloatingWindowSize,
}
