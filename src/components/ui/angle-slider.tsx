import * as React from "react"
import { cn } from "cn"

interface AngleSliderMark {
  value: number
  label?: string
}

interface AngleSliderProps extends Omit<
  React.ComponentProps<"div">,
  "onChange" | "defaultValue"
> {
  step?: number
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  onChangeEnd?: (value: number) => void
  onScrubStart?: () => void
  onScrubEnd?: () => void
  withLabel?: boolean
  marks?: AngleSliderMark[]
  size?: number
  thumbSize?: number
  formatLabel?: (value: number) => React.ReactNode
  disabled?: boolean
  restrictToMarks?: boolean
  hiddenInputProps?: React.ComponentProps<"input">
  name?: string
}

function getAngleFromPointer(
  clientX: number,
  clientY: number,
  element: HTMLElement,
) {
  const rect = element.getBoundingClientRect()
  const x = clientX - (rect.left + rect.width / 2)
  const y = clientY - (rect.top + rect.height / 2)
  const degrees = (Math.atan2(x, y) * 180) / Math.PI + 180
  return 360 - degrees
}

// Mirrors Mantine's own rounding: snap to the nearest multiple of `step`,
// wrapping 360 back to 0, at the same decimal precision as `step` itself.
function normalizeAngle(degree: number, step: number) {
  const clamped = Math.min(Math.max(degree, 0), 360)
  const high = Math.ceil(clamped / step)
  const low = Math.round(clamped / step)
  const raw =
    high >= clamped / step
      ? high * step === 360
        ? 0
        : high * step
      : low * step
  const decimals = step.toString().split(".")[1]?.length ?? 0
  return Number(raw.toFixed(decimals))
}

function findClosestMarkValue(value: number, values: number[]) {
  return values.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
  )
}

