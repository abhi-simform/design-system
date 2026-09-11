import { CommandIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function KbdPlayground({ children }: { children: string }) {
  return <Kbd>{children}</Kbd>
}

export function KbdBasic() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Kbd>d</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>
        <CommandIcon />
      </Kbd>
      <Kbd>⇧</Kbd>
    </div>
  )
}

export function KbdGroups() {
  return (
    <div className="flex flex-col items-start gap-4 text-sm">
      <KbdGroup>
        <Kbd>
          <CommandIcon />
        </Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span className="text-muted-foreground">+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  )
}

export function KbdInContext() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Save</Button>} />
        <TooltipContent>
          Save changes
          <KbdGroup className="ml-2">
            <Kbd>
              <CommandIcon />
            </Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>
        </TooltipContent>
      </Tooltip>
      <p className="text-sm text-muted-foreground">
        Press <Kbd>/</Kbd> to search this showcase.
      </p>
    </div>
  )
}
