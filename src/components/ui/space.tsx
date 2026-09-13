import { cn } from "cn"

import { Box } from "@/components/ui/box"
import type { BoxProps } from "@/components/ui/box"

type SpaceValue = "xs" | "sm" | "md" | "lg" | "xl" | number | (string & {})

const DEFAULT_SPACING: Record<string, string> = {
  xs: "0.625rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
}

const rem = (px: number) => `${px / 16}rem`

function getSpacing(value: SpaceValue | undefined) {
  if (value === undefined) return undefined
  if (typeof value === "number") return rem(value)
  return DEFAULT_SPACING[value] ?? value
}

interface SpaceProps extends BoxProps {
  w?: SpaceValue
  h?: SpaceValue
  miw?: SpaceValue
  mih?: SpaceValue
}

function Space({ w, h, miw, mih, className, style, ...props }: SpaceProps) {
  const resolvedW = getSpacing(w)
  const resolvedH = getSpacing(h)

  return (
    <Box
      data-slot="space"
      style={{
        width: resolvedW,
        height: resolvedH,
        minWidth: getSpacing(miw) ?? resolvedW,
        minHeight: getSpacing(mih) ?? resolvedH,
        ...style,
      }}
      className={cn(className)}
      {...props}
    />
  )
}

export { Space }
export type { SpaceProps }
