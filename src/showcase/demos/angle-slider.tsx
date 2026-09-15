import * as React from "react"

import { AngleSlider } from "@/components/ui/angle-slider"

const OCTANT_MARKS = [
  { value: 0 },
  { value: 45 },
  { value: 90 },
  { value: 135 },
  { value: 180 },
  { value: 225 },
  { value: 270 },
  { value: 315 },
]

export function AngleSliderPlayground({
  disabled,
  withLabel,
  restrictToMarks,
}: {
  disabled: boolean
  withLabel: boolean
  restrictToMarks: boolean
}) {
  const [value, setValue] = React.useState(60)

  return (
    <div className="flex flex-col items-center gap-3">
      <AngleSlider
        aria-label="Angle"
        value={value}
        onChange={setValue}
        disabled={disabled}
        withLabel={withLabel}
        restrictToMarks={restrictToMarks}
        marks={restrictToMarks ? OCTANT_MARKS : undefined}
      />
      <span className="font-mono text-sm text-muted-foreground tabular-nums">
        {value}°
      </span>
    </div>
  )
}

export function AngleSliderBasic() {
  return <AngleSlider aria-label="Angle" defaultValue={60} />
}

export function AngleSliderFormatLabel() {
  return (
    <AngleSlider
      aria-label="Angle"
      defaultValue={120}
      formatLabel={(value) => `${value}°`}
    />
  )
}

export function AngleSliderMarks() {
  return (
    <AngleSlider
      aria-label="Angle"
      size={100}
      restrictToMarks
      formatLabel={(value) => `${value}°`}
      marks={OCTANT_MARKS}
    />
  )
}

export function AngleSliderDisabled() {
  return <AngleSlider aria-label="Angle" defaultValue={45} disabled />
}
