import * as React from "react"

import { Button } from "@/components/ui/button"
import { FloatingIndicator } from "@/components/ui/floating-indicator"
import { Transition } from "@/components/ui/transition"

const SEGMENTS = [
  { value: "overview", label: "Overview" },
  { value: "analytics", label: "Analytics" },
  { value: "reports", label: "Reports" },
]

// A fresh ref-callback closure on every render would make React re-attach it
// (and re-fire the setState inside) on every render too, looping forever —
// caching one stable callback per key avoids that.
function useTargetRefs() {
  const [targets, setTargets] = React.useState<
    Record<string, HTMLButtonElement | null>
  >({})
  const callbacks = React.useRef<
    Record<string, (node: HTMLButtonElement | null) => void>
  >({})

  const getTargetRef = React.useCallback((key: string) => {
    let callback = callbacks.current[key]
    if (!callback) {
      callback = (node) =>
        setTargets((current) =>
          current[key] === node ? current : { ...current, [key]: node },
        )
      callbacks.current[key] = callback
    }
    return callback
  }, [])

  return [targets, getTargetRef] as const
}

export function FloatingIndicatorDefault() {
  const [parent, setParent] = React.useState<HTMLDivElement | null>(null)
  const [targets, getTargetRef] = useTargetRefs()
  const [active, setActive] = React.useState("overview")

  return (
    <div
      ref={setParent}
      className="relative inline-flex gap-1 rounded-lg border bg-muted p-1"
    >
      {SEGMENTS.map((segment) => (
        <button
          key={segment.value}
          ref={getTargetRef(segment.value)}
          type="button"
          data-active={active === segment.value}
          onClick={() => setActive(segment.value)}
          className="relative z-10 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors data-[active=true]:text-foreground"
        >
          {segment.label}
        </button>
      ))}
      <FloatingIndicator
        target={targets[active]}
        parent={parent}
        className="rounded-md bg-background shadow-sm"
      />
    </div>
  )
}

const NAV_ITEMS = [
  { value: "profile", label: "Profile" },
  { value: "security", label: "Security" },
  { value: "billing", label: "Billing" },
  { value: "team", label: "Team" },
]

export function FloatingIndicatorVertical() {
  const [parent, setParent] = React.useState<HTMLDivElement | null>(null)
  const [targets, getTargetRef] = useTargetRefs()
  const [active, setActive] = React.useState("profile")

  return (
    <div
      ref={setParent}
      className="relative flex w-48 flex-col gap-0.5 rounded-lg border p-1"
    >
      {NAV_ITEMS.map((item) => (
        <button
          key={item.value}
          ref={getTargetRef(item.value)}
          type="button"
          data-active={active === item.value}
          onClick={() => setActive(item.value)}
          className="relative z-10 rounded-md px-3 py-1.5 text-left text-sm font-medium text-muted-foreground transition-colors data-[active=true]:text-foreground"
        >
          {item.label}
        </button>
      ))}
      <FloatingIndicator
        target={targets[active]}
        parent={parent}
        className="rounded-md border-l-2 border-l-primary bg-primary/10"
      />
    </div>
  )
}

export function FloatingIndicatorCallbacks() {
  const [parent, setParent] = React.useState<HTMLDivElement | null>(null)
  const [targets, getTargetRef] = useTargetRefs()
  const [active, setActive] = React.useState("overview")
  const [log, setLog] = React.useState<string[]>([])

  const pushLog = (message: string) =>
    setLog((current) => [message, ...current].slice(0, 4))

  return (
    <div className="flex w-full flex-col items-start gap-3">
      <div
        ref={setParent}
        className="relative inline-flex gap-1 rounded-lg border bg-muted p-1"
      >
        {SEGMENTS.map((segment) => (
          <button
            key={segment.value}
            ref={getTargetRef(segment.value)}
            type="button"
            data-active={active === segment.value}
            onClick={() => setActive(segment.value)}
            className="relative z-10 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors data-[active=true]:text-foreground"
          >
            {segment.label}
          </button>
        ))}
        <FloatingIndicator
          target={targets[active]}
          parent={parent}
          transitionDuration={400}
          onTransitionStart={() => pushLog("transition start")}
          onTransitionEnd={() => pushLog("transition end")}
          className="rounded-md bg-background shadow-sm"
        />
      </div>
      <div className="w-full rounded-md border bg-muted/30 p-2 font-mono text-xs text-muted-foreground">
        {log.length === 0 ? (
          <span>
            Switch segments to see onTransitionStart/onTransitionEnd fire.
          </span>
        ) : (
          log.map((entry, index) => <div key={index}>{entry}</div>)
        )}
      </div>
    </div>
  )
}

export function FloatingIndicatorDisplayAfterTransitionEnd() {
  const [mounted, setMounted] = React.useState(true)
  const [parent, setParent] = React.useState<HTMLDivElement | null>(null)
  const [targets, getTargetRef] = useTargetRefs()
  const [active, setActive] = React.useState("overview")

  return (
    <div className="flex w-full flex-col items-start gap-3">
      <Button size="sm" variant="outline" onClick={() => setMounted((m) => !m)}>
        {mounted ? "Hide" : "Show"}
      </Button>
      <Transition mounted={mounted} transition="pop" duration={300}>
        {(styles) => (
          <div
            ref={setParent}
            style={styles}
            className="relative inline-flex gap-1 rounded-lg border bg-muted p-1"
          >
            {SEGMENTS.map((segment) => (
              <button
                key={segment.value}
                ref={getTargetRef(segment.value)}
                type="button"
                data-active={active === segment.value}
                onClick={() => setActive(segment.value)}
                className="relative z-10 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors data-[active=true]:text-foreground"
              >
                {segment.label}
              </button>
            ))}
            <FloatingIndicator
              target={targets[active]}
              parent={parent}
              displayAfterTransitionEnd
              className="rounded-md bg-background shadow-sm"
            />
          </div>
        )}
      </Transition>
    </div>
  )
}
