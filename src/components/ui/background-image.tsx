import { cn } from "cn"

import { Box } from "@/components/ui/box"
import type { BoxProps } from "@/components/ui/box"

type BackgroundImageRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl"

const RADIUS_CLASSES: Record<BackgroundImageRadius, string> = {
  none: "rounded-none",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
}

interface BackgroundImageProps extends BoxProps {
  src: string
  radius?: BackgroundImageRadius
}

function BackgroundImage({
  src,
  radius = "none",
  className,
  style,
  ...props
}: BackgroundImageProps) {
  return (
    <Box
      data-slot="background-image"
      style={{ backgroundImage: `url(${src})`, ...style }}
      className={cn(
        "block w-full border-0 bg-cover bg-center no-underline",
        RADIUS_CLASSES[radius],
        className,
      )}
      {...props}
    />
  )
}

export { BackgroundImage }
export type { BackgroundImageProps, BackgroundImageRadius }
