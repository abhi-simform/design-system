import * as React from "react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Overlay } from "@/components/ui/overlay"

/**
 * transform-gpu establishes this element as the containing block for any
 * `position: fixed` descendant (a transformed ancestor takes over that role
 * per spec), so a fixed Overlay inside it fills this box instead of the real
 * viewport — safe to toggle live in a docs page.
 */
function DemoSurface({
  caption = true,
  children,
}: {
  caption?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className="relative isolate flex h-56 w-full transform-gpu items-center justify-center overflow-hidden rounded-lg border bg-gradient-to-br from-blue via-purple to-pink">
      {caption && (
        <p className="px-8 text-center text-sm font-medium text-white">
          Background content sitting underneath the overlay
        </p>
      )}
      {children}
    </div>
  )
}

export function OverlayPlayground({
  color,
  backgroundOpacity,
  blur,
  radius,
  center,
  fixed,
}: {
  color: string
  backgroundOpacity: number
  blur: number
  radius: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full"
  center: boolean
  fixed: boolean
}) {
  return (
    <DemoSurface caption={!center}>
      <Overlay
        color={color}
        backgroundOpacity={backgroundOpacity}
        blur={blur}
        radius={radius}
        center={center}
        fixed={fixed}
      >
        {center && (
          <p className="px-4 text-center text-sm font-medium text-white">
            Centered content
          </p>
        )}
      </Overlay>
    </DemoSurface>
  )
}

export function OverlayBasic() {
  const [visible, setVisible] = React.useState(true)

  return (
    <div className="flex w-full flex-col gap-3">
      <Button
        variant="outline"
        className="self-start"
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? "Hide" : "Show"} overlay
      </Button>
      <DemoSurface>{visible && <Overlay />}</DemoSurface>
    </div>
  )
}

export function OverlayGradient() {
  return (
    <DemoSurface caption={false}>
      <Overlay
        gradient="linear-gradient(145deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0) 60%)"
        center
      >
        <p className={cn("px-4 text-center text-sm font-medium text-white")}>
          gradient overrides color and backgroundOpacity
        </p>
      </Overlay>
    </DemoSurface>
  )
}

export function OverlayBlur() {
  return (
    <DemoSurface caption={false}>
      <Overlay color="#000" backgroundOpacity={0.15} blur={6} center>
        <p className="rounded-md bg-black/40 px-4 py-2 text-sm font-medium text-white">
          Blurred backdrop, low background opacity
        </p>
      </Overlay>
    </DemoSurface>
  )
}

export function OverlayFixed() {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="flex w-full flex-col gap-3">
      <Button
        variant="outline"
        className="self-start"
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? "Hide" : "Show"} fixed overlay
      </Button>
      <DemoSurface caption={!visible}>
        {visible && (
          <Overlay fixed center backgroundOpacity={0.7}>
            <p className="px-4 text-center text-sm font-medium text-white">
              fixed, but trapped inside this box by its transform-gpu ancestor
            </p>
          </Overlay>
        )}
      </DemoSurface>
    </div>
  )
}
