import * as React from "react"

import { ColorSwatch } from "@/components/ui/color-swatch"
import { HueSlider } from "@/components/ui/hue-slider"
import type { HueSliderSize } from "@/components/ui/hue-slider"
import { Label } from "@/components/ui/label"

export function HueSliderPlayground({
  size,
  disabled,
}: {
  size: HueSliderSize
  disabled: boolean
}) {
  const [value, setValue] = React.useState(200)

  return (
    <div className="flex w-full max-w-sm items-center gap-4">
      <ColorSwatch color={`hsl(${value} 100% 50%)`} size={28} />
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center justify-between text-sm">
          <Label>Hue</Label>
          <span className="font-mono text-muted-foreground tabular-nums">
            {value}
          </span>
        </div>
        <HueSlider
          size={size}
          disabled={disabled}
          value={value}
          onValueChange={setValue}
        />
      </div>
    </div>
  )
}

export function HueSliderBasic() {
  return <HueSlider defaultValue={210} className="max-w-sm" />
}

export function HueSliderSizes() {
  const sizes: HueSliderSize[] = ["xs", "sm", "md", "lg", "xl"]

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <Label className="text-xs text-muted-foreground uppercase">
            {size}
          </Label>
          <HueSlider size={size} defaultValue={280} />
        </div>
      ))}
    </div>
  )
}

export function HueSliderDisabled() {
  return <HueSlider defaultValue={150} disabled className="max-w-sm" />
}
