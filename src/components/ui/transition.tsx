"use client"

import * as React from "react"
import { Activity } from "react"
import { flushSync } from "react-dom"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

type TransitionName =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "scale-y"
  | "scale-x"
  | "skew-up"
  | "skew-down"
  | "rotate-left"
  | "rotate-right"
  | "slide-down"
  | "slide-up"
  | "slide-left"
  | "slide-right"
  | "pop"
  | "pop-top-left"
  | "pop-top-right"
  | "pop-bottom-left"
  | "pop-bottom-right"

type TransitionStyles = {
  common?: React.CSSProperties
  in: React.CSSProperties
  out: React.CSSProperties
  transitionProperty: React.CSSProperties["transitionProperty"]
}

function popIn(
  from: "top" | "bottom",
): Pick<TransitionStyles, "in" | "out" | "transitionProperty"> {
  return {
    in: { opacity: 1, transform: "scale(1)" },
    out: {
      opacity: 0,
      transform: `scale(.9) translateY(${from === "bottom" ? 10 : -10}px)`,
    },
    transitionProperty: "transform, opacity",
  }
}

const TRANSITION_PRESETS: Record<TransitionName, TransitionStyles> = {
  fade: {
    in: { opacity: 1 },
    out: { opacity: 0 },
    transitionProperty: "opacity",
  },
  "fade-up": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(30px)" },
    transitionProperty: "opacity, transform",
  },
  "fade-down": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(-30px)" },
    transitionProperty: "opacity, transform",
  },
  "fade-left": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(30px)" },
    transitionProperty: "opacity, transform",
  },
  "fade-right": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-30px)" },
    transitionProperty: "opacity, transform",
  },
  scale: {
    in: { opacity: 1, transform: "scale(1)" },
    out: { opacity: 0, transform: "scale(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity",
  },
  "scale-y": {
    in: { opacity: 1, transform: "scaleY(1)" },
    out: { opacity: 0, transform: "scaleY(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity",
  },
  "scale-x": {
    in: { opacity: 1, transform: "scaleX(1)" },
    out: { opacity: 0, transform: "scaleX(0)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity",
  },
  "skew-up": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: "translateY(-20px) skew(-10deg, -5deg)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity",
  },
  "skew-down": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: "translateY(20px) skew(-10deg, -5deg)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity",
  },
  "rotate-left": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: "translateY(20px) rotate(-5deg)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity",
  },
  "rotate-right": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: "translateY(20px) rotate(5deg)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity",
  },
  "slide-down": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(-100%)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity",
  },
  "slide-up": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(100%)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity",
  },
  "slide-left": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(100%)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity",
  },
  "slide-right": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-100%)" },
    common: { transformOrigin: "right" },
    transitionProperty: "transform, opacity",
  },
  pop: {
    ...popIn("bottom"),
    common: { transformOrigin: "center center" },
  },
  "pop-bottom-left": {
    ...popIn("bottom"),
    common: { transformOrigin: "bottom left" },
  },
  "pop-bottom-right": {
    ...popIn("bottom"),
    common: { transformOrigin: "bottom right" },
  },
  "pop-top-left": {
    ...popIn("top"),
    common: { transformOrigin: "top left" },
  },
  "pop-top-right": {
    ...popIn("top"),
    common: { transformOrigin: "top right" },
  },
}

type TransitionStatus =
  "entered" | "exited" | "entering" | "exiting" | "pre-entering" | "pre-exiting"

type UseTransitionStateOptions = {
  mounted: boolean
  duration: number
  exitDuration: number
  enterDelay?: number
  exitDelay?: number
  onEnter?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExited?: () => void
}

