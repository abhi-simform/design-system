import { CheckIcon, PlusIcon } from "lucide-react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { PEOPLE } from "@/showcase/fixtures/people"

export function AvatarPlayground({
  size,
  showImage,
  showBadge,
}: {
  size: "default" | "sm" | "lg"
  showImage: boolean
  showBadge: boolean
}) {
  return (
    <Avatar size={size}>
      {showImage ? (
        <AvatarImage src={PEOPLE[0].avatar} alt={PEOPLE[0].name} />
      ) : null}
      <AvatarFallback>{PEOPLE[0].initials}</AvatarFallback>
      {showBadge ? <AvatarBadge /> : null}
    </Avatar>
  )
}

export function AvatarSizes() {
  return (
    <div className="flex items-center gap-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src={PEOPLE[1].avatar} alt={PEOPLE[1].name} />
          <AvatarFallback>{PEOPLE[1].initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  )
}

export function AvatarFallbacks() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="/broken-image.png" alt="Missing" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>
          <PlusIcon className="size-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

export function AvatarBadges() {
  return (
    <div className="flex items-center gap-6">
      <Avatar>
        <AvatarImage src={PEOPLE[2].avatar} alt={PEOPLE[2].name} />
        <AvatarFallback>{PEOPLE[2].initials}</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src={PEOPLE[3].avatar} alt={PEOPLE[3].name} />
        <AvatarFallback>{PEOPLE[3].initials}</AvatarFallback>
        <AvatarBadge>
          <CheckIcon />
        </AvatarBadge>
      </Avatar>
    </div>
  )
}

export function AvatarGroups() {
  return (
    <AvatarGroup>
      {PEOPLE.slice(0, 3).map((person) => (
        <Avatar key={person.id}>
          <AvatarImage src={person.avatar} alt={person.name} />
          <AvatarFallback>{person.initials}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+7</AvatarGroupCount>
    </AvatarGroup>
  )
}
