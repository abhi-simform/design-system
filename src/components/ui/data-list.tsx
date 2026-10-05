import * as React from "react"
import { cn } from "cn"

type DataListSize = "xs" | "sm" | "md" | "lg" | "xl"
type DataListGap = "xs" | "sm" | "md" | "lg" | "xl"
type DataListOrientation = "horizontal" | "vertical"

const SIZE_CLASSES: Record<DataListSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

const GAP_CLASSES: Record<DataListGap, string> = {
  xs: "[--data-list-gap:0.625rem]",
  sm: "[--data-list-gap:0.75rem]",
  md: "[--data-list-gap:1rem]",
  lg: "[--data-list-gap:1.25rem]",
  xl: "[--data-list-gap:1.5rem]",
}

type DataListProps = Omit<React.ComponentProps<"dl">, "size"> & {
  size?: DataListSize
  gap?: DataListGap
  orientation?: DataListOrientation
  withDivider?: boolean
  labelWidth?: number | string
}

function DataList({
  className,
  style,
  size = "sm",
  gap = "sm",
  orientation = "horizontal",
  withDivider = false,
  labelWidth,
  ...props
}: DataListProps) {
  return (
    <dl
      data-slot="data-list"
      data-orientation={orientation}
      data-with-divider={withDivider ? "" : undefined}
      className={cn(
        "group/data-list m-0 flex w-full flex-col gap-(--data-list-gap) p-0 [--data-list-label-width:7.5rem] data-with-divider:gap-0",
        SIZE_CLASSES[size],
        GAP_CLASSES[gap],
        className,
      )}
      style={
        labelWidth !== undefined
          ? {
              ["--data-list-label-width" as string]:
                typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth,
              ...style,
            }
          : style
      }
      {...props}
    />
  )
}

function DataListItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="data-list-item"
      className={cn(
        "flex flex-row items-baseline gap-2.5 group-data-with-divider/data-list:not-first-of-type:mt-(--data-list-gap) group-data-with-divider/data-list:not-first-of-type:border-t group-data-with-divider/data-list:not-first-of-type:border-border group-data-with-divider/data-list:not-first-of-type:pt-(--data-list-gap) group-data-[orientation=vertical]/data-list:flex-col group-data-[orientation=vertical]/data-list:gap-0",
        className,
      )}
      {...props}
    />
  )
}

function DataListItemLabel({
  className,
  ...props
}: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="data-list-item-label"
      className={cn(
        "m-0 min-w-(--data-list-label-width) text-muted-foreground group-data-[orientation=vertical]/data-list:min-w-full",
        className,
      )}
      {...props}
    />
  )
}

function DataListItemValue({
  className,
  ...props
}: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="data-list-item-value"
      className={cn("m-0", className)}
      {...props}
    />
  )
}

const DataListWithSub = Object.assign(DataList, {
  Item: DataListItem,
  ItemLabel: DataListItemLabel,
  ItemValue: DataListItemValue,
})

export {
  DataListWithSub as DataList,
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
}
export type { DataListProps, DataListSize, DataListGap, DataListOrientation }
