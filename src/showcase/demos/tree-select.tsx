import * as React from "react"
import { FolderIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  TreeSelect,
  type TreeNodeData,
  type TreeSelectCheckedStrategy,
  type TreeSelectMode,
  type TreeSelectSize,
} from "@/components/ui/tree-select"

const data: TreeNodeData[] = [
  {
    label: "src",
    value: "src",
    children: [
      {
        label: "components",
        value: "src/components",
        children: [
          { label: "Accordion.tsx", value: "src/components/Accordion.tsx" },
          { label: "Tree.tsx", value: "src/components/Tree.tsx" },
          { label: "Button.tsx", value: "src/components/Button.tsx" },
        ],
      },
      {
        label: "hooks",
        value: "src/hooks",
        children: [
          { label: "use-tree.ts", value: "src/hooks/use-tree.ts" },
          { label: "use-focus-trap.ts", value: "src/hooks/use-focus-trap.ts" },
        ],
      },
      { label: "index.css", value: "src/index.css" },
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
  { label: "README.md", value: "README.md" },
]

const wrapper = "w-full max-w-sm"

export function TreeSelectPlayground({
  mode,
  searchable,
  clearable,
  expandOnClick,
  checkStrictly,
  checkedStrategy,
  withLines,
  allowDeselect,
  size,
  placeholder,
  disabled,
  readOnly,
  error,
}: {
  mode: TreeSelectMode
  searchable: boolean
  clearable: boolean
  expandOnClick: boolean
  checkStrictly: boolean
  checkedStrategy: TreeSelectCheckedStrategy
  withLines: boolean
  allowDeselect: boolean
  size: TreeSelectSize
  placeholder: string
  disabled: boolean
  readOnly: boolean
  error: boolean
}) {
  return (
    <TreeSelect
      key={mode}
      data={data}
      mode={mode}
      searchable={searchable}
      clearable={clearable}
      expandOnClick={expandOnClick}
      checkStrictly={checkStrictly}
      checkedStrategy={checkedStrategy}
      withLines={withLines}
      allowDeselect={allowDeselect}
      size={size}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      error={error}
      defaultExpandedValues={["src"]}
      nothingFoundMessage="Nothing found"
      wrapperClassName={wrapper}
      aria-label="File"
    />
  )
}

export function TreeSelectSingle() {
  const [value, setValue] = React.useState<string | null>(null)

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <TreeSelect
        data={data}
        value={value}
        onChange={setValue}
        placeholder="Pick a file"
        defaultExpandedValues={["src"]}
        clearable
        aria-label="File"
      />
      <p className="text-sm text-muted-foreground">Value: {value ?? "null"}</p>
    </div>
  )
}

export function TreeSelectSearchable() {
  return (
    <TreeSelect
      data={data}
      searchable
      clearable
      placeholder="Search files"
      nothingFoundMessage="Nothing found"
      defaultValue="src/hooks/use-tree.ts"
      wrapperClassName={wrapper}
      aria-label="File"
    />
  )
}

export function TreeSelectMultiple() {
  const [value, setValue] = React.useState<string[]>(["package.json"])

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <TreeSelect
        mode="multiple"
        data={data}
        value={value}
        onChange={setValue}
        placeholder="Pick files"
        defaultExpandedValues={["src"]}
        clearable
        searchable
        maxDisplayedValues={2}
        aria-label="Files"
      />
      <p className="text-sm text-muted-foreground">
        Value: {JSON.stringify(value)}
      </p>
    </div>
  )
}

export function TreeSelectExpandOnClick() {
  return (
    <TreeSelect
      mode="multiple"
      data={data}
      expandOnClick
      placeholder="Parents only expand"
      wrapperClassName={wrapper}
      aria-label="Files"
    />
  )
}

export function TreeSelectCheckbox() {
  const [value, setValue] = React.useState<string[]>([
    "src/hooks/use-tree.ts",
    "src/hooks/use-focus-trap.ts",
  ])

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <TreeSelect
        mode="checkbox"
        data={data}
        value={value}
        onChange={setValue}
        defaultExpandAll
        clearable
        placeholder="Check files"
        aria-label="Files"
      />
      <p className="text-sm text-muted-foreground">
        Value: {JSON.stringify(value)}
      </p>
    </div>
  )
}

export function TreeSelectCheckedStrategies() {
  const strategies: TreeSelectCheckedStrategy[] = ["child", "parent", "all"]

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {strategies.map((checkedStrategy) => (
        <div key={checkedStrategy} className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            checkedStrategy="{checkedStrategy}"
          </span>
          <TreeSelect
            mode="checkbox"
            data={data}
            checkedStrategy={checkedStrategy}
            defaultValue={[
              "src/hooks/use-tree.ts",
              "src/hooks/use-focus-trap.ts",
            ]}
            aria-label={`Files ${checkedStrategy}`}
          />
        </div>
      ))}
    </div>
  )
}

export function TreeSelectCheckStrictly() {
  return (
    <TreeSelect
      mode="checkbox"
      checkStrictly
      data={data}
      defaultValue={["src"]}
      defaultExpandedValues={["src"]}
      placeholder="Nodes are independent"
      wrapperClassName={wrapper}
      aria-label="Files"
    />
  )
}

export function TreeSelectMaxValues() {
  return (
    <TreeSelect
      mode="multiple"
      data={data}
      maxValues={2}
      defaultExpandedValues={["src"]}
      placeholder="Select up to 2"
      maxDisplayedValuesContent={(overflow) => `+${overflow}`}
      wrapperClassName={wrapper}
      aria-label="Files"
    />
  )
}

export function TreeSelectCustomRender() {
  return (
    <TreeSelect
      mode="multiple"
      data={data}
      defaultExpandAll
      defaultValue={["src/components/Tree.tsx"]}
      placeholder="Custom nodes"
      renderNode={({ node, hasChildren, expand, selected }) => (
        <>
          {hasChildren && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              tabIndex={-1}
              onMouseDown={(event) => event.preventDefault()}
              onClick={expand}
              aria-label="Toggle"
            >
              <FolderIcon />
            </Button>
          )}
          <span className={selected ? "font-medium" : undefined}>
            {node.label}
          </span>
        </>
      )}
      wrapperClassName={wrapper}
      aria-label="Files"
    />
  )
}

export function TreeSelectForm() {
  const [submitted, setSubmitted] = React.useState("")

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(
          String(new FormData(event.currentTarget).get("files") ?? ""),
        )
      }}
    >
      <TreeSelect
        mode="multiple"
        name="files"
        data={data}
        hiddenInputValuesDivider=";"
        defaultValue={["README.md", "package.json"]}
        aria-label="Files"
      />
      <Button type="submit" variant="outline" className="w-fit">
        Submit
      </Button>
      <p className="text-sm text-muted-foreground">
        files = {submitted || "(not submitted)"}
      </p>
    </form>
  )
}
