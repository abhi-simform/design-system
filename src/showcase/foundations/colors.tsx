import * as React from "react"

import { COLOR_TOKEN_GROUPS } from "@/showcase/fixtures/tokens"

/**
 * Reads the resolved value of a CSS custom property from a live element, so
 * swatch captions can never drift from src/index.css.
 */
function useTokenValues(tokens: readonly string[]) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [values, setValues] = React.useState<Record<string, string>>({})

  React.useLayoutEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }

    const computed = window.getComputedStyle(node)
    const next: Record<string, string> = {}

    for (const token of tokens) {
      next[token] = computed.getPropertyValue(token).trim()
    }

    setValues(next)
  }, [tokens])

  return { ref, values }
}

function Swatch({ token, value }: { token: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className="size-9 shrink-0 rounded-md border shadow-xs"
        // Dynamic token, so it must be an inline custom-property reference —
        // a `bg-${token}` class would be invisible to Tailwind's scanner.
        style={{ background: `var(${token})` }}
      />
      <div className="min-w-0">
        <div className="truncate font-mono text-xs font-medium">{token}</div>
        <div className="truncate font-mono text-[0.6875rem] text-muted-foreground">
          {value || "—"}
        </div>
      </div>
    </div>
  )
}

function TokenGrid({ tokens }: { tokens: readonly string[] }) {
  const { ref, values } = useTokenValues(tokens)

  return (
    <div ref={ref} className="grid gap-4">
      {tokens.map((token) => (
        <Swatch key={token} token={token} value={values[token] ?? ""} />
      ))}
    </div>
  )
}

export function FoundationColors() {
  return (
    <div className="flex flex-col gap-10">
      <p className="text-sm/relaxed text-muted-foreground">
        Every color is an OKLCH custom property declared in{" "}
        <code className="font-mono text-xs">src/index.css</code> and mapped to a
        Tailwind utility through{" "}
        <code className="font-mono text-xs">@theme</code>{" "}
        <code className="font-mono text-xs">inline</code>. The right-hand column
        renders inside a <code className="font-mono text-xs">.dark</code>{" "}
        subtree, so both themes are visible at once without leaving the page.
      </p>

      {COLOR_TOKEN_GROUPS.map((group) => (
        <section key={group.title} className="flex flex-col gap-4">
          <div>
            <h3 className="font-heading text-base font-medium tracking-tight">
              {group.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {group.description}
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-2">
            <div className="bg-background p-5">
              <div className="mb-4 text-xs font-medium text-muted-foreground">
                Light
              </div>
              <TokenGrid tokens={group.tokens} />
            </div>
            {/* `.dark` sets the variables on this element itself and the custom
                variant is `&:is(.dark *)`, so this subtree renders fully dark
                inside a light page — no iframe needed. */}
            <div className="dark bg-background p-5 text-foreground">
              <div className="mb-4 text-xs font-medium text-muted-foreground">
                Dark
              </div>
              <TokenGrid tokens={group.tokens} />
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
