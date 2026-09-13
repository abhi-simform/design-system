import { Anchor, type AnchorUnderline } from "@/components/ui/anchor"
import { Text } from "@/components/ui/text"
import type { TextSize, TextWeight } from "@/components/ui/text"

export function AnchorPlayground({
  underline,
  size,
  fw,
  dimmed,
}: {
  underline: AnchorUnderline
  size: TextSize
  fw: "400" | "500" | "600" | "700"
  dimmed: boolean
}) {
  return (
    <Anchor
      href="#"
      underline={underline}
      size={size}
      fw={Number(fw) as TextWeight}
      dimmed={dimmed}
    >
      Visit the documentation
    </Anchor>
  )
}

export function AnchorUnderlineVariants() {
  return (
    <div className="flex flex-col gap-2">
      <Anchor href="#" underline="always">
        Always underlined
      </Anchor>
      <Anchor href="#" underline="hover">
        Underlined on hover
      </Anchor>
      <Anchor href="#" underline="not-hover">
        Underlined except on hover
      </Anchor>
      <Anchor href="#" underline="never">
        Never underlined
      </Anchor>
    </div>
  )
}

export function AnchorExternalLink() {
  return (
    <Anchor
      href="https://example.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      Open an external resource
    </Anchor>
  )
}

export function AnchorWithinText() {
  return (
    <Text>
      For more information, see the <Anchor href="#">documentation</Anchor>.
    </Text>
  )
}
