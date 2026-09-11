import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const PLANS = [
  { value: "hobby", label: "Hobby", hint: "Free forever" },
  { value: "pro", label: "Pro", hint: "$20 per month" },
  { value: "team", label: "Team", hint: "$60 per month" },
]

export function RadioGroupPlayground({
  orientation,
  disabled,
}: {
  orientation: "vertical" | "horizontal"
  disabled: boolean
}) {
  return (
    <RadioGroup
      defaultValue="pro"
      disabled={disabled}
      className={orientation === "horizontal" ? "flex gap-6" : undefined}
    >
      {PLANS.map((plan) => (
        <Label key={plan.value} className="gap-2.5">
          <RadioGroupItem value={plan.value} />
          {plan.label}
        </Label>
      ))}
    </RadioGroup>
  )
}

export function RadioGroupBasic() {
  return (
    <RadioGroup defaultValue="pro" className="flex flex-col gap-3">
      {PLANS.map((plan) => (
        <Label key={plan.value} className="items-start gap-2.5">
          <RadioGroupItem value={plan.value} className="mt-0.5" />
          <span className="flex flex-col gap-0.5">
            <span>{plan.label}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {plan.hint}
            </span>
          </span>
        </Label>
      ))}
    </RadioGroup>
  )
}

export function RadioGroupHorizontal() {
  return (
    <RadioGroup defaultValue="md" className="flex gap-6">
      {["sm", "md", "lg"].map((size) => (
        <Label key={size} className="gap-2.5">
          <RadioGroupItem value={size} />
          {size}
        </Label>
      ))}
    </RadioGroup>
  )
}

export function RadioGroupDisabled() {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup defaultValue="a" className="flex flex-col gap-3">
        <Label className="gap-2.5">
          <RadioGroupItem value="a" />
          Available
        </Label>
        <Label className="gap-2.5">
          <RadioGroupItem value="b" disabled />
          One disabled option
        </Label>
      </RadioGroup>
      <RadioGroup defaultValue="x" disabled className="flex flex-col gap-3">
        <Label className="gap-2.5">
          <RadioGroupItem value="x" />
          Whole group disabled
        </Label>
        <Label className="gap-2.5">
          <RadioGroupItem value="y" />
          Also disabled
        </Label>
      </RadioGroup>
    </div>
  )
}
