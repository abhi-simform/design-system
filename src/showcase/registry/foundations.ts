import { FoundationColors } from "@/showcase/foundations/colors"
import { FoundationRadius } from "@/showcase/foundations/radius"
import { FoundationTypography } from "@/showcase/foundations/typography"
import type { FoundationPage } from "@/showcase/registry/types"

export const foundationPages: readonly FoundationPage[] = [
  {
    id: "colors",
    name: "Colors",
    description: "The OKLCH token set, shown in light and dark side by side.",
    component: FoundationColors,
  },
  {
    id: "radius",
    name: "Radius",
    description: "One --radius token and the seven steps derived from it.",
    component: FoundationRadius,
  },
  {
    id: "typography",
    name: "Typography",
    description:
      "Inter Variable and DM Sans Variable, with size and weight ramps.",
    component: FoundationTypography,
  },
]

export function getFoundation(id: string): FoundationPage | undefined {
  return foundationPages.find((page) => page.id === id)
}
