import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { allEntries, entriesByCategory } from "@/showcase/registry"
import { foundationPages } from "@/showcase/registry/foundations"
import { componentHref, foundationHref } from "@/showcase/routing/routes"

export function OverviewPage() {
  const groups = entriesByCategory(allEntries)

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <Badge variant="secondary" className="w-fit">
          {allEntries.length} components
        </Badge>
        <h1 className="font-heading text-3xl font-medium tracking-tight text-balance">
          A showcase of every component in the system
        </h1>
        <p className="max-w-2xl text-sm/relaxed text-muted-foreground">
          Built on Base UI with Tailwind v4 and class-variance-authority. Each
          page renders every variant, size and state a component supports, plus
          a live playground whose generated JSX you can copy straight into your
          app. Press <span className="font-mono text-xs">/</span> to search and{" "}
          <span className="font-mono text-xs">d</span> to flip the theme.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-lg font-medium tracking-tight">
          Foundations
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {foundationPages.map((page) => (
            <a
              key={page.id}
              href={foundationHref(page.id)}
              className="rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Card className="h-full transition-colors hover:border-foreground/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-1.5">
                    {page.name}
                    <ArrowRightIcon className="size-3.5 opacity-50" />
                  </CardTitle>
                  <CardDescription>{page.description}</CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {groups.map((group) => (
        <section key={group.category} className="flex flex-col gap-4">
          <h2 className="flex items-baseline gap-2 font-heading text-lg font-medium tracking-tight">
            {group.category}
            <span className="text-sm font-normal text-muted-foreground tabular-nums">
              {group.entries.length}
            </span>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {group.entries.map((entry) => (
              <a
                key={entry.id}
                href={componentHref(entry.id)}
                className="group flex flex-col gap-1 rounded-lg border px-4 py-3 transition-colors outline-none hover:border-foreground/20 hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span className="text-sm font-medium">{entry.name}</span>
                <span className="line-clamp-2 text-xs/relaxed text-muted-foreground">
                  {entry.description}
                </span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
