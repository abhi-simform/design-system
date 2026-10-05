import * as React from "react"

import { Button } from "@/components/ui/button"
import { RingProgress } from "@/components/ui/ring-progress"

export function RingProgressPlayground({
  size,
  thickness,
  roundCaps,
  sectionGap,
  startAngle,
  transitionDuration,
  withLabel,
}: {
  size: number
  thickness: number
  roundCaps: boolean
  sectionGap: number
  startAngle: number
  transitionDuration: number
  withLabel: boolean
}) {
  return (
    <RingProgress
      size={size}
      thickness={thickness}
      roundCaps={roundCaps}
      sectionGap={sectionGap}
      startAngle={startAngle}
      transitionDuration={transitionDuration}
      label={
        withLabel ? (
          <p className="text-center text-xs font-medium">Progress</p>
        ) : undefined
      }
      sections={[
        { value: 40, color: "var(--color-blue-500)" },
        { value: 25, color: "var(--color-orange-500)" },
        { value: 15, color: "var(--color-emerald-500)" },
      ]}
    />
  )
}

export function RingProgressDefault() {
  return (
    <RingProgress
      sections={[{ value: 40, color: "var(--color-blue-500)" }]}
      label={<p className="text-center text-sm font-bold">40%</p>}
    />
  )
}

export function RingProgressMultiple() {
  return (
    <RingProgress
      size={160}
      thickness={16}
      roundCaps
      label={<p className="text-center text-xs">Storage</p>}
      sections={[
        { value: 40, color: "var(--color-cyan-500)" },
        { value: 15, color: "var(--color-orange-500)" },
        { value: 15, color: "var(--color-lime-500)" },
      ]}
    />
  )
}

export function RingProgressTooltips() {
  return (
    <RingProgress
      size={160}
      thickness={20}
      sections={[
        {
          value: 40,
          color: "var(--color-cyan-500)",
          tooltip: "Documents: 40 GB",
        },
        {
          value: 25,
          color: "var(--color-orange-500)",
          tooltip: "Photos: 25 GB",
        },
        {
          value: 15,
          color: "var(--color-grape-500, var(--color-purple-500))",
          tooltip: "Other: 15 GB",
        },
      ]}
      label={<p className="text-center text-xs">Hover a section</p>}
    />
  )
}

export function RingProgressSectionGap() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {[0, 6, 14].map((gap) => (
        <RingProgress
          key={gap}
          sectionGap={gap}
          roundCaps={gap > 0}
          label={<p className="text-center text-xs">{gap}deg</p>}
          sections={[
            { value: 30, color: "var(--color-blue-500)" },
            { value: 30, color: "var(--color-pink-500)" },
            { value: 30, color: "var(--color-amber-500)" },
          ]}
        />
      ))}
    </div>
  )
}

export function RingProgressStartAngle() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {[0, 90, 180, 270].map((angle) => (
        <RingProgress
          key={angle}
          size={96}
          thickness={10}
          startAngle={angle}
          rootColor="var(--color-red-100)"
          label={<p className="text-center text-xs">{angle}deg</p>}
          sections={[{ value: 35, color: "var(--color-red-500)" }]}
        />
      ))}
    </div>
  )
}

export function RingProgressAnimated() {
  const [value, setValue] = React.useState(25)

  return (
    <div className="flex flex-col items-center gap-4">
      <RingProgress
        transitionDuration={400}
        label={<p className="text-center text-sm font-bold">{value}%</p>}
        sections={[
          {
            value,
            color:
              value > 70 ? "var(--color-emerald-500)" : "var(--color-blue-500)",
          },
        ]}
      />
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setValue((v) => Math.max(0, v - 15))}
        >
          Decrease
        </Button>
        <Button onClick={() => setValue((v) => Math.min(100, v + 15))}>
          Increase
        </Button>
      </div>
    </div>
  )
}
