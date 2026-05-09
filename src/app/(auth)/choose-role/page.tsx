import { ChooseRoleForm } from "@/features/auth/components/choose-role-form";

export default function ChooseRolePage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center bg-muted/50 px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-background/55 backdrop-blur-[2px]" />
      <div className="relative z-10 w-full max-w-4xl">
        <ChooseRoleForm />
      </div>
    </main>
  );
}
