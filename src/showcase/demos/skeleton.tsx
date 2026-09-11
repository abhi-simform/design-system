import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonPlayground({
  width,
  height,
  rounded,
}: {
  width: number
  height: number
  rounded: "sm" | "md" | "lg" | "full"
}) {
  const ROUNDED_CLASS = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  } as const

  // Size is dynamic, so it goes through inline styles — a `w-[${n}px]` class
  // would be invisible to Tailwind's scanner.
  return (
    <Skeleton
      className={ROUNDED_CLASS[rounded]}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border p-4">
      <Skeleton className="h-32 w-full rounded-lg" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-2/5" />
      </div>
    </div>
  )
}

export function SkeletonList() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex items-center gap-3">
          <Skeleton className="size-8 shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <Skeleton className="h-3.5 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonText() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  )
}
