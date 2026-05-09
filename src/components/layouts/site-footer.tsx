import { Globe, Medal, Send, Share2 } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SiteFooter() {
  return (
    <footer className="bg-secondary pt-12">
      <Container className="grid gap-8 pb-8 md:grid-cols-4">
        <div className="space-y-4">
          <p className="text-3xl font-semibold tracking-tight">ServiceHub</p>
          <p className="text-sm text-muted-foreground">
            Connecting you with the best local experts for all your service needs.
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Medal className="size-4" />
            <Globe className="size-4" />
            <Share2 className="size-4" />
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold uppercase tracking-wide">Company</p>
          <p className="text-muted-foreground">About Us</p>
          <p className="text-muted-foreground">Privacy Policy</p>
          <p className="text-muted-foreground">Terms of Service</p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold uppercase tracking-wide">Support</p>
          <p className="text-muted-foreground">Trust & Safety</p>
          <p className="text-muted-foreground">Partner Support</p>
          <p className="text-muted-foreground">Contact</p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide">Subscribe to our newsletter</p>
          <div className="flex gap-2">
            <Input placeholder="Email address" className="h-10 bg-card" />
            <Button size="icon" className="size-10">
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </Container>
      <div className="py-4 text-center text-sm text-muted-foreground">
        © 2024 ServiceHub Inc. Reliable local services at your fingertips.
      </div>
    </footer>
  );
}
