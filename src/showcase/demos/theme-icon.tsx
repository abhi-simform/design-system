import { StarIcon } from "lucide-react"

import {
  ThemeIcon,
  type ThemeIconColor,
  type ThemeIconRadius,
  type ThemeIconSize,
  type ThemeIconVariant,
} from "@/components/ui/theme-icon"

export function ThemeIconPlayground({
  variant,
  color,
  size,
  radius,
}: {
  variant: ThemeIconVariant
  color: ThemeIconColor
  size: ThemeIconSize
  radius: ThemeIconRadius
}) {
  return (
    <ThemeIcon variant={variant} color={color} size={size} radius={radius}>
      <StarIcon />
    </ThemeIcon>
  )
}

const VARIANTS: ThemeIconVariant[] = [
  "filled",
  "light",
  "outline",
  "transparent",
  "white",
  "default",
]

export function ThemeIconVariants() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-2">
          <ThemeIcon variant={variant}>
            <StarIcon />
          </ThemeIcon>
          <span className="text-xs text-muted-foreground">{variant}</span>
        </div>
      ))}
    </div>
  )
}

const COLORS: ThemeIconColor[] = [
  "primary",
  "secondary",
  "destructive",
  "accent",
  "muted",
  "pink",
  "red",
  "yellow",
  "orange",
  "cyan",
  "green",
  "blue",
  "purple",
  "geekblue",
  "magenta",
  "volcano",
  "gold",
  "lime",
]

export function ThemeIconColors() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {COLORS.map((color) => (
        <div key={color} className="flex flex-col items-center gap-2">
          <ThemeIcon color={color}>
            <StarIcon />
          </ThemeIcon>
          <span className="text-xs text-muted-foreground">{color}</span>
        </div>
      ))}
    </div>
  )
}

const SIZES: { size: ThemeIconSize; px: number }[] = [
  { size: "xs", px: 18 },
  { size: "sm", px: 22 },
  { size: "md", px: 28 },
  { size: "lg", px: 34 },
  { size: "xl", px: 44 },
]

export function ThemeIconSizes() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      {SIZES.map(({ size, px }) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <ThemeIcon size={size}>
            <StarIcon />
          </ThemeIcon>
          <span className="text-xs text-muted-foreground">
            {size} ({px}px)
          </span>
        </div>
      ))}
    </div>
  )
}

const RADIUSES: ThemeIconRadius[] = ["xs", "sm", "md", "lg", "xl"]

export function ThemeIconRadiusValues() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <ThemeIcon color="secondary">
          <StarIcon />
        </ThemeIcon>
        <span className="text-xs text-muted-foreground">default</span>
      </div>
      {RADIUSES.map((radius) => (
        <div key={radius} className="flex flex-col items-center gap-2">
          <ThemeIcon color="secondary" radius={radius}>
            <StarIcon />
          </ThemeIcon>
          <span className="text-xs text-muted-foreground">{radius}</span>
        </div>
      ))}
    </div>
  )
}

const PALETTE_SAMPLE: ThemeIconColor[] = ["blue", "green", "purple", "gold"]

export function ThemeIconPaletteVariants() {
  return (
    <div className="flex flex-col gap-4">
      {PALETTE_SAMPLE.map((color) => (
        <div key={color} className="flex flex-wrap items-center gap-3">
          <span className="w-16 text-xs text-muted-foreground">{color}</span>
          {VARIANTS.map((variant) => (
            <ThemeIcon key={variant} variant={variant} color={color}>
              <StarIcon />
            </ThemeIcon>
          ))}
        </div>
      ))}
    </div>
  )
}
