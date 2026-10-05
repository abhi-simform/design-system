import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

type AppShellBreakpointKey = "xs" | "sm" | "md" | "lg" | "xl"
type AppShellSize = number | (string & {})
type AppShellResponsiveSize = Partial<
  Record<"base" | AppShellBreakpointKey, AppShellSize>
> &
  Record<string, AppShellSize | undefined>
type AppShellBreakpoint = AppShellBreakpointKey | (string & {}) | number
type AppShellMode = "fixed" | "static"
type AppShellLayout = "default" | "alt"
type AppShellSpacing = AppShellBreakpointKey | (string & {}) | number

type AppShellNavbarConfiguration = {
  width: AppShellSize | AppShellResponsiveSize
  breakpoint: AppShellBreakpoint
  collapsed?: { desktop?: boolean; mobile?: boolean }
}

type AppShellAsideConfiguration = AppShellNavbarConfiguration

type AppShellHeaderConfiguration = {
  height: AppShellSize | AppShellResponsiveSize
  collapsed?: boolean
  offset?: boolean
}

type AppShellFooterConfiguration = AppShellHeaderConfiguration

type CssVars = Record<string, string | undefined>
type MediaVars = Record<string, CssVars>

const BREAKPOINTS_PX: Record<AppShellBreakpointKey, number> = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1408,
}

const SPACING: Record<AppShellBreakpointKey, string> = {
  xs: "0.625rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
}

const DEFAULT_Z_INDEX = 100

const rem = (value: AppShellSize | undefined) => {
  if (typeof value === "number") return `${value / 16}rem`
  if (value === undefined) return undefined
  if (/^-?\d*\.?\d+px$/.test(value)) return `${parseFloat(value) / 16}rem`
  return value
}

const em = (px: number) => `${px / 16}em`

function getBreakpointValue(breakpoint: AppShellBreakpoint | string): number {
  if (typeof breakpoint === "number") return breakpoint
  if (breakpoint in BREAKPOINTS_PX) {
    return BREAKPOINTS_PX[breakpoint as AppShellBreakpointKey]
  }
  const parsed = parseFloat(breakpoint)
  if (/(em|rem)$/.test(breakpoint)) return parsed * 16
  return parsed
}

function getSpacing(value: AppShellSpacing | undefined) {
  if (value === undefined) return undefined
  if (typeof value === "number") return rem(value)
  return value in SPACING ? SPACING[value as AppShellBreakpointKey] : value
}

function getPaddingValue(value: AppShellSpacing | undefined) {
  return Number(value) === 0 ? "0px" : getSpacing(value)
}

function isResponsiveSize(size: unknown): size is AppShellResponsiveSize {
  if (typeof size !== "object" || size === null) return false
  if (Object.keys(size).length === 1 && "base" in size) return false
  return true
}

function isPrimitiveSize(size: unknown): size is AppShellSize {
  const isBaseSize =
    typeof size === "object" &&
    size !== null &&
    "base" in size &&
    (size as AppShellResponsiveSize).base !== undefined &&
    Object.keys(size).length === 1
  return typeof size === "number" || typeof size === "string" || isBaseSize
}

function getBaseSize(size: AppShellSize | AppShellResponsiveSize) {
  return typeof size === "object" ? size.base : size
}

function ensure(media: MediaVars, key: string | number) {
  const name = String(key)
  media[name] = media[name] || {}
  return media[name]
}

