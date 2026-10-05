import * as React from "react"

import { ActionBar } from "@/components/ui/action-bar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { PaperProps } from "@/components/ui/paper"
import { Text } from "@/components/ui/text"

/**
 * transform-gpu makes this box the containing block for a `position: fixed`
 * descendant (a transformed ancestor takes over that role per spec), so an
 * ActionBar rendered with `withinPortal={false}` inside it stays trapped
 * here instead of covering the real page — safe to demo live in the docs.
 */
function DemoSurface({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative isolate h-72 w-full transform-gpu overflow-hidden rounded-lg border bg-muted/30">
      {children}
    </div>
  )
}

const FILES = [
  { id: "1", name: "Q3 roadmap.pdf" },
  { id: "2", name: "Budget.xlsx" },
  { id: "3", name: "Design specs.fig" },
  { id: "4", name: "Meeting notes.md" },
]

export function ActionBarPlayground({
  closeOnEscape,
  withBorder,
  shadow,
}: {
  closeOnEscape: boolean
  withBorder: boolean
  shadow: NonNullable<PaperProps["shadow"]>
}) {
  const [selection, setSelection] = React.useState<string[]>(["1", "2"])

  const toggle = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )

  return (
    <DemoSurface>
      <div className="flex flex-col gap-2 p-4">
        {FILES.map((file) => (
          <label
            key={file.id}
            className="flex items-center gap-2.5 rounded-md border bg-background px-3 py-2 text-sm"
          >
            <Checkbox
              checked={selection.includes(file.id)}
              onCheckedChange={() => toggle(file.id)}
            />
            {file.name}
          </label>
        ))}
      </div>
      <ActionBar
        withinPortal={false}
        opened={selection.length > 0}
        onClose={() => setSelection([])}
        closeOnEscape={closeOnEscape}
        withBorder={withBorder}
        shadow={shadow}
      >
        <Text size="sm">{selection.length} selected</Text>
        <ActionBar.Divider />
        <Button variant="ghost" size="sm">
          Archive
        </Button>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
        <ActionBar.CloseButton aria-label="Clear selection" />
      </ActionBar>
    </DemoSurface>
  )
}

export function ActionBarBasic() {
  const [selection, setSelection] = React.useState<string[]>([])

  const toggle = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )

  return (
    <DemoSurface>
      <div className="flex flex-col gap-2 p-4">
        {FILES.map((file) => (
          <label
            key={file.id}
            className="flex items-center gap-2.5 rounded-md border bg-background px-3 py-2 text-sm"
          >
            <Checkbox
              checked={selection.includes(file.id)}
              onCheckedChange={() => toggle(file.id)}
            />
            {file.name}
          </label>
        ))}
      </div>
      <ActionBar
        withinPortal={false}
        opened={selection.length > 0}
        onClose={() => setSelection([])}
      >
        <Text size="sm">{selection.length} selected</Text>
        <ActionBar.Divider />
        <Button variant="ghost" size="sm">
          Archive
        </Button>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
        <ActionBar.CloseButton aria-label="Clear selection" />
      </ActionBar>
    </DemoSurface>
  )
}

export function ActionBarEscapeToClose() {
  const [opened, setOpened] = React.useState(true)

  return (
    <DemoSurface>
      <div className="flex h-full items-center justify-center">
        <Button variant="outline" size="sm" onClick={() => setOpened(true)}>
          Show action bar
        </Button>
      </div>
      <ActionBar
        withinPortal={false}
        opened={opened}
        onClose={() => setOpened(false)}
        closeOnEscape
      >
        <Text size="sm">Press Escape or the close button</Text>
        <ActionBar.Divider />
        <ActionBar.CloseButton aria-label="Close" />
      </ActionBar>
    </DemoSurface>
  )
}
