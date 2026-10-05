import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { cn } from "cn"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { Pill, PillGroup } from "@/components/ui/pill"
import { PillsInput, PillsInputField } from "@/components/ui/pills-input"

interface MultiSelectItem {
  value: string
  label?: string
  disabled?: boolean
}

interface MultiSelectOptionsGroup {
  group: string
  items: (string | MultiSelectItem)[]
}

type MultiSelectData = (string | MultiSelectItem | MultiSelectOptionsGroup)[]

type NormalizedItem = Required<Pick<MultiSelectItem, "value" | "label">> &
  Pick<MultiSelectItem, "disabled">

type NormalizedEntry =
  | { type: "item"; item: NormalizedItem }
  | { type: "group"; group: string; items: NormalizedItem[] }

function isOptionsGroup(
  entry: string | MultiSelectItem | MultiSelectOptionsGroup,
): entry is MultiSelectOptionsGroup {
  return typeof entry === "object" && entry !== null && "group" in entry
}

function normalizeOption(entry: string | MultiSelectItem): NormalizedItem {
  if (typeof entry === "string") return { value: entry, label: entry }
  return {
    value: entry.value,
    label: entry.label ?? entry.value,
    disabled: entry.disabled,
  }
}

/**
 * Uncontrolled/controlled state that always reflects the last value passed
 * via `value`, falling back to internal state so the component still works
 * without a consumer-managed `onChange`.
 */
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

interface MultiSelectProps {
  /** Options. Plain strings, `{ value, label, disabled }` objects, and `{ group, items }` groups can be mixed. */
  data: MultiSelectData
  /** Controlled selected values. */
  value?: string[]
  /** Uncontrolled initial selected values. */
  defaultValue?: string[]
  /** Called when selected values change. */
  onChange?: (value: string[]) => void
  /** Called with the value of the removed item. */
  onRemove?: (value: string) => void
  /** Called when the clear button is clicked. */
  onClear?: () => void
  /** Called when the user attempts to select more values than `maxValues` allows. */
  onMaxValues?: () => void
  /** Controlled search value. */
  searchValue?: string
  /** Uncontrolled initial search value. */
  defaultSearchValue?: string
  /** Called when the search value changes. */
  onSearchChange?: (value: string) => void
  /** Maximum number of values, no limit if not set. */
  maxValues?: number
  /** Allows filtering options by typing. @default false */
  searchable?: boolean
  /** Message shown when no options match the search query. If not set, the empty state is omitted. */
  nothingFoundMessage?: React.ReactNode
  /** Hides options that are already selected from the dropdown list. @default false */
  hidePickedOptions?: boolean
  /** Shows a button that clears all selected values, hidden when empty, disabled, or read-only. @default false */
  clearable?: boolean
  /** Adds disabled attribute, applies disabled styles, and prevents interaction. */
  disabled?: boolean
  /** Makes selected values immutable and hides the dropdown. */
  readOnly?: boolean
  placeholder?: string
  className?: string
  id?: string
  name?: string
  form?: string
  required?: boolean
  "aria-label"?: string
  "aria-labelledby"?: string
}

