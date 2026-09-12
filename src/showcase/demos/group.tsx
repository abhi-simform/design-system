import * as React from "react"
import { cn } from "cn"

import { Group } from "@/components/ui/group"
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

export function GroupPlayground({
  gap,
  align,
  justify,
  wrap,
  grow,
}: {
  gap: "xs" | "sm" | "md" | "lg" | "xl"
  align: "stretch" | "center" | "flex-start" | "flex-end"
  justify:
    "flex-start" | "center" | "flex-end" | "space-between" | "space-around"
  wrap: "wrap" | "nowrap"
  grow: boolean
}) {
  return (
    <Group
      gap={gap}
      align={align}
      justify={justify}
      wrap={wrap}
      grow={grow}
      className="max-w-md rounded-lg border p-4"
    >
      <DemoCell>Item one</DemoCell>
      <DemoCell>Item two</DemoCell>
      <DemoCell>Item three</DemoCell>
    </Group>
  )
}

export function GroupDefault() {
  return (
    <Group className="max-w-md">
      <DemoCell>First item</DemoCell>
      <DemoCell>Second item</DemoCell>
      <DemoCell>Third item</DemoCell>
    </Group>
  )
}

export function GroupJustify() {
  return (
    <Stack gap="sm" className="w-full">
      {(["flex-start", "center", "space-between"] as const).map((justify) => (
        <Group
          key={justify}
          justify={justify}
          gap="sm"
          className="w-full rounded-lg border p-4"
        >
          <DemoCell>justify={justify}</DemoCell>
          <DemoCell>Second</DemoCell>
        </Group>
      ))}
    </Stack>
  )
}

export function GroupWrap() {
  return (
    <Group wrap="wrap" className="max-w-64 rounded-lg border p-4">
      <DemoCell>One</DemoCell>
      <DemoCell>Two</DemoCell>
      <DemoCell>Three</DemoCell>
      <DemoCell>Four</DemoCell>
      <DemoCell>Five</DemoCell>
    </Group>
  )
}

export function GroupGrow() {
  return (
    <Group grow className="max-w-md rounded-lg border p-4">
      <DemoCell>Short</DemoCell>
      <DemoCell>A bit longer label</DemoCell>
      <DemoCell>Mid</DemoCell>
    </Group>
  )
}

export function GroupAsSection() {
  return (
    <Group render={<section />} className="max-w-md">
      <DemoCell>Rendered inside a section element</DemoCell>
      <DemoCell>Not a div</DemoCell>
    </Group>
  )
}
