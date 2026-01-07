import Link from "next/link";
import { Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-stone-50 dark:bg-background overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-20 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-lg text-center px-4">
        <h1 className="text-9xl font-black text-stone-200 dark:text-stone-800 select-none">
          404
        </h1>

        <div className="-mt-12">
          <h2 className="text-3xl font-bold text-foreground">Page not found</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or doesn't exist.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition-transform hover:scale-105 active:scale-95"
          >
            <Home className="h-4 w-4" /> Go Home
          </Link>
          <Link
            href="/services"
            className="group flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 py-3.5 font-bold text-foreground transition-colors hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <Search className="h-4 w-4" /> Browse Services
          </Link>
        </div>

        {/* Footer Link */}
        <div className="mt-12">
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            Need help? Contact Support <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
