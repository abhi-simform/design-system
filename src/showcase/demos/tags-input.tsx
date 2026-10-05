import { Label } from "@/components/ui/label"
import { TagsInput } from "@/components/ui/tags-input"

const TECH_SUGGESTIONS = [
  "React",
  "Vue",
  "Svelte",
  "Angular",
  "Next.js",
  "Nuxt.js",
  "Remix",
]

export function TagsInputPlayground({
  clearable,
  allowDuplicates,
  acceptValueOnBlur,
  disabled,
}: {
  clearable: boolean
  allowDuplicates: boolean
  acceptValueOnBlur: boolean
  disabled: boolean
}) {
  return (
    <TagsInput
      defaultValue={["React"]}
      placeholder="Press Enter to add a tag"
      clearable={clearable}
      allowDuplicates={allowDuplicates}
      acceptValueOnBlur={acceptValueOnBlur}
      disabled={disabled}
      className="w-72"
    />
  )
}

export function TagsInputBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Topics</Label>
      <TagsInput
        defaultValue={["react", "typescript"]}
        placeholder="Press Enter to add a topic"
        clearable
      />
    </div>
  )
}

export function TagsInputWithSuggestions() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Frameworks</Label>
      <TagsInput
        data={TECH_SUGGESTIONS}
        defaultValue={["React"]}
        placeholder="Pick a suggestion or type your own"
      />
    </div>
  )
}

export function TagsInputMaxTags() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Topics (max 3)</Label>
      <TagsInput
        defaultValue={["react"]}
        placeholder="Add up to 3 topics"
        maxTags={3}
        clearable
      />
    </div>
  )
}

export function TagsInputSplitChars() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Emails</Label>
      <TagsInput
        placeholder="Separate with a comma or a space"
        splitChars={[",", " "]}
      />
    </div>
  )
}
