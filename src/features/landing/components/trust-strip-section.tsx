import { BadgeCheck, CircleDollarSign, ShieldCheck } from "lucide-react";

import { Container } from "@/components/shared/container";

const trustItems = [
  {
    title: "Verified Pros",
    description: "Every professional undergoes a rigorous multi-step background check.",
    icon: BadgeCheck,
  },
  {
    title: "Transparent Pricing",
    description: "No hidden fees. You see the price before you book the service.",
    icon: CircleDollarSign,
  },
  {
    title: "Secure Payments",
    description: "Your payments are safe with our encrypted 256-bit secure gateway.",
    icon: ShieldCheck,
  },
];

export function TrustStripSection() {
  return (
    <section className="bg-secondary/40 py-12 md:py-14">
      <Container className="grid gap-6 md:grid-cols-3">
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-start gap-3">
              <span className="mt-0.5 text-primary">
                <Icon className="size-6" />
              </span>
              <div>
                <p className="text-xl font-semibold tracking-tight">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground md:text-base">{item.description}</p>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
