import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact Us | CareBridge",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex justify-self-center items-center bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Side */}
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-6">
              Get in touch
            </h1>
            <p className="text-muted-foreground text-lg mb-12">
              Have questions about our services or need help with a booking? Our
              support team is available 24/7.
            </p>

            <div className="space-y-8">
              <ContactItem
                icon={Phone}
                title="Phone"
                detail="+880 1700-000000"
              />
              <ContactItem
                icon={Mail}
                title="Email"
                detail="support@carebridge.com"
              />
              <ContactItem
                icon={MapPin}
                title="Office"
                detail="House 12, Road 4, Dhanmondi, Dhaka"
              />
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-3xl border border-border">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  rows={4}
                  className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon: Icon, title, detail }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-lg font-bold text-foreground">{detail}</p>
      </div>
    </div>
  );
}
