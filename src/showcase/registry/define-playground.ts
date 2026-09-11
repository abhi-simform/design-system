import type * as React from "react"

import type {
  AnyControl,
  ControlPrimitive,
  ControlValues,
} from "@/showcase/lib/controls"
import { buildControlSnippet } from "@/showcase/lib/snippet"
import type {
  PlaygroundDefinition,
  StoryLayout,
} from "@/showcase/registry/types"

/**
 * Ties a control map to a demo component and erases both into a renderable
 * `PlaygroundDefinition`. The generic parameter is what makes a mistyped
 * variant name a compile error at the call site rather than a runtime
 * surprise; the two casts below are the only ones in the showcase and are
 * safe by construction — the stage only ever spreads an object whose keys
 * were derived from `config.controls`.
 */
export function definePlayground<C extends Record<string, AnyControl>>(config: {
  /** JSX tag name used by the default snippet generator. */
  tag: string
  controls: C
  component: React.ComponentType<ControlValues<C>>
  importStatement?: string
  /** Canvas layout for the preview. Wide components want "stretch". */
  layout?: StoryLayout
  /** Escape hatch for playgrounds the default generator can't express. */
  snippet?: (values: ControlValues<C>) => string
}): PlaygroundDefinition {
  const defaults: Record<string, ControlPrimitive> = {}

  for (const key of Object.keys(config.controls)) {
    defaults[key] = config.controls[key].defaultValue
  }

  const Component = config.component as React.ComponentType<
    Record<string, ControlPrimitive>
  >

  const custom = config.snippet as
    ((values: Record<string, ControlPrimitive>) => string) | undefined

  return {
    controls: config.controls,
    layout: config.layout,
    defaults,
    importStatement: config.importStatement,
    Component,
    buildSnippet: (values) =>
      custom
        ? custom(values)
        : buildControlSnippet(config.tag, config.controls, values),
  }
}
