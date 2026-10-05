import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { cn } from "cn"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { PopoverContent } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CascaderOption {
  /** Option value, must be unique across the whole data tree. */
  value: string
  /** Option label. Falls back to `value`. */
  label?: React.ReactNode
  /** Nested options. */
  children?: CascaderOption[]
  /** The option cannot be selected or expanded. */
  disabled?: boolean
}

interface CascaderFormatValueInput {
  value: string[]
  options: CascaderOption[]
}

type CascaderFormatValue = (input: CascaderFormatValueInput) => React.ReactNode

interface CascaderFlatPath {
  path: string[]
  options: CascaderOption[]
  leaf: boolean
  disabled: boolean
}

function hasChildren(option: CascaderOption) {
  return Array.isArray(option.children) && option.children.length > 0
}

function getColumns(data: CascaderOption[], activePath: string[]) {
  const columns: CascaderOption[][] = [data]
  let level: CascaderOption[] = data

  for (const value of activePath) {
    const node = level.find((option) => option.value === value)
    if (!node || !hasChildren(node)) break
    level = node.children!
    columns.push(level)
  }

  return columns
}

function getPathOptions(data: CascaderOption[], value: string[] | null) {
  const options: CascaderOption[] = []
  let level: CascaderOption[] | undefined = data

  for (const current of value ?? []) {
    const node: CascaderOption | undefined = level?.find(
      (option) => option.value === current,
    )
    if (!node) break
    options.push(node)
    level = node.children
  }

  return options
}

function flattenPaths(data: CascaderOption[]) {
  const result: CascaderFlatPath[] = []

  const walk = (
    nodes: CascaderOption[],
    parentPath: string[],
    parentOptions: CascaderOption[],
    parentDisabled: boolean,
  ) => {
    for (const node of nodes) {
      const path = [...parentPath, node.value]
      const options = [...parentOptions, node]
      const disabled = parentDisabled || !!node.disabled
      result.push({ path, options, leaf: !hasChildren(node), disabled })
      if (hasChildren(node)) walk(node.children!, path, options, disabled)
    }
  }

  walk(data, [], [], false)
  return result
}

function findEnabledIndex(
  options: CascaderOption[],
  from: number,
  direction: 1 | -1,
) {
  let index = from + direction
  while (index >= 0 && index < options.length) {
    if (!options[index].disabled) return index
    index += direction
  }
  return -1
}

function pathsEqual(a: string[] | null, b: string[]) {
  return !!a && a.length === b.length && a.every((item, i) => item === b[i])
}

function labelToString(option: CascaderOption) {
  return typeof option.label === "string" || typeof option.label === "number"
    ? String(option.label)
    : option.value
}