function assignSideVariables({
  side,
  config,
  base,
  min,
  max,
  mode,
}: {
  side: "navbar" | "aside"
  config: AppShellNavbarConfiguration | undefined
  base: CssVars
  min: MediaVars
  max: MediaVars
  mode: AppShellMode
}) {
  const isNavbar = side === "navbar"
  const width = config?.width
  const v = (name: string) => `--app-shell-${side}-${name}`
  const mainStart = "--app-shell-main-column-start"
  const mainEnd = "--app-shell-main-column-end"
  const collapsedTransform = isNavbar
    ? "translateX(calc(var(--app-shell-navbar-width) * -1))"
    : "translateX(var(--app-shell-aside-width))"
  const collapsedTransformRtl = isNavbar
    ? "translateX(var(--app-shell-navbar-width))"
    : "translateX(calc(var(--app-shell-aside-width) * -1))"

  if (config?.breakpoint !== undefined && !config.collapsed?.mobile) {
    const target = ensure(max, config.breakpoint)
    if (isNavbar) {
      target[v("offset")] = "0px"
      target[v("width")] = "100%"
      if (mode === "static") target[v("grid-width")] = "0px"
    } else if (mode === "fixed") {
      target[v("width")] = "100%"
      target[v("offset")] = "0px"
    } else {
      target[v("width")] = "0px"
      target[v("offset")] = "0px"
    }
  }

  if (isPrimitiveSize(width)) {
    const size = rem(getBaseSize(width))
    base[v("width")] = size
    base[v("offset")] = size
    if (isNavbar && mode === "static") base[v("grid-width")] = size
  }

  if (isResponsiveSize(width)) {
    if (width.base !== undefined) {
      const size = rem(width.base)
      base[v("width")] = size
      base[v("offset")] = size
      if (isNavbar && mode === "static") base[v("grid-width")] = size
    }

    Object.keys(width).forEach((key) => {
      if (key === "base") return
      const size = rem(width[key])
      const target = ensure(min, key)
      target[v("width")] = size
      target[v("offset")] = size
      if (isNavbar && mode === "static") target[v("grid-width")] = size
    })
  }

  if (config?.breakpoint !== undefined && mode === "static") {
    const target = ensure(min, config.breakpoint)
    target[v("position")] = "sticky"
    target[v("grid-row")] = "2"
    if (isNavbar) {
      target[v("grid-column")] = "1"
      target[mainStart] = "2"
    } else {
      target[v("grid-column")] = "3"
      target[mainEnd] = "3"
    }
  }

  if (config?.collapsed?.desktop) {
    const target = ensure(min, config.breakpoint)
    target[v("transform")] = collapsedTransform
    target[`${v("transform")}-rtl`] = collapsedTransformRtl
    if (mode === "fixed") {
      target[v("offset")] = "0px !important"
    } else {
      target[v("width")] = "0px"
      target[v("display")] = "none"
      target[isNavbar ? mainStart : mainEnd] = isNavbar ? "1" : "-1"
    }
    if (!isNavbar) target[v("scroll-locked-visibility")] = "hidden"
  }

  if (config?.collapsed?.mobile) {
    const target = ensure(max, getBreakpointValue(config.breakpoint) - 0.1)
    if (isNavbar) {
      target[v("width")] = "100%"
      target[v("offset")] = "0px"
      if (mode === "static") target[v("grid-width")] = "0px"
    } else if (mode === "fixed") {
      target[v("width")] = "100%"
      target[v("offset")] = "0px"
    } else {
      target[v("width")] = "0px"
    }
    target[v("transform")] = collapsedTransform
    target[`${v("transform")}-rtl`] = collapsedTransformRtl
    if (!isNavbar) target[v("scroll-locked-visibility")] = "hidden"
  }
}

function assignBarVariables({
  bar,
  config,
  base,
  min,
  mode,
}: {
  bar: "header" | "footer"
  config: AppShellHeaderConfiguration | undefined
  base: CssVars
  min: MediaVars
  mode: AppShellMode
}) {
  const isHeader = bar === "header"
  const height = config?.height
  const v = (name: string) => `--app-shell-${bar}-${name}`
  const shouldOffset = mode === "static" ? true : (config?.offset ?? true)

  if (mode === "static" && config) {
    base[v("position")] = "sticky"
    base[v("grid-column")] = "1 / -1"
    base[v("grid-row")] = isHeader ? "1" : "3"
  }

  if (isPrimitiveSize(height)) {
    const size = rem(getBaseSize(height))
    base[v("height")] = size
    if (shouldOffset) base[v("offset")] = size
  }

  if (isResponsiveSize(height)) {
    if (height.base !== undefined) {
      const size = rem(height.base)
      base[v("height")] = size
      if (shouldOffset) base[v("offset")] = size
    }

    Object.keys(height).forEach((key) => {
      if (key === "base") return
      const size = rem(height[key])
      const target = ensure(min, key)
      target[v("height")] = size
      if (shouldOffset) target[v("offset")] = size
    })
  }

  if (config?.collapsed) {
    base[v("transform")] = isHeader
      ? "translateY(calc(var(--app-shell-header-height) * -1))"
      : "translateY(var(--app-shell-footer-height))"
    if (mode === "fixed") base[v("offset")] = "0px !important"
  }
}

