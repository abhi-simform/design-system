import * as React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "cn"

import { ColorSwatch } from "@/components/ui/color-swatch"
import { HueSlider } from "@/components/ui/hue-slider"
import { AlphaSlider } from "@/components/ui/alpha-slider"

type ColorFormat = "hex" | "hexa" | "rgb" | "rgba" | "hsl" | "hsla"

interface HsvaColor {
  h: number
  s: number
  v: number
  a: number
}

interface RgbaColor {
  r: number
  g: number
  b: number
  a: number
}

interface HslaColor {
  h: number
  s: number
  l: number
  a: number
}

function round(value: number, digits = 0) {
  const base = 10 ** digits
  return Math.round(base * value) / base
}

function hslaToHsva({ h, s, l, a }: HslaColor): HsvaColor {
  const ss = s * ((l < 50 ? l : 100 - l) / 100)
  return {
    h,
    s: ss > 0 ? ((2 * ss) / (l + ss)) * 100 : 0,
    v: l + ss,
    a,
  }
}

const ANGLE_UNITS: Record<string, number> = {
  grad: 360 / 400,
  turn: 360,
  rad: 360 / (Math.PI * 2),
}

function parseHue(value: string, unit = "deg") {
  return Number(value) * (ANGLE_UNITS[unit] || 1)
}

const HSL_REGEXP =
  /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i

function parseHsla(color: string): HsvaColor {
  const match = HSL_REGEXP.exec(color)
  if (!match) return { h: 0, s: 0, v: 0, a: 1 }

  return hslaToHsva({
    h: parseHue(match[1], match[2]),
    s: Number(match[3]),
    l: Number(match[4]),
    a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1),
  })
}

function rgbaToHsva({ r, g, b, a }: RgbaColor): HsvaColor {
  const max = Math.max(r, g, b)
  const delta = max - Math.min(r, g, b)

  const hh = delta
    ? max === r
      ? (g - b) / delta
      : max === g
        ? 2 + (b - r) / delta
        : 4 + (r - g) / delta
    : 0

  return {
    h: round(60 * (hh < 0 ? hh + 6 : hh), 3),
    s: round(max ? (delta / max) * 100 : 0, 3),
    v: round((max / 255) * 100, 3),
    a,
  }
}

function parseHex(color: string): HsvaColor {
  const hex = color[0] === "#" ? color.slice(1) : color

  if (hex.length === 3) {
    return rgbaToHsva({
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
      a: 1,
    })
  }

  return rgbaToHsva({
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
    a: 1,
  })
}

function parseHexa(color: string): HsvaColor {
  const hex = color[0] === "#" ? color.slice(1) : color
  const roundA = (a: string) => round(parseInt(a, 16) / 255, 3)

  if (hex.length === 4) {
    return { ...parseHex(hex.slice(0, 3)), a: roundA(hex[3] + hex[3]) }
  }

  return { ...parseHex(hex.slice(0, 6)), a: roundA(hex.slice(6, 8)) }
}

const RGB_REGEXP =
  /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i

function parseRgba(color: string): HsvaColor {
  const match = RGB_REGEXP.exec(color)
  if (!match) return { h: 0, s: 0, v: 0, a: 1 }

  return rgbaToHsva({
    r: Number(match[1]) / (match[2] ? 100 / 255 : 1),
    g: Number(match[3]) / (match[4] ? 100 / 255 : 1),
    b: Number(match[5]) / (match[6] ? 100 / 255 : 1),
    a: match[7] === undefined ? 1 : Number(match[7]) / (match[8] ? 100 : 1),
  })
}

const VALIDATION_REGEXP: Record<ColorFormat, RegExp> = {
  hex: /^#?([0-9A-F]{3}){1,2}$/i,
  hexa: /^#?([0-9A-F]{4}){1,2}$/i,
  rgb: /^rgb\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i,
  rgba: /^rgba\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i,
  hsl: /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/i,
  hsla: /^hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)$/i,
}

const PARSERS: Record<ColorFormat, (color: string) => HsvaColor> = {
  hex: parseHex,
  hexa: parseHexa,
  rgb: parseRgba,
  rgba: parseRgba,
  hsl: parseHsla,
  hsla: parseHsla,
}

function isColorValid(color: string) {
  return Object.values(VALIDATION_REGEXP).some((regexp) => regexp.test(color))
}

function parseColor(color: string): HsvaColor {
  if (typeof color !== "string") return { h: 0, s: 0, v: 0, a: 1 }
  if (color === "transparent") return { h: 0, s: 0, v: 0, a: 0 }

  const trimmed = color.trim()

  for (const [format, regexp] of Object.entries(VALIDATION_REGEXP)) {
    if (regexp.test(trimmed)) {
      return PARSERS[format as ColorFormat](trimmed)
    }
  }

  return { h: 0, s: 0, v: 0, a: 1 }
}

