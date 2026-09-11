import { RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import type { AnyControl, ControlPrimitive } from "@/showcase/lib/controls"
import { stopSingleCharKeys } from "@/showcase/lib/keyboard"

function ControlRow({
  id,
  control,
  value,
  onChange,
}: {
  id: string
  control: AnyControl
  value: ControlPrimitive
  onChange: (next: ControlPrimitive) => void
}) {
  const controlId = `control-${id}`

  if (control.kind === "boolean") {
    return (
      <div className="flex items-center justify-between gap-3 py-1.5">
        <Label htmlFor={controlId} className="text-xs font-normal">
          {control.label}
        </Label>
        <Switch
          id={controlId}
          checked={value === true}
          onCheckedChange={(checked) => onChange(checked)}
        />
      </div>
    )
  }

  if (control.kind === "select") {
    return (
      <div className="flex flex-col gap-1.5 py-1.5">
        <Label htmlFor={controlId} className="text-xs font-normal">
          {control.label}
        </Label>
        <NativeSelect
          id={controlId}
          size="sm"
          className="w-full"
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
        >
          {control.options.map((option) => (
            <NativeSelectOption key={option} value={option}>
              {option}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
    )
  }

  if (control.kind === "number") {
    const numeric = typeof value === "number" ? value : control.defaultValue
    const hasRange = control.min !== undefined && control.max !== undefined

    return (
      <div className="flex flex-col gap-1.5 py-1.5">
        <Label htmlFor={controlId} className="text-xs font-normal">
          <span className="flex-1">{control.label}</span>
          <span className="font-mono text-muted-foreground tabular-nums">
            {numeric}
          </span>
        </Label>
        {hasRange ? (
          <Slider
            id={controlId}
            min={control.min}
            max={control.max}
            step={control.step ?? 1}
            value={numeric}
            onValueChange={(next) =>
              onChange(typeof next === "number" ? next : (next[0] ?? numeric))
            }
          />
        ) : (
          <Input
            id={controlId}
            type="number"
            step={control.step ?? 1}
            value={numeric}
            onChange={(event) => {
              const parsed = Number(event.target.value)
              onChange(Number.isNaN(parsed) ? control.defaultValue : parsed)
            }}
          />
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5 py-1.5">
      <Label htmlFor={controlId} className="text-xs font-normal">
        {control.label}
      </Label>
      <Input
        id={controlId}
        value={String(value)}
        placeholder={control.placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export function ControlsPanel({
  controls,
  values,
  onChange,
  onReset,
  onRemount,
}: {
  controls: Record<string, AnyControl>
  values: Record<string, ControlPrimitive>
  onChange: (key: string, next: ControlPrimitive) => void
  onReset: () => void
  onRemount: () => void
}) {
  const keys = Object.keys(controls)

  return (
    <div
      // Keeps `d` from reaching the theme provider's window listener while a
      // Base UI trigger (a plain <button>) has focus inside this panel.
      onKeyDown={stopSingleCharKeys}
      className="flex h-fit flex-col rounded-xl border bg-card p-4"
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">Props</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="xs" onClick={onRemount}>
            Remount
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Reset props"
            onClick={onReset}
          >
            <RotateCcwIcon />
          </Button>
        </div>
      </div>

      <div className="divide-y">
        {keys.map((key) => (
          <ControlRow
            key={key}
            id={key}
            control={controls[key]}
            value={values[key]}
            onChange={(next) => onChange(key, next)}
          />
        ))}
      </div>
    </div>
  )
}
