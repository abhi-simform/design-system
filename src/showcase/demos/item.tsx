import { ChevronRightIcon, FileTextIcon, SettingsIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Switch } from "@/components/ui/switch"
import { PEOPLE } from "@/showcase/fixtures/people"

export function ItemPlayground({
  variant,
  size,
  mediaVariant,
}: {
  variant: "default" | "outline" | "muted"
  size: "default" | "sm" | "xs"
  mediaVariant: "default" | "icon" | "image"
}) {
  return (
    <Item variant={variant} size={size} className="w-full max-w-md">
      <ItemMedia variant={mediaVariant}>
        {mediaVariant === "image" ? (
          <img src={PEOPLE[0].avatar} alt="" />
        ) : (
          <FileTextIcon />
        )}
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Design tokens</ItemTitle>
        <ItemDescription>Updated 2 hours ago · 14 KB</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-sm" aria-label="Open">
          <ChevronRightIcon />
        </Button>
      </ItemActions>
    </Item>
  )
}

export function ItemVariants() {
  return (
    <div className="flex w-full flex-col gap-3">
      {(["default", "outline", "muted"] as const).map((variant) => (
        <Item key={variant} variant={variant}>
          <ItemMedia variant="icon">
            <FileTextIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>variant=&quot;{variant}&quot;</ItemTitle>
            <ItemDescription>
              Only the border and background change.
            </ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}

export function ItemSizes() {
  return (
    <div className="flex w-full flex-col gap-3">
      {(["default", "sm", "xs"] as const).map((size) => (
        <Item key={size} variant="outline" size={size}>
          <ItemMedia variant="icon">
            <SettingsIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>size=&quot;{size}&quot;</ItemTitle>
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}

export function ItemGroups() {
  return (
    <ItemGroup className="w-full rounded-xl border">
      {PEOPLE.slice(0, 3).map((person, index) => (
        <div key={person.id}>
          {index > 0 ? <ItemSeparator /> : null}
          <Item>
            <ItemMedia variant="image">
              <Avatar>
                <AvatarImage src={person.avatar} alt={person.name} />
                <AvatarFallback>{person.initials}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{person.name}</ItemTitle>
              <ItemDescription>{person.email}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="secondary">{person.role}</Badge>
            </ItemActions>
          </Item>
        </div>
      ))}
    </ItemGroup>
  )
}

export function ItemAsSetting() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Email notifications</ItemTitle>
          <ItemDescription>
            Get a digest when a deployment finishes.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Switch defaultChecked />
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Weekly report</ItemTitle>
          <ItemDescription>Sent every Monday at 09:00.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Switch />
        </ItemActions>
      </Item>
    </div>
  )
}
