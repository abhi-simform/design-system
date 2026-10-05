"use client"

import * as React from "react"
import { cn } from "cn"

import { Affix } from "@/components/ui/affix"
import type { AffixPosition, AffixProps } from "@/components/ui/affix"
import { CloseButton } from "@/components/ui/close-button"
import type { CloseButtonProps } from "@/components/ui/close-button"
import { Paper } from "@/components/ui/paper"
import type { PaperProps } from "@/components/ui/paper"
import { Separator } from "@/components/ui/separator"
import { Transition } from "@/components/ui/transition"
import type { TransitionOverride } from "@/components/ui/transition"

interface ActionBarContextValue {
  onClose?: () => void
}

const ActionBarContext = React.createContext<ActionBarContextValue | null>(null)

function useActionBarContext() {
  const context = React.useContext(ActionBarContext)
  if (!context) {
    throw new Error(
      "ActionBar.Divider and ActionBar.CloseButton must be used within an ActionBar.",
    )
  }
  return context
}

interface ActionBarProps extends React.ComponentProps<"div"> {
  /** Controls visibility. */
  opened: boolean
  /** Called when the close button is clicked or Escape is pressed. */
  onClose?: () => void
  /** Props passed down to the `Transition` component. @default { transition: "pop", duration: 200 } */
  transitionProps?: TransitionOverride
  /** Key of the shadow scale, or any valid CSS `box-shadow` value. */
  shadow?: PaperProps["shadow"]
  /** Key of the radius scale, or any valid CSS value for `border-radius`. */
  radius?: PaperProps["radius"]
  /** Adds a border around the bar. @default true */
  withBorder?: boolean
  /** Closes the bar when `Escape` is pressed. @default false */
  closeOnEscape?: boolean
  /** Affix position on screen. @default { bottom: 30, left: 0, right: 0 } */
  position?: AffixPosition
  /** Root element `z-index`. */
  zIndex?: AffixProps["zIndex"]
  /** Determines whether the bar is rendered within a `Portal`. @default true */
  withinPortal?: boolean
  /** Props passed down to the `Portal` component. Ignored when `withinPortal` is `false`. */
  portalProps?: AffixProps["portalProps"]
  /** Keeps the bar mounted in the DOM (hidden via `display: none`) when closed. */
  keepMounted?: boolean
}

function ActionBar({
  opened,
  onClose,
  transitionProps = { transition: "pop", duration: 200 },
  shadow,
  radius,
  withBorder = true,
  closeOnEscape = false,
  position = { bottom: 30, left: 0, right: 0 },
  zIndex,
  withinPortal = true,
  portalProps,
  keepMounted,
  className,
  style,
  children,
  "aria-label": ariaLabel = "Actions",
  ...props
}: ActionBarProps) {
  React.useEffect(() => {
    if (!closeOnEscape || !opened) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.isComposing) {
        onClose?.()
      }
    }

    window.addEventListener("keydown", handleEscape, { passive: true })
    return () => window.removeEventListener("keydown", handleEscape)
  }, [closeOnEscape, opened, onClose])

  return (
    <Affix
      zIndex={zIndex}
      position={position}
      withinPortal={withinPortal}
      portalProps={portalProps}
    >
      <Transition
        keepMounted={keepMounted}
        keepMountedMode="display-none"
        mounted={opened}
        {...transitionProps}
      >
        {(transitionStyles) => (
          <ActionBarContext.Provider value={{ onClose }}>
            <Paper
              data-slot="action-bar"
              role="group"
              aria-label={ariaLabel}
              shadow={shadow}
              radius={radius}
              withBorder={withBorder}
              style={{ ...transitionStyles, ...style }}
              className={cn(
                "mx-auto flex w-fit items-center gap-3 px-3 py-2.5",
                className,
              )}
              {...props}
            >
              {children}
            </Paper>
          </ActionBarContext.Provider>
        )}
      </Transition>
    </Affix>
  )
}

function ActionBarDivider({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  useActionBarContext()

  return (
    <Separator
      data-slot="action-bar-divider"
      orientation="vertical"
      className={className}
      {...props}
    />
  )
}

function ActionBarCloseButton({ onClick, ...props }: CloseButtonProps) {
  const { onClose } = useActionBarContext()

  return (
    <CloseButton
      data-slot="action-bar-close-button"
      onClick={(event) => {
        onClick?.(event)
        onClose?.()
      }}
      {...props}
    />
  )
}

const ActionBarNamespace = Object.assign(ActionBar, {
  Divider: ActionBarDivider,
  CloseButton: ActionBarCloseButton,
})

export {
  ActionBarNamespace as ActionBar,
  ActionBarDivider,
  ActionBarCloseButton,
}
export type { ActionBarProps }
