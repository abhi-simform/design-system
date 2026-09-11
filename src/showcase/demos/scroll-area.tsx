import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const TAGS = Array.from(
  { length: 30 },
  (_, index) => `v1.2.0-beta.${30 - index}`,
)

export function ScrollAreaPlayground({
  height,
}: {
  height: "sm" | "md" | "lg"
}) {
  const HEIGHT_CLASS = {
    sm: "h-32",
    md: "h-48",
    lg: "h-72",
  } as const

  return (
    <ScrollArea className={cn("w-56 rounded-lg border", HEIGHT_CLASS[height])}>
      <div className="p-3">
        {TAGS.map((tag) => (
          <div key={tag}>
            <div className="py-1.5 font-mono text-xs">{tag}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export function ScrollAreaVertical() {
  return (
    <ScrollArea className="h-56 w-56 rounded-lg border">
      <div className="p-3">
        <div className="mb-2 text-sm font-medium">Tags</div>
        {TAGS.map((tag) => (
          <div key={tag}>
            <div className="py-1.5 font-mono text-xs">{tag}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export function ScrollAreaHorizontal() {
  return (
    <ScrollArea className="w-full max-w-md rounded-lg border whitespace-nowrap">
      <div className="flex gap-3 p-3">
        {Array.from({ length: 12 }, (_, index) => (
          <div
            key={index}
            className="flex size-24 shrink-0 items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground"
          >
            {index + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
