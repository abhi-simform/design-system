import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputPlayground({
  type,
  placeholder,
  disabled,
  invalid,
}: {
  type: "text" | "email" | "password" | "number" | "search" | "file"
  placeholder: string
  disabled: boolean
  invalid: boolean
}) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className="max-w-xs"
    />
  )
}

export function InputTypes() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      {(["text", "email", "password", "number", "search"] as const).map(
        (type) => (
          <div key={type} className="flex flex-col gap-1.5">
            <Label htmlFor={`input-${type}`}>{type}</Label>
            <Input id={`input-${type}`} type={type} placeholder={type} />
          </div>
        ),
      )}
    </div>
  )
}

export function InputStates() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <Input placeholder="Default" />
      <Input placeholder="Disabled" disabled />
      <Input defaultValue="With a value" />
      <Input defaultValue="Invalid value" aria-invalid="true" />
      <Input readOnly defaultValue="Read only" />
    </div>
  )
}

export function InputFile() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="input-file">Attachment</Label>
      <Input id="input-file" type="file" />
    </div>
  )
}
