import * as React from "react"

const DEFAULT_TOKENS: Record<string, RegExp> = {
  "9": /[0-9]/,
  a: /[A-Za-z]/,
  A: /[A-Z]/,
  "*": /[A-Za-z0-9]/,
  "#": /[-+0-9]/,
}

interface MaskState {
  value: string
  selection: { start: number; end: number } | null
}

interface UseMaskOptions {
  /** Mask pattern string or array of string literals and RegExp objects. */
  mask: string | Array<string | RegExp>
  /** Override or extend the default token map. */
  tokens?: Record<string, RegExp>
  /** Called before masking on each keystroke, can return overrides for mask options. */
  modify?: (
    value: string,
  ) =>
    | Partial<Pick<UseMaskOptions, "mask" | "tokens" | "slotChar" | "separate">>
    | undefined
  /** When true, raw and display values are decoupled. */
  separate?: boolean
  /** Character displayed in unfilled slots. @default "_" */
  slotChar?: string | null
  /** Show mask pattern even when field is empty and unfocused. */
  alwaysShowMask?: boolean
  /** Show mask placeholder on focus. @default true */
  showMaskOnFocus?: boolean
  /** Transform each character before validation and insertion. */
  transform?: (char: string) => string
  /** Clear value on blur when mask is incomplete. @default false */
  autoClear?: boolean
  /** Sets aria-invalid on the input. */
  invalid?: boolean
  /** Called on every change with raw and masked values. */
  onChangeRaw?: (rawValue: string, maskedValue: string) => void
  /** Called when all required mask slots are filled. */
  onComplete?: (maskedValue: string, rawValue: string) => void
  /** Escape hatch for advanced cursor/value manipulation. */
  beforeMaskedStateChange?: (states: {
    previousState: MaskState
    currentState: MaskState
    nextState: MaskState
  }) => MaskState
}

interface UseMaskReturnValue {
  /** Ref to attach to the input element. */
  ref: React.RefCallback<HTMLInputElement>
  /** Current masked display value. */
  value: string
  /** Current raw unmasked value. */
  rawValue: string
  /** Whether all required mask slots are filled. */
  isComplete: boolean
  /** Clear the input value and reset state. */
  reset: () => void
}

interface MaskSlot {
  type: "token" | "literal"
  char: string
  pattern?: RegExp
  optional?: boolean
}

interface UndoState {
  rawValue: string
  selectionStart: number
}

const MAX_UNDO_HISTORY = 100

function parseMask(
  mask: string | Array<string | RegExp>,
  tokens: Record<string, RegExp>,
): MaskSlot[] {
  if (Array.isArray(mask)) {
    return mask.map((item): MaskSlot => {
      if (item instanceof RegExp) {
        return { type: "token", char: "_", pattern: item }
      }
      return { type: "literal", char: item }
    })
  }

  const slots: MaskSlot[] = []
  let optional = false

  for (let i = 0; i < mask.length; i++) {
    const char = mask[i]

    if (char === "\\" && i + 1 < mask.length) {
      i++
      slots.push({ type: "literal", char: mask[i] })
      continue
    }

    if (char === "?") {
      optional = true
      continue
    }

    if (tokens[char]) {
      slots.push({ type: "token", char, pattern: tokens[char], optional })
    } else {
      slots.push({ type: "literal", char, optional })
    }
  }

  return slots
}

function getSlotChar(
  slotCharOption: string | null | undefined,
  index: number,
): string {
  if (
    slotCharOption === null ||
    slotCharOption === "" ||
    slotCharOption === undefined
  ) {
    return ""
  }
  if (slotCharOption.length > 1) {
    return slotCharOption[index] || "_"
  }
  return slotCharOption
}

function applyMaskToRaw(
  raw: string,
  slots: MaskSlot[],
  transform?: (char: string) => string,
): string {
  let result = ""
  let rawIndex = 0

  for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
    const slot = slots[slotIndex]
    if (slot.type === "literal") {
      result += slot.char
    } else if (rawIndex < raw.length) {
      const ch = transform ? transform(raw[rawIndex]) : raw[rawIndex]
      if (slot.pattern && slot.pattern.test(ch)) {
        result += ch
        rawIndex++
      } else {
        rawIndex++
        slotIndex--
      }
    } else {
      break
    }
  }

  return result
}