function assignPaddingVariables({
  padding,
  base,
  min,
}: {
  padding: AppShellSpacing | AppShellResponsiveSize | undefined
  base: CssVars
  min: MediaVars
}) {
  base["--app-shell-padding"] = "0px"

  if (isPrimitiveSize(padding)) {
    base["--app-shell-padding"] = getPaddingValue(getBaseSize(padding))
  }

  if (isResponsiveSize(padding)) {
    if (padding.base !== undefined) {
      base["--app-shell-padding"] = getPaddingValue(padding.base)
    }

    Object.keys(padding).forEach((key) => {
      if (key === "base") return
      ensure(min, key)["--app-shell-padding"] = getPaddingValue(padding[key])
    })
  }
}

function serialize(vars: CssVars) {
  return Object.entries(vars)
    .filter(([, value]) => value !== undefined)
    .map(([name, value]) => `${name}:${value};`)
    .join("")
}

function buildStyles({
  selector,
  navbar,
  header,
  aside,
  footer,
  padding,
  mode,
}: {
  selector: string
  navbar: AppShellNavbarConfiguration | undefined
  header: AppShellHeaderConfiguration | undefined
  aside: AppShellAsideConfiguration | undefined
  footer: AppShellFooterConfiguration | undefined
  padding: AppShellSpacing | AppShellResponsiveSize | undefined
  mode: AppShellMode
}) {
  const base: CssVars = {}
  const min: MediaVars = {}
  const max: MediaVars = {}

  if (mode === "static") {
    base["--app-shell-main-grid-column"] = "1 / -1"
    base["--app-shell-main-grid-row"] = "2"
  }

  assignSideVariables({ side: "navbar", config: navbar, base, min, max, mode })
  assignSideVariables({ side: "aside", config: aside, base, min, max, mode })
  assignBarVariables({ bar: "header", config: header, base, min, mode })
  assignBarVariables({ bar: "footer", config: footer, base, min, mode })
  assignPaddingVariables({ padding, base, min })

  const sorted = (media: MediaVars, direction: 1 | -1) =>
    Object.keys(media).sort(
      (a, b) => direction * (getBreakpointValue(a) - getBreakpointValue(b)),
    )

  const minCss = sorted(min, 1).map(
    (key) =>
      `@media (min-width: ${em(getBreakpointValue(key))}){${selector}{${serialize(min[key])}}}`,
  )
  const maxCss = sorted(max, -1).map(
    (key) =>
      `@media (max-width: ${em(getBreakpointValue(key))}){${selector}{${serialize(max[key])}}}`,
  )

  return [`${selector}{${serialize(base)}}`, ...minCss, ...maxCss].join("")
}

type AppShellContextValue = {
  withBorder: boolean
  zIndex: string | number
  disabled: boolean
}

const AppShellContext = React.createContext<AppShellContextValue | null>(null)

function useAppShellContext() {
  const context = React.useContext(AppShellContext)
  if (!context) {
    throw new Error("AppShell parts must be used within an AppShell.")
  }

  return context
}

