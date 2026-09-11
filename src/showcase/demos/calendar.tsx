import * as React from "react"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const SAMPLE_MONTH = new Date(2026, 8, 1)

export function CalendarPlayground({
  captionLayout,
  buttonVariant,
  showOutsideDays,
}: {
  captionLayout: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
  buttonVariant: "ghost" | "outline" | "secondary"
  showOutsideDays: boolean
}) {
  const [selected, setSelected] = React.useState<Date | undefined>(
    new Date(2026, 8, 11),
  )

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      defaultMonth={SAMPLE_MONTH}
      captionLayout={captionLayout}
      buttonVariant={buttonVariant}
      showOutsideDays={showOutsideDays}
      className="rounded-xl border"
    />
  )
}

export function CalendarSingle() {
  const [selected, setSelected] = React.useState<Date | undefined>(
    new Date(2026, 8, 11),
  )

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      defaultMonth={SAMPLE_MONTH}
      className="rounded-xl border"
    />
  )
}

export function CalendarRange() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 8, 8),
    to: new Date(2026, 8, 15),
  })

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      defaultMonth={SAMPLE_MONTH}
      numberOfMonths={1}
      className="rounded-xl border"
    />
  )
}

export function CalendarMultiple() {
  const [days, setDays] = React.useState<Date[] | undefined>([
    new Date(2026, 8, 4),
    new Date(2026, 8, 11),
    new Date(2026, 8, 18),
  ])

  return (
    <Calendar
      mode="multiple"
      selected={days}
      onSelect={setDays}
      defaultMonth={SAMPLE_MONTH}
      className="rounded-xl border"
    />
  )
}

export function CalendarDropdownCaption() {
  return (
    <Calendar
      mode="single"
      defaultMonth={SAMPLE_MONTH}
      captionLayout="dropdown"
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
      className="rounded-xl border"
    />
  )
}

export function CalendarInPopover() {
  const [date, setDate] = React.useState<Date | undefined>()

  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <Label>Due date</Label>
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" className="justify-start font-normal" />
          }
        >
          <CalendarIcon data-icon="inline-start" />
          {date ? date.toLocaleDateString() : "Pick a date"}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {/* Calendar already restyles itself inside a popover content. */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={SAMPLE_MONTH}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
