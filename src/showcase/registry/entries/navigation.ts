import {
  booleanControl,
  numberControl,
  selectControl,
} from "@/showcase/lib/controls"
import { definePlayground } from "@/showcase/registry/define-playground"
import { lazyDemo } from "@/showcase/registry/lazy-demo"
import type { ComponentEntry } from "@/showcase/registry/types"
import {
  BreadcrumbBasic,
  BreadcrumbCollapsed,
  BreadcrumbCustomSeparator,
  BreadcrumbPlayground,
} from "@/showcase/demos/breadcrumb"
import {
  DropdownMenuBasic,
  DropdownMenuPlayground,
  DropdownMenuWithSelection,
  DropdownMenuWithSubmenu,
} from "@/showcase/demos/dropdown-menu"
import {
  MenubarBasic,
  MenubarPlayground,
  MenubarWithSubmenus,
} from "@/showcase/demos/menubar"
import {
  NavigationMenuBasic,
  NavigationMenuPlayground,
  NavigationMenuSimpleLinks,
} from "@/showcase/demos/navigation-menu"
import {
  SidebarAnatomy,
  SidebarFullShell,
  SidebarMenuButtonSizes,
  SidebarVariants,
} from "@/showcase/demos/sidebar"
import {
  TabsDisabled,
  TabsPlayground,
  TabsVariants,
  TabsVertical,
  TabsWithForm,
} from "@/showcase/demos/tabs"

