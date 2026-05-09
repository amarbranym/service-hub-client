import { Download, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProviderDashboardShell } from "@/features/provider-dashboard/components/provider-dashboard-shell";

const transactions = [
  { id: "#INV-1024", client: "Sarah Jenkins", amount: "$320.00", date: "May 05, 2026", status: "Paid" },
  { id: "#INV-1021", client: "Robert Chen", amount: "$180.00", date: "May 03, 2026", status: "Paid" },
  { id: "#INV-1017", client: "Amanda Lee", amount: "$640.00", date: "Apr 29, 2026", status: "Processing" },
];

export default function ProviderPaymentsPage() {
  return (
    <ProviderDashboardShell
      title="Payments"
      subtitle="Monitor payouts and transaction history."
      action={
        <Button variant="outline">
          <Download />
          Export Report
        </Button>
      }
    >
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Current Balance</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">$2,180.00</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Pending Payouts</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">$940.00</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">This Month</CardTitle>
          </CardHeader>
          <CardContent className="inline-flex items-center gap-2 text-3xl font-semibold">
            <Wallet className="size-6 text-primary" /> $4,760.00
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.client}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell className="text-right">{item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </ProviderDashboardShell>
  );
}
