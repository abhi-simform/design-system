import * as React from "react"

import { Button } from "@/components/ui/button"
import { FileButton } from "@/components/ui/file-button"

function formatFiles(value: File | File[] | null): string {
  if (value === null) return "No file selected"
  if (Array.isArray(value)) {
    return value.length === 0
      ? "No files selected"
      : value.map((file) => file.name).join(", ")
  }
  return value.name
}

export function FileButtonPlayground({
  multiple,
  accept,
  disabled,
}: {
  multiple: boolean
  accept: string
  disabled: boolean
}) {
  const [value, setValue] = React.useState<File | File[] | null>(null)

  return (
    <div className="flex flex-col items-start gap-2">
      <FileButton
        onChange={setValue}
        multiple={multiple}
        accept={accept || undefined}
        disabled={disabled}
      >
        {({ onClick }) => (
          <Button onClick={onClick} disabled={disabled}>
            Upload file{multiple ? "s" : ""}
          </Button>
        )}
      </FileButton>
      <p className="text-sm text-muted-foreground">{formatFiles(value)}</p>
    </div>
  )
}

export function FileButtonBasic() {
  const [file, setFile] = React.useState<File | null>(null)

  return (
    <div className="flex flex-col items-start gap-2">
      <FileButton onChange={setFile} accept="image/png,image/jpeg">
        {({ onClick }) => <Button onClick={onClick}>Upload image</Button>}
      </FileButton>
      <p className="text-sm text-muted-foreground">
        {file ? file.name : "No file selected"}
      </p>
    </div>
  )
}

export function FileButtonMultiple() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <div className="flex flex-col items-start gap-2">
      <FileButton onChange={setFiles} multiple>
        {({ onClick }) => <Button onClick={onClick}>Upload files</Button>}
      </FileButton>
      <p className="text-sm text-muted-foreground">
        {files.length === 0
          ? "No files selected"
          : files.map((file) => file.name).join(", ")}
      </p>
    </div>
  )
}

export function FileButtonReset() {
  const [file, setFile] = React.useState<File | null>(null)
  const resetRef = React.useRef<() => void>(null)

  const clear = () => {
    setFile(null)
    resetRef.current?.()
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex gap-2">
        <FileButton onChange={setFile} resetRef={resetRef}>
          {({ onClick }) => <Button onClick={onClick}>Upload file</Button>}
        </FileButton>
        <Button variant="outline" onClick={clear} disabled={!file}>
          Clear
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        {file ? file.name : "No file selected"}
      </p>
    </div>
  )
}

export function FileButtonDisabled() {
  return (
    <FileButton onChange={() => {}} disabled>
      {({ onClick }) => (
        <Button onClick={onClick} disabled>
          Upload file
        </Button>
      )}
    </FileButton>
  )
}
