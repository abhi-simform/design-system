import * as React from "react"
import { cn } from "cn"
import { CheckIcon } from "lucide-react"

type ChipVariant = "outline" | "filled" | "light"
type ChipSize = "xs" | "sm" | "md" | "lg" | "xl"
type ChipRadius = "xs" | "sm" | "md" | "lg" | "xl" | "full"
type ChipColor =
  | "primary"
  | "secondary"
  | "destructive"
  | "accent"
  | "muted"
  | "pink"
  | "red"
  | "yellow"
  | "orange"
  | "cyan"
  | "green"
  | "blue"
  | "purple"
  | "geekblue"
  | "magenta"
  | "volcano"
  | "gold"
  | "lime"

// Each color only declares CSS variables; the variant classes below read them,
// so the checked-state styles are written once instead of once per color.
// --chip-c: fill, --chip-t: text on light/outline, --chip-fg: text on a filled
// chip, --chip-fg-auto: text on a filled chip when autoContrast is set.
const COLOR_CLASSES: Record<ChipColor, string> = {
  primary:
    "[--chip-c:var(--color-primary)] [--chip-t:var(--color-primary)] [--chip-fg:var(--color-primary-foreground)] [--chip-fg-auto:var(--color-primary-foreground)]",
  secondary:
    "[--chip-c:var(--color-secondary)] [--chip-t:var(--color-secondary-foreground)] [--chip-fg:var(--color-secondary-foreground)] [--chip-fg-auto:var(--color-secondary-foreground)]",
  destructive:
    "[--chip-c:var(--color-destructive)] [--chip-t:var(--color-destructive)] [--chip-fg:white] [--chip-fg-auto:white]",
  accent:
    "[--chip-c:var(--color-accent)] [--chip-t:var(--color-accent-foreground)] [--chip-fg:var(--color-accent-foreground)] [--chip-fg-auto:var(--color-accent-foreground)]",
  muted:
    "[--chip-c:var(--color-muted)] [--chip-t:var(--color-muted-foreground)] [--chip-fg:var(--color-muted-foreground)] [--chip-fg-auto:var(--color-muted-foreground)]",
  pink: "[--chip-c:var(--color-pink)] [--chip-t:var(--color-pink)] [--chip-fg:white] [--chip-fg-auto:white]",
  red: "[--chip-c:var(--color-red)] [--chip-t:var(--color-red)] [--chip-fg:white] [--chip-fg-auto:white]",
  yellow:
    "[--chip-c:var(--color-yellow)] [--chip-t:var(--color-yellow)] [--chip-fg:white] [--chip-fg-auto:black]",
  orange:
    "[--chip-c:var(--color-orange)] [--chip-t:var(--color-orange)] [--chip-fg:white] [--chip-fg-auto:black]",
  cyan: "[--chip-c:var(--color-cyan)] [--chip-t:var(--color-cyan)] [--chip-fg:white] [--chip-fg-auto:black]",
  green:
    "[--chip-c:var(--color-green)] [--chip-t:var(--color-green)] [--chip-fg:white] [--chip-fg-auto:black]",
  blue: "[--chip-c:var(--color-blue)] [--chip-t:var(--color-blue)] [--chip-fg:white] [--chip-fg-auto:white]",
  purple:
    "[--chip-c:var(--color-purple)] [--chip-t:var(--color-purple)] [--chip-fg:white] [--chip-fg-auto:white]",
  geekblue:
    "[--chip-c:var(--color-geekblue)] [--chip-t:var(--color-geekblue)] [--chip-fg:white] [--chip-fg-auto:white]",
  magenta:
    "[--chip-c:var(--color-magenta)] [--chip-t:var(--color-magenta)] [--chip-fg:white] [--chip-fg-auto:white]",
  volcano:
    "[--chip-c:var(--color-volcano)] [--chip-t:var(--color-volcano)] [--chip-fg:white] [--chip-fg-auto:white]",
  gold: "[--chip-c:var(--color-gold)] [--chip-t:var(--color-gold)] [--chip-fg:white] [--chip-fg-auto:black]",
  lime: "[--chip-c:var(--color-lime)] [--chip-t:var(--color-lime)] [--chip-fg:white] [--chip-fg-auto:black]",
}

