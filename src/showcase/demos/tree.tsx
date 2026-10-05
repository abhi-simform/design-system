import * as React from "react"
import {
  ChevronRightIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  GripVerticalIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tree,
  getTreeExpandedState,
  moveTreeNode,
  useTree,
  type RenderTreeNode,
  type TreeLevelOffset,
  type TreeNodeData,
} from "@/components/ui/tree"
import { cn } from "cn"

const FILES: TreeNodeData[] = [
  {
    label: "src",
    value: "src",
    children: [
      {
        label: "components",
        value: "src/components",
        children: [
          { label: "Accordion.tsx", value: "src/components/Accordion.tsx" },
          { label: "Tooltip.tsx", value: "src/components/Tooltip.tsx" },
          {
            label: "Dialog",
            value: "src/components/Dialog",
            children: [
              {
                label: "Dialog.tsx",
                value: "src/components/Dialog/Dialog.tsx",
              },
              {
                label: "Dialog.css",
                value: "src/components/Dialog/Dialog.css",
              },
            ],
          },
        ],
      },
      {
        label: "hooks",
        value: "src/hooks",
        children: [
          { label: "use-form.ts", value: "src/hooks/use-form.ts" },
          { label: "use-tree.ts", value: "src/hooks/use-tree.ts" },
        ],
      },
    ],
  },
  {
    label: "node_modules",
    value: "node_modules",
    children: [
      { label: "react", value: "node_modules/react" },
      { label: "vite", value: "node_modules/vite" },
    ],
  },
  { label: "package.json", value: "package.json" },
  { label: "tsconfig.json", value: "tsconfig.json" },
]

const rowClassName =
  "flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm hover:bg-muted/60"

const renderFileNode: RenderTreeNode = ({
  node,
  expanded,
  hasChildren,
  elementProps,
}) => {
  const { className, ...rest } = elementProps
  return (
    <div className={cn(className, rowClassName)} {...rest}>
      {hasChildren ? (
        expanded ? (
          <FolderOpenIcon className="size-4 text-muted-foreground" />
        ) : (
          <FolderIcon className="size-4 text-muted-foreground" />
        )
      ) : (
        <FileIcon className="size-4 text-muted-foreground" />
      )}
      <span>{node.label}</span>
    </div>
  )
}

export function TreePlayground({
  levelOffset,
  expandOnClick,
  selectOnClick,
  clearSelectionOnOutsideClick,
  allowRangeSelection,
  withLines,
  keepMounted,
}: {
  levelOffset: TreeLevelOffset
  expandOnClick: boolean
  selectOnClick: boolean
  clearSelectionOnOutsideClick: boolean
  allowRangeSelection: boolean
  withLines: boolean
  keepMounted: boolean
}) {
  const tree = useTree({ multiple: true })

  return (
    <div className="w-full max-w-sm">
      <Tree
        data={FILES}
        tree={tree}
        levelOffset={levelOffset}
        expandOnClick={expandOnClick}
        selectOnClick={selectOnClick}
        clearSelectionOnOutsideClick={clearSelectionOnOutsideClick}
        allowRangeSelection={allowRangeSelection}
        withLines={withLines}
        keepMounted={keepMounted}
        renderNode={renderFileNode}
      />
    </div>
  )
}

export function TreeBasic() {
  return (
    <div className="w-full max-w-sm">
      <Tree data={FILES} />
    </div>
  )
}

export function TreeController() {
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(FILES, ["src"]),
  })

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={tree.expandAllNodes}>
          Expand all
        </Button>
        <Button size="sm" variant="outline" onClick={tree.collapseAllNodes}>
          Collapse all
        </Button>
      </div>
      <Tree data={FILES} tree={tree} renderNode={renderFileNode} />
    </div>
  )
}

export function TreeSelection() {
  const tree = useTree({ multiple: true })

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Tree
        data={FILES}
        tree={tree}
        selectOnClick
        clearSelectionOnOutsideClick
        renderNode={renderFileNode}
      />
      <p className="text-xs text-muted-foreground">
        Click to select, Shift+click or Shift+Arrow to select a range. Selected:{" "}
        {tree.selectedState.length === 0
          ? "none"
          : tree.selectedState.join(", ")}
      </p>
    </div>
  )
}

const renderCheckboxNode: RenderTreeNode = ({
  node,
  expanded,
  hasChildren,
  tree,
  elementProps,
}) => {
  const { className, ...rest } = elementProps
  const checked = tree.isNodeChecked(node.value)
  const indeterminate = tree.isNodeIndeterminate(node.value)

  return (
    <div className={cn(className, rowClassName)} {...rest}>
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onClick={(event) => event.stopPropagation()}
        onCheckedChange={(value) =>
          value ? tree.checkNode(node.value) : tree.uncheckNode(node.value)
        }
        aria-label={`Check ${String(node.value)}`}
      />
      <span>{node.label}</span>
      {hasChildren && (
        <ChevronRightIcon
          className={cn(
            "ms-auto size-4 text-muted-foreground transition-transform",
            expanded && "rotate-90",
          )}
        />
      )}
    </div>
  )
}

