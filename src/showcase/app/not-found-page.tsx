import { CompassIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { allEntries } from "@/showcase/registry"
import { componentHref, OVERVIEW_HREF } from "@/showcase/routing/routes"

/** Cheap "did you mean" — substring hits, then shortest-name first. */
function suggestionsFor(hash: string) {
  const needle = hash.replace(/[^a-z-]/gi, "").toLowerCase()

  if (needle.length < 2) {
    return []
  }

  return allEntries
    .filter((entry) => entry.id.includes(needle) || needle.includes(entry.id))
    .slice(0, 3)
}

export function NotFoundPage({ hash }: { hash: string }) {
  const suggestions = suggestionsFor(hash)

  return (
    <Empty className="border py-16">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CompassIcon />
        </EmptyMedia>
        <EmptyTitle>Nothing lives here</EmptyTitle>
        <EmptyDescription>
          <span className="font-mono text-xs">{hash || "#/"}</span> doesn&apos;t
          match a page in this showcase.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {suggestions.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((entry) => (
              <Button
                key={entry.id}
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<a href={componentHref(entry.id)} />}
              >
                {entry.name}
              </Button>
            ))}
          </div>
        ) : null}
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={<a href={OVERVIEW_HREF} />}
        >
          Back to overview
        </Button>
      </EmptyContent>
    </Empty>
  )
}
