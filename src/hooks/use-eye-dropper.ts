import * as React from "react"

type EyeDropperOpenOptions = {
  signal?: AbortSignal
}

type EyeDropperResult = {
  sRGBHex: string
}

declare global {
  interface Window {
    EyeDropper?: new () => {
      open: (options?: EyeDropperOpenOptions) => Promise<EyeDropperResult>
    }
  }
}

function useEyeDropper() {
  const supported =
    typeof window !== "undefined" && typeof window.EyeDropper === "function"

  const open = React.useCallback(
    (
      options?: EyeDropperOpenOptions,
    ): Promise<EyeDropperResult | undefined> => {
      if (!supported || !window.EyeDropper) return Promise.resolve(undefined)
      return new window.EyeDropper().open(options)
    },
    [supported],
  )

  return { supported, open }
}

export { useEyeDropper }
export type { EyeDropperResult }
