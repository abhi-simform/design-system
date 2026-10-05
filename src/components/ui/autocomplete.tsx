import * as React from "react"
import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete"
import { cn } from "cn"
import { XIcon } from "lucide-react"

import {
  ComboboxCollection,
  ComboboxContent,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

interface AutocompleteItem {
  value: string
  label?: string
  disabled?: boolean
}

interface AutocompleteOptionsGroup {
  group: string
  items: (string | AutocompleteItem)[]
}

type AutocompleteData = (string | AutocompleteItem | AutocompleteOptionsGroup)[]

type AutocompleteOption = Required<Pick<AutocompleteItem, "value" | "label">> &
  Pick<AutocompleteItem, "disabled">

type AutocompleteEntry =
  | { type: "item"; item: AutocompleteOption }
  | { type: "group"; group: string; items: AutocompleteOption[] }

interface AutocompleteFilterInput {
  options: AutocompleteEntry[]
  search: string
  limit: number
}

type AutocompleteFilter = (
  input: AutocompleteFilterInput,
) => AutocompleteEntry[]

function isOptionsGroup(
  entry: string | AutocompleteItem | AutocompleteOptionsGroup,
): entry is AutocompleteOptionsGroup {
  return typeof entry === "object" && entry !== null && "group" in entry
}

function normalizeOption(entry: string | AutocompleteItem): AutocompleteOption {
  if (typeof entry === "string") return { value: entry, label: entry }
  return {
    value: entry.value,
    label: entry.label ?? entry.value,
    disabled: entry.disabled,
  }
}

const defaultFilter: AutocompleteFilter = ({ options, search, limit }) => {
  const query = search.trim().toLowerCase()
  const matches = (option: AutocompleteOption) =>
    option.label.toLowerCase().trim().includes(query)
  const result: AutocompleteEntry[] = []
  let count = 0

  for (const entry of options) {
    if (count >= limit) break
    if (entry.type === "item") {
      if (matches(entry.item)) {
        result.push(entry)
        count += 1
      }
    } else {
      const items: AutocompleteOption[] = []
      for (const item of entry.items) {
        if (count >= limit) break
        if (matches(item)) {
          items.push(item)
          count += 1
        }
      }
      if (items.length > 0) result.push({ ...entry, items })
    }
  }

  return result
}

function useControllableValue<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const resolved = isControlled ? value : uncontrolled

  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next)
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  return [resolved, setValue]
}

type AutocompleteProps = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "size" | "prefix"
> & {
  /** Options. Plain strings, `{ value, label, disabled }` objects, and `{ group, items }` groups can be mixed. Values must be unique. */
  data?: AutocompleteData
  /** Controlled input value. */
  value?: string
  /** Uncontrolled initial input value. */
  defaultValue?: string
  /** Called when the input value changes. */
  onChange?: (value: string) => void
  /** Called with the option's `value` when an option is chosen from the dropdown. */
  onOptionSubmit?: (value: string) => void
  /** Custom option content. */
  renderOption?: (input: { option: AutocompleteOption }) => React.ReactNode
  /** Maximum number of options shown in the dropdown. @default Infinity */
  limit?: number
  /** Custom filtering function. Receives the normalized options, search string and limit. */
  filter?: AutocompleteFilter
  /** Controlled dropdown opened state. */
  dropdownOpened?: boolean
  /** Uncontrolled initial dropdown opened state. @default false */
  defaultDropdownOpened?: boolean
  /** Called when the dropdown opens. */
  onDropdownOpen?: () => void
  /** Called when the dropdown closes. */
  onDropdownClose?: () => void
  /** Highlights the first option whenever the value changes. @default false */
  selectFirstOptionOnChange?: boolean
  /** Shows a clear button when the input has a value. @default false */
  clearable?: boolean
  /** Called when the clear button is clicked. */
  onClear?: () => void
  /** Selects the highlighted option when the input loses focus. @default false */
  autoSelectOnBlur?: boolean
  /** Opens the dropdown when the input receives focus. @default true */
  openOnFocus?: boolean
  /** Content rendered before the input. */
  leftSection?: React.ReactNode
  /** Content rendered after the input. */
  rightSection?: React.ReactNode
}

