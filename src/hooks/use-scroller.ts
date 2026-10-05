import * as React from "react"

type ScrollerScrollState = {
  canScrollStart: boolean
  canScrollEnd: boolean
}

type UseScrollerOptions = {
  scrollAmount?: number
  draggable?: boolean
  onScrollStateChange?: (state: ScrollerScrollState) => void
}

function useScroller<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollerOptions = {},
) {
  const { scrollAmount = 200, draggable = true, onScrollStateChange } = options

  const containerRef = React.useRef<T | null>(null)
  const [canScrollStart, setCanScrollStart] = React.useState(false)
  const [canScrollEnd, setCanScrollEnd] = React.useState(false)
  const [isDragging, setIsDragging] = React.useState(false)

  const isDraggingRef = React.useRef(false)
  const hasDraggedRef = React.useRef(false)
  const startX = React.useRef(0)
  const scrollLeftStart = React.useRef(0)

  const onScrollStateChangeRef = React.useRef(onScrollStateChange)
  React.useEffect(() => {
    onScrollStateChangeRef.current = onScrollStateChange
  })

  const updateScrollState = React.useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const { scrollLeft, scrollWidth, clientWidth } = container
    const isRtl = getComputedStyle(container).direction === "rtl"

    const nextStart = isRtl ? scrollLeft < -1 : scrollLeft > 1
    const nextEnd = isRtl
      ? scrollLeft > -(scrollWidth - clientWidth) + 1
      : scrollLeft < scrollWidth - clientWidth - 1

    setCanScrollStart(nextStart)
    setCanScrollEnd(nextEnd)
    onScrollStateChangeRef.current?.({
      canScrollStart: nextStart,
      canScrollEnd: nextEnd,
    })
  }, [])

  const scroll = React.useCallback(
    (direction: "start" | "end") => {
      const container = containerRef.current
      if (!container) return
      const isRtl = getComputedStyle(container).direction === "rtl"
      const delta = direction === "end" ? scrollAmount : -scrollAmount
      container.scrollBy({
        left: isRtl ? -delta : delta,
        behavior: "smooth",
      })
    },
    [scrollAmount],
  )

  const scrollStart = React.useCallback(() => scroll("start"), [scroll])
  const scrollEnd = React.useCallback(() => scroll("end"), [scroll])

  const onMouseDown = React.useCallback(
    (event: React.MouseEvent) => {
      if (!draggable) return
      const container = containerRef.current
      if (!container) return
      isDraggingRef.current = true
      hasDraggedRef.current = false
      setIsDragging(true)
      startX.current = event.pageX - container.offsetLeft
      scrollLeftStart.current = container.scrollLeft
      container.style.cursor = "grabbing"
      container.style.userSelect = "none"
    },
    [draggable],
  )

  const onMouseMove = React.useCallback((event: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    event.preventDefault()
    const container = containerRef.current
    if (!container) return
    const walk = event.pageX - container.offsetLeft - startX.current
    if (Math.abs(walk) > 5) hasDraggedRef.current = true
    container.scrollLeft = scrollLeftStart.current - walk
  }, [])

  const onMouseUp = React.useCallback(() => {
    const wasDragged = hasDraggedRef.current
    isDraggingRef.current = false
    hasDraggedRef.current = false
    setIsDragging(false)
    const container = containerRef.current
    if (!container) return
    container.style.cursor = ""
    container.style.userSelect = ""
    if (wasDragged) {
      const suppressClick = (event: MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()
        container.removeEventListener("click", suppressClick, true)
      }
      container.addEventListener("click", suppressClick, true)
    }
  }, [])

  const onMouseLeave = React.useCallback(() => {
    if (isDraggingRef.current) onMouseUp()
  }, [onMouseUp])

  const attachContainer = React.useCallback(
    (node: T | null) => {
      const previous = containerRef.current
      if (previous && previous !== node) {
        previous.removeEventListener("scroll", updateScrollState)
      }
      containerRef.current = node
      if (node) {
        node.addEventListener("scroll", updateScrollState)
        updateScrollState()
      }
    },
    [updateScrollState],
  )

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new ResizeObserver(updateScrollState)
    observer.observe(container)
    return () => observer.disconnect()
  }, [updateScrollState])

  return {
    attachContainer,
    canScrollStart,
    canScrollEnd,
    scrollStart,
    scrollEnd,
    isDragging,
    dragHandlers: { onMouseDown, onMouseMove, onMouseUp, onMouseLeave },
  }
}

export { useScroller }
export type { ScrollerScrollState, UseScrollerOptions }
