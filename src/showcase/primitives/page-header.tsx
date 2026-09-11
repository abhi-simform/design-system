import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/showcase/primitives/code-block"
import type { ComponentEntry } from "@/showcase/registry/types"

export function PageHeader({ entry }: { entry: ComponentEntry }) {
  return (
    <header className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{entry.category}</Badge>
          {entry.status === "re-export" ? (
            <Badge variant="outline">re-export</Badge>
          ) : null}
          {entry.externalDeps?.map((dep) => (
            <Badge key={dep} variant="outline" className="font-mono">
              {dep}
            </Badge>
          ))}
        </div>
        <h1 className="font-heading text-2xl font-medium tracking-tight">
          {entry.name}
        </h1>
        <p className="max-w-2xl text-sm/relaxed text-muted-foreground">
          {entry.description}
        </p>
      </div>

      <CodeBlock code={entry.importStatement} />

      <dl className="flex flex-col gap-2 text-xs">
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 text-muted-foreground">Source</dt>
          <dd className="font-mono break-all">{entry.sourcePath}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 text-muted-foreground">Exports</dt>
          <dd className="flex flex-wrap gap-1">
            {entry.exports.map((name) => (
              <code
                key={name}
                className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.6875rem]"
              >
                {name}
              </code>
            ))}
          </dd>
        </div>
      </dl>

      {entry.notes && entry.notes.length > 0 ? (
        <ul className="flex flex-col gap-1.5 rounded-lg border border-dashed px-4 py-3 text-xs/relaxed text-muted-foreground">
          {entry.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </header>
  )
}