function hsvaToRgbaObject({ h, s, v, a }: HsvaColor): RgbaColor {
  const _h = (h / 360) * 6
  const _s = s / 100
  const _v = v / 100

  const hh = Math.floor(_h)
  const l = _v * (1 - _s)
  const c = _v * (1 - (_h - hh) * _s)
  const d = _v * (1 - (1 - _h + hh) * _s)
  const module = hh % 6

  return {
    r: round([_v, c, l, l, d, _v][module] * 255),
    g: round([d, _v, _v, c, l, l][module] * 255),
    b: round([l, l, d, _v, _v, c][module] * 255),
    a: round(a, 2),
  }
}

function hsvaToRgba(color: HsvaColor, includeAlpha: boolean) {
  const { r, g, b, a } = hsvaToRgbaObject(color)
  return includeAlpha
    ? `rgba(${r}, ${g}, ${b}, ${round(a, 2)})`
    : `rgb(${r}, ${g}, ${b})`
}

function hsvaToHsl({ h, s, v, a }: HsvaColor, includeAlpha: boolean) {
  const hh = ((200 - s) * v) / 100
  const result = {
    h: Math.round(h),
    s: Math.round(
      hh > 0 && hh < 200
        ? ((s * v) / 100 / (hh <= 100 ? hh : 200 - hh)) * 100
        : 0,
    ),
    l: Math.round(hh / 2),
  }

  return includeAlpha
    ? `hsla(${result.h}, ${result.s}%, ${result.l}%, ${round(a, 2)})`
    : `hsl(${result.h}, ${result.s}%, ${result.l}%)`
}

function formatHexPart(value: number) {
  const hex = value.toString(16)
  return hex.length < 2 ? `0${hex}` : hex
}

function hsvaToHex(color: HsvaColor) {
  const { r, g, b } = hsvaToRgbaObject(color)
  return `#${formatHexPart(r)}${formatHexPart(g)}${formatHexPart(b)}`
}

function hsvaToHexa(color: HsvaColor) {
  return `${hsvaToHex(color)}${formatHexPart(Math.round(color.a * 255))}`
}

const CONVERTERS: Record<ColorFormat, (color: HsvaColor) => string> = {
  hex: hsvaToHex,
  hexa: hsvaToHexa,
  rgb: (color) => hsvaToRgba(color, false),
  rgba: (color) => hsvaToRgba(color, true),
  hsl: (color) => hsvaToHsl(color, false),
  hsla: (color) => hsvaToHsl(color, true),
}

function convertHsvaTo(format: ColorFormat, color: HsvaColor) {
  return color ? (CONVERTERS[format] ?? CONVERTERS.hex)(color) : "#000000"
}

