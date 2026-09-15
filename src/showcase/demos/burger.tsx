import * as React from "react"
import { Burger } from "@/components/ui/burger"

export function BurgerPlayground({
  size,
  opened,
  disabled,
}: {
  size: "xs" | "sm" | "md" | "lg" | "xl"
  opened: boolean
  disabled: boolean
}) {
  return (
    <Burger
      size={size}
      opened={opened}
      disabled={disabled}
      aria-label="Toggle navigation"
    />
  )
}

export function BurgerSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Burger key={size} size={size} aria-label="Toggle navigation" />
      ))}
    </div>
  )
}

export function BurgerControlled() {
  const [opened, setOpened] = React.useState(false)

  return (
    <Burger
      opened={opened}
      onClick={() => setOpened((value) => !value)}
      aria-label="Toggle navigation"
    />
  )
}

export function BurgerCustomLineSize() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Burger lineSize={1} size="lg" aria-label="Toggle navigation" />
      <Burger lineSize={4} size="lg" aria-label="Toggle navigation" />
    </div>
  )
}