type AppShellProps = React.ComponentProps<"div"> & {
  /** If set, the associated components have a border. @default true */
  withBorder?: boolean
  /** Padding of the main section. A number is pixels, a token maps to the spacing scale. @default 0 */
  padding?: AppShellSpacing | AppShellResponsiveSize
  /** Navbar configuration: width, breakpoint and collapsed state. Required if you use `AppShell.Navbar`. */
  navbar?: AppShellNavbarConfiguration
  /** Aside configuration: width, breakpoint and collapsed state. Required if you use `AppShell.Aside`. */
  aside?: AppShellAsideConfiguration
  /** Header configuration: height, offset and collapsed state. Required if you use `AppShell.Header`. */
  header?: AppShellHeaderConfiguration
  /** Footer configuration: height, offset and collapsed state. Required if you use `AppShell.Footer`. */
  footer?: AppShellFooterConfiguration
  /** Duration of all transitions in ms. @default 200 */
  transitionDuration?: number
  /** Timing function of all transitions. @default "ease" */
  transitionTimingFunction?: string
  /** `z-index` of all associated elements. @default 100 */
  zIndex?: string | number
  /** Determines how Navbar/Aside are arranged relative to Header/Footer. @default "default" */
  layout?: AppShellLayout
  /** If set, Navbar, Aside, Header and Footer are hidden. */
  disabled?: boolean
  /** Positioning mode of all sections. `static` lays sections out in a grid inside the shell instead of fixing them to the viewport. @default "fixed" */
  mode?: AppShellMode
}

