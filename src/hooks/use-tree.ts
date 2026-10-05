import * as React from "react"

interface TreeNodeData {
  label: React.ReactNode
  value: string
  nodeProps?: Record<string, unknown>
  children?: TreeNodeData[]
  /** Marks a node whose children are loaded lazily through `onLoadChildren` */
  hasChildren?: boolean
}

type TreeExpandedState = Record<string, boolean>

interface CheckedNodeStatus {
  checked: boolean
  indeterminate: boolean
  hasChildren: boolean
  value: string
}

type TreeDragDropPosition = "before" | "after" | "inside"

interface TreeDragDropPayload {
  /** Value of the dragged node */
  draggedNode: string
  /** Value of the target node */
  targetNode: string
  /** Position relative to the target node */
  position: TreeDragDropPosition
}

function findTreeNode(
  value: string,
  data: TreeNodeData[],
): TreeNodeData | null {
  for (const node of data) {
    if (node.value === value) {
      return node
    }

    if (Array.isArray(node.children)) {
      const child = findTreeNode(value, node.children)
      if (child) {
        return child
      }
    }
  }

  return null
}

function hasLoadedChildren(node: TreeNodeData) {
  return Array.isArray(node.children) && node.children.length > 0
}

/** Values of all leaf nodes at or below the node with the given value. */
function getChildrenNodesValues(
  value: string,
  data: TreeNodeData[],
  acc: string[] = [],
): string[] {
  const node = findTreeNode(value, data)
  if (!node) {
    return acc
  }

  if (!hasLoadedChildren(node)) {
    return [node.value]
  }

  node.children!.forEach((child) => {
    if (hasLoadedChildren(child)) {
      getChildrenNodesValues(child.value, data, acc)
    } else {
      acc.push(child.value)
    }
  })

  return acc
}

function getAllChildrenNodes(data: TreeNodeData[]) {
  return data.reduce<string[]>((acc, node) => {
    if (hasLoadedChildren(node)) {
      acc.push(...getAllChildrenNodes(node.children!))
    } else {
      acc.push(node.value)
    }

    return acc
  }, [])
}

function getAllNodeValues(data: TreeNodeData[]): string[] {
  const acc: string[] = []
  for (const node of data) {
    acc.push(node.value)
    if (hasLoadedChildren(node)) {
      acc.push(...getAllNodeValues(node.children!))
    }
  }
  return acc
}

function getAllCheckedNodes(
  data: TreeNodeData[],
  checkedState: string[],
  acc: CheckedNodeStatus[] = [],
) {
  const currentTreeChecked: CheckedNodeStatus[] = []

  for (const node of data) {
    if (hasLoadedChildren(node)) {
      const inner = getAllCheckedNodes(node.children!, checkedState, acc)
      if (inner.currentTreeChecked.length === node.children!.length) {
        const checked = inner.currentTreeChecked.every((item) => item.checked)
        const item = {
          checked,
          indeterminate: !checked,
          value: node.value,
          hasChildren: true,
        }
        currentTreeChecked.push(item)
        acc.push(item)
      } else if (inner.currentTreeChecked.length > 0) {
        const item = {
          checked: false,
          indeterminate: true,
          value: node.value,
          hasChildren: true,
        }
        currentTreeChecked.push(item)
        acc.push(item)
      }
    } else if (checkedState.includes(node.value)) {
      const item = {
        checked: true,
        indeterminate: false,
        value: node.value,
        hasChildren: false,
      }
      currentTreeChecked.push(item)
      acc.push(item)
    }
  }

  return { result: acc, currentTreeChecked }
}

function getInitialTreeExpandedState(
  initialState: TreeExpandedState,
  data: TreeNodeData[],
  selected: string[],
  acc: TreeExpandedState = {},
) {
  data.forEach((node) => {
    acc[node.value] =
      node.value in initialState
        ? initialState[node.value]
        : selected.includes(node.value)

    if (Array.isArray(node.children)) {
      getInitialTreeExpandedState(initialState, node.children, selected, acc)
    }
  })

  return acc
}

