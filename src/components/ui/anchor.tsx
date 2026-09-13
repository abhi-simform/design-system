import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

import { Text } from "@/components/ui/text"
import type {
  TextAlign,
  TextDecoration,
  TextSize,
  TextStyle,
  TextTransform,
  TextTruncate,
  TextWeight,
  TextWrapMode,
} from "@/components/ui/text"

type AnchorUnderline = "always" | "hover" | "not-hover" | "never"

const UNDERLINE_CLASSES: Record<AnchorUnderline, string> = {
  always: "underline",
  hover: "no-underline hover:underline",
  "not-hover": "underline hover:no-underline",
  never: "no-underline",
}

type AnchorProps = useRender.ComponentProps<"a"> & {
  underline?: AnchorUnderline
  size?: TextSize
  fw?: TextWeight
  fs?: TextStyle
  ta?: TextAlign
  tt?: TextTransform
  td?: TextDecoration
  dimmed?: boolean
  truncate?: TextTruncate
  lineClamp?: number
  textWrap?: TextWrapMode
  inline?: boolean
  inherit?: boolean
}

function Anchor({
  underline = "hover",
  dimmed = false,
  className,
  render,
  ...props
}: AnchorProps) {
  return (
    <Text
      data-slot="anchor"
      dimmed={dimmed}
      render={render ?? <a />}
      className={cn(
        !dimmed && "text-primary",
        UNDERLINE_CLASSES[underline],
        className,
      )}
      {...props}
    />
  )
}

export { Anchor }
export type { AnchorProps, AnchorUnderline }
