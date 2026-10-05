import type * as React from "react"
import { cn } from "cn"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  getClampedThickness,
  getCurveProps,
  getCurves,
} from "@/hooks/ring-geometry"
import type { CurveData } from "@/hooks/ring-geometry"

type RingProgressSection = CurveData

type RingProgressProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Label displayed in the center of the ring */
  label?: React.ReactNode
  /** Ring thickness in pixels, clamped to size / 4 */
  thickness?: number
  /** Width and height of the ring in pixels */
  size?: number
  /** Rounded line caps on the start and end of visible sections */
  roundCaps?: boolean
  /** Sections to display; `value` is 0-100 and `color` is any CSS color */
  sections: RingProgressSection[]
  /** Color of the unfilled portion of the ring; any CSS color */
  rootColor?: string
  /** Transition duration in milliseconds for section value and color changes */
  transitionDuration?: number
  /** Gap between sections in degrees */
  sectionGap?: number
  /** Starting angle in degrees. 0 = right, 90 = bottom, 180 = left, 270 = top */
  startAngle?: number
}

function Curve({
  size,
  value,
  offset,
  sum,
  thickness,
  root,
  color,
  lineRoundCaps,
  tooltip,
  className,
  style,
  ...props
}: Omit<React.ComponentProps<"circle">, "color"> & {
  value?: number
  size: number
  offset: number
  sum: number
  thickness: number
  lineRoundCaps: boolean | undefined
  root?: boolean
  color?: string
  tooltip?: React.ReactNode
}) {
  const circle = (
    <circle
      data-slot="ring-progress-curve"
      fill="none"
      strokeLinecap={lineRoundCaps ? "round" : "butt"}
      className={cn(
        "stroke-(--curve-color,var(--muted)) transition-[stroke-dashoffset,stroke-dasharray,stroke] duration-(--rp-transition-duration) ease-[ease]",
        className,
      )}
      style={
        {
          "--curve-color": color,
          ...style,
        } as React.CSSProperties
      }
      {...props}
      {...getCurveProps({ sum, size, thickness, value, offset, root })}
    />
  )

  if (!tooltip) return circle

  return (
    <Tooltip trackCursorAxis="both">
      <TooltipTrigger render={circle} />
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}

function RingProgress({
  className,
  style,
  label,
  sections,
  size = 120,
  thickness = 12,
  roundCaps,
  rootColor,
  transitionDuration,
  sectionGap,
  startAngle = 270,
  ...props
}: RingProgressProps) {
  const clampedThickness = getClampedThickness(thickness, size)

  const curves = getCurves({
    size,
    thickness: clampedThickness,
    sections,
    renderRoundedLineCaps: roundCaps,
    rootColor,
    sectionGap,
  }).map(({ data, sum, root, lineRoundCaps, offset }, index) => (
    <Curve
      {...data}
      key={index}
      size={size}
      thickness={clampedThickness}
      sum={sum}
      offset={offset}
      root={root}
      lineRoundCaps={lineRoundCaps}
    />
  ))

  return (
    <div
      data-slot="ring-progress"
      className={cn("relative", className)}
      style={
        {
          width: size,
          height: size,
          minWidth: size,
          minHeight: size,
          "--rp-transition-duration": `${transitionDuration ?? 0}ms`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <svg
        data-slot="ring-progress-svg"
        viewBox={`0 0 ${size} ${size}`}
        style={{
          width: size,
          height: size,
          minWidth: size,
          minHeight: size,
          transform: `rotate(${startAngle - 360}deg)`,
        }}
      >
        {curves}
      </svg>
      {label && (
        <div
          data-slot="ring-progress-label"
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            insetInline: thickness * 2,
          }}
        >
          {label}
        </div>
      )}
    </div>
  )
}

export { RingProgress }
export type { RingProgressProps, RingProgressSection }
