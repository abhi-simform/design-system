import * as React from "react"

interface FloatingWindowPositionConfig {
  top?: number
  left?: number
  right?: number
  bottom?: number
}

interface FloatingWindowPosition {
  x: number
  y: number
}

interface UseFloatingWindowOptions {
  /** If `false`, the element cannot be dragged. */
  enabled?: boolean
  /** If `true`, the element can only move within the current viewport boundaries. */
  constrainToViewport?: boolean
  /** The offset from the viewport edges when constraining the element. Requires `constrainToViewport: true`. */
  constrainOffset?: number
  /** Selector of an element that should be used to drag the floating window. If not specified, the entire root element is the drag target. */
  dragHandleSelector?: string
  /** Selector of an element within `dragHandleSelector` that should be excluded from the drag event. */
  excludeDragHandleSelector?: string
  /** If set, restricts movement to the specified axis. */
  axis?: "x" | "y"
  /** Initial position. If not set, calculated from element styles. */
  initialPosition?: FloatingWindowPositionConfig
  /** Called when the element position changes. */
  onPositionChange?: (position: FloatingWindowPosition) => void
  /** Called when the drag starts. */
  onDragStart?: () => void
  /** Called when the drag stops. */
  onDragEnd?: () => void
}

type SetFloatingWindowPosition = (
  position: FloatingWindowPositionConfig,
) => void

interface UseFloatingWindowReturnValue<T extends HTMLElement> {
  ref: React.RefCallback<T | null>
  setPosition: SetFloatingWindowPosition
  isDragging: boolean
}

function useRefValue<T>(value: T) {
  const ref = React.useRef(value)
  React.useEffect(() => {
    ref.current = value
  })
  return ref
}

function px(value: string) {
  return value.endsWith("px") ? parseFloat(value) : 0
}

function clampToViewport(
  x: number,
  y: number,
  el: HTMLElement,
  offset = 0,
): FloatingWindowPosition {
  const rect = el.getBoundingClientRect()
  const maxX = window.innerWidth - rect.width - offset
  const maxY = window.innerHeight - rect.height - offset

  return {
    x: Math.min(Math.max(offset, x), maxX),
    y: Math.min(Math.max(offset, y), maxY),
  }
}

function calculateInitialPosition(
  el: HTMLElement,
  options: UseFloatingWindowOptions,
): FloatingWindowPosition {
  const rect = el.getBoundingClientRect()
  const offset = options.constrainOffset ?? 0
  const winW = window.innerWidth
  const winH = window.innerHeight
  const style = window.getComputedStyle(el)
  const { top, left, right, bottom } = options.initialPosition ?? {}

  let x: number
  if (left != null) x = left
  else if (right != null) x = winW - rect.width - right
  else x = px(style.left) || winW - rect.width - px(style.right) || offset

  let y: number
  if (top != null) y = top
  else if (bottom != null) y = winH - rect.height - bottom
  else y = px(style.top) || winH - rect.height - px(style.bottom) || offset

  return options.constrainToViewport
    ? clampToViewport(x, y, el, options.constrainOffset)
    : { x, y }
}

function getConstrainedPosition(
  el: HTMLElement,
  pos: FloatingWindowPosition,
  options: UseFloatingWindowOptions,
) {
  if (!options.constrainToViewport) return pos

  const rect = el.getBoundingClientRect()
  const offset = options.constrainOffset ?? 0
  const maxX = window.innerWidth - rect.width - offset
  const maxY = window.innerHeight - rect.height - offset

  return {
    x: Math.min(Math.max(offset, pos.x), maxX),
    y: Math.min(Math.max(offset, pos.y), maxY),
  }
}

function matchesExcludeSelector(target: Node, excludeSelector?: string) {
  if (!excludeSelector) return false
  if (!(target instanceof Element)) return false
  return Boolean(target.closest(excludeSelector))
}

function getHandle(
  el: HTMLElement,
  target: EventTarget | null,
  options: UseFloatingWindowOptions,
) {
  if (!(target instanceof Node)) return false

  if (!options.dragHandleSelector)
    return !matchesExcludeSelector(target, options.excludeDragHandleSelector)

  const handles = Array.from(el.querySelectorAll(options.dragHandleSelector))
  return handles.some(
    (handle) =>
      handle.contains(target) &&
      !matchesExcludeSelector(target, options.excludeDragHandleSelector),
  )
}

