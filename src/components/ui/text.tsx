import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

type TextSize = "xs" | "sm" | "md" | "lg" | "xl"
type TextWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
type TextStyle = "italic" | "normal"
type TextAlign = "left" | "center" | "right" | "justify"
type TextTransform = "uppercase" | "lowercase" | "capitalize" | "none"
type TextDecoration = "underline" | "line-through" | "overline" | "none"
type TextWrapMode = "wrap" | "nowrap" | "balance" | "pretty" | "stable"
type TextTruncate = "start" | "end" | boolean

const SIZE_CLASSES: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

const WEIGHT_CLASSES: Record<TextWeight, string> = {
  100: "font-thin",
  200: "font-extralight",
  300: "font-light",
  400: "font-normal",
  500: "font-medium",
  600: "font-semibold",
  700: "font-bold",
  800: "font-extrabold",
  900: "font-black",
}

const STYLE_CLASSES: Record<TextStyle, string> = {
  italic: "italic",
  normal: "not-italic",
}

const ALIGN_CLASSES: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
}

const TRANSFORM_CLASSES: Record<TextTransform, string> = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
  none: "normal-case",
}

const DECORATION_CLASSES: Record<TextDecoration, string> = {
  underline: "underline",
  "line-through": "line-through",
  overline: "overline",
  none: "no-underline",
}

const WRAP_CLASSES: Record<TextWrapMode, string> = {
  wrap: "text-wrap",
  nowrap: "text-nowrap",
  balance: "text-balance",
  pretty: "text-pretty",
  stable: "[text-wrap:stable]",
}

function getTruncateClass(truncate: TextTruncate | undefined) {
  if (truncate === "start") {
    return "overflow-hidden text-ellipsis whitespace-nowrap [direction:rtl] text-right"
  }
  if (truncate === "end" || truncate === true) {
    return "truncate"
  }
  return undefined
}

type TextProps = useRender.ComponentProps<"p"> & {
  span?: boolean
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

function Text({
  render,
  span = false,
  size = "md",
  fw,
  fs,
  ta,
  tt,
  td,
  dimmed = false,
  truncate,
  lineClamp,
  textWrap,
  inline = false,
  inherit = false,
  className,
  style,
  ...props
}: TextProps) {
  return useRender({
    defaultTagName: span ? "span" : "p",
    render,
    props: mergeProps<"p">(
      {
        "data-slot": "text",
        className: cn(
          inherit
            ? "[font-size:inherit] [line-height:inherit] [font-weight:inherit]"
            : SIZE_CLASSES[size],
          fw && WEIGHT_CLASSES[fw],
          fs && STYLE_CLASSES[fs],
          ta && ALIGN_CLASSES[ta],
          tt && TRANSFORM_CLASSES[tt],
          td && DECORATION_CLASSES[td],
          dimmed && "text-muted-foreground",
          getTruncateClass(truncate),
          textWrap && WRAP_CLASSES[textWrap],
          inline && "leading-none",
          typeof lineClamp === "number" &&
            "[display:-webkit-box] overflow-hidden text-ellipsis [-webkit-box-orient:vertical]",
          className,
        ),
        style:
          typeof lineClamp === "number"
            ? { ...style, WebkitLineClamp: lineClamp }
            : style,
      },
      props,
    ),
    state: { slot: "text" },
  })
}

export { Text }
export type {
  TextProps,
  TextSize,
  TextWeight,
  TextStyle,
  TextAlign,
  TextTransform,
  TextDecoration,
  TextWrapMode,
  TextTruncate,
}
