"use client";

import { useState } from "react";
import { axiosSecure } from "@/lib/axios";
import { Wallet, ArrowRight, Loader2, Landmark } from "lucide-react";
import toast from "react-hot-toast";

export default function WalletPage() {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (amount < 500) return toast.error("Minimum withdrawal is ৳500");

    setLoading(true);
    try {
      await axiosSecure.post("/provider/payout", {
        amount,
        bankDetails: { bankName, accountNo },
      });
      toast.success("Withdrawal Requested Successfully!");
      setAmount("");
      setBankName("");
      setAccountNo("");
    } catch (error) {
      toast.error("Request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl dark:bg-emerald-900/30">
            <Wallet className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Wallet</h1>
            <p className="text-sm text-muted-foreground">
              Withdraw your earnings to your bank.
            </p>
          </div>
        </div>

        <form onSubmit={handleWithdraw} className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block text-foreground">
              Withdrawal Amount (৳)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
                ৳
              </span>
              <input
                type="number"
                required
                min="500"
                placeholder="0.00"
                className="w-full p-3 pl-10 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary font-bold text-lg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Minimum withdrawal: ৳500
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium mb-1.5 block text-foreground">
                Bank Name
              </label>
              <div className="relative">
                <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Brac Bank"
                  className="w-full p-3 pl-10 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block text-foreground">
                Account Number
              </label>
              <input
                type="text"
                required
                placeholder="XXXX-XXXX-XXXX"
                className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Request Payout <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
