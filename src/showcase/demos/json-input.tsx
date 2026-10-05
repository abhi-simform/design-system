import * as React from "react"

import { Button } from "@/components/ui/button"
import { JsonInput, type JsonInputSize } from "@/components/ui/json-input"

const sample = '{"name":"Ada","tags":["math","code"],"active":true}'

export function JsonInputPlayground({
  label,
  description,
  placeholder,
  formatOnBlur,
  autosize,
  minRows,
  maxRows,
  size,
  disabled,
  readOnly,
  withAsterisk,
}: {
  label: string
  description: string
  placeholder: string
  formatOnBlur: boolean
  autosize: boolean
  minRows: number
  maxRows: number
  size: JsonInputSize
  disabled: boolean
  readOnly: boolean
  withAsterisk: boolean
}) {
  return (
    <JsonInput
      label={label || undefined}
      description={description || undefined}
      placeholder={placeholder}
      validationError="Invalid JSON"
      formatOnBlur={formatOnBlur}
      autosize={autosize}
      minRows={minRows}
      maxRows={autosize ? maxRows : undefined}
      size={size}
      disabled={disabled}
      readOnly={readOnly}
      withAsterisk={withAsterisk}
      wrapperClassName="w-96 max-w-full"
    />
  )
}

export function JsonInputValidation() {
  return (
    <JsonInput
      label="Your package.json"
      placeholder="Type some JSON, then click away"
      validationError="Invalid JSON"
      defaultValue='{"name": "broken",}'
      minRows={4}
      wrapperClassName="max-w-md"
    />
  )
}

export function JsonInputFormatOnBlur() {
  return (
    <JsonInput
      label="Format on blur"
      description="Valid JSON is pretty-printed when the field loses focus"
      validationError="Invalid JSON"
      formatOnBlur
      autosize
      minRows={4}
      defaultValue={sample}
      wrapperClassName="max-w-md"
    />
  )
}

export function JsonInputAutosize() {
  return (
    <JsonInput
      label="Autosize"
      description="Grows with content between 2 and 8 rows"
      validationError="Invalid JSON"
      formatOnBlur
      autosize
      minRows={2}
      maxRows={8}
      defaultValue={sample}
      wrapperClassName="max-w-md"
    />
  )
}

export function JsonInputControlled() {
  const [value, setValue] = React.useState(sample)
  const valid = (() => {
    try {
      JSON.parse(value)
      return true
    } catch {
      return false
    }
  })()

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <JsonInput
        label="Controlled value"
        validationError="Invalid JSON"
        value={value}
        onChange={setValue}
        formatOnBlur
        autosize
        minRows={4}
      />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setValue('{"reset":true}')}
        >
          Reset
        </Button>
        <Button variant="outline" size="sm" onClick={() => setValue("{oops")}>
          Break it
        </Button>
        <span className="text-sm text-muted-foreground">
          {valid ? "Valid" : "Invalid"} ({value.length} chars)
        </span>
      </div>
    </div>
  )
}

export function JsonInputCustomSerializer() {
  return (
    <JsonInput
      label="Custom indentation and serializer"
      description="indentSpaces=4 with a serializer that sorts keys"
      validationError="Invalid JSON"
      formatOnBlur
      indentSpaces={4}
      serialize={(value, _replacer, space) =>
        JSON.stringify(
          value,
          (_key, v: unknown) =>
            v && typeof v === "object" && !Array.isArray(v)
              ? Object.fromEntries(
                  Object.entries(v as Record<string, unknown>).sort(
                    ([a], [b]) => a.localeCompare(b),
                  ),
                )
              : v,
          space,
        )
      }
      autosize
      minRows={4}
      defaultValue='{"z":1,"a":{"y":2,"b":3}}'
      wrapperClassName="max-w-md"
    />
  )
}

export function JsonInputErrorStates() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <JsonInput
        label="Manual error"
        error="This payload is required"
        placeholder="{}"
      />
      <JsonInput
        label="Error state only (no validationError)"
        description="Blur with invalid JSON to see the red state without a message"
        defaultValue="not json"
      />
    </div>
  )
}
