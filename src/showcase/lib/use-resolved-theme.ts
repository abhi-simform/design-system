import * as React from "react"

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"

function subscribe(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY)
  mediaQuery.addEventListener("change", onStoreChange)

  return () => {
    mediaQuery.removeEventListener("change", onStoreChange)
  }
}

function getSnapshot(): "dark" | "light" {
  return window.matchMedia(COLOR_SCHEME_QUERY).matches ? "dark" : "light"
}

export function useSystemTheme(): "dark" | "light" {
  return React.useSyncExternalStore(subscribe, getSnapshot)
}

/**
 * `useTheme()` reports the user's *preference*, which may be "system". This
 * resolves it to what is actually painted, for picking the right icon.
 */
export function useResolvedTheme(
  theme: "dark" | "light" | "system",
): "dark" | "light" {
  const systemTheme = useSystemTheme()

  return theme === "system" ? systemTheme : theme
}
