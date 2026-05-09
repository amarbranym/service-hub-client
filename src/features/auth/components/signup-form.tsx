"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PENDING_SIGNUP_STORAGE_KEY, sendSignupOtp } from "@/features/auth/api/auth-api";
import { signupSchema, SignupFormValues } from "@/features/auth/schemas";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: keyof SignupFormValues;
  label: string;
  placeholder: string;
  error?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  withIcon?: "mail" | "phone";
  register: ReturnType<typeof useForm<SignupFormValues>>["register"];
};

function FormField({
  id,
  label,
  placeholder,
  error,
  type = "text",
  autoComplete,
  withIcon,
  register,
}: FormFieldProps) {
  const Icon = withIcon === "mail" ? Mail : withIcon === "phone" ? Phone : null;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-foreground/80">
        {label}
      </label>
      <div className="relative">
        {Icon ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center text-muted-foreground">
            <Icon className="size-4" />
          </span>
        ) : null}
        <Input
          id={id}
          type={type}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className={cn("h-10 bg-background", Icon && "pl-9", error && "border-destructive")}
          placeholder={placeholder}
          {...register(id)}
        />
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

export function SignupForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const sendOtpMutation = useMutation({
    mutationFn: sendSignupOtp,
  });

  const onSubmit = async (values: SignupFormValues) => {
    try {
      setApiError("");
      await sendOtpMutation.mutateAsync(values.email);
      sessionStorage.setItem(PENDING_SIGNUP_STORAGE_KEY, JSON.stringify(values));
      router.push("/verify-otp");
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Failed to send OTP.");
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border bg-card p-5 shadow-sm sm:p-7 lg:p-8">
      <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground sm:mt-2 sm:text-4xl">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Let&apos;s get started with your basic information.
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-6">
        <span className="h-1 rounded-full bg-primary" />
        <span className="h-1 rounded-full bg-border" />
        <span className="h-1 rounded-full bg-border" />
      </div>

      <form className="mt-5 space-y-4 sm:mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            id="firstName"
            label="First Name"
            placeholder="Jane"
            error={errors.firstName?.message}
            autoComplete="given-name"
            register={register}
          />
          <FormField
            id="lastName"
            label="Last Name (optional)"
            placeholder="Doe"
            error={errors.lastName?.message}
            autoComplete="family-name"
            register={register}
          />
        </div>

        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="jane.doe@example.com"
          error={errors.email?.message}
          autoComplete="email"
          withIcon="mail"
          register={register}
        />

        <FormField
          id="phoneNumber"
          label="Phone Number (optional)"
          type="tel"
          placeholder="+1 (555) 000-0000"
          error={errors.phoneNumber?.message}
          autoComplete="tel"
          withIcon="phone"
          register={register}
        />

        <p className="text-xs leading-relaxed text-muted-foreground">
          By continuing, you agree to ServiceHub&apos;s{" "}
          <Link href="#" className="font-medium text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="font-medium text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        {apiError ? <p className="text-xs text-destructive">{apiError}</p> : null}

        <Button
          type="submit"
          className="h-10 w-full rounded-md"
          disabled={isSubmitting || sendOtpMutation.isPending}
        >
          {isSubmitting || sendOtpMutation.isPending ? "Sending OTP..." : "Continue"}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
