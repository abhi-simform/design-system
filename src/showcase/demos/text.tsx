import {
  Text,
  type TextAlign,
  type TextSize,
  type TextTransform,
  type TextWeight,
} from "@/components/ui/text"

export function TextPlayground({
  size,
  fw,
  fs,
  ta,
  tt,
  dimmed,
  span,
}: {
  size: TextSize
  fw: "400" | "500" | "600" | "700"
  fs: "italic" | "normal"
  ta: TextAlign
  tt: TextTransform
  dimmed: boolean
  span: boolean
}) {
  return (
    <Text
      size={size}
      fw={Number(fw) as TextWeight}
      fs={fs}
      ta={ta}
      tt={tt}
      dimmed={dimmed}
      span={span}
    >
      The quick brown fox jumps over the lazy dog.
    </Text>
  )
}

export function TextWeightsAndStyles() {
  return (
    <div className="flex flex-col gap-1">
      <Text fw={400}>Regular weight (400)</Text>
      <Text fw={500}>Medium weight (500)</Text>
      <Text fw={700}>Bold weight (700)</Text>
      <Text fs="italic">Italic style</Text>
    </div>
  )
}

export function TextAlignmentAndTransform() {
  return (
    <div className="flex flex-col gap-2">
      <Text ta="center">Centered text</Text>
      <Text ta="right">Right aligned text</Text>
      <Text tt="uppercase">Uppercase transform</Text>
      <Text td="underline">Underlined text</Text>
      <Text td="line-through">Struck-through text</Text>
    </div>
  )
}

export function TextTruncate() {
  return (
    <div className="flex flex-col gap-2">
      <Text truncate="end" className="max-w-64">
        This is a long sentence that gets truncated at the end with an ellipsis.
      </Text>
      <Text truncate="start" className="max-w-64">
        This is a long sentence that gets truncated at the start with an
        ellipsis.
      </Text>
    </div>
  )
}

export function TextLineClamp() {
  return (
    <Text lineClamp={3} className="max-w-sm">
      This is a fully featured design system built on Base UI. You get access to
      dozens of customizable components and hooks to cover you in any situation.
      This paragraph is long enough to demonstrate how lineClamp limits the
      number of visible lines and adds an ellipsis at the cutoff point.
    </Text>
  )
}

export function TextAsLink() {
  return (
    <Text span dimmed render={<a href="#text" />} className="hover:underline">
      A dimmed, inline text rendered as a link
    </Text>
  )
}
