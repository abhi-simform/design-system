import { cn } from "cn"

type NumberFormatterProps = React.ComponentProps<"span"> & {
  value?: number | string
  prefix?: string
  suffix?: string
  thousandSeparator?: string | boolean
  decimalSeparator?: string
  decimalScale?: number
  fixedDecimalScale?: boolean
  allowNegative?: boolean
}

function formatNumber({
  value,
  prefix = "",
  suffix = "",
  thousandSeparator = false,
  decimalSeparator = ".",
  decimalScale,
  fixedDecimalScale = false,
  allowNegative = true,
}: Omit<NumberFormatterProps, keyof React.ComponentProps<"span">>) {
  if (value === undefined) return null

  const numeric = typeof value === "string" ? Number(value) : value
  if (!Number.isFinite(numeric)) return null

  const isNegative = numeric < 0 && allowNegative
  const [integerPart, decimalPart = ""] = Math.abs(numeric)
    .toString()
    .split(".")

  let decimals = decimalPart
  if (decimalScale !== undefined) {
    decimals = decimals.slice(0, decimalScale)
    if (fixedDecimalScale) {
      decimals = decimals.padEnd(decimalScale, "0")
    }
  }

  const groupedInteger = thousandSeparator
    ? integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        thousandSeparator === true ? "," : thousandSeparator,
      )
    : integerPart

  const formatted =
    groupedInteger + (decimals ? decimalSeparator + decimals : "")

  return prefix + (isNegative ? "-" : "") + formatted + suffix
}

function NumberFormatter({
  value,
  prefix,
  suffix,
  thousandSeparator,
  decimalSeparator,
  decimalScale,
  fixedDecimalScale,
  allowNegative,
  className,
  ...props
}: NumberFormatterProps) {
  const formatted = formatNumber({
    value,
    prefix,
    suffix,
    thousandSeparator,
    decimalSeparator,
    decimalScale,
    fixedDecimalScale,
    allowNegative,
  })

  if (formatted === null) return null

  return (
    <span data-slot="number-formatter" className={cn(className)} {...props}>
      {formatted}
    </span>
  )
}

export { NumberFormatter, formatNumber }
export type { NumberFormatterProps }
