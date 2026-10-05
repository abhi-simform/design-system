"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "cn"

import { CloseButton } from "@/components/ui/close-button"
import { FileButton } from "@/components/ui/file-button"

type FileInputSize = "xs" | "sm" | "md" | "lg" | "xl"
type FileInputClearSectionMode = "both" | "rightSection" | "clear"
type FileInputValue<Multiple extends boolean> = Multiple extends true
  ? File[]
  : File | null

const sizeClasses: Record<
  FileInputSize,
  {
    root: string
    section: string
    start: string
    end: string
    end2: string
    text: string
  }
> = {
  xs: {
    root: "min-h-7 text-xs",
    section: "w-7",
    start: "ps-7",
    end: "pe-7",
    end2: "pe-14",
    text: "py-1",
  },
  sm: {
    root: "min-h-8 text-sm",
    section: "w-8",
    start: "ps-8",
    end: "pe-8",
    end2: "pe-16",
    text: "py-1.5",
  },
  md: {
    root: "min-h-9 text-sm",
    section: "w-9",
    start: "ps-9",
    end: "pe-9",
    end2: "pe-18",
    text: "py-2",
  },
  lg: {
    root: "min-h-10 text-base",
    section: "w-10",
    start: "ps-10",
    end: "pe-10",
    end2: "pe-20",
    text: "py-2.5",
  },
  xl: {
    root: "min-h-11 text-lg",
    section: "w-11",
    start: "ps-11",
    end: "pe-11",
    end2: "pe-22",
    text: "py-3",
  },
}

const pointerEventsClasses = {
  none: "pointer-events-none",
  all: "pointer-events-auto",
} satisfies Record<"none" | "all", string>

function DefaultValue({ value }: { value: null | File | File[] }) {
  return (
    <div className="truncate">
      {Array.isArray(value)
        ? value.map((file) => file.name).join(", ")
        : value?.name}
    </div>
  )
}

type FileInputProps<Multiple extends boolean = false> = Omit<
  React.ComponentProps<"button">,
  "value" | "defaultValue" | "onChange" | "placeholder" | "capture"
> & {
  /** Called when value changes. */
  onChange?: (payload: FileInputValue<Multiple>) => void
  /** Controlled component value. */
  value?: FileInputValue<Multiple>
  /** Uncontrolled component default value. */
  defaultValue?: FileInputValue<Multiple>
  /** If set, user can pick more than one file. @default false */
  multiple?: Multiple
  /** File input accept attribute, for example "image/png,image/jpeg". */
  accept?: string
  /** Input name attribute. */
  name?: string
  /** Input form attribute. */
  form?: string
  /** Value renderer. By default, displays file names. */
  valueComponent?: React.ComponentType<{ value: null | File | File[] }>
  /** If set, the clear button is displayed in the right section. @default false */
  clearable?: boolean
  /** Determines how the clear button and rightSection are rendered. @default "both" */
  clearSectionMode?: FileInputClearSectionMode
  /** Props passed down to the clear button. */
  clearButtonProps?: React.ComponentProps<typeof CloseButton>
  /** If set, the input value cannot be changed. */
  readOnly?: boolean
  /** Which device should capture new media, as defined by the accept attribute. */
  capture?: boolean | "user" | "environment"
  /** Props passed down to the hidden input[type="file"]. */
  fileInputProps?: React.ComponentProps<"input">
  /** Input placeholder. */
  placeholder?: React.ReactNode
  /** Reference of the function that resets the native input when value becomes empty. */
  resetRef?: React.Ref<() => void>
  /** Controls input height and section width. @default "sm" */
  size?: FileInputSize
  /** Content rendered at the start of the input. */
  leftSection?: React.ReactNode
  /** Content rendered at the end of the input. */
  rightSection?: React.ReactNode
  /** Pointer events of the left section. @default "none" */
  leftSectionPointerEvents?: "none" | "all"
  /** Pointer events of the right section. @default "none" */
  rightSectionPointerEvents?: "none" | "all"
  /** Marks the input as invalid. */
  error?: boolean
  /** Root element className applied to the trigger button. */
  wrapperClassName?: string
}

function assignRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") {
    ref(value)
  } else if (ref) {
    ;(ref as React.RefObject<T>).current = value
  }
}

