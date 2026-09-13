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
  AnchorExternalLink,
  AnchorPlayground,
  AnchorUnderlineVariants,
  AnchorWithinText,
} from "@/showcase/demos/anchor"
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
  CodeBlock,
  CodeColorOverride,
  CodeInline,
  CodePlayground,
} from "@/showcase/demos/code"
import {
  ColorSwatchAlphaColors,
  ColorSwatchCopyOnClick,
  ColorSwatchPalette,
  ColorSwatchPlayground,
  ColorSwatchWithChildren,
} from "@/showcase/demos/color-swatch"
import {
  EmptyMediaVariants,
  EmptyMinimal,
  EmptyPlayground,
  EmptyWithActions,
} from "@/showcase/demos/empty"
import {
  HighlightAccentInsensitive,
  HighlightCaseSensitive,
  HighlightMultipleTerms,
  HighlightPerTermColors,
  HighlightPlayground,
  HighlightWholeWord,
} from "@/showcase/demos/highlight"
import {
  IndicatorColors,
  IndicatorInline,
  IndicatorPlayground,
  IndicatorPositions,
  IndicatorProcessing,
  IndicatorWithLabel,
} from "@/showcase/demos/indicator"
import {
  ItemAsSetting,
  ItemGroups,
  ItemPlayground,
  ItemSizes,
  ItemVariants,
} from "@/showcase/demos/item"
import {
  ListCustomMarker,
  ListItemIconOverride,
  ListNested,
  ListOrdered,
  ListPlayground,
  ListUnordered,
  ListWithIcon,
} from "@/showcase/demos/list"
import {
  MarkerAsTimelineDivider,
  MarkerPlayground,
  MarkerVariants,
  MarkerWithIcon,
} from "@/showcase/demos/marker"
import {
  NumberFormatterDecimalScale,
  NumberFormatterNegativeValues,
  NumberFormatterPlayground,
  NumberFormatterPrefixSuffix,
  NumberFormatterThousandSeparator,
} from "@/showcase/demos/number-formatter"
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
  RollingNumberCounter,
  RollingNumberCurrency,
  RollingNumberDigitGrowth,
  RollingNumberPlayground,
} from "@/showcase/demos/rolling-number"
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
import {
  TextAlignmentAndTransform,
  TextAsLink,
  TextLineClamp,
  TextPlayground,
  TextTruncate,
  TextWeightsAndStyles,
} from "@/showcase/demos/text"
import {
  ThemeIconColors,
  ThemeIconPaletteVariants,
  ThemeIconPlayground,
  ThemeIconRadiusValues,
  ThemeIconSizes,
  ThemeIconVariants,
} from "@/showcase/demos/theme-icon"
import {
  TitleAsLink,
  TitleLineClamp,
  TitleOrders,
  TitlePlayground,
  TitleSizeOverride,
  TitleTextWrap,
} from "@/showcase/demos/title"
import {
  TypographyCode,
  TypographyHeadings,
  TypographyLinksAndMedia,
  TypographyListsAndQuotes,
  TypographyPlayground,
  TypographyTable,
} from "@/showcase/demos/typography"

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

