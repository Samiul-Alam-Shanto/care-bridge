import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login | CareBridge",
  description: "Sign in to access your bookings and care management dashboard.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
      <LoginForm />
    </div>
  );
}
