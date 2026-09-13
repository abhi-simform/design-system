import { cn } from "cn"

type CodeProps = React.ComponentProps<"code"> & {
  block?: boolean
  color?: string
}

function Code({ block = false, color, className, style, ...props }: CodeProps) {
  const Comp = block ? "pre" : "code"
  return (
    <Comp
      data-slot="code"
      data-block={block ? "" : undefined}
      dir="ltr"
      className={cn(
        "m-0 overflow-auto rounded-sm bg-(--code-bg,var(--color-muted)) font-mono text-xs/relaxed",
        block ? "p-3" : "px-1.5 py-0.5",
        className,
      )}
      style={
        color
          ? ({ ...style, "--code-bg": color } as React.CSSProperties)
          : style
      }
      {...props}
    />
  )
}

export { Code }
export type { CodeProps }
