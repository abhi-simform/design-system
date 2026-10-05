import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "cn"

type NavLinkVariant = "filled" | "light" | "subtle"
type NavLinkChildrenOffset = "xs" | "sm" | "md" | "lg" | "xl"

const ACTIVE_CLASSES: Record<NavLinkVariant, string> = {
  light:
    "bg-(--nav-link-color)/10 text-(--nav-link-color) hover:bg-(--nav-link-color)/15",
  filled:
    "bg-(--nav-link-color) text-primary-foreground hover:bg-(--nav-link-color)/90",
  subtle: "text-(--nav-link-color) hover:bg-(--nav-link-color)/10",
}

const OFFSET_CLASSES: Record<NavLinkChildrenOffset, string> = {
  xs: "ps-2.5",
  sm: "ps-3",
  md: "ps-4",
  lg: "ps-5",
  xl: "ps-6",
}

type NavLinkProps = Omit<useRender.ComponentProps<"a">, "children"> & {
  label?: React.ReactNode
  description?: React.ReactNode
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  active?: boolean
  variant?: NavLinkVariant
  /** Any valid CSS color for the active styles. Defaults to the primary color. */
  color?: string
  noWrap?: boolean
  children?: React.ReactNode
  opened?: boolean
  defaultOpened?: boolean
  onChange?: (opened: boolean) => void
  disableRightSectionRotation?: boolean
  childrenOffset?: NavLinkChildrenOffset
  disabled?: boolean
  keepMounted?: boolean
}

function NavLink({
  label,
  description,
  leftSection,
  rightSection,
  active = false,
  variant = "light",
  color,
  noWrap = false,
  children,
  opened,
  defaultOpened = false,
  onChange,
  disableRightSectionRotation = false,
  childrenOffset = "lg",
  disabled = false,
  keepMounted = true,
  className,
  style,
  render,
  onClick,
  onKeyDown,
  ...props
}: NavLinkProps) {
  const [uncontrolledOpened, setUncontrolledOpened] =
    React.useState(defaultOpened)
  const isControlled = opened !== undefined
  const isOpened = isControlled ? opened : uncontrolledOpened
  const withChildren = !!children
  const isActive = active || props["aria-current"] === "page"

  const toggle = () => {
    const next = !isOpened
    if (!isControlled) setUncontrolledOpened(next)
    onChange?.(next)
  }

  const root = useRender({
    defaultTagName: "a",
    render,
    props: mergeProps<"a">(
      {
        className: cn(
          "flex w-full items-center px-3 py-2 text-sm outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50",
          "[--nav-link-color:var(--primary)]",
          isActive ? ACTIVE_CLASSES[variant] : "hover:bg-muted",
          disabled && "pointer-events-none opacity-40",
          className,
        ),
        style: color
          ? ({ "--nav-link-color": color } as React.CSSProperties)
          : undefined,
        "aria-disabled": disabled || undefined,
        "aria-expanded": withChildren ? isOpened : undefined,
        role: withChildren && !props.href ? "button" : undefined,
        tabIndex: withChildren && !props.href && !disabled ? 0 : undefined,
        onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
          onClick?.(event)
          if (withChildren) {
            event.preventDefault()
            toggle()
          }
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLAnchorElement>) => {
          onKeyDown?.(event)
          if (event.nativeEvent.code === "Space" && withChildren) {
            event.preventDefault()
            toggle()
          }
        },
        children: (
          <>
            {leftSection && (
              <span
                data-slot="nav-link-section"
                data-position="left"
                className="me-3 flex items-center justify-center transition-transform duration-150 ease-in-out [&>svg]:block"
              >
                {leftSection}
              </span>
            )}
            <span
              data-slot="nav-link-body"
              className={cn(
                "flex-1 overflow-hidden text-ellipsis",
                noWrap && "whitespace-nowrap",
              )}
            >
              <span data-slot="nav-link-label" className="text-sm">
                {label}
              </span>
              <span
                data-slot="nav-link-description"
                className={cn(
                  "block overflow-hidden text-xs text-ellipsis",
                  noWrap && "whitespace-nowrap",
                  isActive
                    ? "text-current opacity-90"
                    : "text-muted-foreground",
                )}
              >
                {description}
              </span>
            </span>
            {(withChildren || rightSection !== undefined) && (
              <span
                data-slot="nav-link-section"
                data-position="right"
                className={cn(
                  "ms-3 flex items-center justify-center transition-transform duration-150 ease-in-out [&>svg]:block",
                  isOpened && !disableRightSectionRotation && "rotate-90",
                )}
              >
                {withChildren && rightSection === undefined ? (
                  <ChevronRightIcon
                    data-slot="nav-link-chevron"
                    className="size-4"
                  />
                ) : (
                  rightSection
                )}
              </span>
            )}
          </>
        ),
      },
      { ...props, style },
    ),
    state: {
      slot: "nav-link",
      active: isActive,
      disabled,
      expanded: isOpened,
    },
  })

  return (
    <>
      {root}
      {withChildren && (
        <CollapsiblePrimitive.Root open={isOpened}>
          <CollapsiblePrimitive.Panel
            data-slot="nav-link-collapse"
            keepMounted={keepMounted}
            className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0"
          >
            <div
              data-slot="nav-link-children"
              className={OFFSET_CLASSES[childrenOffset]}
            >
              {children}
            </div>
          </CollapsiblePrimitive.Panel>
        </CollapsiblePrimitive.Root>
      )}
    </>
  )
}

export { NavLink }
export type { NavLinkChildrenOffset, NavLinkProps, NavLinkVariant }
