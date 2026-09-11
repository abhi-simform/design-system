import { HelpCircleIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipPlayground({
  side,
  align,
  sideOffset,
  delay,
}: {
  side: "top" | "right" | "bottom" | "left"
  align: "start" | "center" | "end"
  sideOffset: number
  delay: number
}) {
  return (
    // A nested provider overrides the showcase's own delay for this demo.
    <TooltipProvider delay={delay}>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Hover me
        </TooltipTrigger>
        <TooltipContent side={side} align={align} sideOffset={sideOffset}>
          side={side}, align={align}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function TooltipBasic() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant="outline" size="icon" aria-label="Add" />}
      >
        <PlusIcon />
      </TooltipTrigger>
      <TooltipContent>Add an item</TooltipContent>
    </Tooltip>
  )
}

export function TooltipSides() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            {side}
          </TooltipTrigger>
          <TooltipContent side={side}>side=&quot;{side}&quot;</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export function TooltipWithShortcut() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Save
        </TooltipTrigger>
        <TooltipContent>
          Save changes
          <KbdGroup className="ml-2">
            <Kbd>⌘</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={<Button variant="ghost" size="icon-sm" aria-label="Help" />}
        >
          <HelpCircleIcon />
        </TooltipTrigger>
        <TooltipContent>
          Kbd restyles itself inside tooltip content.
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
