import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

type VisuallyHiddenProps = useRender.ComponentProps<"span">

function VisuallyHidden({ className, render, ...props }: VisuallyHiddenProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn("sr-only", className),
      },
      props,
    ),
    render,
    state: {
      slot: "visually-hidden",
    },
  })
}

export { VisuallyHidden }
export type { VisuallyHiddenProps }