function Autocomplete({
  data = [],
  value,
  defaultValue = "",
  onChange,
  onOptionSubmit,
  renderOption,
  limit = Infinity,
  filter = defaultFilter,
  dropdownOpened,
  defaultDropdownOpened = false,
  onDropdownOpen,
  onDropdownClose,
  selectFirstOptionOnChange = false,
  clearable = false,
  onClear,
  autoSelectOnBlur = false,
  openOnFocus = true,
  leftSection,
  rightSection,
  disabled = false,
  readOnly = false,
  className,
  onFocus,
  onBlur,
  ...props
}: AutocompleteProps) {
  const [inputValue, setInputValue] = useControllableValue(
    value,
    defaultValue,
    onChange,
  )
  const [open, setOpen] = useControllableValue(
    dropdownOpened,
    defaultDropdownOpened,
    (next) => (next ? onDropdownOpen?.() : onDropdownClose?.()),
  )
  const highlightedRef = React.useRef<AutocompleteOption | undefined>(undefined)

  const entries = React.useMemo<AutocompleteEntry[]>(
    () =>
      data.map((entry) =>
        isOptionsGroup(entry)
          ? {
              type: "group",
              group: entry.group,
              items: entry.items.map(normalizeOption),
            }
          : { type: "item", item: normalizeOption(entry) },
      ),
    [data],
  )

  const filtered = React.useMemo(
    () => filter({ options: entries, search: inputValue, limit }),
    [filter, entries, inputValue, limit],
  )

  const hasGroups = filtered.some((entry) => entry.type === "group")

  const items = React.useMemo(
    () =>
      hasGroups
        ? filtered.map((entry) =>
            entry.type === "group"
              ? { value: entry.group, items: entry.items }
              : { value: entry.item.value, items: [entry.item] },
          )
        : filtered.flatMap((entry) =>
            entry.type === "item" ? [entry.item] : [],
          ),
    [filtered, hasGroups],
  )

  const allOptions = React.useMemo(
    () =>
      entries.flatMap((entry) =>
        entry.type === "group" ? entry.items : [entry.item],
      ),
    [entries],
  )

  const showClearButton = clearable && !!inputValue && !disabled && !readOnly
  const isOpen = open && filtered.length > 0 && !disabled && !readOnly

  const renderItem = (option: AutocompleteOption) => (
    <ComboboxItem
      key={option.value}
      value={option}
      disabled={option.disabled}
      className="pr-1.5"
    >
      {renderOption ? renderOption({ option }) : option.label}
    </ComboboxItem>
  )

  return (
    <AutocompletePrimitive.Root
      items={items}
      filteredItems={items}
      value={inputValue}
      open={isOpen}
      onOpenChange={setOpen}
      autoHighlight={selectFirstOptionOnChange}
      onItemHighlighted={(item) => {
        highlightedRef.current = item as AutocompleteOption | undefined
      }}
      onValueChange={(next, details) => {
        setInputValue(next)
        if (details.reason === "item-press") {
          const option = allOptions.find(
            (candidate) => candidate.label === next,
          )
          if (option) onOptionSubmit?.(option.value)
          setOpen(false)
        }
      }}
      disabled={disabled}
      readOnly={readOnly}
    >
      <InputGroup className={className}>
        {leftSection && (
          <InputGroupAddon align="inline-start">{leftSection}</InputGroupAddon>
        )}
        <AutocompletePrimitive.Input
          render={<InputGroupInput disabled={disabled} readOnly={readOnly} />}
          onFocus={(event) => {
            if (openOnFocus) setOpen(true)
            onFocus?.(event)
          }}
          onBlur={(event) => {
            const highlighted = highlightedRef.current
            if (autoSelectOnBlur && highlighted && !highlighted.disabled) {
              setInputValue(highlighted.label)
              onOptionSubmit?.(highlighted.value)
            }
            onBlur?.(event)
          }}
          onClick={() => setOpen(true)}
          {...props}
        />
        {(showClearButton || rightSection) && (
          <InputGroupAddon align="inline-end">
            {showClearButton && (
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                aria-label="Clear value"
                onClick={() => {
                  setInputValue("")
                  onClear?.()
                }}
              >
                <XIcon className="pointer-events-none" />
              </InputGroupButton>
            )}
            {rightSection}
          </InputGroupAddon>
        )}
      </InputGroup>
      <ComboboxContent
        data-slot="autocomplete-content"
        className={cn("min-w-(--anchor-width)")}
      >
        <ComboboxList>
          {hasGroups ? (
            filtered.map((entry) =>
              entry.type === "group" ? (
                <ComboboxGroup key={entry.group} items={entry.items}>
                  <ComboboxLabel>{entry.group}</ComboboxLabel>
                  {entry.items.map(renderItem)}
                </ComboboxGroup>
              ) : (
                renderItem(entry.item)
              ),
            )
          ) : (
            <ComboboxCollection>{renderItem}</ComboboxCollection>
          )}
        </ComboboxList>
      </ComboboxContent>
    </AutocompletePrimitive.Root>
  )
}

export { Autocomplete }
export type {
  AutocompleteProps,
  AutocompleteItem,
  AutocompleteOptionsGroup,
  AutocompleteData,
  AutocompleteOption,
  AutocompleteEntry,
  AutocompleteFilter,
  AutocompleteFilterInput,
}