const UNCHECKED_CLASSES: Record<ChipVariant, string> = {
  outline: "border-border bg-background hover:bg-muted",
  filled: "border-transparent bg-muted hover:bg-muted-foreground/20",
  light: "border-transparent bg-muted hover:bg-muted-foreground/20",
}

const CHECKED_CLASSES: Record<ChipVariant, string> = {
  outline:
    "border-(--chip-t) bg-background text-(--chip-t) hover:bg-(--chip-c)/15",
  filled:
    "border-transparent bg-(--chip-c) text-(--chip-fg) hover:bg-(--chip-c)/85",
  light:
    "border-transparent bg-(--chip-c)/15 text-(--chip-t) hover:bg-(--chip-c)/25",
}

const SIZE_CLASSES: Record<
  ChipSize,
  { label: string; checkedPadding: string; icon: string; iconWrapper: string }
> = {
  xs: {
    label: "h-5.75 px-4 text-xs",
    checkedPadding: "px-2.05",
    icon: "size-2.25",
    iconWrapper: "h-2.25 w-3.92",
  },
  sm: {
    label: "h-7 px-5 text-sm",
    checkedPadding: "px-2.5",
    icon: "size-3",
    iconWrapper: "h-3 w-5",
  },
  md: {
    label: "h-8 px-6 text-base",
    checkedPadding: "px-2.92",
    icon: "size-3.5",
    iconWrapper: "h-3.5 w-6.17",
  },
  lg: {
    label: "h-9 px-7 text-lg",
    checkedPadding: "px-3.37",
    icon: "size-4",
    iconWrapper: "h-4 w-7.33",
  },
  xl: {
    label: "h-10 px-8 text-xl",
    checkedPadding: "px-3.92",
    icon: "size-4.5",
    iconWrapper: "h-4.5 w-8.17",
  },
}

const RADIUS_CLASSES: Record<ChipRadius, string> = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
}

interface ChipGroupContextValue {
  isChipSelected: (value: string) => boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  multiple: boolean | undefined
}

const ChipGroupContext = React.createContext<ChipGroupContextValue | null>(null)

interface ChipProps extends Omit<
  React.ComponentProps<"input">,
  "size" | "onChange" | "color" | "children" | "className" | "style"
> {
  /** Chip appearance when checked. @default "filled" */
  variant?: ChipVariant
  /** Controls height, font size and padding. @default "sm" */
  size?: ChipSize
  /** Controls border-radius. Fully rounded when not set. */
  radius?: ChipRadius
  /** Color used by the checked state. @default "primary" */
  color?: ChipColor
  /** Underlying input type. Overridden by the surrounding Chip.Group. @default "checkbox" */
  type?: "radio" | "checkbox"
  /** Content of the label element associated with the input. */
  children: React.ReactNode
  /** Controlled checked state. */
  checked?: boolean
  /** Uncontrolled initial checked state. */
  defaultChecked?: boolean
  /** Called when the checked state changes. */
  onChange?: (checked: boolean) => void
  /** Replaces the default check icon. Pass null or false to hide the icon. */
  icon?: React.ReactNode
  /** Props passed down to the root element. */
  wrapperProps?: React.ComponentProps<"div">
  /** Ref of the root element. The regular `ref` points at the input. */
  rootRef?: React.Ref<HTMLDivElement>
  /** Picks a readable text color on light fills for the filled variant. */
  autoContrast?: boolean
  /** Applied to the root element. */
  className?: string
  /** Applied to the root element. */
  style?: React.CSSProperties
}