// Deferred so their third-party dependency stays out of the initial bundle.
const CommandInDialog = lazyDemo(
  () => import("@/showcase/demos/command"),
  "CommandInDialog",
)
const CommandInline = lazyDemo(
  () => import("@/showcase/demos/command"),
  "CommandInline",
)
const CommandPlayground = lazyDemo(
  () => import("@/showcase/demos/command"),
  "CommandPlayground",
)
const breadcrumbEntry: ComponentEntry = {
  id: "breadcrumb",
  name: "Breadcrumb",
  category: "Navigation",
  description:
    "A trail showing where the current page sits. BreadcrumbLink is polymorphic, so it drops into any router.",
  sourcePath: "src/components/ui/breadcrumb.tsx",
  importStatement:
    'import {\n  Breadcrumb,\n  BreadcrumbEllipsis,\n  BreadcrumbItem,\n  BreadcrumbLink,\n  BreadcrumbList,\n  BreadcrumbPage,\n  BreadcrumbSeparator,\n} from "@/components/ui/breadcrumb"',
  exports: [
    "Breadcrumb",
    "BreadcrumbList",
    "BreadcrumbItem",
    "BreadcrumbLink",
    "BreadcrumbPage",
    "BreadcrumbSeparator",
    "BreadcrumbEllipsis",
  ],
  keywords: ["trail", "path", "hierarchy", "navigation"],
  notes: [
    "The last crumb is a BreadcrumbPage, not a link — it carries aria-current.",
    "BreadcrumbSeparator defaults to a chevron; pass children to replace it.",
  ],
  playground: definePlayground({
    tag: "Breadcrumb",
    component: BreadcrumbPlayground,
    controls: {
      separator: selectControl({
        label: "Separator",
        options: ["chevron", "slash"],
        defaultValue: "chevron",
        codeRole: "none",
      }),
      collapsed: booleanControl({
        label: "Collapse middle",
        defaultValue: false,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: BreadcrumbBasic,
      sourceModule: "breadcrumb",
      sourceExport: "BreadcrumbBasic",
    },
    {
      id: "custom-separator",
      title: "Custom separator",
      component: BreadcrumbCustomSeparator,
      sourceModule: "breadcrumb",
      sourceExport: "BreadcrumbCustomSeparator",
    },
    {
      id: "collapsed",
      title: "Collapsed trail",
      component: BreadcrumbCollapsed,
      sourceModule: "breadcrumb",
      sourceExport: "BreadcrumbCollapsed",
    },
  ],
}

const commandEntry: ComponentEntry = {
  id: "command",
  name: "Command",
  category: "Navigation",
  description:
    "A cmdk-powered command palette with fuzzy filtering, either inline in a panel or inside a dialog.",
  sourcePath: "src/components/ui/command.tsx",
  importStatement:
    'import {\n  Command,\n  CommandDialog,\n  CommandEmpty,\n  CommandGroup,\n  CommandInput,\n  CommandItem,\n  CommandList,\n  CommandSeparator,\n  CommandShortcut,\n} from "@/components/ui/command"',
  exports: [
    "Command",
    "CommandDialog",
    "CommandInput",
    "CommandList",
    "CommandEmpty",
    "CommandGroup",
    "CommandItem",
    "CommandShortcut",
    "CommandSeparator",
  ],
  externalDeps: ["cmdk"],
  keywords: ["palette", "cmdk", "search", "spotlight", "quick actions"],
  notes: [
    "Filtering is built in — render every item and cmdk hides the ones that do not match.",
    "CommandDialog takes title and description for its accessible name; both are visually hidden.",
    "Bind Cmd/Ctrl+K yourself in your app. These demos deliberately register no global listener.",
  ],
  playground: definePlayground({
    tag: "CommandDialog",
    component: CommandPlayground,
    controls: {
      showCloseButton: booleanControl({
        label: "Close button",
        defaultValue: false,
      }),
      title: selectControl({
        label: "Accessible title",
        options: ["Command Palette", "Quick actions"],
        defaultValue: "Command Palette",
      }),
    },
  }),
  stories: [
    {
      id: "inline",
      title: "Inline",
      component: CommandInline,
      sourceModule: "command",
      sourceExport: "CommandInline",
    },
    {
      id: "dialog",
      title: "In a dialog",
      component: CommandInDialog,
      sourceModule: "command",
      sourceExport: "CommandInDialog",
    },
  ],
}

const dropdownMenuEntry: ComponentEntry = {
  id: "dropdown-menu",
  name: "Dropdown Menu",
  category: "Navigation",
  description:
    "A click-triggered menu of actions, with checkbox and radio items, submenus, shortcuts and a destructive variant.",
  sourcePath: "src/components/ui/dropdown-menu.tsx",
  importStatement:
    'import {\n  DropdownMenu,\n  DropdownMenuContent,\n  DropdownMenuItem,\n  DropdownMenuSeparator,\n  DropdownMenuShortcut,\n  DropdownMenuTrigger,\n} from "@/components/ui/dropdown-menu"',
  exports: [
    "DropdownMenu",
    "DropdownMenuPortal",
    "DropdownMenuTrigger",
    "DropdownMenuContent",
    "DropdownMenuGroup",
    "DropdownMenuLabel",
    "DropdownMenuItem",
    "DropdownMenuCheckboxItem",
    "DropdownMenuRadioGroup",
    "DropdownMenuRadioItem",
    "DropdownMenuSeparator",
    "DropdownMenuShortcut",
    "DropdownMenuSub",
    "DropdownMenuSubTrigger",
    "DropdownMenuSubContent",
  ],
  keywords: ["menu", "actions", "overflow", "kebab", "more"],
  notes: [
    "Check indicators sit on the right here; Menubar puts them on the left.",
    "inset lines up items with no icon against those that have one.",
    'variant="destructive" tints an item red without changing its behaviour.',
  ],
  playground: definePlayground({
    tag: "DropdownMenuContent",
    component: DropdownMenuPlayground,
    controls: {
      side: selectControl({
        label: "Side",
        options: ["bottom", "top", "right", "left"],
        defaultValue: "bottom",
      }),
      align: selectControl({
        label: "Align",
        options: ["start", "center", "end"],
        defaultValue: "start",
      }),
      inset: booleanControl({
        label: "Inset items",
        defaultValue: false,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: DropdownMenuBasic,
      sourceModule: "dropdown-menu",
      sourceExport: "DropdownMenuBasic",
    },
    {
      id: "selection",
      title: "Checkboxes and radios",
      component: DropdownMenuWithSelection,
      sourceModule: "dropdown-menu",
      sourceExport: "DropdownMenuWithSelection",
    },
    {
      id: "submenu",
      title: "Submenu",
      component: DropdownMenuWithSubmenu,
      sourceModule: "dropdown-menu",
      sourceExport: "DropdownMenuWithSubmenu",
    },
  ],
}

const menubarEntry: ComponentEntry = {
  id: "menubar",
  name: "Menubar",
  category: "Navigation",
  description:
    "A desktop-application menu bar. Once one menu is open, hovering the others switches between them.",
  sourcePath: "src/components/ui/menubar.tsx",
  importStatement:
    'import {\n  Menubar,\n  MenubarContent,\n  MenubarItem,\n  MenubarMenu,\n  MenubarSeparator,\n  MenubarShortcut,\n  MenubarTrigger,\n} from "@/components/ui/menubar"',
  exports: [
    "Menubar",
    "MenubarPortal",
    "MenubarMenu",
    "MenubarTrigger",
    "MenubarContent",
    "MenubarGroup",
    "MenubarSeparator",
    "MenubarLabel",
    "MenubarItem",
    "MenubarShortcut",
    "MenubarCheckboxItem",
    "MenubarRadioGroup",
    "MenubarRadioItem",
    "MenubarSub",
    "MenubarSubTrigger",
    "MenubarSubContent",
  ],
  keywords: ["menu bar", "application menu", "file edit view"],
  notes: [
    "Built on top of the dropdown-menu parts, so the item vocabulary is identical.",
    "Check indicators render on the left here, matching desktop conventions.",
  ],
  playground: definePlayground({
    tag: "MenubarItem",
    component: MenubarPlayground,
    controls: {
      inset: booleanControl({ label: "Inset items", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "A full menu bar",
      component: MenubarBasic,
      sourceModule: "menubar",
      sourceExport: "MenubarBasic",
    },
    {
      id: "submenus",
      title: "Nested submenus",
      component: MenubarWithSubmenus,
      sourceModule: "menubar",
      sourceExport: "MenubarWithSubmenus",
    },
  ],
}

const navigationMenuEntry: ComponentEntry = {
  id: "navigation-menu",
  name: "Navigation Menu",
  category: "Navigation",
  description:
    "A site-header menu whose popup animates its size between panels as you move across triggers.",
  sourcePath: "src/components/ui/navigation-menu.tsx",
  importStatement:
    'import {\n  NavigationMenu,\n  NavigationMenuContent,\n  NavigationMenuItem,\n  NavigationMenuLink,\n  NavigationMenuList,\n  NavigationMenuPositioner,\n  NavigationMenuTrigger,\n  navigationMenuTriggerStyle,\n} from "@/components/ui/navigation-menu"',
  exports: [
    "NavigationMenu",
    "NavigationMenuContent",
    "NavigationMenuIndicator",
    "NavigationMenuItem",
    "NavigationMenuLink",
    "NavigationMenuList",
    "NavigationMenuTrigger",
    "navigationMenuTriggerStyle",
    "NavigationMenuPositioner",
  ],
  keywords: ["header", "mega menu", "site nav", "links"],
  notes: [
    "NavigationMenuPositioner must be rendered as a sibling of the list — it portals the popup.",
    "For a plain link that matches the triggers, apply navigationMenuTriggerStyle() to a NavigationMenuLink.",
  ],
  playground: definePlayground({
    tag: "NavigationMenuPositioner",
    component: NavigationMenuPlayground,
    controls: {
      side: selectControl({
        label: "Side",
        options: ["bottom", "top"],
        defaultValue: "bottom",
      }),
      align: selectControl({
        label: "Align",
        options: ["start", "center", "end"],
        defaultValue: "start",
      }),
      sideOffset: numberControl({
        label: "Side offset",
        defaultValue: 8,
        min: 0,
        max: 24,
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "With rich panels",
      component: NavigationMenuBasic,
      sourceModule: "navigation-menu",
      sourceExport: "NavigationMenuBasic",
    },
    {
      id: "links",
      title: "Plain links",
      component: NavigationMenuSimpleLinks,
      sourceModule: "navigation-menu",
      sourceExport: "NavigationMenuSimpleLinks",
    },
  ],
}

const sidebarEntry: ComponentEntry = {
  id: "sidebar",
  name: "Sidebar",
  category: "Navigation",
  description:
    "A complete application sidebar: collapsible to icons or off-canvas, a Sheet on mobile, with a header, grouped menus, submenus, badges, hover actions and a footer.",
  sourcePath: "src/components/ui/sidebar.tsx",
  importStatement:
    'import {\n  Sidebar,\n  SidebarContent,\n  SidebarGroup,\n  SidebarInset,\n  SidebarMenu,\n  SidebarMenuButton,\n  SidebarMenuItem,\n  SidebarProvider,\n  SidebarTrigger,\n} from "@/components/ui/sidebar"',
  exports: [
    "SidebarProvider",
    "Sidebar",
    "SidebarHeader",
    "SidebarContent",
    "SidebarFooter",
    "SidebarGroup",
    "SidebarGroupAction",
    "SidebarGroupContent",
    "SidebarGroupLabel",
    "SidebarInput",
    "SidebarInset",
    "SidebarMenu",
    "SidebarMenuAction",
    "SidebarMenuBadge",
    "SidebarMenuButton",
    "SidebarMenuItem",
    "SidebarMenuSkeleton",
    "SidebarMenuSub",
    "SidebarMenuSubButton",
    "SidebarMenuSubItem",
    "SidebarRail",
    "SidebarSeparator",
    "SidebarTrigger",
    "useSidebar",
  ],
  keywords: ["nav", "shell", "app layout", "drawer", "collapsible"],
  notes: [
    "SidebarProvider registers a window-level Cmd/Ctrl+B listener and writes a sidebar_state cookie — both are global side effects, so mount exactly one per application.",
    'Every collapsible mode except "none" positions the sidebar fixed to the viewport, which is why the first two demos below use collapsible="none" and the real shell runs in its own document.',
    "Below 768px the sidebar renders inside a Sheet automatically.",
    "This showcase deliberately does NOT use Sidebar for its own chrome — a second provider would double-fire Cmd+B and clobber the cookie.",
  ],
  stories: [
    {
      id: "anatomy",
      title: "Anatomy",
      description:
        'Every part in one panel, using collapsible="none" so it stays inside the canvas.',
      component: SidebarAnatomy,
      layout: "stretch",
      sourceModule: "sidebar",
      sourceExport: "SidebarAnatomy",
    },
    {
      id: "variants",
      title: "Variants",
      component: SidebarVariants,
      layout: "stretch",
      sourceModule: "sidebar",
      sourceExport: "SidebarVariants",
    },
    {
      id: "menu-buttons",
      title: "Menu button sizes and states",
      component: SidebarMenuButtonSizes,
      layout: "stretch",
      sourceModule: "sidebar",
      sourceExport: "SidebarMenuButtonSizes",
    },
    {
      id: "full-shell",
      title: "The real application shell",
      description:
        "Rendered in an iframe at #/sandbox/sidebar so fixed positioning, the trigger, the rail, Cmd/Ctrl+B and the persisted cookie all work against a document of their own. Narrow the frame to see the mobile Sheet.",
      component: SidebarFullShell,
      layout: "stretch",
      sourceModule: "sidebar",
      sourceExport: "SidebarSandbox",
    },
  ],
}

const tabsEntry: ComponentEntry = {
  id: "tabs",
  name: "Tabs",
  category: "Navigation",
  description:
    "Panels switched by a tab list, in a filled pill or an underline style, laid out horizontally or vertically.",
  sourcePath: "src/components/ui/tabs.tsx",
  importStatement:
    'import {\n  Tabs,\n  TabsContent,\n  TabsList,\n  TabsTrigger,\n} from "@/components/ui/tabs"',
  exports: [
    "Tabs",
    "TabsList",
    "TabsTrigger",
    "TabsContent",
    "tabsListVariants",
  ],
  keywords: ["tab", "panel", "segmented", "switcher"],
  notes: [
    "orientation lives on Tabs; variant lives on TabsList.",
    "A vertical orientation moves the active indicator to the trigger's right edge.",
  ],
  playground: definePlayground({
    tag: "TabsList",
    layout: "stretch",
    component: TabsPlayground,
    controls: {
      variant: selectControl({
        label: "List variant",
        options: ["default", "line"],
        defaultValue: "default",
      }),
      orientation: selectControl({
        label: "Orientation",
        options: ["horizontal", "vertical"],
        defaultValue: "horizontal",
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "variants",
      title: "Variants",
      component: TabsVariants,
      layout: "stretch",
      sourceModule: "tabs",
      sourceExport: "TabsVariants",
    },
    {
      id: "vertical",
      title: "Vertical",
      component: TabsVertical,
      layout: "stretch",
      sourceModule: "tabs",
      sourceExport: "TabsVertical",
    },
    {
      id: "with-form",
      title: "With forms",
      component: TabsWithForm,
      layout: "stretch",
      sourceModule: "tabs",
      sourceExport: "TabsWithForm",
    },
    {
      id: "disabled",
      title: "Disabled trigger",
      component: TabsDisabled,
      layout: "stretch",
      sourceModule: "tabs",
      sourceExport: "TabsDisabled",
    },
  ],
}

export const navigationEntries: readonly ComponentEntry[] = [
  breadcrumbEntry,
  navigationMenuEntry,
  menubarEntry,
  sidebarEntry,
  tabsEntry,
  commandEntry,
  dropdownMenuEntry,
]
