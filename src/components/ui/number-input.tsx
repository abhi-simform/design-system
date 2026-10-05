import * as React from "react"
import { cn } from "cn"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

type NumberInputNumericType = number | bigint
type NumberInputValue<T extends NumberInputNumericType = number> = T | string
type NumberInputSize = "xs" | "sm" | "md" | "lg" | "xl"
type NumberInputClampBehavior = "strict" | "blur" | "none"
type NumberInputGroupStyle = "thousand" | "lakh" | "wan" | "none"
type NumberInputChangeSource = "event" | "increment" | "decrement"

interface NumberInputHandlers {
  increment: () => void
  decrement: () => void
}

interface NumberInputValueDetails {
  /** Parsed number, `undefined` when the text is not a complete number. */
  floatValue: number | undefined
  /** Text exactly as displayed, including prefix, suffix and separators. */
  formattedValue: string
  /** Unformatted numeric string using `.` as decimal separator. */
  value: string
}

interface NumberInputProps<
  T extends NumberInputNumericType = number,
> extends Omit<
  React.ComponentProps<"input">,
  | "size"
  | "type"
  | "onChange"
  | "value"
  | "defaultValue"
  | "min"
  | "max"
  | "step"
  | "prefix"
> {
  /** Controlled value. `""` represents an empty input. */
  value?: NumberInputValue<T>
  /** Uncontrolled initial value. */
  defaultValue?: NumberInputValue<T>
  /** Called when the value changes. Emits a string while the text is not a complete number (`""`, `"-"`, `"5."`, `"1.50"`). */
  onChange?: (value: NumberInputValue<T>) => void
  /** Called with the parsed and formatted representations alongside every change. */
  onValueChange?: (
    values: NumberInputValueDetails,
    info: { source: NumberInputChangeSource },
  ) => void
  /** Keep leading zeros while typing (`007`). When `false` they are stripped as you type. @default true */
  allowLeadingZeros?: boolean
  /** Allow negative numbers. When `false` the decrement control stops at `0` unless `min` is set. @default true */
  allowNegative?: boolean
  /** Characters that, when typed, become the decimal separator. @default [".", ","] */
  allowedDecimalSeparators?: string[]
  /** Maximum number of digits after the decimal separator. */
  decimalScale?: number
  /** Character displayed as the decimal separator. @default "." */
  decimalSeparator?: string
  /** Pad the decimal part with zeros up to `decimalScale`. */
  fixedDecimalScale?: boolean
  /** Text rendered before the number. */
  prefix?: string
  /** Text rendered after the number. */
  suffix?: string
  /** Digit grouping style used with `thousandSeparator`. @default "thousand" */
  thousandsGroupStyle?: NumberInputGroupStyle
  /** `true` groups with `,`; a string uses that character. */
  thousandSeparator?: string | boolean
  /** Veto a prospective value. Returning `false` discards the keystroke. */
  isAllowed?: (values: NumberInputValueDetails) => boolean
  /** Native input type. @default "text" */
  type?: "text" | "tel" | "password"
  /** Minimum value. */
  min?: T
  /** Maximum value. */
  max?: T
  /** Amount added or removed by the controls and arrow keys. @default 1 */
  step?: T
  /** Hide the increment/decrement controls. */
  hideControls?: boolean
  /** `blur` clamps when the field loses focus, `strict` rejects out-of-range typing, `none` only limits stepping. @default "blur" */
  clampBehavior?: NumberInputClampBehavior
  /** Allow decimal values. @default true */
  allowDecimal?: boolean
  /** Ref exposing imperative `increment` / `decrement`. */
  handlersRef?: React.Ref<NumberInputHandlers | undefined>
  /** Value used when stepping an empty input (raised to `min` if lower). @default 0 */
  startValue?: T
  /** Milliseconds between steps while a control is held. Needs `stepHoldDelay`. May be a function of the step count. */
  stepHoldInterval?: number | ((stepCount: number) => number)
  /** Milliseconds to wait before repeating while a control is held. */
  stepHoldDelay?: number
  /** ArrowUp / ArrowDown step the value. @default true */
  withKeyboardEvents?: boolean
  /** Strip leading zeros on blur (`00100` becomes `100`). @default true */
  trimLeadingZeroesOnBlur?: boolean
  /** Select the whole text on focus. */
  selectAllOnFocus?: boolean
  /** Called when a decrement hits `min`. */
  onMinReached?: () => void
  /** Called when an increment hits `max`. */
  onMaxReached?: () => void
  /** Content rendered before the input. */
  leftSection?: React.ReactNode
  /** Content rendered after the input. Replaces the step controls. */
  rightSection?: React.ReactNode
  /** Height and text size. @default "sm" */
  size?: NumberInputSize
}

