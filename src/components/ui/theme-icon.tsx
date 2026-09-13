import * as React from "react"
import { cn } from "cn"

type ThemeIconVariant =
  "filled" | "light" | "outline" | "transparent" | "white" | "default"

type ThemeIconColor =
  | "primary"
  | "secondary"
  | "destructive"
  | "accent"
  | "muted"
  | "pink"
  | "red"
  | "yellow"
  | "orange"
  | "cyan"
  | "green"
  | "blue"
  | "purple"
  | "geekblue"
  | "magenta"
  | "volcano"
  | "gold"
  | "lime"

type ThemeIconSize = "xs" | "sm" | "md" | "lg" | "xl"
type ThemeIconRadius = "xs" | "sm" | "md" | "lg" | "xl"

const SIZE_CLASSES: Record<ThemeIconSize, string> = {
  xs: "size-4.5",
  sm: "size-5.5",
  md: "size-7",
  lg: "size-8.5",
  xl: "size-11",
}

const RADIUS_CLASSES: Record<ThemeIconRadius, string> = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
}

type ColorVariantClasses = Record<Exclude<ThemeIconVariant, "default">, string>

// `secondary`/`accent`/`muted` are near-white/gray surface tokens, not
// legible hues — their light/outline/transparent/white variants use the
// paired `-foreground` class instead of the raw token as text color.
const COLOR_VARIANT_CLASSES: Record<ThemeIconColor, ColorVariantClasses> = {
  primary: {
    filled: "border-transparent bg-primary text-primary-foreground",
    light: "border-transparent bg-primary/10 text-primary dark:bg-primary/20",
    outline: "border-primary bg-transparent text-primary",
    transparent: "border-transparent bg-transparent text-primary",
    white: "border-transparent bg-card text-primary",
  },
  secondary: {
    filled: "border-transparent bg-secondary text-secondary-foreground",
    light:
      "border-transparent bg-secondary/10 text-secondary-foreground dark:bg-secondary/20",
    outline: "border-secondary bg-transparent text-secondary-foreground",
    transparent: "border-transparent bg-transparent text-secondary-foreground",
    white: "border-transparent bg-card text-secondary-foreground",
  },
  destructive: {
    filled: "border-transparent bg-destructive text-white",
    light:
      "border-transparent bg-destructive/10 text-destructive dark:bg-destructive/20",
    outline: "border-destructive bg-transparent text-destructive",
    transparent: "border-transparent bg-transparent text-destructive",
    white: "border-transparent bg-card text-destructive",
  },
  accent: {
    filled: "border-transparent bg-accent text-accent-foreground",
    light:
      "border-transparent bg-accent/10 text-accent-foreground dark:bg-accent/20",
    outline: "border-accent bg-transparent text-accent-foreground",
    transparent: "border-transparent bg-transparent text-accent-foreground",
    white: "border-transparent bg-card text-accent-foreground",
  },
  muted: {
    filled: "border-transparent bg-muted text-muted-foreground",
    light:
      "border-transparent bg-muted/10 text-muted-foreground dark:bg-muted/20",
    outline: "border-muted bg-transparent text-muted-foreground",
    transparent: "border-transparent bg-transparent text-muted-foreground",
    white: "border-transparent bg-card text-muted-foreground",
  },
  pink: {
    filled: "border-transparent bg-pink text-white",
    light: "border-transparent bg-pink/10 text-pink dark:bg-pink/20",
    outline: "border-pink bg-transparent text-pink",
    transparent: "border-transparent bg-transparent text-pink",
    white: "border-transparent bg-card text-pink",
  },
  red: {
    filled: "border-transparent bg-red text-white",
    light: "border-transparent bg-red/10 text-red dark:bg-red/20",
    outline: "border-red bg-transparent text-red",
    transparent: "border-transparent bg-transparent text-red",
    white: "border-transparent bg-card text-red",
  },
  yellow: {
    filled: "border-transparent bg-yellow text-white",
    light: "border-transparent bg-yellow/10 text-yellow dark:bg-yellow/20",
    outline: "border-yellow bg-transparent text-yellow",
    transparent: "border-transparent bg-transparent text-yellow",
    white: "border-transparent bg-card text-yellow",
  },
  orange: {
    filled: "border-transparent bg-orange text-white",
    light: "border-transparent bg-orange/10 text-orange dark:bg-orange/20",
    outline: "border-orange bg-transparent text-orange",
    transparent: "border-transparent bg-transparent text-orange",
    white: "border-transparent bg-card text-orange",
  },
  cyan: {
    filled: "border-transparent bg-cyan text-white",
    light: "border-transparent bg-cyan/10 text-cyan dark:bg-cyan/20",
    outline: "border-cyan bg-transparent text-cyan",
    transparent: "border-transparent bg-transparent text-cyan",
    white: "border-transparent bg-card text-cyan",
  },
  green: {
    filled: "border-transparent bg-green text-white",
    light: "border-transparent bg-green/10 text-green dark:bg-green/20",
    outline: "border-green bg-transparent text-green",
    transparent: "border-transparent bg-transparent text-green",
    white: "border-transparent bg-card text-green",
  },
  blue: {
    filled: "border-transparent bg-blue text-white",
    light: "border-transparent bg-blue/10 text-blue dark:bg-blue/20",
    outline: "border-blue bg-transparent text-blue",
    transparent: "border-transparent bg-transparent text-blue",
    white: "border-transparent bg-card text-blue",
  },
  purple: {
    filled: "border-transparent bg-purple text-white",
    light: "border-transparent bg-purple/10 text-purple dark:bg-purple/20",
    outline: "border-purple bg-transparent text-purple",
    transparent: "border-transparent bg-transparent text-purple",
    white: "border-transparent bg-card text-purple",
  },
  geekblue: {
    filled: "border-transparent bg-geekblue text-white",
    light:
      "border-transparent bg-geekblue/10 text-geekblue dark:bg-geekblue/20",
    outline: "border-geekblue bg-transparent text-geekblue",
    transparent: "border-transparent bg-transparent text-geekblue",
    white: "border-transparent bg-card text-geekblue",
  },
  magenta: {
    filled: "border-transparent bg-magenta text-white",
    light: "border-transparent bg-magenta/10 text-magenta dark:bg-magenta/20",
    outline: "border-magenta bg-transparent text-magenta",
    transparent: "border-transparent bg-transparent text-magenta",
    white: "border-transparent bg-card text-magenta",
  },
  volcano: {
    filled: "border-transparent bg-volcano text-white",
    light: "border-transparent bg-volcano/10 text-volcano dark:bg-volcano/20",
    outline: "border-volcano bg-transparent text-volcano",
    transparent: "border-transparent bg-transparent text-volcano",
    white: "border-transparent bg-card text-volcano",
  },
  gold: {
    filled: "border-transparent bg-gold text-white",
    light: "border-transparent bg-gold/10 text-gold dark:bg-gold/20",
    outline: "border-gold bg-transparent text-gold",
    transparent: "border-transparent bg-transparent text-gold",
    white: "border-transparent bg-card text-gold",
  },
  lime: {
    filled: "border-transparent bg-lime text-white",
    light: "border-transparent bg-lime/10 text-lime dark:bg-lime/20",
    outline: "border-lime bg-transparent text-lime",
    transparent: "border-transparent bg-transparent text-lime",
    white: "border-transparent bg-card text-lime",
  },
}

