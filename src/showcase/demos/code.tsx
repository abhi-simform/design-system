import { Code } from "@/components/ui/code"

export function CodePlayground({
  children,
  block,
  color,
}: {
  children: string
  block: boolean
  color: string
}) {
  return (
    <Code block={block} color={color || undefined}>
      {children}
    </Code>
  )
}

export function CodeInline() {
  return (
    <p className="text-sm">
      Install dependencies with <Code>npm install</Code>, then start the dev
      server with <Code>npm run dev</Code>.
    </p>
  )
}

export function CodeBlock() {
  return (
    <Code block>
      {`function greet(name) {
  return \`Hello, \${name}!\`
}`}
    </Code>
  )
}

export function CodeColorOverride() {
  return (
    <div className="flex flex-wrap gap-2">
      <Code color="color-mix(in oklch, var(--color-blue) 18%, transparent)">
        info
      </Code>
      <Code color="color-mix(in oklch, var(--color-green) 18%, transparent)">
        success
      </Code>
      <Code color="color-mix(in oklch, var(--color-red) 18%, transparent)">
        error
      </Code>
    </div>
  )
}
