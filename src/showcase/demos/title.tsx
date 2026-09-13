import { Title, type TitleOrder, type TitleSize } from "@/components/ui/title"

export function TitlePlayground({
  order,
  size,
}: {
  order: "1" | "2" | "3" | "4" | "5" | "6"
  size:
    | "auto"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
}) {
  return (
    <Title
      order={Number(order) as TitleOrder}
      size={size === "auto" ? undefined : (size as TitleSize)}
    >
      The quick brown fox jumps over the lazy dog.
    </Title>
  )
}

export function TitleOrders() {
  return (
    <div className="flex flex-col gap-2">
      <Title order={1}>Heading 1</Title>
      <Title order={2}>Heading 2</Title>
      <Title order={3}>Heading 3</Title>
      <Title order={4}>Heading 4</Title>
      <Title order={5}>Heading 5</Title>
      <Title order={6}>Heading 6</Title>
    </div>
  )
}

export function TitleSizeOverride() {
  return (
    <div className="flex flex-col gap-2">
      <Title order={3} size="h1">
        Heading 3 tag, sized like h1
      </Title>
      <Title order={1} size={16}>
        Heading 1 tag, custom 16px size
      </Title>
    </div>
  )
}

export function TitleTextWrap() {
  return (
    <Title order={2} textWrap="balance" className="max-w-sm">
      Long text wrapping demonstration with balanced line breaks
    </Title>
  )
}

export function TitleLineClamp() {
  return (
    <Title order={2} lineClamp={2} className="max-w-sm">
      This is a fully featured design system built on Base UI. You get access to
      dozens of customizable components and hooks to cover you in any situation,
      and this heading is long enough to demonstrate line clamping.
    </Title>
  )
}

export function TitleAsLink() {
  return (
    <Title order={3} render={<a href="#title" />} className="hover:underline">
      An h3-styled heading rendered as a link
    </Title>
  )
}
