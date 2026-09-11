import {
  CircleAlertIcon,
  InfoIcon,
  RocketIcon,
  TriangleAlertIcon,
} from "lucide-react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function AlertPlayground({
  variant,
  title,
  description,
  showIcon,
}: {
  variant: "default" | "destructive"
  title: string
  description: string
  showIcon: boolean
}) {
  return (
    <Alert variant={variant} className="w-full max-w-md">
      {showIcon ? <InfoIcon /> : null}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

export function AlertVariants() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Alert>
        <RocketIcon />
        <AlertTitle>Deploy complete</AlertTitle>
        <AlertDescription>
          Your changes are live on production.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>Build failed</AlertTitle>
        <AlertDescription>
          Two type errors in src/routes. The destructive variant also tints the
          description.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export function AlertWithoutIcon() {
  return (
    <Alert className="w-full">
      <AlertTitle>Scheduled maintenance</AlertTitle>
      <AlertDescription>
        Without an svg child the grid collapses to a single column, so the text
        sits flush with the left edge.
      </AlertDescription>
    </Alert>
  )
}

export function AlertWithAction() {
  return (
    <Alert className="w-full">
      <TriangleAlertIcon />
      <AlertTitle>Your trial ends in 3 days</AlertTitle>
      <AlertDescription>
        Add a payment method to keep your projects running.
      </AlertDescription>
      <AlertAction>
        <Button size="xs" variant="outline">
          Upgrade
        </Button>
      </AlertAction>
    </Alert>
  )
}

export function AlertTitleOnly() {
  return (
    <Alert className="w-full">
      <InfoIcon />
      <AlertTitle>A title on its own is a valid alert.</AlertTitle>
    </Alert>
  )
}
