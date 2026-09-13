import { Image } from "@/components/ui/image"

const FITS = ["cover", "contain", "fill", "none", "scale-down"] as const
const RADII = ["none", "xs", "sm", "md", "lg", "xl"] as const

const DEMO_IMAGE = "https://picsum.photos/seed/image/800/400"
const BROKEN_IMAGE = "https://picsum.photos/seed/image/broken.jpg"
const FALLBACK_IMAGE = "https://picsum.photos/seed/image-fallback/800/400"

export function ImagePlayground({
  fit,
  radius,
}: {
  fit: (typeof FITS)[number]
  radius: (typeof RADII)[number]
}) {
  return (
    <Image
      src={DEMO_IMAGE}
      fit={fit}
      radius={radius}
      alt="Sample landscape"
      className="h-48"
    />
  )
}

export function ImageRadii() {
  return (
    <div className="flex flex-wrap gap-4">
      {RADII.map((radius) => (
        <div key={radius} className="flex flex-col items-center gap-2">
          <Image
            src={DEMO_IMAGE}
            radius={radius}
            alt={`radius="${radius}"`}
            className="h-24 w-32"
          />
          <span className="font-mono text-xs text-muted-foreground">{`radius="${radius}"`}</span>
        </div>
      ))}
    </div>
  )
}

export function ImageFitVariants() {
  return (
    <div className="flex flex-wrap gap-4">
      {FITS.map((fit) => (
        <div key={fit} className="flex flex-col items-center gap-2">
          <Image
            src={DEMO_IMAGE}
            fit={fit}
            alt={`fit="${fit}"`}
            className="h-32 w-24 bg-muted"
          />
          <span className="font-mono text-xs text-muted-foreground">{`fit="${fit}"`}</span>
        </div>
      ))}
    </div>
  )
}

export function ImageWithFallback() {
  return (
    <Image
      src={BROKEN_IMAGE}
      fallbackSrc={FALLBACK_IMAGE}
      radius="md"
      alt="Falls back when the source fails to load"
      className="h-48"
    />
  )
}
