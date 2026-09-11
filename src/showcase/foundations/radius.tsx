import { cn } from "@/lib/utils"
import { RADIUS_STEPS } from "@/showcase/fixtures/tokens"

export function FoundationRadius() {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm/relaxed text-muted-foreground">
        A single root token drives the whole scale:{" "}
        <code className="font-mono text-xs">--radius: 0.45rem</code>. Every
        other step is a <code className="font-mono text-xs">calc()</code>{" "}
        multiple of it, so changing one value reshapes every component at once.
      </p>

      <div className="overflow-hidden rounded-xl border">
        {RADIUS_STEPS.map((step, index) => (
          <div
            key={step.token}
            className={cn(
              "flex items-center gap-5 px-5 py-4",
              index > 0 && "border-t",
            )}
          >
            <div
              className={cn(
                "size-14 shrink-0 border-2 border-primary/40 bg-primary/10",
                step.className,
              )}
            />
            <div className="min-w-0 flex-1">
              <div className="font-mono text-xs font-medium">
                {step.className}
              </div>
              <div className="mt-0.5 font-mono text-[0.6875rem] text-muted-foreground">
                {step.token} = {step.formula}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
