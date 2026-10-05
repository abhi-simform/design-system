"use client"

import * as React from "react"
import { cn } from "cn"

import { Overlay, type OverlayProps } from "@/components/ui/overlay"
import { Spinner } from "@/components/ui/spinner"
import { Transition, type TransitionOverride } from "@/components/ui/transition"

type LoadingOverlayProps = React.ComponentProps<"div"> & {
  /** Props passed down to `Transition`. Set `duration` to override the default. */
  transitionProps?: TransitionOverride
  /** Props passed down to the `Spinner` rendered as the loading indicator. */
  loaderProps?: React.ComponentProps<typeof Spinner>
  /** Props passed down to `Overlay` — customize its blur, opacity, color, etc. */
  overlayProps?: OverlayProps
  /** Controls overlay visibility. @default false */
  visible?: boolean
  /** z-index of the overlay; the loader itself sits one above it. @default 400 */
  zIndex?: number | string
  onEnter?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExited?: () => void
}

function LoadingOverlay({
  className,
  style,
  transitionProps,
  loaderProps,
  overlayProps,
  visible,
  zIndex = 400,
  onEnter,
  onEntered,
  onExit,
  onExited,
  ...props
}: LoadingOverlayProps) {
  const loaderZIndex =
    typeof zIndex === "number" ? zIndex + 1 : `calc(${zIndex} + 1)`

  return (
    <Transition
      transition="fade"
      duration={0}
      {...transitionProps}
      mounted={!!visible}
      onEnter={onEnter}
      onEntered={onEntered}
      onExit={onExit}
      onExited={onExited}
    >
      {(transitionStyles) => (
        <div
          data-slot="loading-overlay"
          className={cn(
            "absolute inset-0 flex items-center justify-center overflow-hidden",
            className,
          )}
          style={{ ...style, ...transitionStyles, zIndex }}
          {...props}
        >
          <Spinner
            data-slot="loading-overlay-loader"
            className="relative size-8"
            {...loaderProps}
            style={{ zIndex: loaderZIndex, ...loaderProps?.style }}
          />
          <Overlay
            data-slot="loading-overlay-overlay"
            backgroundOpacity={0.75}
            color="var(--background)"
            {...overlayProps}
            zIndex={zIndex}
          />
        </div>
      )}
    </Transition>
  )
}

export { LoadingOverlay }
export type { LoadingOverlayProps }
