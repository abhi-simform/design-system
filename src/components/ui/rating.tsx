import * as React from "react"
import { cn } from "cn"

import { useDirection } from "@/components/ui/direction"

type RatingSize = "xs" | "sm" | "md" | "lg" | "xl"
type RatingColor =
  | "primary"
  | "destructive"
  | "pink"
  | "red"
  | "yellow"
  | "orange"
  | "cyan"
  | "green"
  | "blue"
  | "purple"
  | "geekblue"
  | "magenta"
  | "volcano"
  | "gold"
  | "lime"

type RatingSymbol = React.ReactNode | ((value: number) => React.ReactNode)

const SIZE_CLASSES: Record<RatingSize, string> = {
  xs: "size-3.5",
  sm: "size-4.5",
  md: "size-5",
  lg: "size-7",
  xl: "size-8",
}

const COLOR_CLASSES: Record<RatingColor, string> = {
  primary: "[--rating-color:var(--color-primary)]",
  destructive: "[--rating-color:var(--color-destructive)]",
  pink: "[--rating-color:var(--color-pink)]",
  red: "[--rating-color:var(--color-red)]",
  yellow: "[--rating-color:var(--color-yellow)]",
  orange: "[--rating-color:var(--color-orange)]",
  cyan: "[--rating-color:var(--color-cyan)]",
  green: "[--rating-color:var(--color-green)]",
  blue: "[--rating-color:var(--color-blue)]",
  purple: "[--rating-color:var(--color-purple)]",
  geekblue: "[--rating-color:var(--color-geekblue)]",
  magenta: "[--rating-color:var(--color-magenta)]",
  volcano: "[--rating-color:var(--color-volcano)]",
  gold: "[--rating-color:var(--color-gold)]",
  lime: "[--rating-color:var(--color-lime)]",
}

const TOUCH_MOVE_THRESHOLD = 10
const EMULATED_CLICK_TIMEOUT = 500

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function roundValueTo(value: number, to: number) {
  const rounded = Math.round(value / to) * to
  const precision = `${to}`.split(".")[1]?.length || 0
  return Number(rounded.toFixed(precision))
}

function StarSymbol({
  filled,
  sizeClassName,
}: {
  filled: boolean
  sizeClassName: string
}) {
  return (
    <svg
      data-slot="rating-star"
      data-filled={filled || undefined}
      viewBox="0 0 24 24"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "block fill-muted-foreground/25 stroke-muted-foreground/25 data-filled:fill-(--rating-color) data-filled:stroke-(--rating-color)",
        sizeClassName,
      )}
    >
      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
    </svg>
  )
}

