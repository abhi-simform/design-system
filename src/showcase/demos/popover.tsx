import { SettingsIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverPlayground({
  side,
  align,
  sideOffset,
}: {
  side: "top" | "right" | "bottom" | "left"
  align: "start" | "center" | "end"
  sideOffset: number
}) {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent side={side} align={align} sideOffset={sideOffset}>
        <PopoverHeader>
          <PopoverTitle>Positioning</PopoverTitle>
          <PopoverDescription>
            side={side}, align={align}, offset {sideOffset}px.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}

export function PopoverBasic() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        <SettingsIcon data-icon="inline-start" />
        Dimensions
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <div className="mt-3 flex flex-col gap-2">
          {["Width", "Height"].map((dimension) => (
            <div
              key={dimension}
              className="grid grid-cols-3 items-center gap-2"
            >
              <Label htmlFor={`popover-${dimension}`}>{dimension}</Label>
              <Input
                id={`popover-${dimension}`}
                defaultValue="100%"
                className="col-span-2"
              />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function PopoverSides() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger render={<Button variant="outline" size="sm" />}>
            {side}
          </PopoverTrigger>
          <PopoverContent side={side} className="w-40">
            <PopoverTitle>side=&quot;{side}&quot;</PopoverTitle>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}
