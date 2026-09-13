import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6
type TitleHeadingSize = `h${TitleOrder}`
type TitleScaleSize = "xs" | "sm" | "md" | "lg" | "xl"
type TitleSize = TitleHeadingSize | TitleScaleSize | number | (string & {})
type TitleTextWrap = "wrap" | "nowrap" | "balance" | "pretty" | "stable"

const HEADING_FONT_SIZE_CLASSES: Record<TitleHeadingSize, string> = {
  h1: "text-title-h1",
  h2: "text-title-h2",
  h3: "text-title-h3",
  h4: "text-title-h4",
  h5: "text-title-h5",
  h6: "text-title-h6",
}

const HEADING_LINE_HEIGHT_CLASSES: Record<TitleHeadingSize, string> = {
  h1: "leading-title-h1",
  h2: "leading-title-h2",
  h3: "leading-title-h3",
  h4: "leading-title-h4",
  h5: "leading-title-h5",
  h6: "leading-title-h6",
}

const SCALE_FONT_SIZE_CLASSES: Record<TitleScaleSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

const WRAP_CLASSES: Record<TitleTextWrap, string> = {
  wrap: "text-wrap",
  nowrap: "text-nowrap",
  balance: "text-balance",
  pretty: "text-pretty",
  stable: "[text-wrap:stable]",
}

function isHeadingSize(size: TitleSize | undefined): size is TitleHeadingSize {
  return typeof size === "string" && size in HEADING_FONT_SIZE_CLASSES
}

function isScaleSize(size: TitleSize | undefined): size is TitleScaleSize {
  return typeof size === "string" && size in SCALE_FONT_SIZE_CLASSES
}

type TitleProps = useRender.ComponentProps<"h1"> & {
  order?: TitleOrder
  size?: TitleSize
  lineClamp?: number
  textWrap?: TitleTextWrap
}

function Title({
  render,
  order = 1,
  size,
  lineClamp,
  textWrap,
  className,
  style,
  ...props
}: TitleProps) {
  const headingLevel: TitleHeadingSize = isHeadingSize(size)
    ? size
    : `h${order}`

  const fontSizeClass = isHeadingSize(size)
    ? HEADING_FONT_SIZE_CLASSES[size]
    : isScaleSize(size)
      ? SCALE_FONT_SIZE_CLASSES[size]
      : size === undefined
        ? HEADING_FONT_SIZE_CLASSES[headingLevel]
        : undefined

  const customFontSize =
    fontSizeClass === undefined && size !== undefined
      ? typeof size === "number"
        ? `${size}px`
        : size
      : undefined

  return useRender({
    defaultTagName: `h${order}`,
    render,
    props: mergeProps<"h1">(
      {
        "data-slot": "title",
        className: cn(
          "font-heading font-bold tracking-tight",
          fontSizeClass,
          HEADING_LINE_HEIGHT_CLASSES[headingLevel],
          textWrap && WRAP_CLASSES[textWrap],
          typeof lineClamp === "number" &&
            "[display:-webkit-box] overflow-hidden text-ellipsis [-webkit-box-orient:vertical]",
          className,
        ),
        style: {
          ...style,
          ...(customFontSize !== undefined && { fontSize: customFontSize }),
          ...(typeof lineClamp === "number" && {
            WebkitLineClamp: lineClamp,
          }),
        },
      },
      props,
    ),
    state: { slot: "title" },
  })
}

export { Title }
export type { TitleProps, TitleOrder, TitleSize, TitleTextWrap }
