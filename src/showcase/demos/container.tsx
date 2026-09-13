import * as React from "react"

import { Container } from "@/components/ui/container"

function DemoBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-muted/50 p-4 text-center font-mono text-xs text-muted-foreground">
      {children}
    </div>
  )
}

const SIZES = ["xs", "sm", "md", "lg", "xl"] as const

export function ContainerPlayground({
  size,
  fluid,
}: {
  size: (typeof SIZES)[number]
  fluid: boolean
}) {
  return (
    <Container size={size} fluid={fluid} className="border border-dashed">
      <DemoBlock>{`size="${size}"${fluid ? " (fluid overrides size)" : ""}`}</DemoBlock>
    </Container>
  )
}

export function ContainerSizes() {
  return (
    <div className="flex w-full flex-col gap-3">
      {SIZES.map((size) => (
        <Container key={size} size={size} className="border border-dashed">
          <DemoBlock>{`size="${size}"`}</DemoBlock>
        </Container>
      ))}
    </div>
  )
}

export function ContainerFluid() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Container size="sm" className="border border-dashed">
        <DemoBlock>{'size="sm"'}</DemoBlock>
      </Container>
      <Container fluid className="border border-dashed">
        <DemoBlock>fluid</DemoBlock>
      </Container>
    </div>
  )
}

export function ContainerCustomSize() {
  return (
    <Container size={400} className="border border-dashed">
      <DemoBlock>{"size={400}"}</DemoBlock>
    </Container>
  )
}
