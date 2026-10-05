import { Badge } from "@/components/ui/badge"
import { Marquee } from "@/components/ui/marquee"
import type { MarqueeGap, MarqueeOrientation } from "@/components/ui/marquee"

const TAGS = [
  "React",
  "TypeScript",
  "Tailwind",
  "Base UI",
  "Vite",
  "Accessible",
  "Themeable",
  "Composable",
]

function Tags() {
  return TAGS.map((tag) => (
    <Badge key={tag} variant="secondary">
      {tag}
    </Badge>
  ))
}

function Cards() {
  return [1, 2, 3, 4, 5].map((n) => (
    <div
      key={n}
      className="flex h-16 w-40 items-center justify-center rounded-lg border border-border bg-card text-sm text-card-foreground"
    >
      Card {n}
    </div>
  ))
}

export function MarqueePlayground({
  orientation,
  reverse,
  pauseOnHover,
  fadeEdges,
  gap,
  duration,
  repeat,
}: {
  orientation: MarqueeOrientation
  reverse: boolean
  pauseOnHover: boolean
  fadeEdges: boolean
  gap: MarqueeGap
  duration: number
  repeat: number
}) {
  return (
    <Marquee
      orientation={orientation}
      reverse={reverse}
      pauseOnHover={pauseOnHover}
      fadeEdges={fadeEdges}
      gap={gap}
      duration={duration}
      repeat={repeat}
      className={orientation === "vertical" ? "h-48" : "w-full"}
    >
      <Cards />
    </Marquee>
  )
}

export function MarqueeDefault() {
  return (
    <Marquee duration={20000} className="w-full">
      <Tags />
    </Marquee>
  )
}

export function MarqueeReverse() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Marquee duration={20000} className="w-full">
        <Tags />
      </Marquee>
      <Marquee reverse duration={20000} className="w-full">
        <Tags />
      </Marquee>
    </div>
  )
}

export function MarqueePauseOnHover() {
  return (
    <Marquee pauseOnHover duration={15000} className="w-full">
      <Cards />
    </Marquee>
  )
}

export function MarqueeVertical() {
  return (
    <Marquee orientation="vertical" duration={15000} className="h-48 w-40">
      <Cards />
    </Marquee>
  )
}

export function MarqueeNoFade() {
  return (
    <Marquee fadeEdges={false} gap="xl" duration={20000} className="w-full">
      <Tags />
    </Marquee>
  )
}

export function MarqueeCustomFade() {
  return (
    <Marquee
      duration={20000}
      fadeEdgeColor="var(--muted)"
      fadeEdgeSize="20%"
      className="w-full rounded-lg bg-muted py-3"
    >
      <Tags />
    </Marquee>
  )
}
