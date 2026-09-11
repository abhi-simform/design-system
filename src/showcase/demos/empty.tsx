import { FolderIcon, InboxIcon, PlusIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyPlayground({
  mediaVariant,
  title,
  description,
  showAction,
}: {
  mediaVariant: "default" | "icon"
  title: string
  description: string
  showAction: boolean
}) {
  return (
    <Empty className="w-full border">
      <EmptyHeader>
        <EmptyMedia variant={mediaVariant}>
          <InboxIcon className={mediaVariant === "default" ? "size-8" : ""} />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {showAction ? (
        <EmptyContent>
          <Button size="sm">
            <PlusIcon data-icon="inline-start" />
            New project
          </Button>
        </EmptyContent>
      ) : null}
    </Empty>
  )
}

export function EmptyMediaVariants() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia>
            <FolderIcon className="size-8 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>variant=&quot;default&quot;</EmptyTitle>
          <EmptyDescription>
            The icon sits bare on the background.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderIcon />
          </EmptyMedia>
          <EmptyTitle>variant=&quot;icon&quot;</EmptyTitle>
          <EmptyDescription>
            The icon gets a muted rounded tile.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}

export function EmptyWithActions() {
  return (
    <Empty className="w-full border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>
          Nothing matched that query. Try a broader term, or{" "}
          <a href="#/components/command">open the command palette</a>.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Clear filters
          </Button>
          <Button size="sm">Browse all</Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}

export function EmptyMinimal() {
  return (
    <Empty className="w-full border-2 border-dashed">
      <EmptyHeader>
        <EmptyTitle>Nothing here yet</EmptyTitle>
      </EmptyHeader>
    </Empty>
  )
}
