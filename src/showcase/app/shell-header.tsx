import { MenuIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useTheme } from "@/components/theme-provider"
import { OVERVIEW_HREF } from "@/showcase/routing/routes"

const THEME_OPTIONS = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: MonitorIcon },
] as const

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <ToggleGroup
      variant="outline"
      size="sm"
      spacing={0}
      value={[theme]}
      onValueChange={(next) => {
        const selected = next[0]
        if (
          selected === "light" ||
          selected === "dark" ||
          selected === "system"
        ) {
          setTheme(selected)
        }
      }}
      aria-label="Color theme"
    >
      {THEME_OPTIONS.map(({ value, label, Icon }) => (
        <Tooltip key={value}>
          <TooltipTrigger
            render={
              <ToggleGroupItem value={value} aria-label={label}>
                <Icon />
              </ToggleGroupItem>
            }
          />
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </ToggleGroup>
  )
}

export function ShellHeader({ onOpenNav }: { onOpenNav: () => void }) {
  return (
    <header className="fixed inset-x-3 top-3 z-40 flex h-14 items-center gap-3 rounded-xl border bg-background px-4 shadow-sm dark:bg-card">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onOpenNav}
        aria-label="Open navigation"
        className="md:hidden"
      >
        <MenuIcon />
      </Button>

      <a
        href={OVERVIEW_HREF}
        className="flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <span className="size-5 rounded-md bg-primary" />
        <span className="font-heading text-sm font-medium tracking-tight">
          Design System
        </span>
      </a>

      <div className="flex-1" />

      <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
        <span>Toggle theme</span>
        <Kbd>d</Kbd>
      </div>
      <Separator orientation="vertical" className="hidden h-full sm:block" />
      <ThemeToggle />
    </header>
  )
}
