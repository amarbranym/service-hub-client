import { z } from "zod";

const phoneRegex = /^[+]?[0-9()\-\s]{7,20}$/;

const normalizeOptional = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

export const signupSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name must be 50 characters or less."),
  lastName: z
    .string()
    .optional()
    .transform(normalizeOptional)
    .refine((value) => !value || value.length <= 50, {
      message: "Last name must be 50 characters or less.",
    }),
  email: z.email("Please enter a valid email."),
  phoneNumber: z
    .string()
    .optional()
    .transform(normalizeOptional)
    .refine((value) => !value || phoneRegex.test(value), {
      message: "Please enter a valid phone number.",
    }),
});

export const loginSchema = z.object({
  email: z.email("Please enter a valid email."),
});

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .trim()
    .length(8, "Enter the 8-digit verification code.")
    .regex(/^\d+$/, "OTP must contain digits only."),
});

export type SignupFormValues = z.input<typeof signupSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;
