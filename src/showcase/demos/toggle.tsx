import * as React from "react"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export function TogglePlayground({
  variant,
  size,
  disabled,
}: {
  variant: "default" | "outline"
  size: "default" | "sm" | "lg"
  disabled: boolean
}) {
  // The playground owns presentation; the demo owns the value, so clicking
  // the toggle never fights a control.
  const [pressed, setPressed] = React.useState(false)

  return (
    <Toggle
      variant={variant}
      size={size}
      disabled={disabled}
      pressed={pressed}
      onPressedChange={setPressed}
      aria-label="Bold"
    >
      <BoldIcon />
    </Toggle>
  )
}

export function ToggleVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Italic">
        <ItalicIcon />
      </Toggle>
    </div>
  )
}

export function ToggleSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle size="sm" variant="outline" aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle size="default" variant="outline" aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle size="lg" variant="outline" aria-label="Bold">
        <BoldIcon />
      </Toggle>
    </div>
  )
}

export function ToggleWithText() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle variant="outline" defaultPressed>
        <UnderlineIcon data-icon="inline-start" />
        Underline
      </Toggle>
      <Toggle disabled>
        <BoldIcon data-icon="inline-start" />
        Disabled
      </Toggle>
    </div>
  )
}