// `default` is a fixed neutral look that ignores `color` entirely, matching
// Mantine's own ThemeIcon behavior for this variant.
const DEFAULT_VARIANT_CLASSES =
  "border-border bg-background text-foreground dark:border-input dark:bg-input/30"

function getVariantClasses(
  variant: ThemeIconVariant,
  color: ThemeIconColor,
): string {
  return variant === "default"
    ? DEFAULT_VARIANT_CLASSES
    : COLOR_VARIANT_CLASSES[color][variant]
}

interface ThemeIconProps extends React.ComponentProps<"div"> {
  variant?: ThemeIconVariant
  color?: ThemeIconColor
  size?: ThemeIconSize | number
  radius?: ThemeIconRadius | number
}

function ThemeIcon({
  className,
  style,
  variant = "filled",
  color = "primary",
  size = "md",
  radius,
  ...props
}: ThemeIconProps) {
  return (
    <div
      data-slot="theme-icon"
      className={cn(
        "inline-flex shrink-0 items-center justify-center border select-none",
        typeof size === "number" ? "size-(--ti-size)" : SIZE_CLASSES[size],
        typeof radius === "number"
          ? "rounded-(--ti-radius)"
          : radius
            ? RADIUS_CLASSES[radius]
            : "rounded-lg",
        getVariantClasses(variant, color),
        "[&_svg:not([class*='size-'])]:size-[70%]",
        className,
      )}
      style={
        {
          ...(typeof size === "number" ? { "--ti-size": `${size}px` } : null),
          ...(typeof radius === "number"
            ? { "--ti-radius": `${radius}px` }
            : null),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { ThemeIcon }
export type {
  ThemeIconProps,
  ThemeIconVariant,
  ThemeIconColor,
  ThemeIconSize,
  ThemeIconRadius,
}
