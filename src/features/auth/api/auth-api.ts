import type { SignupFormValues } from "@/features/auth/schemas";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://service-hub-server-roan.vercel.app/api/v1";

export const PENDING_SIGNUP_STORAGE_KEY = "servicehub:pending-signup";
export const PENDING_LOGIN_STORAGE_KEY = "servicehub:pending-login";

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

type ApiErrorShape = {
  message?: string;
};

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: "customer" | "provider" | "admin";
  avatar: {
    url: string;
    publicId: string;
  };
};

export type AuthSuccessPayload = {
  token: string;
  user: AuthUser;
};

export type AppRole = "customer" | "provider";

export async function sendSignupOtp(email: string): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error(await readApiErrorMessage(response));
  }

  const payload = (await response.json()) as ApiResponse<null>;
  return { message: payload.message || "OTP sent successfully." };
}

export async function signupWithOtp(input: SignupFormValues & { otp: string }): Promise<AuthSuccessPayload> {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(await readApiErrorMessage(response));
  }

  const payload = (await response.json()) as ApiResponse<AuthSuccessPayload>;
  return payload.data;
}

export async function chooseRole(token: string, role: AppRole): Promise<AuthSuccessPayload> {
  const response = await fetch(`${API_BASE_URL}/auth/choose-role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    throw new Error(await readApiErrorMessage(response));
  }

  const payload = (await response.json()) as ApiResponse<AuthSuccessPayload>;
  return payload.data;
}

export async function sendLoginOtp(email: string): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/auth/login/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error(await readApiErrorMessage(response));
  }

  const payload = (await response.json()) as ApiResponse<null>;
  return { message: payload.message || "Login OTP sent successfully." };
}

export async function loginWithOtp(input: { email: string; otp: string }): Promise<AuthSuccessPayload> {
  const response = await fetch(`${API_BASE_URL}/auth/login/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(await readApiErrorMessage(response));
  }

  const payload = (await response.json()) as ApiResponse<AuthSuccessPayload>;
  return payload.data;
}

async function readApiErrorMessage(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as ApiErrorShape;
    return payload.message || "Something went wrong. Please try again.";
  } catch {
    return "Something went wrong. Please try again.";
  }
}
