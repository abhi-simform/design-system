import * as React from "react"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function SliderPlayground({
  min,
  max,
  step,
  disabled,
}: {
  min: number
  max: number
  step: number
  disabled: boolean
}) {
  const [value, setValue] = React.useState(50)

  const clamped = Math.min(Math.max(value, min), max)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center justify-between text-sm">
        <Label>Volume</Label>
        <span className="font-mono text-muted-foreground tabular-nums">
          {clamped}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        value={clamped}
        onValueChange={(next) =>
          setValue(typeof next === "number" ? next : (next[0] ?? clamped))
        }
      />
    </div>
  )
}

export function SliderBasic() {
  return <Slider defaultValue={33} className="w-full max-w-sm" />
}

export function SliderRange() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      {/* Thumb count is derived from the array length. */}
      <Slider defaultValue={[25, 75]} />
      <p className="text-xs text-muted-foreground">
        An array value renders one thumb per entry.
      </p>
    </div>
  )
}

export function SliderSteps() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label>step={"{1}"} — continuous</Label>
        <Slider defaultValue={40} step={1} />
      </div>
      <div className="flex flex-col gap-2">
        <Label>step={"{25}"} — quarters</Label>
        <Slider defaultValue={50} step={25} />
      </div>
    </div>
  )
}

export function SliderDisabled() {
  return <Slider defaultValue={60} disabled className="w-full max-w-sm" />
}
