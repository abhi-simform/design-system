import { Label } from "@/components/ui/label"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"

const FRAMEWORKS = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
  "SolidStart",
  "Qwik City",
]

const LANGUAGES = ["TypeScript", "Rust", "Go", "Python", "Elixir"]

export function ComboboxPlayground({
  showTrigger,
  showClear,
  disabled,
}: {
  showTrigger: boolean
  showClear: boolean
  disabled: boolean
}) {
  return (
    <Combobox items={FRAMEWORKS}>
      <ComboboxInput
        placeholder="Pick a framework"
        showTrigger={showTrigger}
        showClear={showClear}
        disabled={disabled}
        className="w-64"
      />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxCollection>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxCollection>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export function ComboboxBasic() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <Label>Framework</Label>
      <Combobox items={FRAMEWORKS}>
        <ComboboxInput placeholder="Search frameworks…" />
        <ComboboxContent>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxCollection>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxCollection>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

export function ComboboxGrouped() {
  return (
    <Combobox items={[...FRAMEWORKS, ...LANGUAGES]}>
      <ComboboxInput placeholder="Search…" className="w-64" />
      <ComboboxContent>
        <ComboboxEmpty>Nothing matched.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>Frameworks</ComboboxLabel>
            {FRAMEWORKS.map((item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            ))}
          </ComboboxGroup>
          <ComboboxGroup>
            <ComboboxLabel>Languages</ComboboxLabel>
            {LANGUAGES.map((item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            ))}
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export function ComboboxMultiple() {
  const anchor = useComboboxAnchor()

  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label>Languages</Label>
      <Combobox items={LANGUAGES} multiple defaultValue={["TypeScript", "Go"]}>
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {(selected: string[]) =>
              selected.map((item) => (
                <ComboboxChip key={item} aria-label={item}>
                  {item}
                </ComboboxChip>
              ))
            }
          </ComboboxValue>
          <ComboboxChipsInput placeholder="Add another…" />
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No language found.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxCollection>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxCollection>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
