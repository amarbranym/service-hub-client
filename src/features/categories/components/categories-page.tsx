import { Container } from "@/components/shared/container";
import { CategoriesGrid } from "@/features/categories/components/categories-grid";

export function CategoriesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <Container className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            <span className="flex size-2 rounded-full bg-primary mr-2 animate-pulse" />
            Explore Services
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Browse All <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Categories</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Find exactly what you need. From quick repairs to complete renovations, explore our wide range of professional services trusted by thousands.
          </p>
        </Container>
      </section>

      {/* Grid Section */}
      <CategoriesGrid />
    </div>
  );
}
