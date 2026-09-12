import * as React from "react"
import { cn } from "cn"

import { Stack } from "@/components/ui/stack"

function DemoCell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-muted/50 px-4 py-3 font-mono text-xs text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function StackPlayground({
  gap,
  align,
  justify,
}: {
  gap: "xs" | "sm" | "md" | "lg" | "xl"
  align: "stretch" | "center" | "flex-start" | "flex-end"
  justify:
    "flex-start" | "center" | "flex-end" | "space-between" | "space-around"
}) {
  return (
    <Stack
      gap={gap}
      align={align}
      justify={justify}
      className="h-64 max-w-xs rounded-lg border p-4"
    >
      <DemoCell className="w-24">Item one</DemoCell>
      <DemoCell className="w-32">Item two</DemoCell>
      <DemoCell className="w-20">Item three</DemoCell>
    </Stack>
  )
}

export function StackDefault() {
  return (
    <Stack className="max-w-xs">
      <DemoCell>First item</DemoCell>
      <DemoCell>Second item</DemoCell>
      <DemoCell>Third item</DemoCell>
    </Stack>
  )
}

export function StackAlign() {
  return (
    <div className="flex w-full gap-6">
      {(["stretch", "center", "flex-end"] as const).map((align) => (
        <Stack
          key={align}
          align={align}
          gap="sm"
          className="rounded-lg border p-4"
        >
          <p className="text-xs text-muted-foreground">align={align}</p>
          <DemoCell className="w-24">Short</DemoCell>
          <DemoCell className="w-32">A bit longer</DemoCell>
        </Stack>
      ))}
    </div>
  )
}

export function StackAsSection() {
  return (
    <Stack render={<section />} className="max-w-xs">
      <DemoCell>Rendered inside a section element</DemoCell>
      <DemoCell>Not a div</DemoCell>
    </Stack>
  )
}
