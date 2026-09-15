import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

type BurgerSizeToken = "xs" | "sm" | "md" | "lg" | "xl"

const BURGER_SIZE_PX: Record<BurgerSizeToken, number> = {
  xs: 12,
  sm: 18,
  md: 24,
  lg: 34,
  xl: 42,
}

const burgerVariants = cva(
  "relative inline-flex h-[calc(var(--burger-size)_+_0.625rem)] w-[calc(var(--burger-size)_+_0.625rem)] shrink-0 cursor-pointer items-center justify-center rounded-md bg-transparent p-1.25 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        xs: "[--burger-size:12px]",
        sm: "[--burger-size:18px]",
        md: "[--burger-size:24px]",
        lg: "[--burger-size:34px]",
        xl: "[--burger-size:42px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

interface BurgerProps
  extends
    ButtonPrimitive.Props,
    Omit<VariantProps<typeof burgerVariants>, "size"> {
  /** Controls the burger's width and height. A token is a static size; a number is a one-off pixel value. @default "md" */
  size?: BurgerSizeToken | number
  /** Height of the lines. By default calculated from `size`. */
  lineSize?: number | string
  /** When `true`, the burger is transformed into an X. @default false */
  opened?: boolean
  /** `transition-duration` in ms. @default 300 */
  transitionDuration?: number
  /** `transition-timing-function` value. @default "ease" */
  transitionTimingFunction?: string
}

function toCssLength(value: number | string) {
  return typeof value === "number" ? `${value}px` : value
}

function Burger({
  className,
  style,
  size = "md",
  lineSize,
  opened = false,
  transitionDuration = 300,
  transitionTimingFunction = "ease",
  children,
  ...props
}: BurgerProps) {
  const isCustomSize = typeof size === "number"
  const sizePx = isCustomSize ? size : BURGER_SIZE_PX[size]
  const resolvedLineSize =
    lineSize !== undefined ? toCssLength(lineSize) : `${sizePx / 12}px`

  return (
    <ButtonPrimitive
      data-slot="burger"
      className={cn(
        burgerVariants({ size: isCustomSize ? undefined : size, className }),
      )}
      style={
        {
          ...(isCustomSize ? { "--burger-size": `${size}px` } : undefined),
          "--burger-line-size": resolvedLineSize,
          "--burger-transition-duration": `${transitionDuration}ms`,
          "--burger-transition-timing-function": transitionTimingFunction,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <span
        data-slot="burger-lines"
        data-opened={opened || undefined}
        aria-hidden="true"
        className={cn(
          "pointer-events-none relative block h-(--burger-line-size) w-(--burger-size) bg-foreground",
          "[transition-property:background-color] [transition-duration:var(--burger-transition-duration)] [transition-timing-function:var(--burger-transition-timing-function)] motion-reduce:transition-none",
          "before:absolute before:start-0 before:block before:h-(--burger-line-size) before:w-(--burger-size) before:bg-foreground before:content-['']",
          "before:[top:calc(var(--burger-size)/-3)] before:[transition-property:translate,rotate] before:[transition-duration:var(--burger-transition-duration)] before:[transition-timing-function:var(--burger-transition-timing-function)] before:motion-reduce:transition-none",
          "after:absolute after:start-0 after:block after:h-(--burger-line-size) after:w-(--burger-size) after:bg-foreground after:content-['']",
          "after:[top:calc(var(--burger-size)/3)] after:[transition-property:translate,rotate] after:[transition-duration:var(--burger-transition-duration)] after:[transition-timing-function:var(--burger-transition-timing-function)] after:motion-reduce:transition-none",
          "data-[opened]:bg-transparent",
          "data-[opened]:before:translate-y-[calc(var(--burger-size)/3)] data-[opened]:before:rotate-45",
          "data-[opened]:after:-translate-y-[calc(var(--burger-size)/3)] data-[opened]:after:-rotate-45",
        )}
      />
      {children}
    </ButtonPrimitive>
  )
}

export { Burger, burgerVariants }
export type { BurgerProps }
