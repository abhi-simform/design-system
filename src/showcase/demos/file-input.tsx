import * as React from "react"
import { FileIcon, PaperclipIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { FileInput } from "@/components/ui/file-input"
import type { FileInputSize } from "@/components/ui/file-input"

export function FileInputPlayground({
  size,
  placeholder,
  multiple,
  clearable,
  disabled,
  readOnly,
  error,
  accept,
}: {
  size: FileInputSize
  placeholder: string
  multiple: boolean
  clearable: boolean
  disabled: boolean
  readOnly: boolean
  error: boolean
  accept: string
}) {
  const common = {
    size,
    placeholder,
    clearable,
    disabled,
    readOnly,
    error,
    accept: accept || undefined,
    className: "max-w-sm",
    "aria-label": "Upload files",
  }
  return multiple ? (
    <FileInput key="multi" multiple {...common} />
  ) : (
    <FileInput key="single" {...common} />
  )
}

export function FileInputBasic() {
  return (
    <Field className="max-w-sm">
      <FieldLabel>Avatar</FieldLabel>
      <FileInput placeholder="Pick a file" clearable accept="image/*" />
      <FieldDescription>Images only, via the accept prop.</FieldDescription>
    </Field>
  )
}

export function FileInputMultiple() {
  return (
    <FileInput
      multiple
      clearable
      placeholder="Pick files"
      className="max-w-sm"
      aria-label="Files"
    />
  )
}

function Chips({ value }: { value: null | File | File[] }) {
  const files = Array.isArray(value) ? value : value ? [value] : []
  return (
    <div className="flex flex-wrap gap-1">
      {files.map((file) => (
        <Badge key={file.name} variant="secondary">
          {file.name}
        </Badge>
      ))}
    </div>
  )
}

export function FileInputValueComponent() {
  return (
    <FileInput
      multiple
      clearable
      valueComponent={Chips}
      placeholder="Pick files"
      className="max-w-sm"
      aria-label="Files"
    />
  )
}

export function FileInputSections() {
  return (
    <FileInput
      leftSection={<PaperclipIcon className="size-4" />}
      rightSection={<FileIcon className="size-4" />}
      clearable
      placeholder="Attach a file"
      className="max-w-sm"
      aria-label="Attachment"
    />
  )
}

export function FileInputControlled() {
  const [value, setValue] = React.useState<File | null>(null)
  return (
    <div className="grid w-full max-w-sm gap-2">
      <FileInput
        value={value}
        onChange={setValue}
        placeholder="Pick a file"
        aria-label="Controlled file"
      />
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{value ? value.name : "No file selected"}</span>
        <Button variant="outline" size="sm" onClick={() => setValue(null)}>
          Reset
        </Button>
      </div>
    </div>
  )
}

export function FileInputClearModes() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      {(["both", "rightSection", "clear"] as const).map((mode) => (
        <FileInput
          key={mode}
          clearable
          clearSectionMode={mode}
          defaultValue={new File(["x"], `${mode}.txt`)}
          rightSection={<FileIcon className="size-4" />}
          aria-label={mode}
        />
      ))}
    </div>
  )
}

export function FileInputStates() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <FileInput disabled placeholder="Disabled" aria-label="Disabled" />
      <FileInput readOnly placeholder="Read only" aria-label="Read only" />
      <FileInput error placeholder="Invalid" aria-label="Invalid" />
    </div>
  )
}
