import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export function ToastPlayground({
  type,
  title,
  description,
  timeout,
  priority,
}: {
  type: "success" | "info" | "warning" | "error" | "loading"
  title: string
  description: string
  timeout: number
  priority: "low" | "high"
}) {
  return (
    <Button
      variant="outline"
      onClick={() => toast.add({ type, title, description, timeout, priority })}
    >
      Show toast
    </Button>
  )
}

export function ToastTypes() {
  const types = ["success", "info", "warning", "error", "loading"] as const

  return (
    <div className="flex flex-wrap items-center gap-3">
      {types.map((type) => (
        <Button
          key={type}
          variant="outline"
          size="sm"
          onClick={() =>
            toast.add({
              type,
              title: `${type[0].toUpperCase()}${type.slice(1)}`,
              description: `A ${type} toast, with its matching icon.`,
            })
          }
        >
          {type}
        </Button>
      ))}
    </div>
  )
}

export function ToastWithAction() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Project deleted",
            description: "design-system was moved to trash.",
            actionProps: {
              children: "Undo",
              onClick: () => toast.add({ type: "success", title: "Restored" }),
            },
          })
        }
      >
        With an action
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "warning",
            title: "Stays until dismissed",
            description: "timeout: 0 disables auto-close.",
            timeout: 0,
          })
        }
      >
        Sticky
      </Button>
    </div>
  )
}

export function ToastPromise() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        const deploy = new Promise<string>((resolve) =>
          window.setTimeout(() => resolve("ds-a1b2c3"), 2000),
        )

        toast.promise(deploy, {
          loading: "Deploying…",
          success: (id: string) => `Deployed ${id}`,
          error: "Deploy failed",
        })
      }}
    >
      Run a promise toast
    </Button>
  )
}
