import * as React from "react"
import { CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { storyAnchor } from "@/showcase/lib/anchors"
import { loadDemoSource } from "@/showcase/lib/demo-source"
import { CodeBlock } from "@/showcase/primitives/code-block"
import { Preview } from "@/showcase/primitives/preview"
import type { StoryDefinition } from "@/showcase/registry/types"

type SourceState =
  { status: "idle" } | { status: "ready"; code: string } | { status: "missing" }

export function Story({ story }: { story: StoryDefinition }) {
  const [showCode, setShowCode] = React.useState(false)
  const [source, setSource] = React.useState<SourceState>({ status: "idle" })

  const moduleId = story.sourceModule
  // Explicit only: `component.name` is unreliable once esbuild renames
  // colliding function names across the 61 bundled demo modules.
  const exportName = story.sourceExport

  const canLoad = Boolean(moduleId && exportName)

  React.useEffect(() => {
    if (!showCode || source.status !== "idle" || !moduleId || !exportName) {
      return
    }

    let cancelled = false

    loadDemoSource(moduleId, exportName).then(
      (code) => {
        if (cancelled) return
        setSource(code ? { status: "ready", code } : { status: "missing" })
      },
      () => {
        if (!cancelled) setSource({ status: "missing" })
      },
    )

    return () => {
      cancelled = true
    }
  }, [showCode, source.status, moduleId, exportName])

  const Demo = story.component

  return (
    <section
      id={storyAnchor(story.id)}
      className="flex scroll-mt-6 flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-heading text-base font-medium tracking-tight">
            {story.title}
          </h3>
          {story.description ? (
            <p className="mt-1 text-sm/relaxed text-muted-foreground">
              {story.description}
            </p>
          ) : null}
        </div>
        <Button
          variant="ghost"
          size="xs"
          aria-expanded={showCode}
          onClick={() => setShowCode((current) => !current)}
          className="shrink-0"
        >
          <CodeIcon data-icon="inline-start" />
          {showCode ? "Hide code" : "Show code"}
        </Button>
      </div>

      <Preview layout={story.layout} className={story.canvasClassName}>
        <React.Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <Demo />
        </React.Suspense>
      </Preview>

      {showCode ? (
        source.status === "ready" ? (
          <CodeBlock code={source.code} />
        ) : !canLoad || source.status === "missing" ? (
          <p className="rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground">
            Source unavailable — this story has no linked demo module.
          </p>
        ) : (
          <Skeleton className="h-24 w-full rounded-lg" />
        )
      ) : null}
    </section>
  )
}
