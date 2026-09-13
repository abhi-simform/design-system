"use client"

import * as React from "react"
import { cn } from "cn"

import { formatNumber } from "@/components/ui/number-formatter"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

type RollingNumberProps = Omit<React.ComponentProps<"div">, "children"> & {
  value: number
  prefix?: string
  suffix?: string
  decimalSeparator?: string
  thousandSeparator?: string | boolean
  decimalScale?: number
  fixedDecimalScale?: boolean
  animationDuration?: number
  timingFunction?: string
  tabularNumbers?: boolean
  withLiveRegion?: boolean
}

type NumberParts = {
  isNegative: boolean
  intDigits: string[]
  fracDigits: string[]
}

type DigitSlot = {
  kind: "digit"
  key: string
  digit: string
  fromDigit: string
  empty: boolean
}

type CharSlot = {
  kind: "char"
  key: string
  char: string
  empty: boolean
}

type Slot = DigitSlot | CharSlot

const DIGIT_STRIP = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "1"]

// A literal-per-index lookup, not a template (`-translate-y-[${n}em]`) which
// Tailwind's static scanner would never see.
const REST_TRANSLATE: Record<number, string> = {
  0: "-translate-y-[0em]",
  1: "-translate-y-[1em]",
  2: "-translate-y-[2em]",
  3: "-translate-y-[3em]",
  4: "-translate-y-[4em]",
  5: "-translate-y-[5em]",
  6: "-translate-y-[6em]",
  7: "-translate-y-[7em]",
  8: "-translate-y-[8em]",
  9: "-translate-y-[9em]",
}

/**
 * Parses formatNumber's own (neutralized) output into digit arrays, rather
 * than re-deriving decimalScale truncation independently, so the animated
 * digits can never drift from the accessible label built from the same
 * function.
 */
function getNumberParts(
  value: number,
  decimalScale: number | undefined,
  fixedDecimalScale: boolean,
): NumberParts {
  const canonical =
    formatNumber({
      value,
      prefix: "",
      suffix: "",
      thousandSeparator: false,
      decimalSeparator: ".",
      decimalScale,
      fixedDecimalScale,
      allowNegative: true,
    }) ?? "0"

  const isNegative = canonical.startsWith("-")
  const [intPart, fracPart = ""] = canonical
    .slice(isNegative ? 1 : 0)
    .split(".")

  return {
    isNegative,
    intDigits: intPart.split(""),
    fracDigits: fracPart ? fracPart.split("") : [],
  }
}

function buildSlots(
  current: NumberParts,
  previous: NumberParts,
  prefix: string,
  suffix: string,
  decimalSeparator: string,
  thousandSeparator: string | boolean,
): Slot[] {
  const slots: Slot[] = []

  for (let i = 0; i < prefix.length; i++) {
    slots.push({
      kind: "char",
      key: `prefix-${i}`,
      char: prefix[i],
      empty: false,
    })
  }

  slots.push({
    kind: "char",
    key: "sign",
    char: "-",
    empty: !current.isNegative,
  })

  const separator =
    thousandSeparator === true
      ? ","
      : thousandSeparator === false
        ? null
        : thousandSeparator
  const maxIntLen = Math.max(
    current.intDigits.length,
    previous.intDigits.length,
  )

  // Right-aligned, keyed by distance from the ones place, so React keeps the
  // same DOM node per column as the digit count grows or shrinks.
  for (
    let distanceFromRight = maxIntLen - 1;
    distanceFromRight >= 0;
    distanceFromRight--
  ) {
    const currentIdx = current.intDigits.length - 1 - distanceFromRight
    const previousIdx = previous.intDigits.length - 1 - distanceFromRight
    const empty = currentIdx < 0
    const digit =
      currentIdx >= 0
        ? current.intDigits[currentIdx]
        : previous.intDigits[previousIdx]
    const fromDigit = previousIdx >= 0 ? previous.intDigits[previousIdx] : digit

    slots.push({
      kind: "digit",
      key: `int-${distanceFromRight}`,
      digit,
      fromDigit,
      empty,
    })

    if (separator && distanceFromRight > 0 && distanceFromRight % 3 === 0) {
      slots.push({
        kind: "char",
        key: `int-sep-${distanceFromRight}`,
        char: separator,
        empty,
      })
    }
  }

  if (current.fracDigits.length > 0 || previous.fracDigits.length > 0) {
    slots.push({
      kind: "char",
      key: "decimal-sep",
      char: decimalSeparator,
      empty: current.fracDigits.length === 0,
    })
  }

  // Left-aligned (decimals grow rightward, the opposite of integer digits).
  const maxFracLen = Math.max(
    current.fracDigits.length,
    previous.fracDigits.length,
  )
  for (let i = 0; i < maxFracLen; i++) {
    const empty = i >= current.fracDigits.length
    const digit = current.fracDigits[i] ?? previous.fracDigits[i]
    const fromDigit = previous.fracDigits[i] ?? digit
    slots.push({ kind: "digit", key: `frac-${i}`, digit, fromDigit, empty })
  }

  for (let i = 0; i < suffix.length; i++) {
    slots.push({
      kind: "char",
      key: `suffix-${i}`,
      char: suffix[i],
      empty: false,
    })
  }

  return slots
}

