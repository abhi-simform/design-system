import { HeartIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

export function VisuallyHiddenPlayground({ children }: { children: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Button variant="outline" size="icon">
        <HeartIcon />
        <VisuallyHidden>{children}</VisuallyHidden>
      </Button>
      <p className="text-xs text-muted-foreground">
        Screen readers announce "{children}". Sighted users only see the icon.
      </p>
    </div>
  )
}

export function VisuallyHiddenDefault() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-md border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
        Nothing to see here
        <VisuallyHidden>
          This sentence carries extra context for screen reader users only.
        </VisuallyHidden>
      </div>
      <p className="text-xs text-muted-foreground">
        Inspect the DOM, or turn on a screen reader, to find the hidden
        sentence.
      </p>
    </div>
  )
}

export function VisuallyHiddenWithIcon() {
  return (
    <Button variant="outline" size="icon">
      <HeartIcon />
      <VisuallyHidden>Like post</VisuallyHidden>
    </Button>
  )
}

export function VisuallyHiddenPolymorphic() {
  return (
    <section className="w-full max-w-sm rounded-md border border-border p-4">
      <VisuallyHidden render={<h2 />}>Notifications</VisuallyHidden>
      <ul className="flex flex-col gap-2 text-sm">
        <li>Your export is ready to download.</li>
        <li>Weekly summary sent to your inbox.</li>
      </ul>
    </section>
  )
}
