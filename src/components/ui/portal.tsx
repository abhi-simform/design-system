"use client"

import * as React from "react"
import { createPortal } from "react-dom"

type PortalProps = React.ComponentProps<"div"> & {
  /**
   * Where to render the portal's children. An `HTMLElement` is used as-is; a
   * CSS selector string is resolved with `querySelector`. Omit to render into
   * a node this component manages itself (see `reuseTargetNode`).
   */
  target?: HTMLElement | string
  /**
   * When `target` is omitted, all Portal instances share a single node
   * appended to `document.body` instead of each creating their own. Has no
   * effect when `target` is set.
   * @default true
   */
  reuseTargetNode?: boolean
}

function createPortalNode({ className, style, id }: PortalProps) {
  const node = document.createElement("div")
  node.setAttribute("data-slot", "portal")
  node.setAttribute("data-portal", "true")
  if (className) node.classList.add(...className.split(" ").filter(Boolean))
  if (style) Object.assign(node.style, style)
  if (id) node.id = id
  return node
}

function getTargetNode({ target, reuseTargetNode, ...rest }: PortalProps) {
  if (target) {
    return typeof target === "string"
      ? (document.querySelector<HTMLElement>(target) ?? createPortalNode(rest))
      : target
  }

  if (reuseTargetNode) {
    const existingNode = document.querySelector<HTMLElement>(
      "[data-shared-portal-node]",
    )
    if (existingNode) return existingNode

    const node = createPortalNode(rest)
    node.setAttribute("data-shared-portal-node", "true")
    document.body.appendChild(node)
    return node
  }

  return createPortalNode(rest)
}

function Portal({
  children,
  target,
  reuseTargetNode = true,
  ...rest
}: PortalProps) {
  const [node, setNode] = React.useState<HTMLElement | null>(null)

  React.useEffect(() => {
    const targetNode = getTargetNode({ target, reuseTargetNode, ...rest })
    setNode(targetNode)

    const ownsNode = !target && !reuseTargetNode
    if (ownsNode) document.body.appendChild(targetNode)

    return () => {
      if (ownsNode) document.body.removeChild(targetNode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  if (!node) return null

  return createPortal(children, node)
}

type OptionalPortalProps = PortalProps & {
  /**
   * When `false`, renders `children` in place instead of portaling them.
   * @default true
   */
  withinPortal?: boolean
}

function OptionalPortal({
  withinPortal = true,
  children,
  ...rest
}: OptionalPortalProps) {
  if (!withinPortal) return children

  return <Portal {...rest}>{children}</Portal>
}

export { Portal, OptionalPortal }
export type { PortalProps, OptionalPortalProps }
