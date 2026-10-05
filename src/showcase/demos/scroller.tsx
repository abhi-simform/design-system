import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Scroller } from "@/components/ui/scroller"

const TAGS = [
  "Design",
  "Engineering",
  "Product",
  "Marketing",
  "Research",
  "Support",
  "Finance",
  "Legal",
  "People",
  "Operations",
  "Security",
  "Data",
  "Sales",
  "Success",
]

function Tags() {
  return TAGS.map((tag) => (
    <Badge key={tag} variant="outline" className="me-2 shrink-0">
      {tag}
    </Badge>
  ))
}

export function ScrollerPlayground({
  scrollAmount,
  controlSize,
  draggable,
  showStartControl,
  showEndControl,
}: {
  scrollAmount: number
  controlSize: number
  draggable: boolean
  showStartControl: boolean
  showEndControl: boolean
}) {
  return (
    <Scroller
      className="w-full max-w-md"
      scrollAmount={scrollAmount}
      controlSize={controlSize}
      draggable={draggable}
      showStartControl={showStartControl}
      showEndControl={showEndControl}
    >
      <Tags />
    </Scroller>
  )
}

export function ScrollerDefault() {
  return (
    <Scroller className="w-full max-w-md">
      <Tags />
    </Scroller>
  )
}

export function ScrollerCustomIcons() {
  return (
    <Scroller
      className="w-full max-w-md"
      controlSize={36}
      startControlIcon={<ArrowLeftIcon className="size-5" />}
      endControlIcon={<ArrowRightIcon className="size-5" />}
    >
      <Tags />
    </Scroller>
  )
}

export function ScrollerGradientColor() {
  return (
    <div className="w-full max-w-md rounded-lg bg-muted p-3">
      <Scroller edgeGradientColor="var(--muted)">
        <Tags />
      </Scroller>
    </div>
  )
}

export function ScrollerAlwaysVisible() {
  return (
    <Scroller className="w-full max-w-md" showStartControl showEndControl>
      <Tags />
    </Scroller>
  )
}

export function ScrollerControlProps() {
  return (
    <Scroller
      className="w-full max-w-md"
      scrollAmount={400}
      startControlProps={{ "aria-label": "Previous tags" }}
      endControlProps={{ "aria-label": "Next tags" }}
    >
      <Tags />
    </Scroller>
  )
}

export function ScrollerDraggable() {
  const [clicks, setClicks] = React.useState(0)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Scroller>
        {TAGS.map((tag) => (
          <Button
            key={tag}
            variant="outline"
            size="sm"
            className="me-2 shrink-0"
            onClick={() => setClicks((count) => count + 1)}
          >
            {tag}
          </Button>
        ))}
      </Scroller>
      <p className="text-xs text-muted-foreground">
        Buttons clicked: {clicks}. Dragging the row never counts as a click.
      </p>
    </div>
  )
}