const anchorEntry: ComponentEntry = {
  id: "anchor",
  name: "Anchor",
  category: "Data Display",
  description:
    "Polymorphic link built on Text, with underline behavior control (always, hover, not-hover, never).",
  sourcePath: "src/components/ui/anchor.tsx",
  importStatement: 'import { Anchor } from "@/components/ui/anchor"',
  exports: ["Anchor"],
  keywords: ["link", "href", "underline", "typography", "inline", "a"],
  notes: [
    "There's no Mantine-style theme color or gradient system here, so `c` and the gradient variant aren't ported — use `className` for arbitrary colors, and `dimmed` for the common muted-link case.",
    "Mantine's classNames/styles/unstyled/vars/attributes/mod props and BoxProps spacing shorthand (m, p, w, h, bg) have no equivalent — use className/style directly.",
    'rel="noopener noreferrer" is not auto-added for target="_blank" — add it yourself, matching upstream Mantine.',
  ],
  playground: definePlayground({
    tag: "Anchor",
    component: AnchorPlayground,
    controls: {
      underline: selectControl({
        label: "Underline",
        options: ["always", "hover", "not-hover", "never"],
        defaultValue: "hover",
      }),
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      fw: selectControl({
        label: "Weight",
        options: ["400", "500", "600", "700"],
        defaultValue: "400",
      }),
      dimmed: booleanControl({ label: "Dimmed", defaultValue: false }),
    },
    snippet: (values) => {
      const props: string[] = []
      if (values.underline !== "hover")
        props.push(`underline="${values.underline}"`)
      if (values.size !== "md") props.push(`size="${values.size}"`)
      if (values.fw !== "400") props.push(`fw={${values.fw}}`)
      if (values.dimmed) props.push("dimmed")
      const attrs = props.length > 0 ? ` ${props.join(" ")}` : ""
      return `<Anchor href="#"${attrs}>Visit the documentation</Anchor>`
    },
  }),
  stories: [
    {
      id: "underline-variants",
      title: "Underline variants",
      component: AnchorUnderlineVariants,
      sourceModule: "anchor",
      sourceExport: "AnchorUnderlineVariants",
    },
    {
      id: "external-link",
      title: "External link",
      component: AnchorExternalLink,
      sourceModule: "anchor",
      sourceExport: "AnchorExternalLink",
    },
    {
      id: "within-text",
      title: "Inline within text",
      component: AnchorWithinText,
      sourceModule: "anchor",
      sourceExport: "AnchorWithinText",
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

const codeEntry: ComponentEntry = {
  id: "code",
  name: "Code",
  category: "Data Display",
  description:
    "Inline or block monospace code display. An optional color prop overrides the background via a --code-bg custom property.",
  sourcePath: "src/components/ui/code.tsx",
  importStatement: 'import { Code } from "@/components/ui/code"',
  exports: ["Code"],
  keywords: ["code", "pre", "monospace", "snippet"],
  playground: definePlayground({
    tag: "Code",
    component: CodePlayground,
    controls: {
      children: textControl({
        label: "Content",
        defaultValue: "npm install",
        codeRole: "children",
      }),
      block: booleanControl({
        label: "Block",
        defaultValue: false,
      }),
      color: textControl({
        label: "Color",
        defaultValue: "",
        placeholder: "e.g. var(--color-blue)",
      }),
    },
  }),
  stories: [
    {
      id: "inline",
      title: "Inline",
      component: CodeInline,
      sourceModule: "code",
      sourceExport: "CodeInline",
    },
    {
      id: "block",
      title: "Block",
      component: CodeBlock,
      sourceModule: "code",
      sourceExport: "CodeBlock",
    },
    {
      id: "color-override",
      title: "Color override",
      component: CodeColorOverride,
      sourceModule: "code",
      sourceExport: "CodeColorOverride",
    },
  ],
}

const colorSwatchEntry: ComponentEntry = {
  id: "color-swatch",
  name: "ColorSwatch",
  category: "Data Display",
  description:
    "A small rounded swatch that previews a raw CSS color, with a checkerboard pattern showing through semi-transparent colors and an optional inner shadow.",
  sourcePath: "src/components/ui/color-swatch.tsx",
  importStatement: 'import { ColorSwatch } from "@/components/ui/color-swatch"',
  exports: ["ColorSwatch"],
  keywords: ["color", "palette", "swatch", "picker", "hex", "rgba"],
  notes: [
    "color is a raw CSS color (hex, rgba(), or a var(--color-*) token), not a Mantine theme-key lookup — same convention as Code's and Highlight's color props.",
    "radius is a closed set (xs, sm, md, lg, xl, full) plus a raw number escape hatch; unlike most other ports, the resolved radius is shared across four internal overlay elements via an inherited --cs-radius custom property when it's a number, since Tailwind classes alone can't be applied dynamically to each of them.",
    "size has no named scale in Mantine either — it's always a raw pixel number or CSS size string, default 28.",
    "Mantine's classNames/styles/unstyled/vars/attributes/mod props and BoxProps spacing shorthand (m, p, w, h, bg) have no equivalent — use className/style directly.",
    "render is this repo's polymorphism convention (Base UI's useRender via Box), not part of Mantine's documented API — use it (e.g. render={<button type=\"button\" />}) for a clickable swatch.",
  ],
  playground: definePlayground({
    tag: "ColorSwatch",
    component: ColorSwatchPlayground,
    controls: {
      color: textControl({
        label: "Color",
        defaultValue: "var(--color-blue)",
      }),
      size: numberControl({
        label: "Size",
        defaultValue: 36,
        min: 16,
        max: 96,
        step: 2,
      }),
      radius: selectControl({
        label: "Radius",
        options: ["xs", "sm", "md", "lg", "xl", "full"],
        defaultValue: "full",
      }),
      withShadow: booleanControl({ label: "With shadow", defaultValue: true }),
    },
  }),
  stories: [
    {
      id: "palette",
      title: "Palette",
      component: ColorSwatchPalette,
      sourceModule: "color-swatch",
      sourceExport: "ColorSwatchPalette",
    },
    {
      id: "alpha-colors",
      title: "Semi-transparent colors",
      description:
        "A checkerboard pattern shows through so transparency stays visible against any background.",
      component: ColorSwatchAlphaColors,
      sourceModule: "color-swatch",
      sourceExport: "ColorSwatchAlphaColors",
    },
    {
      id: "with-children",
      title: "With children and shadow control",
      component: ColorSwatchWithChildren,
      sourceModule: "color-swatch",
      sourceExport: "ColorSwatchWithChildren",
    },
    {
      id: "copy-on-click",
      title: "Copy on click",
      description:
        'Rendered as a button (render={<button type="button" />}) and wired to useClipboard.',
      component: ColorSwatchCopyOnClick,
      sourceModule: "color-swatch",
      sourceExport: "ColorSwatchCopyOnClick",
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

const highlightEntry: ComponentEntry = {
  id: "highlight",
  name: "Highlight",
  category: "Data Display",
  description:
    "Wraps Text and highlights every occurrence of one or more substrings inside its children with mark, with optional whole-word, case-insensitive and accent-insensitive matching and per-term colors.",
  sourcePath: "src/components/ui/highlight.tsx",
  importStatement: 'import { Highlight } from "@/components/ui/highlight"',
  exports: ["Highlight"],
  keywords: ["search", "match", "mark", "substring", "term", "query"],
  notes: [
    "highlight accepts a string, a string[], or an array of { text, color } terms — a per-term color wins over the top-level color prop for that term's matches.",
    "Mantine's highlightStyles escape hatch isn't ported — there's no theme system here (see Text/Title), so use className, e.g. \"[&_mark]:font-bold\", to restyle matches.",
    "color is a raw CSS color (hex, oklch()/color-mix(), or a var(--color-*) token) applied via a --highlight-bg custom property, not a Mantine theme-key lookup — same convention as Code's color prop.",
    "Mantine's separate Mark component isn't ported as its own file — mark rendering is inlined into Highlight since nothing else in this repo needs a standalone Mark yet.",
    "Mantine's classNames/styles/unstyled/vars/attributes/mod props and BoxProps spacing shorthand (m, p, w, h, bg) have no equivalent — use className/style directly.",
  ],
  playground: definePlayground({
    tag: "Highlight",
    component: HighlightPlayground,
    controls: {
      children: textControl({
        label: "Text",
        defaultValue: "The quick brown fox jumps over the lazy dog.",
        codeRole: "children",
      }),
      highlight: textControl({
        label: "Highlight (comma-separated)",
        defaultValue: "quick, lazy",
      }),
      color: textControl({
        label: "Color",
        defaultValue: "",
        placeholder: "e.g. var(--color-blue)",
      }),
      wholeWord: booleanControl({
        label: "Whole word",
        defaultValue: false,
      }),
      caseInsensitive: booleanControl({
        label: "Case insensitive",
        defaultValue: true,
      }),
      accentInsensitive: booleanControl({
        label: "Accent insensitive",
        defaultValue: true,
      }),
    },
    snippet: (values) => {
      const terms = String(values.highlight)
        .split(",")
        .map((term) => term.trim())
        .filter(Boolean)
      const props: string[] = [`highlight={${JSON.stringify(terms)}}`]
      if (values.color) props.push(`color="${values.color}"`)
      if (values.wholeWord) props.push("wholeWord")
      if (!values.caseInsensitive) props.push("caseInsensitive={false}")
      if (!values.accentInsensitive) props.push("accentInsensitive={false}")
      return `<Highlight ${props.join(" ")}>\n  ${values.children}\n</Highlight>`
    },
  }),
  stories: [
    {
      id: "multiple-terms",
      title: "Multiple terms",
      component: HighlightMultipleTerms,
      sourceModule: "highlight",
      sourceExport: "HighlightMultipleTerms",
    },
    {
      id: "per-term-colors",
      title: "Per-term colors",
      component: HighlightPerTermColors,
      sourceModule: "highlight",
      sourceExport: "HighlightPerTermColors",
    },
    {
      id: "whole-word",
      title: "Whole word matching",
      component: HighlightWholeWord,
      sourceModule: "highlight",
      sourceExport: "HighlightWholeWord",
    },
    {
      id: "accent-insensitive",
      title: "Accent-insensitive matching",
      component: HighlightAccentInsensitive,
      sourceModule: "highlight",
      sourceExport: "HighlightAccentInsensitive",
    },
    {
      id: "case-sensitive",
      title: "Case-sensitive matching",
      component: HighlightCaseSensitive,
      sourceModule: "highlight",
      sourceExport: "HighlightCaseSensitive",
    },
  ],
}

const indicatorEntry: ComponentEntry = {
  id: "indicator",
  name: "Indicator",
  category: "Data Display",
  description:
    "A dot or badge anchored to a corner or edge of its child — notification counts, status dots, and a processing pulse.",
  sourcePath: "src/components/ui/indicator.tsx",
  importStatement: 'import { Indicator } from "@/components/ui/indicator"',
  exports: ["Indicator"],
  keywords: [
    "badge",
    "dot",
    "notification",
    "status",
    "online",
    "count",
    "pulse",
  ],
  notes: [
    "color is a closed set (primary, secondary, destructive, accent, muted) mapped to this design system's tokens, not an open theme-color prop.",
    "radius is a closed set (xs, sm, md, lg, xl); omit it for the default fully-rounded dot.",
    "processing uses Tailwind's built-in animate-ping utility rather than a custom keyframe.",
  ],
  playground: definePlayground({
    tag: "Indicator",
    component: IndicatorPlayground,
    controls: {
      position: selectControl({
        label: "Position",
        options: [
          "top-start",
          "top-center",
          "top-end",
          "middle-start",
          "middle-center",
          "middle-end",
          "bottom-start",
          "bottom-center",
          "bottom-end",
        ],
        defaultValue: "top-end",
      }),
      color: selectControl({
        label: "Color",
        options: ["primary", "secondary", "destructive", "accent", "muted"],
        defaultValue: "primary",
      }),
      size: numberControl({
        label: "Size",
        defaultValue: 10,
        min: 4,
        max: 32,
      }),
      label: textControl({
        label: "Label",
        defaultValue: "",
        placeholder: "e.g. 3",
      }),
      withBorder: booleanControl({ label: "With border", defaultValue: true }),
      processing: booleanControl({ label: "Processing", defaultValue: false }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "positions",
      title: "Positions",
      component: IndicatorPositions,
      sourceModule: "indicator",
      sourceExport: "IndicatorPositions",
    },
    {
      id: "with-label",
      title: "With label",
      component: IndicatorWithLabel,
      sourceModule: "indicator",
      sourceExport: "IndicatorWithLabel",
    },
    {
      id: "colors",
      title: "Colors",
      component: IndicatorColors,
      sourceModule: "indicator",
      sourceExport: "IndicatorColors",
    },
    {
      id: "processing",
      title: "Processing",
      component: IndicatorProcessing,
      sourceModule: "indicator",
      sourceExport: "IndicatorProcessing",
    },
    {
      id: "inline",
      title: "Inline",
      component: IndicatorInline,
      sourceModule: "indicator",
      sourceExport: "IndicatorInline",
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

const listEntry: ComponentEntry = {
  id: "list",
  name: "List",
  category: "Data Display",
  description:
    "Styled ul/ol wrapper with a compound List.Item — swap the native bullet/number for an icon, per-item or list-wide, via List.Item's icon prop or List's own icon default.",
  sourcePath: "src/components/ui/list.tsx",
  importStatement: 'import { List } from "@/components/ui/list"',
  exports: ["List", "ListItem"],
  keywords: ["ul", "ol", "bullet", "ordered", "unordered", "checklist", "icon"],
  notes: [
    "spacing/size xs–xl map to static Tailwind classes, not inline styles — a number or raw CSS string falls back to a --list-spacing custom property instead (same convention as Container's size and Space's w/h).",
    "Marker-gap padding (pl-0/pl-4/pl-5/pl-9) is resolved in JS from icon presence × withPadding — Mantine computes the same four values from CSS custom properties, but they form a closed set here so no calc()/var() is needed.",
    "center only tightens line-height on every item — Mantine's own CSS already rows-and-centers any item with an icon regardless of this prop.",
    'start/reversed only take effect with type="ordered" — they\'re native <ol> numbering attributes.',
    "Mantine's classNames/styles/unstyled/vars/attributes/mod props and BoxProps spacing shorthand (m, p, w, h, bg) have no equivalent — use className/style directly.",
  ],
  playground: definePlayground({
    tag: "List",
    layout: "stretch",
    component: ListPlayground,
    controls: {
      type: selectControl({
        label: "Type",
        options: ["unordered", "ordered"],
        defaultValue: "unordered",
      }),
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      spacing: selectControl({
        label: "Spacing",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "sm",
      }),
      center: booleanControl({ label: "Center", defaultValue: false }),
      withPadding: booleanControl({
        label: "With padding",
        defaultValue: false,
      }),
    },
  }),
  stories: [
    {
      id: "unordered",
      title: "Unordered",
      component: ListUnordered,
      sourceModule: "list",
      sourceExport: "ListUnordered",
    },
    {
      id: "ordered",
      title: "Ordered, reversed",
      component: ListOrdered,
      sourceModule: "list",
      sourceExport: "ListOrdered",
    },
    {
      id: "with-icon",
      title: "With an icon",
      component: ListWithIcon,
      sourceModule: "list",
      sourceExport: "ListWithIcon",
    },
    {
      id: "item-icon-override",
      title: "Per-item icon override",
      component: ListItemIconOverride,
      sourceModule: "list",
      sourceExport: "ListItemIconOverride",
    },
    {
      id: "nested",
      title: "Nested, with padding",
      component: ListNested,
      sourceModule: "list",
      sourceExport: "ListNested",
    },
    {
      id: "custom-marker",
      title: "Custom marker",
      component: ListCustomMarker,
      sourceModule: "list",
      sourceExport: "ListCustomMarker",
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

const numberFormatterEntry: ComponentEntry = {
  id: "number-formatter",
  name: "NumberFormatter",
  category: "Data Display",
  description:
    "Formats a number as text with a thousand separator, decimal separator, decimal scale, and an optional prefix/suffix.",
  sourcePath: "src/components/ui/number-formatter.tsx",
  importStatement:
    'import { NumberFormatter } from "@/components/ui/number-formatter"',
  exports: ["NumberFormatter", "formatNumber"],
  keywords: ["number", "currency", "format", "decimal", "thousands"],
  notes: [
    "Mantine's thousandsGroupStyle (lakh/wan Indian and Chinese grouping variants) isn't ported — only standard 3-digit thousands grouping is supported. Use a custom formatting function for lakh/wan grouping.",
    "decimalScale truncates extra decimal digits rather than rounding them, matching the underlying react-number-format library Mantine's own NumberFormatter wraps.",
    "Renders a plain span, not wrapped in Text — compose it inside Text yourself for typography control (size, weight, color), the same way Mantine's own docs do.",
  ],
  playground: definePlayground({
    tag: "NumberFormatter",
    component: NumberFormatterPlayground,
    controls: {
      value: numberControl({ label: "Value", defaultValue: 1234567.891 }),
      prefix: textControl({ label: "Prefix", defaultValue: "" }),
      suffix: textControl({ label: "Suffix", defaultValue: "" }),
      thousandSeparator: booleanControl({
        label: "Thousand separator",
        defaultValue: true,
      }),
      decimalSeparator: textControl({
        label: "Decimal separator",
        defaultValue: ".",
      }),
      decimalScale: numberControl({
        label: "Decimal scale",
        defaultValue: 2,
        min: 0,
        max: 10,
      }),
      fixedDecimalScale: booleanControl({
        label: "Fixed decimal scale",
        defaultValue: false,
      }),
      allowNegative: booleanControl({
        label: "Allow negative",
        defaultValue: true,
      }),
    },
  }),
  stories: [
    {
      id: "prefix-suffix",
      title: "Prefix and suffix",
      component: NumberFormatterPrefixSuffix,
      sourceModule: "number-formatter",
      sourceExport: "NumberFormatterPrefixSuffix",
    },
    {
      id: "thousand-separator",
      title: "Thousand separator",
      component: NumberFormatterThousandSeparator,
      sourceModule: "number-formatter",
      sourceExport: "NumberFormatterThousandSeparator",
    },
    {
      id: "decimal-scale",
      title: "Decimal scale",
      component: NumberFormatterDecimalScale,
      sourceModule: "number-formatter",
      sourceExport: "NumberFormatterDecimalScale",
    },
    {
      id: "negative-values",
      title: "Negative values",
      component: NumberFormatterNegativeValues,
      sourceModule: "number-formatter",
      sourceExport: "NumberFormatterNegativeValues",
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

const rollingNumberEntry: ComponentEntry = {
  id: "rolling-number",
  name: "RollingNumber",
  category: "Data Display",
  description:
    "An animated odometer-style number display — each digit rolls vertically when value changes, with prefix/suffix, separators, and decimal scale.",
  sourcePath: "src/components/ui/rolling-number.tsx",
  importStatement:
    'import { RollingNumber } from "@/components/ui/rolling-number"',
  exports: ["RollingNumber"],
  keywords: ["odometer", "counter", "animated", "digits", "ticker", "number"],
  notes: [
    "Built on this repo's formatNumber (from NumberFormatter) for the accessible label and the digits it animates, so it inherits the same truncate-not-round decimalScale behavior and the same pre-existing '-0' edge case for a negative value that truncates to zero.",
    "Mantine's classNames/styles/unstyled/vars/attributes/mod props and BoxProps spacing shorthand have no equivalent — use className/style directly.",
    "Only a forward roll (increasing value) wraps 9→0 smoothly; a decreasing value never needs the equivalent wrap since it never overshoots below 0.",
    "Respects prefers-reduced-motion beyond Mantine's own behavior — digits snap to the new value instead of rolling.",
  ],
  playground: definePlayground({
    tag: "RollingNumber",
    component: RollingNumberPlayground,
    controls: {
      value: numberControl({ label: "Value", defaultValue: 1234.56 }),
      prefix: textControl({ label: "Prefix", defaultValue: "" }),
      suffix: textControl({ label: "Suffix", defaultValue: "" }),
      thousandSeparator: booleanControl({
        label: "Thousand separator",
        defaultValue: true,
      }),
      decimalSeparator: textControl({
        label: "Decimal separator",
        defaultValue: ".",
      }),
      decimalScale: numberControl({
        label: "Decimal scale",
        defaultValue: 2,
        min: 0,
        max: 6,
      }),
      fixedDecimalScale: booleanControl({
        label: "Fixed decimal scale",
        defaultValue: false,
      }),
      animationDuration: numberControl({
        label: "Animation duration (ms)",
        defaultValue: 600,
        min: 100,
        max: 2000,
        step: 50,
      }),
      timingFunction: selectControl({
        label: "Timing function",
        options: ["ease", "linear", "ease-in", "ease-out", "ease-in-out"],
        defaultValue: "ease",
      }),
      tabularNumbers: booleanControl({
        label: "Tabular numbers",
        defaultValue: true,
      }),
      withLiveRegion: booleanControl({
        label: "Announce changes (live region)",
        defaultValue: false,
      }),
    },
  }),
  stories: [
    {
      id: "counter",
      title: "Counter",
      component: RollingNumberCounter,
      sourceModule: "rolling-number",
      sourceExport: "RollingNumberCounter",
    },
    {
      id: "digit-growth",
      title: "Digit growth and wraparound",
      description: "Cross the 9→10 and 99→100 boundaries to see the roll.",
      component: RollingNumberDigitGrowth,
      sourceModule: "rolling-number",
      sourceExport: "RollingNumberDigitGrowth",
    },
    {
      id: "currency",
      title: "Currency",
      component: RollingNumberCurrency,
      sourceModule: "rolling-number",
      sourceExport: "RollingNumberCurrency",
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

const textEntry: ComponentEntry = {
  id: "text",
  name: "Text",
  category: "Data Display",
  description:
    "Typographic primitive for paragraphs and inline text, with props for size, weight, alignment, truncation and line-clamping.",
  sourcePath: "src/components/ui/text.tsx",
  importStatement: 'import { Text } from "@/components/ui/text"',
  exports: ["Text"],
  keywords: [
    "typography",
    "paragraph",
    "span",
    "truncate",
    "line-clamp",
    "dimmed",
    "text-align",
    "font-weight",
  ],
  notes: [
    "There's no Mantine-style theme color or gradient system here, so `c` and the gradient variant aren't ported — use `className` for arbitrary colors, and `dimmed` for the common muted-text case.",
    "Mantine's classNames/styles/unstyled/vars/attributes/mod props and BoxProps spacing shorthand (m, p, w, h, bg) have no equivalent — use className/style directly.",
  ],
  playground: definePlayground({
    tag: "Text",
    component: TextPlayground,
    controls: {
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      fw: selectControl({
        label: "Weight",
        options: ["400", "500", "600", "700"],
        defaultValue: "400",
      }),
      fs: selectControl({
        label: "Style",
        options: ["normal", "italic"],
        defaultValue: "normal",
      }),
      ta: selectControl({
        label: "Align",
        options: ["left", "center", "right", "justify"],
        defaultValue: "left",
      }),
      tt: selectControl({
        label: "Transform",
        options: ["none", "uppercase", "lowercase", "capitalize"],
        defaultValue: "none",
      }),
      dimmed: booleanControl({ label: "Dimmed", defaultValue: false }),
      span: booleanControl({ label: "As span", defaultValue: false }),
    },
    snippet: (values) => {
      const props: string[] = []
      if (values.size !== "md") props.push(`size="${values.size}"`)
      if (values.fw !== "400") props.push(`fw={${values.fw}}`)
      if (values.fs !== "normal") props.push(`fs="${values.fs}"`)
      if (values.ta !== "left") props.push(`ta="${values.ta}"`)
      if (values.tt !== "none") props.push(`tt="${values.tt}"`)
      if (values.dimmed) props.push("dimmed")
      if (values.span) props.push("span")
      const attrs = props.length > 0 ? ` ${props.join(" ")}` : ""
      return `<Text${attrs}>The quick brown fox jumps over the lazy dog.</Text>`
    },
  }),
  stories: [
    {
      id: "weights-and-styles",
      title: "Weight and style",
      component: TextWeightsAndStyles,
      sourceModule: "text",
      sourceExport: "TextWeightsAndStyles",
    },
    {
      id: "alignment-and-transform",
      title: "Alignment, transform and decoration",
      component: TextAlignmentAndTransform,
      sourceModule: "text",
      sourceExport: "TextAlignmentAndTransform",
    },
    {
      id: "truncate",
      title: "Truncation",
      component: TextTruncate,
      sourceModule: "text",
      sourceExport: "TextTruncate",
    },
    {
      id: "line-clamp",
      title: "Line clamp",
      component: TextLineClamp,
      sourceModule: "text",
      sourceExport: "TextLineClamp",
    },
    {
      id: "as-link",
      title: "Polymorphic and dimmed",
      component: TextAsLink,
      sourceModule: "text",
      sourceExport: "TextAsLink",
    },
  ],
}

const themeIconEntry: ComponentEntry = {
  id: "theme-icon",
  name: "ThemeIcon",
  category: "Data Display",
  description:
    "A fixed-size icon container with filled, light, outline, transparent, white and default variants across this design system's semantic and named-palette colors.",
  sourcePath: "src/components/ui/theme-icon.tsx",
  importStatement: 'import { ThemeIcon } from "@/components/ui/theme-icon"',
  exports: ["ThemeIcon"],
  keywords: ["icon", "avatar", "badge", "circle", "square", "chip"],
  notes: [
    "color is a closed set of 18 values: the 5 existing semantic tokens (primary, secondary, destructive, accent, muted) plus 13 flat named palette colors (pink, red, yellow, orange, cyan, green, blue, purple, geekblue, magenta, volcano, gold, lime) already defined in index.css but previously unused — not an open theme-color prop.",
    "Only 6 variants are supported: filled, light, outline, transparent, white, default. Mantine's gradient variant and autoContrast prop are intentionally omitted — this repo has no continuous color math to resolve a gradient or compute contrast text.",
    "default is a fixed neutral look and ignores the color prop entirely, matching Mantine's own ThemeIcon behavior for this variant.",
    "size defaults to md (28px) and radius defaults to this design system's own --radius (rounded-lg, the equivalent of Mantine's theme.defaultRadius); both also accept an arbitrary number for a one-off pixel value.",
    "An <svg> child is automatically sized to 70% of the box unless it already carries its own size-* class, matching Mantine's own usage convention.",
  ],
  playground: definePlayground({
    tag: "ThemeIcon",
    component: ThemeIconPlayground,
    controls: {
      variant: selectControl({
        label: "Variant",
        options: [
          "filled",
          "light",
          "outline",
          "transparent",
          "white",
          "default",
        ],
        defaultValue: "filled",
      }),
      color: selectControl({
        label: "Color",
        options: [
          "primary",
          "secondary",
          "destructive",
          "accent",
          "muted",
          "pink",
          "red",
          "yellow",
          "orange",
          "cyan",
          "green",
          "blue",
          "purple",
          "geekblue",
          "magenta",
          "volcano",
          "gold",
          "lime",
        ],
        defaultValue: "primary",
      }),
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      radius: selectControl({
        label: "Radius",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "lg",
      }),
    },
  }),
  stories: [
    {
      id: "variants",
      title: "Variants",
      component: ThemeIconVariants,
      sourceModule: "theme-icon",
      sourceExport: "ThemeIconVariants",
    },
    {
      id: "colors",
      title: "Colors",
      component: ThemeIconColors,
      sourceModule: "theme-icon",
      sourceExport: "ThemeIconColors",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: ThemeIconSizes,
      sourceModule: "theme-icon",
      sourceExport: "ThemeIconSizes",
    },
    {
      id: "radius",
      title: "Radius",
      component: ThemeIconRadiusValues,
      sourceModule: "theme-icon",
      sourceExport: "ThemeIconRadiusValues",
    },
    {
      id: "palette-variants",
      title: "Palette colors across variants",
      component: ThemeIconPaletteVariants,
      sourceModule: "theme-icon",
      sourceExport: "ThemeIconPaletteVariants",
    },
  ],
}

const titleEntry: ComponentEntry = {
  id: "title",
  name: "Title",
  category: "Data Display",
  description:
    "Semantic h1-h6 heading primitive with an independent size scale, text-wrap control and line-clamping.",
  sourcePath: "src/components/ui/title.tsx",
  importStatement: 'import { Title } from "@/components/ui/title"',
  exports: ["Title"],
  keywords: [
    "heading",
    "h1",
    "h2",
    "h3",
    "typography",
    "order",
    "truncate",
    "line-clamp",
    "text-wrap",
  ],
  notes: [
    "There's no Mantine-style theme color, gradient, classNames/styles/unstyled/vars/attributes/mod system here, and BoxProps spacing shorthand (m, p, w, h, bg) has no equivalent — use className/style directly.",
    "`tracking-tight` is baked in by default (Mantine's own Title doesn't set letter-spacing) to match every other heading already in this codebase.",
    "`render` is a repo-specific addition for polymorphism (Base UI's useRender), not part of Mantine's documented Title API.",
  ],
  playground: definePlayground({
    tag: "Title",
    component: TitlePlayground,
    controls: {
      order: selectControl({
        label: "Order",
        options: ["1", "2", "3", "4", "5", "6"],
        defaultValue: "1",
      }),
      size: selectControl({
        label: "Size",
        options: [
          "auto",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "xs",
          "sm",
          "md",
          "lg",
          "xl",
        ],
        defaultValue: "auto",
      }),
    },
    snippet: (values) => {
      const props: string[] = []
      if (values.order !== "1") props.push(`order={${values.order}}`)
      if (values.size !== "auto") props.push(`size="${values.size}"`)
      const attrs = props.length > 0 ? ` ${props.join(" ")}` : ""
      return `<Title${attrs}>The quick brown fox jumps over the lazy dog.</Title>`
    },
  }),
  stories: [
    {
      id: "orders",
      title: "Orders",
      component: TitleOrders,
      sourceModule: "title",
      sourceExport: "TitleOrders",
    },
    {
      id: "size-override",
      title: "Size independent of order",
      component: TitleSizeOverride,
      sourceModule: "title",
      sourceExport: "TitleSizeOverride",
    },
    {
      id: "text-wrap",
      title: "Text wrap",
      component: TitleTextWrap,
      sourceModule: "title",
      sourceExport: "TitleTextWrap",
    },
    {
      id: "line-clamp",
      title: "Line clamp",
      component: TitleLineClamp,
      sourceModule: "title",
      sourceExport: "TitleLineClamp",
    },
    {
      id: "as-link",
      title: "Polymorphic",
      component: TitleAsLink,
      sourceModule: "title",
      sourceExport: "TitleAsLink",
    },
  ],
}

const typographyEntry: ComponentEntry = {
  id: "typography",
  name: "Typography",
  category: "Data Display",
  description:
    "A styles provider for raw HTML content — wraps markdown output, a CMS field, or hand-written JSX and applies heading, list, table, code and quote styling to whatever native tags land inside it.",
  sourcePath: "src/components/ui/typography.tsx",
  importStatement: 'import { Typography } from "@/components/ui/typography"',
  exports: ["Typography"],
  keywords: [
    "prose",
    "markdown",
    "rich text",
    "content",
    "article",
    "dangerouslySetInnerHTML",
  ],
  notes: [
    "Mantine's TypographyProps carries no functional props beyond its Box/Styles-API surface — classNames/styles/unstyled/vars/attributes and BoxProps spacing shorthand (m, p, w, h, bg) have no equivalent here, same as every other Mantine port; use className/style directly.",
    "Links are styled to match this repo's existing Empty convention (always underlined, primary-colored on hover) rather than Mantine's own (no underline until hover, no color change).",
    "<details>/<summary> keep the browser's native disclosure marker rather than Mantine's custom rotating-triangle affordance.",
    "Headings inside Typography use the same font family, weight and size scale as the standalone Title component, so raw HTML content matches the rest of the design system.",
  ],
  playground: definePlayground({
    tag: "Typography",
    component: TypographyPlayground,
    controls: {
      sample: selectControl({
        label: "Sample",
        options: ["article", "documentation"],
        defaultValue: "article",
        codeRole: "none",
      }),
    },
    snippet: () =>
      [
        "<Typography>",
        "  <h1>Getting started</h1>",
        "  <p>",
        "    Wrap any HTML content — markdown output, a CMS field, or",
        "    hand-written JSX — and it picks up heading, list, table, code",
        "    and quote styling automatically.",
        "  </p>",
        "</Typography>",
      ].join("\n"),
  }),
  stories: [
    {
      id: "headings",
      title: "Headings",
      component: TypographyHeadings,
      layout: "stretch",
      sourceModule: "typography",
      sourceExport: "TypographyHeadings",
    },
    {
      id: "lists-and-quotes",
      title: "Lists and quotes",
      component: TypographyListsAndQuotes,
      layout: "stretch",
      sourceModule: "typography",
      sourceExport: "TypographyListsAndQuotes",
    },
    {
      id: "code",
      title: "Code and keyboard shortcuts",
      component: TypographyCode,
      layout: "stretch",
      sourceModule: "typography",
      sourceExport: "TypographyCode",
    },
    {
      id: "table",
      title: "Table",
      component: TypographyTable,
      layout: "stretch",
      sourceModule: "typography",
      sourceExport: "TypographyTable",
    },
    {
      id: "links-and-media",
      title: "Links, images and highlights",
      component: TypographyLinksAndMedia,
      layout: "stretch",
      sourceModule: "typography",
      sourceExport: "TypographyLinksAndMedia",
    },
  ],
}

export const dataDisplayEntries: readonly ComponentEntry[] = [
  alertEntry,
  anchorEntry,
  avatarEntry,
  badgeEntry,
  cardEntry,
  chartEntry,
  codeEntry,
  colorSwatchEntry,
  emptyEntry,
  highlightEntry,
  indicatorEntry,
  itemEntry,
  listEntry,
  markerEntry,
  numberFormatterEntry,
  paginationEntry,
  progressEntry,
  rollingNumberEntry,
  skeletonEntry,
  spinnerEntry,
  tableEntry,
  textEntry,
  themeIconEntry,
  titleEntry,
  typographyEntry,
]
