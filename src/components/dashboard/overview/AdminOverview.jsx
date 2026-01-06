"use client";

import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import {
  Users,
  DollarSign,
  ShieldAlert,
  Activity,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Link from "next/link";
import { format } from "date-fns";

// Colors for the Pie Chart
const COLORS = ["#059669", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"];

export default function AdminOverview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosSecure.get("/admin/stats").then((res) => setData(res.data.stats));
  }, []);

  if (!data)
    return (
      <div className="p-10 text-center animate-pulse">Loading Analytics...</div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Console</h1>
          <p className="text-muted-foreground">
            Platform performance overview.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          System Operational
        </div>
      </div>

      {/* 1. KEY METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`৳${data.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend="+12.5%"
          color="text-emerald-600"
          bg="bg-emerald-100"
        />
        <StatCard
          title="Pending Applications"
          value={data.pendingApps}
          icon={ShieldAlert}
          actionLink="/dashboard/admin/applications"
          color="text-orange-600"
          bg="bg-orange-100"
        />
        <StatCard
          title="Total Users"
          value={data.totalUsers}
          icon={Users}
          trend="+5 new today"
          color="text-blue-600"
          bg="bg-blue-100"
        />
        <StatCard
          title="Active Jobs"
          value={data.activeBookings}
          icon={Activity}
          color="text-purple-600"
          bg="bg-purple-100"
        />
      </div>

      {/* 2. CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Trend (Area Chart) */}
        <div className="lg:col-span-2 bg-card border border-border p-6 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-foreground">Revenue Trend</h3>
            <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
              <TrendingUp className="h-4 w-4" />
              <span className="font-bold">Growth</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  tickFormatter={(val) => `৳${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value) => [
                    `৳${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#059669"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Distribution (Pie Chart) */}
        <div className="bg-card border border-border p-6 rounded-3xl shadow-sm">
          <h3 className="font-bold text-lg text-foreground mb-4">
            Top Services
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Distribution based on total bookings
            </p>
          </div>
        </div>
      </div>

      {/* 3. RECENT ACTIVITY FEED */}
      <div className="bg-card border border-border p-6 rounded-3xl shadow-sm">
        <h3 className="font-bold text-lg text-foreground mb-6">
          Recent Live Activity
        </h3>
        <div className="space-y-4">
          {data.recentActivity.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-xl bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    New Booking:{" "}
                    <span className="text-primary">{item.serviceTitle}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Provider: {item.caregiverName} •{" "}
                    {format(new Date(item.createdAt), "MMM d, h:mm a")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">৳{item.totalCost}</p>
                <span className="text-[10px] uppercase font-bold text-muted-foreground">
                  {item.status.replace("_", " ")}
                </span>
              </div>
            </div>
          ))}
          {data.recentActivity.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No recent activity.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper Card Component
function StatCard({ title, value, icon: Icon, color, bg, trend, actionLink }) {
  return (
    <div className="p-6 rounded-3xl border border-border bg-card shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`h-12 w-12 rounded-2xl flex items-center justify-center ${bg} ${color}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-foreground tracking-tight">
          {value}
        </h3>
      </div>
      {actionLink && (
        <Link
          href={actionLink}
          className="mt-4 text-xs font-bold text-primary flex items-center hover:underline"
        >
          Manage <ArrowUpRight className="h-3 w-3 ml-1" />
        </Link>
      )}
    </div>
  );
}
