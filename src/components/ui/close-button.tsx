import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { XIcon } from "lucide-react"

const closeButtonVariants = cva(
  "group/close-button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        subtle: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
        transparent: "",
      },
      size: {
        xs: "size-6 rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-3",
        sm: "size-7 rounded-[min(var(--radius-md),12px)] [&_svg:not([class*='size-'])]:size-3.5",
        md: "size-8 [&_svg:not([class*='size-'])]:size-4",
        lg: "size-9 [&_svg:not([class*='size-'])]:size-4",
        xl: "size-10 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "subtle",
      size: "md",
    },
  },
)

interface CloseButtonProps
  extends ButtonPrimitive.Props, VariantProps<typeof closeButtonVariants> {
  /** React node to replace the default close icon. When set, `iconSize` is ignored. */
  icon?: React.ReactNode
  /** Width and height of the default icon. Ignored when `icon` is set. */
  iconSize?: number | string
}

function CloseButton({
  className,
  variant = "subtle",
  size = "md",
  icon,
  iconSize,
  children,
  ...props
}: CloseButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="close-button"
      className={cn(closeButtonVariants({ variant, size, className }))}
      {...props}
    >
      {icon ?? (
        <XIcon
          style={
            iconSize !== undefined
              ? { width: iconSize, height: iconSize }
              : undefined
          }
        />
      )}
      {children}
    </ButtonPrimitive>
  )
}

export { CloseButton, closeButtonVariants }
export type { CloseButtonProps }
