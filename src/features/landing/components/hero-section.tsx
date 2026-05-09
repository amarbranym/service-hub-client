import { MapPin, Search, ShieldCheck, Sparkles, Users } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="bg-muted/25 py-16 md:py-20">
      <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Trusted by 10,000+ customers
          </div>
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-6xl">
            Professional help, at your doorstep.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-xl">
            Book trusted local experts for home cleaning, repairs, beauty, and more. Quality
            service guaranteed with transparent pricing.
          </p>

          <div className="mt-8 grid gap-2 rounded-xl border bg-card p-2 shadow-sm md:grid-cols-[1fr_1fr_auto]">
            <div className="flex items-center gap-2 px-2">
              <Search className="size-4 text-muted-foreground" />
              <Input
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                placeholder="What service do you need?"
              />
            </div>
            <div className="flex items-center gap-2 px-2">
              <MapPin className="size-4 text-muted-foreground" />
              <Input
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                placeholder="Enter your location"
              />
            </div>
            <Button className="h-10 px-7">Search</Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-4 text-primary" />
              10k+ verified professionals
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" />
              Secure booking and payments
            </span>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="relative h-[460px] rounded-2xl border bg-linear-to-br from-primary/20 via-background to-muted shadow-sm">
            <div className="absolute inset-4 rounded-xl border border-border/60 bg-card/60" />
            <div className="absolute inset-x-10 bottom-8 top-20 rounded-lg border border-border/60 bg-background/75" />
            <div className="absolute left-14 top-12 h-6 w-28 rounded-full bg-primary/15" />
            <div className="absolute left-14 top-24 h-4 w-40 rounded-full bg-muted" />
            <div className="absolute right-14 top-16 h-20 w-20 rounded-2xl border bg-card/70" />
            <div className="absolute inset-x-16 bottom-14 h-40 rounded-xl border bg-card/70" />
          </div>
          <div className="absolute -bottom-5 left-4 inline-flex items-center gap-3 rounded-xl border bg-card px-4 py-3 shadow-md">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
              <ShieldCheck className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold">10k+ Verified Pros</p>
              <p className="text-xs text-muted-foreground">Top-rated in your area</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
