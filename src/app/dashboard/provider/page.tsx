import { BadgeCheck, CalendarClock, Star, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProviderDashboardShell } from "@/features/provider-dashboard/components/provider-dashboard-shell";

const incomingRequests = [
  { name: "Sarah Jenkins", detail: "Home HVAC Inspection - Downtown", time: "Starts in 2 hours" },
  { name: "David Miller", detail: "Full Kitchen Plumbing Repair - North Side", time: "Tomorrow, 9:00 AM" },
];

export default function ProviderDashboardPage() {
  return (
    <ProviderDashboardShell
      title="Dashboard Overview"
      subtitle="Welcome back. Here's what's happening today."
      action={<Badge variant="outline">Last synced: 2m ago</Badge>}
    >
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="flex items-center justify-between gap-3 py-4">
          <div>
            <p className="text-lg font-semibold">Profile Completion</p>
            <p className="text-sm text-primary-foreground/80">
              Complete your profile details to boost visibility and bookings.
            </p>
          </div>
          <Button variant="secondary">Complete Profile</Button>
        </CardContent>
      </Card>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <p className="text-xs text-muted-foreground">Total Earnings</p>
            <CardTitle className="text-4xl">$12,480</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-emerald-600">+12% from last month</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <p className="text-xs text-muted-foreground">Jobs Completed</p>
            <CardTitle className="text-4xl">142</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">4.8 average efficiency</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <p className="text-xs text-muted-foreground">Customer Rating</p>
            <CardTitle className="inline-flex items-center gap-2 text-4xl">
              4.9 <Star className="size-5 fill-amber-500 text-amber-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">Based on 98 verified reviews</CardContent>
        </Card>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Incoming Requests</h2>
          {incomingRequests.map((request) => (
            <Card key={request.name}>
              <CardContent className="flex items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-semibold">{request.name}</p>
                  <p className="text-sm text-muted-foreground">{request.detail}</p>
                  <p className="text-xs font-medium text-primary">{request.time}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Decline
                  </Button>
                  <Button size="sm">Accept Job</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p className="inline-flex items-start gap-2">
              <Wallet className="mt-0.5 size-4 text-primary" />
              Payment of $320 received for Kitchen Remodel
            </p>
            <p className="inline-flex items-start gap-2">
              <BadgeCheck className="mt-0.5 size-4 text-primary" />
              New 5-star review from Amanda L.
            </p>
            <p className="inline-flex items-start gap-2">
              <CalendarClock className="mt-0.5 size-4 text-primary" />
              Profile viewed by 15 potential clients in East Area
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ongoing">
        <TabsList>
          <TabsTrigger value="ongoing">Ongoing Jobs</TabsTrigger>
          <TabsTrigger value="completed">Completed Jobs</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing" className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Leak Repair</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">452 Oak Street, West End</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Electrical Panel Upgrade</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">12 Highgate Ave</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardContent className="py-6 text-sm text-muted-foreground">
              Completed jobs summary will appear here.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ProviderDashboardShell>
  );
}
