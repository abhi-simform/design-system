import * as React from "react"

type UseClipboardInput = {
  timeout?: number
}

type UseClipboardReturnValue = {
  copy: (value: string) => void
  reset: () => void
  error: Error | null
  copied: boolean
}

function useClipboard(
  options: UseClipboardInput = {},
): UseClipboardReturnValue {
  const timeout = options.timeout ?? 2000
  const [error, setError] = React.useState<Error | null>(null)
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current ?? undefined)
    }
  }, [])

  const handleCopyResult = (value: boolean) => {
    window.clearTimeout(timeoutRef.current ?? undefined)
    timeoutRef.current = window.setTimeout(() => setCopied(false), timeout)
    setCopied(value)
  }

  const copy = (value: string) => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(value).then(
        () => {
          setError(null)
          handleCopyResult(true)
        },
        (err: Error) => setError(err),
      )
    } else {
      setError(new Error("useClipboard: navigator.clipboard is not supported"))
    }
  }

  const reset = () => {
    setCopied(false)
    setError(null)
    window.clearTimeout(timeoutRef.current ?? undefined)
  }

  return { copy, reset, error, copied }
}

export { useClipboard }
export type { UseClipboardInput, UseClipboardReturnValue }