// WCAG-style relative luminance, used only to pick a legible check-mark color
// against an arbitrary swatch background.
function luminance(color: string) {
  const { r, g, b } = hsvaToRgbaObject(parseColor(color))
  const channel = (value: number) => {
    const c = value / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

type ColorPickerSize = "xs" | "sm" | "md" | "lg" | "xl"

const rem = (px: number) => `${px / 16}rem`

const SIZES: Record<
  ColorPickerSize,
  { width: number; preview: number; thumb: number; saturation: number }
> = {
  xs: { width: 180, preview: 26, thumb: 8, saturation: 100 },
  sm: { width: 200, preview: 34, thumb: 12, saturation: 110 },
  md: { width: 240, preview: 42, thumb: 16, saturation: 120 },
  lg: { width: 280, preview: 50, thumb: 20, saturation: 140 },
  xl: { width: 320, preview: 54, thumb: 22, saturation: 160 },
}

interface SaturationPosition {
  x: number
  y: number
}

function clampPosition(position: SaturationPosition): SaturationPosition {
  return {
    x: Math.min(Math.max(position.x, 0), 1),
    y: Math.min(Math.max(position.y, 0), 1),
  }
}

interface SaturationProps {
  value: HsvaColor
  onChange: (color: Partial<HsvaColor>) => void
  onChangeEnd: (color: Partial<HsvaColor>) => void
  onScrubStart?: () => void
  onScrubEnd?: () => void
  saturationLabel?: string
  color: string
}

function Saturation({
  value,
  onChange,
  onChangeEnd,
  onScrubStart,
  onScrubEnd,
  saturationLabel,
  color,
}: SaturationProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  // Always driven by the parent's `parsed` HSVA state (see ColorPicker below),
  // so position is derived rather than mirrored into local state.
  const position: SaturationPosition = {
    x: value.s / 100,
    y: 1 - value.v / 100,
  }

  const latestRef = React.useRef({
    onChange,
    onChangeEnd,
    onScrubStart,
    onScrubEnd,
  })
  React.useEffect(() => {
    latestRef.current = { onChange, onChangeEnd, onScrubStart, onScrubEnd }
  })

  React.useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const toColor = (pos: SaturationPosition) => ({
      s: Math.round(pos.x * 100),
      v: Math.round((1 - pos.y) * 100),
    })

    const commit = (clientX: number, clientY: number, done: boolean) => {
      const rect = node.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const next = clampPosition({
        x: (clientX - rect.left) / rect.width,
        y: (clientY - rect.top) / rect.height,
      })
      latestRef.current.onChange(toColor(next))
      if (done) latestRef.current.onChangeEnd(toColor(next))
    }

    const handleMouseMove = (event: MouseEvent) =>
      commit(event.clientX, event.clientY, false)
    const handleMouseUp = (event: MouseEvent) => {
      commit(event.clientX, event.clientY, true)
      detach()
    }
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault()
      const touch = event.touches[0]
      if (touch) commit(touch.clientX, touch.clientY, false)
    }
    const handleTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      if (touch) commit(touch.clientX, touch.clientY, true)
      detach()
    }

    function attach() {
      latestRef.current.onScrubStart?.()
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      })
      document.addEventListener("touchend", handleTouchEnd)
    }

    function detach() {
      latestRef.current.onScrubEnd?.()
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }

    const handleMouseDown = (event: MouseEvent) => {
      attach()
      commit(event.clientX, event.clientY, false)
    }
    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault()
      attach()
      const touch = event.touches[0]
      if (touch) commit(touch.clientX, touch.clientY, false)
    }

    node.addEventListener("mousedown", handleMouseDown)
    node.addEventListener("touchstart", handleTouchStart, { passive: false })

    return () => {
      node.removeEventListener("mousedown", handleMouseDown)
      node.removeEventListener("touchstart", handleTouchStart)
      detach()
    }
  }, [])

  const handleArrow = (next: SaturationPosition) => {
    const clamped = clampPosition(next)
    const color = {
      s: Math.round(clamped.x * 100),
      v: Math.round((1 - clamped.y) * 100),
    }
    onChange(color)
    onChangeEnd(color)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault()
        handleArrow({ x: position.x, y: position.y - 0.05 })
        break
      case "ArrowDown":
        event.preventDefault()
        handleArrow({ x: position.x, y: position.y + 0.05 })
        break
      case "ArrowRight":
        event.preventDefault()
        handleArrow({ x: position.x + 0.05, y: position.y })
        break
      case "ArrowLeft":
        event.preventDefault()
        handleArrow({ x: position.x - 0.05, y: position.y })
        break
    }
  }

  return (
    <div
      ref={rootRef}
      data-slot="color-picker-saturation"
      role="slider"
      aria-label={saturationLabel}
      aria-valuenow={position.x}
      aria-valuetext={convertHsvaTo("rgba", value)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative touch-none rounded-md outline-none select-none",
        "m-(--cp-thumb-half) h-(--cp-saturation-height)",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-(--cp-thumb-half) rounded-md"
        style={{ backgroundColor: `hsl(${value.h}, 100%, 50%)` }}
      />
      <div
        aria-hidden="true"
        className="absolute -inset-(--cp-thumb-half) rounded-md bg-gradient-to-r from-white to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -inset-(--cp-thumb-half) rounded-md bg-gradient-to-t from-black to-transparent"
      />
      <div
        data-slot="color-picker-saturation-thumb"
        aria-hidden="true"
        className="absolute size-(--cp-thumb-size) overflow-hidden rounded-full border-2 border-white shadow-[0_0_1px_rgba(0,0,0,0.6)]"
        style={{
          left: `calc(${position.x * 100}% - var(--cp-thumb-half))`,
          top: `calc(${position.y * 100}% - var(--cp-thumb-half))`,
          backgroundColor: color,
        }}
      />
    </div>
  )
}

interface ColorPickerProps extends Omit<
  React.ComponentProps<"div">,
  "onChange" | "defaultValue"
> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onChangeEnd?: (value: string) => void
  format?: ColorFormat
  withPicker?: boolean
  swatches?: string[]
  swatchesPerRow?: number
  size?: ColorPickerSize
  fullWidth?: boolean
  saturationLabel?: string
  hueLabel?: string
  alphaLabel?: string
  onColorSwatchClick?: (color: string) => void
  name?: string
  hiddenInputProps?: React.ComponentProps<"input">
}

