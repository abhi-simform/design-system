import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset"
import { cn } from "cn"
import type * as React from "react"

type FieldsetVariant = "default" | "filled" | "unstyled"
type FieldsetRadius = "xs" | "sm" | "md" | "lg" | "xl"

const VARIANT_CLASSES: Record<FieldsetVariant, string> = {
  default: "border border-border bg-card",
  filled: "border border-border bg-muted",
  unstyled: "rounded-none border-0 p-0",
}

const LEGEND_VARIANT_CLASSES: Record<FieldsetVariant, string> = {
  default: "",
  filled: "",
  unstyled: "mb-3 p-0",
}

const RADIUS_CLASSES: Record<FieldsetRadius, string> = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
}

type FieldsetProps = Omit<FieldsetPrimitive.Root.Props, "children"> & {
  legend?: React.ReactNode
  variant?: FieldsetVariant
  radius?: FieldsetRadius
  children?: React.ReactNode
}

function Fieldset({
  legend,
  variant = "default",
  radius = "sm",
  className,
  children,
  ...props
}: FieldsetProps) {
  return (
    <FieldsetPrimitive.Root
      data-slot="fieldset"
      data-variant={variant}
      className={cn(
        "min-w-0 p-5 pt-2.5 data-disabled:opacity-60",
        RADIUS_CLASSES[radius],
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    >
      {legend ? (
        <FieldsetPrimitive.Legend
          data-slot="fieldset-legend"
          render={<legend />}
          className={cn("text-sm", LEGEND_VARIANT_CLASSES[variant])}
        >
          {legend}
        </FieldsetPrimitive.Legend>
      ) : null}
      {children}
    </FieldsetPrimitive.Root>
  )
}

export { Fieldset }
export type { FieldsetProps, FieldsetVariant, FieldsetRadius }
