import * as React from "react"

import { Box } from "@/components/ui/box"

const baseClassName = "rounded-lg border bg-muted/50 px-4 py-3 text-sm"

export function BoxPlayground({
  as,
}: {
  as: "div" | "section" | "span" | "a"
}) {
  const render =
    as === "a" ? (
      <a href="#" />
    ) : as === "section" ? (
      <section />
    ) : as === "span" ? (
      <span />
    ) : undefined

  return (
    <Box render={render} className={baseClassName}>
      Rendered as a {as}
    </Box>
  )
}

export function BoxDefault() {
  return <Box className={baseClassName}>Just a div, styled with className</Box>
}

export function BoxAsLink() {
  return (
    <Box
      render={<a href="/" />}
      className="text-sm font-medium text-primary underline underline-offset-4"
    >
      Rendered as an anchor
    </Box>
  )
}

export function BoxAsSection() {
  return (
    <Box render={<section />} className={baseClassName}>
      Rendered as a section
    </Box>
  )
}
