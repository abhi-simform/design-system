import * as React from "react"
import { HeartIcon } from "lucide-react"

import {
  Chip,
  type ChipColor,
  type ChipRadius,
  type ChipSize,
  type ChipVariant,
} from "@/components/ui/chip"

export function ChipPlayground({
  variant,
  size,
  radius,
  color,
  autoContrast,
  disabled,
  children,
}: {
  variant: ChipVariant
  size: ChipSize
  radius: ChipRadius
  color: ChipColor
  autoContrast: boolean
  disabled: boolean
  children: string
}) {
  return (
    <Chip
      defaultChecked
      variant={variant}
      size={size}
      radius={radius}
      color={color}
      autoContrast={autoContrast}
      disabled={disabled}
    >
      {children}
    </Chip>
  )
}

export function ChipControlled() {
  const [checked, setChecked] = React.useState(true)

  return (
    <div className="flex items-center gap-3">
      <Chip checked={checked} onChange={setChecked}>
        {checked ? "Awesome" : "Not yet"}
      </Chip>
    </div>
  )
}

export function ChipVariants() {
  const variants: ChipVariant[] = ["filled", "light", "outline"]

  return (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Chip key={variant} variant={variant} defaultChecked>
          {variant}
        </Chip>
      ))}
    </div>
  )
}

export function ChipSizes() {
  const sizes: ChipSize[] = ["xs", "sm", "md", "lg", "xl"]

  return (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Chip key={size} size={size} defaultChecked>
          {size}
        </Chip>
      ))}
    </div>
  )
}

export function ChipRadii() {
  const radii: ChipRadius[] = ["xs", "sm", "md", "lg", "xl", "full"]

  return (
    <div className="flex flex-wrap items-center gap-3">
      {radii.map((radius) => (
        <Chip key={radius} radius={radius} defaultChecked>
          {radius}
        </Chip>
      ))}
    </div>
  )
}

export function ChipColors() {
  const colors: ChipColor[] = [
    "primary",
    "destructive",
    "blue",
    "green",
    "orange",
    "purple",
    "yellow",
  ]
  const variants: ChipVariant[] = ["filled", "light", "outline"]

  return (
    <div className="flex flex-col gap-3">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-3">
          {colors.map((color) => (
            <Chip key={color} variant={variant} color={color} defaultChecked>
              {color}
            </Chip>
          ))}
        </div>
      ))}
    </div>
  )
}

export function ChipAutoContrast() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip color="yellow" defaultChecked>
        Default text
      </Chip>
      <Chip color="yellow" autoContrast defaultChecked>
        autoContrast
      </Chip>
      <Chip color="lime" autoContrast defaultChecked>
        autoContrast
      </Chip>
    </div>
  )
}

export function ChipCustomIcon() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip
        defaultChecked
        color="destructive"
        icon={<HeartIcon className="size-3 fill-current" />}
      >
        Custom icon
      </Chip>
      <Chip defaultChecked icon={null}>
        No icon
      </Chip>
    </div>
  )
}

export function ChipDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip disabled>Unchecked</Chip>
      <Chip disabled defaultChecked>
        Checked
      </Chip>
    </div>
  )
}

export function ChipGroupSingle() {
  const [value, setValue] = React.useState<string | null>("react")

  return (
    <div className="flex flex-col gap-3">
      <Chip.Group value={value} onChange={setValue}>
        <div className="flex flex-wrap gap-2">
          <Chip value="react">React</Chip>
          <Chip value="vue">Vue</Chip>
          <Chip value="svelte">Svelte</Chip>
        </div>
      </Chip.Group>
      <p className="text-sm text-muted-foreground">
        Selected: {value ?? "none"}
      </p>
    </div>
  )
}

export function ChipGroupMultiple() {
  const [value, setValue] = React.useState<string[]>(["react", "svelte"])

  return (
    <div className="flex flex-col gap-3">
      <Chip.Group multiple value={value} onChange={setValue}>
        <div className="flex flex-wrap gap-2">
          <Chip value="react" variant="light">
            React
          </Chip>
          <Chip value="vue" variant="light">
            Vue
          </Chip>
          <Chip value="svelte" variant="light">
            Svelte
          </Chip>
          <Chip value="solid" variant="light" disabled>
            Solid
          </Chip>
        </div>
      </Chip.Group>
      <p className="text-sm text-muted-foreground">
        Selected: {value.length ? value.join(", ") : "none"}
      </p>
    </div>
  )
}

export function ChipGroupUncontrolled() {
  return (
    <Chip.Group multiple defaultValue={["b"]}>
      <div className="flex flex-wrap gap-2">
        <Chip value="a" variant="outline">
          Alpha
        </Chip>
        <Chip value="b" variant="outline">
          Beta
        </Chip>
        <Chip value="c" variant="outline">
          Gamma
        </Chip>
      </div>
    </Chip.Group>
  )
}
