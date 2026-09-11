import { MoreHorizontalIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PEOPLE } from "@/showcase/fixtures/people"

export function CardPlayground({
  size,
  showFooter,
  showAction,
}: {
  size: "default" | "sm"
  showFooter: boolean
  showAction: boolean
}) {
  return (
    <Card size={size} className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Deployment</CardTitle>
        <CardDescription>Pushed to production 4 minutes ago.</CardDescription>
        {showAction ? (
          <CardAction>
            <Button variant="ghost" size="icon-sm" aria-label="More">
              <MoreHorizontalIcon />
            </Button>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="text-muted-foreground">
        The --card-spacing variable drives padding and gap together, so the sm
        size reflows the whole card rather than only its text.
      </CardContent>
      {showFooter ? (
        <CardFooter className="justify-end gap-2">
          <Button variant="ghost" size="sm">
            Dismiss
          </Button>
          <Button size="sm">View logs</Button>
        </CardFooter>
      ) : null}
    </Card>
  )
}

export function CardSizes() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      {(["default", "sm"] as const).map((size) => (
        <Card key={size} size={size}>
          <CardHeader>
            <CardTitle>size=&quot;{size}&quot;</CardTitle>
            <CardDescription>
              {size === "default"
                ? "--card-spacing: 1rem"
                : "--card-spacing: 0.75rem"}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Padding, gap and title size all follow the size attribute.
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function CardWithForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Invite a teammate</CardTitle>
        <CardDescription>
          They&apos;ll get an email with a join link.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="card-invite-email">Email</Label>
          <Input id="card-invite-email" placeholder="name@example.com" />
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
        <Button size="sm">Send invite</Button>
      </CardFooter>
    </Card>
  )
}

export function CardWithMedia() {
  const person = PEOPLE[4]

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={person.avatar} alt={person.name} />
            <AvatarFallback>{person.initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{person.name}</CardTitle>
            <CardDescription>{person.role}</CardDescription>
          </div>
        </div>
        <CardAction>
          <Badge variant="secondary">Owner</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        CardAction places itself in the header grid&apos;s second column and
        spans both rows, so it stays aligned to the title regardless of
        description length.
      </CardContent>
    </Card>
  )
}
