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
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { Pill, PillGroup } from "@/components/ui/pill"
import { PillsInput, PillsInputField } from "@/components/ui/pills-input"

interface TagsInputItem {
  value: string
  label?: string
  disabled?: boolean
}

interface TagsInputOptionsGroup {
  group: string
  items: (string | TagsInputItem)[]
}

type TagsInputData = (string | TagsInputItem | TagsInputOptionsGroup)[]

type NormalizedItem = Required<Pick<TagsInputItem, "value" | "label">> &
  Pick<TagsInputItem, "disabled">

type NormalizedEntry =
  | { type: "item"; item: NormalizedItem }
  | { type: "group"; group: string; items: NormalizedItem[] }

function isOptionsGroup(
  entry: string | TagsInputItem | TagsInputOptionsGroup,
): entry is TagsInputOptionsGroup {
  return typeof entry === "object" && entry !== null && "group" in entry
}

function normalizeOption(entry: string | TagsInputItem): NormalizedItem {
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

function defaultIsDuplicate(value: string, currentValues: string[]) {
  return currentValues.some((tag) => tag.toLowerCase() === value.toLowerCase())
}

function splitTags(splitChars: string[], value: string) {
  return value
    .split(new RegExp(`[${splitChars.join("")}]`))
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "")
}