function AngleSlider({
  className,
  style,
  step = 1,
  value,
  defaultValue = 0,
  onChange,
  onChangeEnd,
  onScrubStart,
  onScrubEnd,
  withLabel = true,
  marks,
  size = 60,
  thumbSize,
  formatLabel,
  disabled,
  restrictToMarks,
  hiddenInputProps,
  name,
  "aria-label": ariaLabel,
  tabIndex,
  ...props
}: AngleSliderProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = value ?? internalValue
  const resolvedThumbSize = thumbSize ?? size / 5
  const markValues = marks?.map((mark) => mark.value)

  // Pointer listeners are attached once and read fresh prop values from here,
  // so drags stay correct across prop changes without re-attaching listeners.
  const latestRef = React.useRef({
    value,
    step,
    disabled,
    restrictToMarks,
    markValues,
    onChange,
    onChangeEnd,
    onScrubStart,
    onScrubEnd,
  })
  React.useEffect(() => {
    latestRef.current = {
      value,
      step,
      disabled,
      restrictToMarks,
      markValues,
      onChange,
      onChangeEnd,
      onScrubStart,
      onScrubEnd,
    }
  })

  React.useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const commit = (raw: number, done: boolean) => {
      const current = latestRef.current
      const next =
        current.restrictToMarks &&
        current.markValues &&
        current.markValues.length > 0
          ? findClosestMarkValue(raw, current.markValues)
          : raw

      if (current.value === undefined) setInternalValue(next)
      current.onChange?.(next)
      if (done) current.onChangeEnd?.(next)
    }

    const update = (clientX: number, clientY: number, done: boolean) => {
      const angle = getAngleFromPointer(clientX, clientY, node)
      commit(normalizeAngle(angle, latestRef.current.step || 1), done)
    }

    const handleMouseMove = (event: MouseEvent) =>
      update(event.clientX, event.clientY, false)
    const handleMouseUp = (event: MouseEvent) => {
      update(event.clientX, event.clientY, true)
      detach()
    }
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault()
      const touch = event.touches[0]
      if (touch) update(touch.clientX, touch.clientY, false)
    }
    const handleTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      if (touch) update(touch.clientX, touch.clientY, true)
      detach()
    }

    function attach() {
      latestRef.current.onScrubStart?.()
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      })
      document.addEventListener("touchend", handleTouchEnd)
    }

    function detach() {
      latestRef.current.onScrubEnd?.()
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }

    // Unlike Mantine's original (which still attaches listeners and fires
    // onScrubStart/onScrubEnd even while disabled), interaction is blocked
    // entirely here so nothing fires when the slider is disabled.
    const handleMouseDown = (event: MouseEvent) => {
      if (latestRef.current.disabled) return
      attach()
      update(event.clientX, event.clientY, false)
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (latestRef.current.disabled) return
      event.preventDefault()
      attach()
      const touch = event.touches[0]
      if (touch) update(touch.clientX, touch.clientY, false)
    }

    node.addEventListener("mousedown", handleMouseDown)
    node.addEventListener("touchstart", handleTouchStart, { passive: false })

    return () => {
      node.removeEventListener("mousedown", handleMouseDown)
      node.removeEventListener("touchstart", handleTouchStart)
      detach()
    }
  }, [])

  const handleThumbKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return

    let nextValue = currentValue

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault()
      nextValue =
        currentValue === 0 ? 359 : normalizeAngle(currentValue - step, step)
    }

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault()
      nextValue =
        currentValue === 359 ? 0 : normalizeAngle(currentValue + step, step)
    }

    if (event.key === "Home") {
      nextValue = 0
    }

    if (event.key === "End") {
      nextValue = 359
    }

    if (restrictToMarks && markValues && markValues.length > 0) {
      const currentIndex = markValues.indexOf(currentValue)

      if (currentIndex !== -1) {
        if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
          nextValue =
            markValues[
              currentIndex === 0 ? markValues.length - 1 : currentIndex - 1
            ]
        } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
          nextValue =
            markValues[
              currentIndex === markValues.length - 1 ? 0 : currentIndex + 1
            ]
        } else {
          nextValue = findClosestMarkValue(nextValue, markValues)
        }
      } else {
        nextValue = findClosestMarkValue(nextValue, markValues)
      }
    }

    if (value === undefined) setInternalValue(nextValue)
    onChange?.(nextValue)
    onChangeEnd?.(nextValue)
  }

  return (
    <div
      ref={rootRef}
      data-slot="angle-slider"
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "relative flex shrink-0 touch-none items-center justify-center rounded-full bg-muted select-none",
        "focus-within:ring-2 focus-within:ring-ring/50 focus-within:ring-offset-2 focus-within:ring-offset-background",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      {marks && marks.length > 0 && (
        <div
          data-slot="angle-slider-marks"
          className="pointer-events-none absolute inset-px rounded-full"
        >
          {marks.map((mark, index) => (
            <div
              key={index}
              data-slot="angle-slider-mark"
              className="absolute inset-y-0 w-[2px]"
              style={{
                left: "calc(50% - 1px)",
                transform: `rotate(${mark.value}deg)`,
              }}
            >
              <span
                className="absolute w-px bg-muted-foreground/60"
                style={{
                  left: "0.5px",
                  top: resolvedThumbSize / 3,
                  height: resolvedThumbSize / 1.5,
                  transform: "translate(-50%, -50%)",
                }}
              />
              {mark.label && (
                <span
                  className="absolute min-w-[18px] text-center text-xs text-muted-foreground"
                  style={{
                    top: "-24px",
                    left: "-7px",
                    transform: `rotate(${360 - mark.value}deg)`,
                  }}
                >
                  {mark.label}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {withLabel && (
        <div
          data-slot="angle-slider-label"
          className="pointer-events-none text-xs select-none"
        >
          {typeof formatLabel === "function"
            ? formatLabel(currentValue)
            : currentValue}
        </div>
      )}

      <div
        data-slot="angle-slider-thumb"
        role="slider"
        tabIndex={tabIndex ?? (disabled ? -1 : 0)}
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={currentValue}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        onKeyDown={handleThumbKeyDown}
        className="pointer-events-none absolute inset-y-0 w-[3px] outline-none"
        style={{
          left: "calc(50% - 1.5px)",
          transform: `rotate(${currentValue}deg)`,
        }}
      >
        <span
          className="absolute top-0 right-0 w-[3px] bg-foreground"
          style={{ height: Math.min(resolvedThumbSize, size / 2) }}
        />
      </div>

      <input
        type="hidden"
        name={name}
        value={currentValue}
        {...hiddenInputProps}
      />
    </div>
  )
}

export { AngleSlider }
export type { AngleSliderProps, AngleSliderMark }
