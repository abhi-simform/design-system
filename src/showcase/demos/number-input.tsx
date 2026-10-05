import * as React from "react"
import { DollarSignIcon, PercentIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  NumberInput,
  type NumberInputClampBehavior,
  type NumberInputHandlers,
  type NumberInputSize,
  type NumberInputValue,
} from "@/components/ui/number-input"

export function NumberInputPlayground({
  prefix,
  suffix,
  thousandSeparator,
  decimalScale,
  fixedDecimalScale,
  allowNegative,
  allowDecimal,
  clampBehavior,
  hideControls,
  size,
  min,
  max,
  step,
  disabled,
}: {
  prefix: string
  suffix: string
  thousandSeparator: string
  decimalScale: number
  fixedDecimalScale: boolean
  allowNegative: boolean
  allowDecimal: boolean
  clampBehavior: NumberInputClampBehavior
  hideControls: boolean
  size: NumberInputSize
  min: number
  max: number
  step: number
  disabled: boolean
}) {
  return (
    <NumberInput
      defaultValue={1234.5}
      prefix={prefix}
      suffix={suffix}
      thousandSeparator={thousandSeparator || undefined}
      decimalScale={decimalScale}
      fixedDecimalScale={fixedDecimalScale}
      allowNegative={allowNegative}
      allowDecimal={allowDecimal}
      clampBehavior={clampBehavior}
      hideControls={hideControls}
      size={size}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      className="w-64"
    />
  )
}

export function NumberInputBasic() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <Label>Quantity</Label>
      <NumberInput defaultValue={5} min={0} max={20} placeholder="0 to 20" />
    </div>
  )
}

export function NumberInputCurrency() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <Label>Price</Label>
      <NumberInput
        defaultValue={1234.5}
        prefix="$"
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale
        min={0}
        step={0.5}
      />
    </div>
  )
}

export function NumberInputSeparators() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label>European (. grouping, , decimal)</Label>
        <NumberInput
          defaultValue={1234567.89}
          thousandSeparator="."
          decimalSeparator=","
          suffix=" EUR"
          decimalScale={2}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Lakh grouping</Label>
        <NumberInput
          defaultValue={12345678}
          thousandSeparator=","
          thousandsGroupStyle="lakh"
          prefix="Rs "
          allowDecimal={false}
        />
      </div>
    </div>
  )
}

export function NumberInputClamping() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      {(["blur", "strict", "none"] as const).map((behavior) => (
        <div key={behavior} className="flex flex-col gap-1.5">
          <Label>clampBehavior=&quot;{behavior}&quot; (10 to 50)</Label>
          <NumberInput
            defaultValue={20}
            min={10}
            max={50}
            clampBehavior={behavior}
          />
        </div>
      ))}
    </div>
  )
}

export function NumberInputHoldToStep() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <Label>Hold a control to accelerate</Label>
      <NumberInput
        defaultValue={0}
        stepHoldDelay={400}
        stepHoldInterval={(count) => Math.max(1000 / count ** 2, 25)}
      />
    </div>
  )
}

export function NumberInputControlled() {
  const [value, setValue] = React.useState<NumberInputValue>(42)

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label>Controlled</Label>
      <NumberInput value={value} onChange={setValue} min={0} max={100} />
      <p className="text-sm text-muted-foreground">
        Value: {JSON.stringify(value)} ({typeof value})
      </p>
    </div>
  )
}

export function NumberInputExternalHandlers() {
  const handlers = React.useRef<NumberInputHandlers>(undefined)

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label>External controls</Label>
      <NumberInput
        defaultValue={10}
        handlersRef={handlers}
        hideControls
        step={5}
      />
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => handlers.current?.decrement()}>
          Minus 5
        </Button>
        <Button variant="outline" onClick={() => handlers.current?.increment()}>
          Plus 5
        </Button>
      </div>
    </div>
  )
}

export function NumberInputSections() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <NumberInput
        defaultValue={25}
        leftSection={<DollarSignIcon />}
        hideControls
      />
      <NumberInput
        defaultValue={15}
        rightSection={<PercentIcon />}
        min={0}
        max={100}
      />
    </div>
  )
}

export function NumberInputSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <NumberInput key={size} size={size} defaultValue={7} />
      ))}
    </div>
  )
}

export function NumberInputBigInt() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <Label>Beyond 2^53 with bigint</Label>
      <NumberInput defaultValue={BigInt("9007199254740993")} />
    </div>
  )
}
