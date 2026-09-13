import * as React from "react"
import { cn } from "cn"

type IndicatorAnchor = "top" | "middle" | "bottom"
type IndicatorPlacement = "start" | "center" | "end"
type IndicatorPosition = `${IndicatorAnchor}-${IndicatorPlacement}`

type IndicatorRadius = "xs" | "sm" | "md" | "lg" | "xl"
type IndicatorColor =
  "primary" | "secondary" | "destructive" | "accent" | "muted"
type IndicatorOffset = number | { x: number; y: number }

const rem = (px: number) => `${px / 16}rem`

// Translate (and the "50%" middle/center anchor) are fully determined by the
// position enum, never by offset, so they are static classes. Only the
// top/bottom/start/end anchors carry the continuous offset value, which is
// set via inline style below instead.
const TRANSLATE_CLASSES: Record<IndicatorPosition, string> = {
  "top-start": "-translate-y-1/2 -translate-x-1/2",
  "top-center": "top-1/2 -translate-y-1/2 -translate-x-1/2",
  "top-end": "-translate-y-1/2 translate-x-1/2",
  "middle-start": "top-1/2 -translate-y-1/2 -translate-x-1/2",
  "middle-center": "top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
  "middle-end": "top-1/2 -translate-y-1/2 translate-x-1/2",
  "bottom-start": "translate-y-1/2 -translate-x-1/2",
  "bottom-center": "translate-y-1/2 -translate-x-1/2 left-1/2",
  "bottom-end": "translate-y-1/2 translate-x-1/2",
}

const RADIUS_CLASSES: Record<IndicatorRadius, string> = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
}

const BG_CLASSES: Record<IndicatorColor, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  destructive: "bg-destructive",
  accent: "bg-accent",
  muted: "bg-muted",
}

const TEXT_CLASSES: Record<IndicatorColor, string> = {
  primary: "text-primary-foreground",
  secondary: "text-secondary-foreground",
  destructive: "text-white",
  accent: "text-accent-foreground",
  muted: "text-muted-foreground",
}

function getOffsetStyle(
  position: IndicatorPosition,
  offset: IndicatorOffset,
): React.CSSProperties {
  const [anchor, placement] = position.split("-") as [
    IndicatorAnchor,
    IndicatorPlacement,
  ]
  const offsetX = typeof offset === "number" ? offset : offset.x
  const offsetY = typeof offset === "number" ? offset : offset.y

  const style: React.CSSProperties = {}
  if (anchor === "top") style.top = rem(offsetY)
  if (anchor === "bottom") style.bottom = rem(offsetY)
  if (placement === "start") style.left = rem(offsetX)
  if (placement === "end") style.right = rem(offsetX)
  return style
}

interface IndicatorProps extends React.ComponentProps<"div"> {
  position?: IndicatorPosition
  offset?: IndicatorOffset
  inline?: boolean
  size?: number | string
  label?: React.ReactNode
  radius?: IndicatorRadius
  color?: IndicatorColor
  withBorder?: boolean
  disabled?: boolean
  processing?: boolean
  zIndex?: number | string
  maxValue?: number
  showZero?: boolean
}

function Indicator({
  className,
  style,
  children,
  position = "top-end",
  offset = 0,
  inline = false,
  size = 10,
  label,
  radius,
  color = "primary",
  withBorder = false,
  disabled = false,
  processing = false,
  zIndex = 200,
  maxValue,
  showZero = true,
  ...props
}: IndicatorProps) {
  const shouldHideZero = !showZero && (label === 0 || label === "0")
  const shouldShowDot = !disabled && !shouldHideZero
  const formattedLabel =
    maxValue !== undefined && typeof label === "number" && label > maxValue
      ? `${maxValue}+`
      : label

  const radiusClass = radius ? RADIUS_CLASSES[radius] : "rounded-full"

  return (
    <div
      data-slot="indicator"
      className={cn("relative block", inline && "inline-block", className)}
      style={style}
      {...props}
    >
      {shouldShowDot && (
        <span
          data-slot="indicator-dot"
          className={cn("absolute", TRANSLATE_CLASSES[position])}
          style={{
            ...getOffsetStyle(position, offset),
            minWidth: typeof size === "number" ? rem(size) : size,
            height: typeof size === "number" ? rem(size) : size,
            zIndex,
          }}
        >
          {processing && (
            <span
              data-slot="indicator-ping"
              aria-hidden="true"
              className={cn(
                "absolute inset-0 animate-ping opacity-75",
                BG_CLASSES[color],
                radiusClass,
              )}
            />
          )}
          <span
            data-slot="indicator-content"
            className={cn(
              "relative flex h-full min-w-full items-center justify-center text-xs font-medium whitespace-nowrap",
              BG_CLASSES[color],
              TEXT_CLASSES[color],
              radiusClass,
              label != null && "px-1",
              withBorder && "ring-2 ring-background",
            )}
          >
            {formattedLabel}
          </span>
        </span>
      )}
      {children}
    </div>
  )
}

export { Indicator }
export type {
  IndicatorProps,
  IndicatorPosition,
  IndicatorColor,
  IndicatorRadius,
}
