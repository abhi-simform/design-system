"use client"

import * as React from "react"
import { cn } from "cn"

import { Spinner } from "@/components/ui/spinner"
import {
  findTreeNode,
  useTree,
  type TreeController,
  type TreeDragDropPayload,
  type TreeDragDropPosition,
  type TreeNodeData,
} from "@/hooks/use-tree"

type TreeLevelOffset = "xs" | "sm" | "md" | "lg" | "xl" | (string & {}) | number

const levelOffsetScale: Record<string, string> = {
  xs: "0.625rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
}

function getLevelOffset(value: TreeLevelOffset) {
  if (typeof value === "number") {
    return `${value}px`
  }
  return levelOffsetScale[value] ?? value
}

interface TreeDragHandleProps {
  onMouseDown: (event: React.MouseEvent) => void
}

interface TreeDragState {
  draggedValue: string | null
  currentDropTarget: HTMLElement | null
}

type TreeAllowDrop = (payload: TreeDragDropPayload) => boolean

interface RenderTreeNodePayload {
  /** Node level in the tree, starting at 1 */
  level: number
  /** `true` if the node is expanded */
  expanded: boolean
  /** `true` if the node has non-empty `children` or `hasChildren` is set */
  hasChildren: boolean
  /** `true` if the node is selected */
  selected: boolean
  /** `true` if the node is at the top-most level of the tree */
  isRoot: boolean
  /** `true` if the node's children are currently being loaded */
  isLoading: boolean
  /** Error from the last failed load attempt, or `null` */
  loadError: Error | null
  /** Node data from the `data` prop */
  node: TreeNodeData
  /** Tree controller, the return value of `useTree` */
  tree: TreeController
  /** Props to spread into the element that represents the node */
  elementProps: {
    className: string
    "data-slot": string
    onClick: (event: React.MouseEvent) => void
    "data-selected": boolean | undefined
    "data-value": string
    draggable?: boolean
    onDragStart?: (event: React.DragEvent) => void
    onDragOver?: (event: React.DragEvent) => void
    onDragLeave?: (event: React.DragEvent) => void
    onDrop?: (event: React.DragEvent) => void
    onDragEnd?: (event: React.DragEvent) => void
  }
  /** Spread into the drag handle element when `withDragHandle` is set */
  dragHandleProps: TreeDragHandleProps | undefined
}

type RenderTreeNode = (payload: RenderTreeNodePayload) => React.ReactNode

const labelClassName = cn(
  "relative ps-(--label-offset) data-dragging:opacity-40 data-selected:bg-muted",
  "data-[drag-over=before]:before:pointer-events-none data-[drag-over=before]:before:absolute data-[drag-over=before]:before:start-(--label-offset) data-[drag-over=before]:before:inset-e-0 data-[drag-over=before]:before:-top-px data-[drag-over=before]:before:z-10 data-[drag-over=before]:before:h-0.5 data-[drag-over=before]:before:bg-primary",
  "data-[drag-over=after]:after:pointer-events-none data-[drag-over=after]:after:absolute data-[drag-over=after]:after:start-(--label-offset) data-[drag-over=after]:after:inset-e-0 data-[drag-over=after]:after:-bottom-px data-[drag-over=after]:after:z-10 data-[drag-over=after]:after:h-0.5 data-[drag-over=after]:after:bg-primary",
  "data-[drag-over=inside]:bg-primary/15",
)

const nodeClassName =
  "cursor-pointer list-none outline-none group-data-[with-lines]/tree:relative group-data-[with-lines]/tree:not-data-[level='1']:before:pointer-events-none group-data-[with-lines]/tree:not-data-[level='1']:before:absolute group-data-[with-lines]/tree:not-data-[level='1']:before:top-3 group-data-[with-lines]/tree:not-data-[level='1']:before:z-10 group-data-[with-lines]/tree:not-data-[level='1']:before:h-0 group-data-[with-lines]/tree:not-data-[level='1']:before:w-(--half-offset) group-data-[with-lines]/tree:not-data-[level='1']:before:start-(--line-offset) group-data-[with-lines]/tree:not-data-[level='1']:before:border-t group-data-[with-lines]/tree:not-data-[level='1']:before:border-border focus-visible:[&>[data-slot=tree-label]]:outline-2 focus-visible:[&>[data-slot=tree-label]]:outline-offset-2 focus-visible:[&>[data-slot=tree-label]]:outline-ring [&[data-focus-ring]:focus>[data-slot=tree-label]]:outline-2 [&[data-focus-ring]:focus>[data-slot=tree-label]]:outline-offset-2 [&[data-focus-ring]:focus>[data-slot=tree-label]]:outline-ring"

