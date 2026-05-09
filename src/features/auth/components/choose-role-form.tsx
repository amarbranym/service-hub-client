"use client";

import { useMutation } from "@tanstack/react-query";
import { BriefcaseBusiness, MoveRight, UserRoundSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { chooseRole } from "@/features/auth/api/auth-api";
import { notifyAuthChanged } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RoleOption = "customer" | "provider";

const ROLE_OPTIONS: Array<{
  id: RoleOption;
  title: string;
  description: string;
  actionLabel: string;
  icon: typeof UserRoundSearch;
}> = [
  {
    id: "customer",
    title: "I want to Book a Service",
    description:
      "Find and hire verified local professionals for any task, from home repairs to personal wellness.",
    actionLabel: "Continue as Customer",
    icon: UserRoundSearch,
  },
  {
    id: "provider",
    title: "I want to Provide a Service",
    description:
      "Grow your business, manage bookings, and reach new customers with our professional toolkit.",
    actionLabel: "Become a Provider",
    icon: BriefcaseBusiness,
  },
];

export function ChooseRoleForm() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleOption>("customer");
  const [apiError, setApiError] = useState("");

  const chooseRoleMutation = useMutation({
    mutationFn: async (role: RoleOption) => {
      const token = localStorage.getItem("servicehub_token");
      if (!token) {
        throw new Error("Session expired. Please sign up again.");
      }
      return chooseRole(token, role);
    },
    onSuccess: (data, role) => {
      localStorage.setItem("servicehub_token", data.token);
      localStorage.setItem("servicehub_user", JSON.stringify(data.user));
      notifyAuthChanged();
      if (role === "provider") {
        router.push("/dashboard/provider");
        return;
      }
      router.push("/find-services");
    },
  });

  const handleContinue = async (role: RoleOption = selectedRole) => {
    try {
      setApiError("");
      await chooseRoleMutation.mutateAsync(role);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Failed to set role.");
    }
  };

  return (
    <div className="w-full max-w-3xl p-6 r sm:p-8">
      <p className="text-center text-xs font-semibold tracking-[0.14em] text-primary">STEP 3 OF 3</p>
      <h1 className="mt-2 text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        How would you like to use ServiceHub?
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Select your primary role to customize your experience.
      </p>

      <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
        {ROLE_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isActive = selectedRole === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelectedRole(option.id)}
              className={cn(
                "rounded-xl border p-4 text-left transition-colors",
                "hover:border-primary/40 hover:bg-accent/40",
                isActive && "border-primary/60 bg-accent/30",
              )}
            >
              <span className="mb-4 inline-flex rounded-lg border bg-muted p-2 text-muted-foreground">
                <Icon className="size-5" />
              </span>
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
                {option.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{option.description}</p>
              <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                {option.actionLabel}
                <MoveRight className="size-4" />
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-9 flex flex-col items-center gap-3">
        {apiError ? <p className="text-xs text-destructive">{apiError}</p> : null}
        <Button
          type="button"
          className="h-10 w-full max-w-xs rounded-md"
          disabled={chooseRoleMutation.isPending}
          onClick={() => handleContinue(selectedRole)}
        >
          {chooseRoleMutation.isPending ? "Saving..." : "Continue"}
        </Button>
        <button
          type="button"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
          disabled={chooseRoleMutation.isPending}
          onClick={() => handleContinue("customer")}
        >
          I&apos;ll decide later
        </button>
      </div>
    </div>
  );
}
