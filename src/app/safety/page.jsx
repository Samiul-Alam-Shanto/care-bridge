import {
  ShieldCheck,
  UserCheck,
  FileSearch,
  GraduationCap,
  Activity,
} from "lucide-react";

export const metadata = {
  title: "Safety Standards | CareBridge",
  description: "Our rigorous 5-step vetting process for caregivers.",
};

const steps = [
  {
    id: 1,
    title: "Identity Verification",
    desc: "We verify National ID (NID) and Passport details against government databases.",
    icon: UserCheck,
  },
  {
    id: 2,
    title: "Background Check",
    desc: "A comprehensive criminal record check to ensure clean history.",
    icon: FileSearch,
  },
  {
    id: 3,
    title: "Skill Assessment",
    desc: "Practical exams for nursing, childcare, and first aid procedures.",
    icon: GraduationCap,
  },
  {
    id: 4,
    title: "Health Screening",
    desc: "Verification of vaccination status and communicable disease testing.",
    icon: Activity,
  },
  {
    id: 5,
    title: "Behavioral Interview",
    desc: "Face-to-face interviews to assess patience, empathy, and communication.",
    icon: ShieldCheck,
  },
];

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-6">
          Your Safety is Our Priority
        </h1>
        <p className="text-xl text-muted-foreground">
          We reject 90% of applicants so you get the top 10%. Here is our
          rigorous vetting process.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="relative border-l-4 border-primary/20 ml-6 md:ml-10 space-y-12">
          {steps.map((step) => (
            <div key={step.id} className="relative pl-10 md:pl-16">
              {/* Timeline Dot */}
              <div className="absolute -left-3.5 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary border-4 border-background shadow-sm">
                <span className="h-2 w-2 rounded-full bg-white" />
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-stone-100 text-primary dark:bg-stone-800">
                  <step.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Step {step.id}: {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-100 dark:border-emerald-800 text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-emerald-600 mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            100% Insured Service
          </h3>
          <p className="text-muted-foreground">
            Every booking made through CareBridge is covered by our safety
            guarantee and liability insurance.
          </p>
        </div>
      </div>
    </div>
  );
}
