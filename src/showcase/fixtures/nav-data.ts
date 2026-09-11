export type NavEntry = {
  title: string
  icon: "home" | "inbox" | "calendar" | "search" | "settings"
  badge?: string
  items?: readonly { title: string }[]
}

export const NAV_MAIN: readonly NavEntry[] = [
  { title: "Home", icon: "home" },
  { title: "Inbox", icon: "inbox", badge: "12" },
  {
    title: "Calendar",
    icon: "calendar",
    items: [{ title: "Today" }, { title: "Upcoming" }, { title: "Archive" }],
  },
  { title: "Search", icon: "search" },
  { title: "Settings", icon: "settings" },
]
