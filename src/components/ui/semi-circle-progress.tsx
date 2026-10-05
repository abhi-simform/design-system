import type * as React from "react"
import { cn } from "cn"

type SemiCircleProgressOrientation = "up" | "down"
type SemiCircleProgressFillDirection = "left-to-right" | "right-to-left"
type SemiCircleProgressLabelPosition = "center" | "bottom"

type SemiCircleProgressProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Progress value from 0 to 100 */
  value: number
  /** Width of the component and diameter of the full circle in pixels; the visible height is size / 2 */
  size?: number
  /** Stroke width of the segments in pixels */
  thickness?: number
  /** Whether the arc opens upwards or downwards */
  orientation?: SemiCircleProgressOrientation
  /** Direction from which the arc is filled */
  fillDirection?: SemiCircleProgressFillDirection
  /** Color of the filled segment; any CSS color */
  filledSegmentColor?: string
  /** Color of the empty segment; any CSS color */
  emptySegmentColor?: string
  /** Transition duration in milliseconds for progress changes */
  transitionDuration?: number
  /** Label rendered inside the arc */
  label?: React.ReactNode
  /** Label position relative to the circle center */
  labelPosition?: SemiCircleProgressLabelPosition
}

const flipClasses: Record<
  SemiCircleProgressOrientation,
  Record<SemiCircleProgressFillDirection, string | undefined>
> = {
  up: { "left-to-right": "-scale-x-100", "right-to-left": undefined },
  down: { "left-to-right": "rotate-180", "right-to-left": "-scale-y-100" },
}

const labelClasses: Record<
  SemiCircleProgressLabelPosition,
  Record<SemiCircleProgressOrientation, string>
> = {
  bottom: { up: "bottom-0", down: "top-0" },
  center: { up: "top-1/2 -translate-y-1/2", down: "top-1/2 -translate-y-1/2" },
}

const labelPaddingFactor: Record<SemiCircleProgressLabelPosition, number> = {
  bottom: 2,
  center: 3,
}

function SemiCircleProgress({
  className,
  style,
  value,
  size = 200,
  thickness = 12,
  orientation = "up",
  fillDirection = "left-to-right",
  filledSegmentColor,
  emptySegmentColor,
  transitionDuration = 0,
  label,
  labelPosition = "bottom",
  ...props
}: SemiCircleProgressProps) {
  const center = size / 2
  const radius = (size - 2 * thickness) / 2
  const circumference = Math.PI * radius
  const clamped = Math.min(Math.max(value, 0), 100)
  const filledOffset = clamped * (circumference / 100)

  return (
    <div
      data-slot="semi-circle-progress"
      data-orientation={orientation}
      className={cn("relative w-fit", className)}
      style={
        {
          width: size,
          "--scp-filled-segment-color": filledSegmentColor ?? "var(--primary)",
          "--scp-empty-segment-color": emptySegmentColor ?? "var(--muted)",
          "--scp-transition-duration": `${transitionDuration}ms`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {label && (
        <div
          data-slot="semi-circle-progress-label"
          data-position={labelPosition}
          data-orientation={orientation}
          className={cn(
            "absolute inset-x-0 z-1 m-0 text-center",
            labelClasses[labelPosition][orientation],
          )}
          style={{
            paddingInline: thickness * labelPaddingFactor[labelPosition],
          }}
        >
          {label}
        </div>
      )}
      <svg
        data-slot="semi-circle-progress-svg"
        width={size}
        height={size / 2}
        viewBox={`0 0 ${size} ${size / 2}`}
        className={cn(
          "block overflow-hidden",
          flipClasses[orientation][fillDirection],
        )}
      >
        <circle
          data-slot="semi-circle-progress-empty"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          className="stroke-(--scp-empty-segment-color)"
          strokeWidth={thickness}
          strokeDasharray={circumference}
          style={{ strokeDashoffset: circumference }}
        />
        <circle
          data-slot="semi-circle-progress-filled"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          className="stroke-(--scp-filled-segment-color) transition-[stroke-dashoffset,stroke-dasharray,stroke-opacity,stroke] duration-(--scp-transition-duration) ease-[ease]"
          strokeWidth={thickness}
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: filledOffset,
            ...(filledOffset === 0 ? { strokeOpacity: 0 } : null),
          }}
        />
      </svg>
    </div>
  )
}

export { SemiCircleProgress }
export type {
  SemiCircleProgressFillDirection,
  SemiCircleProgressLabelPosition,
  SemiCircleProgressOrientation,
  SemiCircleProgressProps,
}
