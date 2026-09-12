import * as React from "react"
import { cn } from "cn"

type GridBreakpoint = "base" | "xs" | "sm" | "md" | "lg" | "xl"
type BreakpointKey = Exclude<GridBreakpoint, "base">
type ResponsiveValue<T> = T | Partial<Record<GridBreakpoint, T>>
type GridSpacing = number | string
type ColSpan = number | "auto" | "content"
type GridQueryType = "media" | "container"
type GridBreakpoints = Record<BreakpointKey, string>
type CssVars = Record<string, string | undefined>

const GRID_CONTAINER_NAME = "grid"

const DEFAULT_BREAKPOINTS: GridBreakpoints = {
  xs: "36em",
  sm: "48em",
  md: "62em",
  lg: "75em",
  xl: "88em",
}

const DEFAULT_SPACING: Record<string, string> = {
  xs: "0.625rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
}

const rem = (px: number) => `${px / 16}rem`

function isResponsiveObject<T>(
  value: ResponsiveValue<T> | undefined,
): value is Partial<Record<GridBreakpoint, T>> {
  return typeof value === "object" && value !== null
}

function getBaseValue<T>(value: ResponsiveValue<T> | undefined) {
  return isResponsiveObject(value) ? value.base : value
}

function getSpacing(value: GridSpacing | undefined) {
  if (value === undefined) return undefined
  if (typeof value === "number") return rem(value)
  return DEFAULT_SPACING[value] ?? value
}

function getSortedBreakpointKeys(breakpoints: GridBreakpoints) {
  return (Object.keys(breakpoints) as BreakpointKey[]).sort(
    (a, b) =>
      Number.parseFloat(breakpoints[a]) - Number.parseFloat(breakpoints[b]),
  )
}

function declarationsToCss(vars: CssVars) {
  return Object.entries(vars)
    .filter((entry): entry is [string, string] => entry[1] !== undefined)
    .map(([prop, value]) => `${prop}:${value}`)
    .join(";")
}

function buildScopedCss(
  className: string,
  base: CssVars,
  responsive: Partial<Record<BreakpointKey, CssVars>>,
  breakpoints: GridBreakpoints,
  type: GridQueryType,
) {
  const rules: string[] = []
  const baseCss = declarationsToCss(base)
  if (baseCss) rules.push(`.${className}{${baseCss}}`)

  const atRule = type === "container" ? "@container" : "@media"
  for (const key of getSortedBreakpointKeys(breakpoints)) {
    const vars = responsive[key]
    if (!vars) continue
    const css = declarationsToCss(vars)
    if (!css) continue
    const query =
      type === "container"
        ? `${GRID_CONTAINER_NAME} (min-width: ${breakpoints[key]})`
        : `(min-width: ${breakpoints[key]})`
    rules.push(`${atRule} ${query}{.${className}{${css}}}`)
  }
  return rules.join("")
}

function useScopedClassName(prefix: string) {
  const id = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  return `${prefix}-${id}`
}

type GridContextValue = {
  columns: number
  grow: boolean
  breakpoints: GridBreakpoints
  type: GridQueryType
}

const GridContext = React.createContext<GridContextValue | null>(null)

function useGridContext() {
  const ctx = React.useContext(GridContext)
  if (!ctx) {
    throw new Error(
      "Grid.Col was not found in the tree — render it inside a Grid component",
    )
  }
  return ctx
}

interface GridProps extends React.ComponentProps<"div"> {
  gap?: ResponsiveValue<GridSpacing>
  rowGap?: ResponsiveValue<GridSpacing>
  columnGap?: ResponsiveValue<GridSpacing>
  grow?: boolean
  justify?: React.CSSProperties["justifyContent"]
  align?: React.CSSProperties["alignItems"]
  columns?: number
  overflow?: React.CSSProperties["overflow"]
  type?: GridQueryType
  breakpoints?: GridBreakpoints
}

