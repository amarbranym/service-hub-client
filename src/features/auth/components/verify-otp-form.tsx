"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  PENDING_SIGNUP_STORAGE_KEY,
  sendSignupOtp,
  signupWithOtp,
} from "@/features/auth/api/auth-api";
import { notifyAuthChanged } from "@/lib/auth-store";
import { verifyOtpSchema, VerifyOtpFormValues } from "@/features/auth/schemas";
import type { SignupFormValues } from "@/features/auth/schemas";

export function VerifyOtpForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string>("");
  const [pendingSignup] = useState<SignupFormValues | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem(PENDING_SIGNUP_STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as SignupFormValues;
    } catch {
      sessionStorage.removeItem(PENDING_SIGNUP_STORAGE_KEY);
      return null;
    }
  });
  const [countdown, setCountdown] = useState(30);

  const maskedEmail = (() => {
    if (!pendingSignup?.email) return "your email";
    const [name, domain] = pendingSignup.email.split("@");
    if (!name || !domain) return pendingSignup.email;
    const head = name.slice(0, 2);
    return `${head}${"*".repeat(Math.max(name.length - 2, 1))}@${domain}`;
  })();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    mode: "onBlur",
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (!pendingSignup) {
      router.replace("/signup");
    }
  }, [pendingSignup, router]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [countdown]);

  const signupMutation = useMutation({
    mutationFn: signupWithOtp,
    onSuccess: (data) => {
      localStorage.setItem("servicehub_token", data.token);
      localStorage.setItem("servicehub_user", JSON.stringify(data.user));
      notifyAuthChanged();
      sessionStorage.removeItem(PENDING_SIGNUP_STORAGE_KEY);
      router.push("/choose-role");
    },
  });

  const resendMutation = useMutation({
    mutationFn: sendSignupOtp,
  });

  const onSubmit = async (values: VerifyOtpFormValues) => {
    if (!pendingSignup) {
      router.push("/signup");
      return;
    }

    try {
      setApiError("");
      await signupMutation.mutateAsync({
        ...pendingSignup,
        otp: values.otp,
      });
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "OTP verification failed.");
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border bg-card p-5 shadow-sm sm:p-7 lg:p-8">
      <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground sm:mt-2 sm:text-4xl">
        Verify OTP
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter the 8-digit code sent to {maskedEmail} to continue.
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-6">
        <span className="h-1 rounded-full bg-primary" />
        <span className="h-1 rounded-full bg-primary/70" />
        <span className="h-1 rounded-full bg-border" />
      </div>

      <form className="mt-5 space-y-4 sm:mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-1.5">
          <label htmlFor="otp" className="text-xs font-semibold text-foreground/80">
            Verification code
          </label>
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <InputOTP
                id="otp"
                maxLength={8}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                autoComplete="one-time-code"
                inputMode="numeric"
                pattern="^[0-9]+$"
                aria-invalid={Boolean(errors.otp)}
                containerClassName="w-full justify-start"
                className="w-full"
              >
                <InputOTPGroup className="gap-0.5">
                  <InputOTPSlot index={0} className="size-10 text-base sm:size-11" />
                  <InputOTPSlot index={1} className="size-10 text-base sm:size-11" />
                  <InputOTPSlot index={2} className="size-10 text-base sm:size-11" />
                  <InputOTPSlot index={3} className="size-10 text-base sm:size-11" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup className="gap-0.5">
                  <InputOTPSlot index={4} className="size-10 text-base sm:size-11" />
                  <InputOTPSlot index={5} className="size-10 text-base sm:size-11" />
                  <InputOTPSlot index={6} className="size-10 text-base sm:size-11" />
                  <InputOTPSlot index={7} className="size-10 text-base sm:size-11" />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {errors.otp ? <p className="text-xs text-destructive">{errors.otp.message}</p> : null}
        </div>

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            disabled={countdown > 0 || resendMutation.isPending || !pendingSignup?.email}
            onClick={async () => {
              if (!pendingSignup?.email || countdown > 0) return;
              try {
                setApiError("");
                await resendMutation.mutateAsync(pendingSignup.email);
                setCountdown(30);
              } catch (error) {
                setApiError(error instanceof Error ? error.message : "Failed to resend OTP.");
              }
            }}
            className="font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {resendMutation.isPending ? "Resending..." : "Resend code"}
          </button>
          <span className="text-muted-foreground">{`00:${String(countdown).padStart(2, "0")}`}</span>
        </div>

        {apiError ? <p className="text-xs text-destructive">{apiError}</p> : null}

        <Button
          type="submit"
          className="h-10 w-full rounded-md"
          disabled={isSubmitting || signupMutation.isPending}
        >
          {isSubmitting || signupMutation.isPending ? "Verifying..." : "Verify and continue"}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Wrong email?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Go back
        </Link>
      </p>
    </div>
  );
}
