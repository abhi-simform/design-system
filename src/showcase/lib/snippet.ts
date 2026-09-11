import type { AnyControl, ControlPrimitive } from "@/showcase/lib/controls"

const MAX_INLINE_WIDTH = 68

/**
 * Render a single JSX attribute, or `null` when the prop should be omitted
 * (`false` booleans and empty strings contribute nothing to a snippet).
 */
export function formatJsxAttr(
  name: string,
  value: ControlPrimitive,
): string | null {
  if (value === false) {
    return null
  }

  if (value === true) {
    return name
  }

  if (typeof value === "number") {
    return `${name}={${value}}`
  }

  if (value === "") {
    return null
  }

  return `${name}="${value}"`
}

export function buildJsxSnippet(input: {
  tag: string
  attrs: readonly string[]
  children?: string
}): string {
  const { tag, attrs, children } = input

  const inlineOpen = [tag, ...attrs].join(" ")
  const inline =
    children === undefined
      ? `<${inlineOpen} />`
      : `<${inlineOpen}>${children}</${tag}>`

  if (inline.length <= MAX_INLINE_WIDTH && !inline.includes("\n")) {
    return inline
  }

  if (attrs.length === 0) {
    if (children === undefined) {
      return `<${tag} />`
    }

    return `<${tag}>\n${indent(children)}\n</${tag}>`
  }

  const open = `<${tag}\n${attrs.map((attr) => `  ${attr}`).join("\n")}`

  if (children === undefined) {
    return `${open}\n/>`
  }

  return `${open}\n>\n${indent(children)}\n</${tag}>`
}

function indent(block: string): string {
  return block
    .split("\n")
    .map((line) => (line === "" ? line : `  ${line}`))
    .join("\n")
}

/**
 * Default snippet generator: props equal to their `defaultValue` are dropped,
 * `false` booleans are dropped, `true` booleans render bare, numbers render in
 * braces, strings render double-quoted, and `children` always renders.
 */
export function buildControlSnippet(
  tag: string,
  controls: Record<string, AnyControl>,
  values: Record<string, ControlPrimitive>,
): string {
  const attrs: string[] = []
  let children: string | undefined

  for (const key of Object.keys(controls)) {
    const control = controls[key]
    const role = control.codeRole ?? "prop"

    if (role === "none") {
      continue
    }

    const value = values[key]

    if (role === "children") {
      // Children survive even when they equal the default.
      const text = String(value)
      children = text === "" ? undefined : text
      continue
    }

    if ((control.omitWhenDefault ?? true) && value === control.defaultValue) {
      continue
    }

    const attr = formatJsxAttr(control.propName ?? key, value)
    if (attr !== null) {
      attrs.push(attr)
    }
  }

  return buildJsxSnippet({ tag, attrs, children })
}
