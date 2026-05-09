import { Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProviderDashboardShell } from "@/features/provider-dashboard/components/provider-dashboard-shell";

export default function ProviderMessagesPage() {
  return (
    <ProviderDashboardShell title="Messages" subtitle="Respond quickly to maintain high client trust.">
      <Tabs defaultValue="inbox">
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox" className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <Input placeholder="Search messages" className="pl-8" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="rounded-lg border bg-muted/40 p-3">
                  <p className="font-semibold">Robert Chen</p>
                  <p className="text-muted-foreground">Can you share a quote for Sunday?</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="font-semibold">Amanda Lee</p>
                  <p className="text-muted-foreground">Thanks, confirming 10 AM works.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Robert Chen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border p-3 text-sm text-muted-foreground">
                Hi, I need a quick estimate for sink repair and pipe check.
              </div>
              <Textarea placeholder="Write your reply..." className="min-h-28" />
              <div className="flex justify-end">
                <Button>Send Message</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="unread">
          <Card>
            <CardContent className="py-6 text-sm text-muted-foreground">
              You have 2 unread messages waiting for response.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ProviderDashboardShell>
  );
}
