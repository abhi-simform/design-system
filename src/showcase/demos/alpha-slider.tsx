import * as React from "react"

import { AlphaSlider } from "@/components/ui/alpha-slider"
import type { AlphaSliderSize } from "@/components/ui/alpha-slider"
import { ColorSwatch } from "@/components/ui/color-swatch"
import { HueSlider } from "@/components/ui/hue-slider"
import { Label } from "@/components/ui/label"

const DEMO_COLOR = "59 130 246"

export function AlphaSliderPlayground({
  size,
  disabled,
}: {
  size: AlphaSliderSize
  disabled: boolean
}) {
  const [value, setValue] = React.useState(0.65)

  return (
    <div className="flex w-full max-w-sm items-center gap-4">
      <ColorSwatch color={`rgba(${DEMO_COLOR}, ${value})`} size={28} />
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center justify-between text-sm">
          <Label>Alpha</Label>
          <span className="font-mono text-muted-foreground tabular-nums">
            {value.toFixed(2)}
          </span>
        </div>
        <AlphaSlider
          size={size}
          disabled={disabled}
          value={value}
          onValueChange={setValue}
          color={`rgb(${DEMO_COLOR})`}
        />
      </div>
    </div>
  )
}

export function AlphaSliderBasic() {
  return (
    <AlphaSlider
      defaultValue={0.5}
      color={`rgb(${DEMO_COLOR})`}
      className="max-w-sm"
    />
  )
}

export function AlphaSliderSizes() {
  const sizes: AlphaSliderSize[] = ["xs", "sm", "md", "lg", "xl"]

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <Label className="text-xs text-muted-foreground uppercase">
            {size}
          </Label>
          <AlphaSlider
            size={size}
            defaultValue={0.75}
            color={`rgb(${DEMO_COLOR})`}
          />
        </div>
      ))}
    </div>
  )
}

export function AlphaSliderDisabled() {
  return (
    <AlphaSlider
      defaultValue={0.4}
      disabled
      color={`rgb(${DEMO_COLOR})`}
      className="max-w-sm"
    />
  )
}

export function AlphaSliderWithHue() {
  const [hue, setHue] = React.useState(210)
  const [alpha, setAlpha] = React.useState(0.7)
  const color = `hsl(${hue} 100% 50%)`

  return (
    <div className="flex w-full max-w-sm items-center gap-4">
      <ColorSwatch color={`hsl(${hue} 100% 50% / ${alpha})`} size={28} />
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label className="text-xs text-muted-foreground uppercase">Hue</Label>
          <HueSlider value={hue} onValueChange={setHue} />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-xs text-muted-foreground uppercase">
            Alpha
          </Label>
          <AlphaSlider value={alpha} onValueChange={setAlpha} color={color} />
        </div>
      </div>
    </div>
  )
}
