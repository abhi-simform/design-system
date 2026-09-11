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
  CheckboxGroup,
  CheckboxPlayground,
  CheckboxStates,
} from "@/showcase/demos/checkbox"
import {
  ComboboxBasic,
  ComboboxGrouped,
  ComboboxMultiple,
  ComboboxPlayground,
} from "@/showcase/demos/combobox"
import {
  FieldFullForm,
  FieldOrientations,
  FieldPlayground,
  FieldSets,
  FieldWithErrors,
} from "@/showcase/demos/field"
import {
  InputFile,
  InputPlayground,
  InputStates,
  InputTypes,
} from "@/showcase/demos/input"
import {
  InputGroupAlignments,
  InputGroupButtonSizes,
  InputGroupPlayground,
  InputGroupWithText,
  InputGroupWithTextarea,
} from "@/showcase/demos/input-group"
import {
  LabelDisabled,
  LabelPlayground,
  LabelWithCheckbox,
  LabelWithInput,
} from "@/showcase/demos/label"
import {
  NativeSelectGrouped,
  NativeSelectPlayground,
  NativeSelectSizes,
  NativeSelectStates,
} from "@/showcase/demos/native-select"
import {
  RadioGroupBasic,
  RadioGroupDisabled,
  RadioGroupHorizontal,
  RadioGroupPlayground,
} from "@/showcase/demos/radio-group"
import {
  SelectBasic,
  SelectGrouped,
  SelectPlayground,
  SelectSizes,
  SelectStates,
} from "@/showcase/demos/select"
import {
  SliderBasic,
  SliderDisabled,
  SliderPlayground,
  SliderRange,
  SliderSteps,
} from "@/showcase/demos/slider"
import {
  SwitchInSettings,
  SwitchPlayground,
  SwitchSizes,
  SwitchStates,
} from "@/showcase/demos/switch"
import {
  TextareaAutoGrow,
  TextareaBasic,
  TextareaPlayground,
  TextareaStates,
} from "@/showcase/demos/textarea"

// Deferred so their third-party dependency stays out of the initial bundle.
const CalendarDropdownCaption = lazyDemo(
  () => import("@/showcase/demos/calendar"),
  "CalendarDropdownCaption",
)
const CalendarInPopover = lazyDemo(
  () => import("@/showcase/demos/calendar"),
  "CalendarInPopover",
)
const CalendarMultiple = lazyDemo(
  () => import("@/showcase/demos/calendar"),
  "CalendarMultiple",
)
const CalendarPlayground = lazyDemo(
  () => import("@/showcase/demos/calendar"),
  "CalendarPlayground",
)
const CalendarRange = lazyDemo(
  () => import("@/showcase/demos/calendar"),
  "CalendarRange",
)
const CalendarSingle = lazyDemo(
  () => import("@/showcase/demos/calendar"),
  "CalendarSingle",
)
const InputOTPBasic = lazyDemo(
  () => import("@/showcase/demos/input-otp"),
  "InputOTPBasic",
)
const InputOTPDisabled = lazyDemo(
  () => import("@/showcase/demos/input-otp"),
  "InputOTPDisabled",
)
const InputOTPOnComplete = lazyDemo(
  () => import("@/showcase/demos/input-otp"),
  "InputOTPOnComplete",
)
const InputOTPPlayground = lazyDemo(
  () => import("@/showcase/demos/input-otp"),
  "InputOTPPlayground",
)
const InputOTPWithSeparator = lazyDemo(
  () => import("@/showcase/demos/input-otp"),
  "InputOTPWithSeparator",
)
const calendarEntry: ComponentEntry = {
  id: "calendar",
  name: "Calendar",
  category: "Forms",
  description:
    "A date picker built on react-day-picker, sized from a --cell-size token and styled with the system's button variants.",
  sourcePath: "src/components/ui/calendar.tsx",
  importStatement: 'import { Calendar } from "@/components/ui/calendar"',
  exports: ["Calendar", "CalendarDayButton"],
  externalDeps: ["react-day-picker", "date-fns"],
  keywords: ["date", "picker", "day", "month", "range", "schedule"],
  notes: [
    'mode switches between "single", "multiple" and "range"; the selected value type changes with it.',
    'captionLayout="dropdown" needs startMonth and endMonth to know the dropdown range.',
    "Inside a PopoverContent the calendar restyles itself automatically — no extra classes needed.",
  ],
  playground: definePlayground({
    tag: "Calendar",
    component: CalendarPlayground,
    controls: {
      captionLayout: selectControl({
        label: "Caption layout",
        options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
        defaultValue: "label",
      }),
      buttonVariant: selectControl({
        label: "Button variant",
        options: ["ghost", "outline", "secondary"],
        defaultValue: "ghost",
      }),
      showOutsideDays: booleanControl({
        label: "Show outside days",
        defaultValue: true,
      }),
    },
  }),
  stories: [
    {
      id: "single",
      title: "Single date",
      component: CalendarSingle,
      sourceModule: "calendar",
      sourceExport: "CalendarSingle",
    },
    {
      id: "range",
      title: "Range",
      component: CalendarRange,
      sourceModule: "calendar",
      sourceExport: "CalendarRange",
    },
    {
      id: "multiple",
      title: "Multiple dates",
      component: CalendarMultiple,
      sourceModule: "calendar",
      sourceExport: "CalendarMultiple",
    },
    {
      id: "dropdown",
      title: "Dropdown caption",
      component: CalendarDropdownCaption,
      sourceModule: "calendar",
      sourceExport: "CalendarDropdownCaption",
    },
    {
      id: "in-popover",
      title: "In a popover",
      component: CalendarInPopover,
      sourceModule: "calendar",
      sourceExport: "CalendarInPopover",
    },
  ],
}

