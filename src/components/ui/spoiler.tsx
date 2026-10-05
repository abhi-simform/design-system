import * as React from "react"
import { cn } from "cn"

import { Anchor } from "@/components/ui/anchor"

type SpoilerProps = Omit<React.ComponentProps<"div">, "children"> & {
  children?: React.ReactNode
  maxHeight?: number
  showLabel: React.ReactNode
  hideLabel: React.ReactNode
  controlRef?: React.Ref<HTMLButtonElement>
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  transitionDuration?: number
  showAriaLabel?: string
  hideAriaLabel?: string
}

function Spoiler({
  maxHeight = 100,
  showLabel,
  hideLabel,
  controlRef,
  defaultExpanded = false,
  expanded,
  onExpandedChange,
  transitionDuration,
  showAriaLabel,
  hideAriaLabel,
  id,
  className,
  style,
  children,
  ...props
}: SpoilerProps) {
  const autoId = React.useId()
  const rootId = id ?? autoId
  const regionId = `${rootId}-region`

  const [internal, setInternal] = React.useState(defaultExpanded)
  const isControlled = expanded !== undefined
  const show = isControlled ? expanded : internal

  const [height, setHeight] = React.useState(0)
  const [content, setContent] = React.useState<HTMLDivElement | null>(null)

  React.useLayoutEffect(() => {
    if (!content) return
    const observer = new ResizeObserver(() => {
      setHeight(content.getBoundingClientRect().height)
    })
    observer.observe(content)
    return () => observer.disconnect()
  }, [content])

  const label = show ? hideLabel : showLabel
  const hasSpoiler = label !== null && maxHeight < height

  function toggle() {
    const next = !show
    if (!isControlled) setInternal(next)
    onExpandedChange?.(next)
  }

  return (
    <div
      data-slot="spoiler"
      id={rootId}
      data-has-spoiler={hasSpoiler || undefined}
      className={cn("relative data-has-spoiler:mb-6", className)}
      style={style}
      {...props}
    >
      {hasSpoiler && (
        <Anchor
          data-slot="spoiler-control"
          render={<button type="button" ref={controlRef} />}
          onClick={toggle}
          aria-expanded={show}
          aria-controls={regionId}
          aria-label={show ? hideAriaLabel : showAriaLabel}
          className="absolute start-0 top-full h-6 cursor-pointer"
        >
          {label}
        </Anchor>
      )}
      <div
        data-slot="spoiler-content"
        role="region"
        id={regionId}
        className="flex flex-col overflow-hidden transition-[max-height] duration-(--spoiler-transition-duration,200ms) ease-in-out motion-reduce:transition-none"
        style={
          {
            "--spoiler-transition-duration":
              transitionDuration !== undefined
                ? `${transitionDuration}ms`
                : undefined,
            maxHeight: !show ? maxHeight : height || undefined,
          } as React.CSSProperties
        }
      >
        <div ref={setContent}>{children}</div>
      </div>
    </div>
  )
}

export { Spoiler }
export type { SpoilerProps }
