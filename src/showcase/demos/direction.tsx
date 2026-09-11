import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { DirectionProvider, useDirection } from "@/components/ui/direction"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

function ReadsDirection() {
  const direction = useDirection()

  return (
    <p className="font-mono text-xs text-muted-foreground">
      useDirection() → &quot;{direction}&quot;
    </p>
  )
}

function Composition() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<a href="#/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Direction</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <InputGroup className="max-w-sm">
        <InputGroupAddon align="inline-start">
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </InputGroup>

      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
          Menu
          <ChevronDownIcon data-icon="inline-end" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ReadsDirection />
    </div>
  )
}

export function DirectionPlayground({
  direction,
}: {
  direction: "ltr" | "rtl"
}) {
  return (
    <DirectionProvider direction={direction}>
      <div dir={direction} className="w-full">
        <Composition />
      </div>
    </DirectionProvider>
  )
}

export function DirectionToggleDemo() {
  const [direction, setDirection] = React.useState<"ltr" | "rtl">("ltr")

  return (
    <div className="flex w-full flex-col gap-4">
      <ToggleGroup
        variant="outline"
        size="sm"
        spacing={0}
        value={[direction]}
        onValueChange={(next) => {
          const selected = next[0]
          if (selected === "ltr" || selected === "rtl") {
            setDirection(selected)
          }
        }}
        aria-label="Reading direction"
      >
        <ToggleGroupItem value="ltr">ltr</ToggleGroupItem>
        <ToggleGroupItem value="rtl">rtl</ToggleGroupItem>
      </ToggleGroup>

      {/* Two things are needed: `dir` on the DOM so Tailwind's rtl: variants
          and CSS logical properties flip, and the provider so Base UI's
          JS-positioned popups flip with them. */}
      <DirectionProvider direction={direction}>
        <div dir={direction} className="rounded-xl border p-4">
          <Composition />
        </div>
      </DirectionProvider>
    </div>
  )
}

export function DirectionSideBySide() {
  return (
    <div className="grid w-full gap-4 lg:grid-cols-2">
      {(["ltr", "rtl"] as const).map((direction) => (
        <DirectionProvider key={direction} direction={direction}>
          <div dir={direction} className="rounded-xl border p-4">
            <div className="mb-3 font-mono text-xs text-muted-foreground">
              direction=&quot;{direction}&quot;
            </div>
            <Composition />
          </div>
        </DirectionProvider>
      ))}
    </div>
  )
}
