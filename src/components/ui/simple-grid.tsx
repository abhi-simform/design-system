import * as React from "react"
import { cn } from "cn"

type SimpleGridBreakpoint = "base" | "xs" | "sm" | "md" | "lg" | "xl"
type BreakpointKey = Exclude<SimpleGridBreakpoint, "base">
type ResponsiveValue<T> = T | Partial<Record<SimpleGridBreakpoint, T>>
type GridSpacing = number | string
type SimpleGridQueryType = "media" | "container"
type SimpleGridBreakpoints = Record<BreakpointKey, string>
type AutoFlow = "auto-fit" | "auto-fill"
type CssVars = Record<string, string | undefined>

const SIMPLE_GRID_CONTAINER_NAME = "simple-grid"

const DEFAULT_BREAKPOINTS: SimpleGridBreakpoints = {
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
): value is Partial<Record<SimpleGridBreakpoint, T>> {
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

function getMinColWidth(value: string | number | undefined) {
  if (value === undefined) return undefined
  return typeof value === "number" ? rem(value) : value
}

function getSortedBreakpointKeys(breakpoints: SimpleGridBreakpoints) {
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
  breakpoints: SimpleGridBreakpoints,
  type: SimpleGridQueryType,
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
        ? `${SIMPLE_GRID_CONTAINER_NAME} (min-width: ${breakpoints[key]})`
        : `(min-width: ${breakpoints[key]})`
    rules.push(`${atRule} ${query}{.${className}{${css}}}`)
  }
  return rules.join("")
}

function useScopedClassName(prefix: string) {
  const id = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  return `${prefix}-${id}`
}

interface SimpleGridProps extends React.ComponentProps<"div"> {
  cols?: ResponsiveValue<number>
  spacing?: ResponsiveValue<GridSpacing>
  verticalSpacing?: ResponsiveValue<GridSpacing>
  type?: SimpleGridQueryType
  breakpoints?: SimpleGridBreakpoints
  minColWidth?: string | number
  autoFlow?: AutoFlow
  autoRows?: string
}

function SimpleGrid({
  cols = 1,
  spacing = "md",
  verticalSpacing,
  type = "media",
  breakpoints = DEFAULT_BREAKPOINTS,
  minColWidth,
  autoFlow = "auto-fill",
  autoRows,
  className,
  style,
  children,
  ...props
}: SimpleGridProps) {
  const responsiveClassName = useScopedClassName("simple-grid")
  const _verticalSpacing = verticalSpacing ?? spacing
  const useAutoColumns = minColWidth !== undefined

  // --simple-grid-cols (or --simple-grid-min-col-width in auto mode) and the
  // spacing vars must always be real custom properties, never only emitted
  // when that specific prop happens to be responsive — grid-template-columns
  // and gap reference them unconditionally, and an undefined var silently
  // falls back to none/normal.
  const base: CssVars = {
    "--simple-grid-spacing-x": getSpacing(getBaseValue(spacing)),
    "--simple-grid-spacing-y": getSpacing(getBaseValue(_verticalSpacing)),
    "--simple-grid-auto-rows": autoRows,
    ...(useAutoColumns
      ? { "--simple-grid-min-col-width": getMinColWidth(minColWidth) }
      : { "--simple-grid-cols": getBaseValue(cols)?.toString() }),
  }

  const responsive: Partial<Record<BreakpointKey, CssVars>> = {}
  const addResponsive = (
    value: ResponsiveValue<GridSpacing> | undefined,
    cssVar: string,
  ) => {
    if (!isResponsiveObject(value)) return
    for (const key of Object.keys(value) as SimpleGridBreakpoint[]) {
      if (key === "base") continue
      const resolved = getSpacing(value[key])
      if (resolved === undefined) continue
      responsive[key as BreakpointKey] ??= {}
      responsive[key as BreakpointKey]![cssVar] = resolved
    }
  }
  addResponsive(spacing, "--simple-grid-spacing-x")
  addResponsive(_verticalSpacing, "--simple-grid-spacing-y")

  if (!useAutoColumns && isResponsiveObject(cols)) {
    for (const key of Object.keys(cols) as SimpleGridBreakpoint[]) {
      if (key === "base") continue
      const value = cols[key]
      if (value === undefined) continue
      responsive[key as BreakpointKey] ??= {}
      responsive[key as BreakpointKey]!["--simple-grid-cols"] = value.toString()
    }
  }

  const css = buildScopedCss(
    responsiveClassName,
    base,
    responsive,
    breakpoints,
    type,
  )

  const gridTemplateColumns = useAutoColumns
    ? `repeat(${autoFlow}, minmax(var(--simple-grid-min-col-width), 1fr))`
    : "repeat(var(--simple-grid-cols), minmax(0, 1fr))"

  const root = (
    <div
      data-slot="simple-grid"
      style={{
        ...style,
        gridTemplateColumns,
        gridAutoRows: "var(--simple-grid-auto-rows, auto)",
        gap: "var(--simple-grid-spacing-y) var(--simple-grid-spacing-x)",
      }}
      className={cn("grid w-full", responsiveClassName, className)}
      {...props}
    >
      {children}
    </div>
  )

  return (
    <>
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      {type === "container" ? (
        // container-name below must stay in sync with SIMPLE_GRID_CONTAINER_NAME
        <div className="[container:simple-grid/inline-size]">{root}</div>
      ) : (
        root
      )}
    </>
  )
}

export { SimpleGrid }
export type { SimpleGridProps, SimpleGridBreakpoints }
