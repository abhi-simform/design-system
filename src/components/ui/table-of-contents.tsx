import * as React from "react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import type {
  ScrollSpyHeadingData,
  ScrollSpyOptions,
} from "@/hooks/use-scroll-spy"

type TableOfContentsVariant = "filled" | "light" | "none"
type TableOfContentsSize = "xs" | "sm" | "md" | "lg" | "xl"
type TableOfContentsRadius = "xs" | "sm" | "md" | "lg" | "xl"

interface InitialTableOfContentsData {
  /** Heading depth, 1-6 */
  depth: number
  /** Heading text content */
  value: string
  /** Heading id, must be unique, used as `key` */
  id?: string
}

interface TableOfContentsGetControlPropsPayload {
  /** True if the heading is currently the best match in the viewport */
  active: boolean
  data: ScrollSpyHeadingData
}

type TableOfContentsControlProps = React.ComponentProps<typeof Button> &
  Record<`data-${string}`, unknown>

const SIZE_CLASSES: Record<TableOfContentsSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

const RADIUS_CLASSES: Record<TableOfContentsRadius, string> = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
}

const VARIANT_CLASSES: Record<TableOfContentsVariant, string> = {
  filled:
    "data-active:bg-(--toc-color) data-active:text-primary-foreground data-active:hover:bg-(--toc-color) data-active:hover:text-primary-foreground",
  light:
    "data-active:bg-(--toc-color)/10 data-active:text-(--toc-color) data-active:hover:bg-(--toc-color)/15 data-active:hover:text-(--toc-color)",
  none: "hover:bg-transparent dark:hover:bg-transparent",
}

interface TableOfContentsProps extends Omit<
  React.ComponentProps<"div">,
  "color"
> {
  /** Active control style @default "filled" */
  variant?: TableOfContentsVariant
  /** Any valid CSS color used for the active control. Defaults to the primary color */
  color?: string
  /** Controls font-size and padding of all controls @default "md" */
  size?: TableOfContentsSize
  /** Controls the border radius of controls @default "md" */
  radius?: TableOfContentsRadius
  /** Options passed down to the scroll spy */
  scrollSpyOptions?: ScrollSpyOptions
  /** Data rendered until headings are read from the DOM */
  initialData?: InitialTableOfContentsData[]
  /** Returns props for each control, receives the heading data and active state */
  getControlProps?: (
    payload: TableOfContentsGetControlPropsPayload,
  ) => TableOfContentsControlProps
  /** Minimum heading depth that requires an offset @default 1 */
  minDepthToOffset?: number
  /** Left padding added per depth level above `minDepthToOffset`, in px when a number @default "0.8em" */
  depthOffset?: number | string
  /** Receives a function that re-reads headings from the DOM */
  reinitializeRef?: React.RefObject<(() => void) | null>
}

function TableOfContents({
  variant = "filled",
  color,
  size = "md",
  radius = "md",
  scrollSpyOptions,
  initialData,
  getControlProps = ({ data }) => ({ children: data.value }),
  minDepthToOffset = 1,
  depthOffset,
  reinitializeRef,
  className,
  style,
  ...props
}: TableOfContentsProps) {
  const spy = useScrollSpy(scrollSpyOptions)

  React.useEffect(() => {
    if (reinitializeRef) reinitializeRef.current = spy.reinitialize
  }, [reinitializeRef, spy.reinitialize])

  const headings = (
    spy.initialized ? spy.data : (initialData ?? [])
  ) as ScrollSpyHeadingData[]

  const rootStyle = {
    ...(color && { "--toc-color": color }),
    ...(depthOffset !== undefined && {
      "--toc-depth-offset":
        typeof depthOffset === "number"
          ? `${depthOffset / 16}rem`
          : depthOffset,
    }),
    ...style,
  } as React.CSSProperties

  return (
    <div
      data-slot="table-of-contents"
      data-variant={variant}
      className={cn(
        "flex flex-col [--toc-color:var(--primary)] [--toc-depth-offset:0.8em]",
        className,
      )}
      style={rootStyle}
      {...props}
    >
      {headings.map((data, index) => {
        const {
          className: controlClassName,
          style: controlStyle,
          ...controlProps
        } = getControlProps({
          active: index === spy.active,
          data: { ...data, getNode: data.getNode ?? (() => document.body) },
        })

        return (
          <Button
            key={data.id ?? index}
            data-slot="table-of-contents-control"
            data-active={index === spy.active || undefined}
            variant="ghost"
            className={cn(
              "h-auto w-full justify-start py-[0.3em] pr-[0.8em] pl-[max(calc(var(--depth-offset)*var(--toc-depth-offset)),0.8em)] text-left font-normal whitespace-normal",
              SIZE_CLASSES[size],
              RADIUS_CLASSES[radius],
              VARIANT_CLASSES[variant],
              controlClassName,
            )}
            style={
              {
                "--depth-offset": data.depth - minDepthToOffset,
                ...controlStyle,
              } as React.CSSProperties
            }
            {...controlProps}
          />
        )
      })}
    </div>
  )
}

export { TableOfContents }
export type {
  InitialTableOfContentsData,
  TableOfContentsGetControlPropsPayload,
  TableOfContentsProps,
  TableOfContentsRadius,
  TableOfContentsSize,
  TableOfContentsVariant,
}
