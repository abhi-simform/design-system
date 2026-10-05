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
  FloatingIndicatorCallbacks,
  FloatingIndicatorDefault,
  FloatingIndicatorDisplayAfterTransitionEnd,
  FloatingIndicatorVertical,
} from "@/showcase/demos/floating-indicator"
import {
  FocusTrapAutofocus,
  FocusTrapDefault,
  FocusTrapInitialFocusDemo,
  FocusTrapPlayground,
} from "@/showcase/demos/focus-trap"
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
import {
  OverflowListCollapseFromStart,
  OverflowListControlledWidth,
  OverflowListDefault,
  OverflowListHoverCard,
  OverflowListMaxVisible,
  OverflowListMultiRow,
  OverflowListPlayground,
} from "@/showcase/demos/overflow-list"
import {
  MarqueeCustomFade,
  MarqueeDefault,
  MarqueeNoFade,
  MarqueePauseOnHover,
  MarqueePlayground,
  MarqueeReverse,
  MarqueeVertical,
} from "@/showcase/demos/marquee"
import {
  ScrollerAlwaysVisible,
  ScrollerControlProps,
  ScrollerCustomIcons,
  ScrollerDefault,
  ScrollerDraggable,
  ScrollerGradientColor,
  ScrollerPlayground,
} from "@/showcase/demos/scroller"

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

const floatingIndicatorEntry: ComponentEntry = {
  id: "floating-indicator",
  name: "Floating Indicator",
  category: "Utilities",
  description:
    "A borderless, unstyled indicator that animates between a target element's size and position within a parent container — the primitive behind sliding tab underlines, segmented controls and pill-style navigation.",
  sourcePath: "src/components/ui/floating-indicator.tsx",
  importStatement:
    'import { FloatingIndicator } from "@/components/ui/floating-indicator"',
  exports: ["FloatingIndicator"],
  keywords: [
    "indicator",
    "segmented control",
    "sliding",
    "tabs",
    "pill",
    "active state",
    "animation",
  ],
  notes: [
    "parent must have position: relative — the indicator is absolutely positioned against it and reads its geometry directly, so this is not enforced at runtime.",
    "target swaps whichever element ref is currently active; the consumer owns the ref bookkeeping (an object or array of refs plus the active key), not FloatingIndicator itself — there is no multi-target prop.",
    "Renders nothing (returns null) while target or parent is null/undefined, e.g. before refs are attached on first render.",
    "transform, width and height are written directly to the DOM node in an effect rather than through React state, so repositioning never triggers a re-render.",
    "displayAfterTransitionEnd keeps the indicator hidden until parent's own transitionend fires — use it when parent has an entrance transition (e.g. a dialog that pops in) so the indicator can't flash at a stale position mid-animation.",
    "Respects prefers-reduced-motion unconditionally by collapsing the transition duration to 0ms.",
  ],
  stories: [
    {
      id: "default",
      title: "Segmented control",
      description:
        "The indicator slides beneath whichever button is active, tracking its size and position.",
      component: FloatingIndicatorDefault,
      layout: "stretch",
      sourceModule: "floating-indicator",
      sourceExport: "FloatingIndicatorDefault",
    },
    {
      id: "vertical",
      title: "Vertical navigation",
      description:
        "The same pattern in a vertical list, styled as a left-edge bar instead of a filled pill.",
      component: FloatingIndicatorVertical,
      layout: "stretch",
      sourceModule: "floating-indicator",
      sourceExport: "FloatingIndicatorVertical",
    },
    {
      id: "callbacks",
      title: "Transition callbacks",
      description:
        "onTransitionStart and onTransitionEnd fire around each animated reposition; transitionDuration controls its speed.",
      component: FloatingIndicatorCallbacks,
      layout: "stretch",
      sourceModule: "floating-indicator",
      sourceExport: "FloatingIndicatorCallbacks",
    },
    {
      id: "display-after-transition-end",
      title: "displayAfterTransitionEnd",
      description:
        "Toggle the container in and out with a pop transition — the indicator stays hidden until that transition finishes, so it never flashes at a stale position.",
      component: FloatingIndicatorDisplayAfterTransitionEnd,
      layout: "stretch",
      sourceModule: "floating-indicator",
      sourceExport: "FloatingIndicatorDisplayAfterTransitionEnd",
    },
  ],
}

