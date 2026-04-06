"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Brain, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { dashboardData } from "@/data/mockData";

export function AIRecommendedPitch() {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(dashboardData.aiPitch);
    setIsCopied(true);
    toast("Pitch copied to clipboard!", "success");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePractice = () => {
    toast("Loading interview session...", "info");
    setTimeout(() => router.push("/interview"), 400);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-surface-container-high to-[#2a1438] shadow-xl hover-lift animate-gradient-shift">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-24 h-24" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center">
            <Brain className="w-5 h-5 text-on-tertiary-container" />
          </div>
          <h2 className="text-xl font-bold font-headline text-on-surface">
            AI Recommended Pitch
          </h2>
        </div>

        <p className="text-on-surface leading-loose text-lg font-medium italic">
          {dashboardData.aiPitch}
        </p>

        <div className="mt-8 flex gap-4">
          <Button onClick={handleCopy} className="flex items-center gap-2">
            {isCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {isCopied ? "Copied!" : "Copy to Clipboard"}
          </Button>
          <Button variant="secondary" onClick={handlePractice}>
            Practice Again
          </Button>
        </div>
      </div>
    </div>
  );
}
