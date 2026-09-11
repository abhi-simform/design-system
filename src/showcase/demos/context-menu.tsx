import * as React from "react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

function Target({ label }: { label: string }) {
  return (
    <div className="flex h-36 w-full max-w-sm items-center justify-center rounded-xl border-2 border-dashed text-sm text-muted-foreground">
      {label}
    </div>
  )
}

export function ContextMenuPlayground({
  inset,
  showShortcuts,
}: {
  inset: boolean
  showShortcuts: boolean
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger render={<Target label="Right-click here" />} />
      <ContextMenuContent>
        <ContextMenuItem inset={inset}>
          Back
          {showShortcuts ? <ContextMenuShortcut>⌘[</ContextMenuShortcut> : null}
        </ContextMenuItem>
        <ContextMenuItem inset={inset}>
          Forward
          {showShortcuts ? <ContextMenuShortcut>⌘]</ContextMenuShortcut> : null}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset={inset} variant="destructive">
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuBasic() {
  return (
    <ContextMenu>
      <ContextMenuTrigger render={<Target label="Right-click this area" />} />
      <ContextMenuContent>
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuWithSelection() {
  const [bookmarks, setBookmarks] = React.useState(true)
  const [urls, setUrls] = React.useState(false)
  const [person, setPerson] = React.useState("ada")

  return (
    <ContextMenu>
      <ContextMenuTrigger render={<Target label="Checkboxes and radios" />} />
      <ContextMenuContent className="w-56">
        <ContextMenuLabel>Appearance</ContextMenuLabel>
        <ContextMenuCheckboxItem
          checked={bookmarks}
          onCheckedChange={setBookmarks}
        >
          Show bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={urls} onCheckedChange={setUrls}>
          Show full URLs
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>People</ContextMenuLabel>
        <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
          <ContextMenuRadioItem value="ada">Ada Lovelace</ContextMenuRadioItem>
          <ContextMenuRadioItem value="grace">
            Grace Hopper
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuWithSubmenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger render={<Target label="Has a submenu" />} />
      <ContextMenuContent className="w-52">
        <ContextMenuGroup>
          <ContextMenuItem>Open</ContextMenuItem>
          <ContextMenuItem>Rename</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Copy link</ContextMenuItem>
            <ContextMenuItem>Email</ContextMenuItem>
            <ContextMenuItem>Message</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}
