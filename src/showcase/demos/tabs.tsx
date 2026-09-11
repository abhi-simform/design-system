import { BellIcon, SettingsIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsPlayground({
  variant,
  orientation,
}: {
  variant: "default" | "line"
  orientation: "horizontal" | "vertical"
}) {
  return (
    <Tabs
      defaultValue="account"
      orientation={orientation}
      className="w-full max-w-md gap-4"
    >
      <TabsList variant={variant}>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="text-sm text-muted-foreground">
        Your account details live here.
      </TabsContent>
      <TabsContent value="password" className="text-sm text-muted-foreground">
        Change your password here.
      </TabsContent>
      <TabsContent value="team" className="text-sm text-muted-foreground">
        Invite and manage teammates.
      </TabsContent>
    </Tabs>
  )
}

export function TabsVariants() {
  return (
    <div className="flex w-full flex-col gap-8">
      {(["default", "line"] as const).map((variant) => (
        <Tabs key={variant} defaultValue="one" className="w-full gap-3">
          <TabsList variant={variant}>
            <TabsTrigger value="one">Overview</TabsTrigger>
            <TabsTrigger value="two">Analytics</TabsTrigger>
            <TabsTrigger value="three">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="one" className="text-sm text-muted-foreground">
            variant=&quot;{variant}&quot; —{" "}
            {variant === "default"
              ? "a filled pill with a raised active tab."
              : "an underline that slides beneath the active tab."}
          </TabsContent>
          <TabsContent value="two" className="text-sm text-muted-foreground">
            Analytics panel.
          </TabsContent>
          <TabsContent value="three" className="text-sm text-muted-foreground">
            Reports panel.
          </TabsContent>
        </Tabs>
      ))}
    </div>
  )
}

export function TabsVertical() {
  return (
    <Tabs
      defaultValue="profile"
      orientation="vertical"
      className="w-full gap-4"
    >
      <TabsList>
        <TabsTrigger value="profile">
          <UserIcon data-icon="inline-start" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <BellIcon data-icon="inline-start" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="advanced">
          <SettingsIcon data-icon="inline-start" />
          Advanced
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="text-sm text-muted-foreground">
        A vertical list stacks the triggers and moves the active indicator to
        the right edge.
      </TabsContent>
      <TabsContent
        value="notifications"
        className="text-sm text-muted-foreground"
      >
        Notification preferences.
      </TabsContent>
      <TabsContent value="advanced" className="text-sm text-muted-foreground">
        Advanced settings.
      </TabsContent>
    </Tabs>
  )
}

export function TabsWithForm() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md gap-4">
      <TabsList variant="line">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tabs-name">Name</Label>
          <Input id="tabs-name" defaultValue="Ada Lovelace" />
        </div>
        <Button size="sm" className="w-fit">
          Save
        </Button>
      </TabsContent>
      <TabsContent value="password" className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tabs-password">New password</Label>
          <Input id="tabs-password" type="password" />
        </div>
        <Button size="sm" className="w-fit">
          Update
        </Button>
      </TabsContent>
    </Tabs>
  )
}

export function TabsDisabled() {
  return (
    <Tabs defaultValue="a" className="w-full max-w-md gap-3">
      <TabsList>
        <TabsTrigger value="a">Enabled</TabsTrigger>
        <TabsTrigger value="b" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="c">Also enabled</TabsTrigger>
      </TabsList>
      <TabsContent value="a" className="text-sm text-muted-foreground">
        Disabled triggers are skipped by arrow-key navigation.
      </TabsContent>
      <TabsContent value="c" className="text-sm text-muted-foreground">
        Third panel.
      </TabsContent>
    </Tabs>
  )
}
