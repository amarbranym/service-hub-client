"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PENDING_LOGIN_STORAGE_KEY, sendLoginOtp } from "@/features/auth/api/auth-api";
import { LoginFormValues, loginSchema } from "@/features/auth/schemas";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [apiError, setApiError] = useState("");

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

  const sendLoginOtpMutation = useMutation({
    mutationFn: sendLoginOtp,
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setApiError("");
      setIsLoginLoading(true);
      await sendLoginOtpMutation.mutateAsync(values.email);
      sessionStorage.setItem(PENDING_LOGIN_STORAGE_KEY, values.email);
      router.push("/verify-login-otp");
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Failed to send login OTP.");
    } finally {
      setIsLoginLoading(false);
    }
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

        {apiError ? <p className="text-xs text-destructive">{apiError}</p> : null}

        <Button type="submit" className="h-10 w-full rounded-md" disabled={isSubmitting || isLoginLoading}>
          {isSubmitting || isLoginLoading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              Logging in...
            </span>
          ) : (
            "Continue"
          )}
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
