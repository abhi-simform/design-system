import * as React from "react"
import { cn } from "cn"

interface PillsInputContextValue {
  fieldRef: React.RefObject<HTMLInputElement | null>
  disabled: boolean | undefined
}

const PillsInputContext = React.createContext<PillsInputContextValue | null>(
  null,
)

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.RefObject<T | null>).current = node
    }
  }
}

interface PillsInputProps extends React.ComponentProps<"div"> {
  /** Adds disabled attribute, applies disabled styles. */
  disabled?: boolean
}

function PillsInput({
  className,
  disabled,
  onMouseDown,
  onClick,
  ...props
}: PillsInputProps) {
  const fieldRef = React.useRef<HTMLInputElement>(null)

  return (
    <PillsInputContext.Provider value={{ fieldRef, disabled }}>
      <div
        data-slot="pills-input"
        data-disabled={disabled ? "" : undefined}
        onMouseDown={(event) => {
          event.preventDefault()
          onMouseDown?.(event)
          fieldRef.current?.focus()
        }}
        onClick={(event) => {
          event.preventDefault()
          const fieldset = event.currentTarget.closest("fieldset")
          if (!fieldset?.disabled) {
            fieldRef.current?.focus()
            onClick?.(event)
          }
        }}
        className={cn(
          "flex min-h-8 w-full flex-wrap items-center gap-1.5 rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-base transition-colors outline-none focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-disabled:cursor-not-allowed data-disabled:bg-input/50 data-disabled:opacity-50 dark:data-disabled:bg-input/80",
          className,
        )}
        {...props}
      />
    </PillsInputContext.Provider>
  )
}

const pillsInputFieldTypeClasses = {
  visible: "",
  hidden: "absolute size-px overflow-hidden p-0 opacity-0",
  auto: "absolute size-px overflow-hidden p-0 opacity-0 focus:static focus:h-5.5 focus:w-auto focus:opacity-100",
} satisfies Record<"visible" | "hidden" | "auto", string>

interface PillsInputFieldProps extends Omit<
  React.ComponentProps<"input">,
  "type" | "size"
> {
  /**
   * Controls input styles when focused. If "auto" the input is hidden when
   * not focused. If "visible" the input always remains visible.
   * @default "visible"
   */
  type?: "auto" | "visible" | "hidden"
  /** If set, cursor is changed to pointer. */
  pointer?: boolean
}

function PillsInputField({
  className,
  type = "visible",
  disabled,
  pointer,
  onMouseDown,
  ref,
  ...props
}: PillsInputFieldProps) {
  const ctx = React.useContext(PillsInputContext)
  const resolvedDisabled = disabled || ctx?.disabled

  return (
    <input
      ref={mergeRefs(ref, ctx?.fieldRef)}
      type="text"
      data-slot="pills-input-field"
      data-type={type}
      disabled={resolvedDisabled}
      className={cn(
        "h-5.5 min-w-25 flex-1 border-0 bg-transparent p-0 text-inherit outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
        pillsInputFieldTypeClasses[type],
        pointer && "cursor-pointer",
        className,
      )}
      onMouseDown={(event) => {
        if (!pointer) event.stopPropagation()
        onMouseDown?.(event)
      }}
      {...props}
    />
  )
}

const PillsInputWithField = Object.assign(PillsInput, {
  Field: PillsInputField,
})

export { PillsInputWithField as PillsInput, PillsInputField }
export type { PillsInputProps, PillsInputFieldProps }
