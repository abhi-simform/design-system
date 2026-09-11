import * as React from "react"

import { parseRoute, type Route } from "@/showcase/routing/routes"

function subscribe(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange)

  return () => {
    window.removeEventListener("hashchange", onStoreChange)
  }
}

function getSnapshot() {
  return window.location.hash
}

/**
 * The snapshot is the hash *string* — a stable primitive. Returning the parsed
 * object here would allocate on every read and trip React's "getSnapshot should
 * be cached" loop, so parsing happens in a memo instead.
 */
export function useHashRoute(): Route {
  const hash = React.useSyncExternalStore(subscribe, getSnapshot)

  return React.useMemo(() => parseRoute(hash), [hash])
}
