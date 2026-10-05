import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "cn"
import { XIcon } from "lucide-react"

type PillSize = "xs" | "sm" | "md" | "lg" | "xl"

interface PillGroupContextValue {
  size: PillSize | undefined
  disabled: boolean | undefined
}

const PillGroupContext = React.createContext<PillGroupContextValue | null>(null)

const pillSizeConfig: Record<
  PillSize,
  { root: string; label: string; icon: string; removePadding: string }
> = {
  xs: {
    root: "h-4.5 ps-2 pe-2 text-[10px]",
    label: "leading-[1.125rem]",
    icon: "size-2.5",
    removePadding: "ps-1 pe-1.5",
  },
  sm: {
    root: "h-5.5 ps-2.5 pe-2.5 text-xs",
    label: "leading-[1.375rem]",
    icon: "size-3",
    removePadding: "ps-1 pe-2",
  },
  md: {
    root: "h-6.25 ps-3 pe-3 text-sm",
    label: "leading-[1.5625rem]",
    icon: "size-3.5",
    removePadding: "ps-1.5 pe-2",
  },
  lg: {
    root: "h-7 ps-3.5 pe-3.5 text-base",
    label: "leading-[1.75rem]",
    icon: "size-4",
    removePadding: "ps-1.5 pe-2.5",
  },
  xl: {
    root: "h-8 ps-4 pe-4 text-lg",
    label: "leading-[2rem]",
    icon: "size-4.5",
    removePadding: "ps-2 pe-3",
  },
}

const pillGroupGapConfig: Record<PillSize, string> = {
  xs: "gap-1.5",
  sm: "gap-2",
  md: "gap-2.5",
  lg: "gap-3",
  xl: "gap-3",
}

interface PillProps extends React.ComponentProps<"span"> {
  /** Controls pill font-size and padding. @default "sm" */
  size?: PillSize
  /** Controls visibility of the remove button. @default false */
  withRemoveButton?: boolean
  /** Called when the remove button is clicked. */
  onRemove?: () => void
  /** Props passed down to the remove button. */
  removeButtonProps?: React.ComponentProps<"button">
  /** Adds disabled attribute, applies disabled styles. */
  disabled?: boolean
}

function Pill({
  className,
  size,
  withRemoveButton = false,
  onRemove,
  removeButtonProps,
  disabled,
  children,
  ...props
}: PillProps) {
  const groupCtx = React.useContext(PillGroupContext)
  const resolvedSize = size ?? groupCtx?.size ?? "sm"
  const resolvedDisabled = disabled ?? groupCtx?.disabled
  const config = pillSizeConfig[resolvedSize]
  const showRemove = withRemoveButton && !resolvedDisabled

  return (
    <span
      data-slot="pill"
      data-disabled={resolvedDisabled ? "" : undefined}
      className={cn(
        "relative inline-flex max-w-full shrink-0 items-center rounded-full bg-muted leading-none text-nowrap text-foreground select-none",
        config.root,
        showRemove && "pe-0",
        "data-disabled:cursor-not-allowed data-disabled:opacity-60",
        className,
      )}
      {...props}
    >
      <span
        data-slot="pill-label"
        className={cn(
          "block h-full overflow-hidden text-ellipsis",
          config.label,
        )}
      >
        {children}
      </span>
      {withRemoveButton && (
        <ButtonPrimitive
          type="button"
          data-slot="pill-remove"
          tabIndex={-1}
          aria-hidden
          disabled={resolvedDisabled}
          className={cn(
            "flex h-full shrink-0 items-center justify-center rounded-e-full text-inherit transition-colors outline-none hover:bg-foreground/10 disabled:hidden [&_svg]:pointer-events-none",
            config.removePadding,
          )}
          {...removeButtonProps}
          onMouseDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
            removeButtonProps?.onMouseDown?.(event)
          }}
          onClick={(event) => {
            event.stopPropagation()
            onRemove?.()
            removeButtonProps?.onClick?.(event)
          }}
        >
          <XIcon className={config.icon} />
        </ButtonPrimitive>
      )}
    </span>
  )
}

interface PillGroupProps extends React.ComponentProps<"div"> {
  /** Controls size of the child Pill components and gap between them. @default "sm" */
  size?: PillSize
  /** If set, adds disabled to all child Pill components. */
  disabled?: boolean
}

function PillGroup({
  className,
  size = "sm",
  disabled,
  ...props
}: PillGroupProps) {
  return (
    <PillGroupContext.Provider value={{ size, disabled }}>
      <div
        data-slot="pill-group"
        className={cn(
          "flex flex-wrap items-center",
          pillGroupGapConfig[size],
          className,
        )}
        {...props}
      />
    </PillGroupContext.Provider>
  )
}

const PillWithGroup = Object.assign(Pill, { Group: PillGroup })

export { PillWithGroup as Pill, PillGroup }
export type { PillProps, PillGroupProps, PillSize }
