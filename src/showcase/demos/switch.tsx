import * as React from "react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchPlayground({
  size,
  disabled,
  invalid,
}: {
  size: "sm" | "default"
  disabled: boolean
  invalid: boolean
}) {
  const [checked, setChecked] = React.useState(true)

  return (
    <Label className="gap-2.5">
      <Switch
        size={size}
        checked={checked}
        onCheckedChange={setChecked}
        disabled={disabled}
        aria-invalid={invalid || undefined}
      />
      Enable notifications
    </Label>
  )
}

export function SwitchSizes() {
  return (
    <div className="flex flex-col gap-4">
      <Label className="gap-2.5">
        <Switch size="sm" defaultChecked />
        size=&quot;sm&quot;
      </Label>
      <Label className="gap-2.5">
        <Switch size="default" defaultChecked />
        size=&quot;default&quot;
      </Label>
    </div>
  )
}

export function SwitchStates() {
  return (
    <div className="flex flex-col gap-4">
      <Label className="gap-2.5">
        <Switch />
        Off
      </Label>
      <Label className="gap-2.5">
        <Switch defaultChecked />
        On
      </Label>
      <Label className="gap-2.5">
        <Switch disabled />
        Disabled
      </Label>
      <Label className="gap-2.5">
        <Switch disabled defaultChecked />
        Disabled and on
      </Label>
    </div>
  )
}

export function SwitchInSettings() {
  return (
    <div className="flex w-full max-w-sm flex-col divide-y rounded-xl border">
      {[
        { id: "marketing", label: "Marketing emails", on: false },
        { id: "security", label: "Security alerts", on: true },
        { id: "digest", label: "Weekly digest", on: true },
      ].map((row) => (
        <div key={row.id} className="flex items-center justify-between p-3">
          <Label htmlFor={`switch-${row.id}`} className="font-normal">
            {row.label}
          </Label>
          <Switch id={`switch-${row.id}`} defaultChecked={row.on} />
        </div>
      ))}
    </div>
  )
}
