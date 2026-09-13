import { CheckIcon } from "lucide-react"

import {
  ColorSwatch,
  type ColorSwatchRadius,
} from "@/components/ui/color-swatch"
import { useClipboard } from "@/hooks/use-clipboard"

export function ColorSwatchPlayground({
  color,
  size,
  radius,
  withShadow,
}: {
  color: string
  size: number
  radius: ColorSwatchRadius
  withShadow: boolean
}) {
  return (
    <ColorSwatch
      color={color}
      size={size}
      radius={radius}
      withShadow={withShadow}
    />
  )
}

// Literal values, not var(--color-*) references — a handful of these tokens
// (purple, geekblue, magenta, volcano, lime) are only ever inlined into the
// Tailwind utilities that use them (bg-purple, etc.) and never emitted as a
// standalone custom property, so var(--color-purple) resolves to nothing.
const PALETTE = [
  { name: "pink", color: "oklch(0.6559 0.2118 354.3084)" },
  { name: "red", color: "oklch(0.621 0.2381 26.074)" },
  { name: "yellow", color: "oklch(0.8903 0.1818 98.639)" },
  { name: "orange", color: "oklch(0.7444 0.1724 58.4708)" },
  { name: "cyan", color: "oklch(0.7381 0.1238 194.8046)" },
  { name: "green", color: "oklch(0.7256 0.2182 138.4875)" },
  { name: "blue", color: "oklch(0.6512 0.191 252.7826)" },
  { name: "purple", color: "oklch(0.4942 0.2284 295.5827)" },
  { name: "geekblue", color: "oklch(0.5218 0.2301 266.8492)" },
  { name: "magenta", color: "oklch(0.6338 0.2345 353.1528)" },
  { name: "volcano", color: "oklch(0.6676 0.2112 36.9016)" },
  { name: "gold", color: "oklch(0.8016 0.1651 76.0012)" },
  { name: "lime", color: "oklch(0.8157 0.2061 126.5302)" },
]

export function ColorSwatchPalette() {
  return (
    <div className="flex flex-wrap gap-2">
      {PALETTE.map(({ name, color }) => (
        <ColorSwatch key={name} color={color} />
      ))}
    </div>
  )
}

const ALPHA_COLORS = [
  "rgba(234, 22, 174, 0.5)",
  "rgba(0, 128, 0, 0.35)",
  "rgba(20, 120, 230, 0.65)",
]

export function ColorSwatchAlphaColors() {
  return (
    <div className="flex flex-wrap gap-2">
      {ALPHA_COLORS.map((color) => (
        <ColorSwatch key={color} color={color} size={40} />
      ))}
    </div>
  )
}

export function ColorSwatchWithChildren() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ColorSwatch color="var(--color-blue)">
        <CheckIcon className="size-3.5 text-white" />
      </ColorSwatch>
      <ColorSwatch color="var(--color-green)" withShadow={false}>
        <CheckIcon className="size-3.5 text-white" />
      </ColorSwatch>
    </div>
  )
}

const COPY_COLORS = [
  { name: "Pink", value: "var(--color-pink)" },
  { name: "Cyan", value: "var(--color-cyan)" },
  { name: "Gold", value: "var(--color-gold)" },
]

export function ColorSwatchCopyOnClick() {
  const clipboard = useClipboard({ timeout: 1000 })

  return (
    <div className="flex flex-wrap items-center gap-3">
      {COPY_COLORS.map(({ name, value }) => (
        <ColorSwatch
          key={name}
          color={value}
          render={<button type="button" aria-label={`Copy ${name}`} />}
          onClick={() => clipboard.copy(value)}
        />
      ))}
      <span className="text-sm text-muted-foreground">
        {clipboard.copied ? "Copied!" : "Click a swatch to copy its color"}
      </span>
    </div>
  )
}
