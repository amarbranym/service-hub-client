import { AuthSplitLayout } from "@/features/auth/components/auth-split-layout";
import { VerifyOtpForm } from "@/features/auth/components/verify-otp-form";

export default function VerifyOtpPage() {
  return (
    <AuthSplitLayout>
      <VerifyOtpForm />
    </AuthSplitLayout>
  );
}