/** Builds an expanded-state record for `data` with the given values expanded (or every node for `"*"`). */
function getTreeExpandedState(
  data: TreeNodeData[],
  expandedNodesValues: string[] | "*",
): TreeExpandedState {
  const state = getInitialTreeExpandedState({}, data, [])

  if (expandedNodesValues === "*") {
    return Object.fromEntries(Object.keys(state).map((key) => [key, true]))
  }

  expandedNodesValues.forEach((value) => {
    state[value] = true
  })

  return state
}

function isDescendant(data: TreeNodeData[], ancestor: string, value: string) {
  const node = findTreeNode(ancestor, data)
  if (!node?.children) {
    return false
  }

  const check = (nodes: TreeNodeData[]): boolean =>
    nodes.some(
      (item) =>
        item.value === value || (!!item.children && check(item.children)),
    )

  return check(node.children)
}

function removeNode(
  data: TreeNodeData[],
  value: string,
): { data: TreeNodeData[]; removed: TreeNodeData | null } {
  let removed: TreeNodeData | null = null

  const next = data.reduce<TreeNodeData[]>((acc, node) => {
    if (node.value === value) {
      removed = { ...node }
      return acc
    }

    if (node.children) {
      const result = removeNode(node.children, value)
      if (result.removed) {
        removed = result.removed
        acc.push({ ...node, children: result.data })
        return acc
      }
    }

    acc.push(node)
    return acc
  }, [])

  return { data: next, removed }
}

function insertNode(
  data: TreeNodeData[],
  node: TreeNodeData,
  targetValue: string,
  position: TreeDragDropPosition,
): TreeNodeData[] {
  if (position === "inside") {
    return data.map((item) => {
      if (item.value === targetValue) {
        return { ...item, children: [...(item.children || []), node] }
      }

      if (item.children) {
        return {
          ...item,
          children: insertNode(item.children, node, targetValue, position),
        }
      }

      return item
    })
  }

  const targetIndex = data.findIndex((item) => item.value === targetValue)

  if (targetIndex !== -1) {
    const result = [...data]
    result.splice(
      position === "before" ? targetIndex : targetIndex + 1,
      0,
      node,
    )
    return result
  }

  return data.map((item) =>
    item.children
      ? {
          ...item,
          children: insertNode(item.children, node, targetValue, position),
        }
      : item,
  )
}

/** Returns a new data array with the dragged node moved relative to the target. */
function moveTreeNode(
  data: TreeNodeData[],
  payload: TreeDragDropPayload,
): TreeNodeData[] {
  const { draggedNode, targetNode, position } = payload

  if (draggedNode === targetNode || !findTreeNode(targetNode, data)) {
    return data
  }

  if (isDescendant(data, draggedNode, targetNode)) {
    return data
  }

  const { data: without, removed } = removeNode(data, draggedNode)

  if (!removed) {
    return data
  }

  return insertNode(without, removed, targetNode, position)
}

function useControllable<T>({
  value,
  defaultValue,
  onChange,
}: {
  value: T | undefined
  defaultValue: T
  onChange?: (value: T) => void
}) {
  const [internal, setInternal] = React.useState(defaultValue)
  const controlled = value !== undefined
  const onChangeRef = React.useRef(onChange)
  React.useEffect(() => {
    onChangeRef.current = onChange
  })

  const set = React.useCallback(
    (next: T) => {
      if (!controlled) {
        setInternal(next)
      }
      onChangeRef.current?.(next)
    },
    [controlled],
  )

  return [controlled ? value : internal, set] as const
}