function DigitColumn({
  digit,
  fromDigit,
  empty,
  valueDirection,
  prefersReducedMotion,
}: {
  digit: string
  fromDigit: string
  empty: boolean
  valueDirection: "up" | "down"
  prefersReducedMotion: boolean
}) {
  const digitIndex = Number(digit)
  const fromIndex = Number(fromDigit)
  // Only a forward roll landing on 0 or 1 uses the strip's two wraparound
  // cells, so e.g. 9→0 keeps rolling down instead of jumping back up.
  const wrapsForward =
    valueDirection === "up" && digitIndex < fromIndex && digitIndex <= 1
  const targetIndex = wrapsForward ? digitIndex + 10 : digitIndex

  return (
    <span
      data-slot="rolling-number-digit"
      aria-hidden="true"
      data-empty={empty || undefined}
      className={cn(
        "relative inline-block h-[1em] w-[1ch] overflow-hidden align-baseline",
        "transition-[width,opacity] duration-(--rn-duration) ease-(--rn-timing-function)",
        "data-empty:w-0 data-empty:opacity-0",
      )}
    >
      <span
        key={digit}
        className={cn(
          "flex flex-col",
          REST_TRANSLATE[digitIndex],
          !prefersReducedMotion &&
            "animate-[rn-roll_var(--rn-duration)_var(--rn-timing-function)]",
        )}
        style={
          prefersReducedMotion
            ? undefined
            : ({
                "--rn-roll-from": `translateY(${-fromIndex}em)`,
                "--rn-roll-to": `translateY(${-targetIndex}em)`,
              } as React.CSSProperties)
        }
      >
        {DIGIT_STRIP.map((cell, i) => (
          <span key={i} className="flex h-[1em] items-center justify-center">
            {cell}
          </span>
        ))}
      </span>
    </span>
  )
}

function RollingNumber({
  value,
  prefix = "",
  suffix = "",
  decimalSeparator = ".",
  thousandSeparator = false,
  decimalScale,
  fixedDecimalScale = false,
  animationDuration = 600,
  timingFunction = "ease",
  tabularNumbers = true,
  withLiveRegion = false,
  className,
  style,
  ...props
}: RollingNumberProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  // Tracks the previous render's value without an effect (which would only
  // commit after paint, leaving the very first render after a change with no
  // "previous" to diff against): adjusting state during render is React's own
  // documented pattern for remembering the prior value of a changing prop.
  const [committedValue, setCommittedValue] = React.useState(value)
  const [previousValue, setPreviousValue] = React.useState(value)
  if (value !== committedValue) {
    setPreviousValue(committedValue)
    setCommittedValue(value)
  }
  const valueDirection: "up" | "down" = value >= previousValue ? "up" : "down"

  const current = getNumberParts(value, decimalScale, fixedDecimalScale)
  const previous = getNumberParts(
    previousValue,
    decimalScale,
    fixedDecimalScale,
  )

  const slots = buildSlots(
    current,
    previous,
    prefix,
    suffix,
    decimalSeparator,
    thousandSeparator,
  )

  const accessibleLabel =
    formatNumber({
      value,
      prefix,
      suffix,
      thousandSeparator,
      decimalSeparator,
      decimalScale,
      fixedDecimalScale,
      allowNegative: true,
    }) ?? ""

  return (
    <div
      data-slot="rolling-number"
      role={withLiveRegion ? "status" : "img"}
      aria-label={accessibleLabel}
      style={
        {
          ...style,
          "--rn-duration": `${animationDuration}ms`,
          "--rn-timing-function": timingFunction,
        } as React.CSSProperties
      }
      className={cn(
        "relative inline-flex items-center",
        tabularNumbers && "tabular-nums",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden whitespace-pre text-transparent"
      >
        {accessibleLabel}
      </span>
      {slots.map((slot) =>
        slot.kind === "digit" ? (
          <DigitColumn
            key={slot.key}
            digit={slot.digit}
            fromDigit={slot.fromDigit}
            empty={slot.empty}
            valueDirection={valueDirection}
            prefersReducedMotion={prefersReducedMotion}
          />
        ) : (
          <span
            key={slot.key}
            data-slot="rolling-number-char"
            aria-hidden="true"
            data-empty={slot.empty || undefined}
            className={cn(
              "inline-block overflow-hidden whitespace-pre",
              "transition-[width,opacity] duration-(--rn-duration) ease-(--rn-timing-function)",
              "data-empty:w-0 data-empty:opacity-0",
            )}
          >
            {slot.char}
          </span>
        ),
      )}
    </div>
  )
}

export { RollingNumber }
export type { RollingNumberProps }
