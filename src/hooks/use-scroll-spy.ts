import * as React from "react"

interface ScrollSpyHeadingData {
  /** Heading depth, 1-6 */
  depth: number
  /** Heading text content */
  value: string
  /** Heading id */
  id: string
  /** Resolves the heading's current DOM node */
  getNode: () => HTMLElement
}

interface ScrollSpyOptions {
  /** Selector used to find headings @default "h1, h2, h3, h4, h5, h6" */
  selector?: string
  /** Retrieves a heading's depth @default derived from the tag name */
  getDepth?: (element: HTMLElement) => number
  /** Retrieves a heading's label @default element.textContent */
  getValue?: (element: HTMLElement) => string
  /** Element (or ref to one) that scrolls. Defaults to `window` */
  scrollHost?: HTMLElement | React.RefObject<HTMLElement | null>
  /** Distance from the top of the scroll host used to pick the active heading @default 0 */
  offset?: number
}

interface ScrollSpyReturnValue {
  /** Index of the active heading in `data`, -1 when there are none */
  active: number
  data: ScrollSpyHeadingData[]
  /** True once headings have been read from the DOM */
  initialized: boolean
  /** Re-reads headings from the DOM */
  reinitialize: () => void
}

let idCounter = 0

function resolveHeadingNode(
  heading: HTMLElement,
  selector: string,
  index: number,
) {
  if (heading.isConnected) return heading
  const byId = heading.id ? document.getElementById(heading.id) : null
  if (byId) return byId
  return document.querySelectorAll<HTMLElement>(selector)[index] ?? heading
}

function getDefaultDepth(element: HTMLElement) {
  return Number(element.tagName[1])
}

function getDefaultValue(element: HTMLElement) {
  return element.textContent ?? ""
}

function resolveScrollHost(
  scrollHost: ScrollSpyOptions["scrollHost"],
): HTMLElement | Window {
  if (!scrollHost) return window
  if ("current" in scrollHost) return scrollHost.current ?? window
  return scrollHost
}

function getActiveIndex(
  headings: ScrollSpyHeadingData[],
  host: HTMLElement | Window,
  offset: number,
) {
  if (headings.length === 0) return -1
  const origin =
    host instanceof HTMLElement
      ? host.getBoundingClientRect().top + offset
      : offset
  let index = 0
  let best = Infinity
  headings.forEach((heading, i) => {
    const distance = Math.abs(
      heading.getNode().getBoundingClientRect().y - origin,
    )
    if (distance < best) {
      best = distance
      index = i
    }
  })
  return index
}

function useScrollSpy({
  selector = "h1, h2, h3, h4, h5, h6",
  getDepth = getDefaultDepth,
  getValue = getDefaultValue,
  offset = 0,
  scrollHost,
}: ScrollSpyOptions = {}): ScrollSpyReturnValue {
  const [active, setActive] = React.useState(-1)
  const [initialized, setInitialized] = React.useState(false)
  const [data, setData] = React.useState<ScrollSpyHeadingData[]>([])
  const headingsRef = React.useRef<ScrollSpyHeadingData[]>([])
  const optionsRef = React.useRef({
    getDepth,
    getValue,
    scrollHost,
    offset,
    selector,
  })

  React.useEffect(() => {
    optionsRef.current = { getDepth, getValue, scrollHost, offset, selector }
  })

  const initialize = React.useCallback(() => {
    const options = optionsRef.current
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(options.selector),
    )
    const headings = nodes.map<ScrollSpyHeadingData>((node, index) => ({
      depth: options.getDepth(node),
      value: options.getValue(node),
      id: node.id || `scroll-spy-${(idCounter += 1)}`,
      getNode: () => resolveHeadingNode(node, options.selector, index),
    }))
    headingsRef.current = headings
    setInitialized(true)
    setData(headings)
    setActive(
      getActiveIndex(
        headings,
        resolveScrollHost(options.scrollHost),
        options.offset,
      ),
    )
  }, [])

  React.useEffect(() => {
    // Headings only exist in the DOM after mount, so they must be read in an effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initialize()
    const host = resolveScrollHost(scrollHost)
    const handleScroll = () =>
      setActive(getActiveIndex(headingsRef.current, host, offset))
    host.addEventListener("scroll", handleScroll)
    return () => host.removeEventListener("scroll", handleScroll)
  }, [initialize, scrollHost, selector, offset])

  return { active, data, initialized, reinitialize: initialize }
}

export { useScrollSpy }
export type { ScrollSpyHeadingData, ScrollSpyOptions, ScrollSpyReturnValue }
