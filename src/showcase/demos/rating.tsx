import * as React from "react"
import { HeartIcon, SmileIcon } from "lucide-react"

import {
  Rating,
  type RatingColor,
  type RatingSize,
} from "@/components/ui/rating"

export function RatingPlayground({
  count,
  fractions,
  size,
  color,
  readOnly,
  highlightSelectedOnly,
  allowClear,
}: {
  count: number
  fractions: number
  size: RatingSize
  color: RatingColor
  readOnly: boolean
  highlightSelectedOnly: boolean
  allowClear: boolean
}) {
  return (
    <Rating
      defaultValue={3}
      count={count}
      fractions={fractions}
      size={size}
      color={color}
      readOnly={readOnly}
      highlightSelectedOnly={highlightSelectedOnly}
      allowClear={allowClear}
    />
  )
}

export function RatingControlled() {
  const [value, setValue] = React.useState(2)
  const [hover, setHover] = React.useState(-1)

  return (
    <div className="flex flex-col items-center gap-2">
      <Rating value={value} onChange={setValue} onHover={setHover} />
      <p className="text-sm text-muted-foreground">
        Value: {value} · Hover: {hover === -1 ? "none" : hover}
      </p>
    </div>
  )
}

export function RatingFractions() {
  const [value, setValue] = React.useState(2.75)

  return (
    <div className="flex flex-col items-center gap-2">
      <Rating fractions={4} value={value} onChange={setValue} size="lg" />
      <p className="text-sm text-muted-foreground">Value: {value}</p>
    </div>
  )
}

export function RatingReadOnly() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating readOnly value={3.5} fractions={2} />
      <Rating readOnly value={4.25} fractions={4} color="orange" />
    </div>
  )
}

export function RatingCustomSymbols() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating
        defaultValue={2}
        color="red"
        emptySymbol={<HeartIcon className="size-5 text-muted-foreground/40" />}
        fullSymbol={<HeartIcon className="size-5 fill-red text-red" />}
      />
      <Rating
        defaultValue={3}
        count={5}
        emptySymbol={() => (
          <SmileIcon className="size-6 text-muted-foreground/40" />
        )}
        fullSymbol={(value) => (
          <SmileIcon
            className={
              value < 3
                ? "size-6 text-red"
                : value < 5
                  ? "size-6 text-orange"
                  : "size-6 text-green"
            }
          />
        )}
      />
    </div>
  )
}

export function RatingHighlightSelectedOnly() {
  return (
    <Rating
      defaultValue={3}
      highlightSelectedOnly
      emptySymbol={(value) => (
        <span className="flex size-8 items-center justify-center rounded-full bg-muted text-sm">
          {value}
        </span>
      )}
      fullSymbol={(value) => (
        <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
          {value}
        </span>
      )}
    />
  )
}

export function RatingSizesAndColors() {
  const sizes: RatingSize[] = ["xs", "sm", "md", "lg", "xl"]

  return (
    <div className="flex flex-col items-center gap-2">
      {sizes.map((size) => (
        <Rating key={size} size={size} defaultValue={3} />
      ))}
    </div>
  )
}

export function RatingAllowClear() {
  return (
    <Rating allowClear defaultValue={3} getSymbolLabel={(v) => `${v} stars`} />
  )
}
