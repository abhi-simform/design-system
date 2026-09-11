import { GitCommitIcon, InfoIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

export function MarkerPlayground({
  variant,
  children,
}: {
  variant: "default" | "separator" | "border"
  children: string
}) {
  return (
    <Marker variant={variant} className="w-full max-w-md">
      <MarkerContent>{children}</MarkerContent>
    </Marker>
  )
}

export function MarkerVariants() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Marker>
        <MarkerContent>default — plain muted label</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>separator — rules on both sides</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>border — an underline beneath</MarkerContent>
      </Marker>
    </div>
  )
}

export function MarkerWithIcon() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Marker>
        <MarkerIcon>
          <GitCommitIcon />
        </MarkerIcon>
        <MarkerContent>Deployed a1b2c3d to production</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <InfoIcon />
        </MarkerIcon>
        <MarkerContent>Three items need review</MarkerContent>
      </Marker>
    </div>
  )
}

export function MarkerAsTimelineDivider() {
  return (
    <div className="flex w-full flex-col gap-4 text-sm">
      <p>Rewrote the token pipeline.</p>
      <Marker variant="separator">
        <MarkerContent>Yesterday</MarkerContent>
      </Marker>
      <p>Added the showcase shell.</p>
      <Marker variant="separator">
        <MarkerContent>Last week</MarkerContent>
      </Marker>
      <p>Initial commit.</p>
    </div>
  )
}
