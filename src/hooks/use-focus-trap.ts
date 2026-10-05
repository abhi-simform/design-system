import * as React from "react"

const FOCUS_SELECTOR = "a, input, select, textarea, button, object, [tabindex]"
const TABBABLE_NODES = /input|select|textarea|button|object/

function isHidden(element: HTMLElement) {
  return element.style.display === "none"
}

function isVisible(element: HTMLElement) {
  const isAriaHidden =
    element.getAttribute("aria-hidden") ||
    element.getAttribute("hidden") ||
    element.getAttribute("type") === "hidden"

  if (isAriaHidden) return false

  let parent: HTMLElement | null = element
  while (parent) {
    if (parent === document.body || parent.nodeType === 11) break
    if (isHidden(parent)) return false
    parent = parent.parentNode as HTMLElement | null
  }

  return true
}

function getTabIndex(element: HTMLElement) {
  const tabIndex = element.getAttribute("tabindex")
  return tabIndex === null ? NaN : parseInt(tabIndex, 10)
}

function isFocusable(element: HTMLElement) {
  const nodeName = element.nodeName.toLowerCase()
  const isTabIndexNotNaN = !Number.isNaN(getTabIndex(element))
  const isTabbableNode =
    TABBABLE_NODES.test(nodeName) && !(element as HTMLButtonElement).disabled
  const isFocusableAnchor =
    element instanceof HTMLAnchorElement
      ? Boolean(element.href) || isTabIndexNotNaN
      : isTabIndexNotNaN

  return (isTabbableNode || isFocusableAnchor) && isVisible(element)
}

function isTabbable(element: HTMLElement) {
  const tabIndex = getTabIndex(element)
  return (Number.isNaN(tabIndex) || tabIndex >= 0) && isFocusable(element)
}

function findTabbableDescendants(element: HTMLElement) {
  return Array.from(
    element.querySelectorAll<HTMLElement>(FOCUS_SELECTOR),
  ).filter(isTabbable)
}

function scopeTab(node: HTMLElement, event: KeyboardEvent) {
  const tabbableChildren = findTabbableDescendants(node)

  if (!tabbableChildren.length) {
    event.preventDefault()
    return
  }

  const finalTabbable =
    tabbableChildren[event.shiftKey ? 0 : tabbableChildren.length - 1]
  const root = node.getRootNode() as unknown as DocumentOrShadowRoot
  const activeElement = root.activeElement

  let isLeavingFinalTabbable =
    finalTabbable === activeElement || node === activeElement

  const isActiveElementRadio =
    activeElement?.tagName === "INPUT" &&
    activeElement.getAttribute("type") === "radio"

  if (isActiveElementRadio) {
    const activeRadioGroup = tabbableChildren.filter(
      (element) =>
        element.getAttribute("type") === "radio" &&
        element.getAttribute("name") === activeElement.getAttribute("name"),
    )
    isLeavingFinalTabbable = activeRadioGroup.includes(finalTabbable)
  }

  if (!isLeavingFinalTabbable) return

  event.preventDefault()

  const target =
    tabbableChildren[event.shiftKey ? tabbableChildren.length - 1 : 0]
  target?.focus()
}

function focusNode(node: HTMLElement) {
  let focusTarget = node.querySelector<HTMLElement>("[data-autofocus]")

  if (!focusTarget) {
    const children = Array.from(
      node.querySelectorAll<HTMLElement>(FOCUS_SELECTOR),
    )
    focusTarget =
      children.find(isTabbable) ?? children.find(isFocusable) ?? null
    if (!focusTarget && isFocusable(node)) focusTarget = node
  }

  focusTarget?.focus({ preventScroll: true })
}

function useFocusTrap(active = true): React.RefCallback<HTMLElement | null> {
  const ref = React.useRef<HTMLElement | null>(null)

  const setRef = React.useCallback<React.RefCallback<HTMLElement | null>>(
    (node) => {
      if (!active) return

      if (node === null) {
        ref.current = null
        return
      }

      if (ref.current === node) return

      window.setTimeout(() => {
        if (node.getRootNode()) focusNode(node)
      })

      ref.current = node
    },
    [active],
  )

  React.useEffect(() => {
    if (!active) return undefined

    const node = ref.current
    if (node) window.setTimeout(() => focusNode(node))

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab" && ref.current) scopeTab(ref.current, event)
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [active])

  return setRef
}

export { useFocusTrap }
