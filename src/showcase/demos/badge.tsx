import { CheckIcon, CircleDotIcon, XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export function BadgePlayground({
  variant,
  children,
}: {
  variant:
    "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  children: string
}) {
  return <Badge variant={variant}>{children}</Badge>
}

export function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  )
}

export function BadgeWithIcons() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>
        <CheckIcon data-icon="inline-start" />
        Shipped
      </Badge>
      <Badge variant="secondary">
        <CircleDotIcon data-icon="inline-start" />
        In review
      </Badge>
      <Badge variant="destructive">
        <XIcon data-icon="inline-start" />
        Failed
      </Badge>
    </div>
  )
}

export function BadgeAsLink() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge render={<a href="#/components/button" />}>Linked badge</Badge>
      <Badge variant="outline" render={<a href="#/foundations/colors" />}>
        Tokens
      </Badge>
    </div>
  )
}

export function BadgeCounts() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge className="min-w-5 px-1 tabular-nums">3</Badge>
      <Badge variant="secondary" className="min-w-5 px-1 tabular-nums">
        24
      </Badge>
      <Badge variant="outline" className="min-w-5 px-1 tabular-nums">
        99+
      </Badge>
    </div>
  )
}