function useTransitionState({
  mounted,
  duration,
  exitDuration,
  enterDelay,
  exitDelay,
  onEnter,
  onEntered,
  onExit,
  onExited,
}: UseTransitionStateOptions) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [status, setStatus] = React.useState<TransitionStatus>(
    mounted ? "entered" : "exited",
  )
  const isFirstRender = React.useRef(true)
  const rafRef = React.useRef(-1)
  const nestedRafRef = React.useRef(-1)
  const timeoutRef = React.useRef(-1)
  const delayTimeoutRef = React.useRef(-1)
  const callbacksRef = React.useRef({ onEnter, onEntered, onExit, onExited })
  React.useEffect(() => {
    callbacksRef.current = { onEnter, onEntered, onExit, onExited }
  })

  const clearAllTimers = React.useCallback(() => {
    window.clearTimeout(delayTimeoutRef.current)
    window.clearTimeout(timeoutRef.current)
    cancelAnimationFrame(rafRef.current)
    cancelAnimationFrame(nestedRafRef.current)
  }, [])

  React.useEffect(() => clearAllTimers, [clearAllTimers])

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    clearAllTimers()

    const handleStateChange = (shouldMount: boolean) => {
      const { onEnter, onEntered, onExit, onExited } = callbacksRef.current
      const preHandler = shouldMount ? onEnter : onExit
      const postHandler = shouldMount ? onEntered : onExited
      const effectiveDuration = prefersReducedMotion
        ? 0
        : shouldMount
          ? duration
          : exitDuration

      if (effectiveDuration === 0) {
        preHandler?.()
        postHandler?.()
        setStatus(shouldMount ? "entered" : "exited")
        return
      }

      rafRef.current = requestAnimationFrame(() => {
        flushSync(() => {
          setStatus(shouldMount ? "pre-entering" : "pre-exiting")
        })

        nestedRafRef.current = requestAnimationFrame(() => {
          preHandler?.()
          setStatus(shouldMount ? "entering" : "exiting")
          timeoutRef.current = window.setTimeout(() => {
            postHandler?.()
            setStatus(shouldMount ? "entered" : "exited")
          }, effectiveDuration)
        })
      })
    }

    const delay = mounted ? enterDelay : exitDelay
    if (typeof delay === "number") {
      delayTimeoutRef.current = window.setTimeout(
        () => handleStateChange(mounted),
        delay,
      )
    } else {
      handleStateChange(mounted)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted])

  return status
}

function getTransitionStyles({
  transition,
  duration,
  state,
  timingFunction,
}: {
  transition: TransitionName | TransitionStyles
  duration: number
  state: TransitionStatus
  timingFunction: string
}): React.CSSProperties {
  const preset =
    typeof transition === "string" ? TRANSITION_PRESETS[transition] : transition
  const bucket = state === "entering" || state === "entered" ? "in" : "out"

  return {
    WebkitBackfaceVisibility: "hidden",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: timingFunction,
    transitionProperty: preset.transitionProperty,
    ...preset.common,
    ...preset[bucket],
  }
}

type TransitionProps = {
  /** Determines whether the element should be mounted. */
  mounted: boolean
  /** Preset name or a custom `{ in, out, transitionProperty }` definition. @default "fade" */
  transition?: TransitionName | TransitionStyles
  /** Enter transition duration in ms. @default 250 */
  duration?: number
  /** Exit transition duration in ms. @default duration */
  exitDuration?: number
  /** CSS transition timing function. @default "ease" */
  timingFunction?: string
  /** Keeps the element in the DOM when hidden instead of unmounting it. */
  keepMounted?: boolean
  /**
   * How the element is hidden when `keepMounted` is set: `"activity"` wraps it in
   * React's `Activity` component, `"display-none"` merges `display: none` into the
   * styles handed to `children`.
   * @default "activity"
   */
  keepMountedMode?: "activity" | "display-none"
  /** Delay in ms before the enter transition starts. */
  enterDelay?: number
  /** Delay in ms before the exit transition starts. */
  exitDelay?: number
  /** Called when the enter transition starts. */
  onEnter?: () => void
  /** Called when the enter transition ends. */
  onEntered?: () => void
  /** Called when the exit transition starts. */
  onExit?: () => void
  /** Called when the exit transition ends. */
  onExited?: () => void
  /** Render function receiving the computed styles for the current phase. */
  children: (styles: React.CSSProperties) => React.ReactElement
}

type TransitionOverride = Partial<Omit<TransitionProps, "mounted">>

function Transition({
  mounted,
  transition = "fade",
  duration = 250,
  exitDuration = duration,
  timingFunction = "ease",
  keepMounted,
  keepMountedMode = "activity",
  enterDelay,
  exitDelay,
  onEnter,
  onEntered,
  onExit,
  onExited,
  children,
}: TransitionProps) {
  const status = useTransitionState({
    mounted,
    duration,
    exitDuration,
    enterDelay,
    exitDelay,
    onEnter,
    onEntered,
    onExit,
    onExited,
  })

  if (status === "exited" && !keepMounted) return null

  const effectiveDuration =
    status === "entering" || status === "entered" ? duration : exitDuration

  let styles = getTransitionStyles({
    transition,
    duration: effectiveDuration,
    state: status,
    timingFunction,
  })

  if (
    status === "exited" &&
    keepMounted &&
    keepMountedMode === "display-none"
  ) {
    styles = { ...styles, display: "none" }
  }

  const rendered = children(styles)

  if (keepMounted && keepMountedMode === "activity") {
    return (
      <Activity mode={status === "exited" ? "hidden" : "visible"}>
        {rendered}
      </Activity>
    )
  }

  return rendered
}

export { Transition }
export type {
  TransitionProps,
  TransitionOverride,
  TransitionName,
  TransitionStyles,
}
