/**
 * Loads the *real* source of a demo component for the "Show code" disclosure,
 * instead of a hand-maintained duplicate string that would drift on day two.
 *
 * The glob is lazy, so a demo file is only fetched when someone actually
 * opens the disclosure.
 */
const sources = import.meta.glob("../demos/*.tsx", {
  query: "?raw",
  import: "default",
})

export async function loadDemoSource(
  moduleId: string,
  exportName: string,
): Promise<string | null> {
  const loader = sources[`../demos/${moduleId}.tsx`]

  if (!loader) {
    return null
  }

  const raw = await loader()

  if (typeof raw !== "string") {
    return null
  }

  const marker = `export function ${exportName}(`
  const start = raw.indexOf(marker)

  if (start === -1) {
    return null
  }

  // Prettier guarantees a top-level function's closing brace sits at column 0.
  const end = raw.indexOf("\n}", start)

  if (end === -1) {
    return null
  }

  return raw.slice(start + "export ".length, end + 2)
}
