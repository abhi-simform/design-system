import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

const SLIDES = [1, 2, 3, 4, 5]

function Slide({ index }: { index: number }) {
  return (
    <Card className="aspect-square">
      <CardContent className="flex h-full items-center justify-center font-heading text-3xl font-medium">
        {index}
      </CardContent>
    </Card>
  )
}

export function CarouselPlayground({
  orientation,
  loop,
  perView,
}: {
  orientation: "horizontal" | "vertical"
  loop: boolean
  perView: "1" | "2"
}) {
  const BASIS_CLASS = {
    "1": "basis-full",
    "2": "basis-1/2",
  } as const

  return (
    <Carousel
      orientation={orientation}
      opts={{ loop }}
      className="w-full max-w-xs"
    >
      <CarouselContent
        className={orientation === "vertical" ? "h-56" : undefined}
      >
        {SLIDES.map((slide) => (
          <CarouselItem key={slide} className={BASIS_CLASS[perView]}>
            <Slide index={slide} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export function CarouselBasic() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {SLIDES.map((slide) => (
          <CarouselItem key={slide}>
            <Slide index={slide} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export function CarouselMultiple() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {SLIDES.map((slide) => (
          <CarouselItem key={slide} className="basis-1/2">
            <Slide index={slide} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export function CarouselVertical() {
  return (
    <Carousel orientation="vertical" className="w-full max-w-xs">
      {/* A vertical carousel has no intrinsic height — set one explicitly. */}
      <CarouselContent className="h-64">
        {SLIDES.map((slide) => (
          <CarouselItem key={slide}>
            <Slide index={slide} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export function CarouselWithCounter() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(1)

  React.useEffect(() => {
    if (!api) {
      return
    }

    const update = () => setCurrent(api.selectedScrollSnap() + 1)
    update()
    api.on("select", update)

    return () => {
      api.off("select", update)
    }
  }, [api])

  return (
    <div className="flex flex-col items-center gap-3">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {SLIDES.map((slide) => (
            <CarouselItem key={slide}>
              <Slide index={slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-sm text-muted-foreground tabular-nums">
        Slide {current} of {SLIDES.length}
      </div>
    </div>
  )
}