function MultiSelect({
  data,
  value,
  defaultValue = [],
  onChange,
  onRemove,
  onClear,
  onMaxValues,
  searchValue,
  defaultSearchValue = "",
  onSearchChange,
  maxValues,
  searchable = false,
  nothingFoundMessage,
  hidePickedOptions = false,
  clearable = false,
  disabled = false,
  readOnly = false,
  placeholder,
  className,
  id,
  name,
  form,
  required,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: MultiSelectProps) {
  const anchor = useComboboxAnchor()
  const [selected, setSelected] = useControllableValue(
    value,
    defaultValue,
    onChange,
  )
  const [search, setSearch] = useControllableValue(
    searchValue,
    defaultSearchValue,
    onSearchChange,
  )

  const normalizedData = React.useMemo<NormalizedEntry[]>(
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

  const lockup = React.useMemo(() => {
    const map = new Map<string, NormalizedItem>()
    for (const entry of normalizedData) {
      if (entry.type === "group") {
        for (const item of entry.items) map.set(item.value, item)
      } else {
        map.set(entry.item.value, entry.item)
      }
    }
    return map
  }, [normalizedData])

  const visibleOrder = React.useMemo(() => {
    if (!hidePickedOptions) return normalizedData
    const isVisible = (item: NormalizedItem) => !selected.includes(item.value)
    return normalizedData
      .map((entry): NormalizedEntry | null =>
        entry.type === "group"
          ? { ...entry, items: entry.items.filter(isVisible) }
          : isVisible(entry.item)
            ? entry
            : null,
      )
      .filter(
        (entry): entry is NormalizedEntry =>
          entry !== null && (entry.type === "item" || entry.items.length > 0),
      )
  }, [normalizedData, hidePickedOptions, selected])

  const visibleFlatItems = React.useMemo(() => {
    const flat: NormalizedItem[] = []
    for (const entry of visibleOrder) {
      if (entry.type === "group") flat.push(...entry.items)
      else flat.push(entry.item)
    }
    return flat
  }, [visibleOrder])

  const hasGroups = visibleOrder.some((entry) => entry.type === "group")

  const handleValueChange = (next: string[]) => {
    const isAddition = next.length > selected.length
    if (isAddition && maxValues !== undefined && selected.length >= maxValues) {
      onMaxValues?.()
      return
    }
    if (!isAddition) {
      const removed = selected.find((v) => !next.includes(v))
      if (removed !== undefined) onRemove?.(removed)
    }
    setSelected(next)
    setSearch("")
  }

  const removeValue = (target: string) => {
    setSelected(selected.filter((v) => v !== target))
    onRemove?.(target)
  }

  const hasValue = selected.length > 0
  const showClearButton = clearable && !disabled && !readOnly && hasValue

  return (
    <Combobox
      items={visibleFlatItems}
      multiple
      value={selected}
      onValueChange={(next) => handleValueChange(next)}
      inputValue={search}
      onInputValueChange={setSearch}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      name={name}
      form={form}
      id={id}
    >
      <div data-slot="multi-select" className="relative w-full">
        <PillsInput
          ref={anchor}
          disabled={disabled}
          className={cn(showClearButton && "pe-8", className)}
        >
          <PillGroup size="sm" disabled={disabled}>
            <ComboboxValue>
              {(values: string[]) =>
                values.map((val) => {
                  const option = lockup.get(val)
                  return (
                    <Pill
                      key={val}
                      withRemoveButton={
                        !readOnly && !disabled && !option?.disabled
                      }
                      onRemove={() => removeValue(val)}
                    >
                      {option?.label ?? val}
                    </Pill>
                  )
                })
              }
            </ComboboxValue>
            <ComboboxPrimitive.Input
              render={
                <PillsInputField
                  type={!searchable && !placeholder ? "hidden" : "visible"}
                  pointer={!searchable}
                />
              }
              placeholder={placeholder}
              readOnly={readOnly || !searchable}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledby}
              onKeyDown={(event) => {
                if (
                  event.key === "Backspace" &&
                  search.length === 0 &&
                  selected.length > 0 &&
                  !disabled &&
                  !readOnly
                ) {
                  removeValue(selected[selected.length - 1])
                }
              }}
            />
          </PillGroup>
        </PillsInput>
        {showClearButton && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="absolute end-1 top-1/2 -translate-y-1/2"
            aria-label="Clear values"
            onClick={(event) => {
              event.stopPropagation()
              setSelected([])
              setSearch("")
              onClear?.()
            }}
          >
            <XIcon />
          </Button>
        )}
      </div>
      <ComboboxContent anchor={anchor}>
        {nothingFoundMessage && (
          <ComboboxEmpty>{nothingFoundMessage}</ComboboxEmpty>
        )}
        <ComboboxList>
          {hasGroups ? (
            visibleOrder.map((entry) =>
              entry.type === "group" ? (
                <ComboboxGroup key={entry.group}>
                  <ComboboxLabel>{entry.group}</ComboboxLabel>
                  {entry.items.map((item) => (
                    <ComboboxItem
                      key={item.value}
                      value={item.value}
                      disabled={item.disabled}
                    >
                      {item.label}
                    </ComboboxItem>
                  ))}
                </ComboboxGroup>
              ) : (
                <ComboboxItem
                  key={entry.item.value}
                  value={entry.item.value}
                  disabled={entry.item.disabled}
                >
                  {entry.item.label}
                </ComboboxItem>
              ),
            )
          ) : (
            <ComboboxCollection>
              {(item: NormalizedItem) => (
                <ComboboxItem
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                >
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxCollection>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export { MultiSelect }
export type {
  MultiSelectProps,
  MultiSelectItem,
  MultiSelectOptionsGroup,
  MultiSelectData,
}