function Grid({
  gap = "md",
  rowGap,
  columnGap,
  grow = false,
  justify,
  align,
  columns = 12,
  overflow = "visible",
  type = "media",
  breakpoints = DEFAULT_BREAKPOINTS,
  className,
  style,
  children,
  ...props
}: GridProps) {
  const responsiveClassName = useScopedClassName("grid")

  // --grid-column-gap must always exist as a real custom property (never only
  // a plain inline `gap` value) — GridCol's flex-basis/offset calc()
  // formulas reference var(--grid-column-gap) unconditionally, responsive or
  // not, and an undefined var makes the whole calc() invalid.
  const baseGap = getSpacing(getBaseValue(gap))
  const baseRowGap = getSpacing(getBaseValue(rowGap))
  const baseColumnGap = getSpacing(getBaseValue(columnGap))

  const base: CssVars = {
    "--grid-gap": baseGap,
    "--grid-row-gap": baseRowGap ?? "var(--grid-gap)",
    "--grid-column-gap": baseColumnGap ?? "var(--grid-gap)",
  }

  const responsive: Partial<Record<BreakpointKey, CssVars>> = {}
  const addResponsive = (
    value: ResponsiveValue<GridSpacing> | undefined,
    cssVar: string,
  ) => {
    if (!isResponsiveObject(value)) return
    for (const key of Object.keys(value) as GridBreakpoint[]) {
      if (key === "base") continue
      const resolved = getSpacing(value[key])
      if (resolved === undefined) continue
      responsive[key as BreakpointKey] ??= {}
      responsive[key as BreakpointKey]![cssVar] = resolved
    }
  }
  addResponsive(gap, "--grid-gap")
  addResponsive(rowGap, "--grid-row-gap")
  addResponsive(columnGap, "--grid-column-gap")

  const css = buildScopedCss(
    responsiveClassName,
    base,
    responsive,
    breakpoints,
    type,
  )

  const contextValue: GridContextValue = { columns, grow, breakpoints, type }

  const root = (
    <div
      data-slot="grid"
      style={{ ...style, overflow }}
      className={cn("w-full", responsiveClassName, className)}
      {...props}
    >
      <div
        className="flex w-full flex-wrap"
        style={{
          gap: "var(--grid-row-gap) var(--grid-column-gap)",
          justifyContent: justify,
          alignItems: align,
        }}
      >
        {children}
      </div>
    </div>
  )

  return (
    <GridContext.Provider value={contextValue}>
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      {/* container-name below must stay in sync with GRID_CONTAINER_NAME */}
      {type === "container" ? (
        <div className="[container:grid_/_inline-size]">{root}</div>
      ) : (
        root
      )}
    </GridContext.Provider>
  )
}

function getColumnFlexBasis(span: ColSpan | undefined, columns: number) {
  if (span === "content") return "auto"
  if (span === "auto") return "0rem"
  if (!span) return undefined
  if (span === columns) return "100%"
  const percentage = (100 * span) / columns
  const gapFactor = (columns - span) / columns
  return `calc(${percentage}% - ${gapFactor} * var(--grid-column-gap))`
}

function getColumnMaxWidth(
  span: ColSpan | undefined,
  columns: number,
  grow: boolean,
) {
  if (grow || span === "auto") return "100%"
  if (span === "content") return "unset"
  return getColumnFlexBasis(span, columns)
}

function getColumnFlexGrow(span: ColSpan | undefined, grow: boolean) {
  if (!span) return undefined
  return span === "auto" || grow ? "1" : "0"
}

function getColumnOffset(offset: number | undefined, columns: number) {
  if (!offset) return undefined
  const percentage = (100 * offset) / columns
  const gapFactor = offset / columns
  return `calc(${percentage}% + ${gapFactor} * var(--grid-column-gap))`
}

interface GridColProps extends React.ComponentProps<"div"> {
  span?: ResponsiveValue<ColSpan>
  order?: ResponsiveValue<number>
  offset?: ResponsiveValue<number>
  align?: ResponsiveValue<React.CSSProperties["alignSelf"]>
}

