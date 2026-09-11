import { AspectRatio } from "@/components/ui/aspect-ratio"

const PRESET_RATIO = {
  "16 / 9": 16 / 9,
  "4 / 3": 4 / 3,
  "1 / 1": 1,
  "21 / 9": 21 / 9,
  "3 / 4": 3 / 4,
} as const

export function AspectRatioPlayground({
  preset,
}: {
  preset: "16 / 9" | "4 / 3" | "1 / 1" | "21 / 9" | "3 / 4"
}) {
  return (
    <div className="w-full max-w-sm">
      <AspectRatio
        ratio={PRESET_RATIO[preset]}
        className="flex items-center justify-center rounded-lg bg-muted font-mono text-sm text-muted-foreground"
      >
        {preset}
      </AspectRatio>
    </div>
  )
}

export function AspectRatioPresets() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      {(["16 / 9", "4 / 3", "1 / 1", "3 / 4"] as const).map((preset) => (
        <div key={preset} className="flex flex-col gap-2">
          <span className="font-mono text-xs text-muted-foreground">
            ratio={"{"}
            {preset}
            {"}"}
          </span>
          <AspectRatio
            ratio={PRESET_RATIO[preset]}
            className="flex items-center justify-center rounded-lg border bg-muted/50 text-sm text-muted-foreground"
          >
            {preset}
          </AspectRatio>
        </div>
      ))}
    </div>
  )
}

export function AspectRatioWithContent() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border">
      <AspectRatio
        ratio={16 / 9}
        className="bg-gradient-to-br from-primary/25 to-primary/5"
      />
      <div className="p-4">
        <div className="font-heading text-sm font-medium">Release notes</div>
        <p className="mt-1 text-sm text-muted-foreground">
          AspectRatio only sets aspect-(--ratio), so it needs a constrained
          width from its parent — here, max-w-sm.
        </p>
      </div>
    </div>
  )
}
