import { Sparkles } from "lucide-react";
import { interviewData } from "@/data/mockData";

export function AICoachTip() {
  return (
    <div className="mt-auto">
      <div className="p-4 rounded-2xl bg-gradient-to-br from-surface-variant to-surface-container-low border border-outline-variant/20">
        <p className="text-xs font-medium text-on-surface-variant italic leading-relaxed">
          {interviewData.aiCoachTip}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-[10px] font-bold text-primary uppercase">
            HireSense AI Coach
          </span>
        </div>
      </div>
    </div>
  );
}
