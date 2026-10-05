import * as React from "react"
import {
  GitBranchIcon,
  GitCommitIcon,
  GitPullRequestIcon,
  MessageSquareIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Timeline,
  type TimelineAlign,
  type TimelineLineVariant,
  type TimelineRadius,
} from "@/components/ui/timeline"

export function TimelinePlayground({
  active,
  align,
  radius,
  bulletSize,
  lineWidth,
  reverseActive,
  withBullets,
}: {
  active: number
  align: TimelineAlign
  radius: TimelineRadius
  bulletSize: number
  lineWidth: number
  reverseActive: boolean
  withBullets: boolean
}) {
  return (
    <div className="w-full max-w-md">
      <Timeline
        active={active}
        align={align}
        radius={radius}
        bulletSize={bulletSize}
        lineWidth={lineWidth}
        reverseActive={reverseActive}
      >
        <Timeline.Item
          title="New branch"
          bullet={
            withBullets ? <GitBranchIcon className="size-3" /> : undefined
          }
        >
          <p className="text-muted-foreground">
            You created new branch fix-notifications
          </p>
        </Timeline.Item>
        <Timeline.Item
          title="Commits"
          bullet={
            withBullets ? <GitCommitIcon className="size-3" /> : undefined
          }
        >
          <p className="text-muted-foreground">
            Forced push to fix-notifications
          </p>
        </Timeline.Item>
        <Timeline.Item
          title="Pull request"
          bullet={
            withBullets ? <GitPullRequestIcon className="size-3" /> : undefined
          }
        >
          <p className="text-muted-foreground">Opened pull request #67</p>
        </Timeline.Item>
        <Timeline.Item
          title="Code review"
          bullet={
            withBullets ? <MessageSquareIcon className="size-3" /> : undefined
          }
        >
          <p className="text-muted-foreground">
            Requested review from reviewers
          </p>
        </Timeline.Item>
      </Timeline>
    </div>
  )
}

export function TimelineBasic() {
  return (
    <div className="w-full max-w-md">
      <Timeline active={1}>
        <Timeline.Item title="New branch">
          <p className="text-muted-foreground">Created fix-notifications</p>
        </Timeline.Item>
        <Timeline.Item title="Commits">
          <p className="text-muted-foreground">Forced push</p>
        </Timeline.Item>
        <Timeline.Item title="Pull request">
          <p className="text-muted-foreground">Opened pull request #67</p>
        </Timeline.Item>
      </Timeline>
    </div>
  )
}

export function TimelineRight() {
  return (
    <div className="w-full max-w-md">
      <Timeline active={1} align="right">
        <Timeline.Item title="New branch">
          <p className="text-muted-foreground">Created fix-notifications</p>
        </Timeline.Item>
        <Timeline.Item title="Commits">
          <p className="text-muted-foreground">Forced push</p>
        </Timeline.Item>
        <Timeline.Item title="Pull request">
          <p className="text-muted-foreground">Opened pull request #67</p>
        </Timeline.Item>
      </Timeline>
    </div>
  )
}

export function TimelineBulletsAndColors() {
  return (
    <div className="w-full max-w-md">
      <Timeline active={2} bulletSize={28} lineWidth={2} color="#16a34a">
        <Timeline.Item
          title="Branch"
          bullet={<GitBranchIcon className="size-3.5" />}
        >
          <p className="text-muted-foreground">Created from main</p>
        </Timeline.Item>
        <Timeline.Item
          title="Commit"
          bullet={<GitCommitIcon className="size-3.5" />}
          color="#2563eb"
        >
          <p className="text-muted-foreground">Item with its own color</p>
        </Timeline.Item>
        <Timeline.Item
          title="Pull request"
          bullet={<GitPullRequestIcon className="size-3.5" />}
        >
          <p className="text-muted-foreground">Opened pull request</p>
        </Timeline.Item>
        <Timeline.Item
          title="Review"
          bullet={<MessageSquareIcon className="size-3.5" />}
        >
          <p className="text-muted-foreground">Waiting for reviewers</p>
        </Timeline.Item>
      </Timeline>
    </div>
  )
}

export function TimelineLineVariants() {
  const variants: TimelineLineVariant[] = ["solid", "dashed", "dotted"]
  return (
    <div className="w-full max-w-md">
      <Timeline active={3}>
        {variants.map((variant) => (
          <Timeline.Item key={variant} title={variant} lineVariant={variant}>
            <p className="text-muted-foreground">
              Line below uses lineVariant="{variant}"
            </p>
          </Timeline.Item>
        ))}
        <Timeline.Item title="End" />
      </Timeline>
    </div>
  )
}

export function TimelineReverseActive() {
  return (
    <div className="w-full max-w-md">
      <Timeline active={1} reverseActive>
        <Timeline.Item title="Oldest" />
        <Timeline.Item title="Middle" />
        <Timeline.Item title="Newer" />
        <Timeline.Item title="Newest" />
      </Timeline>
    </div>
  )
}

export function TimelineOpposite() {
  return (
    <div className="w-full max-w-xl">
      <Timeline active={2}>
        <Timeline.Item title="Kickoff" opposite="Jan 2">
          <p className="text-muted-foreground">Project started</p>
        </Timeline.Item>
        <Timeline.Item title="Beta" opposite="Mar 14" alternate>
          <p className="text-muted-foreground">alternate flips the sides</p>
        </Timeline.Item>
        <Timeline.Item title="Launch" opposite="Jun 1">
          <p className="text-muted-foreground">Public release</p>
        </Timeline.Item>
      </Timeline>
    </div>
  )
}

export function TimelineInteractive() {
  const [active, setActive] = React.useState(1)
  return (
    <div className="w-full max-w-md">
      <Timeline active={active} autoContrast color="#facc15">
        <Timeline.Item
          title="Ordered"
          bullet={<span className="text-xs">1</span>}
        />
        <Timeline.Item
          title="Packed"
          bullet={<span className="text-xs">2</span>}
        />
        <Timeline.Item
          title="Shipped"
          bullet={<span className="text-xs">3</span>}
        />
        <Timeline.Item
          title="Delivered"
          bullet={<span className="text-xs">4</span>}
        />
      </Timeline>
      <div className="mt-6 flex gap-2">
        <Button
          variant="outline"
          disabled={active < 0}
          onClick={() => setActive((current) => current - 1)}
        >
          Back
        </Button>
        <Button
          disabled={active >= 3}
          onClick={() => setActive((current) => current + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