function joinLabels(options: CascaderOption[], separator: string) {
  return options.map(labelToString).join(` ${separator} `)
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

type CascaderProps = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "size" | "prefix" | "type"
> & {
  /** Hierarchical options. */
  data: CascaderOption[]
  /** Controlled selected path, from root to node. */
  value?: string[] | null
  /** Uncontrolled initial selected path. */
  defaultValue?: string[] | null
  /** Called with the new path and the resolved option chain. */
  onChange?: (value: string[] | null, options: CascaderOption[]) => void
  /** Allows selecting intermediate options, not only leaves. @default false */
  changeOnSelect?: boolean
  /** Closes the dropdown on selection. Defaults to `!allowDeselect`. */
  closeOnSelect?: boolean
  /** Selecting the selected path again clears it. @default true */
  allowDeselect?: boolean
  /** Shows a check icon on the selected option. @default true */
  withCheckIcon?: boolean
  /** @default "right" */
  checkIconPosition?: "left" | "right"
  /** Renders cascading columns. When `false`, options are a flat list of paths. @default true */
  withColumns?: boolean
  /** How the next column is opened. @default "click" */
  expandTrigger?: "click" | "hover"
  /** Lets the user search the flattened paths. @default false */
  searchable?: boolean
  /** Controlled search value. */
  searchValue?: string
  /** Uncontrolled initial search value. */
  defaultSearchValue?: string
  /** Called when the search value changes. */
  onSearchChange?: (value: string) => void
  /** Custom search filter, matched against the full option chain. */
  filter?: (query: string, options: CascaderOption[]) => boolean
  /** Custom rendering of a search result row. */
  renderSearchOption?: (
    query: string,
    options: CascaderOption[],
  ) => React.ReactNode
  /** Formats the path shown in the input. Only string/number results are used. */
  formatValue?: CascaderFormatValue
  /** Custom rendering of a column option. */
  renderOption?: (option: CascaderOption, level: number) => React.ReactNode
  /** Path separator in the input and search results. @default "/" */
  separator?: React.ReactNode
  /** Width of each column. */
  columnWidth?: number | string
  /** Max columns shown side by side; deeper levels page in. @default 3 */
  maxDisplayedLevels?: number
  /** @default "Show previous levels" */
  previousLevelsControlLabel?: string
  /** @default "Show next levels" */
  nextLevelsControlLabel?: string
  /** Max height of a column before it scrolls. @default 260 */
  maxDropdownHeight?: number | string
  /** Message shown when there are no options or search results. */
  nothingFoundMessage?: React.ReactNode
  /** Shows a clear button when a value is selected. @default false */
  clearable?: boolean
  /** Called when the clear button is clicked. */
  onClear?: () => void
  /** Controlled dropdown opened state. */
  dropdownOpened?: boolean
  /** Uncontrolled initial dropdown opened state. @default false */
  defaultDropdownOpened?: boolean
  /** Called when the dropdown opens. */
  onDropdownOpen?: () => void
  /** Called when the dropdown closes. */
  onDropdownClose?: () => void
  /** Opens the dropdown on focus when `searchable`. @default true */
  openOnFocus?: boolean
  /** Content rendered before the input. */
  leftSection?: React.ReactNode
  /** Content rendered after the input, before the chevron. */
  rightSection?: React.ReactNode
}

const flatOptionClass =
  "relative flex w-full cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-hidden select-none"

function Cascader({
  data,
  value,
  defaultValue = null,
  onChange,
  changeOnSelect = false,
  closeOnSelect,
  allowDeselect = true,
  withCheckIcon = true,
  checkIconPosition = "right",
  withColumns = true,
  expandTrigger = "click",
  searchable = false,
  searchValue,
  defaultSearchValue,
  onSearchChange,
  filter,
  renderSearchOption,
  formatValue,
  renderOption,
  separator = "/",
  columnWidth,
  maxDisplayedLevels = 3,
  previousLevelsControlLabel = "Show previous levels",
  nextLevelsControlLabel = "Show next levels",
  maxDropdownHeight = 260,
  nothingFoundMessage,
  clearable = false,
  onClear,
  dropdownOpened,
  defaultDropdownOpened = false,
  onDropdownOpen,
  onDropdownClose,
  openOnFocus = true,
  leftSection,
  rightSection,
  disabled = false,
  readOnly = false,
  name,
  form,
  id,
  className,
  onKeyDown,
  onFocus,
  onBlur,
  onClick,
  ...props
}: CascaderProps) {
  const generatedId = React.useId()
  const listId = `${id ?? generatedId}-cascader-list`
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const separatorString =
    typeof separator === "string" || typeof separator === "number"
      ? String(separator)
      : "/"

  const [currentValue, setCurrentValue] = useControllableValue<string[] | null>(
    value,
    defaultValue,
    (next) => onChange?.(next, getPathOptions(data, next)),
  )
  const [open, setOpen] = useControllableValue(
    dropdownOpened,
    defaultDropdownOpened,
    (next) => (next ? onDropdownOpen?.() : onDropdownClose?.()),
  )
  const [activePath, setActivePath] = React.useState<string[]>(
    () => currentValue ?? [],
  )
  const [keyboardNav, setKeyboardNav] = React.useState(false)
  const [flatIndex, setFlatIndex] = React.useState(-1)

  const canInteract = !readOnly && !disabled
  const isOpen = open && canInteract
  const shouldCloseOnSelect = closeOnSelect ?? !allowDeselect

  const pathOptions = React.useMemo(
    () => getPathOptions(data, currentValue),
    [data, currentValue],
  )

  const displayString = React.useMemo(() => {
    if (!currentValue || pathOptions.length === 0) return ""
    if (formatValue) {
      const rendered = formatValue({
        value: currentValue,
        options: pathOptions,
      })
      if (typeof rendered === "string" || typeof rendered === "number") {
        return String(rendered)
      }
    }
    return joinLabels(pathOptions, separatorString)
  }, [currentValue, pathOptions, formatValue, separatorString])

  const [search, setSearch] = useControllableValue(
    searchValue,
    defaultSearchValue ?? (searchable ? displayString : ""),
    onSearchChange,
  )

  const openDropdown = () => {
    if (!open) {
      setActivePath(currentValue ?? [])
      setFlatIndex(-1)
      setOpen(true)
    }
  }

  const closeDropdown = () => {
    if (open) {
      setOpen(false)
      if (searchable) setSearch(currentValue ? displayString : "")
    }
  }

  const prevValueKey = React.useRef(JSON.stringify(currentValue))
  React.useEffect(() => {
    const key = JSON.stringify(currentValue)
    if (key === prevValueKey.current) return
    prevValueKey.current = key
    if (searchable) setSearch(currentValue ? displayString : "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue])

  const isSearching =
    searchable && search.trim().length > 0 && search !== displayString
  const showFlatList = isSearching || !withColumns

  const flatPaths = React.useMemo(() => flattenPaths(data), [data])
  const flatItems = React.useMemo(() => {
    if (!showFlatList) return []
    const base = flatPaths.filter((item) => changeOnSelect || item.leaf)
    if (!isSearching) return base
    const query = search.trim().toLowerCase()
    return base.filter((item) =>
      filter
        ? filter(search, item.options)
        : joinLabels(item.options, separatorString)
            .toLowerCase()
            .includes(query),
    )
  }, [
    flatPaths,
    showFlatList,
    isSearching,
    search,
    changeOnSelect,
    filter,
    separatorString,
  ])

  const selectPath = (path: string[]) => {
    setCurrentValue(
      allowDeselect && pathsEqual(currentValue, path) ? null : path,
    )
  }

  const expandOption = (level: number, option: CascaderOption) => {
    const optionPath = [...activePath.slice(0, level), option.value]
    if (hasChildren(option)) {
      const first = findEnabledIndex(option.children!, -1, 1)
      setActivePath(
        first >= 0
          ? [...optionPath, option.children![first].value]
          : optionPath,
      )
    } else {
      setActivePath(optionPath)
    }
  }

  const activateOption = (level: number, option: CascaderOption) => {
    const path = [...activePath.slice(0, level), option.value]
    if (hasChildren(option)) {
      if (changeOnSelect) selectPath(path)
      expandOption(level, option)
      if (changeOnSelect && shouldCloseOnSelect) closeDropdown()
    } else {
      selectPath(path)
      if (shouldCloseOnSelect) closeDropdown()
    }
  }

  const selectFlatItem = (item: CascaderFlatPath) => {
    if (item.disabled) return
    selectPath(item.path)
    setActivePath(item.path)
    if (shouldCloseOnSelect) closeDropdown()
  }

  const handleColumnsKeyDown = (event: React.KeyboardEvent) => {
    setKeyboardNav(true)
    const columns = getColumns(data, activePath)
    const level = Math.max(0, activePath.length - 1)
    const column = columns[level] ?? columns[0] ?? []
    const index = column.findIndex((item) => item.value === activePath[level])
    const focused = index >= 0 ? column[index] : undefined

    switch (event.key) {
      case "ArrowDown": {
        const next = findEnabledIndex(column, index, 1)
        if (next >= 0) {
          setActivePath([...activePath.slice(0, level), column[next].value])
        }
        return true
      }
      case "ArrowUp": {
        const prev = findEnabledIndex(
          column,
          index < 0 ? column.length : index,
          -1,
        )
        if (prev >= 0) {
          setActivePath([...activePath.slice(0, level), column[prev].value])
        }
        return true
      }
      case "ArrowRight":
        if (focused && hasChildren(focused)) expandOption(level, focused)
        return true
      case "ArrowLeft":
        if (activePath.length > 1) setActivePath(activePath.slice(0, -1))
        return true
      case "Enter":
        if (!focused) return false
        activateOption(level, focused)
        return true
      default:
        return false
    }
  }

  const handleFlatKeyDown = (event: React.KeyboardEvent) => {
    const move = (from: number, direction: 1 | -1) => {
      let next = from + direction
      while (next >= 0 && next < flatItems.length) {
        if (!flatItems[next].disabled) return next
        next += direction
      }
      return -1
    }

    if (event.key === "ArrowDown") {
      const next = move(flatIndex, 1)
      if (next >= 0) setFlatIndex(next)
      return true
    }
    if (event.key === "ArrowUp") {
      const next = move(flatIndex < 0 ? flatItems.length : flatIndex, -1)
      if (next >= 0) setFlatIndex(next)
      return true
    }
    if (event.key === "Enter" && flatItems[flatIndex]) {
      selectFlatItem(flatItems[flatIndex])
      return true
    }
    return false
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event)

    if (event.key === "Escape") {
      closeDropdown()
      return
    }
    if (!canInteract) return

    if (!isOpen) {
      const opens =
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowRight" ||
        event.key === "Enter" ||
        (!searchable && event.key === " ")
      if (!opens) return
      event.preventDefault()
      setKeyboardNav(true)
      openDropdown()
      if (
        !showFlatList &&
        !currentValue &&
        (event.key === "ArrowDown" || event.key === "ArrowUp")
      ) {
        const rootIndex =
          event.key === "ArrowDown"
            ? findEnabledIndex(data, -1, 1)
            : findEnabledIndex(data, data.length, -1)
        if (rootIndex >= 0) setActivePath([data[rootIndex].value])
      }
      return
    }

    const handled = showFlatList
      ? handleFlatKeyDown(event)
      : handleColumnsKeyDown(event)
    if (handled || (!searchable && event.key === " ")) event.preventDefault()
  }

  const hasValue = !!currentValue && currentValue.length > 0
  const showClear = clearable && hasValue && canInteract

  const allColumns = getColumns(data, activePath)
  const totalColumns = allColumns.length
  const maxLevels = maxDisplayedLevels > 0 ? maxDisplayedLevels : totalColumns
  const maxOffset = Math.max(0, totalColumns - maxLevels)
  const focusedLevel = activePath.length - 1

  // Reset synchronously when the active path changes so the focused column stays visible.
  const activePathKey = JSON.stringify(activePath)
  const [windowState, setWindowState] = React.useState({
    key: activePathKey,
    offset: 0,
  })
  const windowOffset =
    windowState.key === activePathKey ? windowState.offset : 0
  if (windowState.key !== activePathKey) {
    setWindowState({ key: activePathKey, offset: 0 })
  }
  const shiftWindow = (delta: number) =>
    setWindowState((current) => ({
      key: activePathKey,
      offset: Math.min(maxOffset, Math.max(0, current.offset + delta)),
    }))

  const windowStart = Math.max(0, maxOffset - Math.min(windowOffset, maxOffset))
  const windowEnd = Math.min(totalColumns, windowStart + maxLevels)
  const visibleColumns = allColumns.slice(windowStart, windowEnd)
  const hiddenBefore = windowStart
  const hiddenAfter = totalColumns - windowEnd

  const optionId = (level: number, index: number) =>
    `${listId}-${level}-${index}`
  const activeColumn = allColumns[focusedLevel]
  const activeIndex =
    activeColumn?.findIndex((o) => o.value === activePath[focusedLevel]) ?? -1
  const activeDescendant = !isOpen
    ? undefined
    : showFlatList
      ? flatIndex >= 0
        ? `${listId}-flat-${flatIndex}`
        : undefined
      : keyboardNav && activeIndex >= 0
        ? optionId(focusedLevel, activeIndex)
        : undefined

  const check = withCheckIcon ? (
    <CheckIcon data-slot="cascader-check" className="ml-auto size-4 shrink-0" />
  ) : null

  const maxHeightStyle = {
    "--cascader-max-height":
      typeof maxDropdownHeight === "number"
        ? `${maxDropdownHeight}px`
        : maxDropdownHeight,
  } as React.CSSProperties

  const scrollClass =
    "[&_[data-slot=scroll-area-viewport]]:max-h-(--cascader-max-height)"

  return (
    <>
      <PopoverPrimitive.Root
        open={isOpen}
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
        <InputGroup
          ref={wrapperRef}
          data-slot="cascader"
          className={cn("w-full", className)}
        >
          {leftSection && (
            <InputGroupAddon align="inline-start">
              {leftSection}
            </InputGroupAddon>
          )}
          <InputGroupInput
            id={id}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={isOpen ? listId : undefined}
            aria-activedescendant={activeDescendant}
            autoComplete="off"
            disabled={disabled}
            readOnly={readOnly || !searchable}
            value={searchable ? search : displayString}
            className={cn(!searchable && "cursor-pointer")}
            onChange={(event) => {
              setSearch(event.currentTarget.value)
              setFlatIndex(-1)
              if (canInteract) openDropdown()
            }}
            onFocus={(event) => {
              if (openOnFocus && searchable && canInteract) openDropdown()
              onFocus?.(event)
            }}
            onBlur={(event) => {
              closeDropdown()
              onBlur?.(event)
            }}
            onClick={(event) => {
              if (canInteract) {
                setKeyboardNav(false)
                if (searchable || !isOpen) openDropdown()
                else closeDropdown()
              }
              onClick?.(event)
            }}
            onKeyDown={handleKeyDown}
            {...props}
          />
          <InputGroupAddon align="inline-end">
            {showClear && (
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                aria-label="Clear value"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onClear?.()
                  setCurrentValue(null)
                  setActivePath([])
                  setSearch("")
                }}
              >
                <XIcon className="pointer-events-none" />
              </InputGroupButton>
            )}
            {rightSection}
            <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
        <PopoverContent
          data-slot="cascader-content"
          anchor={wrapperRef}
          align="start"
          initialFocus={false}
          finalFocus={false}
          onMouseDown={(event) => event.preventDefault()}
          className={cn(
            "gap-0 p-0",
            showFlatList ? "w-(--anchor-width)" : "w-max",
          )}
        >
          {showFlatList ? (
            <div style={maxHeightStyle}>
              <ScrollArea className={scrollClass}>
                <div id={listId} role="listbox" className="p-1">
                  {flatItems.map((item, index) => {
                    const selected = pathsEqual(currentValue, item.path)
                    return (
                      <div
                        key={item.path.join("\u0000")}
                        id={`${listId}-flat-${index}`}
                        role="option"
                        aria-selected={selected}
                        aria-disabled={item.disabled || undefined}
                        data-highlighted={index === flatIndex || undefined}
                        data-disabled={item.disabled || undefined}
                        className={cn(
                          flatOptionClass,
                          "hover:bg-accent data-highlighted:bg-accent data-disabled:pointer-events-none data-disabled:opacity-50",
                        )}
                        onMouseMove={() => {
                          setKeyboardNav(false)
                          setFlatIndex(index)
                        }}
                        onClick={() => selectFlatItem(item)}
                      >
                        {selected && checkIconPosition === "left" && check}
                        <span className="min-w-0 flex-1 truncate">
                          {renderSearchOption
                            ? renderSearchOption(search, item.options)
                            : item.options.map((option, i) => (
                                <React.Fragment key={option.value}>
                                  {i > 0 && (
                                    <span className="text-muted-foreground">
                                      {" "}
                                      {separator}{" "}
                                    </span>
                                  )}
                                  {option.label ?? option.value}
                                </React.Fragment>
                              ))}
                        </span>
                        {selected && checkIconPosition !== "left" && check}
                      </div>
                    )
                  })}
                  {flatItems.length === 0 && nothingFoundMessage && (
                    <div className="px-2 py-1.5 text-center text-sm text-muted-foreground">
                      {nothingFoundMessage}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div
              id={listId}
              role="presentation"
              className="flex"
              onMouseMove={() => setKeyboardNav(false)}
              onMouseLeave={() => {
                if (expandTrigger === "hover") setActivePath(currentValue ?? [])
              }}
            >
              {hiddenBefore > 0 && (
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="h-auto self-stretch rounded-none"
                  tabIndex={-1}
                  aria-label={previousLevelsControlLabel}
                  title={previousLevelsControlLabel}
                  onClick={() => shiftWindow(1)}
                >
                  <ChevronLeftIcon />
                </Button>
              )}
              {visibleColumns.map((options, i) => {
                const level = windowStart + i
                const isLast = i === visibleColumns.length - 1 && !hiddenAfter
                return (
                  <div
                    key={level}
                    data-slot="cascader-column"
                    style={
                      columnWidth
                        ? { width: columnWidth, minWidth: columnWidth }
                        : undefined
                    }
                    className={cn("min-w-40 shrink-0", !isLast && "border-r")}
                  >
                    <div style={maxHeightStyle}>
                      <ScrollArea className={scrollClass}>
                        <div role="listbox" className="p-1">
                          {options.length === 0 ? (
                            <div className="px-2 py-1.5 text-center text-sm text-muted-foreground">
                              {nothingFoundMessage}
                            </div>
                          ) : (
                            options.map((option, index) => {
                              const isActive =
                                activePath[level] === option.value
                              const isCurrent =
                                isActive &&
                                level === focusedLevel &&
                                keyboardNav
                              const isInPath = isActive && level < focusedLevel
                              const selected =
                                !!currentValue &&
                                currentValue.length === level + 1 &&
                                currentValue[level] === option.value
                              return (
                                <div
                                  key={option.value}
                                  id={optionId(level, index)}
                                  role="option"
                                  aria-selected={isCurrent || undefined}
                                  aria-disabled={option.disabled || undefined}
                                  data-active={isCurrent || undefined}
                                  data-in-path={isInPath || undefined}
                                  data-selected={selected || undefined}
                                  data-disabled={option.disabled || undefined}
                                  className={cn(
                                    flatOptionClass,
                                    "hover:bg-accent data-in-path:bg-accent data-disabled:pointer-events-none data-disabled:opacity-50 data-active:bg-accent",
                                  )}
                                  onClick={() => {
                                    setKeyboardNav(false)
                                    if (!option.disabled) {
                                      activateOption(level, option)
                                    }
                                  }}
                                  onMouseEnter={() => {
                                    if (option.disabled) return
                                    setKeyboardNav(false)
                                    if (expandTrigger !== "hover") return
                                    if (hasChildren(option)) {
                                      expandOption(level, option)
                                    } else {
                                      setActivePath([
                                        ...activePath.slice(0, level),
                                        option.value,
                                      ])
                                    }
                                  }}
                                >
                                  {selected &&
                                    checkIconPosition === "left" &&
                                    check}
                                  <span className="min-w-0 flex-1 truncate">
                                    {renderOption
                                      ? renderOption(option, level)
                                      : (option.label ?? option.value)}
                                  </span>
                                  {selected &&
                                    checkIconPosition !== "left" &&
                                    check}
                                  {hasChildren(option) && (
                                    <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
                                  )}
                                </div>
                              )
                            })
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                )
              })}
              {hiddenAfter > 0 && (
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="h-auto self-stretch rounded-none"
                  tabIndex={-1}
                  aria-label={nextLevelsControlLabel}
                  title={nextLevelsControlLabel}
                  onClick={() => shiftWindow(-1)}
                >
                  <ChevronRightIcon />
                </Button>
              )}
            </div>
          )}
        </PopoverContent>
      </PopoverPrimitive.Root>
      <input
        type="hidden"
        name={name}
        form={form}
        disabled={disabled}
        value={currentValue?.join(",") ?? ""}
      />
    </>
  )
}

export { Cascader }
export type {
  CascaderProps,
  CascaderOption,
  CascaderFormatValue,
  CascaderFormatValueInput,
}
