import * as React from "react"
import { cn } from "cn"

type ListType = "ordered" | "unordered"
type ListSize = "xs" | "sm" | "md" | "lg" | "xl"
type ListSpacing = ListSize | number | (string & {})

interface ListContextValue {
  icon?: React.ReactNode
  center?: boolean
}

const ListContext = React.createContext<ListContextValue | null>(null)

function useListContext() {
  const context = React.useContext(ListContext)
  if (!context) {
    throw new Error("List.Item must be used within a List.")
  }
  return context
}

const SIZE_CLASSES: Record<ListSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

const DEFAULT_SPACING: Record<string, string> = {
  xs: "0.625rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
}

const rem = (px: number) => `${px / 16}rem`

function getSpacing(value: ListSpacing | undefined) {
  if (value === undefined) return undefined
  if (typeof value === "number") return rem(value)
  return DEFAULT_SPACING[value] ?? value
}

// Every class below must appear as complete, literal text (not built from a
// shared prefix via interpolation) — Tailwind's scanner reads source text
// verbatim and never resolves a template-literal concatenation at scan time.
const SPACING_CLASSES: Record<ListSize, string> = {
  xs: "[&>[data-slot=list-item]:not(:first-child)]:mt-2.5",
  sm: "[&>[data-slot=list-item]:not(:first-child)]:mt-3",
  md: "[&>[data-slot=list-item]:not(:first-child)]:mt-4",
  lg: "[&>[data-slot=list-item]:not(:first-child)]:mt-5",
  xl: "[&>[data-slot=list-item]:not(:first-child)]:mt-6",
}

const CUSTOM_SPACING_CLASS =
  "[&>[data-slot=list-item]:not(:first-child)]:mt-[var(--list-spacing)]"

function isSpacingToken(value: ListSpacing): value is ListSize {
  return typeof value === "string" && Object.hasOwn(SPACING_CLASSES, value)
}

interface ListProps extends Omit<React.ComponentProps<"ol">, "type"> {
  /** List type @default "unordered" */
  type?: ListType
  /** Controls font-size (and its paired line-height) @default "md" */
  size?: ListSize
  /** Icon to replace default list markers. Applied to all items unless overridden on individual List.Item components */
  icon?: React.ReactNode
  /** Gap between items @default undefined (no gap) */
  spacing?: ListSpacing
  /** Vertically centers list items with their icons @default false */
  center?: boolean
  /** Adds extra horizontal padding to the list, useful for nested lists @default false */
  withPadding?: boolean
  /** Controls CSS list-style-type. Overrides the default list marker style based on list type */
  listStyleType?: React.CSSProperties["listStyleType"]
  /** Starting value for ordered list numbering (only works with type="ordered") */
  start?: number
  /** Reverses the order of list items (only works with type="ordered") */
  reversed?: boolean
}

function List({
  type = "unordered",
  size = "md",
  icon,
  spacing,
  center = false,
  withPadding = false,
  listStyleType,
  start,
  reversed,
  className,
  style,
  children,
  ...props
}: ListProps) {
  const markerGapZero = Boolean(icon) || listStyleType === "none"
  const paddingClass = markerGapZero
    ? withPadding
      ? "pl-4"
      : "pl-0"
    : withPadding
      ? "pl-9"
      : "pl-5"

  const spacingClass =
    spacing === undefined
      ? undefined
      : isSpacingToken(spacing)
        ? SPACING_CLASSES[spacing]
        : CUSTOM_SPACING_CLASS

  const spacingStyle: React.CSSProperties | undefined =
    spacing !== undefined && !isSpacingToken(spacing)
      ? { ["--list-spacing" as string]: getSpacing(spacing) }
      : undefined

  const rootClassName = cn(
    "m-0 list-outside",
    // Tailwind's preflight zeroes list-style on ul/ol — restore the native
    // marker here; an explicit listStyleType (inline style) or a per-item
    // icon (list-none on that <li>) still takes precedence over this.
    type === "ordered" ? "list-decimal" : "list-disc",
    SIZE_CLASSES[size],
    paddingClass,
    spacingClass,
    className,
  )
  const rootStyle: React.CSSProperties = {
    listStyleType,
    ...spacingStyle,
    ...style,
  }

  return (
    <ListContext.Provider value={{ icon, center }}>
      {type === "ordered" ? (
        <ol
          data-slot="list"
          className={rootClassName}
          style={rootStyle}
          start={start}
          reversed={reversed}
          {...props}
        >
          {children}
        </ol>
      ) : (
        <ul
          data-slot="list"
          className={rootClassName}
          style={rootStyle}
          {...props}
        >
          {children}
        </ul>
      )}
    </ListContext.Provider>
  )
}

interface ListItemProps extends React.ComponentProps<"li"> {
  /** Icon to replace this item's bullet, overriding the parent List's icon */
  icon?: React.ReactNode
}

function ListItem({ icon, className, children, ...props }: ListItemProps) {
  const { icon: contextIcon, center } = useListContext()
  const resolvedIcon = icon ?? contextIcon

  return (
    <li
      data-slot="list-item"
      className={cn(
        "leading-normal whitespace-normal",
        resolvedIcon && "list-none",
        center && "leading-none",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "inline-flex whitespace-normal",
          resolvedIcon ? "flex-row items-center" : "flex-col items-start",
        )}
      >
        {resolvedIcon && (
          <span
            data-slot="list-item-icon"
            className="mr-3 inline-block align-middle"
          >
            {resolvedIcon}
          </span>
        )}
        <span data-slot="list-item-label">{children}</span>
      </div>
    </li>
  )
}

const ListWithItem = Object.assign(List, { Item: ListItem })

export { ListWithItem as List, ListItem }
export type { ListProps, ListItemProps, ListType, ListSize, ListSpacing }
