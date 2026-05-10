import {
  Briefcase,
  Camera,
  CarFront,
  Computer,
  Hammer,
  HeartPulse,
  Home,
  Leaf,
  Paintbrush,
  Scissors,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";

const allCategories = [
  { id: "home-cleaning", label: "Home Cleaning", icon: Sparkles },
  { id: "appliance-repair", label: "Appliance Repair", icon: Wrench },
  { id: "beauty-wellness", label: "Beauty & Wellness", icon: Scissors },
  { id: "plumbing", label: "Plumbing", icon: Zap },
  { id: "electrical", label: "Electrical", icon: Computer },
  { id: "painting", label: "Painting", icon: Paintbrush },
  { id: "carpentry", label: "Carpentry", icon: Hammer },
  { id: "landscaping", label: "Landscaping", icon: Leaf },
  { id: "health-fitness", label: "Health & Fitness", icon: HeartPulse },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "business", label: "Business Services", icon: Briefcase },
  { id: "auto-care", label: "Auto Care", icon: CarFront },
  { id: "moving", label: "Moving & Storage", icon: Home },
];

export function CategoriesGrid() {
  return (
    <section className="bg-background py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {allCategories.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} href={`/find-services?category=${item.id}`}>
                <Card className="group relative overflow-hidden bg-muted/20 border-border/50 transition-all duration-300 hover:-translate-y-1 hover:bg-muted/40 hover:shadow-lg hover:border-primary/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <CardContent className="flex min-h-48 flex-col items-center justify-center gap-5 p-6 text-center">
                    <div className="rounded-2xl bg-background/80 p-4 text-primary shadow-sm ring-1 ring-border/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary/50">
                      <Icon className="size-6" />
                    </div>
                    <p className="text-base font-medium tracking-tight md:text-lg">{item.label}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
