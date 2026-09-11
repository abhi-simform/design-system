/**
 * Control descriptors for the playground panel.
 *
 * `SelectControl<T>` uses `T` only in covariant positions (`readonly T[]`,
 * `defaultValue`) so that `SelectControl<"a" | "b">` stays assignable to
 * `SelectControl<string>` and the union below remains usable as a value type.
 * Never add a `(value: T) => unknown` member here — it would flip the variance
 * and break every assignment under `strictFunctionTypes`.
 */

export type ControlPrimitive = string | number | boolean

/** How a control participates in the generated code snippet. */
export type ControlCodeRole = "prop" | "children" | "none"

type ControlBase = {
  label: string
  /** Prop name in generated code, when it differs from the control key. */
  propName?: string
  codeRole?: ControlCodeRole
  /** Omit from the snippet when the value equals `defaultValue`. Default: true. */
  omitWhenDefault?: boolean
  description?: string
}

export type SelectControl<T extends string> = ControlBase & {
  kind: "select"
  options: readonly T[]
  defaultValue: T
}

export type BooleanControl = ControlBase & {
  kind: "boolean"
  defaultValue: boolean
}

export type TextControl = ControlBase & {
  kind: "text"
  defaultValue: string
  placeholder?: string
}

export type NumberControl = ControlBase & {
  kind: "number"
  defaultValue: number
  min?: number
  max?: number
  step?: number
}

export type AnyControl =
  SelectControl<string> | BooleanControl | TextControl | NumberControl

export function selectControl<const T extends string>(
  config: Omit<SelectControl<T>, "kind">,
): SelectControl<T> {
  return { kind: "select", ...config }
}

export function booleanControl(
  config: Omit<BooleanControl, "kind">,
): BooleanControl {
  return { kind: "boolean", ...config }
}

export function textControl(config: Omit<TextControl, "kind">): TextControl {
  return { kind: "text", ...config }
}

export function numberControl(
  config: Omit<NumberControl, "kind">,
): NumberControl {
  return { kind: "number", ...config }
}

export type ControlValue<C extends AnyControl> =
  C extends SelectControl<infer T>
    ? T
    : C extends BooleanControl
      ? boolean
      : C extends NumberControl
        ? number
        : string

export type ControlValues<C extends Record<string, AnyControl>> = {
  [K in keyof C]: ControlValue<C[K]>
}
