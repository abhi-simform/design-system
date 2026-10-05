import * as React from "react"
import { cn } from "cn"

import { useDimensions } from "@/hooks/use-dimensions"

type OverflowListGap = "xs" | "sm" | "md" | "lg" | "xl"
type Phase = "normal" | "measuring" | "measuring-overflow-indicator"

const GAP_CLASSES: Record<OverflowListGap, string> = {
  xs: "gap-2.5",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-5",
  xl: "gap-6",
}

type OverflowListProps<T = unknown> = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  renderOverflow: (items: T[]) => React.ReactNode
  maxRows?: number
  maxVisibleItems?: number
  gap?: OverflowListGap
  collapseFrom?: "start" | "end"
  getItemKey?: (item: T, index: number) => React.Key
}

const useIsomorphicEffect =
  typeof document !== "undefined" ? React.useLayoutEffect : React.useEffect

function setRef<E>(ref: React.Ref<E> | undefined, value: E | null) {
  if (typeof ref === "function") ref(value)
  else if (ref) (ref as React.RefObject<E | null>).current = value
}

function getDataSignature<T>(
  data: T[],
  getItemKey: ((item: T, index: number) => React.Key) | undefined,
) {
  return data
    .map((item, index) => {
      if (getItemKey) return getItemKey(item, index)
      return item !== null &&
        (typeof item === "object" || typeof item === "function")
        ? index
        : String(item)
    })
    .join("\u0000")
}

function getRowPositionsData(
  container: HTMLElement | null,
  overflow: HTMLElement | null,
) {
  if (!container) return null
  const children = (Array.from(container.children) as HTMLElement[]).filter(
    (child) => child !== overflow,
  )
  if (children.length === 0) return null

  const rows: Record<number, { count: number; bottom: number }> = {}
  for (const child of children) {
    const rect = child.getBoundingClientRect()
    const top = Math.round(rect.top)
    const bottom = Math.round(rect.bottom)
    const row = rows[top]
    if (row) {
      row.count += 1
      row.bottom = Math.max(row.bottom, bottom)
    } else {
      rows[top] = { count: 1, bottom }
    }
  }

  return { rows, rowPositions: Object.keys(rows).map(Number), children }
}

