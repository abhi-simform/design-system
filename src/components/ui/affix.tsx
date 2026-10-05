import { cn } from "cn"

import { Box } from "@/components/ui/box"
import type { BoxProps } from "@/components/ui/box"
import { OptionalPortal } from "@/components/ui/portal"
import type { PortalProps } from "@/components/ui/portal"

type AffixSpacing = "xs" | "sm" | "md" | "lg" | "xl" | number | (string & {})

const SPACING_SCALE: Record<string, string> = {
  xs: "0.625rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
}

const rem = (px: number) => `${px / 16}rem`

function getSpacing(value: AffixSpacing | undefined) {
  if (value === undefined) return undefined
  if (typeof value === "number") return rem(value)
  return SPACING_SCALE[value] ?? value
}

type AffixPosition = {
  top?: AffixSpacing
  left?: AffixSpacing
  bottom?: AffixSpacing
  right?: AffixSpacing
}

interface AffixProps extends BoxProps {
  /** Root element `z-index`. @default 200 */
  zIndex?: React.CSSProperties["zIndex"]
  /** Determines whether the component is rendered within a `Portal`. @default true */
  withinPortal?: boolean
  /** Props passed down to the `Portal` component. Ignored when `withinPortal` is `false`. */
  portalProps?: Omit<PortalProps, "children">
  /** Affix position on screen. @default { bottom: 0, right: 0 } */
  position?: AffixPosition
}

function Affix({
  zIndex = 200,
  withinPortal = true,
  portalProps,
  position = { bottom: 0, right: 0 },
  className,
  style,
  ...props
}: AffixProps) {
  return (
    <OptionalPortal {...portalProps} withinPortal={withinPortal}>
      <Box
        data-slot="affix"
        className={cn("fixed", className)}
        style={{
          zIndex,
          top: getSpacing(position.top),
          left: getSpacing(position.left),
          bottom: getSpacing(position.bottom),
          right: getSpacing(position.right),
          ...style,
        }}
        {...props}
      />
    </OptionalPortal>
  )
}

export { Affix }
export type { AffixProps, AffixPosition }
