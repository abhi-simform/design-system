import { Trash2Icon } from "lucide-react"

import { CloseButton } from "@/components/ui/close-button"

type CloseButtonVariant = "subtle" | "transparent"

type CloseButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

export function CloseButtonPlayground({
  variant,
  size,
  disabled,
}: {
  variant: CloseButtonVariant
  size: CloseButtonSize
  disabled: boolean
}) {
  return (
    <CloseButton
      variant={variant}
      size={size}
      disabled={disabled}
      aria-label="Close"
    />
  )
}

export function CloseButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CloseButton variant="subtle" aria-label="Close" />
      <CloseButton variant="transparent" aria-label="Close" />
    </div>
  )
}

export function CloseButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CloseButton size="xs" aria-label="Close" />
      <CloseButton size="sm" aria-label="Close" />
      <CloseButton size="md" aria-label="Close" />
      <CloseButton size="lg" aria-label="Close" />
      <CloseButton size="xl" aria-label="Close" />
    </div>
  )
}

export function CloseButtonCustomIcon() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* iconSize only affects the default X icon — it's ignored once a
          custom icon is passed, so a custom icon sizes itself. */}
      <CloseButton aria-label="Delete" icon={<Trash2Icon />} />
      <CloseButton aria-label="Close" iconSize={12} />
      <CloseButton aria-label="Close" size="xl" iconSize={28} />
    </div>
  )
}

export function CloseButtonStates() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CloseButton aria-label="Close" />
      <CloseButton aria-label="Close" disabled />
    </div>
  )
}

export function CloseButtonWithLabel() {
  return (
    <CloseButton>
      <span className="sr-only">Close</span>
    </CloseButton>
  )
}