function buildDisplayValue(
  value: string,
  slots: MaskSlot[],
  slotCharOption: string | null | undefined,
  showSlots: boolean,
): string {
  if (!showSlots) {
    return value
  }

  let display = value

  for (let i = value.length; i < slots.length; i++) {
    const slot = slots[i]
    if (slot.type === "literal") {
      display += slot.char
    } else {
      const sc = getSlotChar(slotCharOption, i)
      if (!sc) {
        break
      }
      display += sc
    }
  }

  return display
}

function extractRaw(masked: string, slots: MaskSlot[]): string {
  let raw = ""
  for (let i = 0; i < masked.length && i < slots.length; i++) {
    if (slots[i].type === "token") {
      raw += masked[i]
    }
  }
  return raw
}

function checkComplete(masked: string, slots: MaskSlot[]): boolean {
  for (let i = 0; i < slots.length; i++) {
    if (slots[i].type === "token" && !slots[i].optional) {
      if (i >= masked.length) {
        return false
      }
      if (!slots[i].pattern!.test(masked[i])) {
        return false
      }
    }
  }
  return true
}

function findNextTokenIndex(slots: MaskSlot[], from: number): number {
  for (let i = from; i < slots.length; i++) {
    if (slots[i].type === "token") {
      return i
    }
  }
  return slots.length
}

function findPrevTokenIndex(slots: MaskSlot[], from: number): number {
  for (let i = from; i >= 0; i--) {
    if (slots[i].type === "token") {
      return i
    }
  }
  return -1
}

function findNextEditablePosition(
  from: number,
  slots: MaskSlot[],
  value: string,
): number {
  let pos = from
  while (
    pos < slots.length &&
    pos < value.length &&
    slots[pos] &&
    slots[pos].type === "literal"
  ) {
    pos++
  }
  return pos
}

function processInput(
  inputValue: string,
  slots: MaskSlot[],
  transform?: (char: string) => string,
): string {
  let result = ""
  let inputIndex = 0

  for (
    let slotIndex = 0;
    slotIndex < slots.length && inputIndex <= inputValue.length;
    slotIndex++
  ) {
    const slot = slots[slotIndex]

    if (slot.type === "literal") {
      result += slot.char
      if (
        inputIndex < inputValue.length &&
        inputValue[inputIndex] === slot.char
      ) {
        inputIndex++
      }
      continue
    }

    if (inputIndex >= inputValue.length) {
      break
    }

    while (inputIndex < inputValue.length) {
      const ch = transform
        ? transform(inputValue[inputIndex])
        : inputValue[inputIndex]
      inputIndex++

      if (slot.pattern!.test(ch)) {
        result += ch
        break
      }
    }

    if (result.length <= slotIndex) {
      break
    }
  }

  return result
}

function getResolvedOptions(options: UseMaskOptions, rawValue: string) {
  const tokens = { ...DEFAULT_TOKENS, ...options.tokens }
  let mask = options.mask
  let slotChar: string | null | undefined =
    options.slotChar === undefined ? "_" : options.slotChar
  let separate = options.separate ?? false

  if (options.modify) {
    const overrides = options.modify(rawValue)
    if (overrides) {
      if (overrides.mask !== undefined) {
        mask = overrides.mask
      }
      if (overrides.tokens !== undefined) {
        Object.assign(tokens, overrides.tokens)
      }
      if (overrides.slotChar !== undefined) {
        slotChar = overrides.slotChar
      }
      if (overrides.separate !== undefined) {
        separate = overrides.separate
      }
    }
  }

  const slots = parseMask(mask, tokens)
  return { slots, slotChar, separate, tokens, transform: options.transform }
}

function formatMask(raw: string, options: UseMaskOptions): string {
  const { slots, transform } = getResolvedOptions(options, raw)
  return applyMaskToRaw(raw, slots, transform)
}

function unformatMask(masked: string, options: UseMaskOptions): string {
  const { slots } = getResolvedOptions(options, "")
  return extractRaw(masked, slots)
}

function isMaskComplete(masked: string, options: UseMaskOptions): boolean {
  const { slots } = getResolvedOptions(options, "")
  return checkComplete(masked, slots)
}

