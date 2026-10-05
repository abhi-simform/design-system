"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { cn } from "cn"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MinusIcon,
} from "lucide-react"

import { CloseButton } from "@/components/ui/close-button"
import { Input } from "@/components/ui/input"
import { Pill, PillGroup } from "@/components/ui/pill"
import { PillsInput, PillsInputField } from "@/components/ui/pills-input"
import { PopoverContent } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  findTreeNode,
  getAllCheckedNodes,
  getChildrenNodesValues,
  getTreeExpandedState,
  type TreeExpandedState,
  type TreeNodeData,
} from "@/hooks/use-tree"

type TreeSelectMode = "single" | "multiple" | "checkbox"
type TreeSelectValue<Mode extends TreeSelectMode> = Mode extends "single"
  ? string | null
  : string[]
type TreeSelectCheckedStrategy = "all" | "parent" | "child"
type TreeSelectSize = "xs" | "sm" | "md" | "lg" | "xl"
type TreeSelectRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl"
type TreeSelectVariant = "default" | "filled" | "unstyled"
type TreeSelectClearSectionMode = "both" | "rightSection" | "clear"
type TreeSelectFilter = (query: string, node: TreeNodeData) => boolean

interface TreeSelectChevronAriaLabels {
  /** aria-label for the expand button when the node is collapsed. @default "Expand" */
  expand?: string
  /** aria-label for the expand button when the node is expanded. @default "Collapse" */
  collapse?: string
}

interface TreeSelectRenderNodePayload {
  node: TreeNodeData
  level: number
  expanded: boolean
  hasChildren: boolean
  selected: boolean
  checked: boolean
  indeterminate: boolean
  /** Toggles the expanded state of the node. No-op for nodes without children. */
  expand: (event?: React.MouseEvent) => void
}

interface TreeSelectRenderPillPayload {
  /** Node associated with the pill. A placeholder node is passed when the value is not in `data`. */
  node: TreeNodeData
  /** Selected value that the pill represents */
  value: string
  /** Removes the value from the selection, same as the default pill remove button */
  onRemove: () => void
  disabled?: boolean
  readOnly?: boolean
}

interface TreeSelectDropdownProps {
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  sideOffset?: number
  alignOffset?: number
  /** Dropdown width: `"target"` matches the input. @default "target" */
  width?: "target" | number | string
  className?: string
}

const sizeClasses: Record<
  TreeSelectSize,
  {
    input: string
    pills: string
    section: string
    start: string
    end: string
    end2: string
  }
> = {
  xs: {
    input: "h-7 text-xs md:text-xs",
    pills: "min-h-7 text-xs md:text-xs",
    section: "w-7",
    start: "ps-7",
    end: "pe-7",
    end2: "pe-14",
  },
  sm: {
    input: "h-8",
    pills: "min-h-8",
    section: "w-8",
    start: "ps-8",
    end: "pe-8",
    end2: "pe-16",
  },
  md: {
    input: "h-9",
    pills: "min-h-9",
    section: "w-9",
    start: "ps-9",
    end: "pe-9",
    end2: "pe-18",
  },
  lg: {
    input: "h-10 text-base md:text-base",
    pills: "min-h-10 text-base md:text-base",
    section: "w-10",
    start: "ps-10",
    end: "pe-10",
    end2: "pe-20",
  },
  xl: {
    input: "h-11 text-lg md:text-lg",
    pills: "min-h-11 text-lg md:text-lg",
    section: "w-11",
    start: "ps-11",
    end: "pe-11",
    end2: "pe-22",
  },
}

const radiusClasses: Record<TreeSelectRadius, string> = {
  none: "rounded-none",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
}

const variantClasses: Record<TreeSelectVariant, string> = {
  default: "",
  filled: "border-transparent bg-muted dark:bg-muted",
  unstyled:
    "rounded-none border-transparent bg-transparent px-0 shadow-none focus-within:ring-0 focus-visible:ring-0 dark:bg-transparent",
}

const pointerEventsClasses = {
  none: "pointer-events-none",
  all: "pointer-events-auto",
} satisfies Record<"none" | "all", string>

const levelOffset = "1.25rem"
const basePadding = "0.5rem"

function hasLoadedChildren(node: TreeNodeData) {
  return Array.isArray(node.children) && node.children.length > 0
}

function defaultTreeNodeFilter(query: string, node: TreeNodeData) {
  const label = typeof node.label === "string" ? node.label : node.value
  return label.toLowerCase().includes(query.toLowerCase().trim())
}

function filterTreeData(
  data: TreeNodeData[],
  query: string,
  filter: TreeSelectFilter = defaultTreeNodeFilter,
): TreeNodeData[] {
  if (!query.trim()) {
    return data
  }

  const result: TreeNodeData[] = []

  for (const node of data) {
    const filteredChildren = hasLoadedChildren(node)
      ? filterTreeData(node.children!, query, filter)
      : []

    if (filter(query, node) || filteredChildren.length > 0) {
      result.push(
        filteredChildren.length > 0
          ? { ...node, children: filteredChildren }
          : { ...node },
      )
    }
  }

  return result
}

