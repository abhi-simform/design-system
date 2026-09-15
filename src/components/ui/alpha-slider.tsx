import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cn } from "cn"

type AlphaSliderSize = "xs" | "sm" | "md" | "lg" | "xl"

const TRACK_SIZE_CLASSES: Record<AlphaSliderSize, string> = {
  xs: "h-2",
  sm: "h-3",
  md: "h-4",
  lg: "h-5",
  xl: "h-6",
}

const THUMB_SIZE_CLASSES: Record<AlphaSliderSize, string> = {
  xs: "size-2",
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
}

interface AlphaSliderProps extends Omit<
  SliderPrimitive.Root.Props<number>,
  "min" | "max" | "orientation"
> {
  size?: AlphaSliderSize
  color: string
}

function AlphaSlider({
  className,
  size = "md",
  color,
  step = 0.01,
  largeStep = 0.1,
  ...props
}: AlphaSliderProps) {
  return (
    <SliderPrimitive.Root
      className={cn("w-full", className)}
      data-slot="alpha-slider"
      min={0}
      max={1}
      step={step}
      largeStep={largeStep}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50">
        <SliderPrimitive.Track
          data-slot="alpha-slider-track"
          className={cn(
            "relative grow overflow-hidden rounded-full select-none",
            "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1),inset_0_0_4px_rgba(0,0,0,0.15)]",
            TRACK_SIZE_CLASSES[size],
          )}
        >
          <span aria-hidden="true" className="checkerboard absolute inset-0" />
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${color})`,
            }}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          data-slot="alpha-slider-thumb"
          className={cn(
            "relative block shrink-0 rounded-full border-2 border-white shadow-[0_0_1px_rgba(0,0,0,0.6)] ring-ring/50 transition-shadow select-none focus-visible:ring-3 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
            THUMB_SIZE_CLASSES[size],
          )}
        />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { AlphaSlider }
export type { AlphaSliderProps, AlphaSliderSize }
