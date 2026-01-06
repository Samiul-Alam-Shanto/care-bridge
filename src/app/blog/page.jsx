import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";

export const metadata = {
  title: "CareBridge Blog | News & Tips",
  description:
    "Expert advice on elderly care, child development, and health tips.",
};

const posts = [
  {
    id: 1,
    title: "5 Signs Your Parents Need Home Care",
    excerpt:
      "Recognizing the early warning signs can help you provide the right support for your aging loved ones before an emergency happens.",
    category: "Elderly Care",
    date: "Oct 12, 2024",
    author: "Dr. Sarah Khan",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800",
    slug: "signs-parents-need-care",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Hiring a Nanny",
    excerpt:
      "What to look for, what questions to ask, and how to verify credentials when inviting a caregiver into your home for your children.",
    category: "Child Care",
    date: "Sep 28, 2024",
    author: "Fatima Rahman",
    image:
      "https://images.unsplash.com/photo-1502781252888-9143ba7f074e?q=80&w=800",
    slug: "hiring-nanny-guide",
  },
  {
    id: 3,
    title: "Post-Surgery Recovery at Home",
    excerpt:
      "Tips for managing pain, mobility, and hygiene after a major surgery. How professional patient support can speed up recovery.",
    category: "Medical",
    date: "Sep 15, 2024",
    author: "Nurse Kamal",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800",
    slug: "post-surgery-tips",
  },
  {
    id: 4,
    title: "Understanding Dementia Care",
    excerpt:
      "Dementia requires patience and specialized skills. Learn how to communicate effectively and create a safe environment.",
    category: "Special Needs",
    date: "Aug 10, 2024",
    author: "Dr. Anisul Haque",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800",
    slug: "dementia-care-101",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Latest Updates
          </h1>
          <p className="text-muted-foreground text-lg">
            Expert advice, company news, and caregiving tips from our
            professional team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider text-stone-900 rounded-md">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {post.author}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                  {post.excerpt}
                </p>

                <div className="mt-auto">
                  {/* Since we don't have individual pages yet, link to self or a coming soon */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center font-bold text-primary text-sm hover:underline"
                  >
                    Read Article <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
