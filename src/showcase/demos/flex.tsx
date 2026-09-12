import * as React from "react"
import { cn } from "cn"

import { Flex } from "@/components/ui/flex"

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

export function FlexPlayground({
  gap,
  align,
  justify,
  wrap,
  direction,
}: {
  gap: "xs" | "sm" | "md" | "lg" | "xl"
  align: "stretch" | "center" | "flex-start" | "flex-end"
  justify:
    "flex-start" | "center" | "flex-end" | "space-between" | "space-around"
  wrap: "wrap" | "nowrap"
  direction: "row" | "column"
}) {
  return (
    <Flex
      gap={gap}
      align={align}
      justify={justify}
      wrap={wrap}
      direction={direction}
      className="max-w-md rounded-lg border p-4"
    >
      <DemoCell>Item one</DemoCell>
      <DemoCell>Item two</DemoCell>
      <DemoCell>Item three</DemoCell>
    </Flex>
  )
}

export function FlexDefault() {
  return (
    <Flex gap="md" className="max-w-md">
      <DemoCell>First item</DemoCell>
      <DemoCell>Second item</DemoCell>
      <DemoCell>Third item</DemoCell>
    </Flex>
  )
}

export function FlexDirection() {
  return (
    <Flex direction="column" gap="sm" className="max-w-xs">
      <DemoCell>direction="column"</DemoCell>
      <DemoCell>Second item</DemoCell>
      <DemoCell>Third item</DemoCell>
    </Flex>
  )
}

export function FlexResponsive() {
  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      gap={{ base: "sm", sm: "lg" }}
      className="w-full rounded-lg border p-4"
    >
      <DemoCell>Stacks below sm (48em)</DemoCell>
      <DemoCell>Row from sm up</DemoCell>
      <DemoCell>Gap widens too</DemoCell>
    </Flex>
  )
}

export function FlexGapLonghands() {
  return (
    <Flex wrap="wrap" rowGap="lg" columnGap="xs" className="max-w-xs">
      <DemoCell className="w-24">rowGap=lg</DemoCell>
      <DemoCell className="w-24">columnGap=xs</DemoCell>
      <DemoCell className="w-24">Third</DemoCell>
      <DemoCell className="w-24">Fourth</DemoCell>
    </Flex>
  )
}