interface UseTreeInput {
  /** Initial expanded state of all nodes, uncontrolled state */
  initialExpandedState?: TreeExpandedState
  /** Expanded state of all nodes, controlled state */
  expandedState?: TreeExpandedState
  /** Called when the tree expanded state changes */
  onExpandedStateChange?: (expandedState: TreeExpandedState) => void
  /** Initial selected state of nodes */
  initialSelectedState?: string[]
  /** Selected state of all nodes, controlled state */
  selectedState?: string[]
  /** Called when the tree selected state changes */
  onSelectedStateChange?: (selectedState: string[]) => void
  /** Initial checked state of nodes */
  initialCheckedState?: string[]
  /** Checked state of all nodes, controlled state */
  checkedState?: string[]
  /** Called when the tree checked state changes */
  onCheckedStateChange?: (checkedState: string[]) => void
  /** Determines whether multiple nodes can be selected at a time */
  multiple?: boolean
  /** Called with the node value when it is expanded */
  onNodeExpand?: (value: string) => void
  /** Called with the node value when it is collapsed */
  onNodeCollapse?: (value: string) => void
  /** Called when a node with `hasChildren: true` is expanded for the first time. It should update the tree data with the loaded children. */
  onLoadChildren?: (nodeValue: string) => Promise<void>
  /** When `true`, checking a parent does not affect children and vice versa. @default false */
  checkStrictly?: boolean
}

const EMPTY_EXPANDED: TreeExpandedState = {}
const EMPTY_LIST: string[] = []

