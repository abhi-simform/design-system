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
  AlphaSliderBasic,
  AlphaSliderDisabled,
  AlphaSliderPlayground,
  AlphaSliderSizes,
  AlphaSliderWithHue,
} from "@/showcase/demos/alpha-slider"
import {
  AngleSliderBasic,
  AngleSliderDisabled,
  AngleSliderFormatLabel,
  AngleSliderMarks,
  AngleSliderPlayground,
} from "@/showcase/demos/angle-slider"
import {
  AutocompleteBasic,
  AutocompleteControlled,
  AutocompleteCustomOption,
  AutocompleteGrouped,
  AutocompleteLimit,
  AutocompletePlayground,
} from "@/showcase/demos/autocomplete"
import {
  CascaderBasic,
  CascaderChangeOnSelect,
  CascaderControlled,
  CascaderFlatList,
  CascaderHover,
  CascaderMaxLevels,
  CascaderPlayground,
  CascaderSearchable,
} from "@/showcase/demos/cascader"
import {
  CheckboxGroup,
  CheckboxPlayground,
  CheckboxStates,
} from "@/showcase/demos/checkbox"
import {
  ColorInputBasic,
  ColorInputControlled,
  ColorInputFormats,
  ColorInputPlayground,
  ColorInputSizes,
  ColorInputSwatchesOnly,
} from "@/showcase/demos/color-input"
import {
  ColorPickerBasic,
  ColorPickerControlled,
  ColorPickerFormats,
  ColorPickerPlayground,
  ColorPickerSizes,
  ColorPickerSwatches,
} from "@/showcase/demos/color-picker"
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
  HueSliderBasic,
  HueSliderDisabled,
  HueSliderPlayground,
  HueSliderSizes,
} from "@/showcase/demos/hue-slider"
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
  MultiSelectBasic,
  MultiSelectGrouped,
  MultiSelectHidePickedOptions,
  MultiSelectMaxValues,
  MultiSelectPlayground,
} from "@/showcase/demos/multi-select"
import {
  NativeSelectGrouped,
  NativeSelectPlayground,
  NativeSelectSizes,
  NativeSelectStates,
} from "@/showcase/demos/native-select"
import {
  PillBasic,
  PillDisabled,
  PillPlayground,
  PillRemovable,
  PillSizes,
} from "@/showcase/demos/pill"
import {
  PillsInputBasic,
  PillsInputPlayground,
  PillsInputStates,
  PillsInputWithLabel,
} from "@/showcase/demos/pills-input"
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
  TagsInputBasic,
  TagsInputMaxTags,
  TagsInputPlayground,
  TagsInputSplitChars,
  TagsInputWithSuggestions,
} from "@/showcase/demos/tags-input"
import {
  TextareaAutoGrow,
  TextareaBasic,
  TextareaPlayground,
  TextareaStates,
} from "@/showcase/demos/textarea"
import {
  ChipAutoContrast,
  ChipColors,
  ChipControlled,
  ChipCustomIcon,
  ChipDisabled,
  ChipGroupMultiple,
  ChipGroupSingle,
  ChipGroupUncontrolled,
  ChipPlayground,
  ChipRadii,
  ChipSizes,
  ChipVariants,
} from "@/showcase/demos/chip"
import {
  FieldsetDisabled,
  FieldsetPlayground,
  FieldsetRadii,
  FieldsetVariants,
  FieldsetWithCheckboxes,
} from "@/showcase/demos/fieldset"
import {
  FileInputBasic,
  FileInputClearModes,
  FileInputControlled,
  FileInputMultiple,
  FileInputPlayground,
  FileInputSections,
  FileInputStates,
  FileInputValueComponent,
} from "@/showcase/demos/file-input"
import {
  NumberInputBasic,
  NumberInputBigInt,
  NumberInputClamping,
  NumberInputControlled,
  NumberInputCurrency,
  NumberInputExternalHandlers,
  NumberInputHoldToStep,
  NumberInputPlayground,
  NumberInputSections,
  NumberInputSeparators,
  NumberInputSizes,
} from "@/showcase/demos/number-input"
import {
  PasswordInputBasic,
  PasswordInputControlled,
  PasswordInputCustomIcon,
  PasswordInputDefaultVisible,
  PasswordInputFocusable,
  PasswordInputPlayground,
  PasswordInputSizes,
  PasswordInputStates,
} from "@/showcase/demos/password-input"
import {
  RatingAllowClear,
  RatingControlled,
  RatingCustomSymbols,
  RatingFractions,
  RatingHighlightSelectedOnly,
  RatingPlayground,
  RatingReadOnly,
  RatingSizesAndColors,
} from "@/showcase/demos/rating"
import {
  JsonInputAutosize,
  JsonInputControlled,
  JsonInputCustomSerializer,
  JsonInputErrorStates,
  JsonInputFormatOnBlur,
  JsonInputPlayground,
  JsonInputValidation,
} from "@/showcase/demos/json-input"
import {
  MaskInputBasic,
  MaskInputCallbacks,
  MaskInputDynamic,
  MaskInputOptionalSegment,
  MaskInputPlayground,
  MaskInputRegexArray,
  MaskInputSizes,
  MaskInputTokens,
} from "@/showcase/demos/mask-input"

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

