import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CopyButton({
  value,
  label = "Copy code",
}: {
  value: string
  label?: string
}) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) {
      return
    }

    const timeout = window.setTimeout(() => setCopied(false), 2000)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [copied])

  // `navigator.clipboard` only exists in a secure context. localhost qualifies,
  // but a LAN-IP `vite preview` does not — hide the affordance rather than
  // offering a button that silently does nothing.
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      aria-label={copied ? "Copied" : label}
      onClick={() => {
        navigator.clipboard.writeText(value).then(
          () => setCopied(true),
          () => setCopied(false),
        )
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  )
}