function FileInput<Multiple extends boolean = false>({
  className,
  wrapperClassName,
  onChange,
  value,
  defaultValue,
  multiple,
  accept,
  name,
  form,
  valueComponent: ValueComponent = DefaultValue,
  clearable = false,
  clearSectionMode = "both",
  clearButtonProps,
  readOnly,
  capture,
  fileInputProps,
  placeholder,
  resetRef: resetRefProp,
  size = "sm",
  leftSection,
  rightSection,
  leftSectionPointerEvents = "none",
  rightSectionPointerEvents = "none",
  error,
  disabled,
  ref,
  ...props
}: FileInputProps<Multiple>) {
  const resetRef = React.useRef<(() => void) | null>(null)
  const emptyValue = (multiple ? [] : null) as FileInputValue<Multiple>

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<
    FileInputValue<Multiple>
  >(defaultValue ?? emptyValue)
  const currentValue = isControlled ? value : internalValue

  const setValue = (next: FileInputValue<Multiple>) => {
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  const hasValue = Array.isArray(currentValue)
    ? currentValue.length !== 0
    : currentValue !== null

  React.useEffect(() => {
    if (
      (Array.isArray(currentValue) && currentValue.length === 0) ||
      currentValue === null
    ) {
      resetRef.current?.()
    }
  }, [currentValue])

  const mergedResetRef = React.useCallback(
    (reset: (() => void) | null) => {
      resetRef.current = reset
      assignRef(resetRefProp, reset)
    },
    [resetRefProp],
  )

  const showClear = clearable && hasValue && !readOnly
  const showRightSection =
    showClear && clearSectionMode === "clear" ? false : !!rightSection
  const showClearButton = showClear && clearSectionMode !== "rightSection"
  const hasEnd = showRightSection || showClearButton
  const config = sizeClasses[size]

  return (
    <FileButton
      onChange={(payload) =>
        setValue(payload as unknown as FileInputValue<Multiple>)
      }
      multiple={multiple}
      accept={accept}
      name={name}
      form={form}
      resetRef={mergedResetRef}
      disabled={disabled || readOnly}
      capture={capture}
      inputProps={fileInputProps}
    >
      {(fileButtonProps) => (
        <div
          data-slot="file-input"
          data-disabled={disabled ? "" : undefined}
          className={cn("relative w-full", wrapperClassName)}
        >
          {leftSection && (
            <div
              data-slot="file-input-left-section"
              className={cn(
                "absolute inset-y-0 start-0 z-10 flex items-center justify-center text-muted-foreground",
                config.section,
                pointerEventsClasses[leftSectionPointerEvents],
              )}
            >
              {leftSection}
            </div>
          )}
          <ButtonPrimitive
            type="button"
            disabled={disabled}
            aria-invalid={error || undefined}
            data-empty={!hasValue ? "" : undefined}
            {...props}
            ref={ref}
            onClick={(event) => {
              props.onClick?.(event)
              if (!event.defaultPrevented) fileButtonProps.onClick()
            }}
            className={cn(
              "flex w-full min-w-0 cursor-pointer items-center rounded-lg border border-input bg-transparent px-2.5 text-start transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
              config.root,
              config.text,
              leftSection && config.start,
              hasEnd &&
                (showRightSection && showClearButton
                  ? config.end2
                  : config.end),
              className,
            )}
          >
            {hasValue ? (
              <span className="min-w-0 flex-1">
                <ValueComponent value={currentValue} />
              </span>
            ) : (
              <span
                data-slot="file-input-placeholder"
                className="min-w-0 flex-1 truncate text-muted-foreground"
              >
                {placeholder}
              </span>
            )}
          </ButtonPrimitive>
          {hasEnd && (
            <div
              data-slot="file-input-right-section"
              className="absolute inset-y-0 end-0 z-10 flex items-center justify-center text-muted-foreground"
            >
              {showRightSection && (
                <div
                  className={cn(
                    "flex items-center justify-center",
                    config.section,
                    pointerEventsClasses[rightSectionPointerEvents],
                  )}
                >
                  {rightSection}
                </div>
              )}
              {showClearButton && (
                <div
                  className={cn(
                    "flex items-center justify-center",
                    config.section,
                  )}
                >
                  <CloseButton
                    aria-label="Clear"
                    size={size}
                    {...clearButtonProps}
                    onClick={(event) => {
                      clearButtonProps?.onClick?.(event)
                      setValue(emptyValue)
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </FileButton>
  )
}

export { FileInput }
export type { FileInputProps, FileInputSize, FileInputClearSectionMode }
