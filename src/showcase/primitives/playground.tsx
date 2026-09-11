import * as React from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { PLAYGROUND_ANCHOR } from "@/showcase/lib/anchors"
import { CodeBlock } from "@/showcase/primitives/code-block"
import { ControlsPanel } from "@/showcase/primitives/controls-panel"
import { Preview } from "@/showcase/primitives/preview"
import type { PlaygroundDefinition } from "@/showcase/registry/types"

export function Playground({
  playground,
}: {
  playground: PlaygroundDefinition
}) {
  const [values, setValues] = React.useState(playground.defaults)
  const [remountKey, setRemountKey] = React.useState(0)

  const Component = playground.Component
  const snippet = playground.buildSnippet(values)

  return (
    <section id={PLAYGROUND_ANCHOR} className="flex scroll-mt-6 flex-col gap-3">
      <div>
        <h3 className="font-heading text-base font-medium tracking-tight">
          Playground
        </h3>
        <p className="mt-1 text-sm/relaxed text-muted-foreground">
          Change a prop and the snippet below updates with it. Props left at
          their default are omitted, so what you copy is the minimum you need.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_17rem] lg:items-start">
        <div className="flex min-w-0 flex-col gap-3">
          <Preview layout={playground.layout ?? "center"}>
            <React.Suspense fallback={<Skeleton className="h-40 w-full" />}>
              <Component key={remountKey} {...values} />
            </React.Suspense>
          </Preview>
          <CodeBlock code={snippet} />
        </div>

        <ControlsPanel
          controls={playground.controls}
          values={values}
          onChange={(key, next) =>
            setValues((current) => ({ ...current, [key]: next }))
          }
          onReset={() => setValues(playground.defaults)}
          onRemount={() => setRemountKey((current) => current + 1)}
        />
      </div>
    </section>
  )
}