interface FlatNode {
  node: TreeNodeData
  level: number
  parent: string | null
  hasChildren: boolean
  expanded: boolean
  isLastChild: boolean
  lineGuides: boolean[]
}

function flattenTo(
  acc: FlatNode[],
  data: TreeNodeData[],
  expandedState: TreeExpandedState,
  parent: string | null,
  level: number,
  parentGuides: boolean[],
) {
  data.forEach((node, index) => {
    const isLast = index === data.length - 1
    const loaded = hasLoadedChildren(node)
    const expanded = expandedState[node.value] || false

    acc.push({
      node,
      level,
      parent,
      hasChildren: loaded || !!node.hasChildren,
      expanded,
      isLastChild: isLast,
      lineGuides: parentGuides,
    })

    if (expanded && loaded) {
      const childGuides = level >= 2 ? [...parentGuides, !isLast] : []
      flattenTo(
        acc,
        node.children!,
        expandedState,
        node.value,
        level + 1,
        childGuides,
      )
    }
  })
}

function flattenTreeSelectData(
  data: TreeNodeData[],
  expandedState: TreeExpandedState,
) {
  const result: FlatNode[] = []
  flattenTo(result, data, expandedState, null, 1, [])
  return result
}

function getAncestorsToNode(
  value: string,
  nodes: TreeNodeData[],
): string[] | null {
  for (const node of nodes) {
    if (node.value === value) {
      return []
    }
    if (Array.isArray(node.children)) {
      const path = getAncestorsToNode(value, node.children)
      if (path !== null) {
        return [node.value, ...path]
      }
    }
  }
  return null
}

function expandToLeafChecked(value: string[], data: TreeNodeData[]) {
  const leaves = new Set<string>()
  for (const item of value) {
    for (const leaf of getChildrenNodesValues(item, data)) {
      leaves.add(leaf)
    }
  }
  return Array.from(leaves)
}

function getTopmostCheckedParents(
  data: TreeNodeData[],
  isChecked: (value: string) => boolean,
): string[] {
  const result: string[] = []
  for (const node of data) {
    if (isChecked(node.value)) {
      result.push(node.value)
    } else if (hasLoadedChildren(node)) {
      result.push(...getTopmostCheckedParents(node.children!, isChecked))
    }
  }
  return result
}

function checkedToValue(
  checkedState: string[],
  data: TreeNodeData[],
  strategy: TreeSelectCheckedStrategy,
) {
  if (checkedState.length === 0) {
    return []
  }

  if (strategy === "all") {
    return getAllCheckedNodes(data, checkedState)
      .result.filter((item) => item.checked)
      .map((item) => item.value)
  }

  if (strategy === "parent") {
    const checked = new Set(
      getAllCheckedNodes(data, checkedState)
        .result.filter((item) => item.checked)
        .map((item) => item.value),
    )
    return getTopmostCheckedParents(data, (value) => checked.has(value))
  }

  return checkedState
}

function labelOf(node: TreeNodeData | undefined, fallback: string) {
  return node && typeof node.label === "string" ? node.label : fallback
}

function useControllableValue<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const resolved = isControlled ? value : uncontrolled

  const setValue = (next: T) => {
    if (!isControlled) setUncontrolled(next)
    onChange?.(next)
  }

  return [resolved, setValue]
}

