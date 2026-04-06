import { Brain } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { interviewData } from "@/data/mockData";

export function AIStatusIndicator() {
  const { aiAnalysis } = interviewData;

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em]">
        Live Analysis
      </h3>

      {/* Listening Card */}
      <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-secondary ai-pulse" />
          <span className="text-sm font-semibold text-secondary">
            {aiAnalysis.listening.status}
          </span>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          {aiAnalysis.listening.description}
        </p>
      </div>

      {/* Speech Pace Card */}
      <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-on-surface">
            {aiAnalysis.speechPace.label}
          </span>
          <span className="text-xs font-bold text-primary">
            {aiAnalysis.speechPace.status}
          </span>
        </div>
        <ProgressBar value={aiAnalysis.speechPace.progress} />
        <p className="mt-3 text-xs text-on-surface-variant leading-relaxed">
          {aiAnalysis.speechPace.description}
        </p>
      </div>

      {/* Content Relevance Card */}
      <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/10">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-4 h-4 text-tertiary" />
          <span className="text-sm font-semibold text-on-surface">
            {aiAnalysis.contentRelevance.label}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {aiAnalysis.contentRelevance.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded bg-secondary-container/20 text-secondary text-[10px] font-bold uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