const subtreeNodeLineClassName =
  "group-data-[with-lines]/tree:after:pointer-events-none group-data-[with-lines]/tree:after:absolute group-data-[with-lines]/tree:after:inset-y-0 group-data-[with-lines]/tree:after:z-10 group-data-[with-lines]/tree:after:w-0 group-data-[with-lines]/tree:after:start-(--line-offset) group-data-[with-lines]/tree:after:border-s group-data-[with-lines]/tree:after:border-border group-data-[with-lines]/tree:last:after:bottom-auto group-data-[with-lines]/tree:last:after:h-3"

function getValuesRange(
  anchor: string | null,
  value: string | undefined,
  flatValues: string[],
) {
  if (!anchor || !value) {
    return []
  }

  const anchorIndex = flatValues.indexOf(anchor)
  const valueIndex = flatValues.indexOf(value)
  return flatValues.slice(
    Math.min(anchorIndex, valueIndex),
    Math.max(anchorIndex, valueIndex) + 1,
  )
}

function getFlatValues(data: TreeNodeData[]): string[] {
  return data.reduce<string[]>((acc, item) => {
    acc.push(item.value)
    if (item.children) {
      acc.push(...getFlatValues(item.children))
    }
    return acc
  }, [])
}

function isVisibleTreeNode(node: HTMLElement, root: Element) {
  for (let current: HTMLElement | null = node; current && current !== root;) {
    if (current.style.display === "none") {
      return false
    }
    current = current.parentElement
  }
  return true
}

function isDescendantOf(
  data: TreeNodeData[],
  ancestorValue: string,
  descendantValue: string,
) {
  const ancestor = findTreeNode(ancestorValue, data)
  if (!ancestor?.children) {
    return false
  }

  const check = (nodes: TreeNodeData[]): boolean =>
    nodes.some(
      (node) =>
        node.value === descendantValue ||
        (!!node.children && check(node.children)),
    )

  return check(ancestor.children)
}

function getDragDropPosition(
  event: React.DragEvent,
  element: HTMLElement,
  hasChildren: boolean,
  isExpanded: boolean,
): TreeDragDropPosition {
  const rect = element.getBoundingClientRect()
  const y = event.clientY - rect.top
  const height = rect.height

  if (hasChildren) {
    if (isExpanded) {
      return y < height * 0.5 ? "before" : "inside"
    }
    if (y < height * 0.25) {
      return "before"
    }
    if (y > height * 0.75) {
      return "after"
    }
    return "inside"
  }

  return y < height * 0.5 ? "before" : "after"
}