function TreeSelectOption({
  flat,
  index,
  id,
  highlighted,
  selected,
  checked,
  indeterminate,
  showCheckbox,
  withLines,
  chevronAriaLabels,
  renderNode,
  onToggleExpand,
  onSubmit,
  onHighlight,
}: {
  flat: FlatNode
  index: number
  id: string
  highlighted: boolean
  selected: boolean
  checked: boolean
  indeterminate: boolean
  showCheckbox: boolean
  withLines: boolean
  chevronAriaLabels: TreeSelectChevronAriaLabels | undefined
  renderNode:
    ((payload: TreeSelectRenderNodePayload) => React.ReactNode) | undefined
  onToggleExpand: (value: string) => void
  onSubmit: (value: string) => void
  onHighlight: (index: number) => void
}) {
  const { node, level, expanded, hasChildren, isLastChild, lineGuides } = flat
  const disabled = !!node.nodeProps?.disabled
  const active = selected || checked
  const showLines = withLines && level > 1

  const handleExpand = (event?: React.MouseEvent) => {
    event?.stopPropagation()
    event?.preventDefault()
    if (hasChildren) onToggleExpand(node.value)
  }

  const lineStart = (column: number) =>
    `calc(${basePadding} + ${column} * ${levelOffset} - ${levelOffset} / 2)`

  const style = {
    "--indent": `calc(${basePadding} + ${level - 1} * ${levelOffset} + ${showLines ? "0.3125rem" : "0rem"} + ${hasChildren ? "0rem" : "0.375rem"})`,
  } as React.CSSProperties

  const custom = renderNode?.({
    node,
    level,
    expanded,
    hasChildren,
    selected,
    checked,
    indeterminate,
    expand: handleExpand,
  })

  return (
    <div
      id={id}
      role="option"
      data-slot="tree-select-option"
      data-index={index}
      data-active={active || undefined}
      data-highlighted={highlighted || undefined}
      data-disabled={disabled || undefined}
      aria-selected={active}
      aria-disabled={disabled || undefined}
      aria-level={level}
      aria-expanded={hasChildren ? expanded : undefined}
      aria-checked={
        showCheckbox
          ? indeterminate && !checked
            ? "mixed"
            : checked
          : undefined
      }
      style={style}
      className="relative flex cursor-default items-center gap-1.5 rounded-md py-1.5 ps-(--indent) pe-2 text-sm outline-none select-none hover:bg-accent data-highlighted:bg-accent data-disabled:pointer-events-none data-disabled:opacity-50"
      onClick={() => {
        if (!disabled) onSubmit(node.value)
      }}
      onMouseMove={() => {
        if (!highlighted && !disabled) onHighlight(index)
      }}
    >
      {showLines && (
        <>
          {lineGuides.map((show, guide) =>
            show ? (
              <span
                key={guide}
                aria-hidden
                style={
                  { "--line-x": lineStart(guide + 1) } as React.CSSProperties
                }
                className="pointer-events-none absolute inset-y-0 start-(--line-x) w-px bg-border"
              />
            ) : null,
          )}
          <span
            aria-hidden
            data-last={isLastChild || undefined}
            style={{ "--line-x": lineStart(level - 1) } as React.CSSProperties}
            className="pointer-events-none absolute start-(--line-x) top-0 bottom-0 w-px bg-border data-last:bottom-1/2"
          />
          <span
            aria-hidden
            style={{ "--line-x": lineStart(level - 1) } as React.CSSProperties}
            className="pointer-events-none absolute start-(--line-x) top-1/2 h-px w-2.5 bg-border"
          />
        </>
      )}
      {custom ?? (
        <>
          {hasChildren && (
            <span
              role="button"
              tabIndex={-1}
              data-slot="tree-select-chevron"
              data-expanded={expanded || undefined}
              aria-label={
                expanded
                  ? (chevronAriaLabels?.collapse ?? "Collapse")
                  : (chevronAriaLabels?.expand ?? "Expand")
              }
              className="flex size-4 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground data-expanded:rotate-90"
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleExpand}
            >
              <ChevronRightIcon className="size-4 rtl:rotate-180" />
            </span>
          )}
          {showCheckbox && (
            <span
              aria-hidden
              data-slot="tree-select-checkbox"
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded border border-input transition-colors",
                (checked || indeterminate) &&
                  "border-primary bg-primary text-primary-foreground",
              )}
            >
              {checked ? (
                <CheckIcon className="size-3.5" />
              ) : indeterminate ? (
                <MinusIcon className="size-3.5" />
              ) : null}
            </span>
          )}
          <span className="min-w-0 flex-1 truncate">{node.label}</span>
          {!showCheckbox && active && (
            <CheckIcon className="size-4 shrink-0 text-muted-foreground" />
          )}
        </>
      )}
    </div>
  )
}

