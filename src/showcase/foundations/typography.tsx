import { cn } from "@/lib/utils"
import { FONT_WEIGHTS, TYPE_SCALE } from "@/showcase/fixtures/tokens"

export function FoundationTypography() {
  return (
    <div className="flex flex-col gap-10">
      <p className="text-sm/relaxed text-muted-foreground">
        Two variable families are loaded via Fontsource. Inter Variable is the
        body face (<code className="font-mono text-xs">--font-sans</code>,
        applied to <code className="font-mono text-xs">html</code> in the base
        layer); DM Sans Variable is reserved for headings (
        <code className="font-mono text-xs">--font-heading</code>) and is used
        by <code className="font-mono text-xs">CardTitle</code>,{" "}
        <code className="font-mono text-xs">EmptyTitle</code> and friends.
      </p>

      <section className="flex flex-col gap-4">
        <h3 className="font-heading text-base font-medium tracking-tight">
          Families
        </h3>
        <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
          <div className="bg-card p-5">
            <div className="font-mono text-xs text-muted-foreground">
              font-sans · Inter Variable
            </div>
            <p className="mt-3 font-sans text-2xl">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div className="bg-card p-5">
            <div className="font-mono text-xs text-muted-foreground">
              font-heading · DM Sans Variable
            </div>
            <p className="mt-3 font-heading text-2xl tracking-tight">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="font-heading text-base font-medium tracking-tight">
          Scale
        </h3>
        <div className="overflow-hidden rounded-xl border">
          {TYPE_SCALE.map((step, index) => (
            <div
              key={step.className}
              className={cn(
                "flex items-center gap-5 px-5 py-4",
                index > 0 && "border-t",
              )}
            >
              <div className="w-32 shrink-0 font-mono text-xs text-muted-foreground">
                {step.label}
                <span className="ml-2 opacity-60">{step.size}</span>
              </div>
              <p className={cn("min-w-0 truncate", step.className)}>
                Design system
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="font-heading text-base font-medium tracking-tight">
          Weights
        </h3>
        <div className="overflow-hidden rounded-xl border">
          {FONT_WEIGHTS.map((step, index) => (
            <div
              key={step.className}
              className={cn(
                "flex items-center gap-5 px-5 py-4",
                index > 0 && "border-t",
              )}
            >
              <div className="w-32 shrink-0 font-mono text-xs text-muted-foreground">
                {step.label}
                <span className="ml-2 opacity-60">{step.size}</span>
              </div>
              <p className={cn("min-w-0 truncate text-lg", step.className)}>
                Design system
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
