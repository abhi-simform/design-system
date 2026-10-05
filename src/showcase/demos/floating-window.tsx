import * as React from "react"
import { GripVerticalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CloseButton } from "@/components/ui/close-button"
import { FloatingWindow } from "@/components/ui/floating-window"
import type { PaperProps } from "@/components/ui/paper"
import { Text } from "@/components/ui/text"

/**
 * FloatingWindow computes drag position from real pointer coordinates and
 * clamps against the real `window` dimensions, so — unlike Affix/ActionBar,
 * which only ever write a static position — it can't be trapped inside a
 * transformed preview box without the drag math going out of sync with
 * where the element actually renders. Each story instead stays closed until
 * triggered, portals to `document.body` for real, and is closed again from
 * its own header, the same trigger-then-portal pattern the Toast and Dialog
 * demos use.
 */
function DemoSurface({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-40 w-full items-center justify-center rounded-lg border bg-muted/30">
      {children}
    </div>
  )
}

export function FloatingWindowPlayground({
  withBorder,
  shadow,
  constrainToViewport,
  axis,
}: {
  withBorder: boolean
  shadow: NonNullable<PaperProps["shadow"]>
  constrainToViewport: boolean
  axis: "both" | "x" | "y"
}) {
  const [opened, setOpened] = React.useState(false)

  return (
    <DemoSurface>
      <Button size="sm" onClick={() => setOpened(true)} disabled={opened}>
        {opened ? "Floating window is open" : "Show floating window"}
      </Button>
      {opened && (
        <FloatingWindow
          withBorder={withBorder}
          shadow={shadow}
          constrainToViewport={constrainToViewport}
          axis={axis === "both" ? undefined : axis}
          initialPosition={{ top: 96, left: 96 }}
          className="w-64 cursor-move p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <Text size="sm" fw={500}>
              Drag me around
            </Text>
            <CloseButton size="sm" onClick={() => setOpened(false)} />
          </div>
          <Text size="sm" dimmed className="mt-1.5">
            The entire card is a drag target.
          </Text>
        </FloatingWindow>
      )}
    </DemoSurface>
  )
}

export function FloatingWindowBasic() {
  const [opened, setOpened] = React.useState(false)

  return (
    <DemoSurface>
      <Button size="sm" onClick={() => setOpened(true)} disabled={opened}>
        {opened ? "Floating window is open" : "Show floating window"}
      </Button>
      {opened && (
        <FloatingWindow
          withBorder
          shadow="sm"
          initialPosition={{ top: 96, left: 96 }}
          className="w-56 cursor-move p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <Text size="sm" fw={500}>
              Drag anywhere
            </Text>
            <CloseButton size="sm" onClick={() => setOpened(false)} />
          </div>
          <Text size="sm" dimmed className="mt-1.5">
            No drag handle is configured, so the whole element is draggable.
          </Text>
        </FloatingWindow>
      )}
    </DemoSurface>
  )
}

export function FloatingWindowResizable() {
  const [opened, setOpened] = React.useState(false)

  return (
    <DemoSurface>
      <Button size="sm" onClick={() => setOpened(true)} disabled={opened}>
        {opened ? "Floating window is open" : "Show floating window"}
      </Button>
      {opened && (
        <FloatingWindow
          withBorder
          shadow="sm"
          dragHandleSelector=".floating-window-demo-handle"
          initialPosition={{ top: 96, right: 96 }}
          dimensions={{
            initialWidth: 260,
            minWidth: 180,
            maxWidth: 420,
            initialHeight: 160,
            minHeight: 120,
            maxHeight: 300,
          }}
          className="overflow-hidden p-0"
        >
          <div className="floating-window-demo-handle flex cursor-move items-center gap-1.5 border-b px-3 py-2">
            <GripVerticalIcon className="size-3.5 text-muted-foreground" />
            <Text size="sm" fw={500} className="flex-1">
              Drag the header, resize the corner
            </Text>
            <CloseButton size="sm" onClick={() => setOpened(false)} />
          </div>
          <Text size="sm" dimmed className="p-3">
            Use Arrow keys on the resize handle for keyboard resizing.
          </Text>
          <FloatingWindow.ResizeHandle className="absolute right-0 bottom-0 flex size-5 items-center justify-center rounded-tl-md hover:bg-muted">
            <div className="size-2 border-r-2 border-b-2 border-muted-foreground" />
          </FloatingWindow.ResizeHandle>
        </FloatingWindow>
      )}
    </DemoSurface>
  )
}
