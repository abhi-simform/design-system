import {
  booleanControl,
  numberControl,
  selectControl,
  textControl,
} from "@/showcase/lib/controls"
import { definePlayground } from "@/showcase/registry/define-playground"
import type { ComponentEntry } from "@/showcase/registry/types"
import {
  AlertDialogBasic,
  AlertDialogDestructive,
  AlertDialogPlayground,
  AlertDialogSizes,
} from "@/showcase/demos/alert-dialog"
import {
  ContextMenuBasic,
  ContextMenuPlayground,
  ContextMenuWithSelection,
  ContextMenuWithSubmenu,
} from "@/showcase/demos/context-menu"
import {
  DialogBasic,
  DialogPlayground,
  DialogScrollable,
  DialogWithoutCloseButton,
} from "@/showcase/demos/dialog"
import {
  DrawerBasic,
  DrawerNonModal,
  DrawerPlayground,
  DrawerWithSnapPoints,
} from "@/showcase/demos/drawer"
import {
  HoverCardBasic,
  HoverCardInProse,
  HoverCardPlayground,
  HoverCardSides,
} from "@/showcase/demos/hover-card"
import {
  OverlayBasic,
  OverlayBlur,
  OverlayFixed,
  OverlayGradient,
  OverlayPlayground,
} from "@/showcase/demos/overlay"
import {
  PopoverBasic,
  PopoverPlayground,
  PopoverSides,
} from "@/showcase/demos/popover"
import {
  SheetPlayground,
  SheetSides,
  SheetWithForm,
} from "@/showcase/demos/sheet"
import {
  ToastPlayground,
  ToastPromise,
  ToastTypes,
  ToastWithAction,
} from "@/showcase/demos/toast"
import {
  TooltipBasic,
  TooltipPlayground,
  TooltipSides,
  TooltipWithShortcut,
} from "@/showcase/demos/tooltip"

const SIDE_OPTIONS = ["top", "right", "bottom", "left"] as const
const ALIGN_OPTIONS = ["start", "center", "end"] as const