type TreeSelectProps<Mode extends TreeSelectMode = "single"> = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "size" | "prefix" | "type"
> & {
  /** Tree data. */
  data: TreeNodeData[]
  /** Selection mode: `checkbox` cascades checked state between parents and children. @default "single" */
  mode?: Mode
  /** Controlled value. */
  value?: TreeSelectValue<Mode>
  /** Uncontrolled initial value. */
  defaultValue?: TreeSelectValue<Mode>
  /** Called when the value changes. */
  onChange?: (value: TreeSelectValue<Mode>) => void
  /** Disables parent-child cascade in `checkbox` mode. @default false */
  checkStrictly?: boolean
  /** Which checked nodes appear in the value and pills in `checkbox` mode. @default "child" */
  checkedStrategy?: TreeSelectCheckedStrategy
  /** Values of nodes expanded by default. */
  defaultExpandedValues?: string[]
  /** Expand all nodes by default. @default false */
  defaultExpandAll?: boolean
  /** Controlled expanded node values. */
  expandedValues?: string[]
  /** Called when the expanded state changes. */
  onExpandedChange?: (values: string[]) => void
  /** Toggle expanded state when a parent node is clicked, not only its chevron. In `single` and `multiple` modes parents then only expand, so only leaves can be selected. In `checkbox` mode parent clicks both check and expand. @default false */
  expandOnClick?: boolean
  /** Enables search filtering. @default false */
  searchable?: boolean
  /** Controlled search value. */
  searchValue?: string
  /** Uncontrolled initial search value. */
  defaultSearchValue?: string
  /** Called when the search value changes. */
  onSearchChange?: (value: string) => void
  /** Custom search filter. */
  filter?: TreeSelectFilter
  /** Message shown when no nodes match the search. */
  nothingFoundMessage?: React.ReactNode
  /** Allows deselecting the selected node in `single` mode. @default true */
  allowDeselect?: boolean
  /** Shows a clear button when there is a value. @default false */
  clearable?: boolean
  /** Determines how the clear button and rightSection are rendered. @default "both" */
  clearSectionMode?: TreeSelectClearSectionMode
  /** Props passed down to the clear button. */
  clearButtonProps?: React.ComponentProps<typeof CloseButton>
  /** Maximum number of selected values in `multiple` and `checkbox` modes. */
  maxValues?: number
  /** Maximum number of pills before the overflow pill is shown. */
  maxDisplayedValues?: number
  /** Content of the overflow pill. Defaults to "+N more". */
  maxDisplayedValuesContent?:
    React.ReactNode | ((overflow: number) => React.ReactNode)
  /** Called with the removed value in `multiple` and `checkbox` modes. */
  onRemove?: (value: string) => void
  /** Called when the clear button is clicked. */
  onClear?: () => void
  /** Custom node rendering in the dropdown. */
  renderNode?: (payload: TreeSelectRenderNodePayload) => React.ReactNode
  /** Custom pill rendering in `multiple` and `checkbox` modes. Not used for the overflow pill. */
  renderPill?: (payload: TreeSelectRenderPillPayload) => React.ReactNode
  /** Render connecting lines between parents and children. @default true */
  withLines?: boolean
  /** Props passed down to the hidden input. */
  hiddenInputProps?: Omit<React.ComponentProps<"input">, "value">
  /** Separator of the hidden input values in `multiple` and `checkbox` modes. @default "," */
  hiddenInputValuesDivider?: string
  /** Props passed down to the dropdown scroll area. */
  scrollAreaProps?: React.ComponentProps<typeof ScrollArea>
  /** CSS color of the chevron. */
  chevronColor?: string
  /** Max dropdown height. @default 220 */
  maxDropdownHeight?: number | string
  /** Controlled dropdown opened state. */
  dropdownOpened?: boolean
  /** Uncontrolled initial dropdown opened state. */
  defaultDropdownOpened?: boolean
  /** Called when the dropdown opens. */
  onDropdownOpen?: () => void
  /** Called when the dropdown closes. */
  onDropdownClose?: () => void
  /** Props passed down to the dropdown positioner. */
  comboboxProps?: TreeSelectDropdownProps
  /** Clear the search query when the selection changes. @default true */
  clearSearchOnChange?: boolean
  /** Open the dropdown on focus when `searchable`. @default true */
  openOnFocus?: boolean
  /** aria-label values of the expand and collapse chevron. */
  chevronAriaLabels?: TreeSelectChevronAriaLabels
  /** Controls input height and section width. @default "sm" */
  size?: TreeSelectSize
  /** Border radius. */
  radius?: TreeSelectRadius
  /** Input appearance. @default "default" */
  variant?: TreeSelectVariant
  /** Marks the input as invalid. */
  error?: boolean
  /** Content rendered at the start of the input. */
  leftSection?: React.ReactNode
  /** Content rendered at the end of the input, replaces the chevron. */
  rightSection?: React.ReactNode
  /** Pointer events of the left section. @default "none" */
  leftSectionPointerEvents?: "none" | "all"
  /** Pointer events of the right section. @default "none" */
  rightSectionPointerEvents?: "none" | "all"
  /** Root element className. */
  wrapperClassName?: string
}

