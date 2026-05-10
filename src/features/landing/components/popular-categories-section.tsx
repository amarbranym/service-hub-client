import { ArrowRight, Leaf, Sparkles, Wrench, Zap } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { label: "Appliance Repair", icon: Wrench },
  { label: "Home Cleaning", icon: Sparkles },
  { label: "Beauty & Wellness", icon: Leaf },
  { label: "Plumbing Works", icon: Zap },
];

export function PopularCategoriesSection() {
  return (
    <section id="categories" className="bg-background py-16 md:py-20">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Popular Categories</h2>
          <Button variant="link" className="gap-1 px-0 text-primary">
            View All <ArrowRight className="size-4" />
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.label}
                className="bg-muted/30 transition hover:-translate-y-0.5 hover:bg-muted/45 hover:shadow-md"
              >
                <CardContent className="flex min-h-40 flex-col items-center justify-center gap-4 p-6 text-center">
                  <div className="rounded-full bg-card p-3 text-primary shadow-sm">
                    <Icon className="size-5" />
                  </div>
                  <p className="text-lg font-semibold tracking-tight md:text-2xl">{item.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
