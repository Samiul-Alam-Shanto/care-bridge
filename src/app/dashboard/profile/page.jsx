"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { axiosSecure } from "@/lib/axios";
import { axiosPublic } from "@/lib/axios"; // Use for ImgBB
import { toast } from "react-hot-toast";
import { Loader2, Upload, User, Phone, Mail, Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  // Fetch Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosSecure.get("/user/profile");
        setFormData({
          name: data.user.name || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          image: data.user.image || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Could not load profile data");
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchProfile();
  }, [session]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be smaller than 2MB");
      return;
    }

    const toastId = toast.loading("Uploading image...");
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const url = res.data.data.url;
      setFormData((prev) => ({ ...prev, image: url }));
      toast.success("Image uploaded", { id: toastId });
    } catch (error) {
      toast.error("Upload failed", { id: toastId });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // 1. Update Database
      await axiosSecure.put("/user/profile", {
        name: formData.name,
        phone: formData.phone,
        image: formData.image,
      });

      // 2. Update Client Session (This updates the Navbar immediately)
      // We pass the structure exactly as we want it in the JWT
      await update({
        user: {
          name: formData.name,
          image: formData.image,
          phone: formData.phone,
        },
      });

      // 3. Force Refresh to ensure server components update
      router.refresh();

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your personal information and profile picture.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Pic */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Profile Picture
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-background shadow-md bg-stone-100">
              <Image
                src={formData.image || "https://i.pravatar.cc/150?u=user"}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <label className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                <Upload className="h-4 w-4" />
                Upload New Photo
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/png, image/jpeg"
                />
              </label>
              <p className="mt-2 text-xs text-muted-foreground">
                Supports JPG, PNG (Max 2MB).
              </p>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" /> Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" /> Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" /> Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2.5 text-muted-foreground cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lg hover:bg-emerald-700 disabled:opacity-50 transition-all"
          >
            {saving ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
