import { cn } from "@/lib/utils"
import { tokenizeJsx, type TokenKind } from "@/showcase/lib/highlight"
import { CopyButton } from "@/showcase/primitives/copy-button"

/**
 * Literal class strings only — a `text-${kind}` lookup would be invisible to
 * Tailwind's scanner. Colors come from design tokens so code re-themes with
 * the rest of the page.
 */
const TOKEN_CLASS: Record<TokenKind, string> = {
  tag: "text-primary",
  attr: "text-muted-foreground",
  string: "text-foreground",
  keyword: "text-primary/80",
  number: "text-foreground",
  comment: "text-muted-foreground/70 italic",
  punct: "text-muted-foreground",
  plain: "text-foreground",
}

export function CodeBlock({
  code,
  className,
  showCopy = true,
}: {
  code: string
  className?: string
  showCopy?: boolean
}) {
  const tokens = tokenizeJsx(code)

  return (
    <div
      className={cn(
        "group/code relative overflow-hidden rounded-lg border bg-muted/40",
        className,
      )}
    >
      {showCopy ? (
        <div className="absolute top-1.5 right-1.5 z-10">
          <CopyButton value={code} />
        </div>
      ) : null}
      <pre className="overflow-x-auto p-3 pr-10 font-mono text-xs/relaxed">
        <code>
          {tokens.map((token, index) => (
            <span key={index} className={TOKEN_CLASS[token.kind]}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
