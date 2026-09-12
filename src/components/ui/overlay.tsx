import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

type OverlayRadius =
  "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full"

// A custom radius Tailwind has no token for isn't a prop value — pass a raw
// utility via className instead (e.g. className="rounded-[3px]"); cn's
// tailwind-merge semantics resolve the conflict in favor of className.
const RADIUS_CLASSES: Record<OverlayRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "4xl": "rounded-4xl",
  full: "rounded-full",
}

type OverlayProps = useRender.ComponentProps<"div"> & {
  color?: string
  backgroundOpacity?: number
  gradient?: string
  blur?: number | string
  radius?: OverlayRadius
  zIndex?: number | string
  center?: boolean
  fixed?: boolean
}

function Overlay({
  render,
  className,
  color = "#000",
  backgroundOpacity = 0.6,
  gradient,
  blur = 0,
  radius = "none",
  zIndex = 50,
  center = false,
  fixed = false,
  ...props
}: OverlayProps) {
  const backdropFilter = blur
    ? `blur(${typeof blur === "number" ? `${blur}px` : blur})`
    : undefined

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        "data-slot": "overlay",
        className: cn(
          "inset-0",
          fixed ? "fixed" : "absolute",
          center && "flex items-center justify-center",
          RADIUS_CLASSES[radius],
          className,
        ),
        style: {
          background:
            gradient ??
            `color-mix(in oklch, ${color} ${backgroundOpacity * 100}%, transparent)`,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          zIndex,
        },
      },
      props,
    ),
    state: { slot: "overlay" },
  })
}

export { Overlay }
export type { OverlayProps }
