import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function TextareaPlayground({
  placeholder,
  rows,
  disabled,
  invalid,
}: {
  placeholder: string
  rows: number
  disabled: boolean
  invalid: boolean
}) {
  return (
    <Textarea
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className="max-w-sm"
    />
  )
}

export function TextareaBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="textarea-message">Message</Label>
      <Textarea id="textarea-message" placeholder="Tell us what happened…" />
    </div>
  )
}

export function TextareaStates() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <Textarea placeholder="Default" />
      <Textarea placeholder="Disabled" disabled />
      <Textarea defaultValue="Invalid content" aria-invalid="true" />
      <Textarea readOnly defaultValue="Read only" />
    </div>
  )
}

export function TextareaAutoGrow() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="textarea-grow">Auto-growing</Label>
      <Textarea
        id="textarea-grow"
        defaultValue="This textarea uses field-sizing-content, so it grows with what you type instead of scrolling. Add more lines and watch it expand."
      />
      <p className="text-xs text-muted-foreground">
        Powered by the CSS field-sizing property — no resize observer.
      </p>
    </div>
  )
}
