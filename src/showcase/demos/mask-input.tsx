import * as React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MaskInput } from "@/components/ui/mask-input"
import type { MaskInputSize } from "@/components/ui/mask-input"

export function MaskInputPlayground({
  size,
  mask,
  slotChar,
  alwaysShowMask,
  autoClear,
  showMaskOnFocus,
}: {
  size: MaskInputSize
  mask: string
  slotChar: string
  alwaysShowMask: boolean
  autoClear: boolean
  showMaskOnFocus: boolean
}) {
  return (
    <MaskInput
      key={`${mask}|${slotChar}`}
      className="w-64"
      size={size}
      mask={mask}
      slotChar={slotChar}
      alwaysShowMask={alwaysShowMask}
      autoClear={autoClear}
      showMaskOnFocus={showMaskOnFocus}
      placeholder="Type here"
    />
  )
}

export function MaskInputBasic() {
  return (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="mask-phone">Phone</Label>
      <MaskInput id="mask-phone" mask="(999) 999-9999" />
    </div>
  )
}

export function MaskInputTokens() {
  return (
    <div className="grid w-64 gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="mask-hex">Hex color (custom token)</Label>
        <MaskInput
          id="mask-hex"
          mask="#hhhhhh"
          tokens={{ h: /[0-9a-fA-F]/ }}
          transform={(char) => char.toUpperCase()}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="mask-serial">Serial (letters, digits, sign)</Label>
        <MaskInput id="mask-serial" mask="AA-**-#99" />
      </div>
    </div>
  )
}

export function MaskInputRegexArray() {
  return (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="mask-time">Time</Label>
      <MaskInput
        id="mask-time"
        mask={[/[0-2]/, /\d/, ":", /[0-5]/, /\d/]}
        alwaysShowMask
        slotChar="-"
      />
    </div>
  )
}

export function MaskInputDynamic() {
  return (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="mask-card">Card number (switches for 34 / 37)</Label>
      <MaskInput
        id="mask-card"
        mask="9999 9999 9999 9999"
        modify={(value) =>
          /^3[47]/.test(value) ? { mask: "9999 999999 99999" } : undefined
        }
      />
    </div>
  )
}

export function MaskInputOptionalSegment() {
  return (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="mask-zip">ZIP (+4 optional)</Label>
      <MaskInput id="mask-zip" mask="99999?-9999" />
    </div>
  )
}

export function MaskInputCallbacks() {
  const [raw, setRaw] = React.useState("")
  const [masked, setMasked] = React.useState("")
  const [complete, setComplete] = React.useState(false)
  const resetRef = React.useRef<(() => void) | null>(null)

  return (
    <div className="flex w-72 flex-col gap-3">
      <MaskInput
        mask="99/99/9999"
        autoClear
        resetRef={resetRef}
        onChangeRaw={(r, m) => {
          setRaw(r)
          setMasked(m)
          if (r === "") setComplete(false)
        }}
        onComplete={() => setComplete(true)}
      />
      <p className="text-xs text-muted-foreground">
        raw: {raw || "-"} | masked: {masked || "-"} | complete:{" "}
        {complete ? "yes" : "no"}
      </p>
      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() => resetRef.current?.()}
      >
        Reset
      </Button>
    </div>
  )
}

export function MaskInputSizes() {
  const sizes: MaskInputSize[] = ["xs", "sm", "md", "lg", "xl"]

  return (
    <div className="grid w-64 gap-3">
      {sizes.map((size) => (
        <MaskInput key={size} size={size} mask="999-999" alwaysShowMask />
      ))}
    </div>
  )
}
