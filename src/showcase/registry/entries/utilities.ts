import { selectControl } from "@/showcase/lib/controls"
import { definePlayground } from "@/showcase/registry/define-playground"
import type { ComponentEntry } from "@/showcase/registry/types"
import {
  DirectionPlayground,
  DirectionSideBySide,
  DirectionToggleDemo,
} from "@/showcase/demos/direction"

const directionEntry: ComponentEntry = {
  id: "direction",
  name: "Direction",
  category: "Utilities",
  description:
    "Re-exports Base UI's DirectionProvider and useDirection. It is what tells JS-positioned popups which way to open, and it powers the ltr/rtl toggle on every preview in this showcase.",
  sourcePath: "src/components/ui/direction.tsx",
  importStatement:
    'import {\n  DirectionProvider,\n  useDirection,\n} from "@/components/ui/direction"',
  exports: ["DirectionProvider", "useDirection"],
  status: "re-export",
  keywords: ["rtl", "ltr", "i18n", "bidi", "arabic", "hebrew"],
  notes: [
    "Two things are needed for real RTL: dir on the DOM, so Tailwind's rtl: variants and CSS logical properties flip, and this provider, so Base UI's positioning flips with them. Setting only one leaves popups opening from the wrong edge.",
    "Base UI defaults to ltr, so an app that never goes RTL does not need to mount the provider at all.",
    "components.json in this repo has rtl: false, meaning the generated classes use physical properties where a logical one was optional.",
  ],
  playground: definePlayground({
    tag: "DirectionProvider",
    layout: "stretch",
    component: DirectionPlayground,
    controls: {
      direction: selectControl({
        label: "Direction",
        options: ["ltr", "rtl"],
        defaultValue: "ltr",
      }),
    },
  }),
  stories: [
    {
      id: "toggle",
      title: "Flipping a composition",
      description:
        "The same breadcrumb, input group and dropdown, switched between reading directions.",
      component: DirectionToggleDemo,
      layout: "stretch",
      sourceModule: "direction",
      sourceExport: "DirectionToggleDemo",
    },
    {
      id: "side-by-side",
      title: "Side by side",
      component: DirectionSideBySide,
      layout: "stretch",
      sourceModule: "direction",
      sourceExport: "DirectionSideBySide",
    },
  ],
}

export const utilitiesEntries: readonly ComponentEntry[] = [directionEntry]
