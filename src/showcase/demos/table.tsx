import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { currency, INVOICES } from "@/showcase/fixtures/table-data"

const STATUS_VARIANT = {
  Paid: "secondary",
  Pending: "outline",
  Overdue: "destructive",
} as const

export function TablePlayground({
  showCaption,
  showFooter,
}: {
  showCaption: boolean
  showFooter: boolean
}) {
  const total = INVOICES.reduce((sum, invoice) => sum + invoice.amount, 0)

  return (
    <Table>
      {showCaption ? (
        <TableCaption>Invoices from the last 30 days.</TableCaption>
      ) : null}
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {INVOICES.slice(0, 3).map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell className="text-right tabular-nums">
              {currency.format(invoice.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {showFooter ? (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right tabular-nums">
              {currency.format(total)}
            </TableCell>
          </TableRow>
        </TableFooter>
      ) : null}
    </Table>
  )
}

export function TableBasic() {
  return (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-28">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {INVOICES.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>
              <Badge variant={STATUS_VARIANT[invoice.status]}>
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {invoice.method}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {currency.format(invoice.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function TableWithFooter() {
  const total = INVOICES.reduce((sum, invoice) => sum + invoice.amount, 0)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {INVOICES.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell className="text-right tabular-nums">
              {currency.format(invoice.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right tabular-nums">
            {currency.format(total)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
