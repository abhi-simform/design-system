import { ArrowRightIcon, MailIcon, PlusIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

type ButtonVariant =
  "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"

type ButtonSize =
  "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"

export function ButtonPlayground({
  variant,
  size,
  children,
  disabled,
}: {
  variant: ButtonVariant
  size: ButtonSize
  children: string
  disabled: boolean
}) {
  return (
    <Button variant={variant} size={size} disabled={disabled}>
      {children}
    </Button>
  )
}

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}

export function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}

export function ButtonIconSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="icon-xs" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button size="icon" variant="secondary" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button size="icon-lg" variant="ghost" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
  )
}

export function ButtonWithIcons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <MailIcon data-icon="inline-start" />
        Email
      </Button>
      <Button variant="outline">
        Continue
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
      <Button variant="destructive">
        <Trash2Icon data-icon="inline-start" />
        Delete
      </Button>
    </div>
  )
}

export function ButtonStates() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Enabled</Button>
      <Button disabled>Disabled</Button>
      <Button variant="outline" aria-invalid="true">
        Invalid
      </Button>
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Saving
      </Button>
    </div>
  )
}

export function ButtonAsLink() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* nativeButton={false} tells Base UI the rendered element is not a
          <button>, which keeps the correct semantics for an anchor. */}
      <Button nativeButton={false} render={<a href="#/components/badge" />}>
        Go to Badge
      </Button>
      <Button
        variant="link"
        nativeButton={false}
        render={<a href="#/foundations/colors" />}
      >
        Colour tokens
      </Button>
    </div>
  )
}
