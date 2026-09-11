import type * as React from "react"

import { SidebarSandbox } from "@/showcase/demos/sidebar"

export type SandboxDemo = {
  id: string
  component: React.ComponentType
}

/**
 * Chrome-less routes at #/sandbox/:id. A component lands here when its real
 * behaviour needs to own a whole document — fixed positioning, window-level
 * shortcuts, persisted state — which would otherwise collide with the
 * showcase shell. The component page embeds the route in an iframe.
 */
export const sandboxDemos: readonly SandboxDemo[] = [
  { id: "sidebar", component: SidebarSandbox },
]
