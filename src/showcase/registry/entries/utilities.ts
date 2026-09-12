import {
  booleanControl,
  numberControl,
  selectControl,
  textControl,
} from "@/showcase/lib/controls"
import { definePlayground } from "@/showcase/registry/define-playground"
import type { ComponentEntry } from "@/showcase/registry/types"
import {
  DirectionPlayground,
  DirectionSideBySide,
  DirectionToggleDemo,
} from "@/showcase/demos/direction"
import {
  PortalCustomTarget,
  PortalDefault,
  PortalOptionalToggle,
  PortalPlayground,
} from "@/showcase/demos/portal"
import {
  TransitionCustom,
  TransitionDefault,
  TransitionDelays,
  TransitionKeepMounted,
  TransitionLifecycle,
  TransitionPlayground,
  TransitionPresetGallery,
} from "@/showcase/demos/transition"
import {
  VisuallyHiddenDefault,
  VisuallyHiddenPlayground,
  VisuallyHiddenPolymorphic,
  VisuallyHiddenWithIcon,
} from "@/showcase/demos/visually-hidden"

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

const visuallyHiddenEntry: ComponentEntry = {
  id: "visually-hidden",
  name: "Visually Hidden",
  category: "Utilities",
  description:
    "Hides content visually while keeping it available to screen readers. Renders a span (or any element via render) with Tailwind's sr-only styles.",
  sourcePath: "src/components/ui/visually-hidden.tsx",
  importStatement:
    'import { VisuallyHidden } from "@/components/ui/visually-hidden"',
  exports: ["VisuallyHidden"],
  keywords: ["sr-only", "screen-reader", "a11y", "accessibility", "hidden"],
  notes: [
    "Pair it with an icon-only control to give assistive technology an accessible name without adding visible label text.",
    "Use render to output a different element (e.g. a heading) that should exist in the document structure but stay invisible on screen.",
  ],
  playground: definePlayground({
    tag: "VisuallyHidden",
    component: VisuallyHiddenPlayground,
    controls: {
      children: textControl({
        label: "Hidden text",
        defaultValue: "Like post",
        codeRole: "children",
      }),
    },
  }),
  stories: [
    {
      id: "default",
      title: "Default",
      description:
        "The wrapped text is removed from view but stays in the accessibility tree.",
      component: VisuallyHiddenDefault,
      sourceModule: "visually-hidden",
      sourceExport: "VisuallyHiddenDefault",
    },
    {
      id: "with-icon",
      title: "Icon-only button label",
      description:
        "An icon button paired with visually hidden text so screen readers announce its purpose.",
      component: VisuallyHiddenWithIcon,
      sourceModule: "visually-hidden",
      sourceExport: "VisuallyHiddenWithIcon",
    },
    {
      id: "polymorphic",
      title: "Rendered as a different element",
      description:
        "render={<h2 />} keeps a section heading in the document outline while hiding it visually.",
      component: VisuallyHiddenPolymorphic,
      sourceModule: "visually-hidden",
      sourceExport: "VisuallyHiddenPolymorphic",
    },
  ],
}

const portalEntry: ComponentEntry = {
  id: "portal",
  name: "Portal",
  category: "Utilities",
  description:
    "Renders children into a DOM node outside the parent hierarchy — document.body by default, or a custom target. Escapes clipping (overflow-hidden) and stacking/positioning contexts (a transformed ancestor) that would otherwise trap absolutely or fixed positioned content.",
  sourcePath: "src/components/ui/portal.tsx",
  importStatement:
    'import { OptionalPortal, Portal } from "@/components/ui/portal"',
  exports: ["Portal", "OptionalPortal"],
  keywords: ["portal", "createportal", "overlay", "document.body", "target"],
  notes: [
    "There is no generic Portal primitive in @base-ui/react to wrap — every Base UI primitive (Dialog, Popover, Tooltip, ...) only exposes its own context-scoped Portal sub-component tied to that primitive's Root. This is a standalone react-dom createPortal implementation instead.",
    "reuseTargetNode (default true) shares one container node across every Portal instance that doesn't set target. Set it to false to give an instance its own node, or set target to render into a specific element or CSS selector.",
    "OptionalPortal adds a withinPortal prop: false renders children in place instead of portaling them, useful when portaling should be conditional (e.g. disabled on small screens).",
    "Unlike most components here, Portal exposes no ref — it has no single root element to forward one to once children are portaled elsewhere.",
  ],
  playground: definePlayground({
    tag: "OptionalPortal",
    component: PortalPlayground,
    controls: {
      withinPortal: booleanControl({
        label: "Within portal",
        defaultValue: true,
      }),
    },
    snippet: (values) =>
      [
        `<OptionalPortal${values.withinPortal ? "" : " withinPortal={false}"}>`,
        `  <div>Portaled content</div>`,
        `</OptionalPortal>`,
      ].join("\n"),
  }),
  stories: [
    {
      id: "default",
      title: "Escaping a clipped container",
      description:
        "Portal renders its children as a direct child of document.body, so an overflow-hidden ancestor never clips them.",
      component: PortalDefault,
      sourceModule: "portal",
      sourceExport: "PortalDefault",
    },
    {
      id: "custom-target",
      title: "Custom target",
      description:
        "target points Portal at a specific element instead of document.body.",
      component: PortalCustomTarget,
      sourceModule: "portal",
      sourceExport: "PortalCustomTarget",
    },
    {
      id: "optional-toggle",
      title: "Conditional portaling",
      description:
        "OptionalPortal's withinPortal prop switches between portaling and rendering in place.",
      component: PortalOptionalToggle,
      sourceModule: "portal",
      sourceExport: "PortalOptionalToggle",
    },
  ],
}

