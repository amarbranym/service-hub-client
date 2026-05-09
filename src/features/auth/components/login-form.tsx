"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginFormValues, loginSchema } from "@/features/auth/schemas";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    // Step-1 only. OTP verification is the next screen.
    console.log("login-step-1", values);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border bg-card p-5 shadow-sm sm:p-7 lg:p-8">
      <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground sm:mt-2 sm:text-4xl">
        Login to your account
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter your email to receive a secure verification code.
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-6">
        <span className="h-1 rounded-full bg-primary" />
        <span className="h-1 rounded-full bg-border" />
        <span className="h-1 rounded-full bg-border" />
      </div>

      <form className="mt-5 space-y-4 sm:mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-foreground/80">
            Email
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center text-muted-foreground">
              <Mail className="size-4" />
            </span>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              className={cn("h-10 bg-background pl-9", errors.email && "border-destructive")}
              placeholder="jane.doe@example.com"
              {...register("email")}
            />
          </div>
          {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
        </div>

        <Button type="submit" className="h-10 w-full rounded-md" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : "Continue"}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
