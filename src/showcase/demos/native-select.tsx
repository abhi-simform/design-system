import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

export function NativeSelectPlayground({
  size,
  disabled,
  invalid,
}: {
  size: "sm" | "default"
  disabled: boolean
  invalid: boolean
}) {
  return (
    <NativeSelect
      size={size}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      defaultValue="medium"
      className="w-48"
    >
      <NativeSelectOption value="small">Small</NativeSelectOption>
      <NativeSelectOption value="medium">Medium</NativeSelectOption>
      <NativeSelectOption value="large">Large</NativeSelectOption>
    </NativeSelect>
  )
}

export function NativeSelectSizes() {
  return (
    <div className="flex flex-col gap-4">
      {(["sm", "default"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-1.5">
          <Label htmlFor={`native-${size}`}>size=&quot;{size}&quot;</Label>
          <NativeSelect id={`native-${size}`} size={size} className="w-48">
            <NativeSelectOption value="a">Option A</NativeSelectOption>
            <NativeSelectOption value="b">Option B</NativeSelectOption>
          </NativeSelect>
        </div>
      ))}
    </div>
  )
}

export function NativeSelectGrouped() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <Label htmlFor="native-timezone">Timezone</Label>
      <NativeSelect id="native-timezone" defaultValue="ist">
        <NativeSelectOptGroup label="Asia">
          <NativeSelectOption value="ist">India (IST)</NativeSelectOption>
          <NativeSelectOption value="jst">Japan (JST)</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Europe">
          <NativeSelectOption value="gmt">London (GMT)</NativeSelectOption>
          <NativeSelectOption value="cet">Berlin (CET)</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  )
}

export function NativeSelectStates() {
  return (
    <div className="flex flex-col gap-4">
      <NativeSelect className="w-48">
        <NativeSelectOption>Default</NativeSelectOption>
      </NativeSelect>
      <NativeSelect disabled className="w-48">
        <NativeSelectOption>Disabled</NativeSelectOption>
      </NativeSelect>
      <NativeSelect aria-invalid="true" className="w-48">
        <NativeSelectOption>Invalid</NativeSelectOption>
      </NativeSelect>
    </div>
  )
}
