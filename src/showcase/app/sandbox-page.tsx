import { sandboxDemos } from "@/showcase/registry/sandboxes"
import { NotFoundPage } from "@/showcase/app/not-found-page"

/**
 * A chrome-less route. Components whose real behavior depends on owning the
 * whole viewport — Sidebar above all — are embedded from their component page
 * as an iframe pointing here, so their `fixed` positioning, global shortcuts
 * and persisted state exercise a document of their own instead of fighting
 * the showcase shell.
 */
export function SandboxPage({ id }: { id: string }) {
  const demo = sandboxDemos.find((entry) => entry.id === id)

  if (!demo) {
    return (
      <div className="p-6">
        <NotFoundPage hash={`#/sandbox/${id}`} />
      </div>
    )
  }

  const Demo = demo.component

  return <Demo />
}