type RatingItemProps = {
  getSymbolLabel: (value: number) => string
  emptySymbol?: RatingSymbol
  fullSymbol?: RatingSymbol
  sizeClassName: string
  full: boolean
  active: boolean
  checked: boolean
  readOnly?: boolean
  fractionValue: number
  value: number
  id: string
  name: string
  onBlur: () => void
  onChange: (value: number) => void
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function RatingItem({
  getSymbolLabel,
  emptySymbol,
  fullSymbol,
  sizeClassName,
  full,
  active,
  checked,
  readOnly,
  fractionValue,
  value,
  id,
  name,
  onBlur,
  onChange,
  onInputChange,
}: RatingItemProps) {
  const direction = useDirection()
  const full_ =
    typeof fullSymbol === "function" ? fullSymbol(value) : fullSymbol
  const empty_ =
    typeof emptySymbol === "function" ? emptySymbol(value) : emptySymbol
  const isWhole = fractionValue === 1
  const clip = active ? 100 - fractionValue * 100 : 100

  const labelProps = {
    "data-slot": "rating-label",
    "data-read-only": readOnly || undefined,
    className: cn(
      "absolute top-0 left-0 block cursor-pointer outline-ring [-webkit-tap-highlight-color:transparent] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 last-of-type:relative data-read-only:cursor-default",
      !isWhole && (active ? "z-2" : "z-0"),
    ),
  }

  const body = (
    <div
      data-slot="rating-symbol"
      style={
        isWhole
          ? undefined
          : {
              clipPath:
                direction === "rtl"
                  ? `inset(0 0 0 ${clip}%)`
                  : `inset(0 ${clip}% 0 0)`,
            }
      }
    >
      {full
        ? (full_ ?? <StarSymbol filled sizeClassName={sizeClassName} />)
        : (empty_ ?? (
            <StarSymbol filled={false} sizeClassName={sizeClassName} />
          ))}
    </div>
  )

  return (
    <>
      {!readOnly && (
        <input
          data-slot="rating-input"
          data-active={active || undefined}
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          aria-label={getSymbolLabel(value)}
          className="peer pointer-events-none absolute size-0 overflow-hidden whitespace-nowrap opacity-0 [-webkit-tap-highlight-color:transparent]"
          onKeyDown={(event) => {
            if (event.key === " " || event.key === "Enter") {
              onChange(value)
            }
          }}
          onBlur={onBlur}
          onChange={onInputChange}
        />
      )}
      {readOnly ? (
        <div {...labelProps}>{body}</div>
      ) : (
        <label {...labelProps} htmlFor={id} onClick={() => onChange(value)}>
          {body}
        </label>
      )}
    </>
  )
}

type RatingProps = Omit<
  React.ComponentProps<"div">,
  "onChange" | "defaultValue" | "color"
> & {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  emptySymbol?: RatingSymbol
  fullSymbol?: RatingSymbol
  fractions?: number
  size?: RatingSize
  count?: number
  onHover?: (value: number) => void
  getSymbolLabel?: (index: number) => string
  name?: string
  readOnly?: boolean
  allowClear?: boolean
  highlightSelectedOnly?: boolean
  color?: RatingColor
}

const defaultGetSymbolLabel = (value: number) => `${value}`

function Rating({
  className,
  name,
  id,
  value,
  defaultValue,
  onChange,
  fractions = 1,
  count = 5,
  onMouseEnter,
  readOnly,
  allowClear,
  onMouseMove,
  onHover,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchCancel,
  onTouchEnd,
  size = "sm",
  getSymbolLabel = defaultGetSymbolLabel,
  color = "yellow",
  emptySymbol,
  fullSymbol,
  highlightSelectedOnly,
  ref,
  ...props
}: RatingProps) {
  const direction = useDirection()
  const generatedName = React.useId()
  const generatedId = React.useId()
  const _name = name ?? generatedName
  const _id = id ?? generatedId
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const touchStartPosition = React.useRef<{ x: number; y: number } | null>(null)
  const lastTouchTimestamp = React.useRef(0)

  const [internalValue, setInternalValue] = React.useState(defaultValue ?? 0)
  const isControlled = value !== undefined
  const _value = isControlled ? value : internalValue

  const setValue = (next: number) => {
    if (!isControlled) {
      setInternalValue(next)
    }
    if (next !== _value) {
      onChange?.(next)
    }
  }

  const [hovered, setHovered] = React.useState(-1)
  const [isOutside, setOutside] = React.useState(true)

  const _fractions = Math.floor(fractions)
  const _count = Math.floor(count)
  const decimalUnit = 1 / _fractions
  const stableValueRounded = roundValueTo(_value, decimalUnit)
  const finalValue = hovered !== -1 ? hovered : stableValueRounded
  const sizeClassName = SIZE_CLASSES[size]

  const setRefs = (node: HTMLDivElement | null) => {
    rootRef.current = node
    if (typeof ref === "function") {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }

  const getRatingFromCoordinates = (x: number) => {
    if (!rootRef.current) {
      return 0
    }

    const { left, right, width } = rootRef.current.getBoundingClientRect()
    const symbolWidth = width / _count
    const hoverPosition = direction === "rtl" ? right - x : x - left
    const hoverValue = hoverPosition / symbolWidth

    return clamp(
      roundValueTo(hoverValue + decimalUnit / 2, decimalUnit),
      decimalUnit,
      _count,
    )
  }

  const applyValue = (newValue: number) => {
    if (allowClear && newValue === stableValueRounded) {
      setValue(0)
    } else {
      setValue(newValue)
    }
  }

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(event)
    if (!readOnly) {
      setOutside(false)
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(event)
    if (readOnly) {
      return
    }

    const rounded = getRatingFromCoordinates(event.clientX)
    setHovered(rounded)
    if (rounded !== hovered) {
      onHover?.(rounded)
    }
  }

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(event)
    if (readOnly) {
      return
    }

    setHovered(-1)
    setOutside(true)
    if (hovered !== -1) {
      onHover?.(-1)
    }
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const { touches } = event
    touchStartPosition.current =
      touches.length === 1
        ? { x: touches[0].clientX, y: touches[0].clientY }
        : null
    onTouchStart?.(event)
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartPosition.current
    const touch = event.touches[0]

    if (
      start &&
      touch &&
      Math.hypot(touch.clientX - start.x, touch.clientY - start.y) >
        TOUCH_MOVE_THRESHOLD
    ) {
      touchStartPosition.current = null
    }

    onTouchMove?.(event)
  }

  const handleTouchCancel = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartPosition.current = null
    onTouchCancel?.(event)
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartPosition.current
    const touch = event.changedTouches[0]
    touchStartPosition.current = null

    if (start && touch && !readOnly) {
      if (event.cancelable) {
        event.preventDefault()
      }
      applyValue(getRatingFromCoordinates(touch.clientX))
      lastTouchTimestamp.current = Date.now()
    }

    onTouchEnd?.(event)
  }

  const handleItemBlur = () => {
    if (isOutside) {
      setHovered(-1)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      setHovered(parseFloat(event.target.value))
    }
  }

  const handleChange = (next: number) => {
    if (
      readOnly ||
      Date.now() - lastTouchTimestamp.current < EMULATED_CLICK_TIMEOUT
    ) {
      return
    }
    applyValue(next)
  }

  const items = Array.from({ length: _count }, (_, index) => {
    const integerValue = index + 1
    const fractionItems = Array.from(
      { length: index === 0 ? _fractions + 1 : _fractions },
      (__, i) => i,
    )
    const isGroupActive = !readOnly && Math.ceil(hovered) === integerValue

    return (
      <div
        key={integerValue}
        data-slot="rating-group"
        data-active={isGroupActive || undefined}
        className="relative transition-transform duration-100 ease-in-out data-active:z-1 data-active:scale-110"
      >
        {fractionItems.map((fractionIndex) => {
          const fractionValue =
            decimalUnit * (index === 0 ? fractionIndex : fractionIndex + 1)
          const symbolValue = roundValueTo(
            integerValue - 1 + fractionValue,
            decimalUnit,
          )

          return (
            <RatingItem
              key={`${integerValue}-${symbolValue}`}
              getSymbolLabel={getSymbolLabel}
              emptySymbol={emptySymbol}
              fullSymbol={fullSymbol}
              sizeClassName={sizeClassName}
              full={
                highlightSelectedOnly
                  ? symbolValue === finalValue
                  : symbolValue <= finalValue
              }
              active={symbolValue === finalValue}
              checked={symbolValue === stableValueRounded}
              readOnly={readOnly}
              fractionValue={fractionValue}
              value={symbolValue}
              name={_name}
              onChange={handleChange}
              onBlur={handleItemBlur}
              onInputChange={handleInputChange}
              id={`${_id}-${index}-${fractionIndex}`}
            />
          )
        })}
      </div>
    )
  })

  return (
    <div
      data-slot="rating"
      ref={setRefs}
      id={_id}
      className={cn(
        "flex w-max has-disabled:pointer-events-none",
        COLOR_CLASSES[color],
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      {...props}
    >
      {items}
    </div>
  )
}

export { Rating }
export type { RatingColor, RatingProps, RatingSize, RatingSymbol }
