import { ShieldCheck, HeartHandshake, Clock, BadgeCheck } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, text: "Background Checked" },
  { icon: BadgeCheck, text: "Verified Professionals" },
  { icon: HeartHandshake, text: "Insured Service" },
  { icon: Clock, text: "24/7 Support" },
];

export default function TrustBar() {
  return (
    <div className="w-full border-b border-border bg-background py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-3 md:flex-row md:justify-start"
            >
              <div className="flex h-12 w-12 text-center items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <span className="text-sm  font-semibold  md:text-base">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