export function TreeCheckboxes() {
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(FILES, "*"),
    initialCheckedState: ["src/hooks/use-form.ts"],
  })

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={tree.checkAllNodes}>
          Check all
        </Button>
        <Button size="sm" variant="outline" onClick={tree.uncheckAllNodes}>
          Uncheck all
        </Button>
      </div>
      <Tree
        data={FILES}
        tree={tree}
        checkOnSpace
        expandOnSpace={false}
        renderNode={renderCheckboxNode}
      />
      <p className="text-xs text-muted-foreground">
        Checking a parent cascades to its leaves and parents show an
        indeterminate state. Space toggles the focused node.
      </p>
    </div>
  )
}

export function TreeCheckStrictly() {
  const tree = useTree({
    checkStrictly: true,
    initialExpandedState: getTreeExpandedState(FILES, "*"),
  })

  return (
    <div className="w-full max-w-sm">
      <Tree
        data={FILES}
        tree={tree}
        checkOnSpace
        expandOnSpace={false}
        renderNode={renderCheckboxNode}
      />
    </div>
  )
}

export function TreeWithLines() {
  return (
    <div className="w-full max-w-sm">
      <Tree
        data={FILES}
        withLines
        levelOffset="xl"
        selectOnClick
        renderNode={renderFileNode}
      />
    </div>
  )
}

const LAZY_CHILDREN: Record<string, TreeNodeData[]> = {
  fruits: [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Citrus", value: "citrus", hasChildren: true },
  ],
  citrus: [
    { label: "Lemon", value: "lemon" },
    { label: "Orange", value: "orange" },
  ],
  vegetables: [
    { label: "Carrot", value: "carrot" },
    { label: "Kale", value: "kale" },
  ],
}

function attachChildren(
  data: TreeNodeData[],
  value: string,
  children: TreeNodeData[],
): TreeNodeData[] {
  return data.map((node) => {
    if (node.value === value) {
      return { ...node, children }
    }
    return node.children
      ? { ...node, children: attachChildren(node.children, value, children) }
      : node
  })
}

export function TreeAsyncLoading() {
  const [data, setData] = React.useState<TreeNodeData[]>([
    { label: "Fruits", value: "fruits", hasChildren: true },
    { label: "Vegetables", value: "vegetables", hasChildren: true },
  ])

  const tree = useTree({
    onLoadChildren: async (value) => {
      await new Promise((resolve) => setTimeout(resolve, 900))
      setData((current) =>
        attachChildren(current, value, LAZY_CHILDREN[value] ?? []),
      )
    },
  })

  return (
    <div className="w-full max-w-sm">
      <Tree
        data={data}
        tree={tree}
        renderNode={({ node, expanded, hasChildren, elementProps }) => {
          const { className, ...rest } = elementProps
          return (
            <div className={cn(className, rowClassName)} {...rest}>
              {hasChildren && (
                <ChevronRightIcon
                  className={cn(
                    "size-4 text-muted-foreground transition-transform",
                    expanded && "rotate-90",
                  )}
                />
              )}
              <span>{node.label}</span>
            </div>
          )
        }}
      />
    </div>
  )
}

const DND_DATA: TreeNodeData[] = [
  {
    label: "Backlog",
    value: "backlog",
    children: [
      { label: "Write docs", value: "docs" },
      { label: "Fix login bug", value: "login" },
    ],
  },
  {
    label: "In progress",
    value: "progress",
    children: [{ label: "Port Tree", value: "tree" }],
  },
  { label: "Done", value: "done", children: [] },
]

export function TreeDragAndDrop() {
  const [data, setData] = React.useState(DND_DATA)
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(DND_DATA, "*"),
  })

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Tree
        data={data}
        tree={tree}
        onDragDrop={(payload) =>
          setData((current) => moveTreeNode(current, payload))
        }
        allowDrop={({ targetNode, position }) =>
          targetNode !== "done" || position === "inside"
        }
        renderNode={renderFileNode}
      />
      <p className="text-xs text-muted-foreground">
        Drag a node before, after or inside another one.
      </p>
    </div>
  )
}

export function TreeDragHandle() {
  const [data, setData] = React.useState(DND_DATA)
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(DND_DATA, "*"),
  })

  return (
    <div className="w-full max-w-sm">
      <Tree
        data={data}
        tree={tree}
        withDragHandle
        onDragDrop={(payload) =>
          setData((current) => moveTreeNode(current, payload))
        }
        renderNode={({ node, elementProps, dragHandleProps }) => {
          const { className, ...rest } = elementProps
          return (
            <div className={cn(className, rowClassName)} {...rest}>
              <span
                {...dragHandleProps}
                className="cursor-grab text-muted-foreground"
              >
                <GripVerticalIcon className="size-4" />
              </span>
              <span>{node.label}</span>
            </div>
          )
        }}
      />
    </div>
  )
}
