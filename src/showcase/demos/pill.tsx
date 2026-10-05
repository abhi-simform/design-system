import * as React from "react"

import { Pill, type PillSize } from "@/components/ui/pill"

const FRAMEWORKS = ["React", "Vue", "Svelte", "Angular", "Solid"]

export function PillPlayground({
  size,
  withRemoveButton,
  disabled,
}: {
  size: PillSize
  withRemoveButton: boolean
  disabled: boolean
}) {
  return (
    <Pill size={size} withRemoveButton={withRemoveButton} disabled={disabled}>
      React
    </Pill>
  )
}

export function PillBasic() {
  return (
    <Pill.Group>
      {FRAMEWORKS.slice(0, 3).map((framework) => (
        <Pill key={framework}>{framework}</Pill>
      ))}
    </Pill.Group>
  )
}

export function PillRemovable() {
  const [values, setValues] = React.useState(FRAMEWORKS)

  return (
    <Pill.Group>
      {values.map((value) => (
        <Pill
          key={value}
          withRemoveButton
          onRemove={() =>
            setValues((current) => current.filter((item) => item !== value))
          }
        >
          {value}
        </Pill>
      ))}
    </Pill.Group>
  )
}

export function PillSizes() {
  const sizes: PillSize[] = ["xs", "sm", "md", "lg", "xl"]

  return (
    <Pill.Group>
      {sizes.map((size) => (
        <Pill key={size} size={size} withRemoveButton>
          Size {size}
        </Pill>
      ))}
    </Pill.Group>
  )
}

export function PillDisabled() {
  return (
    <Pill.Group>
      <Pill disabled>Disabled</Pill>
      <Pill disabled withRemoveButton>
        Disabled removable
      </Pill>
      <Pill withRemoveButton>Enabled</Pill>
    </Pill.Group>
  )
}
