import { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

type AuthSplitLayoutProps = {
  children: ReactNode;
};

export function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <main className="flex min-h-dvh">
      <section className="grid w-full grid-cols-1 overflow-hidden lg:grid-cols-2">
        <aside className="relative hidden overflow-hidden bg-primary px-8 py-10 text-primary-foreground lg:flex lg:items-center lg:justify-center xl:px-10 xl:py-12">
          <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-primary-foreground/10 blur-3xl" />

          <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-between gap-14 py-4 xl:gap-20">
            <div className="flex w-full justify-center">
              <div className="h-64 w-48 rounded-4xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 shadow-lg shadow-black/10">
                <div className="mx-auto h-2 w-16 rounded-full bg-primary-foreground/35" />
                <div className="mt-6 space-y-2">
                  <div className="h-3 w-full rounded bg-primary-foreground/20" />
                  <div className="h-3 w-10/12 rounded bg-primary-foreground/20" />
                </div>
                <div className="mt-5 space-y-3">
                  <div className="h-8 rounded bg-primary-foreground/20" />
                  <div className="h-8 rounded bg-primary-foreground/20" />
                  <div className="h-8 rounded bg-primary-foreground/20" />
                </div>
                <div className="mt-8 h-16 rounded bg-primary-foreground/20" />
              </div>
            </div>

            <div className="w-full space-y-4">
              <h2 className="max-w-sm text-3xl font-semibold leading-tight tracking-tight xl:text-4xl">
                Reliable local services at your fingertips.
              </h2>
              <p className="max-w-md text-base leading-relaxed text-primary-foreground/80">
                Join thousands of users who trust ServiceHub for their everyday professional needs.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-sm font-medium text-primary-foreground/90">
                <CheckCircle2 className="size-4" />
                Trusted by 10k+ users
              </div>
            </div>
          </div>
        </aside>

        <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
          {children}
        </div>
      </section>
    </main>
  );
}
