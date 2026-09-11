import { CalendarDaysIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { PEOPLE } from "@/showcase/fixtures/people"

export function HoverCardPlayground({
  side,
  align,
  sideOffset,
}: {
  side: "top" | "right" | "bottom" | "left"
  align: "start" | "center" | "end"
  sideOffset: number
}) {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link" />}>
        @{PEOPLE[0].id}
      </HoverCardTrigger>
      <HoverCardContent side={side} align={align} sideOffset={sideOffset}>
        <div className="text-sm">
          <div className="font-medium">{PEOPLE[0].name}</div>
          <div className="text-muted-foreground">{PEOPLE[0].role}</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function HoverCardBasic() {
  const person = PEOPLE[1]

  return (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link" />}>
        @{person.id}
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src={person.avatar} alt={person.name} />
            <AvatarFallback>{person.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 text-sm">
            <span className="font-medium">{person.name}</span>
            <span className="text-muted-foreground">
              Invented the first compiler. Works on {person.role.toLowerCase()}.
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDaysIcon className="size-3.5" />
              Joined December 1959
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function HoverCardSides() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <HoverCard key={side}>
          <HoverCardTrigger render={<Button variant="outline" size="sm" />}>
            {side}
          </HoverCardTrigger>
          <HoverCardContent side={side} className="w-40 text-sm">
            side=&quot;{side}&quot;
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}

export function HoverCardInProse() {
  return (
    <p className="max-w-md text-sm leading-relaxed">
      This design system is built on{" "}
      <HoverCard>
        <HoverCardTrigger
          render={<a href="#/components/button" className="underline" />}
        >
          Base UI
        </HoverCardTrigger>
        <HoverCardContent className="w-64 text-sm">
          Unstyled, accessible primitives. Unlike Radix it uses a render prop
          instead of asChild for polymorphism.
        </HoverCardContent>
      </HoverCard>{" "}
      rather than Radix — which is why you see render props throughout these
      examples.
    </p>
  )
}
