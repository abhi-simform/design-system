import * as React from "react"

import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { useFocusTrap } from "@/hooks/use-focus-trap"

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.RefObject<T | null>).current = node
    }
  }
}

function getSingleElementChild(children: React.ReactNode) {
  const childArray = React.Children.toArray(children)
  if (childArray.length !== 1 || !React.isValidElement(childArray[0]))
    return null
  return childArray[0]
}

interface FocusTrapProps {
  children: React.ReactNode
  active?: boolean
  refProp?: string
  innerRef?: React.Ref<HTMLElement>
}

function FocusTrap({
  children,
  active = true,
  refProp = "ref",
  innerRef,
}: FocusTrapProps) {
  const focusTrapRef = useFocusTrap(active)
  const ref = React.useMemo(
    () => mergeRefs(focusTrapRef, innerRef),
    [focusTrapRef, innerRef],
  )

  const child = getSingleElementChild(children)
  if (!child) return children

  return React.cloneElement(
    child as React.ReactElement<Record<string, unknown>>,
    { [refProp]: ref },
  )
}

function FocusTrapInitialFocus({
  ...props
}: React.ComponentProps<typeof VisuallyHidden>) {
  return (
    <VisuallyHidden
      data-slot="focus-trap-initial-focus"
      tabIndex={-1}
      data-autofocus
      {...props}
    />
  )
}

const FocusTrapWithInitialFocus = Object.assign(FocusTrap, {
  InitialFocus: FocusTrapInitialFocus,
})

export { FocusTrapWithInitialFocus as FocusTrap, FocusTrapInitialFocus }
export type { FocusTrapProps }
