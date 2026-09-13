import { StarIcon } from "lucide-react"
import { cn } from "cn"

import { Center } from "@/components/ui/center"

function DemoCell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-muted/50 px-4 py-3 font-mono text-xs text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CenterPlayground({ inline }: { inline: boolean }) {
  return (
    <p className="rounded-lg border p-4">
      Some text{" "}
      <Center
        inline={inline}
        className={cn(
          "h-24 rounded-lg border bg-muted/50",
          inline ? "w-32" : "w-full",
        )}
      >
        <DemoCell>Centered content</DemoCell>
      </Center>{" "}
      more text after
    </p>
  )
}

export function CenterDefault() {
  return (
    <Center className="h-40 w-full max-w-xs rounded-lg border">
      <DemoCell>All elements inside Center are centered</DemoCell>
    </Center>
  )
}

export function CenterInline() {
  return (
    <p className="max-w-xs rounded-lg border p-4 text-sm">
      Rate this:{" "}
      <Center inline className="gap-1 align-middle">
        <StarIcon className="size-4 fill-current" />
        <span className="font-medium">4.5</span>
      </Center>{" "}
      based on 128 reviews
    </p>
  )
}

export function CenterAsSection() {
  return (
    <Center
      render={<section />}
      className="h-32 w-full max-w-xs rounded-lg border"
    >
      <DemoCell>Rendered inside a section element</DemoCell>
    </Center>
  )
}
