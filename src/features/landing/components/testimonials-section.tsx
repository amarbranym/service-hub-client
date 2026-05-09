import { Container } from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "The cleaning service was impeccable! The pro arrived exactly on time and the house has never looked better. Highly recommend ServiceHub for busy professionals.",
    name: "Sarah Johnson",
    role: "Homeowner in Seattle",
  },
  {
    quote:
      "Found a great plumber within 10 minutes when my kitchen sink broke. The booking process was seamless and the pricing was half of what I expected.",
    name: "Michael Chen",
    role: "Apartment Resident",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <Container>
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-5xl">
          What our customers say
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <Card key={item.name} className="transition hover:shadow-md">
              <CardContent className="space-y-5 p-7">
                <p className="text-xl leading-relaxed text-muted-foreground italic md:text-2xl">
                  &quot;{item.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-tight">{item.name}</p>
                    <p className="text-base text-muted-foreground">{item.role}</p>
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
