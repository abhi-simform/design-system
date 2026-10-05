import * as React from "react"

import { Autocomplete } from "@/components/ui/autocomplete"
import { Label } from "@/components/ui/label"
import { SearchIcon } from "lucide-react"

const FRAMEWORKS = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
  "SolidStart",
  "Qwik City",
]

const SKILLS_DATA = [
  { group: "Frontend", items: ["React", "Vue", "Svelte", "Angular"] },
  {
    group: "Backend",
    items: [
      "Node.js",
      "Django",
      { value: "rails", label: "Ruby on Rails" },
      { value: "laravel", label: "Laravel", disabled: true },
    ],
  },
]

export function AutocompletePlayground({
  clearable,
  openOnFocus,
  autoSelectOnBlur,
  selectFirstOptionOnChange,
  limit,
  disabled,
}: {
  clearable: boolean
  openOnFocus: boolean
  autoSelectOnBlur: boolean
  selectFirstOptionOnChange: boolean
  limit: number
  disabled: boolean
}) {
  return (
    <Autocomplete
      data={FRAMEWORKS}
      placeholder="Pick or type a framework"
      clearable={clearable}
      openOnFocus={openOnFocus}
      autoSelectOnBlur={autoSelectOnBlur}
      selectFirstOptionOnChange={selectFirstOptionOnChange}
      limit={limit}
      disabled={disabled}
      className="w-72"
    />
  )
}

export function AutocompleteBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Framework</Label>
      <Autocomplete
        data={FRAMEWORKS}
        placeholder="Pick or type a framework"
        clearable
      />
    </div>
  )
}

export function AutocompleteGrouped() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Skill</Label>
      <Autocomplete data={SKILLS_DATA} placeholder="Search skills…" />
    </div>
  )
}

export function AutocompleteLimit() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Framework (max 3 options)</Label>
      <Autocomplete data={FRAMEWORKS} limit={3} placeholder="Type to filter…" />
    </div>
  )
}

export function AutocompleteCustomOption() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Framework</Label>
      <Autocomplete
        data={FRAMEWORKS}
        placeholder="Pick a framework"
        renderOption={({ option }) => (
          <span className="flex items-center gap-2">
            <SearchIcon className="text-muted-foreground" />
            {option.label}
          </span>
        )}
      />
    </div>
  )
}

export function AutocompleteControlled() {
  const [value, setValue] = React.useState("")
  const [submitted, setSubmitted] = React.useState<string | null>(null)

  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Framework</Label>
      <Autocomplete
        data={FRAMEWORKS}
        value={value}
        onChange={setValue}
        onOptionSubmit={setSubmitted}
        placeholder="Pick or type a framework"
        autoSelectOnBlur
        selectFirstOptionOnChange
        clearable
        leftSection={<SearchIcon />}
      />
      <p className="text-xs text-muted-foreground">
        Value: “{value}” · Last submitted option: {submitted ?? "none"}
      </p>
    </div>
  )
}
