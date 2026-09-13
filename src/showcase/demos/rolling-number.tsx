import * as React from "react"

import { Button } from "@/components/ui/button"
import { RollingNumber } from "@/components/ui/rolling-number"

export function RollingNumberPlayground({
  value,
  prefix,
  suffix,
  thousandSeparator,
  decimalSeparator,
  decimalScale,
  fixedDecimalScale,
  animationDuration,
  timingFunction,
  tabularNumbers,
  withLiveRegion,
}: {
  value: number
  prefix: string
  suffix: string
  thousandSeparator: boolean
  decimalSeparator: string
  decimalScale: number
  fixedDecimalScale: boolean
  animationDuration: number
  timingFunction: string
  tabularNumbers: boolean
  withLiveRegion: boolean
}) {
  return (
    <RollingNumber
      value={value}
      prefix={prefix || undefined}
      suffix={suffix || undefined}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      decimalScale={decimalScale}
      fixedDecimalScale={fixedDecimalScale}
      animationDuration={animationDuration}
      timingFunction={timingFunction}
      tabularNumbers={tabularNumbers}
      withLiveRegion={withLiveRegion}
      className="text-3xl font-semibold"
    />
  )
}

export function RollingNumberCounter() {
  const [value, setValue] = React.useState(1234)

  return (
    <div className="flex flex-col items-start gap-4">
      <RollingNumber
        value={value}
        thousandSeparator
        className="text-3xl font-semibold"
      />
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setValue((v) => v + 1)}
        >
          +1
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setValue((v) => v - 1)}
        >
          -1
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setValue((v) => v + 100)}
        >
          +100
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setValue(Math.floor(Math.random() * 100000))}
        >
          Random
        </Button>
      </div>
    </div>
  )
}

export function RollingNumberDigitGrowth() {
  const [value, setValue] = React.useState(9)

  return (
    <div className="flex flex-col items-start gap-4">
      <RollingNumber value={value} className="text-3xl font-semibold" />
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => setValue(9)}>
          9
        </Button>
        <Button size="sm" variant="outline" onClick={() => setValue(10)}>
          10
        </Button>
        <Button size="sm" variant="outline" onClick={() => setValue(99)}>
          99
        </Button>
        <Button size="sm" variant="outline" onClick={() => setValue(100)}>
          100
        </Button>
      </div>
    </div>
  )
}

export function RollingNumberCurrency() {
  const [value, setValue] = React.useState(19.99)

  return (
    <div className="flex flex-col items-start gap-4">
      <RollingNumber
        value={value}
        prefix="$ "
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale
        className="text-3xl font-semibold"
      />
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => setValue(19.99)}>
          $19.99
        </Button>
        <Button size="sm" variant="outline" onClick={() => setValue(149.5)}>
          $149.50
        </Button>
        <Button size="sm" variant="outline" onClick={() => setValue(1234.56)}>
          $1,234.56
        </Button>
      </div>
    </div>
  )
}
