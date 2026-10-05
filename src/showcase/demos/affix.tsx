import * as React from "react"
import { ArrowUpIcon } from "lucide-react"

import { Affix } from "@/components/ui/affix"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Transition } from "@/components/ui/transition"

/**
 * transform-gpu makes this box the containing block for a `position: fixed`
 * descendant (a transformed ancestor takes over that role per spec), so an
 * Affix rendered with `withinPortal={false}` inside it stays trapped here
 * instead of covering the real page — safe to demo live in the docs.
 */
function DemoSurface({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative isolate h-56 w-full transform-gpu overflow-hidden rounded-lg border bg-muted/30">
      {children}
    </div>
  )
}

export function AffixPlayground({
  position,
  spacing,
}: {
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  spacing: number
}) {
  const [vertical, horizontal] = position.split("-") as [
    "top" | "bottom",
    "left" | "right",
  ]

  return (
    <DemoSurface>
      <Affix
        withinPortal={false}
        position={{ [vertical]: spacing, [horizontal]: spacing }}
      >
        <Button size="sm">Affixed</Button>
      </Affix>
    </DemoSurface>
  )
}

export function AffixBasic() {
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = React.useState(false)

  return (
    <div className="relative isolate h-64 w-full transform-gpu overflow-hidden rounded-lg border">
      <div
        ref={viewportRef}
        className="h-full overflow-y-auto p-4"
        onScroll={(event) => setScrolled(event.currentTarget.scrollTop > 40)}
      >
        <p className="text-sm text-muted-foreground">
          Scroll down inside this panel to reveal the affixed button.
        </p>
        <div className="h-[600px]" />
        <p className="text-sm text-muted-foreground">You reached the end.</p>
      </div>
      <Affix withinPortal={false} position={{ bottom: 16, right: 16 }}>
        <Transition transition="slide-up" mounted={scrolled}>
          {(styles) => (
            <Button
              size="icon"
              style={styles}
              aria-label="Scroll to top"
              onClick={() =>
                viewportRef.current?.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              <ArrowUpIcon />
            </Button>
          )}
        </Transition>
      </Affix>
    </div>
  )
}

export function AffixCorners() {
  return (
    <DemoSurface>
      <Affix withinPortal={false} position={{ top: 12, left: 12 }}>
        <Badge variant="secondary">top-left</Badge>
      </Affix>
      <Affix withinPortal={false} position={{ top: 12, right: 12 }}>
        <Badge variant="secondary">top-right</Badge>
      </Affix>
      <Affix withinPortal={false} position={{ bottom: 12, left: 12 }}>
        <Badge variant="secondary">bottom-left</Badge>
      </Affix>
      <Affix withinPortal={false} position={{ bottom: 12, right: 12 }}>
        <Badge variant="secondary">bottom-right</Badge>
      </Affix>
    </DemoSurface>
  )
}
