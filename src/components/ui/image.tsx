import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down"

const FIT_CLASSES: Record<ImageFit, string> = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
}

type ImageRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl"

const RADIUS_CLASSES: Record<ImageRadius, string> = {
  none: "rounded-none",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
}

type ImageProps = useRender.ComponentProps<"img"> & {
  fit?: ImageFit
  radius?: ImageRadius
  fallbackSrc?: string
}

function Image({
  render,
  className,
  src,
  fit = "cover",
  radius = "none",
  fallbackSrc,
  onError,
  ...props
}: ImageProps) {
  const [hasError, setHasError] = React.useState(!src)
  const [prevSrc, setPrevSrc] = React.useState(src)

  if (src !== prevSrc) {
    setPrevSrc(src)
    setHasError(!src)
  }

  const showFallback = hasError && !!fallbackSrc

  return useRender({
    defaultTagName: "img",
    render,
    props: mergeProps<"img">(
      {
        "data-slot": "image",
        "data-fallback": showFallback ? "" : undefined,
        className: cn(
          "block w-full",
          FIT_CLASSES[fit],
          RADIUS_CLASSES[radius],
          className,
        ),
        src: showFallback ? fallbackSrc : src,
        onError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
          onError?.(event)
          setHasError(true)
        },
      },
      props,
    ),
    state: { slot: "image" },
  })
}

export { Image }
export type { ImageProps, ImageFit, ImageRadius }
