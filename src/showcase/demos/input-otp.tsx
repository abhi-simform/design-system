import * as React from "react"

import { Badge } from "@/components/ui/badge"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"

export function InputOTPPlayground({
  length,
  disabled,
}: {
  length: number
  disabled: boolean
}) {
  const [value, setValue] = React.useState("")
  const slots = Array.from({ length }, (_, index) => index)

  return (
    <div className="flex flex-col items-center gap-3">
      <InputOTP
        key={length}
        maxLength={length}
        value={value}
        onChange={setValue}
        disabled={disabled}
      >
        <InputOTPGroup>
          {slots.map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <span className="font-mono text-xs text-muted-foreground">
        {value || "—"}
      </span>
    </div>
  )
}

export function InputOTPBasic() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Label>Verification code</Label>
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}

export function InputOTPWithSeparator() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        {[0, 1, 2].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        {[3, 4, 5].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}

export function InputOTPOnComplete() {
  const [complete, setComplete] = React.useState(false)

  return (
    <div className="flex flex-col items-center gap-3">
      <InputOTP
        maxLength={4}
        onChange={(value) => setComplete(value.length === 4)}
      >
        <InputOTPGroup>
          {[0, 1, 2, 3].map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {complete ? (
        <Badge variant="secondary">Code entered</Badge>
      ) : (
        <span className="text-xs text-muted-foreground">Type four digits.</span>
      )}
    </div>
  )
}

export function InputOTPDisabled() {
  return (
    // Controlled, not defaultValue: the underlying input always supplies a
    // value, so pairing the two makes React warn about a mixed input.
    <InputOTP maxLength={4} disabled value="1234" onChange={() => {}}>
      <InputOTPGroup>
        {[0, 1, 2, 3].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}
