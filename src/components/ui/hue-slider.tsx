import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cn } from "cn"

type HueSliderSize = "xs" | "sm" | "md" | "lg" | "xl"

const TRACK_SIZE_CLASSES: Record<HueSliderSize, string> = {
  xs: "h-2",
  sm: "h-3",
  md: "h-4",
  lg: "h-5",
  xl: "h-6",
}

const THUMB_SIZE_CLASSES: Record<HueSliderSize, string> = {
  xs: "size-2",
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
}

interface HueSliderProps extends Omit<
  SliderPrimitive.Root.Props<number>,
  "min" | "max" | "orientation"
> {
  size?: HueSliderSize
}

function HueSlider({
  className,
  defaultValue,
  value,
  size = "md",
  onValueChange,
  ...props
}: HueSliderProps) {
  // Tracked only so the thumb can preview the live hue as a fill color —
  // the gradient track itself is static and needs no state.
  const [internalValue, setInternalValue] = React.useState(
    value ?? defaultValue ?? 0,
  )
  const currentValue = value ?? internalValue

  return (
    <SliderPrimitive.Root
      className={cn("w-full", className)}
      data-slot="hue-slider"
      defaultValue={defaultValue}
      value={value}
      min={0}
      max={360}
      thumbAlignment="edge"
      onValueChange={(next, eventDetails) => {
        setInternalValue(next)
        onValueChange?.(next, eventDetails)
      }}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50">
        <SliderPrimitive.Track
          data-slot="hue-slider-track"
          className={cn(
            "relative grow overflow-hidden rounded-full select-none",
            "bg-[linear-gradient(to_right,hsl(0_100%_50%),hsl(60_100%_50%),hsl(120_100%_50%),hsl(170_100%_50%),hsl(240_100%_50%),hsl(300_100%_50%),hsl(360_100%_50%))]",
            "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1),inset_0_0_4px_rgba(0,0,0,0.15)]",
            TRACK_SIZE_CLASSES[size],
          )}
        />
        <SliderPrimitive.Thumb
          data-slot="hue-slider-thumb"
          className={cn(
            "relative block shrink-0 rounded-full border-2 border-white shadow-[0_0_1px_rgba(0,0,0,0.6)] ring-ring/50 transition-shadow select-none focus-visible:ring-3 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
            THUMB_SIZE_CLASSES[size],
          )}
          style={{ backgroundColor: `hsl(${currentValue} 100% 50%)` }}
        />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { HueSlider }
export type { HueSliderProps, HueSliderSize }
