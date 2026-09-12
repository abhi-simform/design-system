import * as React from "react"

import { Grid, GridCol } from "@/components/ui/grid"

function DemoCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-16 items-center justify-center rounded-lg border bg-muted/50 font-mono text-xs text-muted-foreground">
      {children}
    </div>
  )
}

export function GridPlayground({
  columns,
  gap,
  grow,
  justify,
}: {
  columns: number
  gap: "xs" | "sm" | "md" | "lg" | "xl"
  grow: boolean
  justify:
    "flex-start" | "center" | "flex-end" | "space-between" | "space-around"
}) {
  return (
    <Grid
      columns={columns}
      gap={gap}
      grow={grow}
      justify={justify}
      className="w-full max-w-xl"
    >
      <GridCol span={4}>
        <DemoCell>span=4</DemoCell>
      </GridCol>
      <GridCol span={4}>
        <DemoCell>span=4</DemoCell>
      </GridCol>
      <GridCol span={4}>
        <DemoCell>span=4</DemoCell>
      </GridCol>
    </Grid>
  )
}

export function GridResponsiveSpans() {
  return (
    <Grid gap="md" className="w-full">
      {[1, 2, 3, 4].map((n) => (
        <GridCol key={n} span={{ base: 12, sm: 6, md: 3 }}>
          <DemoCell>span={"{ base: 12, sm: 6, md: 3 }"}</DemoCell>
        </GridCol>
      ))}
    </Grid>
  )
}

export function GridGrow() {
  return (
    <Grid gap="md" grow className="w-full">
      <GridCol span={4}>
        <DemoCell>span=4</DemoCell>
      </GridCol>
      <GridCol span={4}>
        <DemoCell>span=4</DemoCell>
      </GridCol>
      <GridCol span={4}>
        <DemoCell>span=4</DemoCell>
      </GridCol>
      <GridCol span="content">
        <DemoCell>grows to fill</DemoCell>
      </GridCol>
    </Grid>
  )
}

export function GridOffsetAndOrder() {
  return (
    <Grid gap="md" className="w-full">
      <GridCol span={3} order={{ base: 2, sm: 1 }}>
        <DemoCell>order 2 / sm:1</DemoCell>
      </GridCol>
      <GridCol span={3} offset={3} order={{ base: 1, sm: 2 }}>
        <DemoCell>offset=3, order 1 / sm:2</DemoCell>
      </GridCol>
    </Grid>
  )
}

const CONTAINER_BREAKPOINTS = {
  xs: "16em",
  sm: "20em",
  md: "26em",
  lg: "32em",
  xl: "38em",
}

export function GridContainerQueries() {
  return (
    <div className="w-full max-w-md min-w-48 resize-x overflow-auto rounded-lg border p-4">
      <p className="mb-3 text-xs text-muted-foreground">
        Drag the bottom-right handle to shrink this box below 20em — the columns
        respond to its width, not the viewport.
      </p>
      <Grid type="container" gap="md" breakpoints={CONTAINER_BREAKPOINTS}>
        <GridCol span={{ base: 12, sm: 6 }}>
          <DemoCell>span={"{ base: 12, sm: 6 }"}</DemoCell>
        </GridCol>
        <GridCol span={{ base: 12, sm: 6 }}>
          <DemoCell>span={"{ base: 12, sm: 6 }"}</DemoCell>
        </GridCol>
      </Grid>
    </div>
  )
}
