import { Paper } from "@/components/ui/paper"

const SHADOWS = ["none", "xs", "sm", "md", "lg", "xl"] as const
const RADII = ["xs", "sm", "md", "lg", "xl"] as const

export function PaperPlayground({
  shadow,
  radius,
  withBorder,
}: {
  shadow: (typeof SHADOWS)[number]
  radius: (typeof RADII)[number]
  withBorder: boolean
}) {
  return (
    <Paper
      shadow={shadow}
      radius={radius}
      withBorder={withBorder}
      className="p-6"
    >
      <p className="text-sm text-muted-foreground">
        A basic surface for cards, dropdowns and modals.
      </p>
    </Paper>
  )
}

export function PaperShadows() {
  return (
    <div className="flex flex-wrap gap-4">
      {SHADOWS.map((shadow) => (
        <Paper key={shadow} shadow={shadow} className="p-4">
          <span className="font-mono text-xs text-muted-foreground">{`shadow="${shadow}"`}</span>
        </Paper>
      ))}
    </div>
  )
}

export function PaperRadii() {
  return (
    <div className="flex flex-wrap gap-4">
      {RADII.map((radius) => (
        <Paper key={radius} radius={radius} withBorder className="p-4">
          <span className="font-mono text-xs text-muted-foreground">{`radius="${radius}"`}</span>
        </Paper>
      ))}
    </div>
  )
}

export function PaperWithBorder() {
  return (
    <div className="flex flex-wrap gap-4">
      <Paper className="p-4">
        <span className="font-mono text-xs text-muted-foreground">default</span>
      </Paper>
      <Paper withBorder className="p-4">
        <span className="font-mono text-xs text-muted-foreground">
          withBorder
        </span>
      </Paper>
    </div>
  )
}

export function PaperAsSection() {
  return (
    <Paper render={<section />} shadow="sm" withBorder className="p-4">
      <span className="font-mono text-xs text-muted-foreground">
        rendered as a section
      </span>
    </Paper>
  )
}
