"use client";

import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import { Loader2, Trash2, Shield, User, RefreshCw } from "lucide-react"; // Added RefreshCw
import toast from "react-hot-toast";
import Image from "next/image";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await axiosSecure.get("/admin/users");
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // NEW: Handle Role Change
  const handleRoleChange = async (id, newRole) => {
    const toastId = toast.loading("Updating role...");
    try {
      await axiosSecure.put("/admin/users", { userId: id, role: newRole });
      toast.success("Role updated", { id: toastId });
      fetchUsers(); // Refresh UI
    } catch (error) {
      toast.error("Failed to update", { id: toastId });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Permanently ban this user?")) return;
    try {
      await axiosSecure.delete(`/admin/users?id=${id}`);
      toast.success("User banned");
      fetchUsers();
    } catch (error) {
      toast.error("Failed");
    }
  };

  if (loading)
    return (
      <div className="p-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        User Management
      </h1>

      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-border bg-card shadow-sm gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 rounded-full bg-stone-100 overflow-hidden shrink-0">
                <Image
                  src={user.image || "/placeholder.jpg"}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-foreground">{user.name}</h4>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Role Dropdown */}
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground font-bold uppercase mb-1">
                  Role
                </span>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="bg-stone-50 border border-border rounded-lg text-sm px-2 py-1.5 focus:ring-2 focus:ring-primary outline-none"
                  disabled={user.role === "admin"} // Prevent changing own admin role easily
                >
                  <option value="user">User</option>
                  <option value="caregiver">Caregiver</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Actions */}
              {user.role !== "admin" && (
                <button
                  onClick={() => handleDelete(user._id)}
                  className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  title="Ban User"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
