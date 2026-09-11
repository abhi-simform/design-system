import {
  booleanControl,
  numberControl,
  selectControl,
  textControl,
} from "@/showcase/lib/controls"
import { definePlayground } from "@/showcase/registry/define-playground"
import type { ComponentEntry } from "@/showcase/registry/types"
import {
  ButtonGroupBasic,
  ButtonGroupPlayground,
  ButtonGroupStepper,
  ButtonGroupVertical,
  ButtonGroupWithSeparator,
  ButtonGroupWithText,
} from "@/showcase/demos/button-group"
import {
  KbdBasic,
  KbdGroups,
  KbdInContext,
  KbdPlayground,
} from "@/showcase/demos/kbd"
import {
  TogglePlayground,
  ToggleSizes,
  ToggleVariants,
  ToggleWithText,
} from "@/showcase/demos/toggle"
import {
  ToggleGroupMultiple,
  ToggleGroupOrientation,
  ToggleGroupPlayground,
  ToggleGroupSpacing,
} from "@/showcase/demos/toggle-group"
import {
  ButtonAsLink,
  ButtonIconSizes,
  ButtonPlayground,
  ButtonSizes,
  ButtonStates,
  ButtonVariants,
  ButtonWithIcons,
} from "@/showcase/demos/button"

const buttonEntry: ComponentEntry = {
  id: "button",
  name: "Button",
  category: "Actions",
  description:
    "Triggers an action. Six variants across eight sizes, built on the Base UI Button with a polymorphic render prop for rendering as a link.",
  sourcePath: "src/components/ui/button.tsx",
  importStatement: 'import { Button } from "@/components/ui/button"',
  exports: ["Button", "buttonVariants"],
  keywords: ["cta", "action", "submit", "link", "icon"],
  notes: [
    'Icons are placed with data-icon="inline-start" or "inline-end", which tightens the matching side\'s padding.',
    "Use render={<a href=… />} rather than asChild — this system is built on Base UI, not Radix.",
  ],
  playground: definePlayground({
    tag: "Button",
    component: ButtonPlayground,
    controls: {
      variant: selectControl({
        label: "Variant",
        options: [
          "default",
          "outline",
          "secondary",
          "ghost",
          "destructive",
          "link",
        ],
        defaultValue: "default",
      }),
      size: selectControl({
        label: "Size",
        options: [
          "default",
          "xs",
          "sm",
          "lg",
          "icon",
          "icon-xs",
          "icon-sm",
          "icon-lg",
        ],
        defaultValue: "default",
      }),
      children: textControl({
        label: "Label",
        defaultValue: "Button",
        codeRole: "children",
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "variants",
      title: "Variants",
      component: ButtonVariants,
      sourceModule: "button",
      sourceExport: "ButtonVariants",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: ButtonSizes,
      sourceModule: "button",
      sourceExport: "ButtonSizes",
    },
    {
      id: "icon-sizes",
      title: "Icon sizes",
      description:
        "Square variants for icon-only buttons. Always pair one with an aria-label.",
      component: ButtonIconSizes,
      sourceModule: "button",
      sourceExport: "ButtonIconSizes",
    },
    {
      id: "with-icons",
      title: "With icons",
      component: ButtonWithIcons,
      sourceModule: "button",
      sourceExport: "ButtonWithIcons",
    },
    {
      id: "states",
      title: "States",
      description:
        "Disabled, aria-invalid, and a pending button pairing Spinner with disabled.",
      component: ButtonStates,
      sourceModule: "button",
      sourceExport: "ButtonStates",
    },
    {
      id: "as-link",
      title: "Rendered as a link",
      description:
        "The render prop swaps the underlying element while keeping every button style.",
      component: ButtonAsLink,
      sourceModule: "button",
      sourceExport: "ButtonAsLink",
    },
  ],
}

const buttonGroupEntry: ComponentEntry = {
  id: "button-group",
  name: "Button Group",
  category: "Actions",
  description:
    "Joins buttons, inputs and select triggers into a single segmented control by stripping the interior corners and borders.",
  sourcePath: "src/components/ui/button-group.tsx",
  importStatement:
    'import {\n  ButtonGroup,\n  ButtonGroupSeparator,\n  ButtonGroupText,\n} from "@/components/ui/button-group"',
  exports: [
    "ButtonGroup",
    "ButtonGroupSeparator",
    "ButtonGroupText",
    "buttonGroupVariants",
  ],
  keywords: ["segmented", "split", "toolbar", "joined"],
  notes: [
    "The group styles its children by data-slot, so any design-system component with one (Button, Input, SelectTrigger) joins correctly.",
    "Buttons inside a group switch to rounded-lg at the xs and sm sizes to match the group's corners.",
  ],
  playground: definePlayground({
    tag: "ButtonGroup",
    component: ButtonGroupPlayground,
    controls: {
      orientation: selectControl({
        label: "Orientation",
        options: ["horizontal", "vertical"],
        defaultValue: "horizontal",
      }),
      variant: selectControl({
        label: "Button variant",
        options: ["outline", "secondary", "default"],
        defaultValue: "outline",
        codeRole: "none",
      }),
      size: selectControl({
        label: "Button size",
        options: ["default", "xs", "sm", "lg"],
        defaultValue: "default",
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: ButtonGroupBasic,
      sourceModule: "button-group",
      sourceExport: "ButtonGroupBasic",
    },
    {
      id: "split",
      title: "Split button",
      description:
        "A separator turns a group into a primary action with its own dropdown affordance.",
      component: ButtonGroupWithSeparator,
      sourceModule: "button-group",
      sourceExport: "ButtonGroupWithSeparator",
    },
    {
      id: "with-input",
      title: "With an input and a text addon",
      component: ButtonGroupWithText,
      sourceModule: "button-group",
      sourceExport: "ButtonGroupWithText",
    },
    {
      id: "stepper",
      title: "Stepper",
      component: ButtonGroupStepper,
      sourceModule: "button-group",
      sourceExport: "ButtonGroupStepper",
    },
    {
      id: "vertical",
      title: "Vertical",
      component: ButtonGroupVertical,
      sourceModule: "button-group",
      sourceExport: "ButtonGroupVertical",
    },
  ],
}

const toggleEntry: ComponentEntry = {
  id: "toggle",
  name: "Toggle",
  category: "Actions",
  description:
    "A two-state button that stays pressed. Use it for a single independent option such as bold in a text toolbar.",
  sourcePath: "src/components/ui/toggle.tsx",
  importStatement: 'import { Toggle } from "@/components/ui/toggle"',
  exports: ["Toggle", "toggleVariants"],
  keywords: ["pressed", "switch", "on", "off", "formatting"],
  notes: [
    "Uncontrolled with defaultPressed, or controlled with pressed plus onPressedChange.",
    "Icon-only toggles need an aria-label — the pressed state alone is not a name.",
  ],
  playground: definePlayground({
    tag: "Toggle",
    component: TogglePlayground,
    controls: {
      variant: selectControl({
        label: "Variant",
        options: ["default", "outline"],
        defaultValue: "default",
      }),
      size: selectControl({
        label: "Size",
        options: ["default", "sm", "lg"],
        defaultValue: "default",
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "variants",
      title: "Variants",
      component: ToggleVariants,
      sourceModule: "toggle",
      sourceExport: "ToggleVariants",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: ToggleSizes,
      sourceModule: "toggle",
      sourceExport: "ToggleSizes",
    },
    {
      id: "with-text",
      title: "With text",
      component: ToggleWithText,
      sourceModule: "toggle",
      sourceExport: "ToggleWithText",
    },
  ],
}

const toggleGroupEntry: ComponentEntry = {
  id: "toggle-group",
  name: "Toggle Group",
  category: "Actions",
  description:
    "A set of toggles sharing one value. Set spacing={0} for a joined segmented control, or multiple for checkbox-style selection.",
  sourcePath: "src/components/ui/toggle-group.tsx",
  importStatement:
    'import {\n  ToggleGroup,\n  ToggleGroupItem,\n} from "@/components/ui/toggle-group"',
  exports: ["ToggleGroup", "ToggleGroupItem"],
  keywords: ["segmented", "radio", "alignment", "multiple"],
  notes: [
    'Value is always an array, even in single-select mode — defaultValue={["left"]}.',
    "variant and size set on the group flow to every item through context.",
  ],
  playground: definePlayground({
    tag: "ToggleGroup",
    component: ToggleGroupPlayground,
    controls: {
      variant: selectControl({
        label: "Variant",
        options: ["default", "outline"],
        defaultValue: "default",
      }),
      size: selectControl({
        label: "Size",
        options: ["default", "sm", "lg"],
        defaultValue: "default",
      }),
      spacing: numberControl({
        label: "Spacing",
        defaultValue: 2,
        min: 0,
        max: 4,
        step: 1,
      }),
      orientation: selectControl({
        label: "Orientation",
        options: ["horizontal", "vertical"],
        defaultValue: "horizontal",
      }),
    },
  }),
  stories: [
    {
      id: "spacing",
      title: "Spacing",
      description:
        "spacing={0} removes the gap and rounds only the outer corners, producing a segmented control.",
      component: ToggleGroupSpacing,
      sourceModule: "toggle-group",
      sourceExport: "ToggleGroupSpacing",
    },
    {
      id: "multiple",
      title: "Multiple selection",
      component: ToggleGroupMultiple,
      sourceModule: "toggle-group",
      sourceExport: "ToggleGroupMultiple",
    },
    {
      id: "vertical",
      title: "Vertical",
      component: ToggleGroupOrientation,
      sourceModule: "toggle-group",
      sourceExport: "ToggleGroupOrientation",
    },
  ],
}

const kbdEntry: ComponentEntry = {
  id: "kbd",
  name: "Kbd",
  category: "Actions",
  description:
    "Renders a keyboard key. KbdGroup lays out a chord, and both restyle themselves automatically inside a tooltip.",
  sourcePath: "src/components/ui/kbd.tsx",
  importStatement: 'import { Kbd, KbdGroup } from "@/components/ui/kbd"',
  exports: ["Kbd", "KbdGroup"],
  keywords: ["keyboard", "shortcut", "hotkey", "key"],
  notes: [
    "Pointer events are disabled, so a Kbd inside a button never swallows the click.",
  ],
  playground: definePlayground({
    tag: "Kbd",
    component: KbdPlayground,
    controls: {
      children: textControl({
        label: "Key",
        defaultValue: "Esc",
        codeRole: "children",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Single keys",
      component: KbdBasic,
      sourceModule: "kbd",
      sourceExport: "KbdBasic",
    },
    {
      id: "groups",
      title: "Chords",
      component: KbdGroups,
      sourceModule: "kbd",
      sourceExport: "KbdGroups",
    },
    {
      id: "in-context",
      title: "In context",
      description:
        "Inside a TooltipContent the key inverts to stay legible against the dark surface.",
      component: KbdInContext,
      sourceModule: "kbd",
      sourceExport: "KbdInContext",
    },
  ],
}

export const actionsEntries: readonly ComponentEntry[] = [
  buttonEntry,
  buttonGroupEntry,
  toggleEntry,
  toggleGroupEntry,
  kbdEntry,
]