function useTree({
  initialSelectedState = EMPTY_LIST,
  expandedState,
  initialCheckedState = EMPTY_LIST,
  checkedState,
  initialExpandedState = EMPTY_EXPANDED,
  selectedState,
  multiple = false,
  onNodeCollapse,
  onNodeExpand,
  onCheckedStateChange,
  onSelectedStateChange,
  onExpandedStateChange,
  onLoadChildren,
  checkStrictly = false,
}: UseTreeInput = {}) {
  const [data, setData] = React.useState<TreeNodeData[]>([])

  const [expanded, setExpandedState] = useControllable({
    value: expandedState,
    defaultValue: initialExpandedState,
    onChange: onExpandedStateChange,
  })
  const [selected, setSelectedState] = useControllable({
    value: selectedState,
    defaultValue: initialSelectedState,
    onChange: onSelectedStateChange,
  })
  const [checked, setCheckedState] = useControllable({
    value: checkedState,
    defaultValue: initialCheckedState,
    onChange: onCheckedStateChange,
  })

  const [anchorNode, setAnchorNode] = React.useState<string | null>(null)

  const loadingRef = React.useRef(new Set<string>())
  const loadedRef = React.useRef(new Set<string>())
  const [loadingNodes, setLoadingNodes] = React.useState<string[]>([])
  const [loadErrors, setLoadErrors] = React.useState<Record<string, Error>>({})

  const initialize = React.useCallback(
    (nextData: TreeNodeData[]) => {
      setExpandedState(
        getInitialTreeExpandedState(expanded, nextData, selected),
      )
      if (!checkStrictly) {
        const acc: string[] = []
        checked.forEach((value) =>
          acc.push(...getChildrenNodesValues(value, nextData)),
        )
        setCheckedState(Array.from(new Set(acc)))
      }
      setData(nextData)
    },
    [
      expanded,
      selected,
      checked,
      checkStrictly,
      setExpandedState,
      setCheckedState,
    ],
  )

  const clearLoadError = React.useCallback((value: string) => {
    setLoadErrors((prev) => {
      if (!(value in prev)) {
        return prev
      }
      const next = { ...prev }
      delete next[value]
      return next
    })
  }, [])

  const loadNode = React.useCallback(
    async (value: string) => {
      if (!onLoadChildren) {
        return
      }

      if (loadingRef.current.has(value) || loadedRef.current.has(value)) {
        return
      }

      loadingRef.current.add(value)
      setLoadingNodes(Array.from(loadingRef.current))
      clearLoadError(value)

      try {
        await onLoadChildren(value)
        loadedRef.current.add(value)
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error))
        setLoadErrors((prev) => ({ ...prev, [value]: err }))
      } finally {
        loadingRef.current.delete(value)
        setLoadingNodes(Array.from(loadingRef.current))
      }
    },
    [onLoadChildren, clearLoadError],
  )

  const tryLoadAsync = React.useCallback(
    (value: string) => {
      if (!onLoadChildren) {
        return
      }

      const node = findTreeNode(value, data)
      if (node && node.hasChildren && !Array.isArray(node.children)) {
        void loadNode(value)
      }
    },
    [onLoadChildren, data, loadNode],
  )

  const toggleExpanded = React.useCallback(
    (value: string) => {
      const next = { ...expanded, [value]: !expanded[value] }
      if (next[value]) {
        onNodeExpand?.(value)
        tryLoadAsync(value)
      } else {
        onNodeCollapse?.(value)
      }
      setExpandedState(next)
    },
    [expanded, onNodeExpand, onNodeCollapse, tryLoadAsync, setExpandedState],
  )

  const collapse = React.useCallback(
    (value: string) => {
      if (expanded[value] !== false) {
        onNodeCollapse?.(value)
      }
      setExpandedState({ ...expanded, [value]: false })
    },
    [expanded, onNodeCollapse, setExpandedState],
  )

  const expand = React.useCallback(
    (value: string) => {
      if (expanded[value] !== true) {
        onNodeExpand?.(value)
      }
      tryLoadAsync(value)
      setExpandedState({ ...expanded, [value]: true })
    },
    [expanded, onNodeExpand, tryLoadAsync, setExpandedState],
  )

  const expandAllNodes = React.useCallback(() => {
    const next = { ...expanded }
    Object.keys(next).forEach((key) => {
      next[key] = true
      tryLoadAsync(key)
    })
    setExpandedState(next)
  }, [expanded, tryLoadAsync, setExpandedState])

  const collapseAllNodes = React.useCallback(() => {
    const next = { ...expanded }
    Object.keys(next).forEach((key) => {
      next[key] = false
    })
    setExpandedState(next)
  }, [expanded, setExpandedState])

  const toggleSelected = React.useCallback(
    (value: string) => {
      if (selected.includes(value)) {
        setAnchorNode(null)
        setSelectedState(selected.filter((item) => item !== value))
        return
      }

      setAnchorNode(value)
      setSelectedState(multiple ? [...selected, value] : [value])
    },
    [selected, multiple, setSelectedState],
  )

  const select = React.useCallback(
    (value: string) => {
      setAnchorNode(value)
      setSelectedState(
        multiple
          ? selected.includes(value)
            ? selected
            : [...selected, value]
          : [value],
      )
    },
    [selected, multiple, setSelectedState],
  )

  const deselect = React.useCallback(
    (value: string) => {
      if (anchorNode === value) {
        setAnchorNode(null)
      }
      setSelectedState(selected.filter((item) => item !== value))
    },
    [anchorNode, selected, setSelectedState],
  )

  const clearSelected = React.useCallback(() => {
    setSelectedState([])
    setAnchorNode(null)
  }, [setSelectedState])

  const checkNode = React.useCallback(
    (value: string) => {
      if (checkStrictly) {
        if (!checked.includes(value)) {
          setCheckedState([...checked, value])
        }
        return
      }
      setCheckedState(
        Array.from(
          new Set([...checked, ...getChildrenNodesValues(value, data)]),
        ),
      )
    },
    [checked, checkStrictly, data, setCheckedState],
  )

  const uncheckNode = React.useCallback(
    (value: string) => {
      if (checkStrictly) {
        setCheckedState(checked.filter((item) => item !== value))
        return
      }
      const values = getChildrenNodesValues(value, data)
      setCheckedState(checked.filter((item) => !values.includes(item)))
    },
    [checked, checkStrictly, data, setCheckedState],
  )

  const checkAllNodes = React.useCallback(() => {
    setCheckedState(
      checkStrictly ? getAllNodeValues(data) : getAllChildrenNodes(data),
    )
  }, [checkStrictly, data, setCheckedState])

  const uncheckAllNodes = React.useCallback(() => {
    setCheckedState([])
  }, [setCheckedState])

  const checkedStatuses = React.useMemo(() => {
    if (checkStrictly || checked.length === 0) {
      return new Map<string, CheckedNodeStatus>()
    }
    return new Map(
      getAllCheckedNodes(data, checked).result.map((item) => [
        item.value,
        item,
      ]),
    )
  }, [checkStrictly, checked, data])

  const getCheckedNodes = React.useCallback((): CheckedNodeStatus[] => {
    if (checkStrictly) {
      return checked.map((value) => {
        const node = findTreeNode(value, data)
        return {
          checked: true,
          indeterminate: false,
          value,
          hasChildren: node
            ? hasLoadedChildren(node) || !!node.hasChildren
            : false,
        }
      })
    }
    return Array.from(checkedStatuses.values())
  }, [checkStrictly, checked, data, checkedStatuses])

  const isNodeChecked = React.useCallback(
    (value: string) => {
      if (checkStrictly || checked.includes(value)) {
        return checked.includes(value)
      }
      return checkedStatuses.get(value)?.checked ?? false
    },
    [checkStrictly, checked, checkedStatuses],
  )

  const isNodeIndeterminate = React.useCallback(
    (value: string) => checkedStatuses.get(value)?.indeterminate ?? false,
    [checkedStatuses],
  )

  const isNodeLoading = React.useCallback(
    (value: string) => loadingNodes.includes(value),
    [loadingNodes],
  )

  const getNodeLoadError = React.useCallback(
    (value: string) => loadErrors[value] || null,
    [loadErrors],
  )

  const invalidateNode = React.useCallback(
    (value: string) => {
      loadedRef.current.delete(value)
      clearLoadError(value)
    },
    [clearLoadError],
  )

  return React.useMemo(
    () => ({
      checkStrictly,
      multiple,
      expandedState: expanded,
      selectedState: selected,
      checkedState: checked,
      anchorNode,
      initialize,
      toggleExpanded,
      collapse,
      expand,
      expandAllNodes,
      collapseAllNodes,
      setExpandedState,
      checkNode,
      uncheckNode,
      checkAllNodes,
      uncheckAllNodes,
      setCheckedState,
      toggleSelected,
      select,
      deselect,
      clearSelected,
      setSelectedState,
      getCheckedNodes,
      isNodeChecked,
      isNodeIndeterminate,
      isNodeLoading,
      getNodeLoadError,
      loadNode,
      invalidateNode,
    }),
    [
      checkStrictly,
      multiple,
      expanded,
      selected,
      checked,
      anchorNode,
      initialize,
      toggleExpanded,
      collapse,
      expand,
      expandAllNodes,
      collapseAllNodes,
      setExpandedState,
      checkNode,
      uncheckNode,
      checkAllNodes,
      uncheckAllNodes,
      setCheckedState,
      toggleSelected,
      select,
      deselect,
      clearSelected,
      setSelectedState,
      getCheckedNodes,
      isNodeChecked,
      isNodeIndeterminate,
      isNodeLoading,
      getNodeLoadError,
      loadNode,
      invalidateNode,
    ],
  )
}

type TreeController = ReturnType<typeof useTree>

export {
  findTreeNode,
  getAllCheckedNodes,
  getChildrenNodesValues,
  getTreeExpandedState,
  moveTreeNode,
  useTree,
}
export type {
  CheckedNodeStatus,
  TreeController,
  TreeDragDropPayload,
  TreeDragDropPosition,
  TreeExpandedState,
  TreeNodeData,
  UseTreeInput,
}