function useTreeNodeDragDrop({
  nodeValue,
  hasChildren,
  isExpanded,
  data,
  onDragDrop,
  dragStateRef,
  allowDrop,
  withDragHandle,
}: {
  nodeValue: string
  hasChildren: boolean
  isExpanded: boolean
  data: TreeNodeData[]
  onDragDrop: ((payload: TreeDragDropPayload) => void) | undefined
  dragStateRef: React.RefObject<TreeDragState>
  allowDrop: TreeAllowDrop | undefined
  withDragHandle: boolean | undefined
}) {
  const [isDragHandleActive, setIsDragHandleActive] = React.useState(false)

  React.useEffect(() => {
    if (!withDragHandle || !isDragHandleActive) {
      return undefined
    }

    const handleMouseUp = () => setIsDragHandleActive(false)
    window.addEventListener("mouseup", handleMouseUp)
    return () => window.removeEventListener("mouseup", handleMouseUp)
  }, [withDragHandle, isDragHandleActive])

  if (!onDragDrop) {
    return { elementProps: {}, dragHandleProps: undefined }
  }

  const handleDragStart = (event: React.DragEvent) => {
    if (withDragHandle && !isDragHandleActive) {
      return
    }

    event.stopPropagation()
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("text/plain", nodeValue)
    dragStateRef.current.draggedValue = nodeValue

    const target = event.currentTarget as HTMLElement
    target.closest("[role=treeitem]")?.setAttribute("data-dragging", "true")
    requestAnimationFrame(() => target.setAttribute("data-dragging", "true"))
  }

  const handleDragOver = (event: React.DragEvent) => {
    const draggedValue = dragStateRef.current.draggedValue
    if (!draggedValue || draggedValue === nodeValue) {
      return
    }

    if (isDescendantOf(data, draggedValue, nodeValue)) {
      return
    }

    const target = event.currentTarget as HTMLElement
    const position = getDragDropPosition(event, target, hasChildren, isExpanded)
    const previous = dragStateRef.current.currentDropTarget

    if (
      allowDrop &&
      !allowDrop({ draggedNode: draggedValue, targetNode: nodeValue, position })
    ) {
      if (previous && previous !== target) {
        previous.removeAttribute("data-drag-over")
      }
      target.removeAttribute("data-drag-over")
      dragStateRef.current.currentDropTarget = null
      return
    }

    event.preventDefault()
    event.stopPropagation()
    event.dataTransfer.dropEffect = "move"

    if (previous && previous !== target) {
      previous.removeAttribute("data-drag-over")
    }

    target.setAttribute("data-drag-over", position)
    dragStateRef.current.currentDropTarget = target
  }

  const handleDragLeave = (event: React.DragEvent) => {
    const target = event.currentTarget as HTMLElement
    const related = event.relatedTarget as HTMLElement | null

    if (related && target.contains(related)) {
      return
    }

    target.removeAttribute("data-drag-over")

    if (dragStateRef.current.currentDropTarget === target) {
      dragStateRef.current.currentDropTarget = null
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const target = event.currentTarget as HTMLElement
    const position = target.getAttribute(
      "data-drag-over",
    ) as TreeDragDropPosition | null
    target.removeAttribute("data-drag-over")

    const draggedValue = dragStateRef.current.draggedValue
    if (draggedValue && position && draggedValue !== nodeValue) {
      const payload = {
        draggedNode: draggedValue,
        targetNode: nodeValue,
        position,
      }
      if (!allowDrop || allowDrop(payload)) {
        onDragDrop(payload)
      }
    }

    dragStateRef.current.draggedValue = null
    dragStateRef.current.currentDropTarget = null
  }

  const handleDragEnd = (event: React.DragEvent) => {
    const target = event.currentTarget as HTMLElement
    target.removeAttribute("data-dragging")
    target.closest("[role=treeitem]")?.removeAttribute("data-dragging")
    dragStateRef.current.currentDropTarget?.removeAttribute("data-drag-over")
    dragStateRef.current.draggedValue = null
    dragStateRef.current.currentDropTarget = null

    if (withDragHandle) {
      setIsDragHandleActive(false)
    }
  }

  return {
    elementProps: {
      draggable: withDragHandle ? isDragHandleActive : true,
      onDragStart: handleDragStart,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onDragEnd: handleDragEnd,
    },
    dragHandleProps: withDragHandle
      ? { onMouseDown: () => setIsDragHandleActive(true) }
      : undefined,
  }
}

interface TreeNodeSharedProps {
  controller: TreeController
  expandOnClick: boolean
  selectOnClick: boolean | undefined
  allowRangeSelection: boolean
  expandOnSpace: boolean
  checkOnSpace: boolean | undefined
  keepMounted: boolean | undefined
  renderNode: RenderTreeNode | undefined
  onDragDrop: ((payload: TreeDragDropPayload) => void) | undefined
  allowDrop: TreeAllowDrop | undefined
  withDragHandle: boolean | undefined
  dragStateRef: React.RefObject<TreeDragState>
  flatValues: string[]
  data: TreeNodeData[]
}

function TreeNode({
  node,
  rootIndex,
  isSubtree,
  level = 1,
  ...shared
}: TreeNodeSharedProps & {
  node: TreeNodeData
  rootIndex: number | undefined
  isSubtree?: boolean
  level?: number
}) {
  const {
    controller,
    expandOnClick,
    selectOnClick,
    allowRangeSelection,
    expandOnSpace,
    checkOnSpace,
    keepMounted,
    renderNode,
    onDragDrop,
    allowDrop,
    withDragHandle,
    dragStateRef,
    flatValues,
    data,
  } = shared
  const loadedChildren =
    Array.isArray(node.children) && node.children.length > 0
  const hasChildren = loadedChildren || !!node.hasChildren
  const isLoading = controller.isNodeLoading(node.value)
  const loadError = controller.getNodeLoadError(node.value)
  const isExpanded = controller.expandedState[node.value] || false
  const selected = controller.selectedState.includes(node.value)

  const nested = (node.children || []).map((child) => (
    <TreeNode
      key={child.value}
      node={child}
      rootIndex={undefined}
      level={level + 1}
      isSubtree
      {...shared}
    />
  ))

  const { elementProps: dragElementProps, dragHandleProps } =
    useTreeNodeDragDrop({
      nodeValue: node.value,
      hasChildren,
      isExpanded,
      data,
      onDragDrop,
      dragStateRef,
      allowDrop,
      withDragHandle,
    })

  const focusNode = (target: HTMLElement | null | undefined) => {
    target?.setAttribute("data-focus-ring", "true")
    target?.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "ArrowRight") {
      event.stopPropagation()
      event.preventDefault()

      if (isExpanded) {
        focusNode(
          event.currentTarget.querySelector<HTMLLIElement>("[role=treeitem]"),
        )
      } else {
        controller.expand(node.value)
      }
    }

    if (event.key === "ArrowLeft") {
      event.stopPropagation()
      event.preventDefault()

      if (isExpanded && hasChildren) {
        controller.collapse(node.value)
      } else if (isSubtree) {
        focusNode(
          event.currentTarget.parentElement?.closest<HTMLElement>(
            "[role=treeitem]",
          ),
        )
      }
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      const root = event.currentTarget.closest("[data-tree-root]")
      if (!root) {
        return
      }

      event.stopPropagation()
      event.preventDefault()

      const nodes = Array.from(
        root.querySelectorAll<HTMLLIElement>("[role=treeitem]"),
      ).filter((item) => isVisibleTreeNode(item, root))
      const index = nodes.indexOf(event.currentTarget)

      if (index === -1) {
        return
      }

      const next = nodes[event.key === "ArrowDown" ? index + 1 : index - 1]
      focusNode(next)

      if (event.shiftKey && next) {
        controller.setSelectedState(
          getValuesRange(controller.anchorNode, next.dataset.value, flatValues),
        )
      }
    }

    if (event.key === " ") {
      if (expandOnSpace) {
        event.stopPropagation()
        event.preventDefault()
        controller.toggleExpanded(node.value)
      }

      if (checkOnSpace) {
        event.stopPropagation()
        event.preventDefault()
        if (controller.isNodeChecked(node.value)) {
          controller.uncheckNode(node.value)
        } else {
          controller.checkNode(node.value)
        }
      }
    }
  }

  const handleNodeClick = (event: React.MouseEvent) => {
    event.stopPropagation()

    if (allowRangeSelection && event.shiftKey && controller.anchorNode) {
      controller.setSelectedState(
        getValuesRange(controller.anchorNode, node.value, flatValues),
      )
    } else {
      if (expandOnClick) {
        controller.toggleExpanded(node.value)
      }
      if (selectOnClick) {
        controller.select(node.value)
      }
    }

    event.currentTarget.closest<HTMLElement>("[role=treeitem]")?.focus()
  }

  const elementProps = {
    className: labelClassName,
    "data-slot": "tree-label",
    onClick: handleNodeClick,
    "data-selected": selected || undefined,
    "data-value": node.value,
    ...dragElementProps,
  }

  const nodeStyle = {
    "--label-offset": `calc(var(--level-offset) * ${level - 1})`,
    "--line-offset": `calc(var(--level-offset) * ${level - 1} - var(--half-offset))`,
  } as React.CSSProperties

  const subtree = (children: React.ReactNode) => (
    <ul
      data-slot="tree-subtree"
      role="group"
      data-level={level}
      className="m-0 p-0"
    >
      {children}
    </ul>
  )

  return (
    <li
      data-slot="tree-node"
      role="treeitem"
      aria-selected={selected}
      aria-expanded={hasChildren ? isExpanded : undefined}
      data-value={node.value}
      data-selected={selected || undefined}
      data-level={level}
      tabIndex={rootIndex === 0 ? 0 : -1}
      className={cn(nodeClassName, isSubtree && subtreeNodeLineClassName)}
      style={nodeStyle}
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget as HTMLElement | null,
          )
        ) {
          event.currentTarget.removeAttribute("data-focus-ring")
        }
      }}
    >
      {typeof renderNode === "function" ? (
        renderNode({
          node,
          level,
          selected,
          isRoot: level === 1,
          tree: controller,
          expanded: isExpanded,
          hasChildren,
          isLoading,
          loadError,
          elementProps,
          dragHandleProps,
        })
      ) : (
        <div {...elementProps}>{node.label}</div>
      )}

      {isExpanded &&
        isLoading &&
        nested.length === 0 &&
        subtree(
          <li
            className="list-none"
            style={
              {
                "--label-offset": `calc(var(--level-offset) * ${level})`,
              } as React.CSSProperties
            }
          >
            <div className="ps-(--label-offset)">
              <Spinner className="ms-1 size-4" />
            </div>
          </li>,
        )}

      {keepMounted && nested.length > 0 ? (
        <React.Activity mode={isExpanded ? "visible" : "hidden"}>
          {subtree(nested)}
        </React.Activity>
      ) : (
        isExpanded && nested.length > 0 && subtree(nested)
      )}
    </li>
  )
}

