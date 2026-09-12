import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

type BoxProps = useRender.ComponentProps<"div">

function Box({ render, ...props }: BoxProps) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">({ "data-slot": "box" }, props),
    render,
    state: { slot: "box" },
  })
}

export { Box }
export type { BoxProps }
