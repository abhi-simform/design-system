import { Group } from "@/components/ui/group"
import { Space } from "@/components/ui/space"
import { Stack } from "@/components/ui/stack"

function DemoCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-muted/50 px-4 py-3 font-mono text-xs text-muted-foreground">
      {children}
    </div>
  )
}

export function SpacePlayground({
  w,
}: {
  w: "xs" | "sm" | "md" | "lg" | "xl"
}) {
  return (
    <Group className="gap-0">
      <DemoCell>First</DemoCell>
      <Space w={w} />
      <DemoCell>Second</DemoCell>
    </Group>
  )
}

export function SpaceHorizontal() {
  return (
    <Group className="gap-0">
      <DemoCell>First</DemoCell>
      <Space w="xl" />
      <DemoCell>Second</DemoCell>
    </Group>
  )
}

export function SpaceVertical() {
  return (
    <Stack className="w-fit gap-0">
      <DemoCell>First</DemoCell>
      <Space h="xl" />
      <DemoCell>Second</DemoCell>
    </Stack>
  )
}

export function SpaceCustomSize() {
  return (
    <Group className="gap-0">
      <DemoCell>First</DemoCell>
      <Space w={80} />
      <DemoCell>Second</DemoCell>
    </Group>
  )
}
