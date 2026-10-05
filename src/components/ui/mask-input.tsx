import * as React from "react"
import { cn } from "cn"

import { Input } from "@/components/ui/input"
import { useMask } from "@/hooks/use-mask"
import type { UseMaskOptions } from "@/hooks/use-mask"

type MaskInputSize = "xs" | "sm" | "md" | "lg" | "xl"

interface MaskInputProps extends Omit<React.ComponentProps<"input">, "size"> {
  /** Mask pattern string or array of string literals and RegExp objects. */
  mask: UseMaskOptions["mask"]
  /** Override or extend the default token map (`9` digit, `a` letter, `A` uppercase, `*` alphanumeric, `#` digit or sign). */
  tokens?: UseMaskOptions["tokens"]
  /** Called before masking on each keystroke, can return overrides for `mask`, `tokens`, `slotChar` and `separate`. */
  modify?: UseMaskOptions["modify"]
  /** When true, raw and display values are decoupled. */
  separate?: boolean
  /** Character displayed in unfilled slots. @default "_" */
  slotChar?: string | null
  /** Show the mask pattern even when the field is empty and unfocused. */
  alwaysShowMask?: boolean
  /** Show the mask placeholder on focus. @default true */
  showMaskOnFocus?: boolean
  /** Transform each character before validation and insertion. */
  transform?: (char: string) => string
  /** Clear the value on blur when the mask is incomplete. @default false */
  autoClear?: boolean
  /** Called on every change with the raw and masked values. */
  onChangeRaw?: (rawValue: string, maskedValue: string) => void
  /** Called when all required mask slots are filled. */
  onComplete?: (maskedValue: string, rawValue: string) => void
  /** Escape hatch for advanced cursor and value manipulation. */
  beforeMaskedStateChange?: UseMaskOptions["beforeMaskedStateChange"]
  /** Receives a function that clears the input. */
  resetRef?: React.RefObject<(() => void) | null>
  /** Height and text size. @default "sm" */
  size?: MaskInputSize
}

const sizeClasses: Record<MaskInputSize, string> = {
  xs: "h-6 text-xs md:text-xs",
  sm: "",
  md: "h-9 text-base md:text-base",
  lg: "h-10 text-base md:text-base",
  xl: "h-12 text-lg md:text-lg",
}

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.RefObject<T | null>).current = node
    }
  }
}

function MaskInput({
  className,
  size = "sm",
  mask,
  tokens,
  modify,
  separate,
  slotChar,
  alwaysShowMask,
  showMaskOnFocus,
  transform,
  autoClear,
  onChangeRaw,
  onComplete,
  beforeMaskedStateChange,
  resetRef,
  ref,
  ...props
}: MaskInputProps) {
  const { ref: maskRef, reset } = useMask({
    mask,
    tokens,
    modify,
    separate,
    slotChar,
    alwaysShowMask,
    showMaskOnFocus,
    transform,
    autoClear,
    invalid: props["aria-invalid"] === true || props["aria-invalid"] === "true",
    onChangeRaw,
    onComplete,
    beforeMaskedStateChange,
  })

  React.useEffect(() => {
    if (resetRef) resetRef.current = reset
  }, [resetRef, reset])

  return (
    <Input
      ref={mergeRefs(ref, maskRef)}
      data-slot="mask-input"
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  )
}

export { MaskInput }
export type { MaskInputProps, MaskInputSize }
