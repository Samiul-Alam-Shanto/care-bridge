import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Create Account | CareBridge",
  description:
    "Join CareBridge to find trusted babysitters, elderly care, and patient support in your area.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <RegisterForm />
    </div>
  );
}
