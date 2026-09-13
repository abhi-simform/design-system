import * as React from "react"

import { SimpleGrid } from "@/components/ui/simple-grid"

function DemoCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-16 items-center justify-center rounded-lg border bg-muted/50 font-mono text-xs text-muted-foreground">
      {children}
    </div>
  )
}

export function SimpleGridPlayground({
  cols,
  spacing,
}: {
  cols: number
  spacing: "xs" | "sm" | "md" | "lg" | "xl"
}) {
  return (
    <SimpleGrid cols={cols} spacing={spacing} className="max-w-xl">
      {Array.from({ length: 6 }, (_, i) => (
        <DemoCell key={i}>{i + 1}</DemoCell>
      ))}
    </SimpleGrid>
  )
}

export function SimpleGridResponsiveCols() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
      {Array.from({ length: 8 }, (_, i) => (
        <DemoCell key={i}>{"{ base: 1, sm: 2, lg: 4 }"}</DemoCell>
      ))}
    </SimpleGrid>
  )
}

export function SimpleGridIndependentSpacing() {
  return (
    <SimpleGrid cols={3} spacing="md" verticalSpacing="xl">
      {Array.from({ length: 6 }, (_, i) => (
        <DemoCell key={i}>spacing≠verticalSpacing</DemoCell>
      ))}
    </SimpleGrid>
  )
}

export function SimpleGridAutoFit() {
  return (
    <SimpleGrid minColWidth={180} spacing="md">
      {Array.from({ length: 6 }, (_, i) => (
        <DemoCell key={i}>minColWidth=180</DemoCell>
      ))}
    </SimpleGrid>
  )
}

const CONTAINER_BREAKPOINTS = {
  xs: "16em",
  sm: "20em",
  md: "26em",
  lg: "32em",
  xl: "38em",
}

export function SimpleGridContainerQueries() {
  return (
    <div className="w-full max-w-md min-w-48 resize-x overflow-auto rounded-lg border p-4">
      <p className="mb-3 text-xs text-muted-foreground">
        Drag the bottom-right handle to shrink this box below 20em — the columns
        respond to its width, not the viewport.
      </p>
      <SimpleGrid
        type="container"
        breakpoints={CONTAINER_BREAKPOINTS}
        cols={{ base: 1, sm: 3 }}
        spacing="md"
      >
        <DemoCell>{"{ base: 1, sm: 3 }"}</DemoCell>
        <DemoCell>{"{ base: 1, sm: 3 }"}</DemoCell>
        <DemoCell>{"{ base: 1, sm: 3 }"}</DemoCell>
      </SimpleGrid>
    </div>
  )
}
