import * as React from "react"
import { LockIcon, ShieldCheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/password-input"
import type { PasswordInputSize } from "@/components/ui/password-input"

export function PasswordInputPlayground({
  size,
  placeholder,
  defaultVisible,
  visibilityToggleFocusable,
  disabled,
  error,
  withLeftSection,
}: {
  size: PasswordInputSize
  placeholder: string
  defaultVisible: boolean
  visibilityToggleFocusable: boolean
  disabled: boolean
  error: boolean
  withLeftSection: boolean
}) {
  return (
    <PasswordInput
      key={String(defaultVisible)}
      size={size}
      placeholder={placeholder}
      defaultVisible={defaultVisible}
      visibilityToggleFocusable={visibilityToggleFocusable}
      disabled={disabled}
      error={error}
      leftSection={
        withLeftSection ? <LockIcon className="size-4" /> : undefined
      }
      className="max-w-sm"
      aria-label="Password"
    />
  )
}

export function PasswordInputBasic() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="pw-basic">Password</FieldLabel>
      <PasswordInput id="pw-basic" placeholder="Your password" />
      <FieldDescription>
        Use the eye button to reveal the value.
      </FieldDescription>
    </Field>
  )
}

export function PasswordInputControlled() {
  const [visible, setVisible] = React.useState(false)
  return (
    <div className="grid w-full max-w-sm gap-2">
      <PasswordInput
        visible={visible}
        onVisibilityChange={setVisible}
        defaultValue="hunter2"
        aria-label="Controlled password"
      />
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{visible ? "Visible" : "Hidden"}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setVisible((v) => !v)}
        >
          Toggle externally
        </Button>
      </div>
    </div>
  )
}

export function PasswordInputDefaultVisible() {
  return (
    <PasswordInput
      defaultVisible
      defaultValue="visible-by-default"
      className="max-w-sm"
      aria-label="Visible by default"
    />
  )
}

export function PasswordInputCustomIcon() {
  return (
    <PasswordInput
      visibilityToggleIcon={({ reveal }) =>
        reveal ? <ShieldCheckIcon className="text-primary" /> : <LockIcon />
      }
      visibilityToggleButtonProps={{
        variant: "outline",
        "aria-label": "Show or hide secret",
      }}
      leftSection={<LockIcon className="size-4" />}
      placeholder="Custom icon and button props"
      className="max-w-sm"
      aria-label="Custom icon"
    />
  )
}

export function PasswordInputFocusable() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="pw-focus">Keyboard reachable toggle</FieldLabel>
      <PasswordInput
        id="pw-focus"
        visibilityToggleFocusable
        placeholder="Press Tab, then Space or Enter"
      />
      <FieldDescription>
        By default the toggle is skipped by Tab to keep focus in the input.
      </FieldDescription>
    </Field>
  )
}

export function PasswordInputSizes() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <PasswordInput
          key={size}
          size={size}
          placeholder={size}
          aria-label={size}
        />
      ))}
    </div>
  )
}

export function PasswordInputStates() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <PasswordInput disabled placeholder="Disabled" aria-label="Disabled" />
      <PasswordInput error placeholder="Invalid" aria-label="Invalid" />
    </div>
  )
}
