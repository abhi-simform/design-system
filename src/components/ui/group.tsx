import * as React from "react"
import { cn } from "cn"

import { Box } from "@/components/ui/box"
import type { BoxProps } from "@/components/ui/box"

type GroupGap = "xs" | "sm" | "md" | "lg" | "xl"
type GroupAlign =
  | "stretch"
  | "center"
  | "baseline"
  | "normal"
  | "start"
  | "flex-start"
  | "end"
  | "flex-end"
type GroupJustify =
  | "center"
  | "normal"
  | "start"
  | "flex-start"
  | "end"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly"
type GroupWrap = "wrap" | "nowrap" | "wrap-reverse"

const GAP_CLASSES: Record<GroupGap, string> = {
  xs: "gap-2.5",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-5",
  xl: "gap-6",
}

// Mirrors GAP_CLASSES numerically (0.625/0.75/1/1.25/1.5rem) — needed as a
// real value, not a class, because the grow calc() below reads it via
// var(--group-gap).
const GAP_VALUES: Record<GroupGap, string> = {
  xs: "0.625rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
}

const ALIGN_CLASSES: Record<GroupAlign, string> = {
  stretch: "items-stretch",
  center: "items-center",
  baseline: "items-baseline",
  normal: "items-normal",
  start: "items-start",
  "flex-start": "items-start",
  end: "items-end",
  "flex-end": "items-end",
}

const JUSTIFY_CLASSES: Record<GroupJustify, string> = {
  center: "justify-center",
  normal: "justify-normal",
  start: "justify-start",
  "flex-start": "justify-start",
  end: "justify-end",
  "flex-end": "justify-end",
  "space-between": "justify-between",
  "space-around": "justify-around",
  "space-evenly": "justify-evenly",
}

const WRAP_CLASSES: Record<GroupWrap, string> = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
  "wrap-reverse": "flex-wrap-reverse",
}

interface GroupProps extends BoxProps {
  gap?: GroupGap
  align?: GroupAlign
  justify?: GroupJustify
  wrap?: GroupWrap
  grow?: boolean
  preventGrowOverflow?: boolean
}

function Group({
  gap = "md",
  align = "center",
  justify = "flex-start",
  wrap = "wrap",
  grow = false,
  preventGrowOverflow = true,
  className,
  style,
  children,
  ...props
}: GroupProps) {
  const items = React.Children.toArray(children)
  const childWidth =
    grow && preventGrowOverflow && items.length > 0
      ? `calc(${100 / items.length}% - (var(--group-gap) - var(--group-gap) / ${items.length}))`
      : undefined

  return (
    <Box
      data-slot="group"
      data-grow={grow || undefined}
      style={
        {
          ...style,
          // --group-gap must always be set (not only when grow is on) since
          // the child-width calc() reads it unconditionally via var().
          "--group-gap": GAP_VALUES[gap],
          "--group-child-width": childWidth,
        } as React.CSSProperties
      }
      className={cn(
        "flex w-full flex-row",
        GAP_CLASSES[gap],
        ALIGN_CLASSES[align],
        JUSTIFY_CLASSES[justify],
        WRAP_CLASSES[wrap],
        "[&[data-grow]>*]:max-w-(--group-child-width) [&[data-grow]>*]:grow",
        className,
      )}
      {...props}
    >
      {items}
    </Box>
  )
}

export { Group }
export type { GroupProps }
