import * as React from "react"

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Pill, PillGroup } from "@/components/ui/pill"
import { PillsInput } from "@/components/ui/pills-input"

function useTagsInput(initial: string[]) {
  const [values, setValues] = React.useState(initial)
  const [inputValue, setInputValue] = React.useState("")

  const addValue = (raw: string) => {
    const value = raw.trim()
    if (!value || values.includes(value)) return
    setValues((current) => [...current, value])
  }

  const removeValue = (value: string) => {
    setValues((current) => current.filter((item) => item !== value))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      addValue(inputValue)
      setInputValue("")
    } else if (
      event.key === "Backspace" &&
      inputValue === "" &&
      values.length > 0
    ) {
      setValues((current) => current.slice(0, -1))
    }
  }

  return { values, inputValue, setInputValue, removeValue, handleKeyDown }
}

export function PillsInputPlayground({
  disabled,
  placeholder,
}: {
  disabled: boolean
  placeholder: string
}) {
  const { values, inputValue, setInputValue, removeValue, handleKeyDown } =
    useTagsInput(["React", "Vue"])

  return (
    <PillsInput disabled={disabled} className="max-w-sm">
      <PillGroup>
        {values.map((value) => (
          <Pill
            key={value}
            withRemoveButton
            onRemove={() => removeValue(value)}
          >
            {value}
          </Pill>
        ))}
        <PillsInput.Field
          placeholder={values.length === 0 ? placeholder : ""}
          aria-label="Add a tag"
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
      </PillGroup>
    </PillsInput>
  )
}

export function PillsInputBasic() {
  const { values, inputValue, setInputValue, removeValue, handleKeyDown } =
    useTagsInput(["React", "Vue", "Svelte"])

  return (
    <PillsInput className="max-w-sm">
      <PillGroup>
        {values.map((value) => (
          <Pill
            key={value}
            withRemoveButton
            onRemove={() => removeValue(value)}
          >
            {value}
          </Pill>
        ))}
        <PillsInput.Field
          placeholder="Enter tags"
          aria-label="Frameworks"
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
      </PillGroup>
    </PillsInput>
  )
}

export function PillsInputWithLabel() {
  const { values, inputValue, setInputValue, removeValue, handleKeyDown } =
    useTagsInput(["Design", "Engineering"])

  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="pills-input-teams">Teams</FieldLabel>
      <PillsInput>
        <PillGroup>
          {values.map((value) => (
            <Pill
              key={value}
              withRemoveButton
              onRemove={() => removeValue(value)}
            >
              {value}
            </Pill>
          ))}
          <PillsInput.Field
            id="pills-input-teams"
            placeholder="Add a team"
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />
        </PillGroup>
      </PillsInput>
      <FieldDescription>
        Press Enter or comma to add, Backspace to remove the last tag.
      </FieldDescription>
    </Field>
  )
}

export function PillsInputStates() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <PillsInput>
        <PillGroup>
          <Pill withRemoveButton>React</Pill>
          <PillsInput.Field placeholder="Add a tag" aria-label="Tags" />
        </PillGroup>
      </PillsInput>
      <PillsInput disabled>
        <PillGroup>
          <Pill disabled withRemoveButton>
            React
          </Pill>
          <PillsInput.Field placeholder="Disabled" aria-label="Tags" disabled />
        </PillGroup>
      </PillsInput>
      <PillsInput aria-invalid="true">
        <PillGroup>
          <Pill withRemoveButton>React</Pill>
          <PillsInput.Field
            placeholder="Add a tag"
            aria-label="Tags"
            aria-invalid="true"
          />
        </PillGroup>
      </PillsInput>
    </div>
  )
}
