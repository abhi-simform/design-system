import * as React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "cn"

import { Spinner } from "@/components/ui/spinner"

type StepperSize = "xs" | "sm" | "md" | "lg" | "xl"
type StepperRadius = "xs" | "sm" | "md" | "lg" | "xl"
type StepperOrientation = "horizontal" | "vertical"
type StepperIconPosition = "left" | "right"
type StepperLabelPosition = "right" | "bottom"
type StepperStepState = "stepInactive" | "stepProgress" | "stepCompleted"
type StepFragmentComponent = React.FC<{ step: number }>
type StepFragment = React.ReactNode | StepFragmentComponent

interface StepperContextValue {
  orientation: StepperOrientation
  labelPosition: StepperLabelPosition | undefined
  radius: StepperRadius
}

const StepperContext = React.createContext<StepperContextValue | null>(null)

function useStepperContext() {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error("Stepper.Step must be used within a Stepper.")
  }
  return context
}

const SIZE_CLASSES: Record<StepperSize, string> = {
  xs: "[--stepper-fz:var(--text-xs)] [--stepper-icon-size:--spacing(8.5)] [--stepper-spacing:--spacing(2.5)]",
  sm: "[--stepper-fz:var(--text-sm)] [--stepper-icon-size:--spacing(9)] [--stepper-spacing:--spacing(3)]",
  md: "[--stepper-fz:var(--text-base)] [--stepper-icon-size:--spacing(10.5)] [--stepper-spacing:--spacing(4)]",
  lg: "[--stepper-fz:var(--text-lg)] [--stepper-icon-size:--spacing(12)] [--stepper-spacing:--spacing(5)]",
  xl: "[--stepper-fz:var(--text-xl)] [--stepper-icon-size:--spacing(13)] [--stepper-spacing:--spacing(6)]",
}

const RADIUS_CLASSES: Record<StepperRadius, string> = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-lg",
  lg: "rounded-2xl",
  xl: "rounded-full",
}

const CONTENT_PADDING_CLASSES: Record<StepperSize, string> = {
  xs: "pt-2.5",
  sm: "pt-3",
  md: "pt-4",
  lg: "pt-5",
  xl: "pt-6",
}

function getStepFragment(fragment: StepFragment, step: number | undefined) {
  if (typeof fragment === "function") {
    const Fragment = fragment
    return <Fragment step={step ?? 0} />
  }
  return fragment
}

function toCssSize(value: number | string) {
  return typeof value === "number" ? `${value / 16}rem` : value
}

type StepperStepProps = Omit<React.ComponentProps<"button">, "children"> & {
  /** 0-based step index, set by Stepper */
  step?: number
  /** Step state, set by Stepper based on `active` */
  state?: StepperStepState
  /** Any valid CSS color, controlled by Stepper by default */
  color?: string
  /** When false, hides the step icon @default true */
  withIcon?: boolean
  icon?: StepFragment
  completedIcon?: StepFragment
  progressIcon?: StepFragment
  label?: StepFragment
  description?: StepFragment
  iconPosition?: StepperIconPosition
  /** Indicates loading state of the step */
  loading?: boolean
  /** Set to false to disable clicks on the step @default true */
  allowStepClick?: boolean
  /** Overrides Stepper's `allowNextStepsSelect` for this step */
  allowStepSelect?: boolean
  /** Content shown while this step is active */
  children?: React.ReactNode
}

