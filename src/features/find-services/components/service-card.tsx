import { Star } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ServiceCardProps = {
  name: string;
  price: string;
  rating: string;
  description: string;
  badge: string;
  image?: string;
};

export function ServiceCard({ name, price, rating, description, badge, image }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden bg-card transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-0 -mt-4">
        <div className="relative h-48 bg-linear-to-br from-muted to-secondary/45 overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
          ) : null}
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-bold shadow-sm backdrop-blur-sm text-foreground">
            <Star className="size-3.5 fill-primary text-primary" />
            {rating}
          </span>
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-semibold leading-tight tracking-tight">{name}</h3>
            <span className="text-sm font-semibold text-primary">{price}</span>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          <span className="inline-flex rounded bg-secondary px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-secondary-foreground">
            {badge}
          </span>
          <Link href="/service-details" className={buttonVariants({ variant: "outline", className: "h-9 w-full" })}>
            View Details
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
