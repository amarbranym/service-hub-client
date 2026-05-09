import { ReactNode } from "react";

type FilterSectionProps = {
  title: string;
  children: ReactNode;
};

export function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <section className="space-y-3 border-t border-border/70 pt-4 first:border-t-0 first:pt-0">
      <h3 className="text-xs font-semibold tracking-wide text-foreground/90 uppercase">{title}</h3>
      {children}
    </section>
  );
}