interface TagsInputProps {
  /** Suggestions shown in the dropdown. Plain strings, `{ value, label, disabled }` objects, and `{ group, items }` groups can be mixed. */
  data?: TagsInputData
  /** Controlled tags. */
  value?: string[]
  /** Uncontrolled initial tags. */
  defaultValue?: string[]
  /** Called when tags change. */
  onChange?: (value: string[]) => void
  /** Called with the value of the removed tag. */
  onRemove?: (value: string) => void
  /** Called when the clear button is clicked. */
  onClear?: () => void
  /** Maximum number of tags. Unlimited if not set. */
  maxTags?: number
  /** Called when the user attempts to add more tags than `maxTags` allows. */
  onMaxTags?: (value: string) => void
  /** Allows the same tag to be added more than once. @default false */
  allowDuplicates?: boolean
  /** Called when the user attempts to submit a duplicate tag. */
  onDuplicate?: (value: string) => void
  /** Custom duplicate check. By default, compares tags case-insensitively. */
  isDuplicate?: (value: string, currentValues: string[]) => boolean
  /** Characters that split typed or pasted text into separate tags. @default [","] */
  splitChars?: string[]
  /** Controlled search value. */
  searchValue?: string
  /** Uncontrolled initial search value. */
  defaultSearchValue?: string
  /** Called when the search value changes. */
  onSearchChange?: (value: string) => void
  /** Submits the current search text as a tag when the input loses focus. @default true */
  acceptValueOnBlur?: boolean
  /** Shows a button that clears all tags, hidden when empty, disabled, or read-only. @default false */
  clearable?: boolean
  /** Message shown when no suggestions match the search query. If not set, the empty state is omitted. */
  nothingFoundMessage?: React.ReactNode
  /** Adds disabled attribute, applies disabled styles, and prevents interaction. */
  disabled?: boolean
  /** Makes tags immutable and hides the dropdown. */
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

function TagsInput({
  data = [],
  value,
  defaultValue = [],
  onChange,
  onRemove,
  onClear,
  maxTags,
  onMaxTags,
  allowDuplicates = false,
  onDuplicate,
  isDuplicate,
  splitChars = [","],
  searchValue,
  defaultSearchValue = "",
  onSearchChange,
  acceptValueOnBlur = true,
  clearable = false,
  nothingFoundMessage,
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
}: TagsInputProps) {
  const anchor = useComboboxAnchor()
  const [tags, setTags] = useControllableValue(value, defaultValue, onChange)
  const [search, setSearch] = useControllableValue(
    searchValue,
    defaultSearchValue,
    onSearchChange,
  )
  const hasHighlightRef = React.useRef(false)

  const checkDuplicate = React.useCallback(
    (val: string, currentTags: string[]) =>
      isDuplicate
        ? isDuplicate(val, currentTags)
        : defaultIsDuplicate(val, currentTags),
    [isDuplicate],
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

  const visibleOrder = React.useMemo(() => {
    const isVisible = (item: NormalizedItem) =>
      !tags.some((tag) => tag.toLowerCase() === item.label.toLowerCase())
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
  }, [normalizedData, tags])

  const visibleFlatItems = React.useMemo(() => {
    const flat: NormalizedItem[] = []
    for (const entry of visibleOrder) {
      if (entry.type === "group") flat.push(...entry.items)
      else flat.push(entry.item)
    }
    return flat
  }, [visibleOrder])

  const hasGroups = visibleOrder.some((entry) => entry.type === "group")

  const handleValueSelect = (val: string) => {
    const duplicated = checkDuplicate(val, tags)
    if (duplicated) {
      onDuplicate?.(val)
      if (!allowDuplicates) {
        setSearch("")
        return
      }
    }
    if (maxTags !== undefined && tags.length >= maxTags) {
      onMaxTags?.(val)
      return
    }
    setSearch("")
    if (val.length > 0) setTags([...tags, val])
  }

  const mergeSplitTags = (raw: string) => {
    const splitted = splitTags(splitChars, raw)
    const merged: string[] = []
    if (allowDuplicates) {
      merged.push(...tags, ...splitted)
    } else {
      merged.push(...tags)
      for (const tag of splitted) {
        if (checkDuplicate(tag, merged)) onDuplicate?.(tag)
        else merged.push(tag)
      }
    }
    return maxTags !== undefined ? merged.slice(0, maxTags) : merged
  }

  const removeValue = (index: number) => {
    const removed = tags[index]
    setTags(tags.filter((_, i) => i !== index))
    onRemove?.(removed)
  }

  const hasValue = tags.length > 0
  const showClearButton = clearable && !disabled && !readOnly && hasValue

  return (
    <Combobox
      items={visibleFlatItems}
      multiple
      value={tags}
      onValueChange={(next: string[]) => {
        const added = next.find((v) => !tags.includes(v))
        if (added !== undefined) handleValueSelect(added)
      }}
      onItemHighlighted={(val) => {
        hasHighlightRef.current = val !== undefined
      }}
      inputValue={search}
      onInputValueChange={setSearch}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      name={name}
      form={form}
      id={id}
    >
      <div data-slot="tags-input" className="relative w-full">
        <PillsInput
          ref={anchor}
          disabled={disabled}
          className={cn(showClearButton && "pe-8", className)}
        >
          <PillGroup size="sm" disabled={disabled}>
            {tags.map((tag, index) => (
              <Pill
                key={`${tag}-${index}`}
                withRemoveButton={!readOnly && !disabled}
                onRemove={() => removeValue(index)}
              >
                {tag}
              </Pill>
            ))}
            <ComboboxPrimitive.Input
              render={<PillsInputField type="visible" />}
              placeholder={placeholder}
              readOnly={readOnly}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledby}
              onKeyDown={(event) => {
                if (disabled || readOnly) return

                if (
                  splitChars.includes(event.key) &&
                  search.trim().length > 0
                ) {
                  setTags(mergeSplitTags(search))
                  setSearch("")
                  event.preventDefault()
                  return
                }

                if (
                  event.key === "Enter" &&
                  search.trim().length > 0 &&
                  !hasHighlightRef.current
                ) {
                  event.preventDefault()
                  handleValueSelect(search.trim())
                  return
                }

                if (
                  event.key === "Backspace" &&
                  search.length === 0 &&
                  tags.length > 0
                ) {
                  removeValue(tags.length - 1)
                }
              }}
              onPaste={(event) => {
                if (disabled || readOnly) return
                event.preventDefault()
                const pasted = event.clipboardData.getData("text/plain")
                setTags(mergeSplitTags(`${search}${pasted}`))
                setSearch("")
              }}
              onBlur={() => {
                if (acceptValueOnBlur && !disabled && !readOnly) {
                  handleValueSelect(search.trim())
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
            aria-label="Clear tags"
            onClick={(event) => {
              event.stopPropagation()
              setTags([])
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

export { TagsInput }
export type {
  TagsInputProps,
  TagsInputItem,
  TagsInputOptionsGroup,
  TagsInputData,
}
