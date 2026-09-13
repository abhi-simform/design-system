import { cn } from "cn"

import { Box } from "@/components/ui/box"
import type { BoxProps } from "@/components/ui/box"

type TypographyProps = BoxProps

function Typography({ className, ...props }: TypographyProps) {
  return (
    <Box
      data-slot="typography"
      className={cn("typography", className)}
      {...props}
    />
  )
}

export { Typography }
export type { TypographyProps }
