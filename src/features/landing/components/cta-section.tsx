import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <Container>
        <div className="rounded-3xl border border-primary/40 bg-primary px-6 py-14 text-center text-primary-foreground shadow-xl sm:px-10">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Ready to get started?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-primary-foreground/85 md:text-2xl">
            Join thousands of happy customers and professionals on the most reliable services
            marketplace.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="secondary" className="h-12 min-w-44">
              Book Now
            </Button>
            <Button
              variant="outline"
              className="h-12 min-w-56 border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              Become a Provider
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
