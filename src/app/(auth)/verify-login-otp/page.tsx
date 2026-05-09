import { AuthSplitLayout } from "@/features/auth/components/auth-split-layout";
import { VerifyLoginOtpForm } from "@/features/auth/components/verify-login-otp-form";

export default function VerifyLoginOtpPage() {
  return (
    <AuthSplitLayout>
      <VerifyLoginOtpForm />
    </AuthSplitLayout>
  );
}
