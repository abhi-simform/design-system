import * as React from "react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { TransitionName } from "@/components/ui/transition"
import { Transition } from "@/components/ui/transition"

function Box({
  styles,
  className,
  children = "Content",
}: {
  styles: React.CSSProperties
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      style={styles}
      className={cn(
        "flex h-16 w-48 items-center justify-center rounded-md border bg-card text-sm font-medium text-card-foreground shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function TransitionPlayground({
  transition,
  duration,
}: {
  transition: TransitionName
  duration: number
}) {
  const [mounted, setMounted] = React.useState(true)

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Button variant="outline" onClick={() => setMounted((v) => !v)}>
        Toggle mounted
      </Button>
      <div className="flex h-24 w-full items-center justify-center">
        <Transition
          mounted={mounted}
          transition={transition}
          duration={duration}
        >
          {(styles) => <Box styles={styles} />}
        </Transition>
      </div>
    </div>
  )
}

export function TransitionDefault() {
  const [mounted, setMounted] = React.useState(true)

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Button variant="outline" onClick={() => setMounted((v) => !v)}>
        Toggle mounted
      </Button>
      <div className="flex h-24 w-full items-center justify-center">
        <Transition mounted={mounted}>
          {(styles) => <Box styles={styles} />}
        </Transition>
      </div>
    </div>
  )
}

const GALLERY_PRESETS: TransitionName[] = [
  "fade",
  "scale",
  "slide-up",
  "pop",
  "rotate-left",
  "skew-down",
]

export function TransitionPresetGallery() {
  const [preset, setPreset] = React.useState<TransitionName>("fade")
  const [mounted, setMounted] = React.useState(true)

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        {GALLERY_PRESETS.map((name) => (
          <Button
            key={name}
            size="sm"
            variant={preset === name ? "default" : "outline"}
            onClick={() => setPreset(name)}
          >
            {name}
          </Button>
        ))}
      </div>
      <Button variant="outline" onClick={() => setMounted((v) => !v)}>
        Toggle mounted
      </Button>
      <div className="flex h-24 w-full items-center justify-center">
        <Transition mounted={mounted} transition={preset}>
          {(styles) => <Box styles={styles}>{preset}</Box>}
        </Transition>
      </div>
    </div>
  )
}

export function TransitionCustom() {
  const [mounted, setMounted] = React.useState(true)

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <p className="text-center text-xs text-muted-foreground">
        transition is a raw {`{ in, out, transitionProperty }`} object here, not
        one of the built-in preset names.
      </p>
      <Button variant="outline" onClick={() => setMounted((v) => !v)}>
        Toggle mounted
      </Button>
      <div className="flex h-24 w-full items-center justify-center">
        <Transition
          mounted={mounted}
          duration={400}
          transition={{
            in: { opacity: 1, transform: "rotate(0deg) scale(1)" },
            out: { opacity: 0, transform: "rotate(45deg) scale(0.5)" },
            transitionProperty: "opacity, transform",
          }}
        >
          {(styles) => <Box styles={styles} />}
        </Transition>
      </div>
    </div>
  )
}

export function TransitionDelays() {
  const [mounted, setMounted] = React.useState(true)

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <p className="text-center text-xs text-muted-foreground">
        enterDelay waits 300ms before animating in; exitDelay waits 300ms before
        animating out.
      </p>
      <Button variant="outline" onClick={() => setMounted((v) => !v)}>
        Toggle mounted
      </Button>
      <div className="flex h-24 w-full items-center justify-center">
        <Transition
          mounted={mounted}
          transition="slide-up"
          enterDelay={300}
          exitDelay={300}
        >
          {(styles) => <Box styles={styles} />}
        </Transition>
      </div>
    </div>
  )
}

export function TransitionKeepMounted() {
  const [mounted, setMounted] = React.useState(true)

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Label className="gap-2.5">
        <Switch checked={mounted} onCheckedChange={setMounted} />
        mounted
      </Label>
      <p className="text-center text-xs text-muted-foreground">
        keepMounted keeps the box in the DOM even while hidden — inspect the
        element tree to see it stays mounted after toggling off.
      </p>
      <div className="flex h-24 w-full items-center justify-center">
        <Transition mounted={mounted} keepMounted transition="fade">
          {(styles) => <Box styles={styles} />}
        </Transition>
      </div>
    </div>
  )
}

export function TransitionLifecycle() {
  const [mounted, setMounted] = React.useState(true)
  const [events, setEvents] = React.useState<string[]>([])

  const log = (event: string) => setEvents((prev) => [...prev.slice(-4), event])

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Button variant="outline" onClick={() => setMounted((v) => !v)}>
        Toggle mounted
      </Button>
      <div className="flex h-24 w-full items-center justify-center">
        <Transition
          mounted={mounted}
          transition="scale"
          onEnter={() => log("onEnter")}
          onEntered={() => log("onEntered")}
          onExit={() => log("onExit")}
          onExited={() => log("onExited")}
        >
          {(styles) => <Box styles={styles} />}
        </Transition>
      </div>
      <ul className="h-24 w-48 space-y-0.5 overflow-y-auto rounded-md border bg-muted/30 p-2 font-mono text-xs text-muted-foreground">
        {events.length === 0 && <li>No events yet</li>}
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  )
}
