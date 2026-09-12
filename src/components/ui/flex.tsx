import * as React from "react"
import { cn } from "cn"

import { Box } from "@/components/ui/box"
import type { BoxProps } from "@/components/ui/box"

type FlexBreakpoint = "base" | "xs" | "sm" | "md" | "lg" | "xl"
type BreakpointKey = Exclude<FlexBreakpoint, "base">
type ResponsiveValue<T> = T | Partial<Record<FlexBreakpoint, T>>
type FlexSpacing = number | string
type FlexBreakpoints = Record<BreakpointKey, string>
type CssVars = Record<string, string | undefined>

const DEFAULT_BREAKPOINTS: FlexBreakpoints = {
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
): value is Partial<Record<FlexBreakpoint, T>> {
  return typeof value === "object" && value !== null
}

function getBaseValue<T>(value: ResponsiveValue<T> | undefined) {
  return isResponsiveObject(value) ? value.base : value
}

function getSpacing(value: FlexSpacing | undefined) {
  if (value === undefined) return undefined
  if (typeof value === "number") return rem(value)
  return DEFAULT_SPACING[value] ?? value
}

type FlexAlign =
  | "stretch"
  | "center"
  | "baseline"
  | "normal"
  | "start"
  | "flex-start"
  | "end"
  | "flex-end"

type FlexJustify =
  | "center"
  | "normal"
  | "start"
  | "flex-start"
  | "end"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly"

type FlexWrap = "wrap" | "nowrap" | "wrap-reverse"

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse"

// Plain (non-responsive) values map to a static Tailwind class, same as
// Grid/Group — nothing here feeds a calc() or var() elsewhere, so there's no
// reason to route them through inline styles or CSS custom properties. Only
// when a prop is passed as a responsive object does its resolved value go
// into the generated stylesheet below instead (see the resolution loop).
const ALIGN_CLASSES: Record<FlexAlign, string> = {
  stretch: "items-stretch",
  center: "items-center",
  baseline: "items-baseline",
  normal: "items-normal",
  start: "items-start",
  "flex-start": "items-start",
  end: "items-end",
  "flex-end": "items-end",
}

const JUSTIFY_CLASSES: Record<FlexJustify, string> = {
  center: "justify-center",
  normal: "justify-normal",
  start: "justify-start",
  "flex-start": "justify-start",
  end: "justify-end",
  "flex-end": "justify-end",
  "space-between": "justify-between",
  "space-around": "justify-around",
  "space-evenly": "justify-evenly",
}

const WRAP_CLASSES: Record<FlexWrap, string> = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
  "wrap-reverse": "flex-wrap-reverse",
}

const DIRECTION_CLASSES: Record<FlexDirection, string> = {
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
  column: "flex-col",
  "column-reverse": "flex-col-reverse",
}

function getSortedBreakpointKeys(breakpoints: FlexBreakpoints) {
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
  breakpoints: FlexBreakpoints,
) {
  const rules: string[] = []
  const baseCss = declarationsToCss(base)
  if (baseCss) rules.push(`.${className}{${baseCss}}`)

  for (const key of getSortedBreakpointKeys(breakpoints)) {
    const vars = responsive[key]
    if (!vars) continue
    const css = declarationsToCss(vars)
    if (!css) continue
    rules.push(`@media (min-width: ${breakpoints[key]}){.${className}{${css}}}`)
  }
  return rules.join("")
}

function useScopedClassName(prefix: string) {
  const id = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  return `${prefix}-${id}`
}

interface FlexProps extends BoxProps {
  gap?: ResponsiveValue<FlexSpacing>
  rowGap?: ResponsiveValue<FlexSpacing>
  columnGap?: ResponsiveValue<FlexSpacing>
  align?: ResponsiveValue<FlexAlign>
  justify?: ResponsiveValue<FlexJustify>
  wrap?: ResponsiveValue<FlexWrap>
  direction?: ResponsiveValue<FlexDirection>
}

function Flex({
  gap,
  rowGap,
  columnGap,
  align,
  justify,
  wrap,
  direction,
  className,
  style,
  ...props
}: FlexProps) {
  const responsiveClassName = useScopedClassName("flex")

  const classes: string[] = ["flex"]
  const inlineStyle: React.CSSProperties = { ...style }
  const cssBase: CssVars = {}
  const cssResponsive: Partial<Record<BreakpointKey, CssVars>> = {}
  let anyResponsive = false

  const addResponsiveVar = (
    key: BreakpointKey,
    prop: string,
    value: string,
  ) => {
    cssResponsive[key] ??= {}
    cssResponsive[key]![prop] = value
  }

  const enumProps = [
    [align, ALIGN_CLASSES, "align-items"],
    [justify, JUSTIFY_CLASSES, "justify-content"],
    [wrap, WRAP_CLASSES, "flex-wrap"],
    [direction, DIRECTION_CLASSES, "flex-direction"],
  ] as const

  for (const [value, classMap, cssProp] of enumProps) {
    if (value === undefined) continue
    if (isResponsiveObject(value)) {
      anyResponsive = true
      const base = getBaseValue(value)
      if (base !== undefined) cssBase[cssProp] = base
      for (const key of Object.keys(value) as FlexBreakpoint[]) {
        if (key === "base") continue
        const resolved = value[key]
        if (resolved === undefined) continue
        addResponsiveVar(key as BreakpointKey, cssProp, resolved)
      }
    } else {
      classes.push(classMap[value])
    }
  }

  // The `gap` shorthand is never emitted — an inline `gap` would always beat
  // a responsively-overridden `row-gap`/`column-gap` from the generated
  // stylesheet below (inline style wins over any stylesheet rule regardless
  // of specificity), so gap is normalized to its two longhands up front.
  const rowGapEff = rowGap ?? gap
  const columnGapEff = columnGap ?? gap

  const gapProps = [
    [rowGapEff, "row-gap", "rowGap"],
    [columnGapEff, "column-gap", "columnGap"],
  ] as const

  for (const [value, cssProp, styleKey] of gapProps) {
    if (value === undefined) continue
    if (isResponsiveObject(value)) {
      anyResponsive = true
      const base = getSpacing(getBaseValue(value))
      if (base !== undefined) cssBase[cssProp] = base
      for (const key of Object.keys(value) as FlexBreakpoint[]) {
        if (key === "base") continue
        const resolved = getSpacing(value[key])
        if (resolved === undefined) continue
        addResponsiveVar(key as BreakpointKey, cssProp, resolved)
      }
    } else {
      const resolved = getSpacing(value)
      if (resolved !== undefined) inlineStyle[styleKey] = resolved
    }
  }

  const css = anyResponsive
    ? buildScopedCss(
        responsiveClassName,
        cssBase,
        cssResponsive,
        DEFAULT_BREAKPOINTS,
      )
    : ""

  return (
    <>
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      <Box
        data-slot="flex"
        style={inlineStyle}
        className={cn(
          ...classes,
          anyResponsive && responsiveClassName,
          className,
        )}
        {...props}
      />
    </>
  )
}

export { Flex }
export type { FlexProps }
