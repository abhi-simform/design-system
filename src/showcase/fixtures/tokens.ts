/**
 * Token names only — values are read from the live DOM with
 * `getComputedStyle` so this list can never drift out of sync with
 * `src/index.css`.
 */

export type TokenGroup = {
  title: string
  description: string
  tokens: readonly string[]
}

export const COLOR_TOKEN_GROUPS: readonly TokenGroup[] = [
  {
    title: "Surfaces",
    description: "Page, card, and popover backgrounds with their paired text.",
    tokens: [
      "--background",
      "--foreground",
      "--card",
      "--card-foreground",
      "--popover",
      "--popover-foreground",
    ],
  },
  {
    title: "Brand",
    description:
      "The primary ramp. This system's hue is a warm red — oklch(0.6579 0.191 17.08) in light.",
    tokens: [
      "--primary",
      "--primary-foreground",
      "--secondary",
      "--secondary-foreground",
    ],
  },
  {
    title: "Semantic",
    description: "Muted, accent, and destructive roles.",
    tokens: [
      "--muted",
      "--muted-foreground",
      "--accent",
      "--accent-foreground",
      "--destructive",
    ],
  },
  {
    title: "Borders & focus",
    description: "Applied globally by the base layer in src/index.css.",
    tokens: ["--border", "--input", "--ring"],
  },
  {
    title: "Charts",
    description:
      "A five-step monochrome ramp. Pass these as var(--chart-n) in a ChartConfig so charts re-theme.",
    tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
  },
  {
    title: "Sidebar",
    description: "A parallel surface scale used only by the Sidebar component.",
    tokens: [
      "--sidebar",
      "--sidebar-foreground",
      "--sidebar-primary",
      "--sidebar-primary-foreground",
      "--sidebar-accent",
      "--sidebar-accent-foreground",
      "--sidebar-border",
      "--sidebar-ring",
    ],
  },
]

export type RadiusStep = {
  /** Literal class name — Tailwind's scanner must see this verbatim. */
  className: string
  token: string
  formula: string
}

export const RADIUS_STEPS: readonly RadiusStep[] = [
  { className: "rounded-sm", token: "--radius-sm", formula: "--radius × 0.6" },
  { className: "rounded-md", token: "--radius-md", formula: "--radius × 0.8" },
  { className: "rounded-lg", token: "--radius-lg", formula: "--radius" },
  { className: "rounded-xl", token: "--radius-xl", formula: "--radius × 1.4" },
  {
    className: "rounded-2xl",
    token: "--radius-2xl",
    formula: "--radius × 1.8",
  },
  {
    className: "rounded-3xl",
    token: "--radius-3xl",
    formula: "--radius × 2.2",
  },
  {
    className: "rounded-4xl",
    token: "--radius-4xl",
    formula: "--radius × 2.6",
  },
]

export type TypeStep = {
  /** Literal class names only. */
  className: string
  label: string
  size: string
}

export const TYPE_SCALE: readonly TypeStep[] = [
  { className: "text-xs", label: "text-xs", size: "0.75rem" },
  { className: "text-sm", label: "text-sm", size: "0.875rem" },
  { className: "text-base", label: "text-base", size: "1rem" },
  { className: "text-lg", label: "text-lg", size: "1.125rem" },
  { className: "text-xl", label: "text-xl", size: "1.25rem" },
  { className: "text-2xl", label: "text-2xl", size: "1.5rem" },
  { className: "text-3xl", label: "text-3xl", size: "1.875rem" },
  { className: "text-4xl", label: "text-4xl", size: "2.25rem" },
]

export const FONT_WEIGHTS: readonly TypeStep[] = [
  { className: "font-normal", label: "font-normal", size: "400" },
  { className: "font-medium", label: "font-medium", size: "500" },
  { className: "font-semibold", label: "font-semibold", size: "600" },
  { className: "font-bold", label: "font-bold", size: "700" },
]
