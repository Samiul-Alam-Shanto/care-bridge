"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Minus,
  ShieldQuestion,
  Wallet,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqCategories = [
  {
    title: "General & Safety",
    icon: ShieldQuestion,
    questions: [
      {
        q: "How do you verify caregivers?",
        a: "Every caregiver undergoes a strict 5-step process: NID verification, Criminal Background Check, Face-to-Face Interview, Skill Assessment, and Health Screening.",
      },
      {
        q: "Is CareBridge safe?",
        a: "Yes. All bookings are insured, and we track every service in real-time. We also have a 24/7 support team ready to intervene.",
      },
      {
        q: "What areas do you cover?",
        a: "We currently cover 64 districts in Bangladesh. You can check our specific coverage map on the Coverage page.",
      },
    ],
  },
  {
    title: "Billing & Payment",
    icon: Wallet,
    questions: [
      {
        q: "When do I pay?",
        a: "You pay securely via Stripe/Card/MFS when you confirm the booking. The money is held in an escrow account and released to the caregiver only after the job is completed.",
      },
      {
        q: "Can I get a refund?",
        a: "Yes. If you cancel 24 hours before the service starts, you get a full refund. If the caregiver cancels, you are refunded immediately.",
      },
      {
        q: "Are there hidden fees?",
        a: "No. The price you see at checkout includes the caregiver's rate and our platform service fee (5%).",
      },
    ],
  },
  {
    title: "Services",
    icon: UserCheck,
    questions: [
      {
        q: "Can I interview the caregiver?",
        a: "Yes! You can schedule a 'Meet & Greet' video call or a paid 1-hour trial session before booking a long-term service.",
      },
      {
        q: "What if I don't like the caregiver?",
        a: "We offer a Replacement Guarantee. Contact support, and we will send a new verified professional within 4 hours.",
      },
    ],
  },
];

export default function FaqPage() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [search, setSearch] = useState("");

  // Filter logic
  const filteredFaqs = faqCategories
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(search.toLowerCase()) ||
          q.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            How can we help?
          </h1>
          <p className="text-muted-foreground text-lg">
            Search for answers regarding bookings, safety, and payments.
          </p>

          <div className="relative max-w-lg mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full h-12 pl-12 pr-4 rounded-full border border-border bg-card shadow-sm focus:ring-2 focus:ring-primary outline-none transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Categories & Questions */}
        <div className="space-y-12">
          {filteredFaqs.map((category, catIndex) => (
            <div key={catIndex}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <category.icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((item, qIndex) => {
                  const id = `${catIndex}-${qIndex}`;
                  const isOpen = activeQuestion === id;

                  return (
                    <div
                      key={id}
                      className="bg-card border border-border rounded-xl overflow-hidden transition-all hover:border-primary/30"
                    >
                      <button
                        onClick={() => setActiveQuestion(isOpen ? null : id)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <span className="font-semibold text-foreground text-lg">
                          {item.q}
                        </span>
                        {isOpen ? (
                          <Minus className="h-5 w-5 text-primary" />
                        ) : (
                          <Plus className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                No matching questions found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
