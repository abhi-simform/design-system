import * as React from "react"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  allEntries,
  entriesByCategory,
  searchEntries,
} from "@/showcase/registry"
import { foundationPages } from "@/showcase/registry/foundations"
import {
  componentHref,
  foundationHref,
  OVERVIEW_HREF,
  type Route,
} from "@/showcase/routing/routes"

function NavLink({
  href,
  active,
  children,
  onNavigate,
}: {
  href: string
  active: boolean
  children: React.ReactNode
  onNavigate?: () => void
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-7 items-center rounded-md px-2 text-sm transition-colors",
        active
          ? "bg-muted font-medium text-foreground"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
      )}
    >
      {children}
    </a>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 pt-4 pb-1 text-xs font-medium text-muted-foreground/70">
      {children}
    </div>
  )
}

export function ShellSidebar({
  route,
  onNavigate,
}: {
  route: Route
  onNavigate?: () => void
}) {
  const [query, setQuery] = React.useState("")
  const deferredQuery = React.useDeferredValue(query)
  const searchRef = React.useRef<HTMLInputElement>(null)

  const groups = React.useMemo(
    () => entriesByCategory(searchEntries(allEntries, deferredQuery)),
    [deferredQuery],
  )

  const matchedFoundations = React.useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase()
    if (needle === "") {
      return foundationPages
    }

    return foundationPages.filter(
      (page) =>
        page.name.toLowerCase().includes(needle) ||
        page.description.toLowerCase().includes(needle),
    )
  }, [deferredQuery])

  // `/` focuses search, mirroring the editable-target guard the theme
  // provider uses for its `d` hotkey so a slash typed into a field still types.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      const target = event.target
      if (target instanceof HTMLElement) {
        if (
          target.isContentEditable ||
          target.closest("input, textarea, select, [contenteditable='true']")
        ) {
          return
        }
      }

      event.preventDefault()
      searchRef.current?.focus()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const totalMatches =
    groups.reduce((sum, group) => sum + group.entries.length, 0) +
    matchedFoundations.length

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 px-3 pt-3 pb-1">
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search components"
            aria-label="Search components"
          />
          {query === "" ? (
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          ) : null}
        </InputGroup>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <nav className="flex flex-col px-3 pt-1 pb-8">
          <NavLink
            href={OVERVIEW_HREF}
            active={route.kind === "overview"}
            onNavigate={onNavigate}
          >
            Overview
          </NavLink>

          {matchedFoundations.length > 0 ? (
            <>
              <SectionLabel>Foundations</SectionLabel>
              {matchedFoundations.map((page) => (
                <NavLink
                  key={page.id}
                  href={foundationHref(page.id)}
                  active={route.kind === "foundation" && route.id === page.id}
                  onNavigate={onNavigate}
                >
                  {page.name}
                </NavLink>
              ))}
            </>
          ) : null}

          {groups.map((group) => (
            <React.Fragment key={group.category}>
              <SectionLabel>
                <span className="flex items-center justify-between">
                  {group.category}
                  <span className="tabular-nums opacity-70">
                    {group.entries.length}
                  </span>
                </span>
              </SectionLabel>
              {group.entries.map((entry) => (
                <NavLink
                  key={entry.id}
                  href={componentHref(entry.id)}
                  active={route.kind === "component" && route.id === entry.id}
                  onNavigate={onNavigate}
                >
                  <span className="flex-1 truncate">{entry.name}</span>
                  {entry.status === "re-export" ? (
                    <Badge variant="outline" className="ml-2 shrink-0">
                      re-export
                    </Badge>
                  ) : null}
                </NavLink>
              ))}
            </React.Fragment>
          ))}

          {totalMatches === 0 ? (
            <Empty className="mt-8 border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <SearchIcon />
                </EmptyMedia>
                <EmptyTitle>No matches</EmptyTitle>
                <EmptyDescription>
                  Nothing in the library matches “{deferredQuery}”.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : null}
        </nav>
      </ScrollArea>
    </div>
  )
}
