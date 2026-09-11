import { ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CollapsiblePlayground({
  defaultOpen,
  disabled,
}: {
  defaultOpen: boolean
  disabled: boolean
}) {
  return (
    <Collapsible
      defaultOpen={defaultOpen}
      disabled={disabled}
      className="flex w-full max-w-sm flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">Starred repositories</span>
        <CollapsibleTrigger
          render={<Button variant="ghost" size="icon-sm" aria-label="Toggle" />}
        >
          <ChevronsUpDownIcon />
        </CollapsibleTrigger>
      </div>
      <div className="rounded-lg border px-3 py-2 font-mono text-xs">
        @base-ui/react
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-lg border px-3 py-2 font-mono text-xs">
          tailwindcss
        </div>
        <div className="rounded-lg border px-3 py-2 font-mono text-xs">
          class-variance-authority
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function CollapsibleBasic() {
  return (
    <Collapsible className="flex w-full max-w-sm flex-col gap-2">
      <CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
        <ChevronsUpDownIcon data-icon="inline-start" />
        Show details
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-lg border p-3 text-sm text-muted-foreground">
        Collapsible is the unstyled primitive behind Accordion. Use it when you
        need one independent disclosure rather than a coordinated set.
      </CollapsibleContent>
    </Collapsible>
  )
}

export function CollapsibleDefaultOpen() {
  return (
    <Collapsible defaultOpen className="flex w-full max-w-sm flex-col gap-2">
      <CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
        Toggle
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-lg border p-3 text-sm text-muted-foreground">
        Starts expanded via defaultOpen.
      </CollapsibleContent>
    </Collapsible>
  )
}
