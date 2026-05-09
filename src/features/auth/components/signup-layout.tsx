import { AuthSplitLayout } from "@/features/auth/components/auth-split-layout";
import { SignupForm } from "@/features/auth/components/signup-form";

export function SignupLayout() {
  return (
    <AuthSplitLayout>
      <SignupForm />
    </AuthSplitLayout>
  );
}
