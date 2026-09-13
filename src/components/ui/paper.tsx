import { cn } from "cn"

import { Box } from "@/components/ui/box"
import type { BoxProps } from "@/components/ui/box"

type PaperShadow = "none" | "xs" | "sm" | "md" | "lg" | "xl"
type PaperRadius = "xs" | "sm" | "md" | "lg" | "xl"

const SHADOW_CLASSES: Record<PaperShadow, string> = {
  none: "shadow-none",
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
}

const RADIUS_CLASSES: Record<PaperRadius, string> = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
}

interface PaperProps extends BoxProps {
  shadow?: PaperShadow
  radius?: PaperRadius
  withBorder?: boolean
}

function Paper({
  shadow = "none",
  radius = "sm",
  withBorder = false,
  className,
  ...props
}: PaperProps) {
  return (
    <Box
      data-slot="paper"
      className={cn(
        "bg-card text-card-foreground",
        SHADOW_CLASSES[shadow],
        RADIUS_CLASSES[radius],
        withBorder && "border",
        className,
      )}
      {...props}
    />
  )
}

export { Paper }
export type { PaperProps, PaperShadow, PaperRadius }
