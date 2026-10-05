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
  StepperBasic,
  StepperCustomIcons,
  StepperKeepMounted,
  StepperLabelBottom,
  StepperLoading,
  StepperNoSkipping,
  StepperPlayground,
  StepperVertical,
} from "@/showcase/demos/stepper"
import {
  NavigationMenuBasic,
  NavigationMenuPlayground,
  NavigationMenuSimpleLinks,
} from "@/showcase/demos/navigation-menu"
import {
  NavLinkControlled,
  NavLinkNested,
  NavLinkPlayground,
  NavLinkVariants,
} from "@/showcase/demos/nav-link"
import {
  SidebarAnatomy,
  SidebarFullShell,
  SidebarMenuButtonSizes,
  SidebarVariants,
} from "@/showcase/demos/sidebar"
import {
  TableOfContentsCustomControls,
  TableOfContentsPlayground,
  TableOfContentsVariants,
} from "@/showcase/demos/table-of-contents"
import {
  TabsDisabled,
  TabsPlayground,
  TabsVariants,
  TabsVertical,
  TabsWithForm,
} from "@/showcase/demos/tabs"
import {
  TreeAsyncLoading,
  TreeBasic,
  TreeCheckboxes,
  TreeCheckStrictly,
  TreeController,
  TreeDragAndDrop,
  TreeDragHandle,
  TreePlayground,
  TreeSelection,
  TreeWithLines,
} from "@/showcase/demos/tree"
import {
  TreeSelectCheckStrictly,
  TreeSelectCheckbox,
  TreeSelectCheckedStrategies,
  TreeSelectCustomRender,
  TreeSelectExpandOnClick,
  TreeSelectForm,
  TreeSelectMaxValues,
  TreeSelectMultiple,
  TreeSelectPlayground,
  TreeSelectSearchable,
  TreeSelectSingle,
} from "@/showcase/demos/tree-select"

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

