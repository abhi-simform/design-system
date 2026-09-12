import * as React from "react"
import { cn } from "cn"

import { Box } from "@/components/ui/box"
import type { BoxProps } from "@/components/ui/box"

type StackGap = "xs" | "sm" | "md" | "lg" | "xl"
type StackAlign =
  | "stretch"
  | "center"
  | "baseline"
  | "normal"
  | "start"
  | "flex-start"
  | "end"
  | "flex-end"
type StackJustify =
  | "center"
  | "normal"
  | "start"
  | "flex-start"
  | "end"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly"

// Tailwind's default spacing scale (n * 0.25rem) lands exactly on these
// named tokens (0.625/0.75/1/1.25/1.5rem). A gap outside this scale isn't a
// prop value — pass a raw utility via className instead (e.g. "gap-20" for
// 80px); cn's tailwind-merge semantics resolve the conflict with the class
// below in favor of whichever came from className.
const GAP_CLASSES: Record<StackGap, string> = {
  xs: "gap-2.5",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-5",
  xl: "gap-6",
}

const ALIGN_CLASSES: Record<StackAlign, string> = {
  stretch: "items-stretch",
  center: "items-center",
  baseline: "items-baseline",
  normal: "items-normal",
  start: "items-start",
  "flex-start": "items-start",
  end: "items-end",
  "flex-end": "items-end",
}

const JUSTIFY_CLASSES: Record<StackJustify, string> = {
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

interface StackProps extends BoxProps {
  gap?: StackGap
  align?: StackAlign
  justify?: StackJustify
}

function Stack({
  gap = "md",
  align = "stretch",
  justify = "flex-start",
  className,
  ...props
}: StackProps) {
  return (
    <Box
      data-slot="stack"
      className={cn(
        "flex w-full flex-col",
        GAP_CLASSES[gap],
        ALIGN_CLASSES[align],
        JUSTIFY_CLASSES[justify],
        className,
      )}
      {...props}
    />
  )
}

export { Stack }
export type { StackProps }
