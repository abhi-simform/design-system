import { BookOpenIcon, PaletteIcon, ShapesIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const FOUNDATIONS = [
  {
    href: "#/foundations/colors",
    title: "Colours",
    description: "Every OKLCH token, in light and dark.",
    Icon: PaletteIcon,
  },
  {
    href: "#/foundations/radius",
    title: "Radius",
    description: "One token, seven derived steps.",
    Icon: ShapesIcon,
  },
  {
    href: "#/foundations/typography",
    title: "Typography",
    description: "Inter and DM Sans, with the full ramp.",
    Icon: BookOpenIcon,
  },
]

export function NavigationMenuPlayground({
  side,
  align,
  sideOffset,
}: {
  side: "top" | "bottom"
  align: "start" | "center" | "end"
  sideOffset: number
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Foundations</NavigationMenuTrigger>
          <NavigationMenuContent className="w-72">
            <ul className="flex flex-col gap-1">
              {FOUNDATIONS.map((entry) => (
                <li key={entry.href}>
                  <NavigationMenuLink render={<a href={entry.href} />}>
                    <entry.Icon />
                    <span>{entry.title}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(navigationMenuTriggerStyle())}
            render={<a href="#/components/button" />}
          >
            Components
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuPositioner
        side={side}
        align={align}
        sideOffset={sideOffset}
      />
    </NavigationMenu>
  )
}

export function NavigationMenuBasic() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Foundations</NavigationMenuTrigger>
          <NavigationMenuContent className="w-80">
            <ul className="flex flex-col gap-1">
              {FOUNDATIONS.map((entry) => (
                <li key={entry.href}>
                  <NavigationMenuLink
                    render={<a href={entry.href} />}
                    className="items-start"
                  >
                    <entry.Icon className="mt-0.5" />
                    <span className="flex flex-col gap-0.5">
                      <span className="font-medium">{entry.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {entry.description}
                      </span>
                    </span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent className="w-80">
            <ul className="grid grid-cols-2 gap-1">
              {[
                "Actions",
                "Forms",
                "Data Display",
                "Navigation",
                "Overlays",
                "Layout",
              ].map((category) => (
                <li key={category}>
                  <NavigationMenuLink render={<a href="#/" />}>
                    {category}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(navigationMenuTriggerStyle())}
            render={<a href="#/" />}
          >
            Overview
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuPositioner />
    </NavigationMenu>
  )
}

export function NavigationMenuSimpleLinks() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {["Overview", "Components", "Foundations"].map((label) => (
          <NavigationMenuItem key={label}>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle())}
              render={<a href="#/" />}
            >
              {label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <NavigationMenuPositioner />
    </NavigationMenu>
  )
}
