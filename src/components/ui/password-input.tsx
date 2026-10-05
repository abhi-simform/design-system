"use client"

import * as React from "react"
import { cn } from "cn"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type PasswordInputSize = "xs" | "sm" | "md" | "lg" | "xl"

const sizeClasses: Record<
  PasswordInputSize,
  {
    input: string
    section: string
    button: string
    start: string
    end: string
    icon: string
  }
> = {
  xs: {
    input: "h-7 text-xs md:text-xs",
    section: "w-7",
    button: "size-5",
    start: "ps-7",
    end: "pe-7",
    icon: "size-3.5",
  },
  sm: {
    input: "h-8 text-sm md:text-sm",
    section: "w-8",
    button: "size-6",
    start: "ps-8",
    end: "pe-8",
    icon: "size-4",
  },
  md: {
    input: "h-9 text-sm md:text-sm",
    section: "w-9",
    button: "size-7",
    start: "ps-9",
    end: "pe-9",
    icon: "size-4",
  },
  lg: {
    input: "h-10 text-base md:text-base",
    section: "w-10",
    button: "size-8",
    start: "ps-10",
    end: "pe-10",
    icon: "size-4.5",
  },
  xl: {
    input: "h-11 text-lg md:text-lg",
    section: "w-11",
    button: "size-9",
    start: "ps-11",
    end: "pe-11",
    icon: "size-5",
  },
}

const pointerEventsClasses = {
  none: "pointer-events-none",
  all: "pointer-events-auto",
} satisfies Record<"none" | "all", string>

function PasswordToggleIcon({ reveal }: { reveal: boolean }) {
  return reveal ? <EyeOffIcon /> : <EyeIcon />
}

type PasswordInputProps = Omit<
  React.ComponentProps<"input">,
  "size" | "type"
> & {
  /** Controlled visibility state. */
  visible?: boolean
  /** Uncontrolled initial visibility state. @default false */
  defaultVisible?: boolean
  /** Called when visibility changes. */
  onVisibilityChange?: (visible: boolean) => void
  /** Component that replaces the visibility toggle icon. */
  visibilityToggleIcon?: React.ComponentType<{ reveal: boolean }>
  /** Props passed down to the visibility toggle button. */
  visibilityToggleButtonProps?: React.ComponentProps<typeof Button>
  /** If set, the visibility toggle button is reachable with the keyboard. @default false */
  visibilityToggleFocusable?: boolean
  /** Controls input height and section width. @default "sm" */
  size?: PasswordInputSize
  /** Content rendered at the start of the input. */
  leftSection?: React.ReactNode
  /** Replaces the visibility toggle button. */
  rightSection?: React.ReactNode
  /** Pointer events of the left section. @default "none" */
  leftSectionPointerEvents?: "none" | "all"
  /** Pointer events of the right section. @default "all" */
  rightSectionPointerEvents?: "none" | "all"
  /** Marks the input as invalid. */
  error?: boolean
  /** className applied to the outer relative wrapper. */
  wrapperClassName?: string
}

function PasswordInput({
  className,
  wrapperClassName,
  visible,
  defaultVisible = false,
  onVisibilityChange,
  visibilityToggleIcon: VisibilityToggleIcon = PasswordToggleIcon,
  visibilityToggleButtonProps,
  visibilityToggleFocusable = false,
  size = "sm",
  leftSection,
  rightSection,
  leftSectionPointerEvents = "none",
  rightSectionPointerEvents = "all",
  error,
  disabled,
  autoComplete,
  ...props
}: PasswordInputProps) {
  const isControlled = visible !== undefined
  const [internalVisible, setInternalVisible] = React.useState(defaultVisible)
  const isVisible = isControlled ? visible : internalVisible
  const config = sizeClasses[size]

  const toggle = () => {
    const next = !isVisible
    if (!isControlled) setInternalVisible(next)
    onVisibilityChange?.(next)
  }

  const {
    className: buttonClassName,
    onMouseDown,
    onTouchEnd,
    onKeyDown,
    ...buttonProps
  } = visibilityToggleButtonProps ?? {}

  const toggleButton = (
    <Button
      variant="ghost"
      aria-label="Toggle password visibility"
      {...buttonProps}
      disabled={disabled || buttonProps.disabled}
      aria-pressed={isVisible}
      tabIndex={visibilityToggleFocusable ? 0 : -1}
      className={cn(config.button, "text-muted-foreground", buttonClassName)}
      onMouseDown={(event) => {
        event.preventDefault()
        onMouseDown?.(event)
        toggle()
      }}
      onTouchEnd={(event) => {
        event.preventDefault()
        onTouchEnd?.(event)
        toggle()
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault()
          toggle()
        }
      }}
    >
      <span className={cn("flex items-center justify-center", config.icon)}>
        <VisibilityToggleIcon reveal={isVisible} />
      </span>
    </Button>
  )

  const end = rightSection ?? toggleButton

  return (
    <div
      data-slot="password-input"
      data-disabled={disabled ? "" : undefined}
      className={cn("relative w-full", wrapperClassName)}
    >
      {leftSection && (
        <div
          data-slot="password-input-left-section"
          className={cn(
            "absolute inset-y-0 start-0 z-10 flex items-center justify-center text-muted-foreground",
            config.section,
            pointerEventsClasses[leftSectionPointerEvents],
          )}
        >
          {leftSection}
        </div>
      )}
      <Input
        {...props}
        type={isVisible ? "text" : "password"}
        disabled={disabled}
        autoComplete={autoComplete || "off"}
        aria-invalid={error || props["aria-invalid"]}
        className={cn(
          config.input,
          leftSection && config.start,
          config.end,
          className,
        )}
      />
      <div
        data-slot="password-input-right-section"
        className={cn(
          "absolute inset-y-0 end-0 z-10 flex items-center justify-center text-muted-foreground",
          config.section,
          pointerEventsClasses[rightSectionPointerEvents],
        )}
      >
        {end}
      </div>
    </div>
  )
}

export { PasswordInput, PasswordToggleIcon }
export type { PasswordInputProps, PasswordInputSize }