function StepperStep({
  step,
  state,
  color,
  withIcon = true,
  icon,
  completedIcon,
  progressIcon,
  label,
  description,
  iconPosition = "left",
  loading,
  allowStepClick = true,
  allowStepSelect,
  children,
  className,
  style,
  ...props
}: StepperStepProps) {
  // Both are read by Stepper (selection rules, panel content), not rendered here.
  void allowStepSelect
  void children
  const { orientation, labelPosition, radius } = useStepperContext()
  const isCompleted = state === "stepCompleted"
  const isProgress = state === "stepProgress"
  const isVertical = orientation === "vertical"
  const isBottom = labelPosition === "bottom"
  const displayedIcon = isProgress ? (progressIcon ?? icon) : icon

  return (
    <button
      type="button"
      data-slot="stepper-step"
      data-orientation={orientation}
      data-icon-position={iconPosition}
      data-label-position={labelPosition}
      data-progress={isProgress || undefined}
      data-completed={isCompleted || undefined}
      data-allow-click={allowStepClick || undefined}
      aria-current={isProgress ? "step" : undefined}
      tabIndex={allowStepClick ? 0 : -1}
      className={cn(
        "group/step flex cursor-default text-start outline-none focus-visible:ring-3 focus-visible:ring-ring/50 data-allow-click:cursor-pointer",
        "[--step-color:var(--stepper-color)]",
        isBottom
          ? "max-w-[calc(var(--stepper-icon-size)*4)] min-w-(--stepper-icon-size) flex-col items-center overflow-visible"
          : iconPosition === "right"
            ? "flex-row-reverse"
            : "flex-row",
        isVertical
          ? "mt-(--separator-spacing) min-h-[calc(var(--stepper-icon-size)+--spacing(6)+var(--separator-spacing))] justify-start overflow-hidden [--separator-spacing:--spacing(1.25)] first-of-type:mt-0 last-of-type:min-h-0"
          : "items-center",
        className,
      )}
      style={
        color
          ? ({ "--step-color": color, ...style } as React.CSSProperties)
          : style
      }
      {...props}
    >
      {withIcon && (
        <span data-slot="stepper-step-wrapper" className="relative">
          <span
            data-slot="stepper-step-icon"
            className={cn(
              "relative flex size-(--stepper-icon-size) min-h-(--stepper-icon-size) min-w-(--stepper-icon-size) items-center justify-center border-2 border-(--stepper-outline-color) bg-(--stepper-outline-color) text-(length:--stepper-fz) font-bold text-muted-foreground transition-colors duration-150",
              RADIUS_CLASSES[radius],
              isProgress && "border-(--step-color)",
              isCompleted &&
                "border-(--step-color) bg-(--step-color) text-primary-foreground",
            )}
          >
            {isCompleted ? (
              <span
                data-slot="stepper-step-completed-icon"
                className="absolute inset-0 flex animate-in items-center justify-center text-primary-foreground duration-200 fade-in-0 zoom-in-50"
              >
                {loading ? (
                  <Spinner className="size-[calc(var(--stepper-icon-size)/2)]" />
                ) : (
                  (getStepFragment(completedIcon, step) ?? (
                    <CheckIcon className="size-3/5" />
                  ))
                )}
              </span>
            ) : (
              <span data-slot="stepper-step-icon-content" className="flex">
                {loading ? (
                  <Spinner className="size-[calc(var(--stepper-icon-size)/2)] text-(--step-color)" />
                ) : (
                  getStepFragment(displayedIcon, step)
                )}
              </span>
            )}
          </span>
          {isVertical && (
            <span
              data-slot="stepper-vertical-separator"
              data-active={isCompleted || undefined}
              className="absolute inset-s-[calc(var(--stepper-icon-size)/2)] top-[calc(var(--stepper-icon-size)+var(--separator-spacing))] h-screen border-s-2 border-(--stepper-outline-color) group-last-of-type/step:hidden data-active:border-(--stepper-color)"
            />
          )}
        </span>
      )}
      {(label || description) && (
        <span
          data-slot="stepper-step-body"
          className={cn(
            "flex flex-col",
            isBottom
              ? "mt-1.25 items-center text-center"
              : iconPosition === "right"
                ? "me-3 text-end"
                : "ms-3",
          )}
        >
          {label && (
            <span
              data-slot="stepper-step-label"
              className="text-(length:--stepper-fz) leading-none font-medium"
            >
              {getStepFragment(label, step)}
            </span>
          )}
          {description && (
            <span
              data-slot="stepper-step-description"
              className="my-[calc(var(--stepper-spacing)/3)] text-[calc(var(--stepper-fz)-0.125rem)] leading-none text-muted-foreground"
            >
              {getStepFragment(description, step)}
            </span>
          )}
        </span>
      )}
    </button>
  )
}

type StepperCompletedProps = { children?: React.ReactNode }

// Marker: Stepper reads its children as the "all steps done" content.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function StepperCompleted(_props: StepperCompletedProps) {
  return null
}

type StepperProps = Omit<React.ComponentProps<"div">, "color"> & {
  /** `Stepper.Step` and `Stepper.Completed` elements */
  children: React.ReactNode
  /** Called with the 0-based index of a clickable step; not called for the active step */
  onStepClick?: (stepIndex: number) => void
  /** Index of the active step */
  active: number
  /** Default step icon @default step index + 1 */
  icon?: StepFragment
  /** Icon of completed steps @default a check mark */
  completedIcon?: StepFragment
  /** Icon of the in-progress step @default step index + 1 */
  progressIcon?: StepFragment
  /** Any valid CSS color for active and completed steps. Defaults to the primary color. */
  color?: string
  /** Icon size as a number (px) or CSS length; overrides the size-based default */
  iconSize?: number | string
  /** Padding above the content @default "md" */
  contentPadding?: StepperSize
  /** @default "horizontal" */
  orientation?: StepperOrientation
  /** Ignored when `labelPosition="bottom"` @default "left" */
  iconPosition?: StepperIconPosition
  /** @default "md" */
  size?: StepperSize
  /** @default "xl" */
  radius?: StepperRadius
  /** When false, only completed steps can be selected @default true */
  allowNextStepsSelect?: boolean
  /** Wrap steps onto the next line when out of space @default true */
  wrap?: boolean
  /** Ignored when `orientation="vertical"` @default "right" */
  labelPosition?: StepperLabelPosition
  /** Keep all step content mounted, hiding inactive content with `Activity` @default false */
  keepMounted?: boolean
}

