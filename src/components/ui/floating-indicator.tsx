"use client"

import * as React from "react"

import { cn } from "cn"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

interface FloatingIndicatorProps extends React.ComponentProps<"div"> {
  /**
   * Target element over which the indicator is displayed. The indicator is
   * positioned to match the target's size and position.
   */
  target: HTMLElement | null | undefined
  /**
   * Parent container element — must have `position: relative` — that the
   * indicator's position is calculated relative to.
   */
  parent: HTMLElement | null | undefined
  /** Transition duration in ms. @default 150 */
  transitionDuration?: number | string
  /**
   * Hides the indicator until the parent's own CSS transition ends. Set this
   * when `parent` has an entrance transition of its own (e.g. a dialog that
   * scales or fades in) so the indicator can't flash at a stale position
   * while the parent is still animating into place.
   * @default false
   */
  displayAfterTransitionEnd?: boolean
  /** Called when the indicator starts transitioning to a new position. */
  onTransitionStart?: () => void
  /** Called when the indicator finishes transitioning to a new position. */
  onTransitionEnd?: () => void
}

function isDescendant(ancestor: EventTarget | null, node: HTMLElement | null) {
  if (!node || !ancestor) return false
  let current: ParentNode | null = node.parentNode
  while (current !== null) {
    if (current === ancestor) return true
    current = current.parentNode
  }
  return false
}

function toInt(value: string) {
  return value ? Number.parseInt(value, 10) : 0
}

function setRef<T>(ref: React.Ref<T> | null | undefined, value: T) {
  if (typeof ref === "function") {
    ref(value)
  } else if (ref !== null && ref !== undefined) {
    ;(ref as React.RefObject<T | null>).current = value
  }
}

function FloatingIndicator({
  ref,
  target,
  parent,
  transitionDuration = 150,
  displayAfterTransitionEnd = false,
  onTransitionStart,
  onTransitionEnd,
  className,
  style,
  ...props
}: FloatingIndicatorProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const innerRef = React.useRef<HTMLDivElement>(null)
  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      setRef(ref, node)
      setRef(innerRef, node)
    },
    [ref],
  )

  const [initialized, setInitialized] = React.useState(false)
  const [hidden, setHidden] = React.useState(displayAfterTransitionEnd)
  const previousTarget = React.useRef(target)
  const transitionTimeoutRef = React.useRef(-1)

  const updatePosition = React.useCallback(() => {
    const node = innerRef.current
    if (!target || !parent || !node) return

    const targetRect = target.getBoundingClientRect()
    const parentRect = parent.getBoundingClientRect()

    const scaleX =
      parent.offsetWidth === 0 ? 1 : parentRect.width / parent.offsetWidth
    const scaleY =
      parent.offsetHeight === 0 ? 1 : parentRect.height / parent.offsetHeight

    const targetStyle = window.getComputedStyle(target)
    const parentStyle = window.getComputedStyle(parent)

    const borderTop =
      toInt(targetStyle.borderTopWidth) + toInt(parentStyle.borderTopWidth)
    const borderLeft =
      toInt(targetStyle.borderLeftWidth) + toInt(parentStyle.borderLeftWidth)

    const top = (targetRect.top - parentRect.top) / scaleY - borderTop
    const left = (targetRect.left - parentRect.left) / scaleX - borderLeft
    const width = targetRect.width / scaleX
    const height = targetRect.height / scaleY

    node.style.transform = `translateY(${top}px) translateX(${left}px)`
    node.style.width = `${width}px`
    node.style.height = `${height}px`
  }, [target, parent])

  const updatePositionWithoutAnimation = React.useCallback(() => {
    window.clearTimeout(transitionTimeoutRef.current)
    const node = innerRef.current
    if (node) node.style.transitionDuration = "0ms"
    updatePosition()
    transitionTimeoutRef.current = window.setTimeout(() => {
      if (node) node.style.transitionDuration = ""
    }, 30)
  }, [updatePosition])

  React.useEffect(() => {
    if (initialized && previousTarget.current !== target) {
      onTransitionStart?.()
    }
    previousTarget.current = target
    updatePosition()

    if (!target) return undefined

    const targetObserver = new ResizeObserver(updatePositionWithoutAnimation)
    targetObserver.observe(target)

    let parentObserver: ResizeObserver | undefined
    if (parent) {
      parentObserver = new ResizeObserver(updatePositionWithoutAnimation)
      parentObserver.observe(parent)
    }

    return () => {
      targetObserver.disconnect()
      parentObserver?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parent, target])

  React.useEffect(() => {
    if (!parent) return undefined

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (isDescendant(event.target, parent)) {
        updatePositionWithoutAnimation()
        setHidden(false)
      }
    }

    parent.addEventListener("transitionend", handleTransitionEnd)
    return () =>
      parent.removeEventListener("transitionend", handleTransitionEnd)
  }, [parent, updatePositionWithoutAnimation])

  React.useEffect(() => {
    const node = innerRef.current
    if (!node || !onTransitionEnd) return undefined

    const handleIndicatorTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === "transform") onTransitionEnd()
    }

    node.addEventListener("transitionend", handleIndicatorTransitionEnd)
    return () =>
      node.removeEventListener("transitionend", handleIndicatorTransitionEnd)
  }, [onTransitionEnd])

  React.useEffect(() => {
    const id = window.setTimeout(() => setInitialized(true), 20)
    return () => window.clearTimeout(id)
  }, [])

  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "dir"
        ) {
          updatePositionWithoutAnimation()
        }
      }
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    })
    return () => observer.disconnect()
  }, [updatePositionWithoutAnimation])

  if (!target || !parent) return null

  const resolvedDuration = prefersReducedMotion
    ? "0ms"
    : typeof transitionDuration === "number"
      ? `${transitionDuration}ms`
      : transitionDuration || "150ms"

  return (
    <div
      ref={mergedRef}
      data-slot="floating-indicator"
      className={cn(
        "absolute top-0 left-0 z-0 transition-[transform,width,height] ease-in-out",
        initialized ? "duration-(--floating-indicator-duration)" : "duration-0",
        hidden && "hidden",
        className,
      )}
      style={
        {
          ...style,
          "--floating-indicator-duration": resolvedDuration,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { FloatingIndicator }
export type { FloatingIndicatorProps }