function ColorPicker({
  className,
  style,
  format = "hex",
  value,
  defaultValue,
  onChange,
  onChangeEnd,
  withPicker = true,
  swatches,
  swatchesPerRow = 7,
  size = "md",
  fullWidth = false,
  saturationLabel,
  hueLabel,
  alphaLabel,
  onColorSwatchClick,
  name,
  hiddenInputProps,
  ...props
}: ColorPickerProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? "#FFFFFF",
  )
  const currentValue = isControlled ? value : internalValue

  const isScrubbingRef = React.useRef(false)
  const scrubTimeoutRef = React.useRef<number>(0)

  const [parsed, setParsed] = React.useState<HsvaColor>(() =>
    parseColor(currentValue),
  )
  const previousValueRef = React.useRef(currentValue)

  React.useEffect(() => {
    if (
      typeof value === "string" &&
      value !== previousValueRef.current &&
      isColorValid(value) &&
      !isScrubbingRef.current
    ) {
      setParsed(parseColor(value))
    }
    previousValueRef.current = value
  }, [value])

  const setValue = (next: string) => {
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  const startScrubbing = () => {
    window.clearTimeout(scrubTimeoutRef.current)
    isScrubbingRef.current = true
  }

  const stopScrubbing = () => {
    window.clearTimeout(scrubTimeoutRef.current)
    scrubTimeoutRef.current = window.setTimeout(() => {
      isScrubbingRef.current = false
    }, 200)
  }

  const handleChange = (color: Partial<HsvaColor>) => {
    const next = { ...parsed, ...color }
    setParsed(next)
    setValue(convertHsvaTo(format, next))
  }

  const withAlpha = format === "hexa" || format === "rgba" || format === "hsla"
  const dimensions = SIZES[size]

  return (
    <div
      data-slot="color-picker"
      className={cn("p-px", fullWidth ? "w-full" : "w-(--cp-width)", className)}
      style={
        {
          "--cp-width": rem(dimensions.width),
          "--cp-preview-size": rem(dimensions.preview),
          "--cp-thumb-size": rem(dimensions.thumb),
          "--cp-thumb-half": `calc(${rem(dimensions.thumb)} / 2)`,
          "--cp-saturation-height": rem(dimensions.saturation),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {name && (
        <input
          type="hidden"
          name={name}
          value={currentValue}
          {...hiddenInputProps}
        />
      )}

      {withPicker && (
        <>
          <Saturation
            value={parsed}
            onChange={handleChange}
            onChangeEnd={({ s, v }) =>
              onChangeEnd?.(convertHsvaTo(format, { ...parsed, s: s!, v: v! }))
            }
            color={currentValue}
            saturationLabel={saturationLabel}
            onScrubStart={startScrubbing}
            onScrubEnd={stopScrubbing}
          />

          <div className="flex pt-1.5">
            <div
              className={cn(
                "flex flex-1 flex-col gap-1.5",
                withAlpha && "me-2",
              )}
            >
              <HueSlider
                size={size}
                value={parsed.h}
                onValueChange={(h) => handleChange({ h })}
                onValueCommitted={(h) =>
                  onChangeEnd?.(convertHsvaTo(format, { ...parsed, h }))
                }
                aria-label={hueLabel}
              />

              {withAlpha && (
                <AlphaSlider
                  size={size}
                  value={parsed.a}
                  color={convertHsvaTo("hex", parsed)}
                  onValueChange={(a) => handleChange({ a })}
                  onValueCommitted={(a) =>
                    onChangeEnd?.(convertHsvaTo(format, { ...parsed, a }))
                  }
                  aria-label={alphaLabel}
                />
              )}
            </div>

            {withAlpha && (
              <ColorSwatch
                color={currentValue}
                radius="sm"
                size="var(--cp-preview-size)"
              />
            )}
          </div>
        </>
      )}

      {swatches && swatches.length > 0 && (
        <div
          data-slot="color-picker-swatches"
          className="-mx-0.5 mt-1.5 flex flex-wrap only:mt-0"
          style={
            {
              "--cp-swatch-size": `${100 / swatchesPerRow}%`,
            } as React.CSSProperties
          }
        >
          {swatches.map((swatchColor, index) => (
            <button
              key={index}
              type="button"
              data-slot="color-picker-swatch"
              aria-label={swatchColor}
              className="m-0.5 box-border basis-(--cp-swatch-size) cursor-pointer p-0"
              style={{ paddingBottom: "calc(var(--cp-swatch-size) - 4px)" }}
              onClick={() => {
                const nextParsed = parseColor(swatchColor)
                setValue(swatchColor)
                if (!isControlled) setParsed(nextParsed)
                const converted = convertHsvaTo(format, nextParsed)
                onColorSwatchClick?.(converted)
                onChangeEnd?.(converted)
              }}
            >
              <ColorSwatch color={swatchColor} radius="sm" size="100%">
                {currentValue === swatchColor && (
                  <CheckIcon
                    className="size-[35%]"
                    color={luminance(swatchColor) < 0.5 ? "white" : "black"}
                  />
                )}
              </ColorSwatch>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { ColorPicker, parseColor, isColorValid, convertHsvaTo }
export type { ColorPickerProps, ColorPickerSize, ColorFormat, HsvaColor }
