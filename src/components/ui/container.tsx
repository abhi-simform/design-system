import { cn } from "cn"

import { Box } from "@/components/ui/box"
import type { BoxProps } from "@/components/ui/box"

type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl"

const SIZE_CLASSES: Record<ContainerSize, string> = {
  xs: "max-w-135",
  sm: "max-w-180",
  md: "max-w-240",
  lg: "max-w-285",
  xl: "max-w-330",
}

interface ContainerProps extends BoxProps {
  size?: ContainerSize | number
  fluid?: boolean
}

function Container({
  size = "md",
  fluid = false,
  className,
  style,
  ...props
}: ContainerProps) {
  const numericSize = typeof size === "number" ? size : undefined

  return (
    <Box
      data-slot="container"
      style={
        numericSize !== undefined
          ? { maxWidth: `${numericSize / 16}rem`, ...style }
          : style
      }
      className={cn(
        "mx-auto w-full px-4",
        numericSize === undefined && SIZE_CLASSES[size as ContainerSize],
        fluid && "max-w-full",
        className,
      )}
      {...props}
    />
  )
}

export { Container }
export type { ContainerProps, ContainerSize }
