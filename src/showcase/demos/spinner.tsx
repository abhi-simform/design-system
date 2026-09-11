import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerPlayground({ size }: { size: "sm" | "default" | "lg" }) {
  const SIZE_CLASS = {
    sm: "size-3",
    default: "size-4",
    lg: "size-6",
  } as const

  return <Spinner className={SIZE_CLASS[size]} />
}

export function SpinnerSizes() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  )
}

export function SpinnerInButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Saving
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" />
        Loading
      </Button>
      <Button size="icon" disabled aria-label="Loading">
        <Spinner />
      </Button>
    </div>
  )
}

export function SpinnerWithLabel() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner />
      Fetching deployments…
    </div>
  )
}
