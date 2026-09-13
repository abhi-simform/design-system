import { Highlight } from "@/components/ui/highlight"

export function HighlightPlayground({
  children,
  highlight,
  color,
  wholeWord,
  caseInsensitive,
  accentInsensitive,
}: {
  children: string
  highlight: string
  color: string
  wholeWord: boolean
  caseInsensitive: boolean
  accentInsensitive: boolean
}) {
  const terms = highlight
    .split(",")
    .map((term) => term.trim())
    .filter(Boolean)

  return (
    <Highlight
      highlight={terms}
      color={color || undefined}
      wholeWord={wholeWord}
      caseInsensitive={caseInsensitive}
      accentInsensitive={accentInsensitive}
    >
      {children}
    </Highlight>
  )
}

export function HighlightMultipleTerms() {
  return (
    <Highlight highlight={["high", "highlight"]}>
      The Highlight component highlights text.
    </Highlight>
  )
}

export function HighlightPerTermColors() {
  return (
    <Highlight
      highlight={[
        { text: "error", color: "var(--color-red)" },
        { text: "warning", color: "var(--color-orange)" },
        { text: "success", color: "var(--color-green)" },
      ]}
    >
      The build finished with one error, two warnings, and one success.
    </Highlight>
  )
}

export function HighlightWholeWord() {
  return (
    <Highlight highlight="the" wholeWord>
      The theme in there is not the same theme.
    </Highlight>
  )
}

export function HighlightAccentInsensitive() {
  return <Highlight highlight="cafe">Meet me at the café tomorrow.</Highlight>
}

export function HighlightCaseSensitive() {
  return (
    <Highlight highlight="React" caseInsensitive={false}>
      React and react are not the same word here.
    </Highlight>
  )
}
