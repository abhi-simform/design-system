import * as React from "react"
import { cn } from "cn"

type MarqueeGap = "xs" | "sm" | "md" | "lg" | "xl"
type MarqueeOrientation = "horizontal" | "vertical"

// Keyframes read --marquee-gap and --marquee-repeat, so both are always defined on the root.
const gapClasses: Record<MarqueeGap, string> = {
  xs: "[--marquee-gap:calc(var(--spacing)*2.5)]",
  sm: "[--marquee-gap:calc(var(--spacing)*3)]",
  md: "[--marquee-gap:calc(var(--spacing)*4)]",
  lg: "[--marquee-gap:calc(var(--spacing)*5)]",
  xl: "[--marquee-gap:calc(var(--spacing)*6)]",
}

interface MarqueeProps extends React.ComponentProps<"div"> {
  /** Reverses animation direction */
  reverse?: boolean
  /** Pauses animation on hover */
  pauseOnHover?: boolean
  /** Scroll orientation */
  orientation?: MarqueeOrientation
  /** Number of times children are repeated inline for seamless scrolling */
  repeat?: number
  /** Animation duration in ms */
  duration?: number
  /** Gap between repeated children */
  gap?: MarqueeGap
  /** Whether to show gradient fade on edges */
  fadeEdges?: boolean
  /** Color of the fade gradient */
  fadeEdgeColor?: string
  /** Size of the fade gradient */
  fadeEdgeSize?: string
}

function Marquee({
  className,
  style,
  children,
  reverse = false,
  pauseOnHover = false,
  orientation = "horizontal",
  repeat = 4,
  duration = 100_000,
  gap = "md",
  fadeEdges = true,
  fadeEdgeColor,
  fadeEdgeSize,
  ...props
}: MarqueeProps) {
  const rootStyle = {
    "--marquee-duration": `${duration}ms`,
    "--marquee-repeat": repeat.toString(),
    ...(fadeEdgeColor ? { "--marquee-fade-color": fadeEdgeColor } : null),
    ...(fadeEdgeSize ? { "--marquee-fade-size": fadeEdgeSize } : null),
    ...style,
  } as React.CSSProperties

  const groups = Array.from({ length: Math.max(0, repeat) }, (_, index) => (
    <div
      key={index}
      data-slot="marquee-group"
      aria-hidden={index > 0 ? true : undefined}
      className="flex shrink-0 gap-(--marquee-gap) group-data-horizontal/marquee:flex-row group-data-vertical/marquee:flex-col"
    >
      {children}
    </div>
  ))

  return (
    <div
      data-slot="marquee"
      data-orientation={orientation}
      data-horizontal={orientation === "horizontal" ? "" : undefined}
      data-vertical={orientation === "vertical" ? "" : undefined}
      data-reverse={reverse ? "" : undefined}
      data-pause-on-hover={pauseOnHover ? "" : undefined}
      data-fade-edges={fadeEdges ? "" : undefined}
      style={rootStyle}
      className={cn(
        "group/marquee relative flex max-h-full max-w-full overflow-hidden data-horizontal:flex-row data-vertical:flex-col",
        gapClasses[gap],
        "data-fade-edges:before:pointer-events-none data-fade-edges:before:absolute data-fade-edges:before:z-1 data-fade-edges:before:content-[''] data-fade-edges:after:pointer-events-none data-fade-edges:after:absolute data-fade-edges:after:z-1 data-fade-edges:after:content-['']",
        "data-fade-edges:data-horizontal:before:inset-y-0 data-fade-edges:data-horizontal:before:left-0 data-fade-edges:data-horizontal:before:w-(--marquee-fade-size,5%) data-fade-edges:data-horizontal:before:bg-linear-to-r data-fade-edges:data-horizontal:before:from-(--marquee-fade-color,var(--background)) data-fade-edges:data-horizontal:before:to-transparent",
        "data-fade-edges:data-horizontal:after:inset-y-0 data-fade-edges:data-horizontal:after:right-0 data-fade-edges:data-horizontal:after:w-(--marquee-fade-size,5%) data-fade-edges:data-horizontal:after:bg-linear-to-l data-fade-edges:data-horizontal:after:from-(--marquee-fade-color,var(--background)) data-fade-edges:data-horizontal:after:to-transparent",
        "data-fade-edges:data-vertical:before:inset-x-0 data-fade-edges:data-vertical:before:top-0 data-fade-edges:data-vertical:before:h-(--marquee-fade-size,5%) data-fade-edges:data-vertical:before:bg-linear-to-b data-fade-edges:data-vertical:before:from-(--marquee-fade-color,var(--background)) data-fade-edges:data-vertical:before:to-transparent",
        "data-fade-edges:data-vertical:after:inset-x-0 data-fade-edges:data-vertical:after:bottom-0 data-fade-edges:data-vertical:after:h-(--marquee-fade-size,5%) data-fade-edges:data-vertical:after:bg-linear-to-t data-fade-edges:data-vertical:after:from-(--marquee-fade-color,var(--background)) data-fade-edges:data-vertical:after:to-transparent",
        className,
      )}
      {...props}
    >
      <div
        data-slot="marquee-content"
        className={cn(
          "flex gap-(--marquee-gap) motion-reduce:animate-none",
          "group-data-horizontal/marquee:animate-marquee-horizontal group-data-horizontal/marquee:flex-row",
          "group-data-vertical/marquee:animate-marquee-vertical group-data-vertical/marquee:flex-col",
          "group-data-reverse/marquee:[animation-direction:reverse]",
          "group-data-pause-on-hover/marquee:group-hover/marquee:[animation-play-state:paused]",
        )}
      >
        {groups}
      </div>
    </div>
  )
}

export { Marquee }
export type { MarqueeGap, MarqueeOrientation, MarqueeProps }
