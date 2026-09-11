import * as React from "react"

/**
 * Defers a demo module so its third-party dependency stays out of the initial
 * bundle. Used only for the genuinely heavy ones — recharts, react-day-picker,
 * embla, cmdk, react-resizable-panels and input-otp — which account for most
 * of the showcase's weight but are needed on six pages out of 61.
 *
 * The return type is the demo's own component type, not a widened one, so a
 * deferred playground still type-checks against its control map exactly like
 * an eagerly imported one. `React.lazy` cannot express that round trip in its
 * own signature — hence the two assertions here, which are contained entirely
 * within this function and justified by `name` being constrained to a key of
 * the loaded module.
 *
 * `StoryDefinition.component` is already just a ComponentType, so nothing else
 * in the registry changes; the Story and Playground stages supply Suspense.
 */
export function lazyDemo<
  M extends Record<string, React.ComponentType<never>>,
  K extends keyof M & string,
>(load: () => Promise<M>, name: K): M[K] {
  const Deferred = React.lazy(async () => {
    const module = await load()
    return { default: module[name] as unknown as React.ComponentType }
  })

  return Deferred as unknown as M[K]
}