interface TreeProps extends Omit<React.ComponentProps<"ul">, "children"> {
  /** Data used to render nodes */
  data: TreeNodeData[]
  /** Horizontal padding of each subtree level: `xs`-`xl` or any CSS length. @default "lg" */
  levelOffset?: TreeLevelOffset
  /** Expand a node with children on click. @default true */
  expandOnClick?: boolean
  /** Expand a node with children on Space. @default true */
  expandOnSpace?: boolean
  /** Check a node on Space. @default false */
  checkOnSpace?: boolean
  /** Select a node on click. @default false */
  selectOnClick?: boolean
  /** Instance of `useTree` used to read and drive the tree state */
  tree?: TreeController
  /** Render a custom node label */
  renderNode?: RenderTreeNode
  /** Clear the selection when the user clicks outside the tree. @default false */
  clearSelectionOnOutsideClick?: boolean
  /** Select a range of nodes with Shift+click. @default true */
  allowRangeSelection?: boolean
  /** Keep collapsed subtrees mounted (hidden with `Activity`) to preserve their state. @default false */
  keepMounted?: boolean
  /** Called when a node is dropped on another node; enables drag and drop when provided */
  onDragDrop?: (payload: TreeDragDropPayload) => void
  /** Decides per drop target whether a drop is allowed */
  allowDrop?: TreeAllowDrop
  /** Require drag to start from an element that spreads `dragHandleProps`. @default false */
  withDragHandle?: boolean
  /** Render connecting lines between parents and children. @default false */
  withLines?: boolean
}