function OverflowList<T = unknown>({
  data,
  renderItem,
  renderOverflow,
  maxRows = 1,
  maxVisibleItems = Infinity,
  gap = "xs",
  collapseFrom = "end",
  getItemKey,
  className,
  ref,
  ...props
}: OverflowListProps<T>) {
  const [visibleCount, setVisibleCount] = React.useState(data.length)
  const [subtractCount, setSubtractCount] = React.useState(0)
  const [phase, setPhase] = React.useState<Phase>("normal")

  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const overflowRef = React.useRef<HTMLElement | null>(null)
  const dimensions = useDimensions(containerRef)

  const isCollapseStart = collapseFrom === "start"
  const finalVisibleCount = visibleCount - subtractCount
  const overflowCount = data.length - finalVisibleCount
  const showOverflow = overflowCount > 0 && phase !== "measuring"
  const overflowItems = isCollapseStart
    ? data.slice(0, data.length - finalVisibleCount)
    : data.slice(finalVisibleCount)
  const overflowElement = showOverflow ? renderOverflow(overflowItems) : null

  const dataKey = React.useMemo(
    () => getDataSignature(data, getItemKey),
    [data, getItemKey],
  )

  function fitsInRows(
    itemWidths: number[],
    containerWidth: number,
    columnGap: number,
    startIndex = 0,
  ) {
    let rows = 1
    let rowWidth = 0

    for (let i = startIndex; i < itemWidths.length; i += 1) {
      const width = itemWidths[i]
      const needed = rowWidth > 0 ? width + columnGap : width

      if (rowWidth + needed > containerWidth && rowWidth > 0) {
        rows += 1
        if (rows > maxRows) return false
        rowWidth = width
      } else {
        rowWidth += needed
      }
    }

    return true
  }

  function countVisibleItems() {
    const container = containerRef.current
    const rowData = getRowPositionsData(container, overflowRef.current)
    if (!container || !rowData) return

    if (isCollapseStart) {
      const containerWidth = container.getBoundingClientRect().width
      const columnGap = parseFloat(getComputedStyle(container).columnGap) || 0
      const widths = rowData.children.map(
        (child) => child.getBoundingClientRect().width,
      )

      let count = 0
      for (let i = widths.length - 1; i >= 0; i -= 1) {
        if (!fitsInRows(widths, containerWidth, columnGap, i)) break
        count = widths.length - i
      }

      setVisibleCount(Math.min(count, maxVisibleItems))
      return
    }

    if (data.length === 1) {
      const containerWidth = container.getBoundingClientRect().width
      const itemWidth = rowData.children[0].getBoundingClientRect().width
      setVisibleCount(itemWidth > containerWidth ? 0 : 1)
      return
    }

    const fittingCount = rowData.rowPositions
      .slice(0, maxRows)
      .reduce((acc, position) => acc + rowData.rows[position].count, 0)

    setVisibleCount(Math.min(fittingCount, maxVisibleItems))
  }

  function updateOverflowIndicator() {
    const container = containerRef.current
    const overflow = overflowRef.current
    if (!container || !overflow) return false
    const rowData = getRowPositionsData(container, overflow)
    if (!rowData) return false

    if (isCollapseStart) {
      const containerWidth = container.getBoundingClientRect().width
      const columnGap = parseFloat(getComputedStyle(container).columnGap) || 0
      const itemWidths = [
        overflow.getBoundingClientRect().width,
        ...rowData.children.map((child) => child.getBoundingClientRect().width),
      ]

      if (!fitsInRows(itemWidths, containerWidth, columnGap)) {
        setSubtractCount((c) => c + 1)
        return true
      }
      return false
    }

    const overflowRect = overflow.getBoundingClientRect()
    const overflowMiddleY = overflowRect.top + overflowRect.height / 2
    const lastRowTop = rowData.rowPositions[rowData.rowPositions.length - 1]

    if (overflowMiddleY > rowData.rows[lastRowTop].bottom) {
      setSubtractCount((c) => c + 1)
      return true
    }
    return false
  }

  useIsomorphicEffect(() => {
    setPhase("measuring")
    setVisibleCount(data.length)
    setSubtractCount(0)
  }, [dataKey, maxRows, collapseFrom])

  useIsomorphicEffect(() => {
    if (phase === "measuring") {
      countVisibleItems()
      setPhase("measuring-overflow-indicator")
    }
  }, [phase])

  useIsomorphicEffect(() => {
    if (phase === "measuring-overflow-indicator") {
      if (!updateOverflowIndicator()) setPhase("normal")
    }
  }, [phase, subtractCount])

  useIsomorphicEffect(() => {
    if (phase === "normal") {
      setPhase("measuring")
      setSubtractCount(0)
    }
  }, [dimensions])

  const clonedOverflow =
    overflowElement && React.isValidElement(overflowElement)
      ? React.cloneElement(
          overflowElement as React.ReactElement<{
            ref?: React.Ref<HTMLElement>
          }>,
          {
            ref: (node: HTMLElement | null) => {
              overflowRef.current = node
              setRef(
                (
                  overflowElement as unknown as {
                    props: { ref?: React.Ref<HTMLElement> }
                  }
                ).props.ref,
                node,
              )
            },
          },
        )
      : null

  const finalItems = Number.isFinite(maxVisibleItems)
    ? isCollapseStart
      ? data.slice(-maxVisibleItems)
      : data.slice(0, maxVisibleItems)
    : data
  const indexOffset = isCollapseStart ? data.length - finalItems.length : 0

  return (
    <div
      data-slot="overflow-list"
      ref={(node) => {
        containerRef.current = node
        setRef(ref, node)
      }}
      className={cn(
        "flex w-full flex-wrap contain-layout contain-style",
        GAP_CLASSES[gap],
        className,
      )}
      {...props}
    >
      {isCollapseStart && clonedOverflow}

      {finalItems.map((item, index) => {
        const isVisible =
          phase === "measuring" ||
          (isCollapseStart
            ? index >= finalItems.length - finalVisibleCount
            : index < finalVisibleCount)
        if (!isVisible) return null
        const dataIndex = indexOffset + index
        return (
          <React.Fragment key={dataIndex}>
            {renderItem(item, dataIndex)}
          </React.Fragment>
        )
      })}

      {!isCollapseStart && clonedOverflow}
    </div>
  )
}

export { OverflowList }
export type { OverflowListGap, OverflowListProps }
