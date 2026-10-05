import * as React from "react"

import { Cascader, type CascaderOption } from "@/components/ui/cascader"
import { Label } from "@/components/ui/label"
import { MapPinIcon } from "lucide-react"

const LOCATIONS: CascaderOption[] = [
  {
    value: "usa",
    label: "United States",
    children: [
      {
        value: "ca",
        label: "California",
        children: [
          { value: "sf", label: "San Francisco" },
          { value: "la", label: "Los Angeles" },
          { value: "sd", label: "San Diego" },
        ],
      },
      {
        value: "ny",
        label: "New York",
        children: [
          { value: "nyc", label: "New York City" },
          { value: "buffalo", label: "Buffalo" },
        ],
      },
      { value: "tx", label: "Texas", disabled: true },
    ],
  },
  {
    value: "india",
    label: "India",
    children: [
      {
        value: "mh",
        label: "Maharashtra",
        children: [
          { value: "mumbai", label: "Mumbai" },
          { value: "pune", label: "Pune" },
        ],
      },
      {
        value: "ka",
        label: "Karnataka",
        children: [{ value: "blr", label: "Bengaluru" }],
      },
    ],
  },
  {
    value: "japan",
    label: "Japan",
    children: [
      {
        value: "tokyo",
        label: "Tokyo",
        children: [
          { value: "shibuya", label: "Shibuya" },
          { value: "shinjuku", label: "Shinjuku" },
        ],
      },
    ],
  },
  { value: "antarctica", label: "Antarctica" },
]

const DEEP: CascaderOption[] = [
  {
    value: "a",
    label: "Level 1",
    children: [
      {
        value: "b",
        label: "Level 2",
        children: [
          {
            value: "c",
            label: "Level 3",
            children: [
              {
                value: "d",
                label: "Level 4",
                children: [{ value: "e", label: "Level 5" }],
              },
            ],
          },
        ],
      },
    ],
  },
]

export function CascaderPlayground({
  changeOnSelect,
  expandTrigger,
  allowDeselect,
  withCheckIcon,
  checkIconPosition,
  withColumns,
  searchable,
  clearable,
  disabled,
}: {
  changeOnSelect: boolean
  expandTrigger: "click" | "hover"
  allowDeselect: boolean
  withCheckIcon: boolean
  checkIconPosition: "left" | "right"
  withColumns: boolean
  searchable: boolean
  clearable: boolean
  disabled: boolean
}) {
  return (
    <Cascader
      data={LOCATIONS}
      placeholder="Pick a location"
      nothingFoundMessage="No matches found"
      changeOnSelect={changeOnSelect}
      expandTrigger={expandTrigger}
      allowDeselect={allowDeselect}
      withCheckIcon={withCheckIcon}
      checkIconPosition={checkIconPosition}
      withColumns={withColumns}
      searchable={searchable}
      clearable={clearable}
      disabled={disabled}
      className="w-72"
    />
  )
}

export function CascaderBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Location</Label>
      <Cascader data={LOCATIONS} placeholder="Pick a location" clearable />
    </div>
  )
}

export function CascaderChangeOnSelect() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Any level</Label>
      <Cascader
        data={LOCATIONS}
        placeholder="Pick any level"
        changeOnSelect
        clearable
      />
    </div>
  )
}

export function CascaderHover() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Expand on hover</Label>
      <Cascader
        data={LOCATIONS}
        placeholder="Hover to expand"
        expandTrigger="hover"
        columnWidth={160}
      />
    </div>
  )
}

export function CascaderSearchable() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Searchable</Label>
      <Cascader
        data={LOCATIONS}
        placeholder="Search locations"
        searchable
        clearable
        separator="›"
        leftSection={<MapPinIcon />}
        nothingFoundMessage="No matches found"
      />
    </div>
  )
}

export function CascaderFlatList() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Flat list (withColumns=false)</Label>
      <Cascader
        data={LOCATIONS}
        placeholder="Pick a location"
        withColumns={false}
        checkIconPosition="left"
      />
    </div>
  )
}

export function CascaderMaxLevels() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>maxDisplayedLevels = 2</Label>
      <Cascader
        data={DEEP}
        placeholder="Drill down"
        maxDisplayedLevels={2}
        defaultValue={["a", "b", "c", "d", "e"]}
      />
    </div>
  )
}

export function CascaderControlled() {
  const [value, setValue] = React.useState<string[] | null>(["india", "mh"])

  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Controlled</Label>
      <Cascader
        data={LOCATIONS}
        value={value}
        onChange={setValue}
        changeOnSelect
        clearable
        formatValue={({ options }) =>
          options.map((option) => option.label).join(" → ")
        }
        placeholder="Pick a location"
      />
      <p className="text-xs text-muted-foreground">
        Value: {value ? JSON.stringify(value) : "null"}
      </p>
    </div>
  )
}
