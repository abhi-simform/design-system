import * as React from "react"

import {
  TableOfContents,
  type TableOfContentsRadius,
  type TableOfContentsSize,
  type TableOfContentsVariant,
} from "@/components/ui/table-of-contents"

const SECTIONS = [
  { id: "intro", depth: 1, title: "Introduction" },
  { id: "install", depth: 2, title: "Installation" },
  { id: "usage", depth: 2, title: "Usage" },
  { id: "props", depth: 1, title: "Props" },
  { id: "variants", depth: 2, title: "Variants" },
  { id: "sizes", depth: 3, title: "Sizes" },
  { id: "faq", depth: 1, title: "FAQ" },
]

function Document({
  scope,
  hostRef,
}: {
  scope: string
  hostRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={hostRef}
      data-toc-scope={scope}
      className="h-72 flex-1 overflow-y-auto rounded-lg border p-4"
    >
      {SECTIONS.map(({ id, depth, title }) => {
        const Heading = `h${depth}` as "h1" | "h2" | "h3"
        return (
          <section key={id} className="mb-6">
            <Heading
              className={
                depth === 1
                  ? "mb-2 text-xl font-semibold"
                  : depth === 2
                    ? "mb-2 text-lg font-medium"
                    : "mb-2 text-base font-medium"
              }
            >
              {title}
            </Heading>
            <p className="h-40 text-sm text-muted-foreground">
              Content for {title.toLowerCase()}. Scroll this panel and watch the
              table of contents follow along.
            </p>
          </section>
        )
      })}
    </div>
  )
}

function useScopedSpy(scope: string) {
  const hostRef = React.useRef<HTMLDivElement | null>(null)
  const scrollSpyOptions = React.useMemo(
    () => ({
      selector: `[data-toc-scope="${scope}"] :is(h1, h2, h3)`,
      scrollHost: hostRef,
    }),
    [scope],
  )
  return { hostRef, scrollSpyOptions }
}

export function TableOfContentsPlayground({
  variant,
  size,
  radius,
  color,
  minDepthToOffset,
  depthOffset,
}: {
  variant: TableOfContentsVariant
  size: TableOfContentsSize
  radius: TableOfContentsRadius
  color: string
  minDepthToOffset: number
  depthOffset: number
}) {
  const { hostRef, scrollSpyOptions } = useScopedSpy("playground")
  return (
    <div className="flex w-full max-w-xl gap-4">
      <div className="w-48 shrink-0">
        <TableOfContents
          variant={variant}
          size={size}
          radius={radius}
          color={color || undefined}
          minDepthToOffset={minDepthToOffset}
          depthOffset={depthOffset}
          scrollSpyOptions={scrollSpyOptions}
          getControlProps={({ data }) => ({
            children: data.value,
            onClick: () =>
              data
                .getNode()
                .scrollIntoView({ behavior: "smooth", block: "start" }),
          })}
        />
      </div>
      <Document scope="playground" hostRef={hostRef} />
    </div>
  )
}

export function TableOfContentsVariants() {
  const { hostRef, scrollSpyOptions } = useScopedSpy("variants")
  return (
    <div className="flex w-full max-w-2xl gap-4">
      <div className="flex w-48 shrink-0 flex-col gap-4">
        {(["filled", "light", "none"] as const).map((variant) => (
          <TableOfContents
            key={variant}
            variant={variant}
            size="sm"
            scrollSpyOptions={scrollSpyOptions}
          />
        ))}
      </div>
      <Document scope="variants" hostRef={hostRef} />
    </div>
  )
}

export function TableOfContentsCustomControls() {
  const { hostRef, scrollSpyOptions } = useScopedSpy("custom")
  return (
    <div className="flex w-full max-w-2xl gap-4">
      <div className="w-48 shrink-0">
        <TableOfContents
          variant="light"
          color="oklch(0.6 0.15 250)"
          scrollSpyOptions={scrollSpyOptions}
          getControlProps={({ active, data }) => ({
            children: `${active ? "→ " : ""}${data.value}`,
            onClick: () =>
              data
                .getNode()
                .scrollIntoView({ behavior: "smooth", block: "start" }),
          })}
        />
      </div>
      <Document scope="custom" hostRef={hostRef} />
    </div>
  )
}
