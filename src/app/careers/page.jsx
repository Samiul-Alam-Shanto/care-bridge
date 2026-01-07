"use client";

import { useState } from "react";
import { axiosSecure } from "@/lib/axios"; // Secure axios for our API
import { uploadToImgBB } from "@/lib/upload"; // Use the helper!
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Upload, Briefcase } from "lucide-react";
import { useSession } from "next-auth/react";

export default function CareersPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [nidFile, setNidFile] = useState(null);

  const [formData, setFormData] = useState({
    experienceYears: "",
    bio: "",
    skills: [],
  });

  const availableSkills = [
    "elderly-care",
    "baby-care",
    "patient-support",
    "special-needs",
    "physiotherapy",
  ];

  const handleSkillToggle = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // 2. Upload NID using Helper
      if (!nidFile) throw new Error("Please upload your NID document");

      // Toast for upload progress
      const uploadToast = toast.loading("Uploading document...");

      // USE THE HELPER HERE
      const nidUrl = await uploadToImgBB(nidFile);

      toast.dismiss(uploadToast); // Remove upload loading toast

      // 3. Submit Application to our API
      await axiosSecure.post("/user/apply", {
        ...formData,
        nidUrl,
      });

      toast.success("Application Submitted! Admin will review shortly.");
      router.push("/dashboard");
    } catch (error) {
      console.error("Application Error:", error);
      // The helper throws standard Error objects, so error.message works
      toast.error(error.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-background pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
            <Briefcase className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Join CareBridge
          </h1>
          <p className="text-muted-foreground mt-2">
            Share your skills and start earning.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Professional Bio
            </label>
            <textarea
              required
              rows={4}
              className="w-full rounded-xl border border-border bg-background p-3 focus:ring-2 focus:ring-primary outline-none"
              placeholder="Tell us about your experience..."
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              required
              className="w-full rounded-xl border border-border bg-background p-3 focus:ring-2 focus:ring-primary outline-none"
              placeholder="e.g. 3"
              onChange={(e) =>
                setFormData({ ...formData, experienceYears: e.target.value })
              }
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Select your Skills
            </label>
            <div className="flex flex-wrap gap-3">
              {availableSkills.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    formData.skills.includes(skill)
                      ? "bg-primary text-white border-primary"
                      : "bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:border-stone-700"
                  }`}
                >
                  {skill.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* NID Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload NID / Passport
            </label>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
              <input
                type="file"
                required
                accept="image/*"
                onChange={(e) => setNidFile(e.target.files[0])}
                className="hidden"
                id="nid-upload"
              />
              <label
                htmlFor="nid-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-foreground">
                  {nidFile ? nidFile.name : "Click to Upload Image"}
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-4 font-bold text-white hover:bg-emerald-700 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
