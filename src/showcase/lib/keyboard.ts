import type * as React from "react"

/**
 * The theme provider's `d` hotkey is guarded against `input`, `textarea`,
 * `select` and contenteditable targets — but not against Base UI triggers,
 * which are plain `<button>`s. Typing `d` to jump inside an open `Select`
 * would therefore also flip the theme.
 *
 * React 19 attaches its listeners at the `#root` container, which sits below
 * `window`, so stopping propagation here genuinely prevents the window-level
 * handler from running.
 */
export function stopSingleCharKeys(event: React.KeyboardEvent): void {
  if (event.metaKey || event.ctrlKey || event.altKey) {
    return
  }

  if (event.key.length !== 1) {
    return
  }

  event.stopPropagation()
}