function Tree({
  data,
  levelOffset = "lg",
  expandOnClick = true,
  expandOnSpace = true,
  checkOnSpace,
  selectOnClick,
  tree,
  renderNode,
  clearSelectionOnOutsideClick,
  allowRangeSelection = true,
  keepMounted,
  onDragDrop,
  allowDrop,
  withDragHandle,
  withLines,
  className,
  style,
  ref,
  ...props
}: TreeProps) {
  const defaultController = useTree()
  const controller = tree || defaultController
  const dragStateRef = React.useRef<TreeDragState>({
    draggedValue: null,
    currentDropTarget: null,
  })
  const rootRef = React.useRef<HTMLUListElement | null>(null)

  const controllerRef = React.useRef(controller)
  const clearOnOutsideClickRef = React.useRef(clearSelectionOnOutsideClick)

  React.useEffect(() => {
    controllerRef.current = controller
    clearOnOutsideClickRef.current = clearSelectionOnOutsideClick
  })

  React.useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        clearOnOutsideClickRef.current &&
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        controllerRef.current.clearSelected()
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("touchstart", handlePointerDown)
    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("touchstart", handlePointerDown)
    }
  }, [])

  const flatValues = React.useMemo(() => getFlatValues(data), [data])

  React.useEffect(() => {
    controllerRef.current.initialize(data)
  }, [data])

  const setRefs = React.useCallback(
    (node: HTMLUListElement | null) => {
      rootRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref],
  )

  const levelOffsetValue = getLevelOffset(levelOffset)

  return (
    <ul
      data-slot="tree"
      data-tree-root
      data-with-lines={withLines || undefined}
      role="tree"
      aria-multiselectable={controller.multiple}
      ref={setRefs}
      className={cn("group/tree m-0 p-0 select-none", className)}
      style={
        {
          "--level-offset": levelOffsetValue,
          "--half-offset": `calc(${levelOffsetValue} / 2)`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {data.map((node, index) => (
        <TreeNode
          key={node.value}
          node={node}
          rootIndex={index}
          controller={controller}
          expandOnClick={expandOnClick}
          selectOnClick={selectOnClick}
          allowRangeSelection={allowRangeSelection}
          expandOnSpace={expandOnSpace}
          checkOnSpace={checkOnSpace}
          keepMounted={keepMounted}
          renderNode={renderNode}
          onDragDrop={onDragDrop}
          allowDrop={allowDrop}
          withDragHandle={withDragHandle}
          dragStateRef={dragStateRef}
          flatValues={flatValues}
          data={data}
        />
      ))}
    </ul>
  )
}

export { Tree }
export type {
  RenderTreeNode,
  RenderTreeNodePayload,
  TreeAllowDrop,
  TreeDragHandleProps,
  TreeDragState,
  TreeLevelOffset,
  TreeProps,
}
export { getTreeExpandedState, moveTreeNode, useTree } from "@/hooks/use-tree"
export type {
  CheckedNodeStatus,
  TreeController,
  TreeDragDropPayload,
  TreeDragDropPosition,
  TreeExpandedState,
  TreeNodeData,
  UseTreeInput,
} from "@/hooks/use-tree"
