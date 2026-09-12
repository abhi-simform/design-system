import {
  booleanControl,
  numberControl,
  selectControl,
} from "@/showcase/lib/controls"
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
  BoxAsLink,
  BoxAsSection,
  BoxDefault,
  BoxPlayground,
} from "@/showcase/demos/box"
import {
  CollapsibleBasic,
  CollapsibleDefaultOpen,
  CollapsiblePlayground,
} from "@/showcase/demos/collapsible"
import {
  FlexDefault,
  FlexDirection,
  FlexGapLonghands,
  FlexPlayground,
  FlexResponsive,
} from "@/showcase/demos/flex"
import {
  GridContainerQueries,
  GridGrow,
  GridOffsetAndOrder,
  GridPlayground,
  GridResponsiveSpans,
} from "@/showcase/demos/grid"
import {
  GroupAsSection,
  GroupDefault,
  GroupGrow,
  GroupJustify,
  GroupPlayground,
  GroupWrap,
} from "@/showcase/demos/group"
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
import {
  StackAlign,
  StackAsSection,
  StackDefault,
  StackPlayground,
} from "@/showcase/demos/stack"

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

const boxEntry: ComponentEntry = {
  id: "box",
  name: "Box",
  category: "Layout",
  description:
    "The base polymorphic element other components build on — a div by default, or any element via the render prop, with no styling of its own.",
  sourcePath: "src/components/ui/box.tsx",
  importStatement: 'import { Box } from "@/components/ui/box"',
  exports: ["Box"],
  keywords: ["polymorphic", "render", "as", "primitive", "wrapper", "element"],
  notes: [
    "Box carries no default styling — className/style are the only way to affect appearance, exactly like a plain <div>.",
    'Swap the rendered element with the render prop (Base UI\'s polymorphism idiom), e.g. render={<a href="/" />} — not a component="a" string prop.',
  ],
  playground: definePlayground({
    tag: "Box",
    component: BoxPlayground,
    snippet: (values) =>
      values.as === "div"
        ? `<Box className="...">Rendered as a div</Box>`
        : `<Box render={<${values.as}${values.as === "a" ? ' href="#"' : ""} />} className="...">\n  Rendered as a ${values.as}\n</Box>`,
    controls: {
      as: selectControl({
        label: "Renders as",
        options: ["div", "section", "span", "a"],
        defaultValue: "div",
      }),
    },
  }),
  stories: [
    {
      id: "default",
      title: "Default",
      component: BoxDefault,
      sourceModule: "box",
      sourceExport: "BoxDefault",
    },
    {
      id: "as-link",
      title: "As a link",
      component: BoxAsLink,
      sourceModule: "box",
      sourceExport: "BoxAsLink",
    },
    {
      id: "as-section",
      title: "As a section",
      component: BoxAsSection,
      sourceModule: "box",
      sourceExport: "BoxAsSection",
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

const flexEntry: ComponentEntry = {
  id: "flex",
  name: "Flex",
  category: "Layout",
  description:
    "A low-level flexbox wrapper — gap, rowGap, columnGap, align, justify, wrap and direction each accept a responsive object like { base: 'column', sm: 'row' }.",
  sourcePath: "src/components/ui/flex.tsx",
  importStatement: 'import { Flex } from "@/components/ui/flex"',
  exports: ["Flex"],
  keywords: [
    "layout",
    "flexbox",
    "responsive",
    "gap",
    "direction",
    "wrap",
    "breakpoints",
  ],
  notes: [
    "Unlike Grid, Flex has no default gap/align/justify/wrap/direction — only display: flex is unconditional, and it doesn't default to full width either.",
    "Responsive props use their own base/xs/sm/md/lg/xl breakpoint scale, not Tailwind's — so direction={{ base: 'column', sm: 'row' }} reflows at 48em regardless of Tailwind's sm.",
    "gap is normalized into rowGap/columnGap internally, so the two can be set independently without conflicting.",
  ],
  playground: definePlayground({
    tag: "Flex",
    layout: "stretch",
    component: FlexPlayground,
    controls: {
      gap: selectControl({
        label: "Gap",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      align: selectControl({
        label: "Align",
        options: ["stretch", "center", "flex-start", "flex-end"],
        defaultValue: "stretch",
      }),
      justify: selectControl({
        label: "Justify",
        options: [
          "flex-start",
          "center",
          "flex-end",
          "space-between",
          "space-around",
        ],
        defaultValue: "flex-start",
      }),
      wrap: selectControl({
        label: "Wrap",
        options: ["wrap", "nowrap"],
        defaultValue: "wrap",
      }),
      direction: selectControl({
        label: "Direction",
        options: ["row", "column"],
        defaultValue: "row",
      }),
    },
  }),
  stories: [
    {
      id: "default",
      title: "Default",
      component: FlexDefault,
      sourceModule: "flex",
      sourceExport: "FlexDefault",
    },
    {
      id: "direction",
      title: "Direction",
      component: FlexDirection,
      sourceModule: "flex",
      sourceExport: "FlexDirection",
    },
    {
      id: "responsive",
      title: "Responsive direction and gap",
      description:
        "direction and gap both switch at Flex's sm breakpoint (48em).",
      component: FlexResponsive,
      layout: "stretch",
      sourceModule: "flex",
      sourceExport: "FlexResponsive",
    },
    {
      id: "gap-longhands",
      title: "Independent row/column gap",
      component: FlexGapLonghands,
      sourceModule: "flex",
      sourceExport: "FlexGapLonghands",
    },
  ],
}

const gridEntry: ComponentEntry = {
  id: "grid",
  name: "Grid",
  category: "Layout",
  description:
    "A responsive 12-column flexbox layout — span, offset, order and gap all accept a responsive object like { base: 12, md: 6 }.",
  sourcePath: "src/components/ui/grid.tsx",
  importStatement: 'import { Grid, GridCol } from "@/components/ui/grid"',
  exports: ["Grid", "GridCol"],
  keywords: [
    "layout",
    "columns",
    "responsive",
    "flexbox",
    "col",
    "breakpoints",
  ],
  notes: [
    "Grid.Col also works as a static property, e.g. <Grid.Col />.",
    "Responsive props use their own base/xs/sm/md/lg/xl breakpoint scale, not Tailwind's — so span={{ base: 12, md: 6 }} reflows at 62em regardless of Tailwind's md.",
    'type="container" switches span/order/offset to container queries instead of viewport media queries, using the breakpoints prop (defaults to the same scale).',
  ],
  playground: definePlayground({
    tag: "Grid",
    layout: "stretch",
    component: GridPlayground,
    controls: {
      columns: numberControl({
        label: "Columns",
        defaultValue: 12,
        min: 2,
        max: 12,
      }),
      gap: selectControl({
        label: "Gap",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      grow: booleanControl({ label: "Grow", defaultValue: false }),
      justify: selectControl({
        label: "Justify",
        options: [
          "flex-start",
          "center",
          "flex-end",
          "space-between",
          "space-around",
        ],
        defaultValue: "flex-start",
      }),
    },
  }),
  stories: [
    {
      id: "responsive-spans",
      title: "Responsive spans",
      component: GridResponsiveSpans,
      layout: "stretch",
      sourceModule: "grid",
      sourceExport: "GridResponsiveSpans",
    },
    {
      id: "grow",
      title: "Grow",
      component: GridGrow,
      layout: "stretch",
      sourceModule: "grid",
      sourceExport: "GridGrow",
    },
    {
      id: "offset-and-order",
      title: "Offset and order",
      component: GridOffsetAndOrder,
      layout: "stretch",
      sourceModule: "grid",
      sourceExport: "GridOffsetAndOrder",
    },
    {
      id: "container-queries",
      title: 'type="container"',
      description:
        "Columns respond to the container's width, not the viewport.",
      component: GridContainerQueries,
      layout: "stretch",
      sourceModule: "grid",
      sourceExport: "GridContainerQueries",
    },
  ],
}

const groupEntry: ComponentEntry = {
  id: "group",
  name: "Group",
  category: "Layout",
  description:
    "A horizontal flex layout — the row-axis counterpart to Stack, with an optional grow mode that makes children equal-width.",
  sourcePath: "src/components/ui/group.tsx",
  importStatement: 'import { Group } from "@/components/ui/group"',
  exports: ["Group"],
  keywords: ["layout", "flex", "row", "horizontal", "spacing", "gap", "grow"],
  notes: [
    "gap/align/justify/wrap are plain values, not responsive objects — same as Stack.",
    "grow gives every child flex-grow: 1. With preventGrowOverflow (the default), children are also capped to an equal max-width, so they line up evenly instead of growing unevenly — set preventGrowOverflow={false} to allow uneven growth.",
    "Group is built on Box, so it also accepts a render prop to swap the rendered element, e.g. render={<section />}.",
  ],
  playground: definePlayground({
    tag: "Group",
    layout: "stretch",
    component: GroupPlayground,
    controls: {
      gap: selectControl({
        label: "Gap",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      align: selectControl({
        label: "Align",
        options: ["stretch", "center", "flex-start", "flex-end"],
        defaultValue: "center",
      }),
      justify: selectControl({
        label: "Justify",
        options: [
          "flex-start",
          "center",
          "flex-end",
          "space-between",
          "space-around",
        ],
        defaultValue: "flex-start",
      }),
      wrap: selectControl({
        label: "Wrap",
        options: ["wrap", "nowrap"],
        defaultValue: "wrap",
      }),
      grow: booleanControl({ label: "Grow", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "default",
      title: "Default",
      component: GroupDefault,
      sourceModule: "group",
      sourceExport: "GroupDefault",
    },
    {
      id: "justify",
      title: "Justify",
      component: GroupJustify,
      layout: "stretch",
      sourceModule: "group",
      sourceExport: "GroupJustify",
    },
    {
      id: "wrap",
      title: "Wrap",
      component: GroupWrap,
      sourceModule: "group",
      sourceExport: "GroupWrap",
    },
    {
      id: "grow",
      title: "Grow",
      description:
        "preventGrowOverflow (default true) caps each child to an equal share of the row.",
      component: GroupGrow,
      sourceModule: "group",
      sourceExport: "GroupGrow",
    },
    {
      id: "as-section",
      title: "As a section",
      description: "Group inherits Box's render prop.",
      component: GroupAsSection,
      sourceModule: "group",
      sourceExport: "GroupAsSection",
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

const stackEntry: ComponentEntry = {
  id: "stack",
  name: "Stack",
  category: "Layout",
  description:
    "A vertical flex layout — the simplest way to space a column of children with a consistent gap.",
  sourcePath: "src/components/ui/stack.tsx",
  importStatement: 'import { Stack } from "@/components/ui/stack"',
  exports: ["Stack"],
  keywords: ["layout", "flex", "column", "vertical", "spacing", "gap"],
  notes: [
    "gap/align/justify are plain values, not responsive objects — unlike Grid, Stack has no breakpoint scale to opt into.",
    'The xs–xl gap tokens and every align/justify keyword map to a static Tailwind class (gap-4, items-center, justify-between, …) — no inline styles. A gap outside that scale isn\'t a prop value; pass a raw utility via className instead, e.g. className="gap-20" for 80px.',
    "Stack is built on Box, so it also accepts a render prop to swap the rendered element, e.g. render={<section />}.",
  ],
  playground: definePlayground({
    tag: "Stack",
    layout: "stretch",
    component: StackPlayground,
    controls: {
      gap: selectControl({
        label: "Gap",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      align: selectControl({
        label: "Align",
        options: ["stretch", "center", "flex-start", "flex-end"],
        defaultValue: "stretch",
      }),
      justify: selectControl({
        label: "Justify",
        options: [
          "flex-start",
          "center",
          "flex-end",
          "space-between",
          "space-around",
        ],
        defaultValue: "flex-start",
      }),
    },
  }),
  stories: [
    {
      id: "default",
      title: "Default",
      component: StackDefault,
      sourceModule: "stack",
      sourceExport: "StackDefault",
    },
    {
      id: "alignment",
      title: "Alignment",
      component: StackAlign,
      layout: "stretch",
      sourceModule: "stack",
      sourceExport: "StackAlign",
    },
    {
      id: "as-section",
      title: "As a section",
      description: "Stack inherits Box's render prop.",
      component: StackAsSection,
      sourceModule: "stack",
      sourceExport: "StackAsSection",
    },
  ],
}

export const layoutEntries: readonly ComponentEntry[] = [
  accordionEntry,
  aspectRatioEntry,
  boxEntry,
  carouselEntry,
  collapsibleEntry,
  flexEntry,
  gridEntry,
  groupEntry,
  resizableEntry,
  scrollAreaEntry,
  separatorEntry,
  stackEntry,
]
