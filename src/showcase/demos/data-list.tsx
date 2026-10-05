import { Badge } from "@/components/ui/badge"
import {
  DataList,
  type DataListGap,
  type DataListOrientation,
  type DataListSize,
} from "@/components/ui/data-list"

const PROFILE = [
  { label: "Name", value: "Ada Lovelace" },
  { label: "Email", value: "ada@example.com" },
  { label: "Role", value: "Analyst" },
  { label: "Location", value: "London, UK" },
]

function ProfileItems() {
  return PROFILE.map((row) => (
    <DataList.Item key={row.label}>
      <DataList.ItemLabel>{row.label}</DataList.ItemLabel>
      <DataList.ItemValue>{row.value}</DataList.ItemValue>
    </DataList.Item>
  ))
}

export function DataListPlayground({
  size,
  gap,
  orientation,
  withDivider,
  labelWidth,
}: {
  size: DataListSize
  gap: DataListGap
  orientation: DataListOrientation
  withDivider: boolean
  labelWidth: number
}) {
  return (
    <div className="w-full max-w-md">
      <DataList
        size={size}
        gap={gap}
        orientation={orientation}
        withDivider={withDivider}
        labelWidth={labelWidth}
      >
        <ProfileItems />
      </DataList>
    </div>
  )
}

export function DataListDefault() {
  return (
    <div className="w-full max-w-md">
      <DataList>
        <ProfileItems />
      </DataList>
    </div>
  )
}

export function DataListDividers() {
  return (
    <div className="w-full max-w-md">
      <DataList withDivider>
        <ProfileItems />
      </DataList>
    </div>
  )
}

export function DataListVertical() {
  return (
    <div className="w-full max-w-md">
      <DataList orientation="vertical" withDivider>
        <ProfileItems />
      </DataList>
    </div>
  )
}

export function DataListLabelWidth() {
  return (
    <div className="w-full max-w-md">
      <DataList labelWidth={200}>
        <ProfileItems />
      </DataList>
    </div>
  )
}

export function DataListSizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <DataList key={size} size={size} gap={size}>
          <DataList.Item>
            <DataList.ItemLabel>Size {size}</DataList.ItemLabel>
            <DataList.ItemValue>Ada Lovelace</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Role</DataList.ItemLabel>
            <DataList.ItemValue>Analyst</DataList.ItemValue>
          </DataList.Item>
        </DataList>
      ))}
    </div>
  )
}

export function DataListRichValues() {
  return (
    <div className="w-full max-w-md">
      <DataList withDivider>
        <DataList.Item>
          <DataList.ItemLabel>Status</DataList.ItemLabel>
          <DataList.ItemValue>
            <Badge>Active</Badge>
          </DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
          <DataList.ItemLabel>Plan</DataList.ItemLabel>
          <DataList.ItemValue className="font-medium">Pro</DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
          <DataList.ItemLabel>Website</DataList.ItemLabel>
          <DataList.ItemValue>
            <a href="#" className="underline underline-offset-4">
              example.com
            </a>
          </DataList.ItemValue>
        </DataList.Item>
      </DataList>
    </div>
  )
}
