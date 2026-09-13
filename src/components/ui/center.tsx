import { cn } from "cn"

import { Box } from "@/components/ui/box"
import type { BoxProps } from "@/components/ui/box"

interface CenterProps extends BoxProps {
  inline?: boolean
}

function Center({ inline = false, className, ...props }: CenterProps) {
  return (
    <Box
      data-slot="center"
      className={cn(
        "flex items-center justify-center",
        inline && "inline-flex",
        className,
      )}
      {...props}
    />
  )
}

export { Center }
export type { CenterProps }