function AppShell({
  className,
  style,
  withBorder = true,
  padding = 0,
  navbar,
  aside,
  header,
  footer,
  transitionDuration = 200,
  transitionTimingFunction = "ease",
  zIndex = DEFAULT_Z_INDEX,
  layout = "default",
  disabled = false,
  mode = "fixed",
  id,
  ...props
}: AppShellProps) {
  const generatedId = React.useId()
  const scope = `app-shell-${generatedId.replace(/[^a-zA-Z0-9_-]/g, "")}`
  const css = buildStyles({
    selector: `.${scope}`,
    navbar,
    header,
    aside,
    footer,
    padding,
    mode,
  })

  const context = React.useMemo(
    () => ({ withBorder, zIndex, disabled }),
    [withBorder, zIndex, disabled],
  )

  return (
    <AppShellContext.Provider value={context}>
      <style>{css}</style>
      <div
        id={id}
        data-slot="app-shell"
        data-mode={mode}
        data-layout={layout === "alt" ? "alt" : undefined}
        data-disabled={disabled || undefined}
        className={cn(
          scope,
          "data-disabled:[--app-shell-aside-offset:0rem]! data-disabled:[--app-shell-footer-offset:0rem]! data-disabled:[--app-shell-header-offset:0rem]! data-disabled:[--app-shell-navbar-offset:0rem]!",
          "data-[mode=static]:relative data-[mode=static]:grid data-[mode=static]:h-full data-[mode=static]:grid-cols-[var(--app-shell-navbar-width,0)_1fr_var(--app-shell-aside-width,0)] data-[mode=static]:grid-rows-[auto_1fr_auto] data-[mode=static]:overflow-auto",
          className,
        )}
        style={
          {
            "--app-shell-transition-duration": `${transitionDuration}ms`,
            "--app-shell-transition-timing-function": transitionTimingFunction,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      />
    </AppShellContext.Provider>
  )
}

type AppShellSectionProps = Omit<React.ComponentProps<"div">, "color"> & {
  /** Border override for this section; inherits `withBorder` from AppShell. */
  withBorder?: boolean
  /** `z-index` override for this section; inherits `zIndex` from AppShell. */
  zIndex?: string | number
}

const TRANSITION =
  "[transition-duration:var(--app-shell-transition-duration)] [transition-timing-function:var(--app-shell-transition-timing-function)]"

const SIDE_CLASSES = cn(
  "fixed top-[var(--app-shell-header-offset,0rem)] flex h-[calc(100dvh-var(--app-shell-header-offset,0rem)-var(--app-shell-footer-offset,0rem))] flex-col bg-background [transition-property:transform,top,height]",
  "in-data-[mode=static]:[position:var(--app-shell-navbar-position,fixed)] in-data-[mode=static]:[grid-row:var(--app-shell-navbar-grid-row,auto)] in-data-[mode=static]:h-full",
  "in-data-[layout=alt]:top-0 in-data-[layout=alt]:h-dvh",
  "in-data-[mode=static]:in-data-[layout=alt]:[grid-row:1/-1] in-data-[mode=static]:in-data-[layout=alt]:h-full",
  TRANSITION,
)

const BAR_CLASSES = cn(
  "fixed inset-x-0 bg-background [transition-property:transform,margin-inline-start,margin-inline-end]",
  "in-data-[layout=alt]:ms-[var(--app-shell-navbar-offset,0rem)] in-data-[layout=alt]:me-[var(--app-shell-aside-offset,0rem)]",
  "in-data-[mode=static]:in-data-[layout=alt]:[grid-column:var(--app-shell-main-column-start,1)/var(--app-shell-main-column-end,-1)] in-data-[mode=static]:in-data-[layout=alt]:ms-0 in-data-[mode=static]:in-data-[layout=alt]:me-0",
  TRANSITION,
)

function AppShellNavbar({
  className,
  style,
  withBorder,
  zIndex,
  ...props
}: AppShellSectionProps) {
  const ctx = useAppShellContext()
  if (ctx.disabled) return null

  return (
    <nav
      data-slot="app-shell-navbar"
      className={cn(
        SIDE_CLASSES,
        "start-0 z-(--app-shell-navbar-z-index) w-(--app-shell-navbar-width) [transform:var(--app-shell-navbar-transform)] rtl:[transform:var(--app-shell-navbar-transform-rtl)]",
        "in-data-[mode=static]:[grid-column:var(--app-shell-navbar-grid-column,auto)] in-data-[mode=static]:[display:var(--app-shell-navbar-display,flex)]",
        (withBorder ?? ctx.withBorder) && "border-e border-border",
        className,
      )}
      style={
        {
          "--app-shell-navbar-z-index": `calc(${zIndex ?? ctx.zIndex} + 1)`,
          ...style,
        } as React.CSSProperties
      }
      {...(props as React.ComponentProps<"nav">)}
    />
  )
}

function AppShellAside({
  className,
  style,
  withBorder,
  zIndex,
  ...props
}: AppShellSectionProps) {
  const ctx = useAppShellContext()
  if (ctx.disabled) return null

  return (
    <aside
      data-slot="app-shell-aside"
      className={cn(
        SIDE_CLASSES,
        "end-0 z-(--app-shell-aside-z-index) w-(--app-shell-aside-width) [transform:var(--app-shell-aside-transform)] rtl:[transform:var(--app-shell-aside-transform-rtl)]",
        "in-data-[mode=static]:[position:var(--app-shell-aside-position,fixed)] in-data-[mode=static]:[grid-column:var(--app-shell-aside-grid-column,auto)] in-data-[mode=static]:[grid-row:var(--app-shell-aside-grid-row,auto)] in-data-[mode=static]:[display:var(--app-shell-aside-display,flex)]",
        "in-data-[mode=static]:in-data-[layout=alt]:[grid-row:1/-1]",
        "in-data-scroll-locked:[visibility:var(--app-shell-aside-scroll-locked-visibility)]",
        (withBorder ?? ctx.withBorder) && "border-s border-border",
        className,
      )}
      style={
        {
          "--app-shell-aside-z-index": `calc(${zIndex ?? ctx.zIndex} + 1)`,
          ...style,
        } as React.CSSProperties
      }
      {...(props as React.ComponentProps<"aside">)}
    />
  )
}

function AppShellHeader({
  className,
  style,
  withBorder,
  zIndex,
  ...props
}: AppShellSectionProps) {
  const ctx = useAppShellContext()
  if (ctx.disabled) return null

  return (
    <header
      data-slot="app-shell-header"
      className={cn(
        BAR_CLASSES,
        "top-0 z-(--app-shell-header-z-index) h-(--app-shell-header-height) [transform:var(--app-shell-header-transform)]",
        "in-data-[mode=static]:[position:var(--app-shell-header-position,fixed)] in-data-[mode=static]:[grid-column:var(--app-shell-header-grid-column,auto)] in-data-[mode=static]:[grid-row:var(--app-shell-header-grid-row,auto)]",
        (withBorder ?? ctx.withBorder) && "border-b border-border",
        className,
      )}
      style={
        {
          "--app-shell-header-z-index": String(zIndex ?? ctx.zIndex),
          ...style,
        } as React.CSSProperties
      }
      {...(props as React.ComponentProps<"header">)}
    />
  )
}

function AppShellFooter({
  className,
  style,
  withBorder,
  zIndex,
  ...props
}: AppShellSectionProps) {
  const ctx = useAppShellContext()
  if (ctx.disabled) return null

  return (
    <footer
      data-slot="app-shell-footer"
      className={cn(
        BAR_CLASSES,
        "bottom-0 z-(--app-shell-footer-z-index) h-[calc(var(--app-shell-footer-height)+env(safe-area-inset-bottom))] [transform:var(--app-shell-footer-transform)] pb-[env(safe-area-inset-bottom)]",
        "in-data-[mode=static]:[position:var(--app-shell-footer-position,fixed)] in-data-[mode=static]:[grid-column:var(--app-shell-footer-grid-column,auto)] in-data-[mode=static]:[grid-row:var(--app-shell-footer-grid-row,auto)]",
        "in-data-[mode=static]:in-data-[layout=alt]:[grid-column:var(--app-shell-main-column-start,1)/var(--app-shell-main-column-end,-1)]",
        (withBorder ?? ctx.withBorder) && "border-t border-border",
        className,
      )}
      style={
        {
          "--app-shell-footer-z-index": String(zIndex ?? ctx.zIndex),
          ...style,
        } as React.CSSProperties
      }
      {...(props as React.ComponentProps<"footer">)}
    />
  )
}

function AppShellMain({ className, ...props }: React.ComponentProps<"main">) {
  useAppShellContext()

  return (
    <main
      data-slot="app-shell-main"
      className={cn(
        "min-h-dvh ps-[calc(var(--app-shell-navbar-offset,0rem)+var(--app-shell-padding))] pe-[calc(var(--app-shell-aside-offset,0rem)+var(--app-shell-padding))] pt-[calc(var(--app-shell-header-offset,0rem)+var(--app-shell-padding))] pb-[calc(var(--app-shell-footer-offset,0rem)+var(--app-shell-padding))] [transition-property:padding]",
        TRANSITION,
        "in-data-[mode=static]:[grid-column:var(--app-shell-main-column-start,1)/var(--app-shell-main-column-end,-1)] in-data-[mode=static]:[grid-row:var(--app-shell-main-grid-row,2)] in-data-[mode=static]:min-h-auto in-data-[mode=static]:p-(--app-shell-padding)",
        className,
      )}
      {...props}
    />
  )
}

type AppShellSectionPartProps = useRender.ComponentProps<"div"> & {
  /** If set, the section expands to take all available space. */
  grow?: boolean
}

function AppShellSection({
  render,
  grow = false,
  className,
  ...props
}: AppShellSectionPartProps) {
  useAppShellContext()

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        "data-slot": "app-shell-section",
        "data-grow": grow || undefined,
        className: cn("grow-0 data-grow:grow", className),
      } as React.ComponentProps<"div">,
      props,
    ),
    render,
    state: { slot: "app-shell-section" },
  })
}

// Object.assign keeps AppShell a plain function while attaching the parts.
const AppShellWithParts = Object.assign(AppShell, {
  Navbar: AppShellNavbar,
  Header: AppShellHeader,
  Main: AppShellMain,
  Aside: AppShellAside,
  Footer: AppShellFooter,
  Section: AppShellSection,
})

export {
  AppShellWithParts as AppShell,
  AppShellAside,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  AppShellSection,
}
export type {
  AppShellAsideConfiguration,
  AppShellBreakpoint,
  AppShellFooterConfiguration,
  AppShellHeaderConfiguration,
  AppShellLayout,
  AppShellMode,
  AppShellNavbarConfiguration,
  AppShellProps,
  AppShellResponsiveSize,
  AppShellSectionPartProps,
  AppShellSectionProps,
  AppShellSize,
}
