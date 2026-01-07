"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { uploadToImgBB } from "@/lib/upload";
import { axiosPublic } from "@/lib/axios"; // Use Axios
import { signIn } from "next-auth/react"; // IMPORT SIGN IN
import toast, { Toaster } from "react-hot-toast";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Creating account...");

    try {
      // 1. Upload Image
      const file = data.image[0];
      if (!file) throw new Error("Please upload a profile picture");
      const imageUrl = await uploadToImgBB(file);

      // 2. Register User in DB
      await axiosPublic.post("/auth/register", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        nid: data.nid,
        password: data.password,
        image: imageUrl,
      });

      // 3. AUTO-LOGIN (The Fix)
      toast.loading("Logging you in...", { id: toastId });

      const loginResult = await signIn("credentials", {
        redirect: false, // Don't redirect automatically, let us handle it
        email: data.email,
        password: data.password,
      });

      if (loginResult?.error) {
        throw new Error(
          "Account created, but auto-login failed. Please sign in manually."
        );
      }

      // 4. Success & Redirect
      toast.success("Welcome to CareBridge!", { id: toastId });
      router.refresh(); // Ensure session cookies are set
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      const msg =
        error.response?.data?.error || error.message || "Registration failed";

      // If the error was specifically "Auto-login failed", redirect to login
      if (msg.includes("auto-login failed")) {
        toast.error(msg, { id: toastId });
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(msg, { id: toastId });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl bg-card p-8 shadow-xl border border-border">
      <Toaster position="top-center" />

      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary tracking-tight">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Join CareBridge today
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">
            Full Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="Ex: John Doe"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">
            Email Address
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">
            Contact No
          </label>
          <input
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^(\+880|01)[0-9]{9}$/,
                message: "Valid BD number required",
              },
            })}
            type="tel"
            className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="+880 1XXX XXXXXX"
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* NID */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">
            NID Number
          </label>
          <input
            {...register("nid", {
              required: "NID is required",
              minLength: { value: 10, message: "Min 10 digits" },
            })}
            type="number"
            className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="National ID Number"
          />
          {errors.nid && (
            <p className="text-xs text-red-500">{errors.nid.message}</p>
          )}
        </div>

        {/* Image */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">
            Profile Picture
          </label>
          <input
            {...register("image", { required: "Profile picture required" })}
            type="file"
            accept="image/*"
            className="w-full cursor-pointer rounded-lg border border-dashed border-input bg-background px-4 py-2 text-sm text-muted-foreground"
          />
          {errors.image && (
            <p className="text-xs text-red-500">{errors.image.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password required",
              minLength: { value: 6, message: "Min 6 chars" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])/,
                message: "1 Upper & 1 Lower case",
              },
            })}
            type="password"
            className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="******"
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
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline underline-offset-4"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
