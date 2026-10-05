/* eslint-disable react-hooks/refs -- useScroller returns stable callbacks that read a ref only inside event handlers; the rule misreads the returned object as a ref value */
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "cn"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import * as React from "react"

import { useScroller } from "@/hooks/use-scroller"

interface ScrollerProps extends React.ComponentProps<"div"> {
  /** Pixels scrolled when a control button is clicked. */
  scrollAmount?: number
  /** Size of the control buttons. Numbers are treated as px. */
  controlSize?: string | number
  /** Color the edge gradients fade from. Defaults to the page background. */
  edgeGradientColor?: string
  startControlProps?: ButtonPrimitive.Props
  endControlProps?: ButtonPrimitive.Props
  startControlIcon?: React.ReactNode
  endControlIcon?: React.ReactNode
  /** Keep the start control visible regardless of scroll position. */
  showStartControl?: boolean
  /** Keep the end control visible regardless of scroll position. */
  showEndControl?: boolean
  /** Allow scrolling by dragging with the mouse. */
  draggable?: boolean
}

function toCssSize(value: string | number) {
  return typeof value === "number" ? `${value / 16}rem` : value
}

function Scroller({
  className,
  style,
  children,
  scrollAmount = 200,
  controlSize,
  edgeGradientColor,
  startControlProps,
  endControlProps,
  startControlIcon,
  endControlIcon,
  showStartControl,
  showEndControl,
  draggable = true,
  ref,
  ...props
}: ScrollerProps) {
  const scroller = useScroller({ scrollAmount, draggable })

  const showStart = showStartControl || scroller.canScrollStart
  const showEnd = showEndControl || scroller.canScrollEnd

  const vars: Record<string, string> = {}
  if (controlSize !== undefined) {
    vars["--scroller-control-size"] = toCssSize(controlSize)
  }
  if (edgeGradientColor) {
    vars["--scroller-background-color"] = edgeGradientColor
  }

  const controlClass =
    "absolute inset-y-0 z-1 flex w-(--scroller-control-size) items-center text-muted-foreground opacity-100 transition-[opacity,color] duration-200 outline-none hover:text-foreground focus-visible:text-foreground data-hidden:pointer-events-none data-hidden:opacity-0 [&_svg:not([class*='size-'])]:size-(--scroller-control-size)"

  return (
    <div
      ref={ref}
      data-slot="scroller"
      className={cn(
        "relative flex max-w-full items-center overflow-hidden [--scroller-background-color:var(--background)] [--scroller-control-size:3.125rem]",
        className,
      )}
      style={{ ...vars, ...style } as React.CSSProperties}
      {...props}
    >
      <ButtonPrimitive
        data-slot="scroller-control"
        data-position="start"
        data-hidden={!showStart || undefined}
        aria-label="Scroll left"
        tabIndex={showStart ? 0 : -1}
        onClick={scroller.scrollStart}
        {...startControlProps}
        className={cn(
          controlClass,
          "start-0 justify-start bg-linear-to-r from-(--scroller-background-color) from-40% to-transparent rtl:bg-linear-to-l",
          startControlProps?.className as string | undefined,
        )}
      >
        {startControlIcon ?? <ChevronLeftIcon className="rtl:rotate-180" />}
      </ButtonPrimitive>

      <div
        data-slot="scroller-container"
        ref={scroller.attachContainer}
        role="presentation"
        data-draggable={draggable || undefined}
        className="flex-1 [scrollbar-width:none] overflow-x-auto overflow-y-hidden select-none data-draggable:cursor-grab [&::-webkit-scrollbar]:hidden"
        {...scroller.dragHandlers}
      >
        <div
          data-slot="scroller-content"
          className="inline-flex whitespace-nowrap"
        >
          {children}
        </div>
      </div>

      <ButtonPrimitive
        data-slot="scroller-control"
        data-position="end"
        data-hidden={!showEnd || undefined}
        aria-label="Scroll right"
        tabIndex={showEnd ? 0 : -1}
        onClick={scroller.scrollEnd}
        {...endControlProps}
        className={cn(
          controlClass,
          "end-0 justify-end bg-linear-to-l from-(--scroller-background-color) from-40% to-transparent rtl:bg-linear-to-r",
          endControlProps?.className as string | undefined,
        )}
      >
        {endControlIcon ?? <ChevronRightIcon className="rtl:rotate-180" />}
      </ButtonPrimitive>
    </div>
  )
}

export { Scroller }
export type { ScrollerProps }
