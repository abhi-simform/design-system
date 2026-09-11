export type Route =
  | { kind: "overview" }
  | { kind: "foundation"; id: string }
  | { kind: "component"; id: string }
  | { kind: "sandbox"; id: string }
  | { kind: "not-found"; hash: string }

export const OVERVIEW_HREF = "#/"

export function parseRoute(hash: string): Route {
  const path = hash.replace(/^#\/?/, "").replace(/\/+$/, "")

  if (path === "") {
    return { kind: "overview" }
  }

  const segments = path.split("/")

  if (segments.length === 2 && segments[1] !== "") {
    const section = segments[0]
    const id = decodeURIComponent(segments[1])

    if (section === "components") {
      return { kind: "component", id }
    }

    if (section === "foundations") {
      return { kind: "foundation", id }
    }

    if (section === "sandbox") {
      return { kind: "sandbox", id }
    }
  }

  return { kind: "not-found", hash }
}

export function componentHref(id: string): string {
  return `#/components/${id}`
}

export function foundationHref(id: string): string {
  return `#/foundations/${id}`
}

export function sandboxHref(id: string): string {
  return `#/sandbox/${id}`
}

/**
 * Assigning an unchanged hash does not fire `hashchange`, which would leave
 * the external store stale. Guard it here so every caller is safe.
 */
export function navigate(href: string): void {
  if (window.location.hash === href) {
    return
  }

  window.location.hash = href
}

/** Stable identity used to key scroll resets and remounts. */
export function routeKey(route: Route): string {
  if (route.kind === "overview") {
    return "overview"
  }

  if (route.kind === "not-found") {
    return `not-found:${route.hash}`
  }

  return `${route.kind}:${route.id}`
}
