import { Separator } from "@/components/ui/separator"
import { PLAYGROUND_ANCHOR, storyAnchor } from "@/showcase/lib/anchors"
import { PageHeader } from "@/showcase/primitives/page-header"
import { Playground } from "@/showcase/primitives/playground"
import { PropTable } from "@/showcase/primitives/prop-table"
import { Story } from "@/showcase/primitives/story"
import type { ComponentEntry } from "@/showcase/registry/types"

function OnThisPage({ entry }: { entry: ComponentEntry }) {
  const items = [
    ...(entry.playground
      ? [{ id: PLAYGROUND_ANCHOR, title: "Playground" }]
      : []),
    ...entry.stories.map((story) => ({
      id: storyAnchor(story.id),
      title: story.title,
    })),
  ]

  if (items.length < 2) {
    return null
  }

  return (
    <nav className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
      <span className="font-medium">On this page</span>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#/components/${entry.id}`}
          onClick={(event) => {
            // In-page jumps must not touch the hash — a second `#` would
            // corrupt route parsing.
            event.preventDefault()
            document.getElementById(item.id)?.scrollIntoView({ block: "start" })
          }}
          className="underline-offset-4 hover:text-foreground hover:underline"
        >
          {item.title}
        </a>
      ))}
    </nav>
  )
}

export function ComponentPage({ entry }: { entry: ComponentEntry }) {
  return (
    <article className="flex flex-col gap-8">
      <PageHeader entry={entry} />
      <OnThisPage entry={entry} />
      <Separator />

      {entry.playground ? <Playground playground={entry.playground} /> : null}

      {entry.stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}

      {entry.playground ? (
        <section className="flex flex-col gap-3">
          <h3 className="font-heading text-base font-medium tracking-tight">
            Playground props
          </h3>
          <PropTable controls={entry.playground.controls} />
        </section>
      ) : null}
    </article>
  )
}
