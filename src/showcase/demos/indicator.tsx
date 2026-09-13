import { BellIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Indicator,
  type IndicatorColor,
  type IndicatorPosition,
} from "@/components/ui/indicator"
import { PEOPLE } from "@/showcase/fixtures/people"

export function IndicatorPlayground({
  position,
  color,
  size,
  label,
  withBorder,
  processing,
  disabled,
}: {
  position: IndicatorPosition
  color: IndicatorColor
  size: number
  label: string
  withBorder: boolean
  processing: boolean
  disabled: boolean
}) {
  return (
    <Indicator
      position={position}
      color={color}
      size={size}
      label={label === "" ? undefined : label}
      withBorder={withBorder}
      processing={processing}
      disabled={disabled}
    >
      <Avatar size="lg">
        <AvatarImage src={PEOPLE[0].avatar} alt={PEOPLE[0].name} />
        <AvatarFallback>{PEOPLE[0].initials}</AvatarFallback>
      </Avatar>
    </Indicator>
  )
}

const POSITIONS: IndicatorPosition[] = [
  "top-start",
  "top-center",
  "top-end",
  "middle-start",
  "middle-center",
  "middle-end",
  "bottom-start",
  "bottom-center",
  "bottom-end",
]

export function IndicatorPositions() {
  return (
    <div className="grid grid-cols-3 gap-8">
      {POSITIONS.map((position) => (
        <div key={position} className="flex flex-col items-center gap-2">
          <Indicator position={position}>
            <div className="size-14 rounded-lg border border-border bg-muted" />
          </Indicator>
          <span className="text-xs text-muted-foreground">{position}</span>
        </div>
      ))}
    </div>
  )
}

export function IndicatorWithLabel() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <Indicator label={3}>
        <Button variant="outline" size="icon">
          <BellIcon />
        </Button>
      </Indicator>
      <Indicator label={128} maxValue={99}>
        <Button variant="outline" size="icon">
          <BellIcon />
        </Button>
      </Indicator>
      <Indicator label={0} showZero={false}>
        <Button variant="outline" size="icon">
          <BellIcon />
        </Button>
      </Indicator>
    </div>
  )
}

const COLORS: IndicatorColor[] = [
  "primary",
  "secondary",
  "destructive",
  "accent",
  "muted",
]

export function IndicatorColors() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      {COLORS.map((color) => (
        <Indicator key={color} color={color}>
          <div className="size-10 rounded-full border border-border bg-background" />
        </Indicator>
      ))}
    </div>
  )
}

export function IndicatorProcessing() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <Indicator processing color="primary">
        <Avatar size="lg">
          <AvatarImage src={PEOPLE[1].avatar} alt={PEOPLE[1].name} />
          <AvatarFallback>{PEOPLE[1].initials}</AvatarFallback>
        </Avatar>
      </Indicator>
      <Indicator processing color="destructive" position="bottom-end">
        <Avatar size="lg">
          <AvatarImage src={PEOPLE[2].avatar} alt={PEOPLE[2].name} />
          <AvatarFallback>{PEOPLE[2].initials}</AvatarFallback>
        </Avatar>
      </Indicator>
    </div>
  )
}

export function IndicatorInline() {
  return (
    <div className="text-sm text-foreground">
      Your subscription is{" "}
      <Indicator inline processing size={8} className="mx-1.5 align-middle" />{" "}
      renewing automatically.
    </div>
  )
}
