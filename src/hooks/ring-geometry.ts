export type CurveData = {
  value: number
  color: string
  tooltip?: React.ReactNode
} & Omit<React.ComponentProps<"circle">, "color">

type RootCurveData = {
  value?: undefined
  color?: string
  tooltip?: undefined
} & Omit<React.ComponentProps<"circle">, "color">

export type Curve = {
  sum: number
  offset: number
  root: boolean
  data: CurveData | RootCurveData
  lineRoundCaps?: boolean
}

export function getClampedThickness(thickness: number, size: number) {
  return Math.min(thickness || 12, (size || 120) / 4)
}

export function getCurves({
  size,
  thickness,
  sections,
  renderRoundedLineCaps,
  rootColor,
  sectionGap = 0,
}: {
  size: number
  thickness: number
  sections: CurveData[]
  renderRoundedLineCaps: boolean | undefined
  rootColor?: string
  sectionGap?: number
}) {
  const sum = sections.reduce((acc, current) => acc + current.value, 0)
  const accumulated = Math.PI * ((size * 0.9 - thickness * 2) / 2) * 2
  let offset = accumulated
  const curves: Curve[] = []
  const curvesInOrder: Curve[] = []

  const gapPercentage = (sectionGap / 360) * 100

  for (let i = 0; i < sections.length; i += 1) {
    const adjustedValue = Math.max(0, sections[i].value - gapPercentage)
    curves.push({
      sum,
      offset,
      data: { ...sections[i], value: adjustedValue },
      root: false,
    })
    offset -= (sections[i].value / 100) * accumulated
  }

  curves.push({ sum, offset, data: { color: rootColor }, root: true })

  curvesInOrder.push({ ...curves[curves.length - 1], lineRoundCaps: false })
  if (curves.length > 2) {
    curvesInOrder.push({ ...curves[0], lineRoundCaps: renderRoundedLineCaps })
    curvesInOrder.push({
      ...curves[curves.length - 2],
      lineRoundCaps: renderRoundedLineCaps,
    })
    for (let i = 1; i <= curves.length - 3; i += 1) {
      curvesInOrder.push({ ...curves[i], lineRoundCaps: false })
    }
  } else {
    curvesInOrder.push({ ...curves[0], lineRoundCaps: renderRoundedLineCaps })
  }

  return curvesInOrder
}

export function getCurveProps({
  size,
  thickness,
  sum,
  value,
  root,
  offset,
}: {
  size: number
  thickness: number
  sum: number
  value: number | undefined
  root: boolean | undefined
  offset: number
}) {
  const radius = (size * 0.9 - thickness * 2) / 2
  const deg = (Math.PI * radius * 2) / 100

  const strokeDasharray =
    root || value === undefined
      ? `${(100 - sum) * deg}, ${sum * deg}`
      : `${value * deg}, ${(100 - value) * deg}`

  return {
    strokeWidth: Number.isNaN(thickness) ? 12 : thickness,
    cx: size / 2 || 0,
    cy: size / 2 || 0,
    r: radius || 0,
    transform: root ? `scale(1, -1) translate(0, -${size})` : undefined,
    strokeDasharray,
    strokeDashoffset: root ? 0 : offset || 0,
  }
}
