import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LabelPlayground({ children }: { children: string }) {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <Label htmlFor="label-playground">{children}</Label>
      <Input id="label-playground" placeholder="name@example.com" />
    </div>
  )
}

export function LabelWithInput() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <Label htmlFor="label-email">Email address</Label>
      <Input id="label-email" type="email" placeholder="name@example.com" />
    </div>
  )
}

export function LabelWithCheckbox() {
  return (
    <Label className="gap-2.5">
      <Checkbox />
      Remember this device for 30 days
    </Label>
  )
}

export function LabelDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <Label className="gap-2.5">
        <Checkbox disabled />
        Wrapping a disabled control dims the label through peer-disabled
      </Label>
      <div className="group flex flex-col gap-1.5" data-disabled="true">
        <Label>Dimmed by a disabled group</Label>
        <Input disabled placeholder="Disabled" className="max-w-xs" />
      </div>
    </div>
  )
}
