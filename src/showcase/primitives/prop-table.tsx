import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { AnyControl } from "@/showcase/lib/controls"

function typeOf(control: AnyControl): string {
  if (control.kind === "select") {
    return control.options.map((option) => `"${option}"`).join(" | ")
  }

  if (control.kind === "boolean") {
    return "boolean"
  }

  if (control.kind === "number") {
    return "number"
  }

  return "string"
}

/**
 * Derived entirely from the playground's control map, so it can never drift
 * from what the playground actually exposes.
 */
export function PropTable({
  controls,
}: {
  controls: Record<string, AnyControl>
}) {
  const keys = Object.keys(controls).filter(
    (key) => (controls[key].codeRole ?? "prop") !== "none",
  )

  if (keys.length === 0) {
    return null
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">Prop</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="w-32">Default</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keys.map((key) => {
            const control = controls[key]

            return (
              <TableRow key={key}>
                <TableCell className="font-mono text-xs font-medium">
                  {control.propName ?? key}
                </TableCell>
                <TableCell className="font-mono text-xs break-words text-muted-foreground">
                  {typeOf(control)}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {JSON.stringify(control.defaultValue)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
