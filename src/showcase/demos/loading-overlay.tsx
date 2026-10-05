import * as React from "react"

import { Button } from "@/components/ui/button"
import { LoadingOverlay } from "@/components/ui/loading-overlay"

function DemoSurface({
  children,
  className = "h-56",
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative w-full rounded-lg border bg-card p-4 ${className}`}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="h-8 rounded-md bg-muted" />
        <div className="h-8 rounded-md bg-muted" />
        <div className="h-8 rounded-md bg-muted" />
        <div className="h-8 rounded-md bg-muted" />
      </div>
      {children}
    </div>
  )
}

export function LoadingOverlayPlayground({
  visible,
  blur,
}: {
  visible: boolean
  blur: number
}) {
  return (
    <DemoSurface>
      <LoadingOverlay visible={visible} overlayProps={{ blur }} />
    </DemoSurface>
  )
}

export function LoadingOverlayBasic() {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="flex w-full flex-col gap-3">
      <Button
        variant="outline"
        className="self-start"
        onClick={() => setVisible((v) => !v)}
      >
        Toggle overlay
      </Button>
      <DemoSurface>
        <LoadingOverlay visible={visible} />
      </DemoSurface>
    </div>
  )
}

export function LoadingOverlayAsyncAction() {
  const [loading, setLoading] = React.useState(false)

  const handleSave = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <Button className="self-start" onClick={handleSave} disabled={loading}>
        Save changes
      </Button>
      <DemoSurface>
        <LoadingOverlay visible={loading} transitionProps={{ duration: 200 }} />
      </DemoSurface>
    </div>
  )
}

export function LoadingOverlayCustomAppearance() {
  return (
    <DemoSurface>
      <LoadingOverlay
        visible
        overlayProps={{ radius: "lg", blur: 2 }}
        loaderProps={{ className: "size-10 text-primary" }}
      />
    </DemoSurface>
  )
}
