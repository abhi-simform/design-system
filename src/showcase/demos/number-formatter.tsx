import { NumberFormatter } from "@/components/ui/number-formatter"

export function NumberFormatterPlayground({
  value,
  prefix,
  suffix,
  thousandSeparator,
  decimalSeparator,
  decimalScale,
  fixedDecimalScale,
  allowNegative,
}: {
  value: number
  prefix: string
  suffix: string
  thousandSeparator: boolean
  decimalSeparator: string
  decimalScale: number
  fixedDecimalScale: boolean
  allowNegative: boolean
}) {
  return (
    <NumberFormatter
      value={value}
      prefix={prefix || undefined}
      suffix={suffix || undefined}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      decimalScale={decimalScale}
      fixedDecimalScale={fixedDecimalScale}
      allowNegative={allowNegative}
    />
  )
}

export function NumberFormatterPrefixSuffix() {
  return (
    <div className="flex flex-wrap gap-4">
      <NumberFormatter prefix="$ " value={100} />
      <NumberFormatter value={100} suffix=" RUB" />
    </div>
  )
}

export function NumberFormatterThousandSeparator() {
  return (
    <div className="flex flex-wrap gap-4">
      <NumberFormatter thousandSeparator value={1000000} />
      <NumberFormatter
        thousandSeparator="."
        decimalSeparator=","
        value={1234567.89}
        decimalScale={2}
      />
    </div>
  )
}

export function NumberFormatterDecimalScale() {
  return (
    <div className="flex flex-wrap gap-4">
      <NumberFormatter value={5 / 3} decimalScale={2} />
      <NumberFormatter value={5 / 3} decimalScale={2} fixedDecimalScale />
      <NumberFormatter value={5} decimalScale={2} fixedDecimalScale />
    </div>
  )
}

export function NumberFormatterNegativeValues() {
  return (
    <div className="flex flex-wrap gap-4">
      <NumberFormatter thousandSeparator value={-1234.5} />
      <NumberFormatter
        thousandSeparator
        value={-1234.5}
        allowNegative={false}
      />
    </div>
  )
}