const navLinkEntry: ComponentEntry = {
  id: "nav-link",
  name: "NavLink",
  category: "Navigation",
  description:
    "A sidebar-style link with label, description, left and right sections, active styling and collapsible nested links.",
  sourcePath: "src/components/ui/nav-link.tsx",
  importStatement: 'import { NavLink } from "@/components/ui/nav-link"',
  exports: ["NavLink"],
  keywords: ["nav", "link", "sidebar", "menu", "nested", "tree", "anchor"],
  notes: [
    "The root is polymorphic (an anchor by default); use `render` for a router link. Passing children turns the root into a toggle for the nested links.",
    "`color` accepts any CSS color and defaults to the primary token. `childrenOffset` is limited to the xs–xl scale; use `className` on the nested links for anything else.",
    "Mantine's classNames/styles/unstyled/vars/attributes/mod props, BoxProps shorthand and `autoContrast` have no equivalent here.",
  ],
  playground: definePlayground({
    tag: "NavLink",
    component: NavLinkPlayground,
    controls: {
      variant: selectControl({
        label: "Variant",
        options: ["light", "filled", "subtle"],
        defaultValue: "light",
      }),
      active: booleanControl({ label: "Active", defaultValue: true }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
      noWrap: booleanControl({ label: "No wrap", defaultValue: false }),
      withDescription: booleanControl({
        label: "Description",
        defaultValue: true,
      }),
      withChildren: booleanControl({
        label: "Nested links",
        defaultValue: false,
      }),
      childrenOffset: selectControl({
        label: "Children offset",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "lg",
      }),
    },
    snippet: (values) => {
      const props: string[] = ['href="#"', 'label="Dashboard"']
      if (values.variant !== "light") props.push(`variant="${values.variant}"`)
      if (values.active) props.push("active")
      if (values.disabled) props.push("disabled")
      if (values.noWrap) props.push("noWrap")
      if (values.withDescription)
        props.push('description="Overview of your account"')
      if (values.withChildren && values.childrenOffset !== "lg")
        props.push(`childrenOffset="${values.childrenOffset}"`)
      return values.withChildren
        ? `<NavLink ${props.join(" ")}>\n  <NavLink href="#" label="Analytics" />\n</NavLink>`
        : `<NavLink ${props.join(" ")} />`
    },
  }),
  stories: [
    {
      id: "variants",
      title: "Variants",
      component: NavLinkVariants,
      sourceModule: "nav-link",
      sourceExport: "NavLinkVariants",
    },
    {
      id: "nested",
      title: "Nested links",
      component: NavLinkNested,
      sourceModule: "nav-link",
      sourceExport: "NavLinkNested",
    },
    {
      id: "controlled",
      title: "Controlled",
      component: NavLinkControlled,
      sourceModule: "nav-link",
      sourceExport: "NavLinkControlled",
    },
  ],
}

const stepperEntry: ComponentEntry = {
  id: "stepper",
  name: "Stepper",
  category: "Navigation",
  description:
    "Displays content divided into a sequence of steps, with horizontal and vertical layouts, custom icons, loading state and a completed screen.",
  sourcePath: "src/components/ui/stepper.tsx",
  importStatement: 'import { Stepper } from "@/components/ui/stepper"',
  exports: ["Stepper", "Stepper.Step", "Stepper.Completed"],
  keywords: ["steps", "wizard", "progress", "multi-step", "checkout", "form"],
  notes: [
    "`active` is a 0-based index; an index past the last step shows `Stepper.Completed`. Steps are buttons and report clicks through `onStepClick`.",
    "`color` accepts any CSS color. `size`, `radius` and `contentPadding` are limited to the xs–xl scale; use `className` for anything else. `iconSize` takes a number (px) or a CSS length.",
    "`keepMounted` uses React `Activity` so hidden step content keeps its state.",
    "Mantine's classNames/styles/unstyled/vars/attributes/mod props, BoxProps shorthand and `autoContrast` have no equivalent here.",
  ],
  playground: definePlayground({
    tag: "Stepper",
    component: StepperPlayground,
    controls: {
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      radius: selectControl({
        label: "Radius",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "xl",
      }),
      orientation: selectControl({
        label: "Orientation",
        options: ["horizontal", "vertical"],
        defaultValue: "horizontal",
      }),
      iconPosition: selectControl({
        label: "Icon position",
        options: ["left", "right"],
        defaultValue: "left",
      }),
      labelPosition: selectControl({
        label: "Label position",
        options: ["right", "bottom"],
        defaultValue: "right",
      }),
      allowNextStepsSelect: booleanControl({
        label: "Allow next steps select",
        defaultValue: true,
      }),
      withDescription: booleanControl({
        label: "Description",
        defaultValue: true,
      }),
    },
    snippet: (values) => {
      const props: string[] = ["active={active}", "onStepClick={setActive}"]
      if (values.size !== "md") props.push(`size="${values.size}"`)
      if (values.radius !== "xl") props.push(`radius="${values.radius}"`)
      if (values.orientation !== "horizontal")
        props.push(`orientation="${values.orientation}"`)
      if (values.iconPosition !== "left")
        props.push(`iconPosition="${values.iconPosition}"`)
      if (values.labelPosition !== "right")
        props.push(`labelPosition="${values.labelPosition}"`)
      if (!values.allowNextStepsSelect)
        props.push("allowNextStepsSelect={false}")
      const desc = (text: string) =>
        values.withDescription ? ` description="${text}"` : ""
      return `<Stepper ${props.join(" ")}>
  <Stepper.Step label="First step"${desc("Create an account")}>Step 1 content</Stepper.Step>
  <Stepper.Step label="Second step"${desc("Verify email")}>Step 2 content</Stepper.Step>
  <Stepper.Step label="Final step"${desc("Get full access")}>Step 3 content</Stepper.Step>
  <Stepper.Completed>Completed</Stepper.Completed>
</Stepper>`
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      layout: "stretch",
      component: StepperBasic,
      sourceModule: "stepper",
      sourceExport: "StepperBasic",
    },
    {
      id: "vertical",
      title: "Vertical",
      component: StepperVertical,
      sourceModule: "stepper",
      sourceExport: "StepperVertical",
    },
    {
      id: "label-bottom",
      title: "Label position",
      component: StepperLabelBottom,
      sourceModule: "stepper",
      sourceExport: "StepperLabelBottom",
    },
    {
      id: "custom-icons",
      title: "Custom icons and color",
      component: StepperCustomIcons,
      sourceModule: "stepper",
      sourceExport: "StepperCustomIcons",
    },
    {
      id: "loading",
      title: "Loading step",
      component: StepperLoading,
      sourceModule: "stepper",
      sourceExport: "StepperLoading",
    },
    {
      id: "no-skipping",
      title: "Restrict step selection",
      description:
        "`allowNextStepsSelect={false}` limits clicks to completed steps; `allowStepSelect` overrides it per step.",
      component: StepperNoSkipping,
      sourceModule: "stepper",
      sourceExport: "StepperNoSkipping",
    },
    {
      id: "keep-mounted",
      title: "Keep mounted",
      component: StepperKeepMounted,
      sourceModule: "stepper",
      sourceExport: "StepperKeepMounted",
    },
  ],
}

const tableOfContentsEntry: ComponentEntry = {
  id: "table-of-contents",
  name: "TableOfContents",
  category: "Navigation",
  description:
    "Lists the headings of a page and highlights the one currently closest to the top of the viewport or a scroll container.",
  sourcePath: "src/components/ui/table-of-contents.tsx",
  importStatement:
    'import { TableOfContents } from "@/components/ui/table-of-contents"',
  exports: ["TableOfContents"],
  keywords: [
    "toc",
    "headings",
    "scroll spy",
    "outline",
    "anchor",
    "navigation",
  ],
  notes: [
    "Headings are read from the DOM through the `useScrollSpy` hook (`src/hooks/use-scroll-spy.ts`). Pass `scrollSpyOptions.scrollHost` when a container, not the window, scrolls; the active heading is then measured relative to that container's top.",
    "Controls are ghost `Button`s. Use `getControlProps` to set `children`, `onClick` (e.g. scroll the heading into view) or any other button prop.",
    "`color` accepts any CSS color and defaults to the primary token; `size` and `radius` are limited to the xs–xl scale.",
    "`initialData` renders only until the first DOM read, so it is mainly useful for server rendering.",
    "Mantine's classNames/styles/unstyled/vars/attributes/mod props, BoxProps shorthand and `autoContrast` have no equivalent here.",
  ],
  playground: definePlayground({
    tag: "TableOfContents",
    component: TableOfContentsPlayground,
    layout: "stretch",
    controls: {
      variant: selectControl({
        label: "Variant",
        options: ["filled", "light", "none"],
        defaultValue: "filled",
      }),
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      radius: selectControl({
        label: "Radius",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      color: textControl({ label: "Color (CSS)", defaultValue: "" }),
      minDepthToOffset: numberControl({
        label: "Min depth to offset",
        defaultValue: 1,
        min: 1,
        max: 3,
        step: 1,
      }),
      depthOffset: numberControl({
        label: "Depth offset (px)",
        defaultValue: 20,
        min: 0,
        max: 48,
        step: 4,
      }),
    },
    snippet: (values) => {
      const props: string[] = []
      if (values.variant !== "filled") props.push(`variant="${values.variant}"`)
      if (values.size !== "md") props.push(`size="${values.size}"`)
      if (values.radius !== "md") props.push(`radius="${values.radius}"`)
      if (values.color) props.push(`color="${values.color}"`)
      if (values.minDepthToOffset !== 1)
        props.push(`minDepthToOffset={${values.minDepthToOffset}}`)
      props.push(`depthOffset={${values.depthOffset}}`)
      return `<TableOfContents ${props.join(" ")} />`
    },
  }),
  stories: [
    {
      id: "variants",
      title: "Variants",
      layout: "stretch",
      component: TableOfContentsVariants,
      sourceModule: "table-of-contents",
      sourceExport: "TableOfContentsVariants",
    },
    {
      id: "custom-controls",
      title: "Custom controls",
      description:
        "`getControlProps` receives the heading data and active state for each control.",
      layout: "stretch",
      component: TableOfContentsCustomControls,
      sourceModule: "table-of-contents",
      sourceExport: "TableOfContentsCustomControls",
    },
  ],
}

const treeEntry: ComponentEntry = {
  id: "tree",
  name: "Tree",
  category: "Navigation",
  description:
    "A hierarchical list with expand/collapse, selection, cascading checkboxes with indeterminate state, keyboard navigation, lazy-loaded children and drag and drop. State lives in the useTree hook so other components can reuse it.",
  sourcePath: "src/components/ui/tree.tsx",
  importStatement: 'import { Tree, useTree } from "@/components/ui/tree"',
  exports: ["Tree", "useTree", "getTreeExpandedState", "moveTreeNode"],
  keywords: [
    "tree",
    "tree view",
    "hierarchy",
    "nested",
    "file explorer",
    "checkbox tree",
    "expand",
    "collapse",
    "drag and drop",
  ],
  notes: [
    "useTree (src/hooks/use-tree.ts) owns expanded, selected and checked state plus anchorNode, and is controllable per slice (expandedState / selectedState / checkedState with their on*Change callbacks). Pass the instance to Tree via the tree prop to read or drive it.",
    "Checking cascades through leaves: a parent is checked when all leaves are, and indeterminate when only some are. checkStrictly makes every node independent.",
    "Keyboard: Arrow Up/Down move between visible nodes, Right expands or enters the first child, Left collapses or returns to the parent, Shift+Arrow extends the selection range, Space toggles expansion and, with checkOnSpace, the checked state.",
    "Nodes with hasChildren: true and no children array are loaded lazily through useTree's onLoadChildren, which should update data; loading and error state are exposed to renderNode.",
    "Drag and drop is enabled by passing onDragDrop; use moveTreeNode to apply the payload to your data, allowDrop to veto drops, and withDragHandle with the dragHandleProps from renderNode to restrict where a drag can start.",
    "renderNode receives elementProps that must be spread on the element representing the node; it carries the click, selection and drag behaviour.",
    "levelOffset accepts xs-xl or any CSS length (numbers are px) and is exposed to children as a CSS variable.",
    "Skipped on purpose: the global styling props classNames, styles, unstyled, vars, attributes, mod and the style shorthand props. Use className and style instead.",
  ],
  playground: definePlayground({
    tag: "Tree",
    layout: "stretch",
    component: TreePlayground,
    controls: {
      levelOffset: selectControl({
        label: "Level offset",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "lg",
      }),
      expandOnClick: booleanControl({
        label: "Expand on click",
        defaultValue: true,
      }),
      selectOnClick: booleanControl({
        label: "Select on click",
        defaultValue: true,
      }),
      clearSelectionOnOutsideClick: booleanControl({
        label: "Clear selection on outside click",
        defaultValue: false,
      }),
      allowRangeSelection: booleanControl({
        label: "Allow range selection",
        defaultValue: true,
      }),
      withLines: booleanControl({
        label: "With lines",
        defaultValue: false,
      }),
      keepMounted: booleanControl({
        label: "Keep mounted",
        defaultValue: false,
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      description: "Click a node with children to expand it.",
      component: TreeBasic,
      layout: "stretch",
      sourceModule: "tree",
      sourceExport: "TreeBasic",
    },
    {
      id: "controller",
      title: "Controller",
      description:
        "useTree exposes expandAllNodes, collapseAllNodes and the rest of the state API.",
      component: TreeController,
      layout: "stretch",
      sourceModule: "tree",
      sourceExport: "TreeController",
    },
    {
      id: "selection",
      title: "Selection",
      description:
        "selectOnClick with multiple selection, Shift+click ranges and clearSelectionOnOutsideClick.",
      component: TreeSelection,
      layout: "stretch",
      sourceModule: "tree",
      sourceExport: "TreeSelection",
    },
    {
      id: "checkboxes",
      title: "Checkboxes",
      description:
        "Cascading checked state with indeterminate parents, rendered through renderNode.",
      component: TreeCheckboxes,
      layout: "stretch",
      sourceModule: "tree",
      sourceExport: "TreeCheckboxes",
    },
    {
      id: "check-strictly",
      title: "checkStrictly",
      description:
        "Each node is checked independently of its parent and children.",
      component: TreeCheckStrictly,
      layout: "stretch",
      sourceModule: "tree",
      sourceExport: "TreeCheckStrictly",
    },
    {
      id: "with-lines",
      title: "With lines",
      description: "Connecting lines between parents and children.",
      component: TreeWithLines,
      layout: "stretch",
      sourceModule: "tree",
      sourceExport: "TreeWithLines",
    },
    {
      id: "async",
      title: "Async loading",
      description:
        "Nodes marked hasChildren load their children on first expand, with a spinner while pending.",
      component: TreeAsyncLoading,
      layout: "stretch",
      sourceModule: "tree",
      sourceExport: "TreeAsyncLoading",
    },
    {
      id: "drag-and-drop",
      title: "Drag and drop",
      description:
        "onDragDrop with moveTreeNode; allowDrop restricts Done to inside drops only.",
      component: TreeDragAndDrop,
      layout: "stretch",
      sourceModule: "tree",
      sourceExport: "TreeDragAndDrop",
    },
    {
      id: "drag-handle",
      title: "Drag handle",
      description: "withDragHandle limits dragging to the grip icon.",
      component: TreeDragHandle,
      layout: "stretch",
      sourceModule: "tree",
      sourceExport: "TreeDragHandle",
    },
  ],
}

const treeSelectEntry: ComponentEntry = {
  id: "tree-select",
  name: "Tree Select",
  category: "Navigation",
  description:
    "A select input whose dropdown is a tree. Supports single and multiple selection, cascading checkboxes with indeterminate state, search, expandable nodes and a hidden form input.",
  sourcePath: "src/components/ui/tree-select.tsx",
  importStatement: 'import { TreeSelect } from "@/components/ui/tree-select"',
  exports: ["TreeSelect"],
  keywords: [
    "tree",
    "select",
    "dropdown",
    "hierarchy",
    "checkbox",
    "multi select",
    "nested",
    "combobox",
  ],
  notes: [
    "mode is 'single' (default), 'multiple' or 'checkbox'. In single and multiple modes any node, parents included, is selectable unless expandOnClick is set, in which case parents only expand.",
    "In checkbox mode checking a parent checks all its leaves and parents show an indeterminate state. checkStrictly makes every node independent. checkedStrategy ('child' | 'parent' | 'all') chooses which checked nodes are reported in value and shown as pills.",
    "Keyboard: ArrowUp/Down move the highlight, Enter selects, ArrowRight/Left expand, collapse or jump to the parent, Backspace removes the last pill, Space toggles the dropdown when not searchable.",
    "Built on Popover with a roving highlight rather than a Combobox primitive, since the options are a hierarchy. The checkbox indicator is drawn inline because the shared Checkbox has no indeterminate visual.",
    "Dropdown positioning is exposed through comboboxProps ({ side, align, sideOffset, alignOffset, width, className }). chevronColor takes any CSS color.",
    "Nodes marked hasChildren without a children array render a chevron but are not loaded lazily; this component has no onLoadChildren.",
    "Skipped on purpose: global styling props (classNames, styles, unstyled, vars, attributes, mod, style shorthands). Use className and wrapperClassName instead.",
    "Skipped on purpose: input wrapper props (label, description, error message, success, withAsterisk, labelProps, descriptionProps, errorProps, successProps, wrapperProps, inputContainer, inputWrapperOrder, withErrorStyles, withSuccessStyles, size-linked loading). Compose with Field, FieldLabel, FieldDescription and FieldError; error here is a boolean that marks the input invalid.",
  ],
  playground: definePlayground({
    tag: "TreeSelect",
    layout: "stretch",
    component: TreeSelectPlayground,
    controls: {
      mode: selectControl({
        label: "Mode",
        options: ["single", "multiple", "checkbox"],
        defaultValue: "single",
      }),
      searchable: booleanControl({ label: "Searchable", defaultValue: false }),
      clearable: booleanControl({ label: "Clearable", defaultValue: true }),
      expandOnClick: booleanControl({
        label: "Expand on click",
        defaultValue: false,
      }),
      checkStrictly: booleanControl({
        label: "Check strictly",
        defaultValue: false,
      }),
      checkedStrategy: selectControl({
        label: "Checked strategy",
        options: ["child", "parent", "all"],
        defaultValue: "child",
      }),
      withLines: booleanControl({ label: "With lines", defaultValue: true }),
      allowDeselect: booleanControl({
        label: "Allow deselect",
        defaultValue: true,
      }),
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "sm",
      }),
      placeholder: textControl({
        label: "Placeholder",
        defaultValue: "Pick a file",
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
      readOnly: booleanControl({ label: "Read only", defaultValue: false }),
      error: booleanControl({ label: "Error", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "single",
      title: "Single, controlled",
      description:
        "Selecting the selected node again clears it, unless allowDeselect is false.",
      component: TreeSelectSingle,
      sourceModule: "tree-select",
      sourceExport: "TreeSelectSingle",
    },
    {
      id: "searchable",
      title: "Searchable",
      description:
        "Typing filters the tree and auto-expands matching branches. Opening the dropdown reveals the selected node.",
      component: TreeSelectSearchable,
      sourceModule: "tree-select",
      sourceExport: "TreeSelectSearchable",
    },
    {
      id: "multiple",
      title: "Multiple",
      description:
        "Selected nodes appear as pills; maxDisplayedValues collapses the rest into an overflow pill.",
      component: TreeSelectMultiple,
      sourceModule: "tree-select",
      sourceExport: "TreeSelectMultiple",
    },
    {
      id: "expand-on-click",
      title: "Expand on click",
      description: "Parent rows only expand, so only leaves can be selected.",
      component: TreeSelectExpandOnClick,
      sourceModule: "tree-select",
      sourceExport: "TreeSelectExpandOnClick",
    },
    {
      id: "checkbox",
      title: "Checkbox cascade",
      description:
        "Checking a parent checks every leaf below it; partially checked parents are indeterminate.",
      component: TreeSelectCheckbox,
      sourceModule: "tree-select",
      sourceExport: "TreeSelectCheckbox",
    },
    {
      id: "checked-strategy",
      title: "Checked strategy",
      description:
        "The same selection reported as leaves, topmost parents, or every checked node.",
      component: TreeSelectCheckedStrategies,
      sourceModule: "tree-select",
      sourceExport: "TreeSelectCheckedStrategies",
    },
    {
      id: "check-strictly",
      title: "Check strictly",
      description: "Parents and children are checked independently.",
      component: TreeSelectCheckStrictly,
      sourceModule: "tree-select",
      sourceExport: "TreeSelectCheckStrictly",
    },
    {
      id: "max-values",
      title: "Max values",
      description: "Further selections are ignored once the limit is reached.",
      component: TreeSelectMaxValues,
      sourceModule: "tree-select",
      sourceExport: "TreeSelectMaxValues",
    },
    {
      id: "custom-render",
      title: "Custom node rendering",
      description:
        "renderNode replaces the row content and receives an expand handler.",
      component: TreeSelectCustomRender,
      sourceModule: "tree-select",
      sourceExport: "TreeSelectCustomRender",
    },
    {
      id: "form",
      title: "Form value",
      description:
        "A hidden input carries the value, joined by hiddenInputValuesDivider in multi modes.",
      component: TreeSelectForm,
      sourceModule: "tree-select",
      sourceExport: "TreeSelectForm",
    },
  ],
}

export const navigationEntries: readonly ComponentEntry[] = [
  breadcrumbEntry,
  navigationMenuEntry,
  navLinkEntry,
  menubarEntry,
  sidebarEntry,
  stepperEntry,
  tableOfContentsEntry,
  tabsEntry,
  commandEntry,
  dropdownMenuEntry,
  treeEntry,
  treeSelectEntry,
]
