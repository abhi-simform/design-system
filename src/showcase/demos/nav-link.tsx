import * as React from "react"
import {
  ChevronRightIcon,
  GaugeIcon,
  FingerprintIcon,
  HomeIcon,
} from "lucide-react"

import {
  NavLink,
  type NavLinkChildrenOffset,
  type NavLinkVariant,
} from "@/components/ui/nav-link"

export function NavLinkPlayground({
  variant,
  active,
  disabled,
  noWrap,
  withDescription,
  withChildren,
  childrenOffset,
}: {
  variant: NavLinkVariant
  active: boolean
  disabled: boolean
  noWrap: boolean
  withDescription: boolean
  withChildren: boolean
  childrenOffset: NavLinkChildrenOffset
}) {
  return (
    <div className="w-72">
      <NavLink
        href="#"
        label="Dashboard"
        description={withDescription ? "Overview of your account" : undefined}
        leftSection={<GaugeIcon className="size-4" />}
        variant={variant}
        active={active}
        disabled={disabled}
        noWrap={noWrap}
        childrenOffset={childrenOffset}
      >
        {withChildren ? (
          <>
            <NavLink href="#" label="Analytics" />
            <NavLink href="#" label="Reports" />
          </>
        ) : undefined}
      </NavLink>
    </div>
  )
}

export function NavLinkVariants() {
  return (
    <div className="flex w-72 flex-col gap-2">
      <NavLink
        href="#"
        label="Light"
        description="Default variant"
        leftSection={<HomeIcon className="size-4" />}
        active
      />
      <NavLink
        href="#"
        label="Filled"
        leftSection={<HomeIcon className="size-4" />}
        variant="filled"
        active
      />
      <NavLink
        href="#"
        label="Subtle"
        leftSection={<HomeIcon className="size-4" />}
        variant="subtle"
        active
      />
      <NavLink
        href="#"
        label="Custom color"
        leftSection={<HomeIcon className="size-4" />}
        color="oklch(0.6 0.2 25)"
        active
      />
    </div>
  )
}

export function NavLinkNested() {
  return (
    <div className="w-72">
      <NavLink
        label="Security"
        leftSection={<FingerprintIcon className="size-4" />}
        defaultOpened
      >
        <NavLink href="#" label="Change password" />
        <NavLink href="#" label="Manage devices" />
        <NavLink label="Two-factor" childrenOffset="xl">
          <NavLink href="#" label="Authenticator app" />
          <NavLink href="#" label="Recovery codes" />
        </NavLink>
      </NavLink>
    </div>
  )
}

export function NavLinkControlled() {
  const [opened, setOpened] = React.useState(false)

  return (
    <div className="flex w-72 flex-col gap-2">
      <NavLink
        label={opened ? "Opened" : "Closed"}
        opened={opened}
        onChange={setOpened}
        rightSection={<ChevronRightIcon className="size-4" />}
        leftSection={<GaugeIcon className="size-4" />}
      >
        <NavLink href="#" label="Child link" />
      </NavLink>
    </div>
  )
}
