/**
 * A deliberately small JSX/TS tokenizer.
 *
 * Shipping Shiki would add roughly a megabyte of grammars and WASM plus an
 * async init, and its themes hard-code hex colors that fight this system's
 * OKLCH palette. The snippets here are a few lines long, so this covers them
 * and — because the colors come from design tokens — it re-themes for free.
 * If the quality ever stops being good enough, `code-block.tsx` is the only
 * file that has to change.
 */

export type TokenKind =
  | "tag"
  | "attr"
  | "string"
  | "keyword"
  | "number"
  | "comment"
  | "punct"
  | "plain"

export type Token = {
  text: string
  kind: TokenKind
}

const KEYWORDS = new Set([
  "async",
  "await",
  "const",
  "export",
  "false",
  "from",
  "function",
  "import",
  "let",
  "new",
  "null",
  "return",
  "true",
  "undefined",
])

const PATTERN = new RegExp(
  [
    "(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)", // 1 comment
    "(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`)", // 2 string
    "(<\\/?[A-Za-z][\\w.]*)", // 3 opening or closing tag name
    "(\\/>)", // 4 self-closing
    "([A-Za-z_$][\\w$-]*)(?=\\s*=)", // 5 attribute / property name
    "\\b(\\d+(?:\\.\\d+)?)\\b", // 6 number
    "([A-Za-z_$][\\w$]*)", // 7 bare word (keyword or identifier)
    "([{}()\\[\\].,;:=>/])", // 8 punctuation
  ].join("|"),
  "g",
)

export function tokenizeJsx(source: string): Token[] {
  const tokens: Token[] = []
  let lastIndex = 0

  PATTERN.lastIndex = 0

  let match = PATTERN.exec(source)
  while (match !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: source.slice(lastIndex, match.index), kind: "plain" })
    }

    const [text, comment, str, tag, selfClose, attr, num, word, punct] = match

    if (comment !== undefined) {
      tokens.push({ text, kind: "comment" })
    } else if (str !== undefined) {
      tokens.push({ text, kind: "string" })
    } else if (tag !== undefined || selfClose !== undefined) {
      tokens.push({ text, kind: "tag" })
    } else if (attr !== undefined) {
      tokens.push({ text, kind: "attr" })
    } else if (num !== undefined) {
      tokens.push({ text, kind: "number" })
    } else if (word !== undefined) {
      tokens.push({ text, kind: KEYWORDS.has(word) ? "keyword" : "plain" })
    } else if (punct !== undefined) {
      tokens.push({ text, kind: "punct" })
    } else {
      tokens.push({ text, kind: "plain" })
    }

    lastIndex = match.index + text.length
    match = PATTERN.exec(source)
  }

  if (lastIndex < source.length) {
    tokens.push({ text: source.slice(lastIndex), kind: "plain" })
  }

  return tokens
}