function GridCol({
  span = 12,
  order,
  offset,
  align,
  className,
  style,
  ...props
}: GridColProps) {
  const ctx = useGridContext()
  const responsiveClassName = useScopedClassName("col")

  const isResponsive =
    isResponsiveObject(span) ||
    isResponsiveObject(order) ||
    isResponsiveObject(offset) ||
    isResponsiveObject(align)

  let colStyle: React.CSSProperties
  let css = ""

  if (!isResponsive) {
    const resolvedSpan = span as ColSpan
    colStyle = {
      order: order as number | undefined,
      flexBasis: getColumnFlexBasis(resolvedSpan, ctx.columns),
      width: resolvedSpan === "content" ? "auto" : undefined,
      maxWidth: getColumnMaxWidth(resolvedSpan, ctx.columns, ctx.grow),
      flexGrow: getColumnFlexGrow(resolvedSpan, ctx.grow),
      marginInlineStart: getColumnOffset(
        offset as number | undefined,
        ctx.columns,
      ),
      alignSelf: align as React.CSSProperties["alignSelf"],
    }
  } else {
    colStyle = {
      order: "var(--col-order)",
      flexBasis: "var(--col-flex-basis)",
      width: "var(--col-width)",
      maxWidth: "var(--col-max-width)",
      flexGrow: "var(--col-flex-grow)",
      marginInlineStart: "var(--col-offset)",
      alignSelf: "var(--col-align-self)",
    } as React.CSSProperties

    const baseSpan = getBaseValue(span) ?? 12
    const baseOrder = getBaseValue(order)
    const baseOffset = getBaseValue(offset)
    const baseAlign = getBaseValue(align)

    const base: CssVars = {
      "--col-order": baseOrder?.toString(),
      "--col-flex-basis": getColumnFlexBasis(baseSpan, ctx.columns),
      "--col-width": baseSpan === "content" ? "auto" : undefined,
      "--col-max-width": getColumnMaxWidth(baseSpan, ctx.columns, ctx.grow),
      "--col-flex-grow": getColumnFlexGrow(baseSpan, ctx.grow),
      "--col-offset": getColumnOffset(baseOffset, ctx.columns),
      "--col-align-self": baseAlign,
    }

    const responsive: Partial<Record<BreakpointKey, CssVars>> = {}
    const setVar = (
      key: BreakpointKey,
      prop: string,
      value: string | undefined,
    ) => {
      responsive[key] ??= {}
      responsive[key]![prop] = value
    }

    if (isResponsiveObject(order)) {
      for (const key of Object.keys(order) as GridBreakpoint[]) {
        if (key === "base" || order[key] === undefined) continue
        setVar(key as BreakpointKey, "--col-order", order[key]!.toString())
      }
    }
    if (isResponsiveObject(span)) {
      for (const key of Object.keys(span) as GridBreakpoint[]) {
        const value = span[key]
        if (key === "base" || value === undefined) continue
        setVar(
          key as BreakpointKey,
          "--col-flex-basis",
          getColumnFlexBasis(value, ctx.columns),
        )
        setVar(
          key as BreakpointKey,
          "--col-width",
          value === "content" ? "auto" : undefined,
        )
        setVar(
          key as BreakpointKey,
          "--col-max-width",
          getColumnMaxWidth(value, ctx.columns, ctx.grow),
        )
        setVar(
          key as BreakpointKey,
          "--col-flex-grow",
          getColumnFlexGrow(value, ctx.grow),
        )
      }
    }
    if (isResponsiveObject(offset)) {
      for (const key of Object.keys(offset) as GridBreakpoint[]) {
        if (key === "base" || offset[key] === undefined) continue
        setVar(
          key as BreakpointKey,
          "--col-offset",
          getColumnOffset(offset[key], ctx.columns),
        )
      }
    }
    if (isResponsiveObject(align)) {
      for (const key of Object.keys(align) as GridBreakpoint[]) {
        if (key === "base" || align[key] === undefined) continue
        setVar(key as BreakpointKey, "--col-align-self", align[key])
      }
    }

    css = buildScopedCss(
      responsiveClassName,
      base,
      responsive,
      ctx.breakpoints,
      ctx.type,
    )
  }

  return (
    <>
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      <div
        data-slot="grid-col"
        style={{ ...style, ...colStyle }}
        className={cn(
          "shrink-0",
          isResponsive && responsiveClassName,
          className,
        )}
        {...props}
      />
    </>
  )
}

const GridWithCol = Object.assign(Grid, { Col: GridCol })

export { GridWithCol as Grid, GridCol }
export type { GridProps, GridColProps, ColSpan, GridBreakpoints }
