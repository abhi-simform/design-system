import * as React from "react"
import { UserIcon, MailIcon, ShieldCheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Stepper,
  type StepperIconPosition,
  type StepperLabelPosition,
  type StepperOrientation,
  type StepperRadius,
  type StepperSize,
} from "@/components/ui/stepper"

function Controls({
  active,
  setActive,
  max,
}: {
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
  max: number
}) {
  return (
    <div className="mt-6 flex gap-2">
      <Button
        variant="outline"
        disabled={active === 0}
        onClick={() => setActive((current) => Math.max(0, current - 1))}
      >
        Back
      </Button>
      <Button
        disabled={active >= max}
        onClick={() => setActive((current) => Math.min(max, current + 1))}
      >
        Next step
      </Button>
    </div>
  )
}

export function StepperPlayground({
  size,
  radius,
  orientation,
  iconPosition,
  labelPosition,
  allowNextStepsSelect,
  withDescription,
}: {
  size: StepperSize
  radius: StepperRadius
  orientation: StepperOrientation
  iconPosition: StepperIconPosition
  labelPosition: StepperLabelPosition
  allowNextStepsSelect: boolean
  withDescription: boolean
}) {
  const [active, setActive] = React.useState(1)

  return (
    <div className="w-full max-w-2xl">
      <Stepper
        active={active}
        onStepClick={setActive}
        size={size}
        radius={radius}
        orientation={orientation}
        iconPosition={iconPosition}
        labelPosition={labelPosition}
        allowNextStepsSelect={allowNextStepsSelect}
      >
        <Stepper.Step
          label="First step"
          description={withDescription ? "Create an account" : undefined}
        >
          Step 1 content: create an account
        </Stepper.Step>
        <Stepper.Step
          label="Second step"
          description={withDescription ? "Verify email" : undefined}
        >
          Step 2 content: verify email
        </Stepper.Step>
        <Stepper.Step
          label="Final step"
          description={withDescription ? "Get full access" : undefined}
        >
          Step 3 content: get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back to go to the previous step
        </Stepper.Completed>
      </Stepper>
      <Controls active={active} setActive={setActive} max={3} />
    </div>
  )
}

export function StepperBasic() {
  const [active, setActive] = React.useState(1)

  return (
    <div className="w-full max-w-2xl">
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Create an account">
          Step 1 content: create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back to go to the previous step
        </Stepper.Completed>
      </Stepper>
      <Controls active={active} setActive={setActive} max={3} />
    </div>
  )
}

export function StepperVertical() {
  const [active, setActive] = React.useState(1)

  return (
    <div className="w-full max-w-md">
      <Stepper active={active} onStepClick={setActive} orientation="vertical">
        <Stepper.Step label="First step" description="Create an account" />
        <Stepper.Step label="Second step" description="Verify email" />
        <Stepper.Step label="Final step" description="Get full access" />
      </Stepper>
      <Controls active={active} setActive={setActive} max={3} />
    </div>
  )
}

export function StepperLabelBottom() {
  const [active, setActive] = React.useState(1)

  return (
    <div className="w-full max-w-2xl">
      <Stepper active={active} onStepClick={setActive} labelPosition="bottom">
        <Stepper.Step label="First step" description="Create an account" />
        <Stepper.Step label="Second step" description="Verify email" />
        <Stepper.Step label="Final step" description="Get full access" />
      </Stepper>
      <Controls active={active} setActive={setActive} max={3} />
    </div>
  )
}

export function StepperCustomIcons() {
  const [active, setActive] = React.useState(1)

  return (
    <div className="w-full max-w-2xl">
      <Stepper
        active={active}
        onStepClick={setActive}
        color="var(--color-emerald-600)"
        completedIcon={<ShieldCheckIcon className="size-1/2" />}
      >
        <Stepper.Step
          icon={<UserIcon className="size-1/2" />}
          label="Account"
          description="Create an account"
        />
        <Stepper.Step
          icon={<MailIcon className="size-1/2" />}
          label="Email"
          description="Verify email"
        />
        <Stepper.Step
          icon={<ShieldCheckIcon className="size-1/2" />}
          label="Access"
          description="Get full access"
        />
      </Stepper>
      <Controls active={active} setActive={setActive} max={3} />
    </div>
  )
}

export function StepperLoading() {
  const [active, setActive] = React.useState(1)

  return (
    <div className="w-full max-w-2xl">
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" />
        <Stepper.Step label="Second step" loading />
        <Stepper.Step label="Final step" />
      </Stepper>
      <Controls active={active} setActive={setActive} max={3} />
    </div>
  )
}

export function StepperNoSkipping() {
  const [active, setActive] = React.useState(1)

  return (
    <div className="w-full max-w-2xl">
      <Stepper
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="First step">Step 1 content</Stepper.Step>
        <Stepper.Step label="Second step">Step 2 content</Stepper.Step>
        <Stepper.Step label="Final step" allowStepSelect={active > 1}>
          Step 3 content
        </Stepper.Step>
      </Stepper>
      <Controls active={active} setActive={setActive} max={2} />
    </div>
  )
}

export function StepperKeepMounted() {
  const [active, setActive] = React.useState(0)

  return (
    <div className="w-full max-w-2xl">
      <Stepper active={active} onStepClick={setActive} keepMounted>
        <Stepper.Step label="Name">
          <input
            className="w-full rounded-md border px-2 py-1 text-sm"
            placeholder="Type here, then switch steps"
          />
        </Stepper.Step>
        <Stepper.Step label="Details">
          <input
            className="w-full rounded-md border px-2 py-1 text-sm"
            placeholder="Also keeps its value"
          />
        </Stepper.Step>
      </Stepper>
      <Controls active={active} setActive={setActive} max={1} />
    </div>
  )
}
