import {
  booleanControl,
  numberControl,
  selectControl,
  textControl,
} from "@/showcase/lib/controls"
import { definePlayground } from "@/showcase/registry/define-playground"
import { lazyDemo } from "@/showcase/registry/lazy-demo"
import type { ComponentEntry } from "@/showcase/registry/types"
import {
  AlertPlayground,
  AlertTitleOnly,
  AlertVariants,
  AlertWithAction,
  AlertWithoutIcon,
} from "@/showcase/demos/alert"
import {
  AvatarBadges,
  AvatarFallbacks,
  AvatarGroups,
  AvatarPlayground,
  AvatarSizes,
} from "@/showcase/demos/avatar"
import {
  BadgeAsLink,
  BadgeCounts,
  BadgePlayground,
  BadgeVariants,
  BadgeWithIcons,
} from "@/showcase/demos/badge"
import {
  CardPlayground,
  CardSizes,
  CardWithForm,
  CardWithMedia,
} from "@/showcase/demos/card"
import {
  EmptyMediaVariants,
  EmptyMinimal,
  EmptyPlayground,
  EmptyWithActions,
} from "@/showcase/demos/empty"
import {
  ItemAsSetting,
  ItemGroups,
  ItemPlayground,
  ItemSizes,
  ItemVariants,
} from "@/showcase/demos/item"
import {
  MarkerAsTimelineDivider,
  MarkerPlayground,
  MarkerVariants,
  MarkerWithIcon,
} from "@/showcase/demos/marker"
import {
  PaginationBasic,
  PaginationCustomLabels,
  PaginationPlayground,
  PaginationWithEllipsis,
} from "@/showcase/demos/pagination"
import {
  ProgressAnimated,
  ProgressBasic,
  ProgressIndeterminate,
  ProgressPlayground,
  ProgressWithLabel,
} from "@/showcase/demos/progress"
import {
  SkeletonCard,
  SkeletonList,
  SkeletonPlayground,
  SkeletonText,
} from "@/showcase/demos/skeleton"
import {
  SpinnerInButtons,
  SpinnerPlayground,
  SpinnerSizes,
  SpinnerWithLabel,
} from "@/showcase/demos/spinner"
import {
  TableBasic,
  TablePlayground,
  TableWithFooter,
} from "@/showcase/demos/table"

