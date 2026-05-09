import { CalendarDays, CheckCircle2, ChevronRight, Clock3, MapPin, Timer, Wallet } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProviderDashboardShell } from "@/features/provider-dashboard/components/provider-dashboard-shell";

const taskItems = [
  { title: "Garden Maintenance", time: "1:30 PM", client: "Mike R." },
  { title: "Pool Cleaning", time: "4:00 PM", client: "Jane D." },
];

export default function ProviderBookingsPage() {
  return (
    <ProviderDashboardShell title="Bookings Management" subtitle="Review and manage your upcoming service schedules.">
      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="h-auto w-full justify-start rounded-none border-b bg-transparent px-0">
          <TabsTrigger
            value="requests"
            className="rounded-none border-b-2 border-transparent px-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Requests <span className="ml-1 text-[11px] text-muted-foreground">2</span>
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="rounded-none border-b-2 border-transparent px-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="ongoing"
            className="rounded-none border-b-2 border-transparent px-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Ongoing
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="rounded-none border-b-2 border-transparent px-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4 lg:grid-cols-[1fr_250px]">
        <Card className="overflow-hidden border-primary/20">
          <CardHeader className="space-y-4 pb-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="size-11 border">
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-xl">Sarah Jenkins</CardTitle>
                  <p className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-primary" />
                    42 Silver Creek Dr, West Hills
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Home Cleaning
                </Badge>
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">New Request</Badge>
              </div>
            </div>
            <div className="grid gap-4 text-sm sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase text-muted-foreground">Date</p>
                <p className="inline-flex items-center gap-1.5 font-medium">
                  <CalendarDays className="size-4 text-primary" />
                  October 24, 2024
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase text-muted-foreground">Time Window</p>
                <p className="inline-flex items-center gap-1.5 font-medium">
                  <Clock3 className="size-4 text-primary" />
                  09:00 AM - 12:00 PM
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase text-muted-foreground">Estimated Fee</p>
                <p className="inline-flex items-center gap-1.5 font-medium">
                  <Wallet className="size-4 text-primary" />
                  $120.00
                </p>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-wrap items-center gap-3 pt-4">
            <Button className="min-w-36">Accept Booking</Button>
            <Button variant="outline" className="min-w-40">
              Message Customer
            </Button>
            <Button variant="ghost" className="text-destructive hover:text-destructive">
              Decline
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-none bg-primary text-primary-foreground shadow-sm">
            <CardContent className="space-y-3 p-4">
              <p className="text-xs uppercase tracking-wider text-primary-foreground/80">Today&apos;s Performance</p>
              <p className="text-4xl font-semibold">$450.00</p>
              <p className="text-xs text-primary-foreground/80">Total projected revenue from 4 jobs</p>
              <div className="h-2 rounded-full bg-primary-foreground/25">
                <div className="h-2 w-[65%] rounded-full bg-primary-foreground" />
              </div>
              <p className="text-xs text-primary-foreground/80">65% of daily target reached</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Next Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {taskItems.map((task) => (
                <div key={task.title} className="flex items-center justify-between rounded-md border p-2">
                  <div>
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {task.time} • {task.client}
                    </p>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-primary/50">
        <CardContent className="flex flex-wrap items-center gap-4 p-4">
          <div className="grid size-16 place-items-center rounded-lg bg-primary/10">
            <Timer className="size-8 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-2xl font-semibold">Deep Kitchen Cleaning</p>
            <p className="text-sm text-muted-foreground">Customer: Marcus Thomsen • 122 Maple St, Suite 4</p>
            <p className="inline-flex items-center gap-1 text-xs font-medium text-primary">
              <CheckCircle2 className="size-3.5" />
              Started 45 mins ago
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button>Mark as Completed</Button>
            <Button variant="outline">Message Marcus</Button>
            <Button variant="ghost">View Details</Button>
          </div>
        </CardContent>
      </Card>
    </ProviderDashboardShell>
  );
}
