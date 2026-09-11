import type * as React from "react"

import type { AnyControl, ControlPrimitive } from "@/showcase/lib/controls"

export type StoryLayout = "center" | "stack" | "stretch" | "full"

export type StoryDefinition = {
  /** URL-safe and unique within its entry; used as the heading anchor. */
  id: string
  title: string
  description?: string
  /**
   * A component, never an inline JSX closure — this keeps every registry entry
   * file free of JSX, and therefore a `.ts` data-only module (see the
   * `react-refresh/only-export-components` constraint).
   */
  component: React.ComponentType
  layout?: StoryLayout
  /** Extra STATIC Tailwind classes for the canvas. Never interpolated. */
  canvasClassName?: string
  /** Demo module key for "Show code", e.g. "button" → src/showcase/demos/button.tsx */
  sourceModule?: string
  /**
   * Exported function name to slice out of that module. Must be written
   * explicitly — `component.name` cannot be trusted after minification.
   */
  sourceExport?: string
}

/** The erased, directly renderable playground the stage consumes. */
export type PlaygroundDefinition = {
  controls: Record<string, AnyControl>
  /** Canvas layout for the playground preview. Defaults to "center". */
  layout?: StoryLayout
  defaults: Record<string, ControlPrimitive>
  Component: React.ComponentType<Record<string, ControlPrimitive>>
  buildSnippet: (values: Record<string, ControlPrimitive>) => string
  importStatement?: string
}

export type ComponentCategory =
  | "Actions"
  | "Forms"
  | "Data Display"
  | "Navigation"
  | "Overlays"
  | "Layout"
  | "Communication"
  | "Utilities"

export type ComponentStatus = "stable" | "composition" | "re-export"

/** Everything the sidebar and search need, with no demo imports attached. */
export type ComponentMeta = {
  id: string
  name: string
  category: ComponentCategory
  description: string
  sourcePath: string
  keywords?: readonly string[]
  status?: ComponentStatus
}

export type ComponentEntry = ComponentMeta & {
  importStatement: string
  exports: readonly string[]
  externalDeps?: readonly string[]
  playground?: PlaygroundDefinition
  stories: readonly StoryDefinition[]
  notes?: readonly string[]
}

export type FoundationPage = {
  id: string
  name: string
  description: string
  component: React.ComponentType
}