function useMask(options: UseMaskOptions): UseMaskReturnValue {
  const optionsRef = React.useRef(options)
  React.useLayoutEffect(() => {
    optionsRef.current = options
  })

  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [maskedValue, setMaskedValue] = React.useState("")
  const [rawValue, setRawValue] = React.useState("")
  const processedRef = React.useRef("")
  const displayValueRef = React.useRef("")
  const rawValueRef = React.useRef("")
  const wasCompleteRef = React.useRef(false)
  const isFocusedRef = React.useRef(false)
  const undoStackRef = React.useRef<UndoState[]>([])
  const redoStackRef = React.useRef<UndoState[]>([])

  const applyValue = React.useCallback(
    ({
      reprocessed,
      newRaw,
      displayValue,
      resolvedSlots,
      previousState,
      cursorPos,
      notifyChange,
    }: {
      reprocessed: string
      newRaw: string
      displayValue: string
      resolvedSlots: MaskSlot[]
      previousState?: MaskState
      cursorPos?: number
      notifyChange: boolean
    }) => {
      const opts = optionsRef.current
      const input = inputRef.current

      let nextDisplay = displayValue
      let nextRaw = newRaw
      let nextProcessed = reprocessed
      let nextCursor = cursorPos

      if (opts.beforeMaskedStateChange && notifyChange) {
        const currentState: MaskState = {
          value: displayValueRef.current,
          selection: input
            ? {
                start: input.selectionStart ?? 0,
                end: input.selectionEnd ?? 0,
              }
            : null,
        }
        const result = opts.beforeMaskedStateChange({
          previousState: previousState ?? currentState,
          currentState,
          nextState: {
            value: displayValue,
            selection:
              cursorPos === undefined
                ? null
                : { start: cursorPos, end: cursorPos },
          },
        })
        nextDisplay = result.value
        nextProcessed = processInput(
          result.value,
          resolvedSlots,
          opts.transform,
        )
        nextRaw = extractRaw(nextProcessed, resolvedSlots)
        nextCursor = result.selection?.start ?? cursorPos
      }

      processedRef.current = nextProcessed
      displayValueRef.current = nextDisplay
      rawValueRef.current = nextRaw
      setMaskedValue(nextDisplay)
      setRawValue(nextRaw)

      if (input) {
        input.value = nextDisplay
        if (nextCursor !== undefined && document.activeElement === input) {
          const pos = Math.min(nextCursor, nextProcessed.length)
          input.setSelectionRange(pos, pos)
        }
      }

      if (notifyChange && opts.onChangeRaw) {
        opts.onChangeRaw(nextRaw, nextDisplay)
      }

      const complete = checkComplete(nextProcessed, resolvedSlots)
      if (
        notifyChange &&
        complete &&
        !wasCompleteRef.current &&
        opts.onComplete
      ) {
        opts.onComplete(nextDisplay, nextRaw)
      }
      wasCompleteRef.current = complete
    },
    [],
  )

  const updateValue = React.useCallback(
    (newMasked: string, cursorPos?: number) => {
      const opts = optionsRef.current
      const { slots } = getResolvedOptions(
        opts,
        extractRaw(newMasked, getResolvedOptions(opts, "").slots),
      )
      const raw = extractRaw(newMasked, slots)

      const { slots: resolvedSlots, slotChar } = getResolvedOptions(opts, raw)

      const reprocessed = processInput(newMasked, resolvedSlots)
      const newRaw = extractRaw(reprocessed, resolvedSlots)

      const showSlots = opts.alwaysShowMask || isFocusedRef.current
      const showOnFocus = opts.showMaskOnFocus !== false
      const shouldShowSlots =
        showSlots && (showOnFocus || reprocessed.length > 0)

      const displayValue = buildDisplayValue(
        reprocessed,
        resolvedSlots,
        slotChar,
        shouldShowSlots,
      )

      const input = inputRef.current
      applyValue({
        reprocessed,
        newRaw,
        displayValue,
        resolvedSlots,
        previousState: {
          value: displayValueRef.current,
          selection: input
            ? {
                start: input.selectionStart ?? 0,
                end: input.selectionEnd ?? 0,
              }
            : null,
        },
        cursorPos,
        notifyChange: true,
      })
    },
    [applyValue],
  )

  const initializeInputValue = React.useCallback(
    (node: HTMLInputElement) => {
      const opts = optionsRef.current

      if (!node.value) {
        return false
      }

      const isOwnValue = node.value === displayValueRef.current
      const {
        slots: initialSlots,
        slotChar: initialSlotChar,
        transform,
      } = getResolvedOptions(opts, "")

      const parse = (slots: MaskSlot[]) =>
        isOwnValue
          ? applyMaskToRaw(rawValueRef.current, slots)
          : processInput(node.value, slots, transform)

      const initialProcessed = parse(initialSlots)
      const initialRaw = extractRaw(initialProcessed, initialSlots)
      const { slots: resolvedSlots, slotChar } = getResolvedOptions(
        opts,
        initialRaw,
      )
      const reprocessed = parse(resolvedSlots)
      const newRaw = extractRaw(reprocessed, resolvedSlots)
      const showSlots = opts.alwaysShowMask || isFocusedRef.current
      const showOnFocus = opts.showMaskOnFocus !== false
      const shouldShowSlots =
        showSlots && (showOnFocus || reprocessed.length > 0)
      const displayValue = buildDisplayValue(
        reprocessed,
        resolvedSlots,
        slotChar ?? initialSlotChar,
        shouldShowSlots,
      )

      applyValue({
        reprocessed,
        newRaw,
        displayValue,
        resolvedSlots,
        notifyChange: false,
      })

      return true
    },
    [applyValue],
  )

  const pushUndoState = React.useCallback(() => {
    const input = inputRef.current
    const selectionStart = input?.selectionStart ?? rawValueRef.current.length
    const state: UndoState = {
      rawValue: rawValueRef.current,
      selectionStart,
    }
    const stack = undoStackRef.current
    const top = stack[stack.length - 1]
    if (
      top &&
      top.rawValue === state.rawValue &&
      top.selectionStart === state.selectionStart
    ) {
      return
    }
    stack.push(state)
    if (stack.length > MAX_UNDO_HISTORY) {
      stack.shift()
    }
    redoStackRef.current = []
  }, [])

  const applyHistoryState = React.useCallback(
    (target: UndoState) => {
      const opts = optionsRef.current
      const { slots, transform } = getResolvedOptions(opts, target.rawValue)
      const newMasked = applyMaskToRaw(target.rawValue, slots, transform)
      updateValue(newMasked, target.selectionStart)
    },
    [updateValue],
  )

  const handleInput = React.useCallback(
    (e: Event) => {
      const input = e.target as HTMLInputElement
      const opts = optionsRef.current

      const { slots: resolvedSlots, transform } = getResolvedOptions(opts, "")
      const prev = displayValueRef.current
      const curr = input.value

      let prefixLen = 0
      const maxPrefix = Math.min(prev.length, curr.length)
      while (prefixLen < maxPrefix && prev[prefixLen] === curr[prefixLen]) {
        prefixLen++
      }

      let suffixLen = 0
      const maxSuffix = Math.min(
        prev.length - prefixLen,
        curr.length - prefixLen,
      )
      while (
        suffixLen < maxSuffix &&
        prev[prev.length - 1 - suffixLen] === curr[curr.length - 1 - suffixLen]
      ) {
        suffixLen++
      }

      const insertedText = curr.slice(prefixLen, curr.length - suffixLen)
      const removedEnd = prev.length - suffixLen

      const beforeRaw = extractRaw(
        prev.slice(0, prefixLen),
        resolvedSlots.slice(0, prefixLen),
      )
      const afterRaw = extractRaw(
        prev.slice(removedEnd),
        resolvedSlots.slice(removedEnd),
      )
      const reformatted = applyMaskToRaw(
        beforeRaw + insertedText + afterRaw,
        resolvedSlots,
        transform,
      )
      const maskedPrefix = applyMaskToRaw(
        beforeRaw + insertedText,
        resolvedSlots,
        transform,
      )

      if (reformatted !== prev) {
        pushUndoState()
      }
      updateValue(reformatted, maskedPrefix.length)
    },
    [pushUndoState, updateValue],
  )

  const clampCursorToProcessed = React.useCallback(
    (input: HTMLInputElement) => {
      const start = input.selectionStart ?? 0
      const end = input.selectionEnd ?? 0
      if (start !== end) {
        return
      }

      const { slots } = getResolvedOptions(optionsRef.current, "")
      const processed = processedRef.current
      const endPos =
        processed.length > 0
          ? findNextEditablePosition(processed.length, slots, processed)
          : findNextTokenIndex(slots, 0)
      const startPos = findNextTokenIndex(slots, 0)

      if (start > endPos || start < startPos) {
        input.setSelectionRange(endPos, endPos)
      }
    },
    [],
  )

  const handleFocus = React.useCallback(() => {
    isFocusedRef.current = true
    const opts = optionsRef.current
    const input = inputRef.current

    if (!input) {
      return
    }

    const { slots, slotChar } = getResolvedOptions(opts, "")
    const showOnFocus = opts.showMaskOnFocus !== false
    const processed = processedRef.current

    if (showOnFocus || opts.alwaysShowMask) {
      const display = buildDisplayValue(processed, slots, slotChar, true)
      input.value = display
      displayValueRef.current = display
      setMaskedValue(display)
    }

    requestAnimationFrame(() => {
      if (input === document.activeElement) {
        clampCursorToProcessed(input)
      }
    })
  }, [clampCursorToProcessed])

  const handleMouseUp = React.useCallback(() => {
    const input = inputRef.current
    if (!input || input !== document.activeElement) {
      return
    }

    clampCursorToProcessed(input)
  }, [clampCursorToProcessed])

  const handleMouseDown = React.useCallback(() => {
    const input = inputRef.current
    if (!input) {
      return
    }

    requestAnimationFrame(() => {
      if (input !== document.activeElement) {
        return
      }

      const start = input.selectionStart ?? 0
      const end = input.selectionEnd ?? 0
      if (start !== end) {
        return
      }

      const { slots } = getResolvedOptions(optionsRef.current, "")
      const processed = processedRef.current
      const endPos =
        processed.length > 0
          ? findNextEditablePosition(processed.length, slots, processed)
          : findNextTokenIndex(slots, 0)

      if (start > endPos) {
        input.setSelectionRange(endPos, endPos)
      }
    })
  }, [])

  const handleBlur = React.useCallback(() => {
    isFocusedRef.current = false
    const opts = optionsRef.current
    const input = inputRef.current

    if (!input) {
      return
    }

    const { slots, slotChar } = getResolvedOptions(opts, rawValueRef.current)
    const expectedFocusDisplay = buildDisplayValue(
      processedRef.current,
      slots,
      slotChar,
      true,
    )
    const processed =
      input.value === expectedFocusDisplay
        ? processedRef.current
        : processInput(input.value, slots)
    const complete = checkComplete(processed, slots)

    const clearAll = () => {
      input.value = ""
      processedRef.current = ""
      displayValueRef.current = ""
      rawValueRef.current = ""
      setMaskedValue("")
      setRawValue("")
      wasCompleteRef.current = false
    }

    if (opts.autoClear && !complete && processed.length > 0) {
      clearAll()

      if (opts.onChangeRaw) {
        opts.onChangeRaw("", "")
      }

      if (opts.alwaysShowMask) {
        const emptyDisplay = buildDisplayValue("", slots, slotChar, true)
        input.value = emptyDisplay
        displayValueRef.current = emptyDisplay
        setMaskedValue(emptyDisplay)
      }
      return
    }

    if (!opts.alwaysShowMask && !complete) {
      if (extractRaw(processed, slots).length === 0) {
        clearAll()

        if (opts.onChangeRaw) {
          opts.onChangeRaw("", "")
        }
        return
      }

      const display = buildDisplayValue(processed, slots, slotChar, false)
      input.value = display
      displayValueRef.current = display
      setMaskedValue(display)
    }
  }, [])

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      const input = e.target as HTMLInputElement
      const opts = optionsRef.current

      const { slots, transform } = getResolvedOptions(opts, rawValueRef.current)
      const start = input.selectionStart ?? 0
      const end = input.selectionEnd ?? 0
      const processed = processedRef.current

      const modifier = e.metaKey || (e.ctrlKey && !e.altKey)
      const key = e.key.toLowerCase()

      if (modifier && key === "z" && !e.shiftKey) {
        e.preventDefault()
        const prev = undoStackRef.current.pop()
        if (!prev) {
          return
        }
        redoStackRef.current.push({
          rawValue: rawValueRef.current,
          selectionStart: input.selectionStart ?? 0,
        })
        applyHistoryState(prev)
        return
      }

      if (
        modifier &&
        ((key === "z" && e.shiftKey) || (key === "y" && !e.shiftKey))
      ) {
        e.preventDefault()
        const next = redoStackRef.current.pop()
        if (!next) {
          return
        }
        undoStackRef.current.push({
          rawValue: rawValueRef.current,
          selectionStart: input.selectionStart ?? 0,
        })
        applyHistoryState(next)
        return
      }

      if (e.key === "Backspace") {
        e.preventDefault()

        if (e.metaKey || (e.ctrlKey && !e.altKey)) {
          const clampedStart = Math.min(start, processed.length)
          const afterRaw = extractRaw(
            processed.slice(clampedStart),
            slots.slice(clampedStart),
          )
          const newValue = applyMaskToRaw(afterRaw, slots, transform)
          pushUndoState()
          updateValue(newValue, 0)
          return
        }

        if (start !== end) {
          const clampedEnd = Math.min(end, processed.length)
          const before = processed.slice(0, start)
          const afterRaw = extractRaw(
            processed.slice(clampedEnd),
            slots.slice(clampedEnd),
          )
          const newValue = applyMaskToRaw(
            extractRaw(before, slots) + afterRaw,
            slots,
            transform,
          )
          pushUndoState()
          updateValue(newValue, start)
          return
        }

        if (start === 0) {
          return
        }

        let deletePos = start - 1
        while (
          deletePos >= 0 &&
          slots[deletePos] &&
          slots[deletePos].type === "literal"
        ) {
          deletePos--
        }

        if (deletePos < 0) {
          return
        }

        const beforeRaw = extractRaw(
          processed.slice(0, deletePos),
          slots.slice(0, deletePos),
        )
        const afterRaw = extractRaw(
          processed.slice(deletePos + 1),
          slots.slice(deletePos + 1),
        )
        const newValue = applyMaskToRaw(beforeRaw + afterRaw, slots, transform)
        pushUndoState()
        updateValue(newValue, deletePos)
      } else if (e.key === "Delete") {
        e.preventDefault()

        if (start !== end) {
          const clampedEnd = Math.min(end, processed.length)
          const before = processed.slice(0, start)
          const afterRaw = extractRaw(
            processed.slice(clampedEnd),
            slots.slice(clampedEnd),
          )
          const newValue = applyMaskToRaw(
            extractRaw(before, slots) + afterRaw,
            slots,
            transform,
          )
          pushUndoState()
          updateValue(newValue, start)
          return
        }

        let deletePos = start
        while (
          deletePos < slots.length &&
          slots[deletePos] &&
          slots[deletePos].type === "literal"
        ) {
          deletePos++
        }

        if (deletePos >= processed.length) {
          return
        }

        const beforeRaw = extractRaw(
          processed.slice(0, start),
          slots.slice(0, start),
        )
        const afterRaw = extractRaw(
          processed.slice(deletePos + 1),
          slots.slice(deletePos + 1),
        )
        const newValue = applyMaskToRaw(beforeRaw + afterRaw, slots, transform)
        pushUndoState()
        updateValue(newValue, start)
      } else if (e.key === "ArrowRight" && !e.shiftKey) {
        const nextPos = findNextEditablePosition(start + 1, slots, input.value)
        if (nextPos !== start + 1) {
          e.preventDefault()
          input.setSelectionRange(nextPos, nextPos)
        }
      } else if (e.key === "ArrowLeft" && !e.shiftKey) {
        if (start > 0) {
          const prevToken = findPrevTokenIndex(slots, start - 1)
          if (prevToken >= 0 && prevToken !== start - 1) {
            e.preventDefault()
            input.setSelectionRange(prevToken + 1, prevToken + 1)
          }
        }
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault()

        let insertPos = Math.min(start, processed.length)
        while (
          insertPos < slots.length &&
          slots[insertPos] &&
          slots[insertPos].type === "literal"
        ) {
          insertPos++
        }

        if (insertPos >= slots.length) {
          return
        }

        const slot = slots[insertPos]
        const ch = transform ? transform(e.key) : e.key
        if (!slot.pattern!.test(ch)) {
          return
        }

        const beforeRaw = extractRaw(
          processed.slice(0, insertPos),
          slots.slice(0, insertPos),
        )
        const afterRaw =
          start < end
            ? extractRaw(
                processed.slice(Math.min(end, processed.length)),
                slots.slice(Math.min(end, processed.length)),
              )
            : extractRaw(processed.slice(insertPos), slots.slice(insertPos))
        const newValue = applyMaskToRaw(
          beforeRaw + ch + afterRaw,
          slots,
          transform,
        )
        const newCursorPos = findNextEditablePosition(
          insertPos + 1,
          slots,
          newValue,
        )
        pushUndoState()
        updateValue(newValue, newCursorPos)
      }
    },
    [applyHistoryState, pushUndoState, updateValue],
  )

  const handlePaste = React.useCallback(
    (e: ClipboardEvent) => {
      e.preventDefault()
      const input = e.target as HTMLInputElement
      const opts = optionsRef.current

      const pastedText = e.clipboardData?.getData("text") ?? ""
      const start = input.selectionStart ?? 0
      const end = input.selectionEnd ?? 0
      const processed = processedRef.current

      const { slots, transform } = getResolvedOptions(opts, "")
      const clampedStart = Math.min(start, processed.length)
      const clampedEnd = Math.min(end, processed.length)
      const beforeRaw = extractRaw(
        processed.slice(0, clampedStart),
        slots.slice(0, clampedStart),
      )
      const afterRaw = extractRaw(
        processed.slice(clampedEnd),
        slots.slice(clampedEnd),
      )
      const newValue = applyMaskToRaw(
        beforeRaw + pastedText + afterRaw,
        slots,
        transform,
      )

      pushUndoState()
      updateValue(newValue)

      const maskedPrefix = applyMaskToRaw(
        beforeRaw + pastedText,
        slots,
        transform,
      )
      const pasteEndPos = Math.min(maskedPrefix.length, slots.length)
      if (input === document.activeElement) {
        input.setSelectionRange(pasteEndPos, pasteEndPos)
      }
    },
    [pushUndoState, updateValue],
  )

  const setAriaAttributes = React.useCallback((input: HTMLInputElement) => {
    if (optionsRef.current.invalid) {
      input.setAttribute("aria-invalid", "true")
    } else {
      input.removeAttribute("aria-invalid")
    }
  }, [])

  const refCallback = React.useCallback(
    (node: HTMLInputElement | null) => {
      const prevInput = inputRef.current

      if (prevInput) {
        prevInput.removeEventListener("input", handleInput)
        prevInput.removeEventListener("focus", handleFocus)
        prevInput.removeEventListener("blur", handleBlur)
        prevInput.removeEventListener("mousedown", handleMouseDown)
        prevInput.removeEventListener("mouseup", handleMouseUp)
        prevInput.removeEventListener("keydown", handleKeyDown as EventListener)
        prevInput.removeEventListener("paste", handlePaste as EventListener)
      }

      inputRef.current = node

      if (node) {
        node.addEventListener("input", handleInput)
        node.addEventListener("focus", handleFocus)
        node.addEventListener("blur", handleBlur)
        node.addEventListener("mousedown", handleMouseDown)
        node.addEventListener("mouseup", handleMouseUp)
        node.addEventListener("keydown", handleKeyDown as EventListener)
        node.addEventListener("paste", handlePaste as EventListener)

        setAriaAttributes(node)

        const hasInitialValue = initializeInputValue(node)

        if (optionsRef.current.alwaysShowMask && !hasInitialValue) {
          const { slots, slotChar } = getResolvedOptions(optionsRef.current, "")
          const display = buildDisplayValue("", slots, slotChar, true)
          node.value = display
          displayValueRef.current = display
          setMaskedValue(display)
        }
      }
    },
    [
      handleInput,
      handleFocus,
      handleBlur,
      handleMouseDown,
      handleMouseUp,
      handleKeyDown,
      handlePaste,
      initializeInputValue,
      setAriaAttributes,
    ],
  )

  React.useEffect(() => {
    const input = inputRef.current
    if (!input) {
      return
    }

    setAriaAttributes(input)
  }, [options.invalid, setAriaAttributes])

  const isComplete = checkComplete(
    maskedValue,
    getResolvedOptions(options, rawValue).slots,
  )

  const reset = React.useCallback(() => {
    const opts = optionsRef.current
    const input = inputRef.current

    processedRef.current = ""
    displayValueRef.current = ""
    rawValueRef.current = ""
    undoStackRef.current = []
    redoStackRef.current = []
    setMaskedValue("")
    setRawValue("")
    wasCompleteRef.current = false

    if (input) {
      if (opts.alwaysShowMask) {
        const { slots, slotChar } = getResolvedOptions(opts, "")
        const display = buildDisplayValue("", slots, slotChar, true)
        input.value = display
        displayValueRef.current = display
        setMaskedValue(display)
      } else {
        input.value = ""
      }
    }

    if (opts.onChangeRaw) {
      opts.onChangeRaw("", "")
    }
  }, [])

  return {
    ref: refCallback,
    value: maskedValue,
    rawValue,
    isComplete,
    reset,
  }
}

export { formatMask, isMaskComplete, unformatMask, useMask }
export type { MaskState, UseMaskOptions, UseMaskReturnValue }