const dialogEntry: ComponentEntry = {
  id: "dialog",
  name: "Dialog",
  category: "Overlays",
  description:
    "A modal window for focused tasks. Dismissible by backdrop click and Escape — use Alert Dialog when a decision is mandatory.",
  sourcePath: "src/components/ui/dialog.tsx",
  importStatement:
    'import {\n  Dialog,\n  DialogClose,\n  DialogContent,\n  DialogDescription,\n  DialogFooter,\n  DialogHeader,\n  DialogTitle,\n  DialogTrigger,\n} from "@/components/ui/dialog"',
  exports: [
    "Dialog",
    "DialogClose",
    "DialogContent",
    "DialogDescription",
    "DialogFooter",
    "DialogHeader",
    "DialogOverlay",
    "DialogPortal",
    "DialogTitle",
    "DialogTrigger",
  ],
  keywords: ["modal", "popup", "overlay", "window"],
  notes: [
    "DialogContent shows the corner close button by default; DialogFooter's own showCloseButton defaults to false.",
    "The popup does not scroll — give an inner wrapper a max height so the header and footer stay pinned.",
  ],
  playground: definePlayground({
    tag: "DialogContent",
    component: DialogPlayground,
    controls: {
      showCloseButton: booleanControl({
        label: "Corner close button",
        defaultValue: true,
      }),
      showFooterClose: booleanControl({
        label: "Footer close button",
        defaultValue: false,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: DialogBasic,
      sourceModule: "dialog",
      sourceExport: "DialogBasic",
    },
    {
      id: "no-close",
      title: "Without the corner close",
      component: DialogWithoutCloseButton,
      sourceModule: "dialog",
      sourceExport: "DialogWithoutCloseButton",
    },
    {
      id: "scrollable",
      title: "Scrollable content",
      component: DialogScrollable,
      sourceModule: "dialog",
      sourceExport: "DialogScrollable",
    },
  ],
}

const alertDialogEntry: ComponentEntry = {
  id: "alert-dialog",
  name: "Alert Dialog",
  category: "Overlays",
  description:
    "A modal that interrupts and requires an explicit choice. Unlike Dialog, clicking the backdrop does not dismiss it.",
  sourcePath: "src/components/ui/alert-dialog.tsx",
  importStatement:
    'import {\n  AlertDialog,\n  AlertDialogAction,\n  AlertDialogCancel,\n  AlertDialogContent,\n  AlertDialogDescription,\n  AlertDialogFooter,\n  AlertDialogHeader,\n  AlertDialogTitle,\n  AlertDialogTrigger,\n} from "@/components/ui/alert-dialog"',
  exports: [
    "AlertDialog",
    "AlertDialogTrigger",
    "AlertDialogPortal",
    "AlertDialogOverlay",
    "AlertDialogContent",
    "AlertDialogHeader",
    "AlertDialogFooter",
    "AlertDialogMedia",
    "AlertDialogTitle",
    "AlertDialogDescription",
    "AlertDialogAction",
    "AlertDialogCancel",
  ],
  keywords: ["confirm", "destructive", "modal", "are you sure"],
  notes: [
    'AlertDialogAction accepts every Button prop, so a destructive confirm is variant="destructive".',
    "AlertDialogCancel defaults to the outline variant.",
  ],
  playground: definePlayground({
    tag: "AlertDialogContent",
    component: AlertDialogPlayground,
    controls: {
      size: selectControl({
        label: "Size",
        options: ["default", "sm"],
        defaultValue: "default",
      }),
      actionVariant: selectControl({
        label: "Action variant",
        options: ["default", "destructive", "secondary"],
        defaultValue: "default",
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: AlertDialogBasic,
      sourceModule: "alert-dialog",
      sourceExport: "AlertDialogBasic",
    },
    {
      id: "destructive",
      title: "Destructive confirmation",
      component: AlertDialogDestructive,
      sourceModule: "alert-dialog",
      sourceExport: "AlertDialogDestructive",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: AlertDialogSizes,
      sourceModule: "alert-dialog",
      sourceExport: "AlertDialogSizes",
    },
  ],
}

const sheetEntry: ComponentEntry = {
  id: "sheet",
  name: "Sheet",
  category: "Overlays",
  description:
    "A panel that slides in from any edge. Left and right sheets cap at a small max width; top and bottom size to their content.",
  sourcePath: "src/components/ui/sheet.tsx",
  importStatement:
    'import {\n  Sheet,\n  SheetClose,\n  SheetContent,\n  SheetDescription,\n  SheetFooter,\n  SheetHeader,\n  SheetTitle,\n  SheetTrigger,\n} from "@/components/ui/sheet"',
  exports: [
    "Sheet",
    "SheetTrigger",
    "SheetClose",
    "SheetContent",
    "SheetHeader",
    "SheetFooter",
    "SheetTitle",
    "SheetDescription",
  ],
  keywords: ["drawer", "panel", "side", "slide over", "off-canvas"],
  notes: [
    "The enter and exit transforms follow the side prop — no extra animation config.",
    "Sidebar uses a Sheet internally for its mobile presentation.",
  ],
  playground: definePlayground({
    tag: "SheetContent",
    component: SheetPlayground,
    controls: {
      side: selectControl({
        label: "Side",
        options: SIDE_OPTIONS,
        defaultValue: "right",
      }),
      showCloseButton: booleanControl({
        label: "Close button",
        defaultValue: true,
      }),
    },
  }),
  stories: [
    {
      id: "sides",
      title: "Sides",
      component: SheetSides,
      sourceModule: "sheet",
      sourceExport: "SheetSides",
    },
    {
      id: "with-form",
      title: "With a form",
      component: SheetWithForm,
      sourceModule: "sheet",
      sourceExport: "SheetWithForm",
    },
  ],
}

const drawerEntry: ComponentEntry = {
  id: "drawer",
  name: "Drawer",
  category: "Overlays",
  description:
    "A swipe-dismissible panel with optional snap points and stacked nesting — the touch-first counterpart to Sheet.",
  sourcePath: "src/components/ui/drawer.tsx",
  importStatement:
    'import {\n  Drawer,\n  DrawerClose,\n  DrawerContent,\n  DrawerDescription,\n  DrawerFooter,\n  DrawerHeader,\n  DrawerTitle,\n  DrawerTrigger,\n} from "@/components/ui/drawer"',
  exports: [
    "Drawer",
    "DrawerPortal",
    "DrawerOverlay",
    "DrawerSwipeHandle",
    "DrawerTrigger",
    "DrawerClose",
    "DrawerContent",
    "DrawerHeader",
    "DrawerFooter",
    "DrawerTitle",
    "DrawerDescription",
  ],
  keywords: ["bottom sheet", "swipe", "snap points", "mobile", "vaul"],
  notes: [
    "showSwipeHandle is false by default — turn it on so the drag affordance is visible.",
    "snapPoints are fractions of the viewport, e.g. [0.4, 1].",
    "modal={false} leaves the page behind interactive.",
  ],
  playground: definePlayground({
    tag: "Drawer",
    component: DrawerPlayground,
    controls: {
      swipeDirection: selectControl({
        label: "Swipe direction",
        options: ["down", "up", "left", "right"],
        defaultValue: "down",
      }),
      showSwipeHandle: booleanControl({
        label: "Swipe handle",
        defaultValue: false,
      }),
      modal: booleanControl({ label: "Modal", defaultValue: true }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: DrawerBasic,
      sourceModule: "drawer",
      sourceExport: "DrawerBasic",
    },
    {
      id: "snap-points",
      title: "Snap points",
      component: DrawerWithSnapPoints,
      sourceModule: "drawer",
      sourceExport: "DrawerWithSnapPoints",
    },
    {
      id: "non-modal",
      title: "Non-modal",
      component: DrawerNonModal,
      sourceModule: "drawer",
      sourceExport: "DrawerNonModal",
    },
  ],
}

const overlayEntry: ComponentEntry = {
  id: "overlay",
  name: "Overlay",
  category: "Overlays",
  description:
    "A plain colored, gradient, or blurred backdrop div — the standalone primitive underneath things like a modal's backdrop, not tied to any open/close context of its own.",
  sourcePath: "src/components/ui/overlay.tsx",
  importStatement: 'import { Overlay } from "@/components/ui/overlay"',
  exports: ["Overlay"],
  keywords: ["backdrop", "scrim", "blur", "gradient", "loading overlay"],
  notes: [
    "Unlike DialogOverlay/SheetOverlay/DrawerOverlay/AlertDialogOverlay, this isn't tied to any primitive's open state — mount and unmount it yourself (see the toggle in the basic story).",
    "gradient overrides color and backgroundOpacity entirely — it's set as the raw background value.",
    "fixed switches from absolute (fills the nearest positioned ancestor) to fixed (fills the viewport, or a transformed ancestor if one exists in between).",
    "backdrop-filter is not supported in every browser — blur degrades gracefully to no blur, not to a hard failure.",
  ],
  playground: definePlayground({
    tag: "Overlay",
    component: OverlayPlayground,
    controls: {
      color: textControl({ label: "Color", defaultValue: "#000" }),
      backgroundOpacity: numberControl({
        label: "Background opacity",
        defaultValue: 0.6,
        min: 0,
        max: 1,
        step: 0.05,
      }),
      blur: numberControl({
        label: "Blur (px)",
        defaultValue: 0,
        min: 0,
        max: 20,
      }),
      radius: selectControl({
        label: "Radius",
        options: [
          "none",
          "sm",
          "md",
          "lg",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "full",
        ] as const,
        defaultValue: "none",
      }),
      center: booleanControl({ label: "Center content", defaultValue: false }),
      fixed: booleanControl({ label: "Fixed", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      description: "color and backgroundOpacity, toggled on and off.",
      component: OverlayBasic,
      sourceModule: "overlay",
      sourceExport: "OverlayBasic",
    },
    {
      id: "gradient",
      title: "Gradient",
      description: "gradient replaces the solid color entirely.",
      component: OverlayGradient,
      sourceModule: "overlay",
      sourceExport: "OverlayGradient",
    },
    {
      id: "blur",
      title: "Blur",
      description: "blur adds a backdrop-filter blur on top of a light tint.",
      component: OverlayBlur,
      sourceModule: "overlay",
      sourceExport: "OverlayBlur",
    },
    {
      id: "fixed",
      title: "Fixed positioning",
      description:
        "fixed switches from absolute to fixed positioning — trapped here inside a transformed ancestor so it doesn't cover the real page.",
      component: OverlayFixed,
      sourceModule: "overlay",
      sourceExport: "OverlayFixed",
    },
  ],
}

const popoverEntry: ComponentEntry = {
  id: "popover",
  name: "Popover",
  category: "Overlays",
  description:
    "A click-triggered floating panel for secondary controls. The playground exposes the positioner so you can feel how side, align and offset interact.",
  sourcePath: "src/components/ui/popover.tsx",
  importStatement:
    'import {\n  Popover,\n  PopoverContent,\n  PopoverDescription,\n  PopoverHeader,\n  PopoverTitle,\n  PopoverTrigger,\n} from "@/components/ui/popover"',
  exports: [
    "Popover",
    "PopoverContent",
    "PopoverDescription",
    "PopoverHeader",
    "PopoverTitle",
    "PopoverTrigger",
  ],
  keywords: ["dropdown", "floating", "panel", "overlay"],
  notes: [
    "The popup flips to the opposite side automatically when there isn't room.",
    "For hover-triggered content use Hover Card; for a menu of actions use Dropdown Menu.",
  ],
  playground: definePlayground({
    tag: "PopoverContent",
    component: PopoverPlayground,
    controls: {
      side: selectControl({
        label: "Side",
        options: SIDE_OPTIONS,
        defaultValue: "bottom",
      }),
      align: selectControl({
        label: "Align",
        options: ALIGN_OPTIONS,
        defaultValue: "center",
      }),
      sideOffset: numberControl({
        label: "Side offset",
        defaultValue: 4,
        min: 0,
        max: 24,
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: PopoverBasic,
      sourceModule: "popover",
      sourceExport: "PopoverBasic",
    },
    {
      id: "sides",
      title: "Sides",
      component: PopoverSides,
      sourceModule: "popover",
      sourceExport: "PopoverSides",
    },
  ],
}

const tooltipEntry: ComponentEntry = {
  id: "tooltip",
  name: "Tooltip",
  category: "Overlays",
  description:
    "A short hover or focus hint with an arrow. TooltipProvider is optional but groups delays so moving between neighbours feels instant.",
  sourcePath: "src/components/ui/tooltip.tsx",
  importStatement:
    'import {\n  Tooltip,\n  TooltipContent,\n  TooltipProvider,\n  TooltipTrigger,\n} from "@/components/ui/tooltip"',
  exports: ["Tooltip", "TooltipTrigger", "TooltipContent", "TooltipProvider"],
  keywords: ["hint", "hover", "title", "help"],
  notes: [
    "Tooltips never appear on touch — never put essential information in one.",
    "The provider's delay defaults to 0 in this system; this showcase mounts it at 200ms.",
  ],
  playground: definePlayground({
    tag: "TooltipContent",
    component: TooltipPlayground,
    controls: {
      side: selectControl({
        label: "Side",
        options: SIDE_OPTIONS,
        defaultValue: "top",
      }),
      align: selectControl({
        label: "Align",
        options: ALIGN_OPTIONS,
        defaultValue: "center",
      }),
      sideOffset: numberControl({
        label: "Side offset",
        defaultValue: 4,
        min: 0,
        max: 24,
      }),
      delay: numberControl({
        label: "Provider delay (ms)",
        defaultValue: 200,
        min: 0,
        max: 1000,
        step: 50,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: TooltipBasic,
      sourceModule: "tooltip",
      sourceExport: "TooltipBasic",
    },
    {
      id: "sides",
      title: "Sides",
      component: TooltipSides,
      sourceModule: "tooltip",
      sourceExport: "TooltipSides",
    },
    {
      id: "shortcut",
      title: "With a keyboard shortcut",
      component: TooltipWithShortcut,
      sourceModule: "tooltip",
      sourceExport: "TooltipWithShortcut",
    },
  ],
}

const hoverCardEntry: ComponentEntry = {
  id: "hover-card",
  name: "Hover Card",
  category: "Overlays",
  description:
    "A rich preview shown on hover — built on Base UI's PreviewCard. Use it for supplementary detail, never for essential content.",
  sourcePath: "src/components/ui/hover-card.tsx",
  importStatement:
    'import {\n  HoverCard,\n  HoverCardContent,\n  HoverCardTrigger,\n} from "@/components/ui/hover-card"',
  exports: ["HoverCard", "HoverCardTrigger", "HoverCardContent"],
  keywords: ["preview", "hover", "profile", "peek"],
  notes: [
    "Hover-only, so it is unreachable on touch devices — content here must be optional.",
    "Under the hood this is PreviewCard, not Tooltip: it is sized for real content.",
  ],
  playground: definePlayground({
    tag: "HoverCardContent",
    component: HoverCardPlayground,
    controls: {
      side: selectControl({
        label: "Side",
        options: SIDE_OPTIONS,
        defaultValue: "bottom",
      }),
      align: selectControl({
        label: "Align",
        options: ALIGN_OPTIONS,
        defaultValue: "center",
      }),
      sideOffset: numberControl({
        label: "Side offset",
        defaultValue: 4,
        min: 0,
        max: 24,
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: HoverCardBasic,
      sourceModule: "hover-card",
      sourceExport: "HoverCardBasic",
    },
    {
      id: "sides",
      title: "Sides",
      component: HoverCardSides,
      sourceModule: "hover-card",
      sourceExport: "HoverCardSides",
    },
    {
      id: "in-prose",
      title: "Inline in prose",
      component: HoverCardInProse,
      sourceModule: "hover-card",
      sourceExport: "HoverCardInProse",
    },
  ],
}

const contextMenuEntry: ComponentEntry = {
  id: "context-menu",
  name: "Context Menu",
  category: "Overlays",
  description:
    "A right-click menu with the same item vocabulary as Dropdown Menu — checkboxes, radios, submenus and shortcuts.",
  sourcePath: "src/components/ui/context-menu.tsx",
  importStatement:
    'import {\n  ContextMenu,\n  ContextMenuContent,\n  ContextMenuItem,\n  ContextMenuSeparator,\n  ContextMenuShortcut,\n  ContextMenuTrigger,\n} from "@/components/ui/context-menu"',
  exports: [
    "ContextMenu",
    "ContextMenuTrigger",
    "ContextMenuContent",
    "ContextMenuItem",
    "ContextMenuCheckboxItem",
    "ContextMenuRadioItem",
    "ContextMenuLabel",
    "ContextMenuSeparator",
    "ContextMenuShortcut",
    "ContextMenuGroup",
    "ContextMenuPortal",
    "ContextMenuSub",
    "ContextMenuSubContent",
    "ContextMenuSubTrigger",
    "ContextMenuRadioGroup",
  ],
  keywords: ["right click", "menu", "secondary click"],
  notes: [
    "A context menu is never discoverable on its own — always provide the same actions elsewhere.",
    "inset aligns items that have no icon with those that do.",
  ],
  playground: definePlayground({
    tag: "ContextMenuItem",
    layout: "stretch",
    component: ContextMenuPlayground,
    controls: {
      inset: booleanControl({ label: "Inset items", defaultValue: false }),
      showShortcuts: booleanControl({
        label: "Shortcuts",
        defaultValue: true,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: ContextMenuBasic,
      layout: "stretch",
      sourceModule: "context-menu",
      sourceExport: "ContextMenuBasic",
    },
    {
      id: "selection",
      title: "Checkboxes and radios",
      component: ContextMenuWithSelection,
      layout: "stretch",
      sourceModule: "context-menu",
      sourceExport: "ContextMenuWithSelection",
    },
    {
      id: "submenu",
      title: "Submenu",
      component: ContextMenuWithSubmenu,
      layout: "stretch",
      sourceModule: "context-menu",
      sourceExport: "ContextMenuWithSubmenu",
    },
  ],
}

const toastEntry: ComponentEntry = {
  id: "toast",
  name: "Toast",
  category: "Overlays",
  description:
    "Transient notifications driven by a module-level manager, so any module can call toast.add without prop drilling.",
  sourcePath: "src/components/ui/toast.tsx",
  importStatement: 'import { toast, Toaster } from "@/components/ui/toast"',
  exports: [
    "Toaster",
    "Toast",
    "ToastAction",
    "ToastClose",
    "ToastContent",
    "ToastDescription",
    "ToastPortal",
    "ToastProvider",
    "ToastTitle",
    "ToastViewport",
    "createToastManager",
    "toast",
    "useToastManager",
  ],
  keywords: ["notification", "snackbar", "alert", "transient", "sonner"],
  notes: [
    "Mount exactly one <Toaster /> at the app root — this showcase already has one.",
    "type picks the icon: success, info, warning, error or loading. Any other value renders none.",
    "timeout: 0 keeps a toast up until it is dismissed.",
    "The viewport is fixed to the bottom-right of the window, so toasts appear outside the preview below.",
  ],
  playground: definePlayground({
    tag: "toast",
    component: ToastPlayground,
    snippet: (values) =>
      [
        "toast.add({",
        `  type: "${values.type}",`,
        `  title: "${values.title}",`,
        `  description: "${values.description}",`,
        `  timeout: ${values.timeout},`,
        `  priority: "${values.priority}",`,
        "})",
      ].join("\n"),
    controls: {
      type: selectControl({
        label: "Type",
        options: ["success", "info", "warning", "error", "loading"],
        defaultValue: "success",
      }),
      title: textControl({ label: "Title", defaultValue: "Changes saved" }),
      description: textControl({
        label: "Description",
        defaultValue: "Your profile has been updated.",
      }),
      timeout: numberControl({
        label: "Timeout (ms)",
        defaultValue: 5000,
        min: 0,
        max: 10000,
        step: 500,
      }),
      priority: selectControl({
        label: "Priority",
        options: ["low", "high"],
        defaultValue: "low",
      }),
    },
  }),
  stories: [
    {
      id: "types",
      title: "Types",
      component: ToastTypes,
      sourceModule: "toast",
      sourceExport: "ToastTypes",
    },
    {
      id: "with-action",
      title: "Actions and sticky toasts",
      component: ToastWithAction,
      sourceModule: "toast",
      sourceExport: "ToastWithAction",
    },
    {
      id: "promise",
      title: "Tracking a promise",
      description:
        "toast.promise swaps the loading toast for a success or error one when the promise settles.",
      component: ToastPromise,
      sourceModule: "toast",
      sourceExport: "ToastPromise",
    },
  ],
}

export const overlaysEntries: readonly ComponentEntry[] = [
  dialogEntry,
  alertDialogEntry,
  sheetEntry,
  drawerEntry,
  overlayEntry,
  popoverEntry,
  tooltipEntry,
  hoverCardEntry,
  contextMenuEntry,
  toastEntry,
]
