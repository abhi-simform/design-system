import * as React from "react"

import { ColorPicker } from "@/components/ui/color-picker"
import type { ColorFormat, ColorPickerSize } from "@/components/ui/color-picker"
import { Label } from "@/components/ui/label"

const SWATCHES = [
  "#25262b",
  "#868e96",
  "#fa5252",
  "#e64980",
  "#be4bdb",
  "#7950f2",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057",
  "#82c91e",
  "#fab005",
  "#fd7e14",
]

export function ColorPickerPlayground({
  format,
  size,
  showSwatches,
}: {
  format: ColorFormat
  size: ColorPickerSize
  showSwatches: boolean
}) {
  const [value, setValue] = React.useState("#1971c2")

  return (
    <ColorPicker
      format={format}
      size={size}
      value={value}
      onChange={setValue}
      swatches={showSwatches ? SWATCHES : undefined}
    />
  )
}

export function ColorPickerBasic() {
  return <ColorPicker defaultValue="#1971c2" />
}

export function ColorPickerFormats() {
  const formats: ColorFormat[] = ["hex", "rgba", "hsla"]

  return (
    <div className="flex flex-wrap gap-6">
      {formats.map((format) => (
        <div key={format} className="flex flex-col gap-2">
          <Label className="text-xs text-muted-foreground uppercase">
            {format}
          </Label>
          <ColorPicker format={format} defaultValue="#e64980" />
        </div>
      ))}
    </div>
  )
}

export function ColorPickerSwatches() {
  return (
    <ColorPicker
      format="hex"
      defaultValue="#12b886"
      swatches={SWATCHES}
      withPicker={false}
    />
  )
}

export function ColorPickerSizes() {
  const sizes: ColorPickerSize[] = ["xs", "sm", "md", "lg", "xl"]

  return (
    <div className="flex flex-wrap gap-6">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <Label className="text-xs text-muted-foreground uppercase">
            {size}
          </Label>
          <ColorPicker size={size} defaultValue="#4c6ef5" />
        </div>
      ))}
    </div>
  )
}

export function ColorPickerControlled() {
  const [value, setValue] = React.useState("#7950f2")
  const [committed, setCommitted] = React.useState("#7950f2")

  return (
    <div className="flex flex-col gap-3">
      <ColorPicker
        format="hsla"
        value={value}
        onChange={setValue}
        onChangeEnd={setCommitted}
        swatches={SWATCHES}
      />
      <div className="flex flex-col gap-1 text-sm">
        <span className="font-mono text-muted-foreground">live: {value}</span>
        <span className="font-mono text-muted-foreground">
          committed: {committed}
        </span>
      </div>
    </div>
  )
}
