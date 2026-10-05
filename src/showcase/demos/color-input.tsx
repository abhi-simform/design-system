import * as React from "react"

import { ColorInput } from "@/components/ui/color-input"
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

export function ColorInputPlayground({
  format,
  size,
  showSwatches,
  disallowInput,
  withEyeDropper,
}: {
  format: ColorFormat
  size: ColorPickerSize
  showSwatches: boolean
  disallowInput: boolean
  withEyeDropper: boolean
}) {
  const [value, setValue] = React.useState("#1971c2")

  return (
    <ColorInput
      className="w-64"
      format={format}
      size={size}
      value={value}
      onChange={setValue}
      swatches={showSwatches ? SWATCHES : undefined}
      disallowInput={disallowInput}
      withEyeDropper={withEyeDropper}
    />
  )
}

export function ColorInputBasic() {
  return (
    <ColorInput
      className="w-64"
      defaultValue="#1971c2"
      placeholder="Pick a color"
    />
  )
}

export function ColorInputFormats() {
  const formats: ColorFormat[] = ["hex", "rgba", "hsla"]

  return (
    <div className="flex flex-wrap gap-6">
      {formats.map((format) => (
        <div key={format} className="flex flex-col gap-2">
          <Label className="text-xs text-muted-foreground uppercase">
            {format}
          </Label>
          <ColorInput className="w-56" format={format} defaultValue="#e64980" />
        </div>
      ))}
    </div>
  )
}

export function ColorInputSwatchesOnly() {
  return (
    <ColorInput
      className="w-64"
      defaultValue="#12b886"
      swatches={SWATCHES}
      withPicker={false}
      withEyeDropper={false}
      disallowInput
      closeOnColorSwatchClick
    />
  )
}

export function ColorInputSizes() {
  const sizes: ColorPickerSize[] = ["xs", "sm", "md", "lg", "xl"]

  return (
    <div className="flex flex-wrap gap-6">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <Label className="text-xs text-muted-foreground uppercase">
            {size}
          </Label>
          <ColorInput className="w-56" size={size} defaultValue="#4c6ef5" />
        </div>
      ))}
    </div>
  )
}

export function ColorInputControlled() {
  const [value, setValue] = React.useState("#7950f2")
  const [committed, setCommitted] = React.useState("#7950f2")

  return (
    <div className="flex flex-col gap-3">
      <ColorInput
        className="w-64"
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
