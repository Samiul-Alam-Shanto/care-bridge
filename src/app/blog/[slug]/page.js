import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-foreground mb-4">
        Article Coming Soon
      </h1>
      <p className="text-muted-foreground max-w-md mb-8">
        We are currently migrating our content management system. This article
        will be available shortly.
      </p>
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-foreground font-bold hover:bg-stone-200 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>
    </div>
  );
}
