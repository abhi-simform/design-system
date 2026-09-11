import * as React from "react"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"

export function ProgressPlayground({ value }: { value: number }) {
  return (
    <Progress value={value} className="w-full max-w-sm">
      <ProgressLabel>Uploading</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}

export function ProgressBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Progress value={0} />
      <Progress value={35} />
      <Progress value={70} />
      <Progress value={100} />
    </div>
  )
}

export function ProgressWithLabel() {
  return (
    <Progress value={62} className="w-full max-w-sm">
      <ProgressLabel>Storage used</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}

export function ProgressIndeterminate() {
  return (
    <Progress value={null} className="w-full max-w-sm">
      <ProgressLabel>Preparing build</ProgressLabel>
    </Progress>
  )
}

export function ProgressAnimated() {
  const [value, setValue] = React.useState(12)

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setValue((current) => (current >= 100 ? 0 : current + 4))
    }, 400)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  return (
    <Progress value={value} className="w-full max-w-sm">
      <ProgressLabel>Syncing</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}
