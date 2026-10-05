import * as React from "react"

type Dimensions = { width: number; height: number }

function useDimensions(ref: React.RefObject<HTMLElement | null>): Dimensions {
  const [dimensions, setDimensions] = React.useState<Dimensions>({
    width: 0,
    height: 0,
  })

  React.useEffect(() => {
    const element = ref.current
    if (!element || typeof ResizeObserver === "undefined") return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setDimensions((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height },
      )
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])

  return dimensions
}

export { useDimensions }
export type { Dimensions }