function Stepper({
  children,
  onStepClick,
  active,
  icon,
  completedIcon,
  progressIcon,
  color,
  iconSize,
  contentPadding = "md",
  orientation = "horizontal",
  iconPosition = "left",
  size = "md",
  radius = "xl",
  allowNextStepsSelect = true,
  wrap = true,
  labelPosition = "right",
  keepMounted = false,
  className,
  style,
  ...props
}: StepperProps) {
  const all = React.Children.toArray(
    children,
  ) as React.ReactElement<StepperStepProps>[]
  const steps = all.filter((child) => child.type !== StepperCompleted)
  const completed = all.find((child) => child.type === StepperCompleted) as
    React.ReactElement<StepperCompletedProps> | undefined
  const effectiveLabelPosition =
    orientation === "vertical" ? undefined : labelPosition
  const isVertical = orientation === "vertical"
  const isDone = active > steps.length - 1

  const items: React.ReactNode[] = []
  steps.forEach((item, index) => {
    const state: StepperStepState =
      active === index
        ? "stepProgress"
        : active > index
          ? "stepCompleted"
          : "stepInactive"
    const selectable =
      typeof onStepClick !== "function"
        ? false
        : typeof item.props.allowStepSelect === "boolean"
          ? item.props.allowStepSelect
          : state === "stepCompleted" || allowNextStepsSelect

    items.push(
      React.cloneElement(item, {
        key: index,
        step: index,
        state,
        icon: item.props.icon || icon || index + 1,
        completedIcon: item.props.completedIcon || completedIcon,
        progressIcon: item.props.progressIcon || progressIcon,
        color: item.props.color || color,
        iconPosition: item.props.iconPosition || iconPosition,
        allowStepClick: selectable,
        onClick: () => selectable && onStepClick?.(index),
      }),
    )

    if (!isVertical && index !== steps.length - 1) {
      items.push(
        <div
          key={`separator-${index}`}
          data-slot="stepper-separator"
          data-active={index < active || undefined}
          className={cn(
            "mx-4 h-0.5 flex-1 bg-(--stepper-outline-color) transition-colors duration-150 data-active:bg-(--stepper-color)",
            effectiveLabelPosition === "bottom" &&
              "mt-[calc((var(--stepper-icon-size)-0.125rem)/2)]",
          )}
        />,
      )
    }
  })

  const contentClass = cn(
    "stepper-content",
    CONTENT_PADDING_CLASSES[contentPadding],
  )
  const activeContent = steps[active]?.props.children
  const completedContent = completed?.props.children

  const contentSection = keepMounted ? (
    <>
      {steps.map((child, index) => (
        <React.Activity
          key={index}
          mode={active === index ? "visible" : "hidden"}
        >
          <div data-slot="stepper-content" className={contentClass}>
            {child.props.children}
          </div>
        </React.Activity>
      ))}
      {completed && (
        <React.Activity mode={isDone ? "visible" : "hidden"}>
          <div data-slot="stepper-content" className={contentClass}>
            {completedContent}
          </div>
        </React.Activity>
      )}
    </>
  ) : (
    (isDone ? completedContent : activeContent) && (
      <div data-slot="stepper-content" className={contentClass}>
        {isDone ? completedContent : activeContent}
      </div>
    )
  )

  return (
    <StepperContext.Provider
      value={{ orientation, labelPosition: effectiveLabelPosition, radius }}
    >
      <div
        data-slot="stepper"
        className={cn(
          "[--stepper-color:var(--primary)] [--stepper-outline-color:var(--muted)]",
          SIZE_CLASSES[size],
          className,
        )}
        style={
          color || iconSize !== undefined
            ? ({
                ...(color && { "--stepper-color": color }),
                ...(iconSize !== undefined && {
                  "--stepper-icon-size": toCssSize(iconSize),
                }),
                ...style,
              } as React.CSSProperties)
            : style
        }
        {...props}
      >
        <div
          data-slot="stepper-steps"
          data-orientation={orientation}
          data-icon-position={iconPosition}
          data-label-position={effectiveLabelPosition}
          className={cn(
            "flex",
            isVertical
              ? cn(
                  "flex-col",
                  iconPosition === "right" ? "items-end" : "items-start",
                )
              : cn(
                  "flex-row",
                  effectiveLabelPosition === "bottom"
                    ? "items-start"
                    : "items-center",
                  wrap ? "flex-wrap gap-y-4" : "flex-nowrap",
                ),
          )}
        >
          {items}
        </div>
        {contentSection}
      </div>
    </StepperContext.Provider>
  )
}

const StepperWithSubcomponents = Object.assign(Stepper, {
  Step: StepperStep,
  Completed: StepperCompleted,
})

export { StepperWithSubcomponents as Stepper, StepperStep, StepperCompleted }
export type {
  StepFragmentComponent,
  StepperCompletedProps,
  StepperIconPosition,
  StepperLabelPosition,
  StepperOrientation,
  StepperProps,
  StepperRadius,
  StepperSize,
  StepperStepProps,
  StepperStepState,
}
