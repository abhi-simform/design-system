import * as React from "react"

import { cn } from "@/lib/utils"
import { DirectionProvider } from "@/components/ui/direction"
import { Button } from "@/components/ui/button"
import { stopSingleCharKeys } from "@/showcase/lib/keyboard"
import type { StoryLayout } from "@/showcase/registry/types"

/** Literal class strings, so Tailwind's scanner sees every one verbatim. */
const LAYOUT_CLASS: Record<StoryLayout, string> = {
  center: "flex min-h-56 items-center justify-center p-8",
  stack: "flex min-h-56 flex-col items-start gap-4 p-8",
  stretch: "block p-8",
  full: "block p-0",
}

export function Preview({
  layout = "center",
  className,
  toolbar,
  children,
}: {
  layout?: StoryLayout
  className?: string
  toolbar?: React.ReactNode
  children: React.ReactNode
}) {
  const [direction, setDirection] = React.useState<"ltr" | "rtl">("ltr")

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-end gap-1 border-b bg-muted/30 px-2 py-1.5">
        {toolbar}
        <Button
          variant="ghost"
          size="xs"
          aria-pressed={direction === "rtl"}
          onClick={() =>
            setDirection((current) => (current === "ltr" ? "rtl" : "ltr"))
          }
          title="Toggle reading direction"
          className="font-mono"
        >
          {direction}
        </Button>
      </div>
      {/* `dir` on the DOM drives Tailwind's rtl: variants and CSS logical
          properties; the provider drives Base UI's JS-positioned popups. */}
      <DirectionProvider direction={direction}>
        <div
          dir={direction}
          onKeyDown={stopSingleCharKeys}
          className={cn(
            "overflow-x-auto bg-card",
            LAYOUT_CLASS[layout],
            className,
          )}
        >
          {children}
        </div>
      </DirectionProvider>
    </div>
  )
}
