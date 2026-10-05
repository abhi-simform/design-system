import * as React from "react"
import { cn } from "cn"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type JsonInputSize = "xs" | "sm" | "md" | "lg" | "xl"
type JsonInputRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl"

interface JsonInputProps extends Omit<
  React.ComponentProps<"textarea">,
  "value" | "defaultValue" | "onChange" | "size"
> {
  /** Controlled component value. */
  value?: string
  /** Uncontrolled component default value. */
  defaultValue?: string
  /** Called when the value changes. */
  onChange?: (value: string) => void
  /** Format the value with `serialize` on blur when it is valid JSON. @default false */
  formatOnBlur?: boolean
  /** Error message shown when the value is invalid JSON (checked on blur). Takes precedence over `error` when validation fails; when omitted only the error state is shown. */
  validationError?: React.ReactNode
  /** Serializes a parsed value into a string for formatting. Called with `(value, null, indentSpaces)`. @default JSON.stringify */
  serialize?: typeof JSON.stringify
  /** Parses the string for validation and formatting. Must throw when the string is invalid. @default JSON.parse */
  deserialize?: typeof JSON.parse
  /** Number of spaces used as white space when formatting. @default 2 */
  indentSpaces?: number
  /** Grow and shrink with the content between `minRows` and `maxRows`. @default false */
  autosize?: boolean
  /** Minimum number of visible rows. @default 2 */
  minRows?: number
  /** Maximum number of rows when `autosize` is enabled. */
  maxRows?: number
  /** Label rendered above the input. */
  label?: React.ReactNode
  /** Description rendered between the label and the input. */
  description?: React.ReactNode
  /** Error content; `true` only sets the invalid state. */
  error?: React.ReactNode
  /** Show the required asterisk next to the label. */
  withAsterisk?: boolean
  /** Controls font size and padding. @default "sm" */
  size?: JsonInputSize
  /** Border radius. @default "md" */
  radius?: JsonInputRadius
  /** Classes applied to the outer wrapper rather than the textarea. */
  wrapperClassName?: string
}

const sizeClasses: Record<JsonInputSize, string> = {
  xs: "px-2 py-1 text-xs md:text-xs",
  sm: "px-2.5 py-1.5 text-sm md:text-sm",
  md: "px-2.5 py-2 text-base md:text-sm",
  lg: "px-3 py-2.5 text-base md:text-base",
  xl: "px-4 py-3 text-lg md:text-lg",
}

const radiusClasses: Record<JsonInputRadius, string> = {
  none: "rounded-none",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
}

function validateJson(value: string, deserialize: typeof JSON.parse) {
  if (value.trim().length === 0) {
    return true
  }

  try {
    deserialize(value)
    return true
  } catch {
    return false
  }
}

function JsonInput({
  value,
  defaultValue,
  onChange,
  formatOnBlur = false,
  validationError,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
  indentSpaces = 2,
  autosize = false,
  minRows = 2,
  maxRows,
  label,
  description,
  error,
  withAsterisk,
  size = "sm",
  radius = "md",
  readOnly,
  onFocus,
  onBlur,
  id,
  className,
  wrapperClassName,
  style,
  required,
  ...props
}: JsonInputProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const isControlled = value !== undefined
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    defaultValue ?? "",
  )
  const currentValue = isControlled ? value : uncontrolledValue
  const [valid, setValid] = React.useState(() =>
    validateJson(currentValue, deserialize),
  )

  const setValue = (next: string) => {
    if (!isControlled) {
      setUncontrolledValue(next)
    }
    onChange?.(next)
  }

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    onFocus?.(event)
    setValid(true)
  }

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    onBlur?.(event)
    const text = event.currentTarget.value
    const isValid = validateJson(text, deserialize)

    if (formatOnBlur && !readOnly && isValid && text.trim() !== "") {
      setValue(serialize(deserialize(text), null, indentSpaces))
    }

    setValid(isValid)
  }

  const shownError = valid ? error : validationError || true
  const invalid = Boolean(shownError)
  const errorId = `${inputId}-error`
  const descriptionId = `${inputId}-description`
  const describedBy =
    [
      description ? descriptionId : null,
      typeof shownError !== "boolean" && shownError ? errorId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined

  const rowStyle: React.CSSProperties = {
    ...(autosize
      ? {
          minHeight: `calc(${minRows}lh + 1rem)`,
          ...(maxRows ? { maxHeight: `calc(${maxRows}lh + 1rem)` } : null),
        }
      : null),
    ...style,
  }

  return (
    <div
      data-slot="json-input"
      className={cn("flex w-full flex-col gap-1.5", wrapperClassName)}
    >
      {label ? (
        <Label htmlFor={inputId}>
          {label}
          {(withAsterisk ?? required) ? (
            <span aria-hidden className="text-destructive">
              *
            </span>
          ) : null}
        </Label>
      ) : null}
      {description ? (
        <p
          id={descriptionId}
          className="text-sm text-muted-foreground"
          data-slot="json-input-description"
        >
          {description}
        </p>
      ) : null}
      <Textarea
        id={inputId}
        data-slot="json-input-control"
        value={currentValue}
        onChange={(event) => setValue(event.currentTarget.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        readOnly={readOnly}
        required={required}
        autoComplete="off"
        spellCheck={false}
        rows={autosize ? undefined : minRows}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(
          "min-h-0 font-mono",
          autosize ? "field-sizing-content" : "field-sizing-fixed",
          sizeClasses[size],
          radiusClasses[radius],
          className,
        )}
        style={rowStyle}
        {...props}
      />
      {typeof shownError !== "boolean" && shownError ? (
        <div
          id={errorId}
          role="alert"
          data-slot="json-input-error"
          className="text-sm text-destructive"
        >
          {shownError}
        </div>
      ) : null}
    </div>
  )
}

export { JsonInput }
export type { JsonInputProps, JsonInputRadius, JsonInputSize }