const leadingDecimalZeroPattern = /^(0\.0*|-0(\.0*)?)$/
const leadingZerosPattern = /^-?0\d+(\.\d+)?\.?$/
const trailingZerosPattern = /\.\d*0$/
const trailingDecimalSeparatorPattern = /^-?\d+\.$/

const groupClasses: Record<NumberInputSize, string> = {
  xs: "h-6",
  sm: "h-8",
  md: "h-9",
  lg: "h-10",
  xl: "h-12",
}

const inputClasses: Record<NumberInputSize, string> = {
  xs: "text-xs md:text-xs",
  sm: "",
  md: "text-base md:text-base",
  lg: "text-base md:text-base",
  xl: "text-lg md:text-lg",
}

function clamp(value: number, min?: number, max?: number) {
  let result = value
  if (min !== undefined && result < min) result = min
  if (max !== undefined && result > max) result = max
  return result
}

function clampBigInt(value: bigint, min?: bigint, max?: bigint) {
  if (min !== undefined && value < min) return min
  if (max !== undefined && value > max) return max
  return value
}

function isNumberString(value: unknown) {
  return (
    typeof value === "string" && value !== "" && !Number.isNaN(Number(value))
  )
}

function canStep(value: number | string) {
  if (typeof value === "number") return value < Number.MAX_SAFE_INTEGER
  return (
    value === "" ||
    (isNumberString(value) && Number(value) < Number.MAX_SAFE_INTEGER)
  )
}

function isBigIntString(value: string, allowNegative: boolean) {
  if (!/^-?\d+$/.test(value)) return false
  return allowNegative || !value.startsWith("-")
}

function getDecimalPlaces(value: number | string) {
  const match = String(value).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)
  if (!match) return 0
  return Math.max(
    0,
    (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0),
  )
}

function toBigIntOrUndefined(value: unknown) {
  if (typeof value === "bigint") return value
  if (typeof value === "number" && Number.isInteger(value)) return BigInt(value)
  return undefined
}

function valueToRaw(value: number | bigint | string) {
  if (typeof value === "bigint") return value.toString()
  if (typeof value === "number") {
    if (Number.isNaN(value)) return ""
    return String(value).includes("e")
      ? value.toLocaleString("fullwide", {
          useGrouping: false,
          maximumFractionDigits: 20,
        })
      : String(value)
  }
  return value
}

function groupInteger(
  integer: string,
  separator: string,
  style: NumberInputGroupStyle,
) {
  if (!separator || style === "none") return integer
  if (style === "lakh") {
    return integer.replace(/(\d)(?=(\d\d)+\d$)/g, `$1${separator}`)
  }
  const size = style === "wan" ? 4 : 3
  return integer.replace(
    new RegExp(`\\B(?=(\\d{${size}})+(?!\\d))`, "g"),
    separator,
  )
}