const checkboxEntry: ComponentEntry = {
  id: "checkbox",
  name: "Checkbox",
  category: "Forms",
  description:
    "A tri-state checkbox. Wrap it in a Label and the label dims automatically when the control is disabled.",
  sourcePath: "src/components/ui/checkbox.tsx",
  importStatement: 'import { Checkbox } from "@/components/ui/checkbox"',
  exports: ["Checkbox"],
  keywords: ["check", "tick", "indeterminate", "multi-select", "consent"],
  notes: [
    "indeterminate is a separate prop from checked, for parent rows in a tree.",
  ],
  playground: definePlayground({
    tag: "Checkbox",
    component: CheckboxPlayground,
    controls: {
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
      invalid: booleanControl({ label: "Invalid", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "states",
      title: "States",
      component: CheckboxStates,
      layout: "stack",
      sourceModule: "checkbox",
      sourceExport: "CheckboxStates",
    },
    {
      id: "group",
      title: "Parent and children",
      description:
        "The parent uses indeterminate while only some children are checked.",
      component: CheckboxGroup,
      layout: "stack",
      sourceModule: "checkbox",
      sourceExport: "CheckboxGroup",
    },
  ],
}

const comboboxEntry: ComponentEntry = {
  id: "combobox",
  name: "Combobox",
  category: "Forms",
  description:
    "A filterable select. Feed it an items array and it handles matching, keyboard navigation and the empty state for you.",
  sourcePath: "src/components/ui/combobox.tsx",
  importStatement:
    'import {\n  Combobox,\n  ComboboxCollection,\n  ComboboxContent,\n  ComboboxEmpty,\n  ComboboxInput,\n  ComboboxItem,\n  ComboboxList,\n} from "@/components/ui/combobox"',
  exports: [
    "Combobox",
    "ComboboxInput",
    "ComboboxContent",
    "ComboboxList",
    "ComboboxItem",
    "ComboboxGroup",
    "ComboboxLabel",
    "ComboboxCollection",
    "ComboboxEmpty",
    "ComboboxSeparator",
    "ComboboxChips",
    "ComboboxChip",
    "ComboboxChipsInput",
    "ComboboxTrigger",
    "ComboboxValue",
    "useComboboxAnchor",
  ],
  keywords: ["autocomplete", "typeahead", "search select", "multi-select"],
  notes: [
    "ComboboxCollection takes a render function and only mounts the filtered items.",
    "For multi-select, use ComboboxChips with useComboboxAnchor so the popup anchors to the chip field rather than the input.",
  ],
  playground: definePlayground({
    tag: "ComboboxInput",
    component: ComboboxPlayground,
    controls: {
      showTrigger: booleanControl({
        label: "Chevron trigger",
        defaultValue: true,
      }),
      showClear: booleanControl({ label: "Clear button", defaultValue: false }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: ComboboxBasic,
      sourceModule: "combobox",
      sourceExport: "ComboboxBasic",
    },
    {
      id: "grouped",
      title: "Grouped options",
      component: ComboboxGrouped,
      sourceModule: "combobox",
      sourceExport: "ComboboxGrouped",
    },
    {
      id: "multiple",
      title: "Multi-select with chips",
      component: ComboboxMultiple,
      sourceModule: "combobox",
      sourceExport: "ComboboxMultiple",
    },
  ],
}

const fieldEntry: ComponentEntry = {
  id: "field",
  name: "Field",
  category: "Forms",
  description:
    "The form layout primitive: label, control, description and error in one consistent arrangement, with vertical, horizontal and responsive orientations.",
  sourcePath: "src/components/ui/field.tsx",
  importStatement:
    'import {\n  Field,\n  FieldContent,\n  FieldDescription,\n  FieldError,\n  FieldGroup,\n  FieldLabel,\n  FieldLegend,\n  FieldSeparator,\n  FieldSet,\n} from "@/components/ui/field"',
  exports: [
    "Field",
    "FieldLabel",
    "FieldDescription",
    "FieldError",
    "FieldGroup",
    "FieldLegend",
    "FieldSeparator",
    "FieldSet",
    "FieldContent",
    "FieldTitle",
  ],
  keywords: ["form", "label", "error", "validation", "fieldset", "layout"],
  notes: [
    "FieldError takes an errors array of { message } objects, dedupes it, and renders a list when there is more than one.",
    'orientation="responsive" is horizontal above the sm breakpoint and vertical below it.',
    "FieldSeparator accepts children to render a centred label on the rule.",
  ],
  playground: definePlayground({
    tag: "Field",
    layout: "stretch",
    component: FieldPlayground,
    controls: {
      orientation: selectControl({
        label: "Orientation",
        options: ["vertical", "horizontal", "responsive"],
        defaultValue: "vertical",
      }),
      showDescription: booleanControl({
        label: "Description",
        defaultValue: true,
        codeRole: "none",
      }),
      showError: booleanControl({
        label: "Error",
        defaultValue: false,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "orientations",
      title: "Orientations",
      component: FieldOrientations,
      layout: "stretch",
      sourceModule: "field",
      sourceExport: "FieldOrientations",
    },
    {
      id: "errors",
      title: "Errors",
      component: FieldWithErrors,
      layout: "stretch",
      sourceModule: "field",
      sourceExport: "FieldWithErrors",
    },
    {
      id: "fieldset",
      title: "Fieldset and legend",
      component: FieldSets,
      layout: "stretch",
      sourceModule: "field",
      sourceExport: "FieldSets",
    },
    {
      id: "full-form",
      title: "A complete form",
      component: FieldFullForm,
      layout: "stretch",
      sourceModule: "field",
      sourceExport: "FieldFullForm",
    },
  ],
}

const inputEntry: ComponentEntry = {
  id: "input",
  name: "Input",
  category: "Forms",
  description:
    "A single-line text field. Styling keys off the native disabled attribute and aria-invalid rather than extra props.",
  sourcePath: "src/components/ui/input.tsx",
  importStatement: 'import { Input } from "@/components/ui/input"',
  exports: ["Input"],
  keywords: ["text", "field", "form", "email", "password", "search"],
  notes: [
    'There is no invalid prop — set aria-invalid="true" and the styles follow.',
    "Font size is 16px below the md breakpoint to stop iOS zooming on focus.",
  ],
  playground: definePlayground({
    tag: "Input",
    component: InputPlayground,
    controls: {
      type: selectControl({
        label: "Type",
        options: ["text", "email", "password", "number", "search", "file"],
        defaultValue: "text",
      }),
      placeholder: textControl({
        label: "Placeholder",
        defaultValue: "name@example.com",
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
      invalid: booleanControl({
        label: "Invalid",
        defaultValue: false,
        propName: "aria-invalid",
      }),
    },
  }),
  stories: [
    {
      id: "types",
      title: "Types",
      component: InputTypes,
      layout: "stretch",
      sourceModule: "input",
      sourceExport: "InputTypes",
    },
    {
      id: "states",
      title: "States",
      component: InputStates,
      layout: "stretch",
      sourceModule: "input",
      sourceExport: "InputStates",
    },
    {
      id: "file",
      title: "File input",
      component: InputFile,
      layout: "stretch",
      sourceModule: "input",
      sourceExport: "InputFile",
    },
  ],
}

const inputGroupEntry: ComponentEntry = {
  id: "input-group",
  name: "Input Group",
  category: "Forms",
  description:
    "Wraps an input or textarea with addons on any of its four sides — icons, prefixes, units or inline buttons.",
  sourcePath: "src/components/ui/input-group.tsx",
  importStatement:
    'import {\n  InputGroup,\n  InputGroupAddon,\n  InputGroupButton,\n  InputGroupInput,\n  InputGroupText,\n} from "@/components/ui/input-group"',
  exports: [
    "InputGroup",
    "InputGroupAddon",
    "InputGroupButton",
    "InputGroupText",
    "InputGroupInput",
    "InputGroupTextarea",
  ],
  keywords: ["prefix", "suffix", "addon", "icon input", "affix"],
  notes: [
    "Use InputGroupInput and InputGroupTextarea inside the group, not the plain Input and Textarea.",
    "block-start and block-end addons stack above and below the control — handy for a send button under a textarea.",
  ],
  playground: definePlayground({
    tag: "InputGroupAddon",
    layout: "stretch",
    component: InputGroupPlayground,
    controls: {
      align: selectControl({
        label: "Addon align",
        options: ["inline-start", "inline-end", "block-start", "block-end"],
        defaultValue: "inline-start",
      }),
      showButton: booleanControl({
        label: "Include a button",
        defaultValue: false,
        codeRole: "none",
      }),
    },
  }),
  stories: [
    {
      id: "alignments",
      title: "Addon alignment",
      component: InputGroupAlignments,
      layout: "stretch",
      sourceModule: "input-group",
      sourceExport: "InputGroupAlignments",
    },
    {
      id: "with-text",
      title: "Text and icon addons",
      component: InputGroupWithText,
      layout: "stretch",
      sourceModule: "input-group",
      sourceExport: "InputGroupWithText",
    },
    {
      id: "textarea",
      title: "With a textarea",
      component: InputGroupWithTextarea,
      layout: "stretch",
      sourceModule: "input-group",
      sourceExport: "InputGroupWithTextarea",
    },
    {
      id: "button-sizes",
      title: "Button sizes",
      component: InputGroupButtonSizes,
      layout: "stretch",
      sourceModule: "input-group",
      sourceExport: "InputGroupButtonSizes",
    },
  ],
}

const inputOtpEntry: ComponentEntry = {
  id: "input-otp",
  name: "Input OTP",
  category: "Forms",
  description:
    "A one-time-code field rendered as individual slots, with a simulated caret and full paste support.",
  sourcePath: "src/components/ui/input-otp.tsx",
  importStatement:
    'import {\n  InputOTP,\n  InputOTPGroup,\n  InputOTPSeparator,\n  InputOTPSlot,\n} from "@/components/ui/input-otp"',
  exports: ["InputOTP", "InputOTPGroup", "InputOTPSlot", "InputOTPSeparator"],
  externalDeps: ["input-otp"],
  keywords: ["otp", "2fa", "code", "verification", "pin"],
  notes: [
    "maxLength must match the number of InputOTPSlot children you render.",
    "Each slot needs its index — the component reads the character at that position.",
  ],
  playground: definePlayground({
    tag: "InputOTP",
    component: InputOTPPlayground,
    controls: {
      length: numberControl({
        label: "Length",
        defaultValue: 6,
        min: 4,
        max: 8,
        step: 1,
        propName: "maxLength",
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: InputOTPBasic,
      sourceModule: "input-otp",
      sourceExport: "InputOTPBasic",
    },
    {
      id: "separator",
      title: "With a separator",
      component: InputOTPWithSeparator,
      sourceModule: "input-otp",
      sourceExport: "InputOTPWithSeparator",
    },
    {
      id: "on-complete",
      title: "Reacting to completion",
      component: InputOTPOnComplete,
      sourceModule: "input-otp",
      sourceExport: "InputOTPOnComplete",
    },
    {
      id: "disabled",
      title: "Disabled",
      component: InputOTPDisabled,
      sourceModule: "input-otp",
      sourceExport: "InputOTPDisabled",
    },
  ],
}

const labelEntry: ComponentEntry = {
  id: "label",
  name: "Label",
  category: "Forms",
  description:
    "A form label that also works as a wrapper — put a control inside it and the whole row becomes the hit target.",
  sourcePath: "src/components/ui/label.tsx",
  importStatement: 'import { Label } from "@/components/ui/label"',
  exports: ["Label"],
  keywords: ["caption", "form", "accessibility", "htmlFor"],
  notes: [
    "It is display:flex with a gap, so wrapping a Checkbox or Switch needs no extra layout.",
    "peer-disabled and group-data-[disabled] rules dim it automatically next to a disabled control.",
  ],
  playground: definePlayground({
    tag: "Label",
    component: LabelPlayground,
    controls: {
      children: textControl({
        label: "Text",
        defaultValue: "Email address",
        codeRole: "children",
      }),
    },
  }),
  stories: [
    {
      id: "with-input",
      title: "With an input",
      component: LabelWithInput,
      sourceModule: "label",
      sourceExport: "LabelWithInput",
    },
    {
      id: "wrapping",
      title: "Wrapping a control",
      component: LabelWithCheckbox,
      sourceModule: "label",
      sourceExport: "LabelWithCheckbox",
    },
    {
      id: "disabled",
      title: "Disabled states",
      component: LabelDisabled,
      layout: "stack",
      sourceModule: "label",
      sourceExport: "LabelDisabled",
    },
  ],
}

const nativeSelectEntry: ComponentEntry = {
  id: "native-select",
  name: "Native Select",
  category: "Forms",
  description:
    "A styled native <select>. Cheaper than Select and keyboard-native — the right default unless you need custom option markup.",
  sourcePath: "src/components/ui/native-select.tsx",
  importStatement:
    'import {\n  NativeSelect,\n  NativeSelectOptGroup,\n  NativeSelectOption,\n} from "@/components/ui/native-select"',
  exports: ["NativeSelect", "NativeSelectOptGroup", "NativeSelectOption"],
  keywords: ["dropdown", "option", "optgroup", "picker"],
  notes: [
    "The native size attribute is omitted from the props so size can mean the visual scale.",
    "On mobile this opens the platform picker, which is often what you want.",
  ],
  playground: definePlayground({
    tag: "NativeSelect",
    component: NativeSelectPlayground,
    controls: {
      size: selectControl({
        label: "Size",
        options: ["sm", "default"],
        defaultValue: "default",
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
      invalid: booleanControl({
        label: "Invalid",
        defaultValue: false,
        propName: "aria-invalid",
      }),
    },
  }),
  stories: [
    {
      id: "sizes",
      title: "Sizes",
      component: NativeSelectSizes,
      layout: "stack",
      sourceModule: "native-select",
      sourceExport: "NativeSelectSizes",
    },
    {
      id: "grouped",
      title: "Grouped options",
      component: NativeSelectGrouped,
      sourceModule: "native-select",
      sourceExport: "NativeSelectGrouped",
    },
    {
      id: "states",
      title: "States",
      component: NativeSelectStates,
      layout: "stack",
      sourceModule: "native-select",
      sourceExport: "NativeSelectStates",
    },
  ],
}

const radioGroupEntry: ComponentEntry = {
  id: "radio-group",
  name: "Radio Group",
  category: "Forms",
  description:
    "A set of mutually exclusive options with roving focus — arrow keys move between items, not Tab.",
  sourcePath: "src/components/ui/radio-group.tsx",
  importStatement:
    'import {\n  RadioGroup,\n  RadioGroupItem,\n} from "@/components/ui/radio-group"',
  exports: ["RadioGroup", "RadioGroupItem"],
  keywords: ["radio", "option", "single select", "choice"],
  notes: [
    "The group renders vertically by default; add flex utilities for a row.",
    "disabled works on the group or on an individual item.",
  ],
  playground: definePlayground({
    tag: "RadioGroup",
    layout: "stretch",
    component: RadioGroupPlayground,
    controls: {
      orientation: selectControl({
        label: "Layout",
        options: ["vertical", "horizontal"],
        defaultValue: "vertical",
        codeRole: "none",
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "With descriptions",
      component: RadioGroupBasic,
      layout: "stack",
      sourceModule: "radio-group",
      sourceExport: "RadioGroupBasic",
    },
    {
      id: "horizontal",
      title: "Horizontal",
      component: RadioGroupHorizontal,
      sourceModule: "radio-group",
      sourceExport: "RadioGroupHorizontal",
    },
    {
      id: "disabled",
      title: "Disabled",
      component: RadioGroupDisabled,
      layout: "stack",
      sourceModule: "radio-group",
      sourceExport: "RadioGroupDisabled",
    },
  ],
}

const selectEntry: ComponentEntry = {
  id: "select",
  name: "Select",
  category: "Forms",
  description:
    "A custom dropdown for when options need rich markup. The popup aligns its selected item with the trigger by default.",
  sourcePath: "src/components/ui/select.tsx",
  importStatement:
    'import {\n  Select,\n  SelectContent,\n  SelectItem,\n  SelectTrigger,\n  SelectValue,\n} from "@/components/ui/select"',
  exports: [
    "Select",
    "SelectContent",
    "SelectGroup",
    "SelectItem",
    "SelectLabel",
    "SelectScrollDownButton",
    "SelectScrollUpButton",
    "SelectSeparator",
    "SelectTrigger",
    "SelectValue",
  ],
  keywords: ["dropdown", "picker", "listbox", "options"],
  notes: [
    "alignItemWithTrigger defaults to true, so the popup opens over the trigger with the current value in place.",
    "If you only need plain text options, NativeSelect is lighter and works better on mobile.",
  ],
  playground: definePlayground({
    tag: "SelectTrigger",
    component: SelectPlayground,
    controls: {
      size: selectControl({
        label: "Trigger size",
        options: ["sm", "default"],
        defaultValue: "default",
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
      invalid: booleanControl({
        label: "Invalid",
        defaultValue: false,
        propName: "aria-invalid",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: SelectBasic,
      sourceModule: "select",
      sourceExport: "SelectBasic",
    },
    {
      id: "grouped",
      title: "Groups, labels and separators",
      component: SelectGrouped,
      sourceModule: "select",
      sourceExport: "SelectGrouped",
    },
    {
      id: "sizes",
      title: "Trigger sizes",
      component: SelectSizes,
      layout: "stack",
      sourceModule: "select",
      sourceExport: "SelectSizes",
    },
    {
      id: "states",
      title: "States",
      component: SelectStates,
      layout: "stack",
      sourceModule: "select",
      sourceExport: "SelectStates",
    },
  ],
}

const sliderEntry: ComponentEntry = {
  id: "slider",
  name: "Slider",
  category: "Forms",
  description:
    "A range input. Pass a number for one thumb or an array for a range — the thumb count follows the value's shape.",
  sourcePath: "src/components/ui/slider.tsx",
  importStatement: 'import { Slider } from "@/components/ui/slider"',
  exports: ["Slider"],
  keywords: ["range", "track", "thumb", "volume", "min", "max"],
  notes: [
    'thumbAlignment is fixed to "edge", so thumbs stay inside the track at both ends.',
    "onValueChange receives a number or an array, matching whatever you passed in.",
  ],
  playground: definePlayground({
    tag: "Slider",
    layout: "stretch",
    component: SliderPlayground,
    controls: {
      min: numberControl({ label: "Min", defaultValue: 0, min: 0, max: 50 }),
      max: numberControl({
        label: "Max",
        defaultValue: 100,
        min: 60,
        max: 200,
      }),
      step: numberControl({ label: "Step", defaultValue: 1, min: 1, max: 25 }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Single value",
      component: SliderBasic,
      sourceModule: "slider",
      sourceExport: "SliderBasic",
    },
    {
      id: "range",
      title: "Range",
      component: SliderRange,
      sourceModule: "slider",
      sourceExport: "SliderRange",
    },
    {
      id: "steps",
      title: "Steps",
      component: SliderSteps,
      layout: "stack",
      sourceModule: "slider",
      sourceExport: "SliderSteps",
    },
    {
      id: "disabled",
      title: "Disabled",
      component: SliderDisabled,
      sourceModule: "slider",
      sourceExport: "SliderDisabled",
    },
  ],
}

const switchEntry: ComponentEntry = {
  id: "switch",
  name: "Switch",
  category: "Forms",
  description:
    "An on/off toggle for settings that apply immediately. Use a Checkbox instead when the change needs a submit.",
  sourcePath: "src/components/ui/switch.tsx",
  importStatement: 'import { Switch } from "@/components/ui/switch"',
  exports: ["Switch"],
  keywords: ["toggle", "on", "off", "setting", "boolean"],
  notes: [
    "An invisible inset hit area extends past the visible track, so the small size is still easy to tap.",
  ],
  playground: definePlayground({
    tag: "Switch",
    component: SwitchPlayground,
    controls: {
      size: selectControl({
        label: "Size",
        options: ["sm", "default"],
        defaultValue: "default",
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
      invalid: booleanControl({
        label: "Invalid",
        defaultValue: false,
        propName: "aria-invalid",
      }),
    },
  }),
  stories: [
    {
      id: "sizes",
      title: "Sizes",
      component: SwitchSizes,
      layout: "stack",
      sourceModule: "switch",
      sourceExport: "SwitchSizes",
    },
    {
      id: "states",
      title: "States",
      component: SwitchStates,
      layout: "stack",
      sourceModule: "switch",
      sourceExport: "SwitchStates",
    },
    {
      id: "settings",
      title: "In a settings list",
      component: SwitchInSettings,
      sourceModule: "switch",
      sourceExport: "SwitchInSettings",
    },
  ],
}

const textareaEntry: ComponentEntry = {
  id: "textarea",
  name: "Textarea",
  category: "Forms",
  description:
    "A multi-line text field that grows with its content using the CSS field-sizing property — no resize observer needed.",
  sourcePath: "src/components/ui/textarea.tsx",
  importStatement: 'import { Textarea } from "@/components/ui/textarea"',
  exports: ["Textarea"],
  keywords: ["multiline", "comment", "message", "description", "form"],
  notes: [
    "field-sizing-content means rows acts as a minimum rather than a fixed height.",
  ],
  playground: definePlayground({
    tag: "Textarea",
    component: TextareaPlayground,
    controls: {
      placeholder: textControl({
        label: "Placeholder",
        defaultValue: "Type your message here.",
      }),
      rows: numberControl({ label: "Rows", defaultValue: 3, min: 1, max: 10 }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
      invalid: booleanControl({
        label: "Invalid",
        defaultValue: false,
        propName: "aria-invalid",
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: TextareaBasic,
      sourceModule: "textarea",
      sourceExport: "TextareaBasic",
    },
    {
      id: "states",
      title: "States",
      component: TextareaStates,
      layout: "stretch",
      sourceModule: "textarea",
      sourceExport: "TextareaStates",
    },
    {
      id: "auto-grow",
      title: "Auto-growing",
      component: TextareaAutoGrow,
      sourceModule: "textarea",
      sourceExport: "TextareaAutoGrow",
    },
  ],
}

export const formsEntries: readonly ComponentEntry[] = [
  inputEntry,
  textareaEntry,
  labelEntry,
  fieldEntry,
  inputGroupEntry,
  inputOtpEntry,
  nativeSelectEntry,
  selectEntry,
  comboboxEntry,
  checkboxEntry,
  radioGroupEntry,
  switchEntry,
  sliderEntry,
  calendarEntry,
]
