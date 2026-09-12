import * as React from "react"
import { cn } from "cn"

import { Label } from "@/components/ui/label"
import { OptionalPortal, Portal } from "@/components/ui/portal"
import { Switch } from "@/components/ui/switch"

function ClipTrap({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative h-24 w-full overflow-hidden rounded-md border border-dashed border-border bg-muted/30 p-4">
      <p className="text-xs text-muted-foreground">
        This box clips anything positioned outside its bounds.
      </p>
      {children}
    </div>
  )
}

function FloatingNote({ portaled }: { portaled: boolean }) {
  return (
    <div
      className={cn(
        "z-50 w-64 rounded-md border bg-popover p-3 text-sm text-popover-foreground shadow-lg",
        portaled ? "fixed right-4 bottom-4" : "absolute -bottom-6 left-4",
      )}
    >
      {portaled
        ? "Declared inside the box above, but portaled out — nothing clips it."
        : "Not portaled — the box above clips this note."}
    </div>
  )
}

export function PortalPlayground({ withinPortal }: { withinPortal: boolean }) {
  return (
    <ClipTrap>
      <OptionalPortal withinPortal={withinPortal}>
        <FloatingNote portaled={withinPortal} />
      </OptionalPortal>
    </ClipTrap>
  )
}

export function PortalDefault() {
  return (
    <ClipTrap>
      <Portal>
        <FloatingNote portaled />
      </Portal>
    </ClipTrap>
  )
}

export function PortalCustomTarget() {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null)

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="rounded-md border border-dashed border-border p-4 text-xs text-muted-foreground">
        This <code>Portal</code> is declared here, with <code>target</code>{" "}
        pointing at the box below.
        {container && (
          <Portal target={container}>
            <p className="mt-2 text-sm font-medium text-foreground">
              Rendered inside the target box below, not here.
            </p>
          </Portal>
        )}
      </div>
      <div
        ref={setContainer}
        className="min-h-16 rounded-md border-2 border-dashed border-primary/60 p-4 text-xs text-muted-foreground"
      >
        target container
      </div>
    </div>
  )
}

export function PortalOptionalToggle() {
  const [withinPortal, setWithinPortal] = React.useState(true)

  return (
    <div className="flex w-full flex-col gap-4">
      <Label className="gap-2.5">
        <Switch checked={withinPortal} onCheckedChange={setWithinPortal} />
        withinPortal
      </Label>

      <ClipTrap>
        <OptionalPortal withinPortal={withinPortal}>
          <FloatingNote portaled={withinPortal} />
        </OptionalPortal>
      </ClipTrap>
    </div>
  )
}
