"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How do you verify caregivers?",
    answer:
      "Every caregiver undergoes a 5-step process: National ID verification, Criminal Background Check, Face-to-Face Interview, Skill Assessment, and Health Screening.",
  },
  {
    question: "Is my payment safe?",
    answer:
      "Yes. We hold your payment in a secure escrow account. The caregiver is only paid after the service is completed satisfactorily.",
  },
  {
    question: "Can I interview a caregiver before booking?",
    answer:
      "Absolutely. You can schedule a free 15-minute video 'Meet & Greet' or a paid 1-hour physical interview before confirming a long-term booking.",
  },
  {
    question: "What if the caregiver cancels last minute?",
    answer:
      "We have a Replacement Guarantee. If a caregiver cancels, our system immediately notifies nearby backup professionals to ensure you are never left without support.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-foreground">
                  {faq.question}
                </span>
                <span
                  className={`rounded-full p-1 transition-colors ${
                    openIndex === index
                      ? "bg-primary text-white"
                      : "bg-stone-100 text-stone-500 dark:bg-stone-800"
                  }`}
                >
                  {openIndex === index ? (
                    <Minus className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
