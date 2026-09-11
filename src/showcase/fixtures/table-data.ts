export type Invoice = {
  id: string
  status: "Paid" | "Pending" | "Overdue"
  method: string
  amount: number
}

export const INVOICES: readonly Invoice[] = [
  { id: "INV-001", status: "Paid", method: "Credit Card", amount: 250 },
  { id: "INV-002", status: "Pending", method: "PayPal", amount: 150 },
  { id: "INV-003", status: "Overdue", method: "Bank Transfer", amount: 350 },
  { id: "INV-004", status: "Paid", method: "Credit Card", amount: 450 },
  { id: "INV-005", status: "Paid", method: "PayPal", amount: 550 },
]

export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