const autocompleteEntry: ComponentEntry = {
  id: "autocomplete",
  name: "Autocomplete",
  category: "Forms",
  description:
    "A free-text input with a filtered suggestion dropdown, built on Combobox and InputGroup — the value is whatever the user types, and choosing an option fills the input with its label.",
  sourcePath: "src/components/ui/autocomplete.tsx",
  importStatement:
    'import { Autocomplete } from "@/components/ui/autocomplete"',
  exports: ["Autocomplete"],
  keywords: ["autocomplete", "typeahead", "suggestions", "combobox", "search"],
  notes: [
    "data accepts plain strings, { value, label, disabled } objects, and { group, items } groups in any mix — matching Mantine's original ComboboxData shape. Unlike Select, the value is free text, not an option value.",
    "The dropdown is hidden whenever no option matches the current input.",
    "Skipped from Mantine's original: classNames/styles/unstyled/vars and style-shorthand props, the built-in label/description/error wrapper (compose with Label or Field), size, comboboxProps, scrollAreaProps, withScrollArea, maxDropdownHeight, floatingHeight, clearSectionMode, clearButtonProps, and selectFirstOptionOnDropdownOpen.",
    "Pass a custom filter to override matching; it receives the normalized options, the search string and limit, and must return entries in the same item/group shape.",
  ],
  playground: definePlayground({
    tag: "Autocomplete",
    layout: "stretch",
    component: AutocompletePlayground,
    controls: {
      clearable: booleanControl({ label: "Clearable", defaultValue: true }),
      openOnFocus: booleanControl({
        label: "Open on focus",
        defaultValue: true,
      }),
      autoSelectOnBlur: booleanControl({
        label: "Auto select on blur",
        defaultValue: false,
      }),
      selectFirstOptionOnChange: booleanControl({
        label: "Select first option on change",
        defaultValue: false,
      }),
      limit: numberControl({
        label: "Limit",
        defaultValue: 7,
        min: 1,
        max: 7,
        step: 1,
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: AutocompleteBasic,
      layout: "stretch",
      sourceModule: "autocomplete",
      sourceExport: "AutocompleteBasic",
    },
    {
      id: "grouped",
      title: "Grouped data",
      description:
        "Options can mix plain strings, { value, label } objects, a disabled option, and { group, items } groups.",
      component: AutocompleteGrouped,
      layout: "stretch",
      sourceModule: "autocomplete",
      sourceExport: "AutocompleteGrouped",
    },
    {
      id: "limit",
      title: "Limit",
      description: "Only the first N matching options are shown.",
      component: AutocompleteLimit,
      layout: "stretch",
      sourceModule: "autocomplete",
      sourceExport: "AutocompleteLimit",
    },
    {
      id: "custom-option",
      title: "Custom option",
      description: "renderOption customizes each option's content.",
      component: AutocompleteCustomOption,
      layout: "stretch",
      sourceModule: "autocomplete",
      sourceExport: "AutocompleteCustomOption",
    },
    {
      id: "controlled",
      title: "Controlled",
      description:
        "Controlled value with onOptionSubmit, autoSelectOnBlur, selectFirstOptionOnChange and a left section.",
      component: AutocompleteControlled,
      layout: "stretch",
      sourceModule: "autocomplete",
      sourceExport: "AutocompleteControlled",
    },
  ],
}

const cascaderEntry: ComponentEntry = {
  id: "cascader",
  name: "Cascader",
  category: "Forms",
  description:
    "A select for hierarchical data. Options open into cascading columns; the value is the full path from root to the chosen node.",
  sourcePath: "src/components/ui/cascader.tsx",
  importStatement: 'import { Cascader } from "@/components/ui/cascader"',
  exports: ["Cascader"],
  keywords: ["cascader", "cascading", "tree", "select", "hierarchy", "nested"],
  notes: [
    "value is a string[] path (root to node) or null; onChange also receives the resolved option chain. Option values must be unique across the whole tree.",
    "Keyboard: Arrow Up/Down move within a column, Right expands, Left collapses, Enter selects/expands, Escape closes.",
    "Searching (or withColumns=false) swaps the columns for a flat list of full paths.",
    "Skipped from Mantine's original: classNames/styles/unstyled/vars and style-shorthand props, the label/description/error wrapper (compose with Label or Field), size/variant, comboboxProps, scrollAreaProps, chevronColor, hiddenInputProps, clearSectionMode/clearButtonProps, and safeAreaPolygon (hover expansion resets on mouse leave without the safe-area polygon).",
  ],
  playground: definePlayground({
    tag: "Cascader",
    layout: "stretch",
    component: CascaderPlayground,
    controls: {
      changeOnSelect: booleanControl({
        label: "Change on select",
        defaultValue: false,
      }),
      expandTrigger: selectControl({
        label: "Expand trigger",
        options: ["click", "hover"],
        defaultValue: "click",
      }),
      allowDeselect: booleanControl({
        label: "Allow deselect",
        defaultValue: true,
      }),
      withCheckIcon: booleanControl({
        label: "With check icon",
        defaultValue: true,
      }),
      checkIconPosition: selectControl({
        label: "Check icon position",
        options: ["left", "right"],
        defaultValue: "right",
      }),
      withColumns: booleanControl({
        label: "With columns",
        defaultValue: true,
      }),
      searchable: booleanControl({ label: "Searchable", defaultValue: false }),
      clearable: booleanControl({ label: "Clearable", defaultValue: true }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      description: "Only leaf options can be selected.",
      component: CascaderBasic,
      layout: "stretch",
      sourceModule: "cascader",
      sourceExport: "CascaderBasic",
    },
    {
      id: "change-on-select",
      title: "Change on select",
      description: "Intermediate options can be selected too.",
      component: CascaderChangeOnSelect,
      layout: "stretch",
      sourceModule: "cascader",
      sourceExport: "CascaderChangeOnSelect",
    },
    {
      id: "hover",
      title: "Expand on hover",
      description:
        'expandTrigger="hover" opens the next column on pointer enter; columnWidth fixes the column width.',
      component: CascaderHover,
      layout: "stretch",
      sourceModule: "cascader",
      sourceExport: "CascaderHover",
    },
    {
      id: "searchable",
      title: "Searchable",
      description:
        "Typing filters the flattened paths; a custom separator and left section are shown.",
      component: CascaderSearchable,
      layout: "stretch",
      sourceModule: "cascader",
      sourceExport: "CascaderSearchable",
    },
    {
      id: "flat",
      title: "Flat list",
      description: "withColumns=false renders every path as a single list row.",
      component: CascaderFlatList,
      layout: "stretch",
      sourceModule: "cascader",
      sourceExport: "CascaderFlatList",
    },
    {
      id: "max-levels",
      title: "Max displayed levels",
      description:
        "Deeper levels page in; use the edge buttons to reveal hidden columns.",
      component: CascaderMaxLevels,
      layout: "stretch",
      sourceModule: "cascader",
      sourceExport: "CascaderMaxLevels",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Controlled value with a custom formatValue.",
      component: CascaderControlled,
      layout: "stretch",
      sourceModule: "cascader",
      sourceExport: "CascaderControlled",
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
    "For a fully custom multi-select, use ComboboxChips with useComboboxAnchor so the popup anchors to the chip field rather than the input. For the common case, prefer the ready-made MultiSelect, which composes Combobox, PillsInput and Pill for you.",
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

const hueSliderEntry: ComponentEntry = {
  id: "hue-slider",
  name: "Hue Slider",
  category: "Forms",
  description:
    "A single-thumb slider over a 0-360 hue gradient, for picking a color's hue in a custom color picker.",
  sourcePath: "src/components/ui/hue-slider.tsx",
  importStatement: 'import { HueSlider } from "@/components/ui/hue-slider"',
  exports: ["HueSlider"],
  keywords: ["color", "hue", "hsl", "gradient", "picker", "range"],
  notes: [
    "Unlike Mantine's original (which this was ported from), value is controlled or uncontrolled via value/defaultValue, changes report through onValueChange/onValueCommitted, and disabled/name (with a hidden range input for forms) all come from the shared Slider primitive for free.",
    "min/max are fixed at 0/360 and orientation is fixed horizontal — this is a hue slider, not a general-purpose Slider.",
    "The thumb's fill color previews the currently selected hue live, in both controlled and uncontrolled use.",
  ],
  playground: definePlayground({
    tag: "HueSlider",
    layout: "stretch",
    component: HueSliderPlayground,
    controls: {
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: HueSliderBasic,
      sourceModule: "hue-slider",
      sourceExport: "HueSliderBasic",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: HueSliderSizes,
      layout: "stack",
      sourceModule: "hue-slider",
      sourceExport: "HueSliderSizes",
    },
    {
      id: "disabled",
      title: "Disabled",
      component: HueSliderDisabled,
      sourceModule: "hue-slider",
      sourceExport: "HueSliderDisabled",
    },
  ],
}

const alphaSliderEntry: ComponentEntry = {
  id: "alpha-slider",
  name: "Alpha Slider",
  category: "Forms",
  description:
    "A single-thumb slider over a checkered-to-opaque gradient of a given color, for picking that color's alpha (transparency) in a custom color picker.",
  sourcePath: "src/components/ui/alpha-slider.tsx",
  importStatement: 'import { AlphaSlider } from "@/components/ui/alpha-slider"',
  exports: ["AlphaSlider"],
  keywords: [
    "color",
    "alpha",
    "opacity",
    "transparency",
    "gradient",
    "picker",
    "range",
  ],
  notes: [
    "Unlike Mantine's original (which this was ported from), value is controlled or uncontrolled via value/defaultValue, changes report through onValueChange/onValueCommitted, and disabled/name (with a hidden range input for forms) all come from the shared Slider primitive for free — full keyboard support (arrows, Home/End, Page Up/Down) and RTL come from the same primitive, where Mantine's original only handled arrow keys and wasn't RTL-aware.",
    "min/max are fixed at 0/1 and orientation is fixed horizontal — this is an alpha slider, not a general-purpose Slider. step/largeStep default to 0.01/0.1 so the 0-1 range snaps sensibly; Mantine's original instead let the drag value float freely and rounded to 2 decimals only when reporting it.",
    "color is the opaque color used as the gradient's endpoint — the thumb itself has no fill color, matching Mantine's original.",
  ],
  playground: definePlayground({
    tag: "AlphaSlider",
    layout: "stretch",
    component: AlphaSliderPlayground,
    controls: {
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: AlphaSliderBasic,
      sourceModule: "alpha-slider",
      sourceExport: "AlphaSliderBasic",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: AlphaSliderSizes,
      layout: "stack",
      sourceModule: "alpha-slider",
      sourceExport: "AlphaSliderSizes",
    },
    {
      id: "disabled",
      title: "Disabled",
      component: AlphaSliderDisabled,
      sourceModule: "alpha-slider",
      sourceExport: "AlphaSliderDisabled",
    },
    {
      id: "with-hue",
      title: "With Hue Slider",
      component: AlphaSliderWithHue,
      sourceModule: "alpha-slider",
      sourceExport: "AlphaSliderWithHue",
    },
  ],
}

const angleSliderEntry: ComponentEntry = {
  id: "angle-slider",
  name: "Angle Slider",
  category: "Forms",
  description:
    "A circular slider for picking an angle between 0 and 359 degrees by dragging around the ring or using arrow keys.",
  sourcePath: "src/components/ui/angle-slider.tsx",
  importStatement: 'import { AngleSlider } from "@/components/ui/angle-slider"',
  exports: ["AngleSlider"],
  keywords: [
    "angle",
    "circular",
    "radial",
    "rotation",
    "degrees",
    "dial",
    "direction",
  ],
  notes: [
    "Unlike Mantine's original (which this was ported from), classNames/styles/unstyled/vars/mod have no equivalent here — style the root, marks, label, and thumb directly via className/style, using the angle-slider/-mark/-label/-thumb data-slot attributes as hooks.",
    "Also unlike Mantine's original, dragging and keyboard interaction are both blocked entirely while disabled — Mantine's version still attached pointer listeners and fired onScrubStart/onScrubEnd even when disabled, only skipping the value write itself.",
    "size and thumbSize stay raw pixel numbers (default 60 / size÷5), matching Mantine's own API, rather than the xs–xl size enum used by HueSlider/AlphaSlider — this is a widget with an arbitrary diameter, not a themed control.",
  ],
  playground: definePlayground({
    tag: "AngleSlider",
    component: AngleSliderPlayground,
    controls: {
      withLabel: booleanControl({ label: "With label", defaultValue: true }),
      restrictToMarks: booleanControl({
        label: "Restrict to marks",
        defaultValue: false,
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: AngleSliderBasic,
      sourceModule: "angle-slider",
      sourceExport: "AngleSliderBasic",
    },
    {
      id: "format-label",
      title: "Custom label format",
      component: AngleSliderFormatLabel,
      sourceModule: "angle-slider",
      sourceExport: "AngleSliderFormatLabel",
    },
    {
      id: "marks",
      title: "Marks",
      component: AngleSliderMarks,
      sourceModule: "angle-slider",
      sourceExport: "AngleSliderMarks",
    },
    {
      id: "disabled",
      title: "Disabled",
      component: AngleSliderDisabled,
      sourceModule: "angle-slider",
      sourceExport: "AngleSliderDisabled",
    },
  ],
}

const pillEntry: ComponentEntry = {
  id: "pill",
  name: "Pill",
  category: "Forms",
  description:
    "A removable or non-removable tag, for building a custom tags input or multi-select display like PillsInput.",
  sourcePath: "src/components/ui/pill.tsx",
  importStatement: 'import { Pill } from "@/components/ui/pill"',
  exports: ["Pill", "PillGroup"],
  keywords: ["tag", "chip", "token", "multi-select", "removable"],
  notes: [
    "Pill.Group provides size and disabled to every Pill inside it, so an individual Pill only needs its own size/disabled when it should differ from its group.",
    "withRemoveButton hides the remove control (rather than disabling it) once disabled is set, matching the native disabled attribute's semantics.",
    "Unlike Mantine's original, there's no radius prop or contrast variant tied to a filled input variant — this repo's Input has no such variant, so Pill always renders with a single rounded, muted-background style, matching how Badge here skips a radius prop too.",
  ],
  playground: definePlayground({
    tag: "Pill",
    component: PillPlayground,
    controls: {
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "sm",
      }),
      withRemoveButton: booleanControl({
        label: "Remove button",
        defaultValue: false,
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: PillBasic,
      sourceModule: "pill",
      sourceExport: "PillBasic",
    },
    {
      id: "removable",
      title: "Removable",
      component: PillRemovable,
      sourceModule: "pill",
      sourceExport: "PillRemovable",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: PillSizes,
      layout: "stack",
      sourceModule: "pill",
      sourceExport: "PillSizes",
    },
    {
      id: "disabled",
      title: "Disabled",
      component: PillDisabled,
      sourceModule: "pill",
      sourceExport: "PillDisabled",
    },
  ],
}

const multiSelectEntry: ComponentEntry = {
  id: "multi-select",
  name: "Multi Select",
  category: "Forms",
  description:
    "A listbox-backed multi-select built on Combobox, PillsInput and Pill — selected options render as removable pills, with optional search, a max-values limit, and grouped data.",
  sourcePath: "src/components/ui/multi-select.tsx",
  importStatement: 'import { MultiSelect } from "@/components/ui/multi-select"',
  exports: ["MultiSelect"],
  keywords: [
    "multi-select",
    "multiselect",
    "tags input",
    "pills",
    "combobox",
    "select",
  ],
  notes: [
    "data accepts plain strings, { value, label, disabled } objects, and { group, items } groups in any mix — matching Mantine's original ComboboxData shape.",
    "Unlike this repo's other inputs, there's no label/description/error prop baked in — compose with Label or Field the same way the Combobox and PillsInput demos do.",
    "Skipped from Mantine's original: withPillsReorder (drag-to-reorder pills), renderOption/renderPill custom render callbacks, checkIconPosition/withAlignedLabels, and loading/loadingPosition — none of this repo's other inputs expose a loading state either.",
    "The check icon next to a selected option is always shown and always left-aligned, inherited from ComboboxItem rather than being a configurable prop.",
  ],
  playground: definePlayground({
    tag: "MultiSelect",
    layout: "stretch",
    component: MultiSelectPlayground,
    controls: {
      searchable: booleanControl({ label: "Searchable", defaultValue: true }),
      clearable: booleanControl({ label: "Clearable", defaultValue: true }),
      hidePickedOptions: booleanControl({
        label: "Hide picked options",
        defaultValue: false,
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: MultiSelectBasic,
      layout: "stretch",
      sourceModule: "multi-select",
      sourceExport: "MultiSelectBasic",
    },
    {
      id: "grouped",
      title: "Grouped data",
      description:
        "Options can mix plain strings, { value, label } objects, a disabled option, and { group, items } groups.",
      component: MultiSelectGrouped,
      layout: "stretch",
      sourceModule: "multi-select",
      sourceExport: "MultiSelectGrouped",
    },
    {
      id: "max-values",
      title: "Max values",
      description: "Selection stops once maxValues is reached.",
      component: MultiSelectMaxValues,
      layout: "stretch",
      sourceModule: "multi-select",
      sourceExport: "MultiSelectMaxValues",
    },
    {
      id: "hide-picked-options",
      title: "Hide picked options",
      description: "Selected options are removed from the dropdown list.",
      component: MultiSelectHidePickedOptions,
      layout: "stretch",
      sourceModule: "multi-select",
      sourceExport: "MultiSelectHidePickedOptions",
    },
  ],
}

const tagsInputEntry: ComponentEntry = {
  id: "tags-input",
  name: "Tags Input",
  category: "Forms",
  description:
    "A freeform tags input built on Combobox, PillsInput and Pill — typed text becomes a removable pill on Enter, comma, or paste, with optional suggestions, duplicate handling, and a max-tags limit.",
  sourcePath: "src/components/ui/tags-input.tsx",
  importStatement: 'import { TagsInput } from "@/components/ui/tags-input"',
  exports: ["TagsInput"],
  keywords: [
    "tags input",
    "tag",
    "chips",
    "pills",
    "combobox",
    "multi-select",
    "keywords",
  ],
  notes: [
    "data is optional and only supplies dropdown suggestions — unlike MultiSelect, values aren't constrained to it; any typed text can become a tag.",
    'splitChars (default [","]) also governs paste: pasted text is split into multiple tags the same way typed text is.',
    "Skipped from Mantine's original: withPillsReorder (drag-to-reorder pills) and renderOption/renderPill custom render callbacks — same scope MultiSelect stops at in this repo.",
    "Unlike this repo's other inputs, there's no label/description/error prop baked in — compose with Label or Field the same way the Combobox and PillsInput demos do.",
  ],
  playground: definePlayground({
    tag: "TagsInput",
    layout: "stretch",
    component: TagsInputPlayground,
    controls: {
      clearable: booleanControl({ label: "Clearable", defaultValue: true }),
      allowDuplicates: booleanControl({
        label: "Allow duplicates",
        defaultValue: false,
      }),
      acceptValueOnBlur: booleanControl({
        label: "Accept value on blur",
        defaultValue: true,
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: TagsInputBasic,
      layout: "stretch",
      sourceModule: "tags-input",
      sourceExport: "TagsInputBasic",
    },
    {
      id: "with-suggestions",
      title: "With suggestions",
      description:
        "data supplies dropdown suggestions, but any typed text can still become a tag.",
      component: TagsInputWithSuggestions,
      layout: "stretch",
      sourceModule: "tags-input",
      sourceExport: "TagsInputWithSuggestions",
    },
    {
      id: "max-tags",
      title: "Max tags",
      description: "Adding stops once maxTags is reached.",
      component: TagsInputMaxTags,
      layout: "stretch",
      sourceModule: "tags-input",
      sourceExport: "TagsInputMaxTags",
    },
    {
      id: "split-chars",
      title: "Split characters",
      description:
        "splitChars controls which typed or pasted characters split text into separate tags.",
      component: TagsInputSplitChars,
      layout: "stretch",
      sourceModule: "tags-input",
      sourceExport: "TagsInputSplitChars",
    },
  ],
}

const pillsInputEntry: ComponentEntry = {
  id: "pills-input",
  name: "Pills Input",
  category: "Forms",
  description:
    "Base component for custom tags inputs and multi-selects — a bordered, wrapping box that holds a Pill.Group plus a text field, with no built-in matching or listbox logic of its own.",
  sourcePath: "src/components/ui/pills-input.tsx",
  importStatement: 'import { PillsInput } from "@/components/ui/pills-input"',
  exports: ["PillsInput", "PillsInputField"],
  keywords: ["tags input", "multi-select", "chips", "pills", "combobox"],
  notes: [
    "Purely a layout shell: it renders no pills and does no matching itself — pair it with Pill.Group and your own add/remove logic, the same way Mantine's original expects a custom tags input or multi-select built on top of it.",
    "Clicking anywhere in the box (not just the field) focuses PillsInput.Field, so the whole bordered area reads as one control.",
    'PillsInput.Field\'s type prop controls when it is visible: "visible" (default) always shows it, "auto" hides it until focused, "hidden" keeps it off-screen for a fully custom trigger.',
    "Unlike Mantine's original, there's no label/description/error/size/loading props baked in — compose with this repo's own Field/FieldLabel/FieldError instead, the same as every other input here.",
    "For a ready-made listbox-backed multi-select, use MultiSelect — PillsInput is the lower-level building block it (and a fully custom tags input with no listbox) is built on.",
  ],
  playground: definePlayground({
    tag: "PillsInput",
    layout: "stretch",
    component: PillsInputPlayground,
    controls: {
      placeholder: textControl({
        label: "Placeholder",
        defaultValue: "Add a tag",
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: PillsInputBasic,
      layout: "stretch",
      sourceModule: "pills-input",
      sourceExport: "PillsInputBasic",
    },
    {
      id: "with-label",
      title: "With a label",
      component: PillsInputWithLabel,
      layout: "stretch",
      sourceModule: "pills-input",
      sourceExport: "PillsInputWithLabel",
    },
    {
      id: "states",
      title: "States",
      component: PillsInputStates,
      layout: "stretch",
      sourceModule: "pills-input",
      sourceExport: "PillsInputStates",
    },
  ],
}

const colorInputEntry: ComponentEntry = {
  id: "color-input",
  name: "Color Input",
  category: "Forms",
  description:
    "A text Input that opens a ColorPicker popover on focus — type a hex/rgb/hsl value directly, pick from swatches, or grab a color from the screen with the EyeDropper API.",
  sourcePath: "src/components/ui/color-input.tsx",
  importStatement: 'import { ColorInput } from "@/components/ui/color-input"',
  exports: ["ColorInput"],
  keywords: [
    "color",
    "input",
    "picker",
    "hex",
    "rgba",
    "hsla",
    "swatches",
    "eyedropper",
    "eye dropper",
  ],
  notes: [
    "The eye dropper button only renders when the browser supports the EyeDropper API (Chromium-based browsers) — it's simply omitted elsewhere, matching withEyeDropper's upstream default.",
    "fixOnBlur (default true) reverts the field to the last valid value when it loses focus, so a half-typed or invalid string never lingers as the committed value.",
    "Unlike Mantine's original, there's no label/description/error props baked in — compose with this repo's own Field/FieldLabel/FieldError instead, the same as every other input here.",
  ],
  playground: definePlayground({
    tag: "ColorInput",
    layout: "center",
    component: ColorInputPlayground,
    controls: {
      format: selectControl({
        label: "Format",
        options: ["hex", "hexa", "rgb", "rgba", "hsl", "hsla"],
        defaultValue: "hex",
      }),
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "sm",
      }),
      showSwatches: booleanControl({ label: "Swatches", defaultValue: false }),
      disallowInput: booleanControl({
        label: "Disallow typing",
        defaultValue: false,
      }),
      withEyeDropper: booleanControl({
        label: "Eye dropper",
        defaultValue: true,
      }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: ColorInputBasic,
      sourceModule: "color-input",
      sourceExport: "ColorInputBasic",
    },
    {
      id: "formats",
      title: "Formats",
      component: ColorInputFormats,
      layout: "stretch",
      sourceModule: "color-input",
      sourceExport: "ColorInputFormats",
    },
    {
      id: "swatches-only",
      title: "Swatches only",
      description:
        "disallowInput with withPicker and withEyeDropper off restricts selection to the swatch grid, closing on pick.",
      component: ColorInputSwatchesOnly,
      sourceModule: "color-input",
      sourceExport: "ColorInputSwatchesOnly",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: ColorInputSizes,
      layout: "stretch",
      sourceModule: "color-input",
      sourceExport: "ColorInputSizes",
    },
    {
      id: "controlled",
      title: "Controlled with onChangeEnd",
      component: ColorInputControlled,
      sourceModule: "color-input",
      sourceExport: "ColorInputControlled",
    },
  ],
}

const colorPickerEntry: ComponentEntry = {
  id: "color-picker",
  name: "Color Picker",
  category: "Forms",
  description:
    "A saturation/hue/alpha color picker composed from a drag-to-pick saturation area, HueSlider, AlphaSlider, and ColorSwatch, with an optional swatches list.",
  sourcePath: "src/components/ui/color-picker.tsx",
  importStatement: 'import { ColorPicker } from "@/components/ui/color-picker"',
  exports: ["ColorPicker"],
  keywords: [
    "color",
    "picker",
    "hex",
    "rgba",
    "hsla",
    "hsva",
    "saturation",
    "swatches",
  ],
  notes: [
    "Unlike Mantine's original (which this was ported from), there is no `focusable` prop — the saturation area and swatches are always keyboard-focusable, matching how this repo's HueSlider/AlphaSlider (built on Base UI's Slider) already work and can't be toggled off.",
    "format controls both the parsed/emitted string format (hex/hexa/rgb/rgba/hsl/hsla) and whether the alpha slider and preview swatch render — hexa, rgba, and hsla show them, hex, rgb, and hsl don't.",
    "value/defaultValue accept any valid hex, hexa, rgb, rgba, hsl, or hsla string regardless of the current `format` — parsing auto-detects which one was passed.",
  ],
  playground: definePlayground({
    tag: "ColorPicker",
    layout: "center",
    component: ColorPickerPlayground,
    controls: {
      format: selectControl({
        label: "Format",
        options: ["hex", "hexa", "rgb", "rgba", "hsl", "hsla"],
        defaultValue: "hex",
      }),
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      }),
      showSwatches: booleanControl({ label: "Swatches", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: ColorPickerBasic,
      sourceModule: "color-picker",
      sourceExport: "ColorPickerBasic",
    },
    {
      id: "formats",
      title: "Formats",
      component: ColorPickerFormats,
      layout: "stretch",
      sourceModule: "color-picker",
      sourceExport: "ColorPickerFormats",
    },
    {
      id: "swatches",
      title: "Swatches only",
      component: ColorPickerSwatches,
      sourceModule: "color-picker",
      sourceExport: "ColorPickerSwatches",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: ColorPickerSizes,
      layout: "stretch",
      sourceModule: "color-picker",
      sourceExport: "ColorPickerSizes",
    },
    {
      id: "controlled",
      title: "Controlled with onChangeEnd",
      component: ColorPickerControlled,
      sourceModule: "color-picker",
      sourceExport: "ColorPickerControlled",
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

const chipEntry: ComponentEntry = {
  id: "chip",
  name: "Chip",
  category: "Forms",
  description:
    "A toggleable pill built on a real checkbox or radio input. Use it on its own for a boolean, or inside Chip.Group for single or multiple selection.",
  sourcePath: "src/components/ui/chip.tsx",
  importStatement: 'import { Chip } from "@/components/ui/chip"',
  exports: ["Chip", "Chip.Group", "ChipGroup"],
  keywords: ["chip", "tag", "toggle", "filter", "checkbox", "radio", "pill"],
  notes: [
    "ref points at the hidden input, rootRef at the wrapper div, and className/style are applied to the wrapper. Remaining props go to the input.",
    "Inside Chip.Group the input type is forced by the group (checkbox when multiple, radio otherwise) and each chip needs a value.",
    "In a single-selection group a selected chip cannot be deselected by clicking it again, matching radio behavior.",
    "radius is a token scale (xs to xl) plus full; it defaults to fully rounded rather than a numeric or arbitrary CSS value. Use className for one-off radii.",
    "color accepts the design-system color tokens rather than arbitrary CSS colors; autoContrast switches the filled text to black on light hues.",
    "Skipped global styling props: classNames, styles, unstyled, vars, attributes, mod and style shorthand props (m, p, w, h, bg and so on). className and style cover the same ground.",
  ],
  playground: definePlayground({
    tag: "Chip",
    component: ChipPlayground,
    controls: {
      variant: selectControl({
        label: "Variant",
        options: ["filled", "light", "outline"],
        defaultValue: "filled",
      }),
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "sm",
      }),
      radius: selectControl({
        label: "Radius",
        options: ["xs", "sm", "md", "lg", "xl", "full"],
        defaultValue: "full",
      }),
      color: selectControl({
        label: "Color",
        options: [
          "primary",
          "secondary",
          "destructive",
          "blue",
          "green",
          "orange",
          "purple",
          "yellow",
          "lime",
        ],
        defaultValue: "primary",
      }),
      autoContrast: booleanControl({
        label: "Auto contrast",
        defaultValue: false,
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
      children: textControl({
        label: "Label",
        defaultValue: "Awesome chip",
        codeRole: "children",
      }),
    },
  }),
  stories: [
    {
      id: "controlled",
      title: "Controlled",
      description: "checked and onChange drive the state from the outside.",
      component: ChipControlled,
      sourceModule: "chip",
      sourceExport: "ChipControlled",
    },
    {
      id: "variants",
      title: "Variants",
      component: ChipVariants,
      sourceModule: "chip",
      sourceExport: "ChipVariants",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: ChipSizes,
      sourceModule: "chip",
      sourceExport: "ChipSizes",
    },
    {
      id: "radius",
      title: "Radius",
      component: ChipRadii,
      sourceModule: "chip",
      sourceExport: "ChipRadii",
    },
    {
      id: "colors",
      title: "Colors",
      description: "Every variant takes the same color tokens.",
      component: ChipColors,
      layout: "stretch",
      sourceModule: "chip",
      sourceExport: "ChipColors",
    },
    {
      id: "auto-contrast",
      title: "Auto contrast",
      description: "Light fills get dark text instead of white.",
      component: ChipAutoContrast,
      sourceModule: "chip",
      sourceExport: "ChipAutoContrast",
    },
    {
      id: "icon",
      title: "Custom and hidden icon",
      component: ChipCustomIcon,
      sourceModule: "chip",
      sourceExport: "ChipCustomIcon",
    },
    {
      id: "disabled",
      title: "Disabled",
      component: ChipDisabled,
      sourceModule: "chip",
      sourceExport: "ChipDisabled",
    },
    {
      id: "group-single",
      title: "Chip.Group, single selection",
      description: "Renders radio inputs and reports the selected value.",
      component: ChipGroupSingle,
      sourceModule: "chip",
      sourceExport: "ChipGroupSingle",
    },
    {
      id: "group-multiple",
      title: "Chip.Group, multiple selection",
      description: "Renders checkbox inputs and reports an array of values.",
      component: ChipGroupMultiple,
      sourceModule: "chip",
      sourceExport: "ChipGroupMultiple",
    },
    {
      id: "group-uncontrolled",
      title: "Chip.Group, uncontrolled",
      component: ChipGroupUncontrolled,
      sourceModule: "chip",
      sourceExport: "ChipGroupUncontrolled",
    },
  ],
}

const fieldsetEntry: ComponentEntry = {
  id: "fieldset",
  name: "Fieldset",
  category: "Forms",
  description:
    "Groups related form controls under a shared legend, built on the Base UI Fieldset. Supports default, filled and unstyled variants, a radius scale, and a disabled state that cascades to every control inside.",
  sourcePath: "src/components/ui/fieldset.tsx",
  importStatement: 'import { Fieldset } from "@/components/ui/fieldset"',
  exports: ["Fieldset"],
  keywords: ["fieldset", "legend", "group", "form", "section"],
  notes: [
    "The legend prop renders a native legend element associated with the fieldset, so it sits on the top border for the default and filled variants.",
    "disabled is forwarded to the native fieldset, which disables every nested control.",
    "Not ported (global styling props): classNames, styles, unstyled, vars, attributes, mod and style shorthand props. Use className and style instead.",
  ],
  playground: definePlayground({
    tag: "Fieldset",
    component: FieldsetPlayground,
    controls: {
      legend: textControl({
        label: "Legend",
        defaultValue: "Personal information",
      }),
      variant: selectControl({
        label: "Variant",
        options: ["default", "filled", "unstyled"],
        defaultValue: "default",
      }),
      radius: selectControl({
        label: "Radius",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "sm",
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "variants",
      title: "Variants",
      component: FieldsetVariants,
      layout: "stretch",
      sourceModule: "fieldset",
      sourceExport: "FieldsetVariants",
    },
    {
      id: "radius",
      title: "Radius",
      component: FieldsetRadii,
      layout: "stretch",
      sourceModule: "fieldset",
      sourceExport: "FieldsetRadii",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabling the fieldset disables every control inside it.",
      component: FieldsetDisabled,
      sourceModule: "fieldset",
      sourceExport: "FieldsetDisabled",
    },
    {
      id: "checkboxes",
      title: "Grouped checkboxes",
      component: FieldsetWithCheckboxes,
      sourceModule: "fieldset",
      sourceExport: "FieldsetWithCheckboxes",
    },
  ],
}

const fileInputEntry: ComponentEntry = {
  id: "file-input",
  name: "File Input",
  category: "Forms",
  description:
    "An input-styled button that opens the native file picker and shows the chosen file names, with multiple selection, a clear button, custom value rendering and controlled or uncontrolled value.",
  sourcePath: "src/components/ui/file-input.tsx",
  importStatement: 'import { FileInput } from "@/components/ui/file-input"',
  exports: ["FileInput"],
  keywords: ["file", "upload", "picker", "attachment", "input", "browse"],
  notes: [
    "Pair with Field, FieldLabel and FieldDescription for a label, description or error message; label, description and error wrapper props are not duplicated here. error only sets aria-invalid.",
    "wrapperClassName styles the outer relative wrapper; className styles the trigger button.",
    "Skipped global styling props: classNames, styles, unstyled, vars, attributes, mod and style shorthand props. Use className and style instead.",
    "Built on FileButton; resetRef exposes the function that clears the native input and is called automatically when the value becomes empty.",
  ],
  playground: definePlayground({
    tag: "FileInput",
    layout: "stretch",
    component: FileInputPlayground,
    controls: {
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "sm",
      }),
      placeholder: textControl({
        label: "Placeholder",
        defaultValue: "Pick a file",
      }),
      accept: textControl({ label: "Accept", defaultValue: "" }),
      multiple: booleanControl({ label: "Multiple", defaultValue: false }),
      clearable: booleanControl({ label: "Clearable", defaultValue: true }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
      readOnly: booleanControl({ label: "Read only", defaultValue: false }),
      error: booleanControl({ label: "Error", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "With label and accept",
      component: FileInputBasic,
      layout: "stretch",
      sourceModule: "file-input",
      sourceExport: "FileInputBasic",
    },
    {
      id: "multiple",
      title: "Multiple files",
      component: FileInputMultiple,
      layout: "stretch",
      sourceModule: "file-input",
      sourceExport: "FileInputMultiple",
    },
    {
      id: "value-component",
      title: "Custom value component",
      component: FileInputValueComponent,
      layout: "stretch",
      sourceModule: "file-input",
      sourceExport: "FileInputValueComponent",
    },
    {
      id: "sections",
      title: "Left and right sections",
      component: FileInputSections,
      layout: "stretch",
      sourceModule: "file-input",
      sourceExport: "FileInputSections",
    },
    {
      id: "controlled",
      title: "Controlled value",
      component: FileInputControlled,
      layout: "stretch",
      sourceModule: "file-input",
      sourceExport: "FileInputControlled",
    },
    {
      id: "clear-modes",
      title: "Clear section modes",
      component: FileInputClearModes,
      layout: "stretch",
      sourceModule: "file-input",
      sourceExport: "FileInputClearModes",
    },
    {
      id: "states",
      title: "States",
      component: FileInputStates,
      layout: "stretch",
      sourceModule: "file-input",
      sourceExport: "FileInputStates",
    },
  ],
}

const numberInputEntry: ComponentEntry = {
  id: "number-input",
  name: "Number Input",
  category: "Forms",
  description:
    "A formatted numeric text field with prefix/suffix, thousand and decimal separators, decimal scale, min/max clamping, step controls with press-and-hold repeat, and bigint support.",
  sourcePath: "src/components/ui/number-input.tsx",
  importStatement: 'import { NumberInput } from "@/components/ui/number-input"',
  exports: ["NumberInput"],
  keywords: [
    "number input",
    "numeric",
    "currency",
    "stepper",
    "spinner",
    "decimal",
    "format",
    "mask",
    "bigint",
  ],
  notes: [
    "The value is a number once the text is a complete number, and a string while it is not (empty, a lone minus, a trailing decimal point, trailing zeros such as 1.50). Handle both, or read onValueChange's floatValue.",
    "Formatting is implemented in the component itself rather than on Base UI's NumberField, because NumberField formats through Intl and cannot express custom prefix, suffix, or arbitrary thousand/decimal separators.",
    "clampBehavior: blur clamps when focus leaves, strict rejects out-of-range keystrokes (so a min of 10 cannot be reached by typing 1 first), none limits only the controls and arrow keys.",
    "onMinReached fires when a decrement hits min and onMaxReached when an increment hits max.",
    "Passing a bigint to value or defaultValue switches to bigint mode: integers only, with min, max, step and startValue handled as bigints.",
    "Skipped from Mantine's original: classNames, styles, unstyled, vars, attributes, mod, style shorthand props, and the label, description, error, withAsterisk, variant, radius, and section-width wrapper props (compose with Label or Field, and use aria-invalid for the error state). valueIsNumericString is also omitted.",
  ],
  playground: definePlayground({
    tag: "NumberInput",
    component: NumberInputPlayground,
    controls: {
      prefix: textControl({ label: "Prefix", defaultValue: "$" }),
      suffix: textControl({ label: "Suffix", defaultValue: "" }),
      thousandSeparator: textControl({
        label: "Thousand separator",
        defaultValue: ",",
      }),
      decimalScale: numberControl({
        label: "Decimal scale",
        defaultValue: 2,
        min: 0,
        max: 6,
        step: 1,
      }),
      fixedDecimalScale: booleanControl({
        label: "Fixed decimal scale",
        defaultValue: false,
      }),
      allowNegative: booleanControl({
        label: "Allow negative",
        defaultValue: true,
      }),
      allowDecimal: booleanControl({
        label: "Allow decimal",
        defaultValue: true,
      }),
      clampBehavior: selectControl({
        label: "Clamp behavior",
        options: ["blur", "strict", "none"],
        defaultValue: "blur",
      }),
      hideControls: booleanControl({
        label: "Hide controls",
        defaultValue: false,
      }),
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "sm",
      }),
      min: numberControl({ label: "Min", defaultValue: -1000 }),
      max: numberControl({ label: "Max", defaultValue: 1000000 }),
      step: numberControl({ label: "Step", defaultValue: 1, min: 0.01 }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: NumberInputBasic,
      sourceModule: "number-input",
      sourceExport: "NumberInputBasic",
    },
    {
      id: "currency",
      title: "Currency",
      description:
        "prefix, thousandSeparator, and fixedDecimalScale together format a price; step accepts decimals.",
      component: NumberInputCurrency,
      sourceModule: "number-input",
      sourceExport: "NumberInputCurrency",
    },
    {
      id: "separators",
      title: "Separators and grouping",
      description:
        "Swap the decimal and thousand characters, or group digits lakh-style with thousandsGroupStyle.",
      component: NumberInputSeparators,
      sourceModule: "number-input",
      sourceExport: "NumberInputSeparators",
    },
    {
      id: "clamping",
      title: "Clamp behavior",
      description:
        "Try typing 5 or 99 in each: blur snaps on exit, strict refuses the keystroke, none lets it through.",
      component: NumberInputClamping,
      sourceModule: "number-input",
      sourceExport: "NumberInputClamping",
    },
    {
      id: "hold-to-step",
      title: "Press and hold",
      description:
        "stepHoldDelay and stepHoldInterval repeat the step while a control is held; the interval can be a function of the step count to accelerate.",
      component: NumberInputHoldToStep,
      sourceModule: "number-input",
      sourceExport: "NumberInputHoldToStep",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "The value is a string while the text is not yet a number.",
      component: NumberInputControlled,
      sourceModule: "number-input",
      sourceExport: "NumberInputControlled",
    },
    {
      id: "handlers",
      title: "Imperative handlers",
      description:
        "handlersRef exposes increment and decrement for external buttons.",
      component: NumberInputExternalHandlers,
      sourceModule: "number-input",
      sourceExport: "NumberInputExternalHandlers",
    },
    {
      id: "sections",
      title: "Sections",
      description:
        "leftSection adds leading content; rightSection replaces the step controls.",
      component: NumberInputSections,
      sourceModule: "number-input",
      sourceExport: "NumberInputSections",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: NumberInputSizes,
      sourceModule: "number-input",
      sourceExport: "NumberInputSizes",
    },
    {
      id: "bigint",
      title: "BigInt",
      description: "Values beyond Number.MAX_SAFE_INTEGER keep full precision.",
      component: NumberInputBigInt,
      sourceModule: "number-input",
      sourceExport: "NumberInputBigInt",
    },
  ],
}

const passwordInputEntry: ComponentEntry = {
  id: "password-input",
  name: "Password Input",
  category: "Forms",
  description:
    "A password field with a visibility toggle button, controlled or uncontrolled visibility, a custom toggle icon, button props, left and right sections and five sizes.",
  sourcePath: "src/components/ui/password-input.tsx",
  importStatement:
    'import { PasswordInput } from "@/components/ui/password-input"',
  exports: ["PasswordInput", "PasswordToggleIcon"],
  keywords: ["password", "secret", "visibility", "toggle", "eye", "input"],
  notes: [
    "Pair with Field, FieldLabel and FieldDescription for a label, description or error message; label, description and error wrapper props are not duplicated here. error only sets aria-invalid.",
    "wrapperClassName styles the outer relative wrapper; className styles the input. The ref targets the input element.",
    "The toggle uses mouse down, touch end and Space/Enter key handlers so the input keeps focus; it is skipped by Tab unless visibilityToggleFocusable is set. rightSection replaces the toggle entirely.",
    "Skipped global styling props: classNames, styles, unstyled, vars, attributes, mod and style shorthand props. Use className and style instead.",
  ],
  playground: definePlayground({
    tag: "PasswordInput",
    layout: "stretch",
    component: PasswordInputPlayground,
    controls: {
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "sm",
      }),
      placeholder: textControl({
        label: "Placeholder",
        defaultValue: "Your password",
      }),
      defaultVisible: booleanControl({
        label: "Default visible",
        defaultValue: false,
      }),
      visibilityToggleFocusable: booleanControl({
        label: "Toggle focusable",
        defaultValue: false,
      }),
      withLeftSection: booleanControl({
        label: "Left section",
        defaultValue: false,
      }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
      error: booleanControl({ label: "Error", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "With label and description",
      component: PasswordInputBasic,
      layout: "stretch",
      sourceModule: "password-input",
      sourceExport: "PasswordInputBasic",
    },
    {
      id: "controlled",
      title: "Controlled visibility",
      component: PasswordInputControlled,
      layout: "stretch",
      sourceModule: "password-input",
      sourceExport: "PasswordInputControlled",
    },
    {
      id: "default-visible",
      title: "Visible by default",
      component: PasswordInputDefaultVisible,
      layout: "stretch",
      sourceModule: "password-input",
      sourceExport: "PasswordInputDefaultVisible",
    },
    {
      id: "custom-icon",
      title: "Custom icon and button props",
      component: PasswordInputCustomIcon,
      layout: "stretch",
      sourceModule: "password-input",
      sourceExport: "PasswordInputCustomIcon",
    },
    {
      id: "focusable",
      title: "Focusable toggle",
      component: PasswordInputFocusable,
      layout: "stretch",
      sourceModule: "password-input",
      sourceExport: "PasswordInputFocusable",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: PasswordInputSizes,
      layout: "stretch",
      sourceModule: "password-input",
      sourceExport: "PasswordInputSizes",
    },
    {
      id: "states",
      title: "Disabled and error",
      component: PasswordInputStates,
      layout: "stretch",
      sourceModule: "password-input",
      sourceExport: "PasswordInputStates",
    },
  ],
}

const ratingEntry: ComponentEntry = {
  id: "rating",
  name: "Rating",
  category: "Forms",
  description:
    "A star rating input built on real radio inputs. Supports fractional values, hover preview, custom symbols, keyboard navigation and a read-only display mode.",
  sourcePath: "src/components/ui/rating.tsx",
  importStatement: 'import { Rating } from "@/components/ui/rating"',
  exports: ["Rating"],
  keywords: ["stars", "review", "score", "feedback", "radio", "fractions"],
  notes: [
    "Value is controlled with value/onChange or uncontrolled with defaultValue. Values are rounded to the nearest 1 / fractions step.",
    "Each symbol is a real radio input sharing one name, so arrow keys move through values (previewing them via hover state) and Space or Enter commits the focused one. readOnly renders plain elements with no inputs.",
    "fractions splits each symbol into that many hover zones; the first symbol also gets a 0 input so the rating can be cleared via keyboard. allowClear additionally lets clicking the current value reset to 0.",
    "onHover receives the previewed value and -1 when the pointer leaves. Touch taps are resolved from coordinates and the emulated click that follows is ignored.",
    "highlightSelectedOnly fills only the symbol at the current value instead of every symbol up to it, which suits emoji or numbered scales.",
    "emptySymbol and fullSymbol accept a node or a function of the symbol value. getSymbolLabel customizes each input's aria-label.",
    "size and color are narrowed to closed token unions (xs to xl, and the project color tokens); use className for anything else, e.g. a custom [--rating-color:...].",
    "Intentionally not ported: the global styling props classNames, styles, unstyled, vars, attributes, mod, variant, and style-shorthand props (m, p, w, h, bg...). className and style cover the same ground, and numeric/CSS-string size values were replaced by the size enum.",
  ],
  playground: definePlayground({
    tag: "Rating",
    component: RatingPlayground,
    controls: {
      count: numberControl({
        label: "Count",
        defaultValue: 5,
        min: 1,
        max: 10,
        step: 1,
      }),
      fractions: numberControl({
        label: "Fractions",
        defaultValue: 1,
        min: 1,
        max: 5,
        step: 1,
      }),
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "sm",
      }),
      color: selectControl({
        label: "Color",
        options: [
          "yellow",
          "primary",
          "destructive",
          "pink",
          "red",
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
        defaultValue: "yellow",
      }),
      readOnly: booleanControl({ label: "Read only", defaultValue: false }),
      highlightSelectedOnly: booleanControl({
        label: "Highlight selected only",
        defaultValue: false,
      }),
      allowClear: booleanControl({
        label: "Allow clear",
        defaultValue: false,
      }),
    },
  }),
  stories: [
    {
      id: "controlled",
      title: "Controlled with hover",
      description: "value/onChange plus onHover, which reports -1 on leave.",
      component: RatingControlled,
      sourceModule: "rating",
      sourceExport: "RatingControlled",
    },
    {
      id: "fractions",
      title: "Fractions",
      description: "fractions={4} allows quarter-star precision.",
      component: RatingFractions,
      sourceModule: "rating",
      sourceExport: "RatingFractions",
    },
    {
      id: "read-only",
      title: "Read only",
      description: "Displays fractional values with no interaction.",
      component: RatingReadOnly,
      sourceModule: "rating",
      sourceExport: "RatingReadOnly",
    },
    {
      id: "custom-symbols",
      title: "Custom symbols",
      description: "emptySymbol and fullSymbol as nodes or functions of value.",
      component: RatingCustomSymbols,
      sourceModule: "rating",
      sourceExport: "RatingCustomSymbols",
    },
    {
      id: "highlight-selected-only",
      title: "Highlight selected only",
      component: RatingHighlightSelectedOnly,
      sourceModule: "rating",
      sourceExport: "RatingHighlightSelectedOnly",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: RatingSizesAndColors,
      sourceModule: "rating",
      sourceExport: "RatingSizesAndColors",
    },
    {
      id: "allow-clear",
      title: "Allow clear",
      description: "Clicking the current value resets the rating to 0.",
      component: RatingAllowClear,
      sourceModule: "rating",
      sourceExport: "RatingAllowClear",
    },
  ],
}

const jsonInputEntry: ComponentEntry = {
  id: "json-input",
  name: "Json Input",
  category: "Forms",
  description:
    "A monospaced textarea that validates its content as JSON when it loses focus and can pretty-print valid JSON on blur. Ported from Mantine's JsonInput.",
  sourcePath: "src/components/ui/json-input.tsx",
  importStatement: 'import { JsonInput } from "@/components/ui/json-input"',
  exports: ["JsonInput"],
  keywords: ["json", "textarea", "validate", "format", "code", "editor"],
  notes: [
    "Validation runs on blur only. Focusing the field clears the error state again so it never nags while typing.",
    "An empty or whitespace-only value is considered valid. Formatting is skipped for empty values and for readOnly inputs.",
    "When validation fails the field shows validationError if given, otherwise just the invalid (aria-invalid) state; it takes precedence over the error prop. When valid, error is shown as usual.",
    "serialize is called as serialize(parsed, null, indentSpaces) and deserialize must throw on invalid input; both default to JSON.stringify and JSON.parse.",
    "Works controlled (value + onChange) or uncontrolled (defaultValue). onChange fires with the formatted string when formatOnBlur rewrites the value.",
    "autosize uses CSS field-sizing with minRows/maxRows as min/max height; without autosize the field is fixed at minRows rows.",
    "Skipped: global styling props (classNames, styles, unstyled, vars, attributes, mod, style shorthands) and the input section/wrapper-order props. Use className, wrapperClassName and style instead.",
  ],
  playground: definePlayground({
    tag: "JsonInput",
    layout: "stretch",
    component: JsonInputPlayground,
    controls: {
      label: textControl({ label: "Label", defaultValue: "Payload" }),
      description: textControl({
        label: "Description",
        defaultValue: "Paste JSON and click away to validate",
      }),
      placeholder: textControl({
        label: "Placeholder",
        defaultValue: '{ "key": "value" }',
      }),
      formatOnBlur: booleanControl({
        label: "Format on blur",
        defaultValue: false,
      }),
      autosize: booleanControl({ label: "Autosize", defaultValue: false }),
      minRows: numberControl({
        label: "Min rows",
        defaultValue: 4,
        min: 1,
        max: 12,
      }),
      maxRows: numberControl({
        label: "Max rows",
        defaultValue: 8,
        min: 1,
        max: 20,
      }),
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "sm",
      }),
      withAsterisk: booleanControl({
        label: "With asterisk",
        defaultValue: false,
      }),
      readOnly: booleanControl({ label: "Read only", defaultValue: false }),
      disabled: booleanControl({ label: "Disabled", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "validation",
      title: "Validation on blur",
      description: "Focus clears the error; blurring re-validates.",
      component: JsonInputValidation,
      layout: "stretch",
      sourceModule: "json-input",
      sourceExport: "JsonInputValidation",
    },
    {
      id: "format-on-blur",
      title: "Format on blur",
      component: JsonInputFormatOnBlur,
      layout: "stretch",
      sourceModule: "json-input",
      sourceExport: "JsonInputFormatOnBlur",
    },
    {
      id: "autosize",
      title: "Autosize",
      component: JsonInputAutosize,
      layout: "stretch",
      sourceModule: "json-input",
      sourceExport: "JsonInputAutosize",
    },
    {
      id: "controlled",
      title: "Controlled",
      component: JsonInputControlled,
      layout: "stretch",
      sourceModule: "json-input",
      sourceExport: "JsonInputControlled",
    },
    {
      id: "custom-serializer",
      title: "Custom serialize and indentation",
      component: JsonInputCustomSerializer,
      layout: "stretch",
      sourceModule: "json-input",
      sourceExport: "JsonInputCustomSerializer",
    },
    {
      id: "error-states",
      title: "Error states",
      component: JsonInputErrorStates,
      layout: "stretch",
      sourceModule: "json-input",
      sourceExport: "JsonInputErrorStates",
    },
  ],
}

const maskInputEntry: ComponentEntry = {
  id: "mask-input",
  name: "Mask Input",
  category: "Forms",
  description:
    "A text input that formats what the user types against a mask pattern or token array, with optional slots, dynamic masks, raw/masked change callbacks and imperative reset.",
  sourcePath: "src/components/ui/mask-input.tsx",
  importStatement: 'import { MaskInput } from "@/components/ui/mask-input"',
  exports: ["MaskInput"],
  keywords: [
    "mask",
    "input",
    "format",
    "pattern",
    "phone",
    "credit card",
    "date",
    "token",
  ],
  notes: [
    "Behavior comes from the `useMask` hook (src/hooks/use-mask.ts), a dependency-free implementation of the original's mask engine; react-imask is not used because the original API (tokens, modify, slotChar, separate, beforeMaskedStateChange) has no equivalent in it.",
    "The input is driven through the DOM like the original: pass `defaultValue` for an initial value; a controlled `value` prop is not supported. Read changes with `onChangeRaw(raw, masked)`.",
    "Default tokens: 9 digit, a letter, A uppercase letter, * alphanumeric, # digit or sign. `?` makes the rest of the mask optional and `\\` escapes a literal.",
    "Mantine's global styling props (classNames, styles, unstyled, vars, attributes, mod and style shorthands) are skipped; use className/style. Label, description and error are composed with Field/Label outside the input.",
  ],
  playground: definePlayground({
    tag: "MaskInput",
    layout: "center",
    component: MaskInputPlayground,
    controls: {
      mask: textControl({
        label: "Mask",
        defaultValue: "(999) 999-9999",
        placeholder: "(999) 999-9999",
      }),
      size: selectControl({
        label: "Size",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "sm",
      }),
      slotChar: selectControl({
        label: "Slot char",
        options: ["_", "-", "#", "*"],
        defaultValue: "_",
      }),
      alwaysShowMask: booleanControl({
        label: "Always show mask",
        defaultValue: false,
      }),
      showMaskOnFocus: booleanControl({
        label: "Show mask on focus",
        defaultValue: true,
      }),
      autoClear: booleanControl({ label: "Auto clear", defaultValue: false }),
    },
  }),
  stories: [
    {
      id: "basic",
      title: "Basic",
      component: MaskInputBasic,
      sourceModule: "mask-input",
      sourceExport: "MaskInputBasic",
    },
    {
      id: "tokens",
      title: "Tokens and transform",
      component: MaskInputTokens,
      sourceModule: "mask-input",
      sourceExport: "MaskInputTokens",
    },
    {
      id: "regex-array",
      title: "Regex array",
      component: MaskInputRegexArray,
      sourceModule: "mask-input",
      sourceExport: "MaskInputRegexArray",
    },
    {
      id: "dynamic",
      title: "Dynamic mask with modify",
      component: MaskInputDynamic,
      sourceModule: "mask-input",
      sourceExport: "MaskInputDynamic",
    },
    {
      id: "optional",
      title: "Optional segment",
      component: MaskInputOptionalSegment,
      sourceModule: "mask-input",
      sourceExport: "MaskInputOptionalSegment",
    },
    {
      id: "callbacks",
      title: "Callbacks, autoClear and reset",
      component: MaskInputCallbacks,
      sourceModule: "mask-input",
      sourceExport: "MaskInputCallbacks",
    },
    {
      id: "sizes",
      title: "Sizes",
      component: MaskInputSizes,
      sourceModule: "mask-input",
      sourceExport: "MaskInputSizes",
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
  autocompleteEntry,
  cascaderEntry,
  comboboxEntry,
  checkboxEntry,
  radioGroupEntry,
  switchEntry,
  sliderEntry,
  hueSliderEntry,
  alphaSliderEntry,
  angleSliderEntry,
  pillEntry,
  pillsInputEntry,
  multiSelectEntry,
  tagsInputEntry,
  colorInputEntry,
  colorPickerEntry,
  calendarEntry,
  chipEntry,
  fieldsetEntry,
  fileInputEntry,
  numberInputEntry,
  passwordInputEntry,
  ratingEntry,
  jsonInputEntry,
  maskInputEntry,
]