function useFloatingWindow<T extends HTMLElement>(
  options: UseFloatingWindowOptions = {},
): UseFloatingWindowReturnValue<T> {
  const [element, setElement] = React.useState<T | null>(null)
  const ref = React.useRef<T>(null)
  const pos = React.useRef({ x: 0, y: 0 })
  const offset = React.useRef({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const isDraggingRef = React.useRef(false)
  const initialized = React.useRef(false)
  const enabledRef = useRefValue(options.enabled)
  const onPositionChangeRef = useRefValue(options.onPositionChange)
  const onDragStartRef = useRefValue(options.onDragStart)
  const onDragEndRef = useRefValue(options.onDragEnd)

  const setDragging = React.useCallback((value: boolean) => {
    setIsDragging(value)
    isDraggingRef.current = value
  }, [])

  const assignRef = React.useCallback((node: T | null) => {
    ref.current = node
    setElement(node)
  }, [])

  React.useEffect(() => {
    const el = ref.current
    if (!initialized.current && el) {
      initialized.current = true
      pos.current = calculateInitialPosition(el, options)
      el.style.left = `${pos.current.x}px`
      el.style.top = `${pos.current.y}px`
      el.style.right = "unset"
      el.style.bottom = "unset"
    }

    return () => {
      initialized.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    element,
    options.constrainOffset,
    options.initialPosition?.top,
    options.initialPosition?.left,
    options.initialPosition?.right,
    options.initialPosition?.bottom,
    options.constrainToViewport,
  ])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const controller = new AbortController()
    const { signal } = controller

    const onStart = (e: MouseEvent | TouchEvent) => {
      if (enabledRef.current === false) return

      const point = "touches" in e ? e.touches[0] : e
      if ("button" in e && e.button !== 0) return
      if (!getHandle(el, e.target, options)) return

      setDragging(true)
      document.body.style.userSelect = "none"
      document.body.style.webkitUserSelect = "none"

      const rect = el.getBoundingClientRect()
      offset.current = {
        x: point.clientX - rect.left,
        y: point.clientY - rect.top,
      }

      onDragStartRef.current?.()

      document.addEventListener("mousemove", onMove, { signal })
      document.addEventListener("mouseup", onEnd, { signal })
      document.addEventListener("touchmove", onMove, { signal, passive: false })
      document.addEventListener("touchend", onEnd, { signal })
      document.addEventListener("touchcancel", onEnd, { signal })
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return

      const point = "touches" in e ? e.touches[0] : e
      e.preventDefault()

      let x = point.clientX - offset.current.x
      let y = point.clientY - offset.current.y

      const constrained = getConstrainedPosition(el, { x, y }, options)
      if (options.axis === "x") {
        x = constrained.x
        y = pos.current.y
      } else if (options.axis === "y") {
        x = pos.current.x
        y = constrained.y
      } else {
        x = constrained.x
        y = constrained.y
      }

      pos.current = { x, y }

      if (ref.current) {
        ref.current.style.left = `${x}px`
        ref.current.style.top = `${y}px`
      }

      onPositionChangeRef.current?.({ x, y })
    }

    const onEnd = () => {
      if (!isDraggingRef.current) return

      setDragging(false)
      document.body.style.userSelect = ""
      document.body.style.webkitUserSelect = ""
      onDragEndRef.current?.()
    }

    el.addEventListener("mousedown", onStart, { signal })
    el.addEventListener("touchstart", onStart, { signal, passive: false })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    options.constrainToViewport,
    options.constrainOffset,
    options.dragHandleSelector,
    options.axis,
    options.initialPosition?.top,
    options.initialPosition?.left,
    options.initialPosition?.right,
    options.initialPosition?.bottom,
    element,
  ])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new ResizeObserver(() => {
      const constrained = getConstrainedPosition(el, pos.current, options)
      pos.current = constrained
      el.style.left = `${constrained.x}px`
      el.style.top = `${constrained.y}px`
    })

    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.constrainToViewport, options.constrainOffset])

  const setPosition = React.useCallback<SetFloatingWindowPosition>(
    (position) => {
      const el = ref.current
      if (!el) return

      const offsetValue = options.constrainOffset ?? 0
      const rect = el.getBoundingClientRect()

      let x: number | undefined
      let y: number | undefined

      if (position.left != null) x = position.left
      else if (position.right != null)
        x = window.innerWidth - rect.width - position.right

      if (position.top != null) y = position.top
      else if (position.bottom != null)
        y = window.innerHeight - rect.height - position.bottom

      x = x ?? pos.current.x
      y = y ?? pos.current.y

      if (options.constrainToViewport) {
        const clamped = clampToViewport(x, y, el, offsetValue)
        x = clamped.x
        y = clamped.y
      }

      pos.current = { x, y }
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      onPositionChangeRef.current?.({ x, y })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.constrainToViewport, options.constrainOffset],
  )

  return { ref: assignRef, setPosition, isDragging }
}

export { useFloatingWindow }
export type {
  UseFloatingWindowOptions,
  UseFloatingWindowReturnValue,
  FloatingWindowPosition,
  FloatingWindowPositionConfig,
  SetFloatingWindowPosition,
}
