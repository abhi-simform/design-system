import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"

const VARIANTS = [
  "default",
  "secondary",
  "muted",
  "tinted",
  "outline",
  "ghost",
  "destructive",
] as const

export function BubblePlayground({
  variant,
  align,
  children,
}: {
  variant:
    | "default"
    | "secondary"
    | "muted"
    | "tinted"
    | "outline"
    | "ghost"
    | "destructive"
  align: "start" | "end"
  children: string
}) {
  return (
    <Bubble variant={variant} align={align} className="w-full max-w-md">
      <BubbleContent>{children}</BubbleContent>
    </Bubble>
  )
}

export function BubbleVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {VARIANTS.map((variant) => (
        <Bubble key={variant} variant={variant}>
          <BubbleContent>variant=&quot;{variant}&quot;</BubbleContent>
        </Bubble>
      ))}
    </div>
  )
}

export function BubbleConversation() {
  return (
    <BubbleGroup className="w-full max-w-md">
      <Bubble align="start" variant="muted">
        <BubbleContent>How do I make a button render as a link?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>
          Pass render={"{<a href=… />}"} — Base UI uses a render prop rather
          than asChild.
        </BubbleContent>
      </Bubble>
      <Bubble align="start" variant="muted">
        <BubbleContent>That worked, thanks.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  )
}

export function BubbleAlignment() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Bubble align="start" variant="outline">
        <BubbleContent>align=&quot;start&quot;</BubbleContent>
      </Bubble>
      <Bubble align="end" variant="outline">
        <BubbleContent>align=&quot;end&quot;</BubbleContent>
      </Bubble>
    </div>
  )
}
