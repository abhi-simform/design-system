import { Checkbox } from "@/components/ui/checkbox"
import { Fieldset } from "@/components/ui/fieldset"
import type { FieldsetRadius, FieldsetVariant } from "@/components/ui/fieldset"
import { Input } from "@/components/ui/input"

export function FieldsetPlayground({
  legend,
  variant,
  radius,
  disabled,
}: {
  legend: string
  variant: FieldsetVariant
  radius: FieldsetRadius
  disabled: boolean
}) {
  return (
    <Fieldset
      legend={legend}
      variant={variant}
      radius={radius}
      disabled={disabled}
      className="w-80"
    >
      <div className="flex flex-col gap-3">
        <Input placeholder="Your name" />
        <Input placeholder="Email" type="email" />
      </div>
    </Fieldset>
  )
}

export function FieldsetVariants() {
  const variants: FieldsetVariant[] = ["default", "filled", "unstyled"]

  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      {variants.map((variant) => (
        <Fieldset key={variant} legend={`Variant ${variant}`} variant={variant}>
          <Input placeholder="Your name" />
        </Fieldset>
      ))}
    </div>
  )
}

export function FieldsetRadii() {
  const radii: FieldsetRadius[] = ["xs", "sm", "md", "lg", "xl"]

  return (
    <div className="grid w-full gap-4 sm:grid-cols-5">
      {radii.map((radius) => (
        <Fieldset key={radius} legend={`Radius ${radius}`} radius={radius}>
          <Input placeholder="Name" />
        </Fieldset>
      ))}
    </div>
  )
}

export function FieldsetDisabled() {
  return (
    <Fieldset legend="Disabled group" disabled className="w-80">
      <div className="flex flex-col gap-3">
        <Input placeholder="Disabled by the fieldset" />
        <Input placeholder="Also disabled" />
      </div>
    </Fieldset>
  )
}

export function FieldsetWithCheckboxes() {
  return (
    <Fieldset legend="Notifications" variant="filled" className="w-80">
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox defaultChecked /> Email
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox /> SMS
        </label>
      </div>
    </Fieldset>
  )
}
