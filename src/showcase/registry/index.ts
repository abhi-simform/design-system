import type {
  ComponentCategory,
  ComponentEntry,
} from "@/showcase/registry/types"
import { actionsEntries } from "@/showcase/registry/entries/actions"
import { communicationEntries } from "@/showcase/registry/entries/communication"
import { dataDisplayEntries } from "@/showcase/registry/entries/data-display"
import { formsEntries } from "@/showcase/registry/entries/forms"
import { layoutEntries } from "@/showcase/registry/entries/layout"
import { navigationEntries } from "@/showcase/registry/entries/navigation"
import { overlaysEntries } from "@/showcase/registry/entries/overlays"
import { utilitiesEntries } from "@/showcase/registry/entries/utilities"

export const CATEGORY_ORDER: readonly ComponentCategory[] = [
  "Actions",
  "Forms",
  "Data Display",
  "Navigation",
  "Overlays",
  "Layout",
  "Communication",
  "Utilities",
]

export const allEntries: readonly ComponentEntry[] = [
  ...actionsEntries,
  ...formsEntries,
  ...dataDisplayEntries,
  ...navigationEntries,
  ...overlaysEntries,
  ...layoutEntries,
  ...communicationEntries,
  ...utilitiesEntries,
]

const entriesById = new Map(allEntries.map((entry) => [entry.id, entry]))

export function getEntry(id: string): ComponentEntry | undefined {
  return entriesById.get(id)
}

export function entriesByCategory(
  entries: readonly ComponentEntry[],
): { category: ComponentCategory; entries: ComponentEntry[] }[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    entries: entries.filter((entry) => entry.category === category),
  })).filter((group) => group.entries.length > 0)
}

/** Case-insensitive match over name, id, keywords, then description. */
export function searchEntries(
  entries: readonly ComponentEntry[],
  query: string,
): ComponentEntry[] {
  const needle = query.trim().toLowerCase()

  if (needle === "") {
    return [...entries]
  }

  return entries.filter((entry) => {
    if (entry.name.toLowerCase().includes(needle)) return true
    if (entry.id.includes(needle)) return true
    if (entry.keywords?.some((word) => word.includes(needle))) return true
    return entry.description.toLowerCase().includes(needle)
  })
}
