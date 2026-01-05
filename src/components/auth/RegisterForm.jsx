"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { uploadToImgBB } from "@/lib/upload";
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
    try {
      // 1. Image Upload
      const file = data.image[0];
      if (!file) throw new Error("Please upload a profile picture");

      toast.loading("Uploading image...", { id: "upload" });
      const imageUrl = await uploadToImgBB(file);
      toast.dismiss("upload");

      // 2. API Call
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          nid: data.nid,
          password: data.password,
          image: imageUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      // 3. Success
      toast.success("Account created successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
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
              required: "Phone number is required",
              pattern: {
                value: /^(\+880|01)[0-9]{9}$/,
                message: "Valid BD number required (+880 or 01...)",
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
              minLength: {
                value: 10,
                message: "NID usually has at least 10 digits",
              },
            })}
            type="number"
            className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="National ID Number"
          />
          {errors.nid && (
            <p className="text-xs text-red-500">{errors.nid.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">
            Profile Picture
          </label>
          <input
            {...register("image", { required: "Profile picture required" })}
            type="file"
            accept="image/*"
            className="w-full cursor-pointer rounded-lg border border-dashed border-input bg-background px-4 py-2 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
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
                message: "Must contain 1 uppercase & 1 lowercase letter",
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary py-3 text-primary-foreground font-semibold shadow-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Processing...
            </span>
          ) : (
            "Register"
          )}
        </button>
      </form>

      {/* Login Link */}
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
