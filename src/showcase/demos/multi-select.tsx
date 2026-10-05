import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"

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
  {
    group: "Frontend",
    items: ["React", "Vue", "Svelte", "Angular"],
  },
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

export function MultiSelectPlayground({
  searchable,
  clearable,
  hidePickedOptions,
  disabled,
}: {
  searchable: boolean
  clearable: boolean
  hidePickedOptions: boolean
  disabled: boolean
}) {
  return (
    <MultiSelect
      data={FRAMEWORKS}
      defaultValue={["Next.js"]}
      placeholder="Pick frameworks"
      searchable={searchable}
      clearable={clearable}
      hidePickedOptions={hidePickedOptions}
      disabled={disabled}
      className="w-72"
    />
  )
}

export function MultiSelectBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Frameworks</Label>
      <MultiSelect
        data={FRAMEWORKS}
        defaultValue={["Next.js", "Remix"]}
        placeholder="Search frameworks…"
        searchable
        clearable
      />
    </div>
  )
}

export function MultiSelectGrouped() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Skills</Label>
      <MultiSelect
        data={SKILLS_DATA}
        defaultValue={["React", "rails"]}
        placeholder="Search skills…"
        searchable
        nothingFoundMessage="No skills found."
      />
    </div>
  )
}

export function MultiSelectMaxValues() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Frameworks (max 3)</Label>
      <MultiSelect
        data={FRAMEWORKS}
        defaultValue={["Next.js"]}
        placeholder="Pick up to 3…"
        maxValues={3}
        clearable
      />
    </div>
  )
}

export function MultiSelectHidePickedOptions() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Frameworks</Label>
      <MultiSelect
        data={FRAMEWORKS}
        defaultValue={["Next.js"]}
        placeholder="Pick frameworks"
        searchable
        hidePickedOptions
      />
    </div>
  )
}
