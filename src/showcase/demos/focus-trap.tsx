import * as React from "react"

import { Button } from "@/components/ui/button"
import { FocusTrap } from "@/components/ui/focus-trap"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FocusTrapPlayground({ active }: { active: boolean }) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <FocusTrap active={active}>
        <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="focus-trap-playground-first">First input</Label>
            <Input id="focus-trap-playground-first" placeholder="First input" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="focus-trap-playground-second">Second input</Label>
            <Input
              id="focus-trap-playground-second"
              placeholder="Second input"
            />
          </div>
        </div>
      </FocusTrap>
      <p className="text-xs text-muted-foreground">
        Toggle "active" to trap Tab focus inside the fields above.
      </p>
    </div>
  )
}

export function FocusTrapDefault() {
  const [active, setActive] = React.useState(false)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button
        variant="outline"
        onClick={() => setActive((value) => !value)}
        className="self-start"
      >
        {active ? "Deactivate" : "Activate"} focus trap
      </Button>
      <FocusTrap active={active}>
        <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="focus-trap-default-first">First input</Label>
            <Input id="focus-trap-default-first" placeholder="First input" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="focus-trap-default-second">Second input</Label>
            <Input id="focus-trap-default-second" placeholder="Second input" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="focus-trap-default-third">Third input</Label>
            <Input id="focus-trap-default-third" placeholder="Third input" />
          </div>
        </div>
      </FocusTrap>
    </div>
  )
}

export function FocusTrapAutofocus() {
  const [active, setActive] = React.useState(false)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button
        variant="outline"
        onClick={() => setActive((value) => !value)}
        className="self-start"
      >
        {active ? "Deactivate" : "Activate"} focus trap
      </Button>
      <FocusTrap active={active}>
        <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="focus-trap-autofocus-first">First input</Label>
            <Input id="focus-trap-autofocus-first" placeholder="First input" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="focus-trap-autofocus-second">
              Second input (data-autofocus)
            </Label>
            <Input
              id="focus-trap-autofocus-second"
              data-autofocus
              placeholder="Receives focus first"
            />
          </div>
        </div>
      </FocusTrap>
      <p className="text-xs text-muted-foreground">
        The element marked <code>data-autofocus</code> receives focus when the
        trap activates, instead of the first tabbable child.
      </p>
    </div>
  )
}

export function FocusTrapInitialFocusDemo() {
  const [active, setActive] = React.useState(false)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button
        variant="outline"
        onClick={() => setActive((value) => !value)}
        className="self-start"
      >
        {active ? "Deactivate" : "Activate"} focus trap
      </Button>
      <FocusTrap active={active}>
        <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
          <FocusTrap.InitialFocus />
          <p className="text-sm text-muted-foreground">
            Nothing here grabs focus first — a hidden element does, then removes
            itself from the tab order.
          </p>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="focus-trap-initial-first">First input</Label>
            <Input id="focus-trap-initial-first" placeholder="First input" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="focus-trap-initial-second">Second input</Label>
            <Input id="focus-trap-initial-second" placeholder="Second input" />
          </div>
        </div>
      </FocusTrap>
    </div>
  )
}
