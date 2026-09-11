import { DownloadIcon, FileTextIcon, XIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"

export function AttachmentPlayground({
  size,
  orientation,
  state,
  mediaVariant,
}: {
  size: "default" | "sm" | "xs"
  orientation: "horizontal" | "vertical"
  state: "idle" | "uploading" | "processing" | "error" | "done"
  mediaVariant: "icon" | "image"
}) {
  return (
    <Attachment
      size={size}
      orientation={orientation}
      state={state}
      className="w-full max-w-xs"
    >
      <AttachmentMedia variant={mediaVariant}>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>design-tokens.json</AttachmentTitle>
        <AttachmentDescription>14 KB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  )
}

export function AttachmentStates() {
  const states = ["idle", "uploading", "processing", "error", "done"] as const

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {states.map((state) => (
        <Attachment key={state} state={state}>
          <AttachmentMedia variant="icon">
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>report-{state}.pdf</AttachmentTitle>
            <AttachmentDescription>
              state=&quot;{state}&quot;
            </AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  )
}

export function AttachmentSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {(["default", "sm", "xs"] as const).map((size) => (
        <Attachment key={size} size={size}>
          <AttachmentMedia variant="icon">
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>size=&quot;{size}&quot;</AttachmentTitle>
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  )
}

export function AttachmentGroups() {
  return (
    <AttachmentGroup className="w-full max-w-sm">
      {["brief.pdf", "moodboard.png", "budget.xlsx"].map((name) => (
        <Attachment key={name} size="sm">
          <AttachmentMedia variant="icon">
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{name}</AttachmentTitle>
            <AttachmentDescription>Uploaded just now</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Download">
              <DownloadIcon />
            </AttachmentAction>
            <AttachmentAction aria-label="Remove">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </AttachmentGroup>
  )
}

export function AttachmentVertical() {
  return (
    <div className="flex flex-wrap gap-3">
      {["cover.png", "hero.png"].map((name) => (
        <Attachment key={name} orientation="vertical" className="w-36">
          <AttachmentMedia variant="image">
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{name}</AttachmentTitle>
            <AttachmentDescription>PNG · 220 KB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  )
}
