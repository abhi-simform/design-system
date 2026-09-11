import { booleanControl, selectControl } from "@/showcase/lib/controls"
import { definePlayground } from "@/showcase/registry/define-playground"
import { lazyDemo } from "@/showcase/registry/lazy-demo"
import type { ComponentEntry } from "@/showcase/registry/types"
import {
  AccordionDisabledItem,
  AccordionMultiple,
  AccordionPlayground,
  AccordionSingle,
} from "@/showcase/demos/accordion"
import {
  AspectRatioPlayground,
  AspectRatioPresets,
  AspectRatioWithContent,
} from "@/showcase/demos/aspect-ratio"
import {
  CollapsibleBasic,
  CollapsibleDefaultOpen,
  CollapsiblePlayground,
} from "@/showcase/demos/collapsible"
import {
  ScrollAreaHorizontal,
  ScrollAreaPlayground,
  ScrollAreaVertical,
} from "@/showcase/demos/scroll-area"
import {
  SeparatorHorizontal,
  SeparatorPlayground,
  SeparatorVertical,
} from "@/showcase/demos/separator"

// Deferred so their third-party dependency stays out of the initial bundle.
const CarouselBasic = lazyDemo(
  () => import("@/showcase/demos/carousel"),
  "CarouselBasic",
)
const CarouselMultiple = lazyDemo(
  () => import("@/showcase/demos/carousel"),
  "CarouselMultiple",
)
const CarouselPlayground = lazyDemo(
  () => import("@/showcase/demos/carousel"),
  "CarouselPlayground",
)
const CarouselVertical = lazyDemo(
  () => import("@/showcase/demos/carousel"),
  "CarouselVertical",
)
const CarouselWithCounter = lazyDemo(
  () => import("@/showcase/demos/carousel"),
  "CarouselWithCounter",
)
const ResizableHorizontal = lazyDemo(
  () => import("@/showcase/demos/resizable"),
  "ResizableHorizontal",
)
const ResizableNested = lazyDemo(
  () => import("@/showcase/demos/resizable"),
  "ResizableNested",
)
const ResizablePlayground = lazyDemo(
  () => import("@/showcase/demos/resizable"),
  "ResizablePlayground",
)
const ResizableVertical = lazyDemo(
  () => import("@/showcase/demos/resizable"),
  "ResizableVertical",
)
const accordionEntry: ComponentEntry = {
  id: "accordion",
  name: "Accordion",
  category: "Layout",
  description:
    "A stack of disclosures. By default several panels can be open at once; set multiple={false} for classic single-open behaviour.",
  sourcePath: "src/components/ui/accordion.tsx",
  importStatement:
    'import {\n  Accordion,\n  AccordionContent,\n  AccordionItem,\n  AccordionTrigger,\n} from "@/components/ui/accordion"',
  exports: [
    "Accordion",
    "AccordionItem",
    "AccordionTrigger",
    "AccordionContent",
  ],
  keywords: ["disclosure", "faq", "expand", "collapse", "details"],
  notes: [
    'Value is an array — defaultValue={["item-1"]} even when only one panel opens at a time.',
    "The chevron swaps between down and up on expand, rather than rotating.",
  ],
  playground: definePlayground({
    tag: "Accordion",
    layout: "stretch",
    component: AccordionPlayground,
    controls: {
      multiple: booleanControl({ label: "Allow multiple", defaultValue: true }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "single",
      title: "One panel at a time",
      component: AccordionSingle,
      layout: "stretch",
      sourceModule: "accordion",
      sourceExport: "AccordionSingle",
    },
    {
      id: "multiple",
      title: "Several panels open",
      component: AccordionMultiple,
      layout: "stretch",
      sourceModule: "accordion",
      sourceExport: "AccordionMultiple",
    },
    {
      id: "disabled",
      title: "Disabled item",
      component: AccordionDisabledItem,
      layout: "stretch",
      sourceModule: "accordion",
      sourceExport: "AccordionDisabledItem",
    },
  ],
}

const aspectRatioEntry: ComponentEntry = {
  id: "aspect-ratio",
  name: "Aspect Ratio",
  category: "Layout",
  description:
    "Locks its children to a ratio by writing a --ratio custom property and applying aspect-(--ratio).",
  sourcePath: "src/components/ui/aspect-ratio.tsx",
  importStatement: 'import { AspectRatio } from "@/components/ui/aspect-ratio"',
  exports: ["AspectRatio"],
  keywords: ["ratio", "video", "image", "16:9", "square"],
  notes: [
    "ratio is required and has no default — pass a number, e.g. ratio={16 / 9}.",
    "It only constrains height, so the parent must supply a width.",
  ],
  playground: definePlayground({
    tag: "AspectRatio",
    layout: "stretch",
    component: AspectRatioPlayground,
    snippet: (values) =>
      `<AspectRatio ratio={${values.preset}} className="bg-muted" />`,
    controls: {
      preset: selectControl({
        label: "Ratio",
        options: ["16 / 9", "4 / 3", "1 / 1", "21 / 9", "3 / 4"],
        defaultValue: "16 / 9",
      }),
    },
  }),
  stories: [
    {
      id: "presets",
      title: "Common ratios",
      component: AspectRatioPresets,
      layout: "stretch",
      sourceModule: "aspect-ratio",
      sourceExport: "AspectRatioPresets",
    },
    {
      id: "with-content",
      title: "As a media header",
      component: AspectRatioWithContent,
      sourceModule: "aspect-ratio",
      sourceExport: "AspectRatioWithContent",
    },
  ],
}

const carouselEntry: ComponentEntry = {
  id: "carousel",
  name: "Carousel",
  category: "Layout",
  description:
    "An Embla-backed slider with keyboard arrow navigation and buttons that disable themselves at the ends.",
  sourcePath: "src/components/ui/carousel.tsx",
  importStatement:
    'import {\n  Carousel,\n  CarouselContent,\n  CarouselItem,\n  CarouselNext,\n  CarouselPrevious,\n} from "@/components/ui/carousel"',
  exports: [
    "Carousel",
    "CarouselContent",
    "CarouselItem",
    "CarouselPrevious",
    "CarouselNext",
    "useCarousel",
    "CarouselApi",
  ],
  externalDeps: ["embla-carousel-react"],
  keywords: ["slider", "slideshow", "embla", "gallery", "swipe"],
  notes: [
    "Items size themselves with basis utilities — basis-1/2 shows two at a time.",
    "A vertical carousel has no intrinsic height; set one on CarouselContent.",
    "setApi hands you the Embla instance for counters, dots and autoplay.",
  ],
  playground: definePlayground({
    tag: "Carousel",
    component: CarouselPlayground,
    controls: {
      orientation: selectControl({
        label: "Orientation",
        options: ["horizontal", "vertical"],
        defaultValue: "horizontal",
      }),
      loop: booleanControl({
        label: "Loop",
        defaultValue: false,
        codeRole: "none",
      }),
      perView: selectControl({
        label: "Slides per view",
        options: ["1", "2"],
        defaultValue: "1",
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: CarouselBasic,
      sourceModule: "carousel",
      sourceExport: "CarouselBasic",
    },
    {
      id: "multiple",
      title: "Several slides per view",
      component: CarouselMultiple,
      sourceModule: "carousel",
      sourceExport: "CarouselMultiple",
    },
    {
      id: "vertical",
      title: "Vertical",
      component: CarouselVertical,
      sourceModule: "carousel",
      sourceExport: "CarouselVertical",
    },
    {
      id: "with-counter",
      title: "Reading the API",
      description:
        "setApi exposes the Embla instance, here driving a slide counter.",
      component: CarouselWithCounter,
      sourceModule: "carousel",
      sourceExport: "CarouselWithCounter",
    },
  ],
}

const collapsibleEntry: ComponentEntry = {
  id: "collapsible",
  name: "Collapsible",
  category: "Layout",
  description:
    "A single animated disclosure — the primitive Accordion is built from. Reach for it when one section opens independently.",
  sourcePath: "src/components/ui/collapsible.tsx",
  importStatement:
    'import {\n  Collapsible,\n  CollapsibleContent,\n  CollapsibleTrigger,\n} from "@/components/ui/collapsible"',
  exports: ["Collapsible", "CollapsibleTrigger", "CollapsibleContent"],
  keywords: ["disclosure", "expand", "show more", "details"],
  notes: [
    "A pure Base UI pass-through — every Collapsible.Root prop is available.",
  ],
  playground: definePlayground({
    tag: "Collapsible",
    layout: "stretch",
    component: CollapsiblePlayground,
    controls: {
      defaultOpen: booleanControl({
        label: "Open by default",
        defaultValue: false,
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: CollapsibleBasic,
      sourceModule: "collapsible",
      sourceExport: "CollapsibleBasic",
    },
    {
      id: "default-open",
      title: "Open by default",
      component: CollapsibleDefaultOpen,
      sourceModule: "collapsible",
      sourceExport: "CollapsibleDefaultOpen",
    },
  ],
}

const resizableEntry: ComponentEntry = {
  id: "resizable",
  name: "Resizable",
  category: "Layout",
  description:
    "Draggable split panes from react-resizable-panels, with an optional grip on the handle. Groups nest for IDE-style layouts.",
  sourcePath: "src/components/ui/resizable.tsx",
  importStatement:
    'import {\n  ResizableHandle,\n  ResizablePanel,\n  ResizablePanelGroup,\n} from "@/components/ui/resizable"',
  exports: ["ResizablePanelGroup", "ResizablePanel", "ResizableHandle"],
  externalDeps: ["react-resizable-panels"],
  keywords: ["split", "pane", "drag", "splitter", "layout"],
  notes: [
    "In v4 the group prop is orientation, not direction.",
    'Sizes are pixels when numeric and percentages when strings — defaultSize="50" is half, defaultSize={50} is 50px.',
    "The group is h-full, so its wrapper must have a height.",
  ],
  playground: definePlayground({
    tag: "ResizablePanelGroup",
    layout: "stretch",
    component: ResizablePlayground,
    controls: {
      orientation: selectControl({
        label: "Orientation",
        options: ["horizontal", "vertical"],
        defaultValue: "horizontal",
      }),
      withHandle: booleanControl({
        label: "Show grip",
        defaultValue: true,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "horizontal",
      title: "Horizontal",
      component: ResizableHorizontal,
      layout: "stretch",
      sourceModule: "resizable",
      sourceExport: "ResizableHorizontal",
    },
    {
      id: "vertical",
      title: "Vertical",
      component: ResizableVertical,
      layout: "stretch",
      sourceModule: "resizable",
      sourceExport: "ResizableVertical",
    },
    {
      id: "nested",
      title: "Nested groups",
      component: ResizableNested,
      layout: "stretch",
      sourceModule: "resizable",
      sourceExport: "ResizableNested",
    },
  ],
}

const scrollAreaEntry: ComponentEntry = {
  id: "scroll-area",
  name: "Scroll Area",
  category: "Layout",
  description:
    "A scroll container with a styled scrollbar that matches the design system in both themes, replacing the OS default.",
  sourcePath: "src/components/ui/scroll-area.tsx",
  importStatement:
    'import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"',
  exports: ["ScrollArea", "ScrollBar"],
  keywords: ["scroll", "overflow", "scrollbar", "viewport"],
  notes: [
    'A vertical ScrollBar is included automatically; add <ScrollBar orientation="horizontal" /> yourself for the other axis.',
    "The root needs a bounded height or width, otherwise nothing ever overflows.",
  ],
  playground: definePlayground({
    tag: "ScrollArea",
    component: ScrollAreaPlayground,
    controls: {
      height: selectControl({
        label: "Height",
        options: ["sm", "md", "lg"],
        defaultValue: "md",
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "vertical",
      title: "Vertical",
      component: ScrollAreaVertical,
      sourceModule: "scroll-area",
      sourceExport: "ScrollAreaVertical",
    },
    {
      id: "horizontal",
      title: "Horizontal",
      component: ScrollAreaHorizontal,
      sourceModule: "scroll-area",
      sourceExport: "ScrollAreaHorizontal",
    },
  ],
}

const separatorEntry: ComponentEntry = {
  id: "separator",
  name: "Separator",
  category: "Layout",
  description:
    "A one-pixel rule. Horizontal fills its container's width; vertical stretches to the flex line's height via self-stretch.",
  sourcePath: "src/components/ui/separator.tsx",
  importStatement: 'import { Separator } from "@/components/ui/separator"',
  exports: ["Separator"],
  keywords: ["divider", "rule", "hr", "line"],
  notes: [
    "A vertical separator needs a flex parent with a height — self-stretch has nothing to stretch to otherwise.",
  ],
  playground: definePlayground({
    tag: "Separator",
    component: SeparatorPlayground,
    controls: {
      orientation: selectControl({
        label: "Orientation",
        options: ["horizontal", "vertical"],
        defaultValue: "horizontal",
      }),
    },
  }),
  stories: [
    {
      id: "horizontal",
      title: "Horizontal",
      component: SeparatorHorizontal,
      sourceModule: "separator",
      sourceExport: "SeparatorHorizontal",
    },
    {
      id: "vertical",
      title: "Vertical",
      component: SeparatorVertical,
      sourceModule: "separator",
      sourceExport: "SeparatorVertical",
    },
  ],
}

export const layoutEntries: readonly ComponentEntry[] = [
  accordionEntry,
  aspectRatioEntry,
  carouselEntry,
  collapsibleEntry,
  resizableEntry,
  scrollAreaEntry,
  separatorEntry,
]
