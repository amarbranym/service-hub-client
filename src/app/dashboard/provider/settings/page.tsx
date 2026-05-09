import { AlertCircle, CalendarRange, MapPin, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProviderDashboardShell } from "@/features/provider-dashboard/components/provider-dashboard-shell";
import { cn } from "@/lib/utils";

const weekDays = ["Mon 14", "Tue 15", "Wed 16", "Thu 17", "Fri 18", "Sat 19", "Sun 20"];
const rows = [
  { label: "Morning (9AM-12PM)", active: [0, 1, 2, 4] },
  { label: "Afternoon (12PM-3PM)", active: [0, 2, 3, 4] },
  { label: "Evening (3PM-6PM)", active: [2, 3, 4] },
];

export default function ProviderSettingsPage() {
  return (
    <ProviderDashboardShell
      title="Availability & Schedule"
      action={
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Last synced: 2m ago</span>
          <Button>Save Changes</Button>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Weekly Availability</CardTitle>
                  <p className="text-sm text-muted-foreground">Define your standard working windows</p>
                </div>
                <Select defaultValue="weekly">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-8 gap-1 text-center text-xs font-semibold text-muted-foreground">
                <span />
                {weekDays.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              {rows.map((row) => (
                <div key={row.label} className="grid grid-cols-8 gap-1">
                  <p className="flex items-center text-xs text-muted-foreground">{row.label}</p>
                  {weekDays.map((_, index) => {
                    const active = row.active.includes(index);
                    return (
                      <button
                        key={`${row.label}-${index}`}
                        type="button"
                        className={cn(
                          "h-10 rounded-md border text-xs font-medium transition",
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "bg-muted/40 text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        {active ? "On" : "Off"}
                      </button>
                    );
                  })}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-[320px_1fr]">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Service Area</CardTitle>
                <p className="text-sm text-muted-foreground">Define where you&apos;re willing to travel</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Maximum Travel Radius</p>
                  <div className="flex items-center gap-2">
                    <input type="range" min={5} max={50} defaultValue={25} className="w-full" />
                    <Badge variant="secondary">25 mi</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Target Zip Codes</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">90210</Badge>
                    <Badge variant="outline">90001</Badge>
                    <Badge variant="outline">90211</Badge>
                    <Button size="sm" variant="outline">
                      <Plus />
                      Add Zip
                    </Button>
                  </div>
                </div>
                <div className="inline-flex items-start gap-2 rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
                  <AlertCircle className="mt-0.5 size-4 text-primary" />
                  Travel fees are automatically calculated based on your selected address.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-0">
                <div className="relative h-[360px] rounded-xl bg-linear-to-br from-sky-100 via-cyan-50 to-blue-100">
                  <div className="absolute left-5 top-5 rounded-md border bg-background px-2 py-1 text-xs font-medium">
                    Los Angeles
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <MapPin className="mr-1 size-4 text-primary" />
                    Map preview
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <aside className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Vacation Mode</CardTitle>
              <p className="text-sm text-muted-foreground">Pause all new bookings</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm font-medium">Enable Vacation Mode</span>
                <Switch />
              </div>
              <Input type="date" />
              <Input type="date" />
              <Button className="w-full">Update Block Status</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Time Off</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="rounded-lg border bg-muted/40 p-3">
                <p className="inline-flex items-center gap-1 text-sm font-medium text-destructive">
                  <CalendarRange className="size-4" />
                  Labor Day Weekend
                </p>
                <p className="text-xs text-muted-foreground">Sept 01 - Sept 04</p>
              </div>
              <Separator />
              <Tabs defaultValue="weekly">
                <TabsList className="w-full">
                  <TabsTrigger value="weekly" className="flex-1">
                    Weekly
                  </TabsTrigger>
                  <TabsTrigger value="custom" className="flex-1">
                    Custom
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="weekly" className="text-xs text-muted-foreground">
                  Recurring off-days are currently disabled.
                </TabsContent>
                <TabsContent value="custom" className="text-xs text-muted-foreground">
                  Add custom time blocks from calendar integration.
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </aside>
      </div>
    </ProviderDashboardShell>
  );
}
