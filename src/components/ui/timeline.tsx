import * as React from "react"
import { cn } from "cn"

type TimelineAlign = "left" | "right"
type TimelineRadius = "xs" | "sm" | "md" | "lg" | "xl"
type TimelineLineVariant = "solid" | "dashed" | "dotted"

const RADIUS_CLASSES: Record<TimelineRadius, string> = {
  xs: "[--tl-radius:var(--radius-xs)]",
  sm: "[--tl-radius:var(--radius-sm)]",
  md: "[--tl-radius:var(--radius-lg)]",
  lg: "[--tl-radius:var(--radius-2xl)]",
  xl: "[--tl-radius:1000px]",
}

const ITEM_RADIUS_CLASSES: Record<TimelineRadius, string> = {
  xs: "[--tli-radius:var(--radius-xs)]",
  sm: "[--tli-radius:var(--radius-sm)]",
  md: "[--tli-radius:var(--radius-lg)]",
  lg: "[--tli-radius:var(--radius-2xl)]",
  xl: "[--tli-radius:1000px]",
}

const LINE_VARIANT_CLASSES: Record<TimelineLineVariant, string> = {
  solid: "[--tli-border-style:solid]",
  dashed: "[--tli-border-style:dashed]",
  dotted: "[--tli-border-style:dotted]",
}

function toCssSize(value: number | string) {
  return typeof value === "number" ? `${value / 16}rem` : value
}

type TimelineItemProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Item title, displayed next to the bullet */
  title?: React.ReactNode
  /** Content displayed below the title */
  children?: React.ReactNode
  /** Rendered inside the bullet: icon, image, avatar. Defaults to an empty dot. */
  bullet?: React.ReactNode
  /** Content displayed on the opposite side of the bullet */
  opposite?: React.ReactNode
  /** Switches the sides of content and `opposite` @default false */
  alternate?: boolean
  /** Overrides the Timeline's radius for this bullet */
  radius?: TimelineRadius
  /** Any valid CSS color for this item's active bullet and line */
  color?: string
  /** Style of the line below this item @default "solid" */
  lineVariant?: TimelineLineVariant
  /** Forces the bullet into its active state */
  active?: boolean
  /** Forces the line below this item into its active state */
  lineActive?: boolean
  /** Set by Timeline */
  __align?: TimelineAlign
  /** Set by Timeline */
  __hasOpposite?: boolean
  /** Set by Timeline */
  __autoContrast?: boolean
}

function TimelineItem({
  title,
  children,
  bullet,
  opposite,
  alternate = false,
  radius,
  color,
  lineVariant,
  active,
  lineActive,
  __align = "left",
  __hasOpposite = false,
  __autoContrast = false,
  className,
  style,
  ...props
}: TimelineItemProps) {
  const left = __align === "left"
  const bodyFirst = (left && alternate) || (!left && !alternate)
  const alternated = alternate

  const oppositeNode = opposite != null && (
    <div
      data-slot="timeline-item-opposite"
      className={cn(
        "col-start-1 row-start-1",
        left
          ? alternated
            ? "col-start-3 ps-(--offset) text-start"
            : "pe-(--offset) text-end"
          : alternated
            ? "pe-(--offset) text-end"
            : "col-start-3 ps-(--offset) text-start",
      )}
    >
      {opposite}
    </div>
  )

  const bodyNode = (
    <div
      data-slot="timeline-item-body"
      className={cn(
        __hasOpposite &&
          "row-start-1 " +
            (left
              ? alternated
                ? "col-start-1 pe-(--offset) text-end"
                : "col-start-3 ps-(--offset) text-start"
              : alternated
                ? "col-start-3 ps-(--offset) text-start"
                : "col-start-1 pe-(--offset) text-end"),
      )}
    >
      {title && (
        <div
          data-slot="timeline-item-title"
          className="mb-1.25 leading-none font-medium"
        >
          {title}
        </div>
      )}
      <div data-slot="timeline-item-content">{children}</div>
    </div>
  )

  return (
    <div
      data-slot="timeline-item"
      data-active={active || undefined}
      data-line-active={lineActive || undefined}
      data-alternate={alternate || undefined}
      className={cn(
        "relative text-foreground [--item-border-color:var(--tl-track)] [--tli-border-style:solid] [--tli-color:var(--tl-color)] [--tli-radius:var(--tl-radius)]",
        "before:pointer-events-none before:absolute before:top-0 before:-bottom-6 before:hidden before:border-s-(length:--tl-line-width) before:[border-style:var(--tli-border-style)] before:border-(color:--item-border-color) not-last-of-type:before:block",
        "data-line-active:[--item-border-color:var(--tli-color)]",
        "not-first-of-type:mt-6",
        __autoContrast &&
          "[--tl-icon-color:oklch(from_var(--tli-color)_calc((0.65-l)*1000)_0_0)]",
        __hasOpposite
          ? "grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] before:inset-s-[calc(50%-var(--tl-line-width)/2)]"
          : left
            ? "ps-(--offset) text-start before:-inset-s-(--tl-line-width)"
            : "pe-(--offset) text-end before:-inset-e-(--tl-line-width)",
        radius && ITEM_RADIUS_CLASSES[radius],
        lineVariant && LINE_VARIANT_CLASSES[lineVariant],
        className,
      )}
      style={
        color
          ? ({ "--tli-color": color, ...style } as React.CSSProperties)
          : style
      }
      {...props}
    >
      {bodyFirst ? bodyNode : oppositeNode}
      <div
        data-slot="timeline-item-bullet"
        data-with-child={!!bullet || undefined}
        data-active={active || undefined}
        className={cn(
          "absolute top-0 flex size-(--tl-bullet-size) items-center justify-center rounded-(--tli-radius) border-(length:--tl-line-width) border-(color:--tl-track) bg-background text-foreground",
          "data-with-child:bg-(--tl-track)",
          "data-active:border-(color:--tli-color) data-active:bg-white data-active:text-(--tl-icon-color) data-active:data-with-child:bg-(--tli-color)",
          __hasOpposite
            ? "relative col-start-2 row-start-1"
            : left
              ? "-inset-s-(--offset)"
              : "-inset-e-(--offset)",
        )}
      >
        {bullet}
      </div>
      {bodyFirst ? oppositeNode : bodyNode}
    </div>
  )
}

