import { Container } from "@/components/shared/container";

const steps = [
  {
    id: "1",
    title: "Choose",
    description: "Browse from hundreds of services and top-rated professionals.",
  },
  {
    id: "2",
    title: "Schedule",
    description: "Pick a date and time that works best for your busy schedule.",
  },
  {
    id: "3",
    title: "Relax",
    description: "Our expert arrives on time to get the job done right.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-primary py-16 text-primary-foreground md:py-20">
      <Container>
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-5xl">
          Simple steps to expert help
        </h2>
        <div className="relative mt-10 grid gap-8 pb-4 text-center md:grid-cols-3 md:pb-8">
          <div className="pointer-events-none absolute left-1/6 right-1/6 top-6 hidden h-px bg-primary-foreground/30 md:block" />
          {steps.map((step) => (
            <div key={step.id} className="relative">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary-foreground text-xl font-semibold text-primary shadow-sm">
                {step.id}
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-base text-primary-foreground/85 md:text-lg">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
