import * as React from "react"

import { Button } from "@/components/ui/button"
import { SemiCircleProgress } from "@/components/ui/semi-circle-progress"
import type {
  SemiCircleProgressFillDirection,
  SemiCircleProgressLabelPosition,
  SemiCircleProgressOrientation,
} from "@/components/ui/semi-circle-progress"

export function SemiCircleProgressPlayground({
  value,
  size,
  thickness,
  orientation,
  fillDirection,
  labelPosition,
  transitionDuration,
  withLabel,
}: {
  value: number
  size: number
  thickness: number
  orientation: SemiCircleProgressOrientation
  fillDirection: SemiCircleProgressFillDirection
  labelPosition: SemiCircleProgressLabelPosition
  transitionDuration: number
  withLabel: boolean
}) {
  return (
    <SemiCircleProgress
      value={value}
      size={size}
      thickness={thickness}
      orientation={orientation}
      fillDirection={fillDirection}
      labelPosition={labelPosition}
      transitionDuration={transitionDuration}
      label={
        withLabel ? (
          <span className="text-sm font-bold">{value}%</span>
        ) : undefined
      }
    />
  )
}

export function SemiCircleProgressDefault() {
  return (
    <SemiCircleProgress
      value={60}
      label={<span className="text-sm font-bold">60%</span>}
    />
  )
}

export function SemiCircleProgressColors() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <SemiCircleProgress
        value={72}
        size={160}
        filledSegmentColor="var(--color-emerald-500)"
        emptySegmentColor="var(--color-emerald-100)"
        label={<span className="text-sm font-bold">72%</span>}
      />
      <SemiCircleProgress
        value={35}
        size={160}
        thickness={20}
        filledSegmentColor="var(--color-orange-500)"
        emptySegmentColor="var(--color-orange-100)"
        label={<span className="text-sm font-bold">35%</span>}
      />
    </div>
  )
}

export function SemiCircleProgressOrientations() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {(["up", "down"] as const).map((orientation) =>
        (["left-to-right", "right-to-left"] as const).map((fillDirection) => (
          <SemiCircleProgress
            key={`${orientation}-${fillDirection}`}
            value={65}
            size={140}
            orientation={orientation}
            fillDirection={fillDirection}
            label={
              <span className="text-xs">
                {orientation}, {fillDirection}
              </span>
            }
          />
        )),
      )}
    </div>
  )
}

export function SemiCircleProgressLabelPositions() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {(["bottom", "center"] as const).map((labelPosition) => (
        <SemiCircleProgress
          key={labelPosition}
          value={50}
          size={180}
          labelPosition={labelPosition}
          label={
            <span className="text-sm font-medium">
              Label at {labelPosition}
            </span>
          }
        />
      ))}
    </div>
  )
}

export function SemiCircleProgressAnimated() {
  const [value, setValue] = React.useState(30)

  return (
    <div className="flex flex-col items-center gap-4">
      <SemiCircleProgress
        value={value}
        transitionDuration={400}
        filledSegmentColor={
          value > 70 ? "var(--color-emerald-500)" : "var(--primary)"
        }
        label={<span className="text-sm font-bold">{value}%</span>}
      />
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setValue((v) => Math.max(0, v - 20))}
        >
          Decrease
        </Button>
        <Button onClick={() => setValue((v) => Math.min(100, v + 20))}>
          Increase
        </Button>
      </div>
    </div>
  )
}
