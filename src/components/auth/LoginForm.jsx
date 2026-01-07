"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import DemoCredentials from "../DemoCredentials";
export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Verifying credentials...");
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        // Dismiss loading and show error
        toast.error("Invalid Email or Password", { id: toastId });
        setLoading(false);
        return;
      }
      toast.dismiss(toastId);
      // Login Successful
      toast.success("Welcome back!");

      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      toast.error("An unexpected error occurred", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl bg-card p-8 shadow-xl border border-border">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to manage your care
        </p>
      </div>
      <DemoCredentials />

      <button
        onClick={handleGoogleLogin}
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background py-2.5 text-sm font-medium text-foreground hover:bg-stone-50 hover:text-primary transition-colors dark:hover:bg-stone-900"
      >
        <FcGoogle className="h-5 w-5 text-primary" />
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="******"
            className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary py-3 text-white font-semibold shadow-md hover:bg-emerald-700 disabled:opacity-50 transition-all"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline underline-offset-4"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