// Deferred so their third-party dependency stays out of the initial bundle.
const ChartArea = lazyDemo(() => import("@/showcase/demos/chart"), "ChartArea")
const ChartBar = lazyDemo(() => import("@/showcase/demos/chart"), "ChartBar")
const ChartLine = lazyDemo(() => import("@/showcase/demos/chart"), "ChartLine")
const ChartPie = lazyDemo(() => import("@/showcase/demos/chart"), "ChartPie")
const ChartPlayground = lazyDemo(
  () => import("@/showcase/demos/chart"),
  "ChartPlayground",
)
const alertEntry: ComponentEntry = {
  id: "alert",
  name: "Alert",
  category: "Data Display",
  description:
    "A persistent inline message. An svg child switches the layout to a two-column grid; AlertAction pins a control to the top-right.",
  sourcePath: "src/components/ui/alert.tsx",
  importStatement:
    'import {\n  Alert,\n  AlertAction,\n  AlertDescription,\n  AlertTitle,\n} from "@/components/ui/alert"',
  exports: ["Alert", "AlertTitle", "AlertDescription", "AlertAction"],
  keywords: ["banner", "callout", "notice", "warning", "error"],
  notes: [
    "For transient feedback reach for Toast instead — an Alert stays until the page changes.",
  ],
  playground: definePlayground({
    tag: "Alert",
    layout: "stretch",
    component: AlertPlayground,
    controls: {
      variant: selectControl({
        label: "Variant",
        options: ["default", "destructive"],
        defaultValue: "default",
      }),
      title: textControl({
        label: "Title",
        defaultValue: "Heads up",
        codeRole: "none",
      }),
      description: textControl({
        label: "Description",
        defaultValue: "You can add components to your app using the CLI.",
        codeRole: "none",
      }),
      showIcon: booleanControl({
        label: "Show icon",
        defaultValue: true,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "variants",
      title: "Variants",
      component: AlertVariants,
      layout: "stretch",
      sourceModule: "alert",
      sourceExport: "AlertVariants",
    },
    {
      id: "without-icon",
      title: "Without an icon",
      component: AlertWithoutIcon,
      layout: "stretch",
      sourceModule: "alert",
      sourceExport: "AlertWithoutIcon",
    },
    {
      id: "with-action",
      title: "With an action",
      component: AlertWithAction,
      layout: "stretch",
      sourceModule: "alert",
      sourceExport: "AlertWithAction",
    },
    {
      id: "title-only",
      title: "Title only",
      component: AlertTitleOnly,
      layout: "stretch",
      sourceModule: "alert",
      sourceExport: "AlertTitleOnly",
    },
  ],
}

const avatarEntry: ComponentEntry = {
  id: "avatar",
  name: "Avatar",
  category: "Data Display",
  description:
    "A user image with a text fallback, an optional status badge, and a group layout that overlaps members.",
  sourcePath: "src/components/ui/avatar.tsx",
  importStatement:
    'import {\n  Avatar,\n  AvatarBadge,\n  AvatarFallback,\n  AvatarGroup,\n  AvatarGroupCount,\n  AvatarImage,\n} from "@/components/ui/avatar"',
  exports: [
    "Avatar",
    "AvatarImage",
    "AvatarFallback",
    "AvatarGroup",
    "AvatarGroupCount",
    "AvatarBadge",
  ],
  keywords: ["user", "profile", "picture", "initials", "group"],
  notes: [
    "AvatarFallback renders only once the image fails or while it loads — always supply one.",
    "AvatarGroup sizes its count chip from the avatars inside it, so set size on the avatars, not the group.",
  ],
  playground: definePlayground({
    tag: "Avatar",
    component: AvatarPlayground,
    controls: {
      size: selectControl({
        label: "Size",
        options: ["default", "sm", "lg"],
        defaultValue: "default",
      }),
      showImage: booleanControl({
        label: "Load image",
        defaultValue: true,
        codeRole: "none",
      }),
      showBadge: booleanControl({
        label: "Status badge",
        defaultValue: false,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "sizes",
      title: "Sizes",
      component: AvatarSizes,
      sourceModule: "avatar",
      sourceExport: "AvatarSizes",
    },
    {
      id: "fallbacks",
      title: "Fallbacks",
      description:
        "A broken source, no source at all, and an icon used in place of initials.",
      component: AvatarFallbacks,
      sourceModule: "avatar",
      sourceExport: "AvatarFallbacks",
    },
    {
      id: "badges",
      title: "Status badges",
      component: AvatarBadges,
      sourceModule: "avatar",
      sourceExport: "AvatarBadges",
    },
    {
      id: "groups",
      title: "Groups",
      component: AvatarGroups,
      sourceModule: "avatar",
      sourceExport: "AvatarGroups",
    },
  ],
}

const badgeEntry: ComponentEntry = {
  id: "badge",
  name: "Badge",
  category: "Data Display",
  description:
    "A compact status label. Six variants, a fixed height, and a polymorphic render prop for linking.",
  sourcePath: "src/components/ui/badge.tsx",
  importStatement: 'import { Badge } from "@/components/ui/badge"',
  exports: ["Badge", "badgeVariants"],
  keywords: ["tag", "chip", "label", "status", "pill"],
  notes: [
    "Hover styles only apply when the badge renders as an anchor, so a static badge never looks clickable.",
  ],
  playground: definePlayground({
    tag: "Badge",
    component: BadgePlayground,
    controls: {
      variant: selectControl({
        label: "Variant",
        options: [
          "default",
          "secondary",
          "destructive",
          "outline",
          "ghost",
          "link",
        ],
        defaultValue: "default",
      }),
      children: textControl({
        label: "Label",
        defaultValue: "Badge",
        codeRole: "children",
      }),
    },
  }),
  stories: [
    {
      id: "variants",
      title: "Variants",
      component: BadgeVariants,
      sourceModule: "badge",
      sourceExport: "BadgeVariants",
    },
    {
      id: "with-icons",
      title: "With icons",
      component: BadgeWithIcons,
      sourceModule: "badge",
      sourceExport: "BadgeWithIcons",
    },
    {
      id: "counts",
      title: "Counts",
      component: BadgeCounts,
      sourceModule: "badge",
      sourceExport: "BadgeCounts",
    },
    {
      id: "as-link",
      title: "Rendered as a link",
      component: BadgeAsLink,
      sourceModule: "badge",
      sourceExport: "BadgeAsLink",
    },
  ],
}

const cardEntry: ComponentEntry = {
  id: "card",
  name: "Card",
  category: "Data Display",
  description:
    "A surface with header, content and footer slots. A single --card-spacing variable drives padding and gap, so the size prop reflows the whole card.",
  sourcePath: "src/components/ui/card.tsx",
  importStatement:
    'import {\n  Card,\n  CardAction,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from "@/components/ui/card"',
  exports: [
    "Card",
    "CardHeader",
    "CardFooter",
    "CardTitle",
    "CardAction",
    "CardDescription",
    "CardContent",
  ],
  keywords: ["panel", "surface", "container", "tile"],
  notes: [
    "CardFooter gets a muted background and a top border automatically, and removes the card's bottom padding.",
    "An <img> as the first or last child is corner-clipped to the card.",
  ],
  playground: definePlayground({
    tag: "Card",
    component: CardPlayground,
    controls: {
      size: selectControl({
        label: "Size",
        options: ["default", "sm"],
        defaultValue: "default",
      }),
      showAction: booleanControl({
        label: "Header action",
        defaultValue: true,
        codeRole: "none",
      }),
      showFooter: booleanControl({
        label: "Footer",
        defaultValue: true,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "sizes",
      title: "Sizes",
      component: CardSizes,
      layout: "stretch",
      sourceModule: "card",
      sourceExport: "CardSizes",
    },
    {
      id: "with-form",
      title: "With a form",
      component: CardWithForm,
      sourceModule: "card",
      sourceExport: "CardWithForm",
    },
    {
      id: "with-media",
      title: "With media and an action",
      component: CardWithMedia,
      sourceModule: "card",
      sourceExport: "CardWithMedia",
    },
  ],
}

const chartEntry: ComponentEntry = {
  id: "chart",
  name: "Chart",
  category: "Data Display",
  description:
    "A themed Recharts wrapper. ChartContainer injects a CSS variable per series from your ChartConfig, so charts follow light and dark like everything else.",
  sourcePath: "src/components/ui/chart.tsx",
  importStatement:
    'import {\n  ChartContainer,\n  ChartLegend,\n  ChartLegendContent,\n  ChartTooltip,\n  ChartTooltipContent,\n  type ChartConfig,\n} from "@/components/ui/chart"',
  exports: [
    "ChartContainer",
    "ChartTooltip",
    "ChartTooltipContent",
    "ChartLegend",
    "ChartLegendContent",
    "ChartStyle",
    "ChartConfig",
  ],
  externalDeps: ["recharts"],
  keywords: ["graph", "recharts", "analytics", "bar", "line", "pie", "area"],
  notes: [
    'Give each series color: "var(--chart-n)" — a literal hex would not re-theme.',
    "ChartContainer is aspect-video by default; set an explicit height when it sits in a flex or grid cell.",
    'Reference a series colour inside Recharts props as "var(--color-<key>)", which ChartStyle defines for both themes.',
  ],
  playground: definePlayground({
    tag: "ChartContainer",
    component: ChartPlayground,
    layout: "stretch",
    // The default generator would only describe ChartContainer; the props on
    // show here actually belong to the tooltip and legend inside it.
    snippet: (values) =>
      [
        '<ChartContainer config={chartConfig} className="h-[260px] w-full">',
        "  <BarChart data={data}>",
        "    <CartesianGrid vertical={false} />",
        '    <XAxis dataKey="month" tickLine={false} axisLine={false} />',
        "    <ChartTooltip",
        `      content={<ChartTooltipContent indicator="${values.indicator}"${
          values.hideLabel ? " hideLabel" : ""
        } />}`,
        "    />",
        ...(values.showLegend
          ? ["    <ChartLegend content={<ChartLegendContent />} />"]
          : []),
        '    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />',
        '    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />',
        "  </BarChart>",
        "</ChartContainer>",
      ].join("\n"),
    controls: {
      indicator: selectControl({
        label: "Tooltip indicator",
        options: ["dot", "line", "dashed"],
        defaultValue: "dot",
      }),
      hideLabel: booleanControl({
        label: "Hide tooltip label",
        defaultValue: false,
      }),
      showLegend: booleanControl({
        label: "Legend",
        defaultValue: true,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "area",
      title: "Area",
      component: ChartArea,
      layout: "stretch",
      sourceModule: "chart",
      sourceExport: "ChartArea",
    },
    {
      id: "bar",
      title: "Bar",
      component: ChartBar,
      layout: "stretch",
      sourceModule: "chart",
      sourceExport: "ChartBar",
    },
    {
      id: "line",
      title: "Line",
      component: ChartLine,
      layout: "stretch",
      sourceModule: "chart",
      sourceExport: "ChartLine",
    },
    {
      id: "pie",
      title: "Pie",
      component: ChartPie,
      layout: "stretch",
      sourceModule: "chart",
      sourceExport: "ChartPie",
    },
  ],
}

const emptyEntry: ComponentEntry = {
  id: "empty",
  name: "Empty",
  category: "Data Display",
  description:
    "An empty-state block: optional media, a title, a description, and a content slot for recovery actions.",
  sourcePath: "src/components/ui/empty.tsx",
  importStatement:
    'import {\n  Empty,\n  EmptyContent,\n  EmptyDescription,\n  EmptyHeader,\n  EmptyMedia,\n  EmptyTitle,\n} from "@/components/ui/empty"',
  exports: [
    "Empty",
    "EmptyHeader",
    "EmptyTitle",
    "EmptyDescription",
    "EmptyContent",
    "EmptyMedia",
  ],
  keywords: ["placeholder", "no results", "zero state", "blank"],
  notes: [
    "The root carries border-dashed but no border width — add border or border-2 yourself.",
    "Links inside EmptyDescription are underlined and pick up the primary colour on hover automatically.",
  ],
  playground: definePlayground({
    tag: "Empty",
    layout: "stretch",
    component: EmptyPlayground,
    controls: {
      mediaVariant: selectControl({
        label: "Media variant",
        options: ["default", "icon"],
        defaultValue: "icon",
        codeRole: "none",
      }),
      title: textControl({
        label: "Title",
        defaultValue: "No projects yet",
        codeRole: "none",
      }),
      description: textControl({
        label: "Description",
        defaultValue: "Create your first project to get started.",
        codeRole: "none",
      }),
      showAction: booleanControl({
        label: "Action",
        defaultValue: true,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "media",
      title: "Media variants",
      component: EmptyMediaVariants,
      layout: "stretch",
      sourceModule: "empty",
      sourceExport: "EmptyMediaVariants",
    },
    {
      id: "with-actions",
      title: "With actions",
      component: EmptyWithActions,
      layout: "stretch",
      sourceModule: "empty",
      sourceExport: "EmptyWithActions",
    },
    {
      id: "minimal",
      title: "Minimal",
      component: EmptyMinimal,
      layout: "stretch",
      sourceModule: "empty",
      sourceExport: "EmptyMinimal",
    },
  ],
}

const itemEntry: ComponentEntry = {
  id: "item",
  name: "Item",
  category: "Data Display",
  description:
    "A horizontal row with media, content and actions — the building block for lists, settings rows and menu entries.",
  sourcePath: "src/components/ui/item.tsx",
  importStatement:
    'import {\n  Item,\n  ItemActions,\n  ItemContent,\n  ItemDescription,\n  ItemGroup,\n  ItemMedia,\n  ItemSeparator,\n  ItemTitle,\n} from "@/components/ui/item"',
  exports: [
    "Item",
    "ItemMedia",
    "ItemContent",
    "ItemActions",
    "ItemGroup",
    "ItemSeparator",
    "ItemTitle",
    "ItemDescription",
    "ItemHeader",
    "ItemFooter",
  ],
  keywords: ["list", "row", "setting", "media object"],
  notes: [
    "ItemMedia has its own variant: icon gives a muted tile, image sizes for a picture or avatar.",
    'size="xs" collapses its padding entirely inside a DropdownMenuContent.',
  ],
  playground: definePlayground({
    tag: "Item",
    layout: "stretch",
    component: ItemPlayground,
    controls: {
      variant: selectControl({
        label: "Variant",
        options: ["default", "outline", "muted"],
        defaultValue: "outline",
      }),
      size: selectControl({
        label: "Size",
        options: ["default", "sm", "xs"],
        defaultValue: "default",
      }),
      mediaVariant: selectControl({
        label: "Media variant",
        options: ["default", "icon", "image"],
        defaultValue: "icon",
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "variants",
      title: "Variants",
      component: ItemVariants,
      layout: "stretch",
      sourceModule: "item",
      sourceExport: "ItemVariants",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: ItemSizes,
      layout: "stretch",
      sourceModule: "item",
      sourceExport: "ItemSizes",
    },
    {
      id: "groups",
      title: "Groups",
      component: ItemGroups,
      layout: "stretch",
      sourceModule: "item",
      sourceExport: "ItemGroups",
    },
    {
      id: "settings",
      title: "As settings rows",
      component: ItemAsSetting,
      layout: "stretch",
      sourceModule: "item",
      sourceExport: "ItemAsSetting",
    },
  ],
}

const markerEntry: ComponentEntry = {
  id: "marker",
  name: "Marker",
  category: "Data Display",
  description:
    "A muted inline label for section breaks and timeline dividers. The separator variant draws rules on both sides using pseudo-elements.",
  sourcePath: "src/components/ui/marker.tsx",
  importStatement:
    'import {\n  Marker,\n  MarkerContent,\n  MarkerIcon,\n} from "@/components/ui/marker"',
  exports: ["Marker", "MarkerIcon", "MarkerContent", "markerVariants"],
  keywords: ["divider", "label", "timeline", "caption"],
  playground: definePlayground({
    tag: "Marker",
    layout: "stretch",
    component: MarkerPlayground,
    controls: {
      variant: selectControl({
        label: "Variant",
        options: ["default", "separator", "border"],
        defaultValue: "default",
      }),
      children: textControl({
        label: "Text",
        defaultValue: "Today",
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "variants",
      title: "Variants",
      component: MarkerVariants,
      layout: "stretch",
      sourceModule: "marker",
      sourceExport: "MarkerVariants",
    },
    {
      id: "with-icon",
      title: "With an icon",
      component: MarkerWithIcon,
      layout: "stretch",
      sourceModule: "marker",
      sourceExport: "MarkerWithIcon",
    },
    {
      id: "timeline",
      title: "As a timeline divider",
      component: MarkerAsTimelineDivider,
      layout: "stretch",
      sourceModule: "marker",
      sourceExport: "MarkerAsTimelineDivider",
    },
  ],
}

const paginationEntry: ComponentEntry = {
  id: "pagination",
  name: "Pagination",
  category: "Data Display",
  description:
    "Page navigation built from anchors. PaginationLink switches between the outline and ghost button variants based on isActive.",
  sourcePath: "src/components/ui/pagination.tsx",
  importStatement:
    'import {\n  Pagination,\n  PaginationContent,\n  PaginationEllipsis,\n  PaginationItem,\n  PaginationLink,\n  PaginationNext,\n  PaginationPrevious,\n} from "@/components/ui/pagination"',
  exports: [
    "Pagination",
    "PaginationContent",
    "PaginationEllipsis",
    "PaginationItem",
    "PaginationLink",
    "PaginationNext",
    "PaginationPrevious",
  ],
  keywords: ["pager", "pages", "next", "previous"],
  notes: [
    'isActive also sets aria-current="page", so assistive tech announces the current page.',
    "Previous and Next take a text prop for relabelling without rebuilding the component.",
  ],
  playground: definePlayground({
    tag: "Pagination",
    component: PaginationPlayground,
    controls: {
      previousText: textControl({
        label: "Previous label",
        defaultValue: "Previous",
        codeRole: "none",
      }),
      nextText: textControl({
        label: "Next label",
        defaultValue: "Next",
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: PaginationBasic,
      sourceModule: "pagination",
      sourceExport: "PaginationBasic",
    },
    {
      id: "ellipsis",
      title: "With an ellipsis",
      component: PaginationWithEllipsis,
      sourceModule: "pagination",
      sourceExport: "PaginationWithEllipsis",
    },
    {
      id: "custom-labels",
      title: "Custom labels",
      component: PaginationCustomLabels,
      sourceModule: "pagination",
      sourceExport: "PaginationCustomLabels",
    },
  ],
}

const progressEntry: ComponentEntry = {
  id: "progress",
  name: "Progress",
  category: "Data Display",
  description:
    "A determinate or indeterminate progress bar. The root renders its own track and indicator, so children stack above the bar.",
  sourcePath: "src/components/ui/progress.tsx",
  importStatement:
    'import {\n  Progress,\n  ProgressLabel,\n  ProgressValue,\n} from "@/components/ui/progress"',
  exports: [
    "Progress",
    "ProgressTrack",
    "ProgressIndicator",
    "ProgressLabel",
    "ProgressValue",
  ],
  keywords: ["loading", "bar", "percent", "determinate"],
  notes: [
    "value={null} switches to the indeterminate animation.",
    "ProgressValue pushes itself right with ml-auto, so a label plus a value lays out with no extra wrapper.",
  ],
  playground: definePlayground({
    tag: "Progress",
    layout: "stretch",
    component: ProgressPlayground,
    controls: {
      value: numberControl({
        label: "Value",
        defaultValue: 45,
        min: 0,
        max: 100,
        step: 1,
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Values",
      component: ProgressBasic,
      sourceModule: "progress",
      sourceExport: "ProgressBasic",
    },
    {
      id: "with-label",
      title: "With a label and value",
      component: ProgressWithLabel,
      sourceModule: "progress",
      sourceExport: "ProgressWithLabel",
    },
    {
      id: "indeterminate",
      title: "Indeterminate",
      component: ProgressIndeterminate,
      sourceModule: "progress",
      sourceExport: "ProgressIndeterminate",
    },
    {
      id: "animated",
      title: "Driven by an interval",
      component: ProgressAnimated,
      sourceModule: "progress",
      sourceExport: "ProgressAnimated",
    },
  ],
}

const skeletonEntry: ComponentEntry = {
  id: "skeleton",
  name: "Skeleton",
  category: "Data Display",
  description:
    "A pulsing placeholder block. It has no intrinsic size — you give it one, usually matching the element it stands in for.",
  sourcePath: "src/components/ui/skeleton.tsx",
  importStatement: 'import { Skeleton } from "@/components/ui/skeleton"',
  exports: ["Skeleton"],
  keywords: ["loading", "placeholder", "shimmer", "ghost"],
  notes: [
    "Mirror the real layout's spacing so nothing shifts when the content arrives.",
  ],
  playground: definePlayground({
    tag: "Skeleton",
    component: SkeletonPlayground,
    controls: {
      width: numberControl({
        label: "Width",
        defaultValue: 200,
        min: 40,
        max: 360,
        step: 4,
        codeRole: "none",
      }),
      height: numberControl({
        label: "Height",
        defaultValue: 16,
        min: 4,
        max: 120,
        step: 2,
        codeRole: "none",
      }),
      rounded: selectControl({
        label: "Radius",
        options: ["sm", "md", "lg", "full"],
        defaultValue: "md",
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "card",
      title: "Card placeholder",
      component: SkeletonCard,
      sourceModule: "skeleton",
      sourceExport: "SkeletonCard",
    },
    {
      id: "list",
      title: "List placeholder",
      component: SkeletonList,
      sourceModule: "skeleton",
      sourceExport: "SkeletonList",
    },
    {
      id: "text",
      title: "Text placeholder",
      component: SkeletonText,
      sourceModule: "skeleton",
      sourceExport: "SkeletonText",
    },
  ],
}

const spinnerEntry: ComponentEntry = {
  id: "spinner",
  name: "Spinner",
  category: "Data Display",
  description:
    'A rotating loader with role="status" and a built-in accessible name, sized through className.',
  sourcePath: "src/components/ui/spinner.tsx",
  importStatement: 'import { Spinner } from "@/components/ui/spinner"',
  exports: ["Spinner"],
  keywords: ["loading", "loader", "busy", "pending"],
  notes: [
    'It already carries role="status" and aria-label="Loading" — don\'t add a second label.',
    "Inside a Button it inherits the button's icon sizing, so no className is needed there.",
  ],
  playground: definePlayground({
    tag: "Spinner",
    component: SpinnerPlayground,
    controls: {
      size: selectControl({
        label: "Size",
        options: ["sm", "default", "lg"],
        defaultValue: "default",
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "sizes",
      title: "Sizes",
      component: SpinnerSizes,
      sourceModule: "spinner",
      sourceExport: "SpinnerSizes",
    },
    {
      id: "in-buttons",
      title: "In buttons",
      component: SpinnerInButtons,
      sourceModule: "spinner",
      sourceExport: "SpinnerInButtons",
    },
    {
      id: "with-label",
      title: "With a label",
      component: SpinnerWithLabel,
      sourceModule: "spinner",
      sourceExport: "SpinnerWithLabel",
    },
  ],
}

const tableEntry: ComponentEntry = {
  id: "table",
  name: "Table",
  category: "Data Display",
  description:
    "Styled native table elements, wrapped in a horizontally scrollable container so wide tables never break the page.",
  sourcePath: "src/components/ui/table.tsx",
  importStatement:
    'import {\n  Table,\n  TableBody,\n  TableCaption,\n  TableCell,\n  TableFooter,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from "@/components/ui/table"',
  exports: [
    "Table",
    "TableHeader",
    "TableBody",
    "TableFooter",
    "TableHead",
    "TableRow",
    "TableCell",
    "TableCaption",
  ],
  keywords: ["grid", "data", "rows", "columns", "spreadsheet"],
  notes: [
    "These are presentation only — sorting, selection and virtualisation are yours to add.",
    "Use tabular-nums on numeric cells so digits line up between rows.",
  ],
  playground: definePlayground({
    tag: "Table",
    layout: "stretch",
    component: TablePlayground,
    controls: {
      showCaption: booleanControl({
        label: "Caption",
        defaultValue: true,
        codeRole: "none",
      }),
      showFooter: booleanControl({
        label: "Footer",
        defaultValue: false,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: TableBasic,
      layout: "stretch",
      sourceModule: "table",
      sourceExport: "TableBasic",
    },
    {
      id: "with-footer",
      title: "With a footer",
      component: TableWithFooter,
      layout: "stretch",
      sourceModule: "table",
      sourceExport: "TableWithFooter",
    },
  ],
}

export const dataDisplayEntries: readonly ComponentEntry[] = [
  alertEntry,
  avatarEntry,
  badgeEntry,
  cardEntry,
  chartEntry,
  emptyEntry,
  itemEntry,
  markerEntry,
  paginationEntry,
  progressEntry,
  skeletonEntry,
  spinnerEntry,
  tableEntry,
]
