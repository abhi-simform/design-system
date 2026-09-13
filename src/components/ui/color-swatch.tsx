import * as React from "react"
import { cn } from "cn"

import { Box } from "@/components/ui/box"
import type { BoxProps } from "@/components/ui/box"

type ColorSwatchRadius = "xs" | "sm" | "md" | "lg" | "xl" | "full"

const RADIUS_CLASSES: Record<ColorSwatchRadius, string> = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
}

const rem = (px: number) => `${px / 16}rem`

interface ColorSwatchProps extends BoxProps {
  color: string
  size?: number | string
  radius?: ColorSwatchRadius | number
  withShadow?: boolean
}

function ColorSwatch({
  color,
  size = 28,
  radius = "full",
  withShadow = true,
  className,
  style,
  children,
  ...props
}: ColorSwatchProps) {
  // --cs-radius is set once on the root and read via `rounded-(--cs-radius)` by
  // every overlay span below it — CSS custom properties inherit, so it only
  // needs to be defined here, and only when radius isn't already a static class.
  const radiusClass =
    typeof radius === "number"
      ? "rounded-(--cs-radius)"
      : RADIUS_CLASSES[radius]

  return (
    <Box
      data-slot="color-swatch"
      className={cn(
        "relative inline-block appearance-none border-0 text-inherit no-underline",
        "size-(--cs-size)",
        radiusClass,
        className,
      )}
      style={
        {
          "--cs-size": typeof size === "number" ? rem(size) : size,
          ...(typeof radius === "number"
            ? { "--cs-radius": rem(radius) }
            : null),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn("checkerboard absolute inset-0", radiusClass)}
      />
      <span
        aria-hidden="true"
        className={cn("absolute inset-0", radiusClass)}
        style={{ backgroundColor: color }}
      />
      {withShadow && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 z-[1] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1),inset_0_0_4px_rgba(0,0,0,0.15)]",
            radiusClass,
          )}
        />
      )}
      <span
        className={cn(
          "absolute inset-0 z-[2] flex items-center justify-center",
          radiusClass,
        )}
      >
        {children}
      </span>
    </Box>
  )
}

export { ColorSwatch }
export type { ColorSwatchProps, ColorSwatchRadius }