function NumberInput<T extends NumberInputNumericType = number>({
  className,
  value,
  defaultValue,
  onChange,
  onValueChange,
  allowLeadingZeros = true,
  allowNegative = true,
  allowedDecimalSeparators = [".", ","],
  decimalScale,
  decimalSeparator = ".",
  fixedDecimalScale = false,
  prefix = "",
  suffix = "",
  thousandsGroupStyle = "thousand",
  thousandSeparator,
  isAllowed,
  type = "text",
  min,
  max,
  step,
  hideControls = false,
  clampBehavior = "blur",
  allowDecimal = true,
  handlersRef,
  startValue,
  stepHoldInterval,
  stepHoldDelay,
  withKeyboardEvents = true,
  trimLeadingZeroesOnBlur = true,
  selectAllOnFocus = false,
  onMinReached,
  onMaxReached,
  leftSection,
  rightSection,
  size = "sm",
  disabled,
  readOnly,
  onBlur,
  onFocus,
  onKeyDown,
  onPaste,
  ref,
  ...props
}: NumberInputProps<T>) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const isBigInt =
    typeof value === "bigint" ||
    typeof defaultValue === "bigint" ||
    typeof min === "bigint" ||
    typeof max === "bigint" ||
    typeof step === "bigint" ||
    typeof startValue === "bigint"

  const [inner, setInner] = React.useState<NumberInputValue<T>>(
    defaultValue ?? "",
  )
  const isControlled = value !== undefined
  const current = (isControlled ? value : inner) as number | bigint | string

  const setValue = (next: number | bigint | string) => {
    if (!isControlled) setInner(next as NumberInputValue<T>)
    onChange?.(next as NumberInputValue<T>)
  }

  const groupSeparator =
    thousandSeparator === true ? "," : thousandSeparator || ""
  const scale = isBigInt ? 0 : allowDecimal ? decimalScale : 0

  const minNumber = typeof min === "number" ? min : undefined
  const maxNumber = typeof max === "number" ? max : undefined
  const stepNumber = typeof step === "number" ? step : 1
  const startNumber = typeof startValue === "number" ? startValue : 0
  const minBig = toBigIntOrUndefined(min)
  const maxBig = toBigIntOrUndefined(max)
  const stepBig = toBigIntOrUndefined(step) ?? BigInt(1)
  const startBig = toBigIntOrUndefined(startValue) ?? BigInt(0)

  const raw = valueToRaw(current)

  const format = (rawValue: string) => {
    if (rawValue === "") return ""
    const negative = rawValue.startsWith("-")
    const body = negative ? rawValue.slice(1) : rawValue
    const dotIndex = body.indexOf(".")
    const integer = dotIndex === -1 ? body : body.slice(0, dotIndex)
    let decimals = dotIndex === -1 ? undefined : body.slice(dotIndex + 1)
    if (
      fixedDecimalScale &&
      scale !== undefined &&
      scale > 0 &&
      /\d/.test(body)
    ) {
      decimals = (decimals ?? "").padEnd(scale, "0")
    }
    return (
      (negative ? "-" : "") +
      prefix +
      groupInteger(integer, groupSeparator, thousandsGroupStyle) +
      (decimals !== undefined ? decimalSeparator + decimals : "") +
      suffix
    )
  }

  const decimalCandidates = new Set([
    decimalSeparator,
    ...allowedDecimalSeparators,
  ])
  if (groupSeparator && groupSeparator !== decimalSeparator) {
    decimalCandidates.delete(groupSeparator)
  }
  const decimalsAllowed = scale === undefined || scale > 0

  const parseText = (text: string) => {
    let body = text
    if (prefix) body = body.replace(prefix, "")
    if (suffix && body.endsWith(suffix)) body = body.slice(0, -suffix.length)
    const negative = allowNegative && body.trimStart().startsWith("-")
    let integer = ""
    let decimals = ""
    let hasDot = false
    for (const char of body) {
      if (/\d/.test(char)) {
        if (hasDot) decimals += char
        else integer += char
      } else if (!hasDot && decimalsAllowed && decimalCandidates.has(char)) {
        hasDot = true
      }
    }
    if (scale !== undefined) decimals = decimals.slice(0, scale)
    if (!allowLeadingZeros) integer = integer.replace(/^0+(?=\d)/, "")
    if (hasDot && integer === "") integer = "0"
    if (integer === "" && !hasDot) return negative ? "-" : ""
    return (negative ? "-" : "") + integer + (hasDot ? `.${decimals}` : "")
  }

  const toEmitted = (rawValue: string): number | bigint | string => {
    if (isBigInt) {
      if (
        isBigIntString(rawValue, allowNegative) &&
        !(allowLeadingZeros && leadingZerosPattern.test(rawValue))
      ) {
        return BigInt(rawValue)
      }
      return rawValue
    }
    const float = parseFloat(rawValue)
    const valid =
      rawValue !== "" &&
      Number.isFinite(float) &&
      float < Number.MAX_SAFE_INTEGER &&
      rawValue.replace(".", "").length < 14 &&
      !leadingDecimalZeroPattern.test(rawValue) &&
      !(allowLeadingZeros && leadingZerosPattern.test(rawValue)) &&
      !trailingZerosPattern.test(rawValue) &&
      !trailingDecimalSeparatorPattern.test(rawValue)
    return valid ? float : rawValue
  }

  const detailsFor = (rawValue: string): NumberInputValueDetails => {
    const float = parseFloat(rawValue)
    return {
      floatValue: Number.isNaN(float) ? undefined : float,
      formattedValue: format(rawValue),
      value: rawValue,
    }
  }

  const inRange = (rawValue: string) => {
    if (rawValue === "" || rawValue === "-") return true
    if (isBigInt) {
      if (!isBigIntString(rawValue, true)) return true
      const parsed = BigInt(rawValue)
      return (
        (minBig === undefined || parsed >= minBig) &&
        (maxBig === undefined || parsed <= maxBig)
      )
    }
    const float = parseFloat(rawValue)
    if (Number.isNaN(float)) return true
    return (
      (minNumber === undefined || float >= minNumber) &&
      (maxNumber === undefined || float <= maxNumber)
    )
  }

  const placeCaret = (position: number) => {
    window.setTimeout(() => {
      inputRef.current?.setSelectionRange(position, position)
    }, 0)
  }

  const applyText = (text: string, caret: number) => {
    const nextRaw = parseText(text)
    const details = detailsFor(nextRaw)
    if (isAllowed && !isAllowed(details)) return
    if (clampBehavior === "strict" && !inRange(nextRaw)) return

    const before = prefix
      ? text.slice(0, caret).replace(prefix, "")
      : text.slice(0, caret)
    let significant = 0
    let seenDot = false
    for (const char of before) {
      if (/\d/.test(char) || char === "-") significant += 1
      else if (!seenDot && decimalsAllowed && decimalCandidates.has(char)) {
        seenDot = true
        significant += 1
      }
    }
    const display = details.formattedValue
    const prefixStart = prefix ? display.indexOf(prefix) : -1
    let position = prefixStart === -1 ? 0 : prefixStart + prefix.length
    if (significant > 0) {
      let seen = 0
      for (let index = 0; index < display.length; index += 1) {
        if (
          prefixStart !== -1 &&
          index >= prefixStart &&
          index < prefixStart + prefix.length
        ) {
          continue
        }
        const char = display[index]
        if (/\d/.test(char) || char === "-" || char === decimalSeparator) {
          seen += 1
          if (seen === significant) {
            position = index + 1
            break
          }
        }
        position = index + 1
      }
    }
    placeCaret(Math.min(position, display.length - suffix.length))

    if (nextRaw === raw) return
    setValue(toEmitted(nextRaw))
    onValueChange?.(details, { source: "event" })
  }

  const emitStep = (
    next: number | bigint,
    source: "increment" | "decrement",
  ) => {
    const nextRaw = valueToRaw(next)
    setValue(next)
    onValueChange?.(detailsFor(nextRaw), { source })
    placeCaret(format(nextRaw).length - suffix.length)
  }

  const incrementRef = React.useRef<() => void>(() => {})
  const increment = () => {
    if (isBigInt) {
      if (
        typeof current !== "bigint" &&
        !(
          typeof current === "string" &&
          (current === "" || isBigIntString(current, allowNegative))
        )
      )
        return
      let next: bigint
      if (current === "") {
        next = clampBigInt(startBig, minBig, maxBig)
      } else {
        next = BigInt(current as bigint | string) + stepBig
        if (maxBig !== undefined && next > maxBig) {
          onMaxReached?.()
          next = maxBig
        }
      }
      emitStep(next, "increment")
      return
    }
    if (!canStep(current as number | string)) return
    let next: number
    const precision = Math.max(
      getDecimalPlaces(current as number | string),
      getDecimalPlaces(stepNumber),
    )
    const factor = 10 ** precision
    if (
      !isNumberString(current) &&
      (typeof current !== "number" || Number.isNaN(current))
    ) {
      next = clamp(startNumber, minNumber, maxNumber)
    } else {
      const incremented =
        (Math.round(Number(current) * factor) +
          Math.round(stepNumber * factor)) /
        factor
      if (maxNumber !== undefined && incremented > maxNumber) {
        onMaxReached?.()
        next = maxNumber
      } else {
        next = incremented
      }
    }
    emitStep(parseFloat(next.toFixed(precision)), "increment")
  }

  const decrementRef = React.useRef<() => void>(() => {})
  const decrement = () => {
    if (isBigInt) {
      if (
        typeof current !== "bigint" &&
        !(
          typeof current === "string" &&
          (current === "" || isBigIntString(current, allowNegative))
        )
      )
        return
      const floor =
        minBig !== undefined ? minBig : !allowNegative ? BigInt(0) : undefined
      let next: bigint
      if (current === "") {
        next = clampBigInt(startBig, floor, maxBig)
      } else {
        next = BigInt(current as bigint | string) - stepBig
        if (floor !== undefined && next < floor) {
          onMinReached?.()
          next = floor
        }
      }
      emitStep(next, "decrement")
      return
    }
    if (!canStep(current as number | string)) return
    const floor =
      minNumber !== undefined
        ? minNumber
        : !allowNegative
          ? 0
          : Number.MIN_SAFE_INTEGER
    const precision = Math.max(
      getDecimalPlaces(current as number | string),
      getDecimalPlaces(stepNumber),
    )
    const factor = 10 ** precision
    let next: number
    if (!isNumberString(current) && typeof current !== "number") {
      next = clamp(startNumber, floor, maxNumber)
    } else {
      const decremented =
        (Math.round(Number(current) * factor) -
          Math.round(stepNumber * factor)) /
        factor
      if (decremented < floor) {
        onMinReached?.()
        next = floor
      } else {
        next = decremented
      }
    }
    emitStep(parseFloat(next.toFixed(precision)), "decrement")
  }

  React.useLayoutEffect(() => {
    incrementRef.current = increment
    decrementRef.current = decrement
  })

  React.useImperativeHandle(
    handlersRef,
    () => ({
      increment: () => incrementRef.current(),
      decrement: () => decrementRef.current(),
    }),
    [],
  )

  const holdTimeoutRef = React.useRef<number | null>(null)
  const holdCountRef = React.useRef(0)
  const shouldRepeat =
    stepHoldDelay !== undefined && stepHoldInterval !== undefined

  const stopHold = () => {
    if (holdTimeoutRef.current !== null) {
      window.clearTimeout(holdTimeoutRef.current)
    }
    holdTimeoutRef.current = null
    holdCountRef.current = 0
  }

  React.useEffect(
    () => () => {
      if (holdTimeoutRef.current !== null) {
        window.clearTimeout(holdTimeoutRef.current)
      }
    },
    [],
  )

  const stepOnce = (increment: boolean) => {
    if (increment) incrementRef.current()
    else decrementRef.current()
    holdCountRef.current += 1
  }

  const stepLoop = (increment: boolean) => {
    stepOnce(increment)
    if (shouldRepeat) {
      const interval =
        typeof stepHoldInterval === "function"
          ? stepHoldInterval(holdCountRef.current)
          : stepHoldInterval
      holdTimeoutRef.current = window.setTimeout(
        () => stepLoop(increment),
        interval,
      )
    }
  }

  const startHold = (event: React.PointerEvent, increment: boolean) => {
    event.preventDefault()
    inputRef.current?.focus()
    stepOnce(increment)
    if (shouldRepeat) {
      holdTimeoutRef.current = window.setTimeout(
        () => stepLoop(increment),
        stepHoldDelay,
      )
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let next: number | bigint | string = current
    const trim = trimLeadingZeroesOnBlur && getDecimalPlaces(raw) < 15

    if (isBigInt) {
      if (clampBehavior === "blur" && typeof next === "bigint") {
        next = clampBigInt(next, minBig, maxBig)
      }
      if (trim && typeof next === "string" && isBigIntString(next, true)) {
        const parsed = BigInt(next)
        next =
          clampBehavior === "blur"
            ? clampBigInt(parsed, minBig, maxBig)
            : parsed
      }
    } else if (typeof next === "number") {
      if (clampBehavior === "blur") next = clamp(next, minNumber, maxNumber)
    } else if (typeof next === "string") {
      const trailingDot = trailingDecimalSeparatorPattern.test(next)
      const trimmed = trim ? next.replace(/^(-?)0+(?=\d)/, "$1") : next
      const parsed = parseFloat(trimmed)
      if (Number.isNaN(parsed)) {
        next = trimmed
      } else {
        const clamped =
          clampBehavior === "blur"
            ? parsed > Number.MAX_SAFE_INTEGER && maxNumber !== undefined
              ? maxNumber
              : clamp(parsed, minNumber, maxNumber)
            : parsed
        if (!trim && clamped === parsed) {
          next = trimmed
        } else {
          next = trailingDot ? `${clamped}.` : clamped
        }
      }
    }

    if (next !== current) setValue(next)
    onBlur?.(event)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented || readOnly || !withKeyboardEvents) return
    if (event.key === "ArrowUp") {
      event.preventDefault()
      incrementRef.current()
    } else if (event.key === "ArrowDown") {
      event.preventDefault()
      decrementRef.current()
    }
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (selectAllOnFocus) {
      window.setTimeout(() => inputRef.current?.select(), 0)
    }
    onFocus?.(event)
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    onPaste?.(event)
    if (event.defaultPrevented || readOnly) return
    const input = inputRef.current
    if (!input) return
    let pasted = event.clipboardData.getData("text")
    if (suffix) pasted = pasted.split(suffix).join("")
    if (prefix) pasted = pasted.split(prefix).join("")
    if (groupSeparator && groupSeparator !== decimalSeparator) {
      pasted = pasted.split(groupSeparator).join("")
    }
    const separators = [...decimalCandidates].filter((char) =>
      pasted.includes(char),
    )
    if (separators.length > 0) {
      const lastIndex = Math.max(
        ...separators.map((char) => pasted.lastIndexOf(char)),
      )
      const head = pasted
        .slice(0, lastIndex)
        .split("")
        .filter((char) => !decimalCandidates.has(char))
        .join("")
      pasted = head + decimalSeparator + pasted.slice(lastIndex + 1)
    }
    event.preventDefault()
    const start = input.selectionStart ?? input.value.length
    const end = input.selectionEnd ?? start
    applyText(
      input.value.slice(0, start) + pasted + input.value.slice(end),
      start + pasted.length,
    )
  }

  const atMax =
    (typeof current === "number" &&
      maxNumber !== undefined &&
      current >= maxNumber) ||
    (typeof current === "bigint" && maxBig !== undefined && current >= maxBig)
  const atMin =
    (typeof current === "number" &&
      minNumber !== undefined &&
      current <= minNumber) ||
    (typeof current === "bigint" && minBig !== undefined && current <= minBig)

  const canShowControls =
    !hideControls &&
    !readOnly &&
    (isBigInt
      ? typeof current === "bigint" ||
        current === "" ||
        isBigIntString(current as string, allowNegative)
      : canStep(current as number | string))

  const controls = (
    <div
      data-slot="number-input-controls"
      className="order-last flex h-full w-6 shrink-0 flex-col self-stretch border-l border-input"
    >
      <Button
        type="button"
        variant="ghost"
        tabIndex={-1}
        aria-hidden
        data-slot="number-input-control"
        disabled={disabled || atMax}
        className="h-1/2 min-h-0 w-full rounded-none rounded-tr-[inherit] p-0"
        onMouseDown={(event) => event.preventDefault()}
        onPointerDown={(event) => startHold(event, true)}
        onPointerUp={stopHold}
        onPointerLeave={stopHold}
      >
        <ChevronUpIcon className="size-3" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        tabIndex={-1}
        aria-hidden
        data-slot="number-input-control"
        disabled={disabled || atMin}
        className="h-1/2 min-h-0 w-full rounded-none rounded-br-[inherit] p-0"
        onMouseDown={(event) => event.preventDefault()}
        onPointerDown={(event) => startHold(event, false)}
        onPointerUp={stopHold}
        onPointerLeave={stopHold}
      >
        <ChevronDownIcon className="size-3" />
      </Button>
    </div>
  )

  return (
    <InputGroup
      data-slot="number-input"
      className={cn(groupClasses[size], className)}
    >
      {leftSection ? (
        <InputGroupAddon align="inline-start">{leftSection}</InputGroupAddon>
      ) : null}
      <InputGroupInput
        {...props}
        ref={(node) => {
          inputRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
        }}
        type={type}
        inputMode={isBigInt ? "numeric" : "decimal"}
        value={format(raw)}
        disabled={disabled}
        readOnly={readOnly}
        className={cn("h-full", inputClasses[size])}
        onChange={(event) =>
          applyText(
            event.target.value,
            event.target.selectionStart ?? event.target.value.length,
          )
        }
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />
      {rightSection ? (
        <InputGroupAddon align="inline-end">{rightSection}</InputGroupAddon>
      ) : canShowControls ? (
        controls
      ) : null}
    </InputGroup>
  )
}

export { NumberInput }
export type {
  NumberInputClampBehavior,
  NumberInputGroupStyle,
  NumberInputHandlers,
  NumberInputProps,
  NumberInputSize,
  NumberInputValue,
  NumberInputValueDetails,
}
