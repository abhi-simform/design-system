import * as React from "react"
import { PipetteIcon } from "lucide-react"
import { cn } from "cn"

import {
  ColorPicker,
  convertHsvaTo,
  isColorValid,
  parseColor,
} from "@/components/ui/color-picker"
import type { ColorFormat, ColorPickerSize } from "@/components/ui/color-picker"
import { ColorSwatch } from "@/components/ui/color-swatch"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { useEyeDropper } from "@/hooks/use-eye-dropper"

interface ColorInputProps extends Omit<
  React.ComponentProps<"input">,
  "size" | "onChange" | "value" | "defaultValue"
> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onChangeEnd?: (value: string) => void
  format?: ColorFormat
  disallowInput?: boolean
  fixOnBlur?: boolean
  withPreview?: boolean
  withEyeDropper?: boolean
  eyeDropperIcon?: React.ReactNode
  closeOnColorSwatchClick?: boolean
  withPicker?: boolean
  swatches?: string[]
  swatchesPerRow?: number
  size?: ColorPickerSize
  fullWidth?: boolean
  popoverContentProps?: Omit<
    React.ComponentProps<typeof PopoverContent>,
    "anchor"
  >
}

function ColorInput({
  className,
  value,
  defaultValue,
  onChange,
  onChangeEnd,
  format = "hex",
  disallowInput = false,
  fixOnBlur = true,
  withPreview = true,
  withEyeDropper = true,
  eyeDropperIcon,
  closeOnColorSwatchClick = false,
  withPicker = true,
  swatches,
  swatchesPerRow,
  size = "sm",
  fullWidth,
  disabled,
  readOnly,
  onFocus,
  onBlur,
  onClick,
  popoverContentProps,
  ...props
}: ColorInputProps) {
  const anchorRef = React.useRef<HTMLDivElement>(null)

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const currentValue = isControlled ? (value ?? "") : internalValue

  const setValue = (next: string) => {
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  const lastValidValueRef = React.useRef(currentValue)
  React.useEffect(() => {
    if (isColorValid(currentValue) || currentValue.trim() === "") {
      lastValidValueRef.current = currentValue
    }
  }, [currentValue])

  // Re-express the current value in the new format, mirroring the source
  // behavior of converting on format change rather than on every render.
  const previousFormatRef = React.useRef(format)
  React.useEffect(() => {
    if (previousFormatRef.current === format) return
    previousFormatRef.current = format
    if (isColorValid(currentValue)) {
      setValue(convertHsvaTo(format, parseColor(currentValue)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format])

  const [open, setOpen] = React.useState(false)
  const { supported: eyeDropperSupported, open: openEyeDropper } =
    useEyeDropper()

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(event)
    setOpen(true)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (fixOnBlur) setValue(lastValidValueRef.current)
    onBlur?.(event)
    setOpen(false)
  }

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    onClick?.(event)
    setOpen(true)
  }

  const hasSwatches = Array.isArray(swatches) && swatches.length > 0
  const popoverDisabled = !!readOnly || (!withPicker && !hasSwatches)
  const showEyeDropper =
    withEyeDropper && !disabled && !readOnly && eyeDropperSupported

  return (
    <Popover open={open && !popoverDisabled} onOpenChange={setOpen}>
      <InputGroup ref={anchorRef} data-slot="color-input" className={className}>
        {withPreview && (
          <InputGroupAddon align="inline-start">
            <ColorSwatch
              color={isColorValid(currentValue) ? currentValue : "#fff"}
              size={16}
            />
          </InputGroupAddon>
        )}

        <InputGroupInput
          autoComplete="off"
          spellCheck={false}
          disabled={disabled}
          readOnly={disallowInput || readOnly}
          className={cn(disallowInput && !disabled && "cursor-pointer")}
          value={currentValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
          onChange={(event) => {
            const next = event.currentTarget.value
            setValue(next)
            if (isColorValid(next)) {
              onChangeEnd?.(convertHsvaTo(format, parseColor(next)))
            }
          }}
          {...props}
        />

        {showEyeDropper && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="button"
              size="icon-xs"
              variant="ghost"
              aria-label="Pick color from screen"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                openEyeDropper()
                  .then((result) => {
                    if (!result?.sRGBHex) return
                    const next = convertHsvaTo(
                      format,
                      parseColor(result.sRGBHex),
                    )
                    setValue(next)
                    onChangeEnd?.(next)
                  })
                  .catch(() => {})
              }}
            >
              {eyeDropperIcon ?? <PipetteIcon />}
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>

      <PopoverContent
        align="start"
        sideOffset={5}
        initialFocus={false}
        finalFocus={false}
        {...popoverContentProps}
        anchor={anchorRef}
        onMouseDown={(event) => {
          event.preventDefault()
          popoverContentProps?.onMouseDown?.(event)
        }}
        className={cn(
          "w-auto",
          fullWidth && "w-(--anchor-width)",
          popoverContentProps?.className,
        )}
      >
        <ColorPicker
          value={currentValue}
          onChange={setValue}
          onChangeEnd={onChangeEnd}
          format={format}
          withPicker={withPicker}
          swatches={swatches}
          swatchesPerRow={swatchesPerRow}
          size={size}
          fullWidth={fullWidth}
          onColorSwatchClick={() => {
            if (closeOnColorSwatchClick) setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export { ColorInput }
export type { ColorInputProps }
