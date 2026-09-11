import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

function Pane({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center p-4 text-sm font-medium">
      {label}
    </div>
  )
}

export function ResizablePlayground({
  orientation,
  withHandle,
}: {
  orientation: "horizontal" | "vertical"
  withHandle: boolean
}) {
  return (
    // ResizablePanelGroup is h-full, so the wrapper must supply a height.
    <ResizablePanelGroup
      orientation={orientation}
      className="h-72 w-full rounded-xl border"
    >
      <ResizablePanel defaultSize="50">
        <Pane label="One" />
      </ResizablePanel>
      <ResizableHandle withHandle={withHandle} />
      <ResizablePanel defaultSize="50">
        <Pane label="Two" />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export function ResizableHorizontal() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-64 w-full rounded-xl border"
    >
      <ResizablePanel defaultSize="30" minSize="20">
        <Pane label="Sidebar" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="70">
        <Pane label="Content" />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export function ResizableVertical() {
  return (
    <ResizablePanelGroup
      orientation="vertical"
      className="h-64 w-full rounded-xl border"
    >
      <ResizablePanel defaultSize="60">
        <Pane label="Editor" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="40">
        <Pane label="Terminal" />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export function ResizableNested() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-72 w-full rounded-xl border"
    >
      <ResizablePanel defaultSize="35" minSize="20">
        <Pane label="Files" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="65">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="65">
            <Pane label="Editor" />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="35">
            <Pane label="Output" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