const focusTrapEntry: ComponentEntry = {
  id: "focus-trap",
  name: "Focus Trap",
  category: "Utilities",
  description:
    "Traps Tab focus inside its single child element while active — the primitive behind dialogs, drawers and popovers that shouldn't let keyboard focus escape to the page behind them.",
  sourcePath: "src/components/ui/focus-trap.tsx",
  importStatement: 'import { FocusTrap } from "@/components/ui/focus-trap"',
  exports: ["FocusTrap", "FocusTrapInitialFocus"],
  keywords: [
    "trap",
    "tab",
    "keyboard",
    "a11y",
    "accessibility",
    "modal",
    "dialog",
    "autofocus",
  ],
  notes: [
    "FocusTrap must wrap exactly one element child that accepts a ref — it clones that child to attach its own ref rather than rendering a wrapper element.",
    "On activation it focuses the first element marked data-autofocus, falling back to the first tabbable child, then the first focusable child.",
    "FocusTrap.InitialFocus renders a visually hidden element that grabs initial focus instead of a real field, then drops out of the tab order once it loses focus — useful when no child should be focused by default.",
    "Base UI's own overlay primitives (Dialog, Popover, Drawer, ...) already trap focus internally — reach for this component when building a custom overlay or embedding a form in a context that has no such primitive.",
  ],
  playground: definePlayground({
    tag: "FocusTrap",
    component: FocusTrapPlayground,
    controls: {
      active: booleanControl({
        label: "Active",
        defaultValue: false,
      }),
    },
  }),
  stories: [
    {
      id: "default",
      title: "Default",
      description:
        "Tab (or Shift+Tab) cycles between the fields without ever reaching elements outside the trap.",
      component: FocusTrapDefault,
      sourceModule: "focus-trap",
      sourceExport: "FocusTrapDefault",
    },
    {
      id: "autofocus",
      title: "data-autofocus",
      description:
        "The element marked data-autofocus receives focus first, instead of the first tabbable child.",
      component: FocusTrapAutofocus,
      sourceModule: "focus-trap",
      sourceExport: "FocusTrapAutofocus",
    },
    {
      id: "initial-focus",
      title: "FocusTrap.InitialFocus",
      description:
        "A hidden element absorbs the initial focus and removes itself from the tab order, so no visible field is focused by default.",
      component: FocusTrapInitialFocusDemo,
      sourceModule: "focus-trap",
      sourceExport: "FocusTrapInitialFocusDemo",
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

const overflowListEntry: ComponentEntry = {
  id: "overflow-list",
  name: "Overflow List",
  category: "Utilities",
  description:
    "Renders as many items as fit in its container, measured with a ResizeObserver, and hands the rest to a renderOverflow callback — ideal for tag lists, breadcrumbs and toolbars.",
  sourcePath: "src/components/ui/overflow-list.tsx",
  importStatement:
    'import { OverflowList } from "@/components/ui/overflow-list"',
  exports: ["OverflowList"],
  keywords: [
    "overflow",
    "truncate",
    "collapse",
    "responsive",
    "tags",
    "breadcrumbs",
    "resize observer",
    "more",
  ],
  notes: [
    "renderOverflow must return a single element that accepts a ref (a Badge, Button, HoverCardTrigger...) — the list measures it to decide whether it still fits.",
    "Drag the resize handle on the preview frames to watch items collapse into the overflow element.",
    'collapseFrom="start" keeps the trailing items visible and places the overflow element first, which suits breadcrumbs.',
    "getItemKey is used to detect reordering when data holds objects; primitive items use their own value.",
    "gap is limited to the xs-xl scale; use className for any other gap.",
    "Skipped global styling props: classNames, styles, unstyled, vars, attributes, mod and style shorthand props (m, p, w, h, bg, ...). Use className and style instead.",
    "There is no renderOverflowFor prop; the single renderOverflow callback receives all hidden items.",
  ],
  playground: definePlayground({
    tag: "OverflowList",
    layout: "stretch",
    component: OverflowListPlayground,
    controls: {
      gap: selectControl({
        label: "Gap",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "xs",
      }),
      maxRows: numberControl({
        label: "Max rows",
        defaultValue: 1,
        min: 1,
        max: 5,
        step: 1,
      }),
      maxVisibleItems: numberControl({
        label: "Max visible items (0 = unlimited)",
        defaultValue: 0,
        min: 0,
        max: 16,
        step: 1,
      }),
      collapseFrom: selectControl({
        label: "Collapse from",
        options: ["end", "start"],
        defaultValue: "end",
      }),
    },
  }),
  stories: [
    {
      id: "default",
      title: "Default",
      description: "One row; resize the frame to change how many tags fit.",
      component: OverflowListDefault,
      layout: "stretch",
      sourceModule: "overflow-list",
      sourceExport: "OverflowListDefault",
    },
    {
      id: "multi-row",
      title: "Multiple rows",
      description: "maxRows allows items to wrap before collapsing.",
      component: OverflowListMultiRow,
      layout: "stretch",
      sourceModule: "overflow-list",
      sourceExport: "OverflowListMultiRow",
    },
    {
      id: "max-visible",
      title: "Max visible items",
      description: "maxVisibleItems caps the count even when more would fit.",
      component: OverflowListMaxVisible,
      layout: "stretch",
      sourceModule: "overflow-list",
      sourceExport: "OverflowListMaxVisible",
    },
    {
      id: "collapse-from-start",
      title: "Collapse from start",
      description: "Breadcrumb-style: the leading items collapse first.",
      component: OverflowListCollapseFromStart,
      layout: "stretch",
      sourceModule: "overflow-list",
      sourceExport: "OverflowListCollapseFromStart",
    },
    {
      id: "hover-card",
      title: "Overflow in a hover card",
      description: "Hidden items are revealed on hover of the counter.",
      component: OverflowListHoverCard,
      layout: "stretch",
      sourceModule: "overflow-list",
      sourceExport: "OverflowListHoverCard",
    },
    {
      id: "controlled-width",
      title: "Driven by a slider",
      description: "The list re-measures live as its container width changes.",
      component: OverflowListControlledWidth,
      layout: "stretch",
      sourceModule: "overflow-list",
      sourceExport: "OverflowListControlledWidth",
    },
  ],
}

const marqueeEntry: ComponentEntry = {
  id: "marquee",
  name: "Marquee",
  category: "Utilities",
  description:
    "A CSS-animation based ticker that endlessly scrolls its children horizontally or vertically. Content is repeated for a seamless loop, with optional pause on hover and faded edges.",
  sourcePath: "src/components/ui/marquee.tsx",
  importStatement: 'import { Marquee } from "@/components/ui/marquee"',
  exports: ["Marquee"],
  keywords: ["ticker", "scroll", "carousel", "logos", "animation", "loop"],
  notes: [
    "repeat controls how many copies of the children are rendered; the animation travels exactly one copy plus a gap, so the loop is seamless as long as one copy plus the repeats fills the viewport. Copies after the first are aria-hidden.",
    "duration is the time for one full cycle in ms; larger content scrolls faster for the same duration, so scale it with content size.",
    'gap is limited to xs, sm, md, lg and xl. For another value override the custom property via className, e.g. className="[--marquee-gap:2rem]".',
    "The animation is disabled under prefers-reduced-motion.",
    "Vertical marquees need a bounded height (e.g. h-48) on the root.",
    "Not ported: the global styling props classNames, styles, unstyled, vars, attributes, mod and style shorthands. Use className and style instead.",
  ],
  playground: definePlayground({
    tag: "Marquee",
    layout: "stretch",
    component: MarqueePlayground,
    controls: {
      orientation: selectControl({
        label: "Orientation",
        options: ["horizontal", "vertical"],
        defaultValue: "horizontal",
      }),
      reverse: booleanControl({ label: "Reverse", defaultValue: false }),
      pauseOnHover: booleanControl({
        label: "Pause on hover",
        defaultValue: true,
      }),
      fadeEdges: booleanControl({ label: "Fade edges", defaultValue: true }),
      gap: selectControl({
        label: "Gap",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      duration: numberControl({
        label: "Duration (ms)",
        defaultValue: 20000,
        min: 2000,
        max: 100000,
        step: 1000,
      }),
      repeat: numberControl({
        label: "Repeat",
        defaultValue: 4,
        min: 2,
        max: 8,
        step: 1,
      }),
    },
  }),
  stories: [
    {
      id: "default",
      title: "Default",
      description: "Horizontal scrolling with faded edges.",
      component: MarqueeDefault,
      layout: "stretch",
      sourceModule: "marquee",
      sourceExport: "MarqueeDefault",
    },
    {
      id: "reverse",
      title: "Reverse",
      description: "reverse flips the direction, handy for stacked rows.",
      component: MarqueeReverse,
      layout: "stretch",
      sourceModule: "marquee",
      sourceExport: "MarqueeReverse",
    },
    {
      id: "pause-on-hover",
      title: "Pause on hover",
      description: "Hover the marquee to pause the animation.",
      component: MarqueePauseOnHover,
      layout: "stretch",
      sourceModule: "marquee",
      sourceExport: "MarqueePauseOnHover",
    },
    {
      id: "vertical",
      title: "Vertical",
      description: 'orientation="vertical" scrolls inside a fixed height.',
      component: MarqueeVertical,
      sourceModule: "marquee",
      sourceExport: "MarqueeVertical",
    },
    {
      id: "no-fade",
      title: "No fade, larger gap",
      description: 'fadeEdges={false} with gap="xl".',
      component: MarqueeNoFade,
      layout: "stretch",
      sourceModule: "marquee",
      sourceExport: "MarqueeNoFade",
    },
    {
      id: "custom-fade",
      title: "Custom fade",
      description:
        "fadeEdgeColor and fadeEdgeSize match a tinted background and widen the fade.",
      component: MarqueeCustomFade,
      layout: "stretch",
      sourceModule: "marquee",
      sourceExport: "MarqueeCustomFade",
    },
  ],
}

const scrollerEntry: ComponentEntry = {
  id: "scroller",
  name: "Scroller",
  category: "Utilities",
  description:
    "A horizontally scrolling row with a hidden scrollbar, fading edge controls that appear only when more content exists in that direction, and optional click-and-drag scrolling.",
  sourcePath: "src/components/ui/scroller.tsx",
  importStatement: 'import { Scroller } from "@/components/ui/scroller"',
  exports: ["Scroller"],
  keywords: ["scroll", "carousel", "tabs", "overflow", "horizontal", "drag"],
  notes: [
    "Controls fade in and out based on scroll position; showStartControl / showEndControl pin them visible. Hidden controls are removed from the tab order.",
    "Direction aware: in RTL the start control sits on the right and scroll offsets are mirrored.",
    "controlSize accepts a number (px) or any CSS length; edgeGradientColor should match the surface behind the scroller so the fade blends in.",
    "Dragging suppresses the click that would otherwise fire on the item under the pointer once the movement exceeds 5px.",
    "Skipped global styling props: classNames, styles, unstyled, vars, attributes, mod and style shorthand props. Use className and style instead.",
    "The scroll logic lives in the useScroller hook (src/hooks/use-scroller.ts).",
  ],
  playground: definePlayground({
    tag: "Scroller",
    layout: "stretch",
    component: ScrollerPlayground,
    controls: {
      scrollAmount: numberControl({
        label: "Scroll amount",
        defaultValue: 200,
        min: 50,
        max: 600,
        step: 50,
      }),
      controlSize: numberControl({
        label: "Control size",
        defaultValue: 50,
        min: 24,
        max: 80,
        step: 2,
      }),
      draggable: booleanControl({ label: "Draggable", defaultValue: true }),
      showStartControl: booleanControl({
        label: "Show start control",
        defaultValue: false,
      }),
      showEndControl: booleanControl({
        label: "Show end control",
        defaultValue: false,
      }),
    },
  }),
  stories: [
    {
      id: "default",
      title: "Default",
      description: "Controls appear at whichever edge has more content.",
      component: ScrollerDefault,
      layout: "stretch",
      sourceModule: "scroller",
      sourceExport: "ScrollerDefault",
    },
    {
      id: "custom-icons",
      title: "Custom icons and size",
      component: ScrollerCustomIcons,
      layout: "stretch",
      sourceModule: "scroller",
      sourceExport: "ScrollerCustomIcons",
    },
    {
      id: "gradient-color",
      title: "Edge gradient color",
      description: "Match the fade to the surface behind the scroller.",
      component: ScrollerGradientColor,
      layout: "stretch",
      sourceModule: "scroller",
      sourceExport: "ScrollerGradientColor",
    },
    {
      id: "always-visible",
      title: "Always visible controls",
      component: ScrollerAlwaysVisible,
      layout: "stretch",
      sourceModule: "scroller",
      sourceExport: "ScrollerAlwaysVisible",
    },
    {
      id: "control-props",
      title: "Control props and scroll amount",
      component: ScrollerControlProps,
      layout: "stretch",
      sourceModule: "scroller",
      sourceExport: "ScrollerControlProps",
    },
    {
      id: "draggable",
      title: "Draggable with clickable items",
      component: ScrollerDraggable,
      layout: "stretch",
      sourceModule: "scroller",
      sourceExport: "ScrollerDraggable",
    },
  ],
}

export const utilitiesEntries: readonly ComponentEntry[] = [
  directionEntry,
  floatingIndicatorEntry,
  focusTrapEntry,
  portalEntry,
  transitionEntry,
  visuallyHiddenEntry,
  overflowListEntry,
  marqueeEntry,
  scrollerEntry,
]
