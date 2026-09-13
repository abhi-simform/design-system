import { BackgroundImage } from "@/components/ui/background-image"
import { Center } from "@/components/ui/center"

const RADII = ["none", "xs", "sm", "md", "lg", "xl"] as const

const DEMO_IMAGE = "https://picsum.photos/seed/background-image/800/400"

export function BackgroundImagePlayground({
  radius,
}: {
  radius: (typeof RADII)[number]
}) {
  return (
    <BackgroundImage src={DEMO_IMAGE} radius={radius} className="h-48">
      <Center className="h-full">
        <p className="rounded bg-black/50 px-3 py-1 text-sm text-white">
          Content layered on top of the image
        </p>
      </Center>
    </BackgroundImage>
  )
}

export function BackgroundImageWithContent() {
  return (
    <BackgroundImage src={DEMO_IMAGE} radius="md" className="h-48">
      <Center className="h-full">
        <p className="rounded bg-black/50 px-3 py-1 text-sm text-white">
          BackgroundImage can hold any content
        </p>
      </Center>
    </BackgroundImage>
  )
}

export function BackgroundImageRadii() {
  return (
    <div className="flex flex-wrap gap-4">
      {RADII.map((radius) => (
        <BackgroundImage
          key={radius}
          src={DEMO_IMAGE}
          radius={radius}
          className="h-24 w-32"
        >
          <Center className="h-full">
            <span className="rounded bg-black/50 px-2 py-0.5 font-mono text-xs text-white">{`radius="${radius}"`}</span>
          </Center>
        </BackgroundImage>
      ))}
    </div>
  )
}

export function BackgroundImageAsButton() {
  return (
    <BackgroundImage
      src={DEMO_IMAGE}
      radius="md"
      render={<button type="button" />}
      className="h-32 w-full cursor-pointer"
    >
      <Center className="h-full">
        <span className="rounded bg-black/50 px-3 py-1 text-sm text-white">
          Rendered as a button
        </span>
      </Center>
    </BackgroundImage>
  )
}
