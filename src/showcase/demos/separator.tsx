import { Separator } from "@/components/ui/separator"

export function SeparatorPlayground({
  orientation,
}: {
  orientation: "horizontal" | "vertical"
}) {
  if (orientation === "vertical") {
    return (
      <div className="flex h-16 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
        <Separator orientation="vertical" />
        <span>Issues</span>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 text-sm">
      <span>Above the line</span>
      <Separator />
      <span>Below the line</span>
    </div>
  )
}

export function SeparatorHorizontal() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col gap-1">
        <span className="font-heading text-sm font-medium">Base UI</span>
        <span className="text-sm text-muted-foreground">
          Unstyled accessible primitives.
        </span>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Blog</span>
        <Separator orientation="vertical" />
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  )
}

export function SeparatorVertical() {
  return (
    <div className="flex h-24 items-stretch gap-4 text-sm">
      <div className="flex items-center px-2">Left</div>
      <Separator orientation="vertical" />
      <div className="flex items-center px-2">Right</div>
    </div>
  )
}