function TreeSelect<Mode extends TreeSelectMode = "single">({
  data,
  mode = "single" as Mode,
  value,
  defaultValue,
  onChange,
  checkStrictly = false,
  checkedStrategy = "child",
  defaultExpandedValues,
  defaultExpandAll = false,
  expandedValues,
  onExpandedChange,
  expandOnClick = false,
  searchable = false,
  searchValue,
  defaultSearchValue,
  onSearchChange,
  filter,
  nothingFoundMessage,
  allowDeselect = true,
  clearable = false,
  clearSectionMode = "both",
  clearButtonProps,
  maxValues = Infinity,
  maxDisplayedValues,
  maxDisplayedValuesContent,
  onRemove,
  onClear,
  renderNode,
  renderPill,
  withLines = true,
  hiddenInputProps,
  hiddenInputValuesDivider = ",",
  scrollAreaProps,
  chevronColor,
  maxDropdownHeight = 220,
  dropdownOpened,
  defaultDropdownOpened = false,
  onDropdownOpen,
  onDropdownClose,
  comboboxProps,
  clearSearchOnChange = true,
  openOnFocus = true,
  chevronAriaLabels,
  size = "sm",
  radius,
  variant = "default",
  error,
  leftSection,
  rightSection,
  leftSectionPointerEvents = "none",
  rightSectionPointerEvents = "none",
  wrapperClassName,
  className,
  placeholder,
  name,
  form,
  disabled,
  readOnly,
  onKeyDown,
  onFocus,
  onBlur,
  onClick,
  ref,
  id,
  ...rest
}: TreeSelectProps<Mode>) {
  const isMulti = mode === "multiple" || mode === "checkbox"
  const isCheckbox = mode === "checkbox"
  const generatedId = React.useId()
  const listId = `${generatedId}-list`
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const canInteract = !disabled && !readOnly

  const setInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node
    if (typeof ref === "function") ref(node)
    else if (ref) ref.current = node
  }

  const [current, setCurrent] = useControllableValue<string | string[] | null>(
    value as string | string[] | null | undefined,
    (defaultValue ?? (isMulti ? [] : null)) as string | string[] | null,
    onChange as ((next: string | string[] | null) => void) | undefined,
  )

  const nodeLookup = React.useMemo(() => {
    const lookup: Record<string, TreeNodeData> = {}
    const walk = (nodes: TreeNodeData[]) => {
      for (const node of nodes) {
        lookup[node.value] = node
        if (Array.isArray(node.children)) walk(node.children)
      }
    }
    walk(data)
    return lookup
  }, [data])

  const getNodeLabel = (nodeValue: string) =>
    labelOf(nodeLookup[nodeValue], nodeValue)

  const [expandedRecord, setExpandedRecord] =
    useControllableValue<TreeExpandedState>(
      React.useMemo(
        () =>
          expandedValues
            ? getTreeExpandedState(data, expandedValues)
            : undefined,
        [expandedValues, data],
      ),
      React.useMemo(
        () =>
          getTreeExpandedState(
            data,
            defaultExpandAll ? "*" : (defaultExpandedValues ?? []),
          ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
      ),
      (next) =>
        onExpandedChange?.(
          Object.entries(next)
            .filter(([, expanded]) => expanded)
            .map(([key]) => key),
        ),
    )

  const toggleExpand = (nodeValue: string) =>
    setExpandedRecord({
      ...expandedRecord,
      [nodeValue]: !expandedRecord[nodeValue],
    })

  const [search, setSearchRaw] = useControllableValue<string>(
    searchValue,
    defaultSearchValue ??
      (mode === "single" && typeof (value ?? defaultValue) === "string"
        ? labelOf(
            findTreeNode((value ?? defaultValue) as string, data) ?? undefined,
            "",
          )
        : ""),
    onSearchChange,
  )

  const [highlight, setHighlight] = React.useState(-1)

  const setSearch = (next: string) => {
    setSearchRaw(next)
    setHighlight(-1)
  }

  const singleValue = mode === "single" ? (current as string | null) : null

  const [syncedValue, setSyncedValue] = React.useState(singleValue)
  if (syncedValue !== singleValue) {
    setSyncedValue(singleValue)
    if (mode === "single" && searchable && searchValue === undefined) {
      setSearchRaw(singleValue ? getNodeLabel(singleValue) : "")
    }
  }

  const checkedValues = Array.isArray(current) ? current : []
  const internalChecked = React.useMemo(() => {
    if (!isCheckbox) return []
    return checkStrictly
      ? checkedValues
      : expandToLeafChecked(checkedValues, data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckbox, current, data, checkStrictly])

  const checkedStatuses = React.useMemo(
    () =>
      new Map(
        getAllCheckedNodes(data, internalChecked).result.map((item) => [
          item.value,
          item,
        ]),
      ),
    [data, internalChecked],
  )

  const isNodeChecked = (nodeValue: string) =>
    checkStrictly
      ? internalChecked.includes(nodeValue)
      : (checkedStatuses.get(nodeValue)?.checked ?? false)

  const isNodeIndeterminate = (nodeValue: string) =>
    !checkStrictly && (checkedStatuses.get(nodeValue)?.indeterminate ?? false)

  const filteredData = React.useMemo(() => {
    if (!searchable || !search) return data
    if (mode === "single" && singleValue) {
      const node = findTreeNode(singleValue, data)
      if (node && search === labelOf(node, "")) return data
    }
    return filterTreeData(data, search, filter)
  }, [data, search, filter, searchable, mode, singleValue])

  const expandedForRender = React.useMemo(() => {
    if (search && filteredData !== data) {
      const expanded = { ...expandedRecord }
      const expandParents = (nodes: TreeNodeData[]) => {
        for (const node of nodes) {
          if (hasLoadedChildren(node)) {
            expanded[node.value] = true
            expandParents(node.children!)
          }
        }
      }
      expandParents(filteredData)
      return expanded
    }
    return expandedRecord
  }, [filteredData, expandedRecord, search, data])

  const flatNodes = React.useMemo(
    () => flattenTreeSelectData(filteredData, expandedForRender),
    [filteredData, expandedForRender],
  )

  const [openedState, setOpenedState] = React.useState(defaultDropdownOpened)
  const opened = (dropdownOpened ?? openedState) && canInteract

  const isActiveNode = (nodeValue: string) =>
    mode === "single"
      ? singleValue === nodeValue
      : mode === "multiple"
        ? checkedValues.includes(nodeValue)
        : isNodeChecked(nodeValue)

  const setOpened = (next: boolean) => {
    if (next === opened) return
    if (dropdownOpened === undefined) setOpenedState(next)
    if (next) onDropdownOpen?.()
    else onDropdownClose?.()
  }

  const openDropdown = () => {
    if (!canInteract || opened) return
    let nodes = flatNodes
    if (
      searchable &&
      current &&
      (!Array.isArray(current) || current.length > 0)
    ) {
      const next = { ...expandedRecord }
      let changed = false
      for (const target of Array.isArray(current) ? current : [current]) {
        for (const ancestor of getAncestorsToNode(target, data) ?? []) {
          if (!next[ancestor]) {
            next[ancestor] = true
            changed = true
          }
        }
      }
      if (changed) {
        setExpandedRecord(next)
        nodes = flattenTreeSelectData(filteredData, next)
      }
    }
    setHighlight(nodes.findIndex((flat) => isActiveNode(flat.node.value)))
    setOpened(true)
  }

  const closeDropdown = () => {
    setOpened(false)
    setHighlight(-1)
  }

  const toggleDropdown = () => (opened ? closeDropdown() : openDropdown())

  React.useEffect(() => {
    if (!opened || highlight < 0) return
    document
      .getElementById(`${listId}-${highlight}`)
      ?.scrollIntoView({ block: "nearest" })
  }, [opened, highlight, listId])

  const handleOptionSubmit = (val: string) => {
    const node = findTreeNode(val, data)
    const isParent = !!node && hasLoadedChildren(node)

    if (mode === "single") {
      if (expandOnClick && isParent) {
        toggleExpand(val)
        return
      }
      const next = allowDeselect && val === singleValue ? null : val
      setCurrent(next)
      closeDropdown()
      if (clearSearchOnChange) setSearch(next ? getNodeLabel(next) : "")
      return
    }

    if (mode === "multiple") {
      if (expandOnClick && isParent) {
        toggleExpand(val)
        return
      }
      if (checkedValues.includes(val)) {
        setCurrent(checkedValues.filter((item) => item !== val))
        onRemove?.(val)
      } else if (checkedValues.length < maxValues) {
        setCurrent([...checkedValues, val])
      } else {
        return
      }
      if (clearSearchOnChange) setSearch("")
      return
    }

    const nodeChecked = isNodeChecked(val)
    let nextChecked: string[]
    if (checkStrictly) {
      nextChecked = nodeChecked
        ? internalChecked.filter((item) => item !== val)
        : [...internalChecked, val]
    } else {
      const leaves = getChildrenNodesValues(val, data)
      nextChecked = nodeChecked
        ? internalChecked.filter((item) => !leaves.includes(item))
        : Array.from(new Set([...internalChecked, ...leaves]))
    }

    const nextValue = checkedToValue(nextChecked, data, checkedStrategy)
    if (!nodeChecked && nextValue.length > maxValues) return
    setCurrent(nextValue)
    if (clearSearchOnChange) setSearch("")

    if (expandOnClick && isParent && !expandedRecord[val]) toggleExpand(val)
  }

  const moveHighlight = (direction: 1 | -1) => {
    const count = flatNodes.length
    if (count === 0) return
    let index = highlight
    for (let step = 0; step < count; step++) {
      index =
        index < 0
          ? direction === 1
            ? 0
            : count - 1
          : (index + direction + count) % count
      if (!flatNodes[index].node.nodeProps?.disabled) {
        setHighlight(index)
        return
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented || !canInteract) return

    if (event.key === " " && !searchable) {
      event.preventDefault()
      toggleDropdown()
      return
    }

    if (event.key === "Backspace" && isMulti && search.length === 0) {
      if (checkedValues.length > 0) {
        removePillValue(checkedValues[checkedValues.length - 1])
      }
      return
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      if (!opened) openDropdown()
      else moveHighlight(event.key === "ArrowDown" ? 1 : -1)
      return
    }

    if (event.key === "Escape") {
      if (opened) {
        event.preventDefault()
        closeDropdown()
      }
      return
    }

    if (event.key === "Enter") {
      if (!opened) {
        event.preventDefault()
        openDropdown()
      } else if (highlight >= 0 && highlight < flatNodes.length) {
        event.preventDefault()
        handleOptionSubmit(flatNodes[highlight].node.value)
      }
      return
    }

    if (!opened || highlight < 0 || highlight >= flatNodes.length) return
    const currentNode = flatNodes[highlight]

    if (event.key === "ArrowRight") {
      if (currentNode.hasChildren && !currentNode.expanded) {
        event.preventDefault()
        toggleExpand(currentNode.node.value)
      }
    }

    if (event.key === "ArrowLeft") {
      if (currentNode.hasChildren && currentNode.expanded) {
        event.preventDefault()
        toggleExpand(currentNode.node.value)
      } else if (currentNode.parent) {
        event.preventDefault()
        const parentIndex = flatNodes.findIndex(
          (flat) => flat.node.value === currentNode.parent,
        )
        if (parentIndex >= 0) setHighlight(parentIndex)
      }
    }
  }

  const removePillValue = (item: string) => {
    if (isCheckbox) {
      const leaves = checkStrictly ? [item] : getChildrenNodesValues(item, data)
      setCurrent(
        checkedToValue(
          internalChecked.filter((entry) => !leaves.includes(entry)),
          data,
          checkedStrategy,
        ),
      )
    } else {
      setCurrent(checkedValues.filter((entry) => entry !== item))
    }
    onRemove?.(item)
  }

  const hasValue = isMulti ? checkedValues.length > 0 : !!singleValue
  const showClear = clearable && hasValue && canInteract
  const showRightSection =
    showClear && clearSectionMode === "clear" ? false : true
  const showClearButton = showClear && clearSectionMode !== "rightSection"
  const config = sizeClasses[size]
  const endPadding =
    showRightSection && showClearButton
      ? config.end2
      : showRightSection || showClearButton
        ? config.end
        : undefined

  const chevron = (
    <ChevronDownIcon
      className="size-4"
      style={chevronColor ? { color: chevronColor } : undefined}
    />
  )

  const fieldClassName = cn(
    radius && radiusClasses[radius],
    variantClasses[variant],
    leftSection && config.start,
    endPadding,
    className,
  )

  const comboboxAria = {
    role: "combobox",
    "aria-expanded": opened,
    "aria-haspopup": "listbox",
    "aria-controls": opened ? listId : undefined,
    "aria-activedescendant":
      opened && highlight >= 0 ? `${listId}-${highlight}` : undefined,
    "aria-invalid": error || undefined,
    autoComplete: "off",
  } as const

  const visibleValues =
    maxDisplayedValues != null
      ? checkedValues.slice(0, maxDisplayedValues)
      : checkedValues
  const overflowCount =
    maxDisplayedValues != null
      ? Math.max(0, checkedValues.length - maxDisplayedValues)
      : 0

  const dropdownWidth = comboboxProps?.width
  const maxHeightStyle = {
    "--tree-select-max-height":
      typeof maxDropdownHeight === "number"
        ? `${maxDropdownHeight}px`
        : maxDropdownHeight,
  } as React.CSSProperties

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event)
    closeDropdown()
    if (isMulti) setSearch("")
    else setSearch(singleValue ? getNodeLabel(singleValue) : "")
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(event)
    if (openOnFocus && searchable) openDropdown()
  }

  const hiddenValue = isMulti
    ? checkedValues.join(hiddenInputValuesDivider)
    : (singleValue ?? "")

  return (
    <>
      <PopoverPrimitive.Root
        open={opened}
        onOpenChange={(next, details) => {
          if (next) return
          if (
            details.reason === "outside-press" &&
            wrapperRef.current?.contains(details.event.target as Node)
          ) {
            return
          }
          closeDropdown()
        }}
      >
        <div
          ref={wrapperRef}
          data-slot="tree-select"
          data-mode={mode}
          data-disabled={disabled ? "" : undefined}
          className={cn("relative w-full", wrapperClassName)}
        >
          {leftSection && (
            <div
              data-slot="tree-select-left-section"
              className={cn(
                "absolute inset-y-0 start-0 z-10 flex items-center justify-center text-muted-foreground",
                config.section,
                pointerEventsClasses[leftSectionPointerEvents],
              )}
            >
              {leftSection}
            </div>
          )}
          {isMulti ? (
            <PillsInput
              disabled={disabled}
              aria-invalid={error || undefined}
              data-expanded={opened || undefined}
              className={cn(config.pills, fieldClassName)}
              onClick={() => {
                if (!canInteract) return
                if (searchable) openDropdown()
                else toggleDropdown()
              }}
            >
              <PillGroup size={size} disabled={disabled}>
                {visibleValues.map((item, index) =>
                  renderPill ? (
                    <React.Fragment key={`${item}-${index}`}>
                      {renderPill({
                        node: nodeLookup[item] ?? { value: item, label: item },
                        value: item,
                        onRemove: () => removePillValue(item),
                        disabled,
                        readOnly,
                      })}
                    </React.Fragment>
                  ) : (
                    <Pill
                      key={`${item}-${index}`}
                      withRemoveButton={!readOnly}
                      onRemove={() => removePillValue(item)}
                      disabled={disabled}
                    >
                      {getNodeLabel(item)}
                    </Pill>
                  ),
                )}
                {overflowCount > 0 && (
                  <Pill disabled={disabled}>
                    {typeof maxDisplayedValuesContent === "function"
                      ? maxDisplayedValuesContent(overflowCount)
                      : (maxDisplayedValuesContent ?? `+${overflowCount} more`)}
                  </Pill>
                )}
                <PillsInputField
                  {...rest}
                  {...comboboxAria}
                  id={id}
                  ref={setInputRef}
                  type={
                    !searchable && !(placeholder && checkedValues.length === 0)
                      ? "hidden"
                      : "visible"
                  }
                  pointer={!searchable}
                  placeholder={
                    checkedValues.length === 0 ? placeholder : undefined
                  }
                  value={search}
                  disabled={disabled}
                  readOnly={readOnly || !searchable}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  onChange={(event) => {
                    setSearch(event.currentTarget.value)
                    if (searchable) openDropdown()
                  }}
                />
              </PillGroup>
            </PillsInput>
          ) : (
            <Input
              {...rest}
              {...comboboxAria}
              id={id}
              ref={setInputRef}
              type="text"
              disabled={disabled}
              readOnly={readOnly || !searchable}
              placeholder={placeholder}
              value={
                searchable
                  ? search
                  : singleValue
                    ? getNodeLabel(singleValue)
                    : ""
              }
              data-expanded={opened || undefined}
              className={cn(
                config.input,
                !searchable && "cursor-pointer",
                fieldClassName,
              )}
              onChange={(event) => {
                setSearch(event.currentTarget.value)
                openDropdown()
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onClick={(event) => {
                onClick?.(event)
                if (!canInteract) return
                if (searchable) openDropdown()
                else toggleDropdown()
              }}
              onKeyDown={handleKeyDown}
            />
          )}
          {(showRightSection || showClearButton) && (
            <div
              data-slot="tree-select-right-section"
              className="absolute inset-y-0 end-0 z-10 flex items-center justify-center text-muted-foreground"
            >
              {showRightSection && (
                <div
                  className={cn(
                    "flex items-center justify-center",
                    config.section,
                    pointerEventsClasses[rightSectionPointerEvents],
                  )}
                >
                  {rightSection ?? chevron}
                </div>
              )}
              {showClearButton && (
                <div
                  className={cn(
                    "flex items-center justify-center",
                    config.section,
                  )}
                >
                  <CloseButton
                    aria-label="Clear value"
                    size={size}
                    {...clearButtonProps}
                    onMouseDown={(event) => {
                      event.preventDefault()
                      clearButtonProps?.onMouseDown?.(event)
                    }}
                    onClick={(event) => {
                      clearButtonProps?.onClick?.(event)
                      onClear?.()
                      setCurrent(isMulti ? [] : null)
                      setSearch("")
                      inputRef.current?.focus()
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <PopoverContent
          data-slot="tree-select-content"
          anchor={wrapperRef}
          align={comboboxProps?.align ?? "start"}
          side={comboboxProps?.side}
          sideOffset={comboboxProps?.sideOffset}
          alignOffset={comboboxProps?.alignOffset}
          initialFocus={false}
          finalFocus={false}
          onMouseDown={(event) => event.preventDefault()}
          style={
            dropdownWidth && dropdownWidth !== "target"
              ? { width: dropdownWidth }
              : undefined
          }
          className={cn(
            "gap-0 p-1",
            (!dropdownWidth || dropdownWidth === "target") &&
              "w-(--anchor-width)",
            comboboxProps?.className,
          )}
        >
          <div style={maxHeightStyle}>
            <ScrollArea
              {...scrollAreaProps}
              className={cn(
                "[&_[data-slot=scroll-area-viewport]]:max-h-(--tree-select-max-height)",
                scrollAreaProps?.className,
              )}
            >
              <div
                id={listId}
                role="listbox"
                aria-multiselectable={isMulti || undefined}
              >
                {flatNodes.map((flat, index) => (
                  <TreeSelectOption
                    key={flat.node.value}
                    flat={flat}
                    index={index}
                    id={`${listId}-${index}`}
                    highlighted={index === highlight}
                    selected={!isCheckbox && isActiveNode(flat.node.value)}
                    checked={isCheckbox && isNodeChecked(flat.node.value)}
                    indeterminate={
                      isCheckbox && isNodeIndeterminate(flat.node.value)
                    }
                    showCheckbox={isCheckbox}
                    withLines={withLines}
                    chevronAriaLabels={chevronAriaLabels}
                    renderNode={renderNode}
                    onToggleExpand={toggleExpand}
                    onSubmit={handleOptionSubmit}
                    onHighlight={setHighlight}
                  />
                ))}
                {flatNodes.length === 0 && nothingFoundMessage && (
                  <div className="px-2 py-1.5 text-center text-sm text-muted-foreground">
                    {nothingFoundMessage}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </PopoverPrimitive.Root>
      <input
        type="hidden"
        name={name}
        form={form}
        disabled={disabled}
        value={hiddenValue}
        {...hiddenInputProps}
      />
    </>
  )
}

export { TreeSelect }
export type {
  TreeSelectChevronAriaLabels,
  TreeSelectCheckedStrategy,
  TreeSelectClearSectionMode,
  TreeSelectDropdownProps,
  TreeSelectFilter,
  TreeSelectMode,
  TreeSelectProps,
  TreeSelectRadius,
  TreeSelectRenderNodePayload,
  TreeSelectRenderPillPayload,
  TreeSelectSize,
  TreeSelectValue,
  TreeSelectVariant,
}
export type { TreeNodeData } from "@/hooks/use-tree"