type TimelineProps = Omit<React.ComponentProps<"div">, "color"> & {
  /** `Timeline.Item` elements */
  children?: React.ReactNode
  /** Index of the active item; items up to it are highlighted @default -1 */
  active?: number
  /** Any valid CSS color for active items. Defaults to the primary color. */
  color?: string
  /** @default "xl" */
  radius?: TimelineRadius
  /** Bullet size as a number (px) or CSS length @default 20 */
  bulletSize?: number | string
  /** Side of the bullet the content sits on @default "left" */
  align?: TimelineAlign
  /** Line and bullet border width as a number (px) or CSS length @default 4 */
  lineWidth?: number | string
  /** Reverses the active direction without reversing item order @default false */
  reverseActive?: boolean
  /** Picks a readable bullet icon color on active filled bullets @default false */
  autoContrast?: boolean
}

function Timeline({
  children,
  active = -1,
  color,
  radius = "xl",
  bulletSize,
  align = "left",
  lineWidth,
  reverseActive = false,
  autoContrast = false,
  className,
  style,
  ...props
}: TimelineProps) {
  const items = React.Children.toArray(children).filter(
    React.isValidElement,
  ) as React.ReactElement<TimelineItemProps>[]
  const hasOpposite = items.some((item) => item.props.opposite != null)

  const cssVars: Record<string, string> = {}
  if (color) cssVars["--tl-color"] = color
  if (bulletSize !== undefined)
    cssVars["--tl-bullet-size"] = toCssSize(bulletSize)
  if (lineWidth !== undefined) cssVars["--tl-line-width"] = toCssSize(lineWidth)

  return (
    <div
      data-slot="timeline"
      data-align={align}
      data-opposite={hasOpposite || undefined}
      className={cn(
        "text-sm [--offset:calc(var(--tl-bullet-size)/2+var(--tl-line-width)/2)] [--tl-bullet-size:--spacing(5)] [--tl-color:var(--primary)] [--tl-icon-color:white] [--tl-line-width:--spacing(1)] [--tl-track:color-mix(in_oklab,var(--muted-foreground)_30%,transparent)]",
        RADIUS_CLASSES[radius],
        autoContrast &&
          "[--tl-icon-color:oklch(from_var(--tl-color)_calc((0.65-l)*1000)_0_0)]",
        !hasOpposite && (align === "left" ? "ps-(--offset)" : "pe-(--offset)"),
        className,
      )}
      style={
        Object.keys(cssVars).length
          ? ({ ...cssVars, ...style } as React.CSSProperties)
          : style
      }
      {...props}
    >
      {items.map((item, index) => {
        const reversedIndex = items.length - index - 1
        const isActive = reverseActive
          ? active >= reversedIndex
          : active >= index
        const isLineActive = reverseActive
          ? active >= reversedIndex
          : active - 1 >= index
        return React.cloneElement(item, {
          key: item.key ?? index,
          active: item.props.active || isActive,
          lineActive: item.props.lineActive || isLineActive,
          __align: align,
          __hasOpposite: hasOpposite,
          __autoContrast: autoContrast,
        })
      })}
    </div>
  )
}

const TimelineWithSubcomponents = Object.assign(Timeline, {
  Item: TimelineItem,
})

export { TimelineWithSubcomponents as Timeline, TimelineItem }
export type {
  TimelineAlign,
  TimelineItemProps,
  TimelineLineVariant,
  TimelineProps,
  TimelineRadius,
}
