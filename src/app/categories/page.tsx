import { Metadata } from "next";

import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { CategoriesPage } from "@/features/categories/components/categories-page";

export const metadata: Metadata = {
  title: "Service Categories | ServiceHub",
  description: "Browse all available service categories on ServiceHub.",
};

export default function CategoriesRoute() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <CategoriesPage />
      </main>
      <SiteFooter />
    </div>
  );
}
