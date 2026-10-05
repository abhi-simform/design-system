import * as React from "react"

import { Button } from "@/components/ui/button"
import { Spoiler } from "@/components/ui/spoiler"

const PARAGRAPH =
  "Design systems keep interfaces consistent by sharing tokens, components and conventions across every product surface. When the content of a section grows beyond what a layout can comfortably hold, a spoiler keeps the page scannable while still letting readers opt in to the full text."

function Paragraphs({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-3 text-sm">
      {Array.from({ length: count }, (_, i) => (
        <p key={i}>{PARAGRAPH}</p>
      ))}
    </div>
  )
}

export function SpoilerPlayground({
  maxHeight,
  transitionDuration,
  paragraphs,
  defaultExpanded,
}: {
  maxHeight: number
  transitionDuration: number
  paragraphs: number
  defaultExpanded: boolean
}) {
  return (
    <div className="w-full max-w-md pb-6">
      <Spoiler
        key={String(defaultExpanded)}
        maxHeight={maxHeight}
        transitionDuration={transitionDuration}
        defaultExpanded={defaultExpanded}
        showLabel="Show more"
        hideLabel="Hide"
      >
        <Paragraphs count={paragraphs} />
      </Spoiler>
    </div>
  )
}

export function SpoilerDefault() {
  return (
    <div className="w-full max-w-md pb-6">
      <Spoiler maxHeight={80} showLabel="Show more" hideLabel="Hide">
        <Paragraphs count={3} />
      </Spoiler>
    </div>
  )
}

export function SpoilerShortContent() {
  return (
    <div className="w-full max-w-md">
      <Spoiler maxHeight={200} showLabel="Show more" hideLabel="Hide">
        <Paragraphs count={1} />
      </Spoiler>
      <p className="mt-2 font-mono text-xs text-muted-foreground">
        Content fits within maxHeight, so no control is rendered.
      </p>
    </div>
  )
}

export function SpoilerControlled() {
  const [expanded, setExpanded] = React.useState(false)
  return (
    <div className="flex w-full max-w-md flex-col gap-4 pb-6">
      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "Collapse" : "Expand"} from outside
      </Button>
      <Spoiler
        maxHeight={60}
        expanded={expanded}
        onExpandedChange={setExpanded}
        showLabel="Read more"
        hideLabel="Read less"
      >
        <Paragraphs count={3} />
      </Spoiler>
    </div>
  )
}

export function SpoilerTransitions() {
  return (
    <div className="grid w-full gap-8 pb-6 sm:grid-cols-2">
      {[0, 800].map((duration) => (
        <div key={duration} className="flex flex-col gap-2">
          <span className="font-mono text-xs text-muted-foreground">
            transitionDuration={"{"}
            {duration}
            {"}"}
          </span>
          <Spoiler
            maxHeight={60}
            transitionDuration={duration}
            showLabel="Show more"
            hideLabel="Hide"
          >
            <Paragraphs count={2} />
          </Spoiler>
        </div>
      ))}
    </div>
  )
}

export function SpoilerCustomLabels() {
  return (
    <div className="w-full max-w-md pb-6">
      <Spoiler
        maxHeight={60}
        defaultExpanded
        showLabel={<span>Reveal the rest</span>}
        hideLabel={<span>Collapse</span>}
        showAriaLabel="Reveal the full article"
        hideAriaLabel="Collapse the article"
      >
        <Paragraphs count={3} />
      </Spoiler>
    </div>
  )
}

export function SpoilerControlRef() {
  const controlRef = React.useRef<HTMLButtonElement>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-4 pb-6">
      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() => controlRef.current?.focus()}
      >
        Focus the toggle
      </Button>
      <Spoiler
        maxHeight={60}
        controlRef={controlRef}
        showLabel="Show more"
        hideLabel="Hide"
      >
        <Paragraphs count={3} />
      </Spoiler>
    </div>
  )
}
