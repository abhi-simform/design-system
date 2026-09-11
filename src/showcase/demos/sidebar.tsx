import {
  CalendarIcon,
  HomeIcon,
  InboxIcon,
  MoreHorizontalIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { NAV_MAIN } from "@/showcase/fixtures/nav-data"

const ICONS = {
  home: HomeIcon,
  inbox: InboxIcon,
  calendar: CalendarIcon,
  search: SearchIcon,
  settings: SettingsIcon,
}

function NavBody() {
  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-1 py-1">
          <span className="size-5 shrink-0 rounded-md bg-sidebar-primary" />
          <span className="font-heading text-sm font-medium">Acme Inc</span>
        </div>
        <SidebarInput placeholder="Search…" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_MAIN.map((entry, index) => {
                const Icon = ICONS[entry.icon]

                return (
                  <SidebarMenuItem key={entry.title}>
                    <SidebarMenuButton
                      isActive={index === 0}
                      tooltip={entry.title}
                    >
                      <Icon />
                      <span>{entry.title}</span>
                    </SidebarMenuButton>
                    {entry.badge ? (
                      <SidebarMenuBadge>{entry.badge}</SidebarMenuBadge>
                    ) : (
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontalIcon />
                      </SidebarMenuAction>
                    )}
                    {entry.items ? (
                      <SidebarMenuSub>
                        {entry.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton>
                              {item.title}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Loading</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[0, 1].map((row) => (
                <SidebarMenuItem key={row}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <span className="size-6 shrink-0 rounded-full bg-sidebar-accent" />
              <span className="flex flex-col">
                <span className="text-sm">Ada Lovelace</span>
                <span className="text-xs text-muted-foreground">
                  ada@example.com
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}

export function SidebarAnatomy() {
  return (
    // collapsible="none" is the only variant that stays inside its container —
    // every other one is position: fixed and would escape this canvas.
    <div className="relative h-[480px] w-full overflow-hidden rounded-xl border">
      <SidebarProvider className="min-h-full">
        <Sidebar collapsible="none" className="h-full border-r">
          <NavBody />
        </Sidebar>
        <SidebarInset className="p-4 text-sm text-muted-foreground">
          Header, search input, grouped menu with badges, hover actions,
          submenus, skeletons and a footer — the whole vocabulary in one panel.
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export function SidebarVariants() {
  return (
    <div className="grid w-full gap-4 lg:grid-cols-3">
      {(["sidebar", "floating", "inset"] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span className="font-mono text-xs text-muted-foreground">
            variant=&quot;{variant}&quot;
          </span>
          <div className="relative h-64 overflow-hidden rounded-xl border bg-sidebar/40">
            <SidebarProvider className="min-h-full">
              <Sidebar collapsible="none" variant={variant} className="h-full">
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarMenu>
                      {NAV_MAIN.slice(0, 3).map((entry, index) => {
                        const Icon = ICONS[entry.icon]

                        return (
                          <SidebarMenuItem key={entry.title}>
                            <SidebarMenuButton isActive={index === 0}>
                              <Icon />
                              <span>{entry.title}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )
                      })}
                    </SidebarMenu>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
            </SidebarProvider>
          </div>
        </div>
      ))}
    </div>
  )
}

export function SidebarMenuButtonSizes() {
  return (
    <div className="relative h-72 w-full max-w-xs overflow-hidden rounded-xl border">
      <SidebarProvider className="min-h-full">
        <Sidebar collapsible="none" className="h-full w-full">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Sizes</SidebarGroupLabel>
              <SidebarMenu>
                {(["sm", "default", "lg"] as const).map((size) => (
                  <SidebarMenuItem key={size}>
                    <SidebarMenuButton size={size}>
                      <HomeIcon />
                      <span>size=&quot;{size}&quot;</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <Separator className="my-2" />
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton variant="outline">
                    <HomeIcon />
                    <span>variant=&quot;outline&quot;</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <HomeIcon />
                    <span>isActive</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  )
}

/**
 * The full application shell. This is rendered into an iframe from the
 * component page so its fixed positioning, the Cmd/Ctrl+B shortcut and the
 * sidebar_state cookie all operate on a document of their own rather than
 * fighting the showcase's chrome.
 */
export function SidebarSandbox() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <NavBody />
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm font-medium">Dashboard</span>
        </header>
        <div className="flex flex-col gap-4 p-4 text-sm text-muted-foreground">
          <p>
            Toggle the sidebar with the trigger, the rail on its edge, or
            Cmd/Ctrl+B. The open state persists to the sidebar_state cookie.
          </p>
          <p>
            Narrow this frame below 768px and the sidebar switches to a Sheet.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((card) => (
              <div key={card} className="h-24 rounded-xl bg-muted/50" />
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export function SidebarFullShell() {
  return (
    <iframe
      src="./#/sandbox/sidebar"
      title="Sidebar application shell"
      className="h-[600px] w-full rounded-xl border bg-background"
    />
  )
}
