import * as React from "react"

import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { OverflowList } from "@/components/ui/overflow-list"
import type { OverflowListGap } from "@/components/ui/overflow-list"
import { Slider } from "@/components/ui/slider"

const TAGS = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind",
  "Base UI",
  "Storybook",
  "Vitest",
  "ESLint",
  "Prettier",
  "Playwright",
  "Zustand",
  "Zod",
  "Radix",
  "Next.js",
  "Remix",
  "Astro",
]

function ResizableFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-full min-w-48 resize-x overflow-auto rounded-lg border p-3">
      {children}
    </div>
  )
}

function renderTag(item: string) {
  return (
    <Badge key={item} variant="outline">
      {item}
    </Badge>
  )
}

function renderCount(items: string[]) {
  return <Badge variant="secondary">+{items.length}</Badge>
}

export function OverflowListPlayground({
  gap,
  maxRows,
  maxVisibleItems,
  collapseFrom,
}: {
  gap: OverflowListGap
  maxRows: number
  maxVisibleItems: number
  collapseFrom: "start" | "end"
}) {
  return (
    <ResizableFrame>
      <OverflowList
        data={TAGS}
        gap={gap}
        maxRows={maxRows}
        maxVisibleItems={maxVisibleItems > 0 ? maxVisibleItems : Infinity}
        collapseFrom={collapseFrom}
        renderItem={renderTag}
        renderOverflow={renderCount}
      />
    </ResizableFrame>
  )
}

export function OverflowListDefault() {
  return (
    <ResizableFrame>
      <OverflowList
        data={TAGS}
        renderItem={renderTag}
        renderOverflow={renderCount}
      />
    </ResizableFrame>
  )
}

export function OverflowListMultiRow() {
  return (
    <ResizableFrame>
      <OverflowList
        data={TAGS}
        maxRows={2}
        renderItem={renderTag}
        renderOverflow={renderCount}
      />
    </ResizableFrame>
  )
}

export function OverflowListMaxVisible() {
  return (
    <ResizableFrame>
      <OverflowList
        data={TAGS}
        maxVisibleItems={5}
        renderItem={renderTag}
        renderOverflow={renderCount}
      />
    </ResizableFrame>
  )
}

const PATH = [
  "Home",
  "Products",
  "Electronics",
  "Computers",
  "Laptops",
  "Ultrabooks",
]

export function OverflowListCollapseFromStart() {
  return (
    <ResizableFrame>
      <OverflowList
        data={PATH}
        collapseFrom="start"
        gap="sm"
        renderItem={(item, index) => (
          <span
            key={item}
            className={
              index === PATH.length - 1
                ? "text-sm font-medium"
                : "text-sm text-muted-foreground"
            }
          >
            {item}
            {index < PATH.length - 1 ? " /" : ""}
          </span>
        )}
        renderOverflow={(items) => (
          <span className="text-sm text-muted-foreground">
            … ({items.length}) /
          </span>
        )}
      />
    </ResizableFrame>
  )
}

export function OverflowListHoverCard() {
  return (
    <ResizableFrame>
      <OverflowList
        data={TAGS}
        renderItem={renderTag}
        renderOverflow={(items) => (
          <HoverCard>
            <HoverCardTrigger render={<Badge variant="secondary" />}>
              +{items.length}
            </HoverCardTrigger>
            <HoverCardContent className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </HoverCardContent>
          </HoverCard>
        )}
      />
    </ResizableFrame>
  )
}

export function OverflowListControlledWidth() {
  const [width, setWidth] = React.useState(60)

  return (
    <div className="flex w-full flex-col gap-4">
      <Slider
        value={[width]}
        min={20}
        max={100}
        onValueChange={(value) =>
          setWidth(Array.isArray(value) ? value[0] : value)
        }
        aria-label="Container width"
      />
      <div
        className="overflow-hidden rounded-lg border p-3"
        style={{ width: `${width}%` }}
      >
        <OverflowList
          data={TAGS}
          maxRows={2}
          renderItem={renderTag}
          renderOverflow={renderCount}
        />
      </div>
    </div>
  )
}