const transitionEntry: ComponentEntry = {
  id: "transition",
  name: "Transition",
  category: "Utilities",
  description:
    "Headless enter/exit animation primitive. Drives a render-prop child through a timed mount/unmount state machine, handing it computed inline styles — 20 built-in presets or a fully custom transition definition.",
  sourcePath: "src/components/ui/transition.tsx",
  importStatement: 'import { Transition } from "@/components/ui/transition"',
  exports: ["Transition"],
  keywords: [
    "animation",
    "enter",
    "exit",
    "fade",
    "mounted",
    "keepMounted",
    "motion",
  ],
  notes: [
    "children is a render-prop function, not JSX — it receives the computed style object for the current phase and must apply it to a single element it returns.",
    "Respects prefers-reduced-motion unconditionally: duration collapses to 0 and the enter/exit callbacks still fire, but nothing visibly animates.",
    'keepMounted keeps the element in the DOM instead of removing it on exit. keepMountedMode: "activity" (default) wraps it in React\'s <Activity mode="hidden">; "display-none" merges display: none into the computed styles instead.',
    "transition accepts a preset name or a custom { in, out, common?, transitionProperty } object — presets are just a lookup into the same shape.",
  ],
  playground: definePlayground({
    tag: "Transition",
    component: TransitionPlayground,
    layout: "stretch",
    controls: {
      transition: selectControl({
        label: "Transition",
        options: [
          "fade",
          "fade-up",
          "fade-down",
          "fade-left",
          "fade-right",
          "scale",
          "scale-y",
          "scale-x",
          "skew-up",
          "skew-down",
          "rotate-left",
          "rotate-right",
          "slide-down",
          "slide-up",
          "slide-left",
          "slide-right",
          "pop",
          "pop-top-left",
          "pop-top-right",
          "pop-bottom-left",
          "pop-bottom-right",
        ],
        defaultValue: "fade",
      }),
      duration: numberControl({
        label: "Duration (ms)",
        defaultValue: 250,
        min: 0,
        max: 2000,
        step: 50,
      }),
    },
    snippet: (values) =>
      [
        "const [mounted, setMounted] = useState(true)",
        "",
        `<Transition mounted={mounted} transition="${values.transition}" duration={${values.duration}}>`,
        "  {(styles) => <div style={styles}>Content</div>}",
        "</Transition>",
      ].join("\n"),
  }),
  stories: [
    {
      id: "default",
      title: "Basic fade toggle",
      description: "mounted drives the default fade preset in and out.",
      component: TransitionDefault,
      sourceModule: "transition",
      sourceExport: "TransitionDefault",
    },
    {
      id: "presets",
      title: "Preset gallery",
      description: "A sample of the 20 built-in transition presets.",
      component: TransitionPresetGallery,
      sourceModule: "transition",
      sourceExport: "TransitionPresetGallery",
    },
    {
      id: "custom",
      title: "Custom transition object",
      description:
        "transition accepts a raw { in, out, transitionProperty } object instead of a preset name.",
      component: TransitionCustom,
      sourceModule: "transition",
      sourceExport: "TransitionCustom",
    },
    {
      id: "delays",
      title: "Enter/exit delay",
      description: "enterDelay and exitDelay postpone the start of each phase.",
      component: TransitionDelays,
      sourceModule: "transition",
      sourceExport: "TransitionDelays",
    },
    {
      id: "keep-mounted",
      title: "keepMounted",
      description: "The element stays mounted in the DOM while hidden.",
      component: TransitionKeepMounted,
      sourceModule: "transition",
      sourceExport: "TransitionKeepMounted",
    },
    {
      id: "lifecycle",
      title: "Lifecycle callbacks",
      description: "onEnter, onEntered, onExit and onExited firing in order.",
      component: TransitionLifecycle,
      sourceModule: "transition",
      sourceExport: "TransitionLifecycle",
    },
  ],
}

export const utilitiesEntries: readonly ComponentEntry[] = [
  directionEntry,
  portalEntry,
  transitionEntry,
  visuallyHiddenEntry,
]
