import * as React from "react"

import { AppShell } from "@/components/ui/app-shell"
import { Burger } from "@/components/ui/burger"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-96 w-full overflow-hidden rounded-xl border bg-background">
      {children}
    </div>
  )
}

function Lines({ count, label }: { count: number; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="h-8 rounded-md bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground"
        >
          {label} {index + 1}
        </div>
      ))}
    </div>
  )
}

function BarLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center px-4 text-sm font-medium">
      {children}
    </div>
  )
}

export function AppShellPlayground({
  layout,
  withBorder,
  padding,
  headerHeight,
  navbarWidth,
  asideWidth,
  withFooter,
  disabled,
}: {
  layout: "default" | "alt"
  withBorder: boolean
  padding: "xs" | "sm" | "md" | "lg" | "xl"
  headerHeight: number
  navbarWidth: number
  asideWidth: number
  withFooter: boolean
  disabled: boolean
}) {
  return (
    <Frame>
      <AppShell
        mode="static"
        layout={layout}
        withBorder={withBorder}
        padding={padding}
        disabled={disabled}
        header={{ height: headerHeight }}
        navbar={{ width: navbarWidth, breakpoint: "sm" }}
        aside={
          asideWidth > 0 ? { width: asideWidth, breakpoint: "md" } : undefined
        }
        footer={withFooter ? { height: 40 } : undefined}
      >
        <AppShell.Header>
          <BarLabel>Header</BarLabel>
        </AppShell.Header>
        <AppShell.Navbar className="p-4 text-sm">Navbar</AppShell.Navbar>
        <AppShell.Main>
          <Lines count={6} label="Main content" />
        </AppShell.Main>
        {asideWidth > 0 ? (
          <AppShell.Aside className="p-4 text-sm">Aside</AppShell.Aside>
        ) : null}
        {withFooter ? (
          <AppShell.Footer>
            <BarLabel>Footer</BarLabel>
          </AppShell.Footer>
        ) : null}
      </AppShell>
    </Frame>
  )
}

export function AppShellAnatomy() {
  return (
    <Frame>
      <AppShell
        mode="static"
        padding="md"
        header={{ height: 56 }}
        footer={{ height: 40 }}
        navbar={{ width: 220, breakpoint: "sm" }}
        aside={{ width: 180, breakpoint: "md" }}
      >
        <AppShell.Header>
          <BarLabel>Header</BarLabel>
        </AppShell.Header>
        <AppShell.Navbar className="p-3 text-sm">
          <AppShell.Section>Navbar header section</AppShell.Section>
          <AppShell.Section grow className="min-h-0">
            <ScrollArea className="h-full">
              <Lines count={20} label="Scrollable link" />
            </ScrollArea>
          </AppShell.Section>
          <AppShell.Section>Navbar footer section</AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main>
          <Lines count={12} label="Main content" />
        </AppShell.Main>
        <AppShell.Aside className="p-3 text-sm">Aside</AppShell.Aside>
        <AppShell.Footer>
          <BarLabel>Footer</BarLabel>
        </AppShell.Footer>
      </AppShell>
    </Frame>
  )
}

export function AppShellAltLayout() {
  return (
    <Frame>
      <AppShell
        mode="static"
        layout="alt"
        padding="md"
        header={{ height: 56 }}
        navbar={{ width: 200, breakpoint: "sm" }}
        footer={{ height: 40 }}
      >
        <AppShell.Header>
          <BarLabel>Header (beside the navbar)</BarLabel>
        </AppShell.Header>
        <AppShell.Navbar className="p-3 text-sm">
          Navbar spans full height
        </AppShell.Navbar>
        <AppShell.Main>
          <Lines count={6} label="Main content" />
        </AppShell.Main>
        <AppShell.Footer>
          <BarLabel>Footer</BarLabel>
        </AppShell.Footer>
      </AppShell>
    </Frame>
  )
}

