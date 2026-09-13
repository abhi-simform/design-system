import { CheckIcon, InfoIcon } from "lucide-react"

import { List } from "@/components/ui/list"
import type { ListSize, ListSpacing, ListType } from "@/components/ui/list"

export function ListPlayground({
  type,
  size,
  spacing,
  center,
  withPadding,
}: {
  type: ListType
  size: ListSize
  spacing: ListSpacing
  center: boolean
  withPadding: boolean
}) {
  return (
    <List
      type={type}
      size={size}
      spacing={spacing}
      center={center}
      withPadding={withPadding}
    >
      <List.Item>Clone the repository</List.Item>
      <List.Item>Install the dependencies</List.Item>
      <List.Item>Start the development server</List.Item>
    </List>
  )
}

export function ListUnordered() {
  return (
    <List spacing="sm">
      <List.Item>Design tokens</List.Item>
      <List.Item>Component primitives</List.Item>
      <List.Item>Showcase and documentation</List.Item>
    </List>
  )
}

export function ListOrdered() {
  return (
    <List type="ordered" spacing="sm" start={3} reversed>
      <List.Item>Third step, counting down</List.Item>
      <List.Item>Second step</List.Item>
      <List.Item>First step</List.Item>
    </List>
  )
}

export function ListWithIcon() {
  return (
    <List spacing="sm" icon={<CheckIcon className="size-4 text-primary" />}>
      <List.Item>Type-checked with TypeScript</List.Item>
      <List.Item>Linted with ESLint</List.Item>
      <List.Item>Formatted with Prettier</List.Item>
    </List>
  )
}

export function ListItemIconOverride() {
  return (
    <List spacing="sm" icon={<CheckIcon className="size-4 text-primary" />}>
      <List.Item>Build passes</List.Item>
      <List.Item icon={<InfoIcon className="size-4 text-muted-foreground" />}>
        Bundle size increased slightly
      </List.Item>
      <List.Item>Tests pass</List.Item>
    </List>
  )
}

export function ListNested() {
  return (
    <List spacing="xs">
      <List.Item>Components</List.Item>
      <List.Item>
        Showcase
        <List withPadding spacing="xs">
          <List.Item>Registry</List.Item>
          <List.Item>Demos</List.Item>
        </List>
      </List.Item>
    </List>
  )
}

export function ListCustomMarker() {
  return (
    <List spacing="sm" listStyleType="square">
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third item</List.Item>
    </List>
  )
}
