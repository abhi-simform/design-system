import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxPlayground({
  disabled,
  invalid,
}: {
  disabled: boolean
  invalid: boolean
}) {
  // Presentation comes from the controls; the checked value stays local so
  // clicking the checkbox always works.
  const [checked, setChecked] = React.useState(true)

  return (
    <Label className="gap-2.5">
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        disabled={disabled}
        aria-invalid={invalid || undefined}
      />
      Accept terms and conditions
    </Label>
  )
}

export function CheckboxStates() {
  return (
    <div className="flex flex-col gap-4">
      <Label className="gap-2.5">
        <Checkbox />
        Unchecked
      </Label>
      <Label className="gap-2.5">
        <Checkbox defaultChecked />
        Checked
      </Label>
      <Label className="gap-2.5">
        <Checkbox indeterminate />
        Indeterminate
      </Label>
      <Label className="gap-2.5">
        <Checkbox disabled />
        Disabled
      </Label>
      <Label className="gap-2.5">
        <Checkbox disabled defaultChecked />
        Disabled and checked
      </Label>
      <Label className="gap-2.5">
        <Checkbox aria-invalid="true" />
        Invalid
      </Label>
    </div>
  )
}

export function CheckboxGroup() {
  const items = ["Recents", "Home", "Applications", "Desktop"]
  const [selected, setSelected] = React.useState<string[]>(["Recents", "Home"])

  const allChecked = selected.length === items.length
  const someChecked = selected.length > 0 && !allChecked

  return (
    <div className="flex flex-col gap-3">
      <Label className="gap-2.5 font-medium">
        <Checkbox
          checked={allChecked}
          indeterminate={someChecked}
          onCheckedChange={(checked) => setSelected(checked ? [...items] : [])}
        />
        Sidebar items
      </Label>
      <div className="flex flex-col gap-3 pl-6">
        {items.map((item) => (
          <Label key={item} className="gap-2.5">
            <Checkbox
              checked={selected.includes(item)}
              onCheckedChange={(checked) =>
                setSelected((current) =>
                  checked
                    ? [...current, item]
                    : current.filter((entry) => entry !== item),
                )
              }
            />
            {item}
          </Label>
        ))}
      </div>
    </div>
  )
}
