"use client"

import * as React from "react"

import { cn } from "cn"

type FileButtonProps<Multiple extends boolean = false> = {
  ref?: React.Ref<HTMLInputElement>
  onChange: (payload: Multiple extends true ? File[] : File | null) => void
  children: (props: { onClick: () => void }) => React.ReactNode
  multiple?: Multiple
  accept?: string
  name?: string
  form?: string
  resetRef?: React.Ref<() => void>
  disabled?: boolean
  capture?: boolean | "user" | "environment"
  inputProps?: React.ComponentProps<"input">
}

// A pure write with no read of the ref, which is the safe half of React's
// "don't read/write refs during render" rule — safe to call during render.
function setRef<T>(ref: React.Ref<T> | null | undefined, value: T) {
  if (typeof ref === "function") {
    ref(value)
  } else if (ref !== null && ref !== undefined) {
    ;(ref as React.RefObject<T | null>).current = value
  }
}

function FileButton<Multiple extends boolean = false>({
  ref,
  onChange,
  children,
  multiple,
  accept,
  name,
  form,
  resetRef,
  disabled,
  capture,
  inputProps,
}: FileButtonProps<Multiple>) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const mergedRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      setRef(ref, node)
      setRef(inputRef, node)
    },
    [ref],
  )

  const onClick = () => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files

    if (files === null) {
      onChange(
        (multiple ? [] : null) as Multiple extends true ? File[] : File | null,
      )
      return
    }

    onChange(
      (multiple
        ? Array.from(files)
        : (files[0] ?? null)) as Multiple extends true ? File[] : File | null,
    )
  }

  const reset = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }, [])

  React.useEffect(() => {
    setRef(resetRef, reset)
  }, [resetRef, reset])

  return (
    <>
      <input
        data-slot="file-button"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        ref={mergedRef}
        name={name}
        form={form}
        capture={capture}
        {...inputProps}
        className={cn("hidden", inputProps?.className)}
      />
      {
        // onClick only reads inputRef.current inside its own body, when the
        // consumer's rendered element is actually clicked later — never
        // during this render — but the linter can't trace a ref read
        // through a render-prop boundary like `children` to confirm that.
        // eslint-disable-next-line react-hooks/refs
        children({ onClick })
      }
    </>
  )
}

export { FileButton }
export type { FileButtonProps }