function Chip({
  className,
  style,
  id,
  checked,
  defaultChecked,
  onChange,
  value,
  wrapperProps,
  type = "checkbox",
  disabled,
  children,
  size = "sm",
  radius,
  variant = "filled",
  color = "primary",
  icon,
  rootRef,
  autoContrast,
  ...props
}: ChipProps) {
  const ctx = React.useContext(ChipGroupContext)
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  const [innerChecked, setInnerChecked] = React.useState(
    defaultChecked ?? false,
  )
  const isControlled = checked !== undefined
  const ownChecked = isControlled ? checked : innerChecked

  const isChecked = ctx
    ? ctx.isChipSelected(value as string) || ownChecked
    : ownChecked
  const resolvedType = ctx ? (ctx.multiple ? "checkbox" : "radio") : type

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (ctx) {
      ctx.onChange(event)
    } else {
      if (!isControlled) setInnerChecked(event.currentTarget.checked)
    }
    onChange?.(event.currentTarget.checked)
  }

  const sizeConfig = SIZE_CLASSES[size]
  const showIcon = isChecked && icon !== null && icon !== false

  return (
    <div
      ref={rootRef}
      data-slot="chip"
      data-checked={isChecked ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      {...wrapperProps}
      className={cn(
        "relative inline-block",
        wrapperProps?.className,
        className,
      )}
      style={{ ...wrapperProps?.style, ...style }}
    >
      <input
        data-slot="chip-input"
        type={resolvedType}
        id={inputId}
        value={value}
        disabled={disabled}
        checked={isChecked}
        onChange={handleChange}
        className="peer m-0 size-0 p-0 opacity-0"
        {...props}
      />
      <label
        data-slot="chip-label"
        htmlFor={inputId}
        data-checked={isChecked ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        className={cn(
          "inline-flex cursor-pointer items-center border leading-none whitespace-nowrap select-none [-webkit-tap-highlight-color:transparent]",
          "transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
          sizeConfig.label,
          RADIUS_CLASSES[radius ?? "full"],
          COLOR_CLASSES[color],
          disabled
            ? "cursor-not-allowed border-transparent bg-muted text-muted-foreground opacity-60"
            : isChecked
              ? CHECKED_CLASSES[variant]
              : cn(UNCHECKED_CLASSES[variant], "text-foreground"),
          isChecked && sizeConfig.checkedPadding,
          !disabled &&
            isChecked &&
            variant === "filled" &&
            autoContrast &&
            "text-(--chip-fg-auto)",
        )}
      >
        {showIcon && (
          <span
            data-slot="chip-icon"
            className={cn(
              "flex items-center overflow-hidden",
              sizeConfig.iconWrapper,
            )}
          >
            {icon === undefined ? (
              <CheckIcon className={cn("block", sizeConfig.icon)} />
            ) : (
              icon
            )}
          </span>
        )}
        <span>{children}</span>
      </label>
    </div>
  )
}

type ChipGroupProps<
  Multiple extends boolean = false,
  Value extends string = string,
> = {
  /** If set, multiple chips can be selected. */
  multiple?: Multiple
  /** Controlled value. */
  value?: Multiple extends true ? Value[] : Value | null
  /** Uncontrolled initial value. */
  defaultValue?: Multiple extends true ? Value[] : Value | null
  /** Called with an array when `multiple` is set, otherwise with the selected value. */
  onChange?: (value: Multiple extends true ? Value[] : Value) => void
  /** Chip components and any other elements. */
  children?: React.ReactNode
}

function ChipGroup<
  Multiple extends boolean = false,
  Value extends string = string,
>({
  value,
  defaultValue,
  onChange,
  multiple,
  children,
}: ChipGroupProps<Multiple, Value>) {
  const [innerValue, setInnerValue] = React.useState<string | null | string[]>(
    () => (defaultValue as string | null | string[]) ?? (multiple ? [] : null),
  )
  const current = (value !== undefined ? value : innerValue) as
    string | null | string[]

  const setValue = (next: string | string[]) => {
    if (value === undefined) setInnerValue(next)
    ;(onChange as ((value: string | string[]) => void) | undefined)?.(next)
  }

  const isChipSelected = (val: string) =>
    Array.isArray(current) ? current.includes(val) : val === current

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value
    if (Array.isArray(current)) {
      setValue(
        current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val],
      )
    } else {
      setValue(val)
    }
  }

  return (
    <ChipGroupContext.Provider
      value={{ isChipSelected, onChange: handleChange, multiple }}
    >
      {children}
    </ChipGroupContext.Provider>
  )
}

const ChipWithGroup = Object.assign(Chip, { Group: ChipGroup })

export { ChipWithGroup as Chip, ChipGroup }
export type {
  ChipProps,
  ChipGroupProps,
  ChipVariant,
  ChipSize,
  ChipRadius,
  ChipColor,
}
