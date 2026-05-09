import { ArrowRight, Star } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const featuredServices = [
  { title: "Premium Deep Cleaning", rating: "4.9", price: "$49" },
  { title: "AC Service & Repair", rating: "4.8", price: "$29" },
  { title: "Home Salon Luxe", rating: "5.0", price: "$35" },
];

export function FeaturedServicesSection() {
  return (
    <section className="bg-muted/20 py-16 md:py-20">
      <Container>
        <div className="mb-7 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Featured Services</h2>
            <p className="text-sm text-muted-foreground md:text-lg">
              Recommended based on reviews in your area
            </p>
          </div>
          <Button variant="link" className="gap-1 text-primary">
            View All <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredServices.map((item) => (
            <Card key={item.title} className="overflow-hidden transition hover:shadow-md">
              <CardContent className="p-0">
                <div className="h-48 bg-muted" />
                <div className="space-y-4 p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                    <span className="inline-flex items-center gap-1 text-base font-semibold text-primary">
                      <Star className="size-4 fill-primary" />
                      {item.rating}
                    </span>
                  </div>
                  <p className="text-base text-muted-foreground">
                    Professional quality work with reliable scheduling and transparent pricing.
                  </p>
                  <div className="flex items-center justify-between border-t pt-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Starts from
                      </p>
                      <p className="text-3xl font-bold text-primary">{item.price}</p>
                    </div>
                    <Button variant="secondary" className="h-10 px-5">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
