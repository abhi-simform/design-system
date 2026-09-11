import * as React from "react"

import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ComponentPage } from "@/showcase/app/component-page"
import { NotFoundPage } from "@/showcase/app/not-found-page"
import { OverviewPage } from "@/showcase/app/overview-page"
import { SandboxPage } from "@/showcase/app/sandbox-page"
import { ShellHeader } from "@/showcase/app/shell-header"
import { ShellSidebar } from "@/showcase/app/shell-sidebar"
import { getEntry } from "@/showcase/registry"
import { getFoundation } from "@/showcase/registry/foundations"
import { routeKey, type Route } from "@/showcase/routing/routes"
import { useHashRoute } from "@/showcase/routing/use-hash-route"

/** Sandbox is handled by `Shell` before this point, so it is excluded here. */
function RoutedPage({ route }: { route: Exclude<Route, { kind: "sandbox" }> }) {
  if (route.kind === "overview") {
    return <OverviewPage />
  }

  if (route.kind === "component") {
    const entry = getEntry(route.id)

    if (!entry) {
      return <NotFoundPage hash={`#/components/${route.id}`} />
    }

    // Keyed on the id: without this the page keeps its position in the
    // tree across routes, so the playground's useState(defaults) would
    // still hold the previous component's control values.
    return <ComponentPage key={entry.id} entry={entry} />
  }

  if (route.kind === "foundation") {
    const page = getFoundation(route.id)

    if (!page) {
      return <NotFoundPage hash={`#/foundations/${route.id}`} />
    }

    const Body = page.component

    return (
      <article className="flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="font-heading text-2xl font-medium tracking-tight">
            {page.name}
          </h1>
          <p className="max-w-2xl text-sm/relaxed text-muted-foreground">
            {page.description}
          </p>
        </header>
        <Body />
      </article>
    )
  }

  return <NotFoundPage hash={route.hash} />
}

function Shell() {
  const route = useHashRoute()
  const isMobile = useIsMobile()
  const stageRef = React.useRef<HTMLElement>(null)
  const key = routeKey(route)

  // Adjusting state during render rather than in an effect: the mobile nav is
  // only open for the route it was opened on, so back/forward closes it too.
  const [nav, setNav] = React.useState({ open: false, key })
  const navOpen = nav.key === key && nav.open
  const setNavOpen = React.useCallback(
    (open: boolean) => setNav({ open, key }),
    [key],
  )

  React.useLayoutEffect(() => {
    stageRef.current?.scrollTo({ top: 0 })
  }, [key])

  // The sandbox route is chrome-less by design: it exists so a component can
  // own an entire document.
  if (route.kind === "sandbox") {
    return <SandboxPage id={route.id} />
  }

  return (
    // Floating shell: the page itself is the tinted surface and the header,
    // sidebar and stage sit on top of it as detached panels. The tint has to
    // flip direction per theme — in light the page is a grey behind white
    // panels, in dark the page is the darkest layer and the panels lift above
    // it — which is why both halves carry an explicit dark: counterpart.
    <div className="min-h-svh bg-muted dark:bg-background">
      <ShellHeader onOpenNav={() => setNavOpen(true)} />

      {/* Geometry: 12px inset, 56px header, 12px gap → panels start at 80px
          (top-20) and the stage clears the rail at 12 + 256 + 12 = 17.5rem.

          `hidden md:block` is the source of truth for layout — `useIsMobile`
          reports false on its very first render, so it only decides which nav
          to mount, never whether the stage is inset. */}
      <aside className="fixed top-20 bottom-3 left-3 z-30 hidden w-64 overflow-hidden rounded-xl border bg-background shadow-sm md:block dark:bg-card">
        <ShellSidebar route={route} />
      </aside>

      {isMobile ? (
        // Keyed on the route: closing normally (Escape, backdrop) animates
        // out, but a navigation unmounts the sheet outright. Base UI removes
        // a popup on transitionend, and if that never arrives the invisible
        // overlay keeps pointer-events and strands the page underneath.
        <Sheet key={key} open={navOpen} onOpenChange={setNavOpen}>
          <SheetContent side="left" className="w-72 p-0 pt-12">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <ShellSidebar route={route} onNavigate={() => setNavOpen(false)} />
          </SheetContent>
        </Sheet>
      ) : null}

      <main
        ref={stageRef}
        className="fixed inset-x-3 top-20 bottom-3 overflow-y-auto rounded-xl border bg-background shadow-sm md:left-[17.5rem] dark:bg-card"
      >
        {/* max-w-5xl rather than 4xl: prose already caps itself at
            max-w-2xl, so the extra width only benefits wide previews —
            charts, tables, and the Sidebar shell iframe, which needs to
            clear 768px to show its desktop presentation. */}
        <div className="mx-auto w-full max-w-5xl px-4 py-10 md:px-8">
          <RoutedPage route={route} />
        </div>
      </main>
    </div>
  )
}

export function ShowcaseApp() {
  return (
    <TooltipProvider delay={200}>
      <Toaster>
        <Shell />
      </Toaster>
    </TooltipProvider>
  )
}
