import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/ui/copy-button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function CopyButtonPlayground({
  value,
  timeout,
}: {
  value: string
  timeout: number
}) {
  return (
    <CopyButton value={value} timeout={timeout}>
      {({ copied, copy }) => (
        <Button variant={copied ? "default" : "outline"} onClick={copy}>
          {copied ? "Copied" : "Copy"}
        </Button>
      )}
    </CopyButton>
  )
}

export function CopyButtonBasic() {
  return (
    <CopyButton value="https://example.com">
      {({ copied, copy }) => (
        <Button variant={copied ? "default" : "outline"} onClick={copy}>
          {copied ? "Copied url" : "Copy url"}
        </Button>
      )}
    </CopyButton>
  )
}

export function CopyButtonIconOnly() {
  return (
    <CopyButton value="https://example.com">
      {({ copied, copy }) => (
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={copied ? "Copied" : "Copy"}
                onClick={copy}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            }
          />
          <TooltipContent>{copied ? "Copied" : "Copy"}</TooltipContent>
        </Tooltip>
      )}
    </CopyButton>
  )
}

export function CopyButtonCustomTimeout() {
  return (
    <CopyButton value="https://example.com" timeout={3000}>
      {({ copied, copy }) => (
        <Button variant={copied ? "default" : "outline"} onClick={copy}>
          {copied ? "Copied for 3s" : "Copy url"}
        </Button>
      )}
    </CopyButton>
  )
}
