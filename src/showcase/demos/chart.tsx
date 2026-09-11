import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
} from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { BROWSERS, MONTHLY } from "@/showcase/fixtures/chart-data"

// Colors MUST be var(--chart-n) rather than literal values, so charts follow
// the theme the same way every other component does.
const seriesConfig = {
  desktop: { label: "Desktop", color: "var(--chart-4)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

const browserConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig

const axisProps = {
  tickLine: false,
  axisLine: false,
  tickMargin: 8,
  tickFormatter: (value: string) => value.slice(0, 3),
} as const

export function ChartPlayground({
  indicator,
  hideLabel,
  showLegend,
}: {
  indicator: "dot" | "line" | "dashed"
  hideLabel: boolean
  showLegend: boolean
}) {
  return (
    // ChartContainer is aspect-video by default; an explicit height stops the
    // ResponsiveContainer from flashing at zero height inside a flex canvas.
    <ChartContainer config={seriesConfig} className="h-[260px] w-full">
      <BarChart data={[...MONTHLY]}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <ChartTooltip
          content={
            <ChartTooltipContent indicator={indicator} hideLabel={hideLabel} />
          }
        />
        {showLegend ? <ChartLegend content={<ChartLegendContent />} /> : null}
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export function ChartArea() {
  return (
    <ChartContainer config={seriesConfig} className="h-[260px] w-full">
      <AreaChart data={[...MONTHLY]}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="mobile"
          type="natural"
          stackId="a"
          fill="var(--color-mobile)"
          fillOpacity={0.4}
          stroke="var(--color-mobile)"
        />
        <Area
          dataKey="desktop"
          type="natural"
          stackId="a"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  )
}

export function ChartBar() {
  return (
    <ChartContainer config={seriesConfig} className="h-[260px] w-full">
      <BarChart data={[...MONTHLY]}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export function ChartLine() {
  return (
    <ChartContainer config={seriesConfig} className="h-[260px] w-full">
      <LineChart data={[...MONTHLY]}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
        <Line
          dataKey="desktop"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="mobile"
          type="monotone"
          stroke="var(--color-mobile)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

export function ChartPie() {
  return (
    <ChartContainer config={browserConfig} className="h-[260px] w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="browser" />} />
        <Pie data={[...BROWSERS]} dataKey="visitors" nameKey="browser">
          {BROWSERS.map((slice) => (
            <Cell key={slice.browser} fill={slice.fill} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
      </PieChart>
    </ChartContainer>
  )
}