export function AppShellCollapse() {
  const [navbar, setNavbar] = React.useState(false)
  const [header, setHeader] = React.useState(false)
  const [aside, setAside] = React.useState(false)

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Burger
          opened={!navbar}
          onClick={() => setNavbar((value) => !value)}
          aria-label="Toggle navbar"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setHeader((v) => !v)}
        >
          {header ? "Show" : "Collapse"} header
        </Button>
        <Button variant="outline" size="sm" onClick={() => setAside((v) => !v)}>
          {aside ? "Show" : "Collapse"} aside
        </Button>
      </div>
      <Frame>
        <AppShell
          mode="static"
          padding="md"
          transitionDuration={300}
          transitionTimingFunction="ease-in-out"
          header={{ height: 48, collapsed: header }}
          navbar={{
            width: 200,
            breakpoint: "sm",
            collapsed: { desktop: navbar, mobile: navbar },
          }}
          aside={{
            width: 180,
            breakpoint: "sm",
            collapsed: { desktop: aside, mobile: aside },
          }}
        >
          <AppShell.Header>
            <BarLabel>Header</BarLabel>
          </AppShell.Header>
          <AppShell.Navbar className="p-3 text-sm">Navbar</AppShell.Navbar>
          <AppShell.Main>
            <Lines count={6} label="Main content" />
          </AppShell.Main>
          <AppShell.Aside className="p-3 text-sm">Aside</AppShell.Aside>
        </AppShell>
      </Frame>
    </div>
  )
}

export function AppShellResponsiveSizes() {
  return (
    <Frame>
      <AppShell
        mode="static"
        padding={{ base: 8, sm: "md", lg: "xl" }}
        header={{ height: { base: 48, md: 64 } }}
        navbar={{ width: { sm: 180, lg: 260 }, breakpoint: "sm" }}
      >
        <AppShell.Header>
          <BarLabel>Header grows from 48px to 64px at md</BarLabel>
        </AppShell.Header>
        <AppShell.Navbar className="p-3 text-sm">
          Navbar is 180px at sm, 260px at lg
        </AppShell.Navbar>
        <AppShell.Main>
          <Lines count={5} label="Padding steps 8px, md, xl" />
        </AppShell.Main>
      </AppShell>
    </Frame>
  )
}

export function AppShellDisabled() {
  const [disabled, setDisabled] = React.useState(true)

  return (
    <div className="flex w-full flex-col gap-3">
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDisabled((v) => !v)}
        >
          {disabled ? "Enable" : "Disable"} shell
        </Button>
      </div>
      <Frame>
        <AppShell
          mode="static"
          padding="md"
          disabled={disabled}
          header={{ height: 48 }}
          navbar={{ width: 200, breakpoint: "sm" }}
        >
          <AppShell.Header>
            <BarLabel>Header</BarLabel>
          </AppShell.Header>
          <AppShell.Navbar className="p-3 text-sm">Navbar</AppShell.Navbar>
          <AppShell.Main>
            <Lines count={4} label="Only Main remains when disabled" />
          </AppShell.Main>
        </AppShell>
      </Frame>
    </div>
  )
}

export function AppShellSandbox() {
  const [mobileOpened, setMobileOpened] = React.useState(false)
  const [desktopOpened, setDesktopOpened] = React.useState(true)

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      footer={{ height: 40 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      aside={{
        width: 240,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
    >
      <AppShell.Header>
        <div className="flex h-full items-center gap-3 px-4">
          <Burger
            opened={mobileOpened}
            onClick={() => setMobileOpened((value) => !value)}
            className="sm:hidden"
            size="sm"
            aria-label="Toggle navigation"
          />
          <Burger
            opened={desktopOpened}
            onClick={() => setDesktopOpened((value) => !value)}
            className="max-sm:hidden"
            size="sm"
            aria-label="Toggle navigation"
          />
          <span className="font-heading text-sm font-medium">Acme Inc</span>
        </div>
      </AppShell.Header>
      <AppShell.Navbar className="p-4">
        <AppShell.Section className="pb-3 text-sm font-medium">
          Navbar
        </AppShell.Section>
        <AppShell.Section grow className="min-h-0">
          <ScrollArea className="h-full">
            <Lines count={30} label="Link" />
          </ScrollArea>
        </AppShell.Section>
        <AppShell.Section className="pt-3 text-xs text-muted-foreground">
          Navbar footer
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <div className="flex flex-col gap-4 text-sm text-muted-foreground">
          <p>
            Toggle the navbar with the burger. Narrow this frame below 768px and
            the navbar collapses into a full-width overlay; the aside hides
            below 992px.
          </p>
          <Lines count={20} label="Main content" />
        </div>
      </AppShell.Main>
      <AppShell.Aside className="p-4 text-sm">Aside</AppShell.Aside>
      <AppShell.Footer>
        <BarLabel>Footer</BarLabel>
      </AppShell.Footer>
    </AppShell>
  )
}

export function AppShellFullShell() {
  return (
    <iframe
      src="./#/sandbox/app-shell"
      title="App shell application layout"
      className="h-[600px] w-full rounded-xl border bg-background"
    />
  )
}
