import {
  ChevronDownIcon,
  CopyIcon,
  MinusIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

export function ButtonGroupPlayground({
  orientation,
  size,
  variant,
}: {
  orientation: "horizontal" | "vertical"
  size: "default" | "xs" | "sm" | "lg"
  variant: "outline" | "secondary" | "default"
}) {
  return (
    <ButtonGroup orientation={orientation}>
      <Button variant={variant} size={size}>
        Copy
      </Button>
      <Button variant={variant} size={size}>
        Duplicate
      </Button>
      <Button variant={variant} size={size}>
        Delete
      </Button>
    </ButtonGroup>
  )
}

export function ButtonGroupBasic() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <CopyIcon data-icon="inline-start" />
        Copy
      </Button>
      <Button variant="outline">Duplicate</Button>
      <Button variant="outline">
        <Trash2Icon data-icon="inline-start" />
        Delete
      </Button>
    </ButtonGroup>
  )
}

export function ButtonGroupWithSeparator() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Save</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="icon" aria-label="More options">
        <ChevronDownIcon />
      </Button>
    </ButtonGroup>
  )
}

export function ButtonGroupWithText() {
  return (
    <ButtonGroup>
      <ButtonGroupText>https://</ButtonGroupText>
      <Input defaultValue="example.com" className="w-48" />
      <Button variant="outline">Go</Button>
    </ButtonGroup>
  )
}

export function ButtonGroupStepper() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Decrease">
        <MinusIcon />
      </Button>
      <ButtonGroupText className="min-w-12 justify-center tabular-nums">
        12
      </ButtonGroupText>
      <Button variant="outline" size="icon" aria-label="Increase">
        <PlusIcon />
      </Button>
    </ButtonGroup>
  )
}

export function ButtonGroupVertical() {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  )
}
