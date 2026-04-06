"use client";

import { BadgeCheck, ThumbsUp, ThumbsDown, Trophy, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { verdictData, dashboardData } from "@/data/mockData";
import {
  StaggerContainer,
  FadeInUp,
  ScaleIn,
} from "@/components/motion/MotionPrimitives";

const recommendationColors = {
  "Strong Hire": "text-secondary bg-secondary/10 border-secondary/30",
  "Hire": "text-primary bg-primary/10 border-primary/30",
  "Lean Hire": "text-tertiary bg-tertiary/10 border-tertiary/30",
  "No Hire": "text-error bg-error/10 border-error/30",
};

export default function VerdictPage() {
  const router = useRouter();

  return (
    <StaggerContainer delayStart={0.05} staggerInterval={0.08}>
      {/* Header */}
      <FadeInUp>
        <div className="mb-10">
          <h1 className="text-3xl font-black font-headline text-on-surface tracking-tight">
            Final Verdict
          </h1>
          <p className="text-on-surface-variant mt-2 text-lg">
            AI-generated hiring recommendation for{" "}
            <span className="text-primary font-semibold">{dashboardData.fullName}</span>.
          </p>
        </div>
      </FadeInUp>

      {/* Verdict Card */}
      <FadeInUp>
        <div className="bg-gradient-to-br from-surface-container-high to-surface-container-low rounded-2xl p-8 mb-8 border border-outline-variant/10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Big verdict badge */}
            <div className="flex flex-col items-center gap-3">
              <div className={`px-6 py-3 rounded-2xl border-2 font-black text-2xl font-headline ${
                recommendationColors[verdictData.recommendation as keyof typeof recommendationColors]
              }`}>
                {verdictData.recommendation}
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                <BadgeCheck className="w-4 h-4 text-primary" />
                <span>{verdictData.confidence}% AI Confidence</span>
              </div>
            </div>

            {/* Summary */}
            <div className="flex-1">
              <p className="text-on-surface leading-relaxed">
                {verdictData.summary}
              </p>
            </div>
          </div>

          {/* Pool comparison */}
          <div className="mt-8 flex items-center gap-6 bg-surface-container-highest/50 rounded-xl p-4">
            <Trophy className="w-6 h-6 text-secondary flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-on-surface">
                Ranked #{verdictData.compareToPool.rank} of {verdictData.compareToPool.totalCandidates} candidates
              </p>
              <p className="text-xs text-on-surface-variant">
                Top {100 - verdictData.compareToPool.percentile}% of the candidate pool for this role
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-secondary font-bold text-lg">
              <TrendingUp className="w-5 h-5" />
              {verdictData.compareToPool.percentile}th
            </div>
          </div>
        </div>
      </FadeInUp>

      {/* Category Scores */}
      <FadeInUp>
        <div className="bg-surface-container-low rounded-2xl p-8 mb-8">
          <h2 className="text-lg font-bold font-headline text-on-surface mb-6">
            Weighted Score Breakdown
          </h2>
          <StaggerContainer className="space-y-4" delayStart={0} staggerInterval={0.06}>
            {verdictData.categoryScores.map((cat) => (
              <ScaleIn key={cat.category}>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-on-surface w-32">
                    {cat.category}
                  </span>
                  <div className="flex-1 h-3 bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                      style={{ width: `${cat.score * 10}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-on-surface w-12 text-right">
                    {cat.score}/10
                  </span>
                  <span className="text-xs text-on-surface-variant w-16 text-right">
                    ×{(cat.weight * 100).toFixed(0)}%
                  </span>
                </div>
              </ScaleIn>
            ))}
          </StaggerContainer>
        </div>
      </FadeInUp>

      {/* Pros & Cons */}
      <FadeInUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <ThumbsUp className="w-5 h-5 text-secondary" />
              <h3 className="font-bold font-headline text-secondary">Strengths</h3>
            </div>
            <ul className="space-y-3">
              {verdictData.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-on-surface">
                  <span className="text-secondary mt-0.5">✓</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-error/5 border border-error/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <ThumbsDown className="w-5 h-5 text-error" />
              <h3 className="font-bold font-headline text-error">Areas to Improve</h3>
            </div>
            <ul className="space-y-3">
              {verdictData.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-on-surface">
                  <span className="text-error mt-0.5">✗</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeInUp>

      {/* Actions */}
      <FadeInUp>
        <div className="flex gap-4">
          <Button onClick={() => router.push("/interview")}>
            Schedule Follow-up Interview
          </Button>
          <Button variant="secondary" onClick={() => router.push("/candidates")}>
            Compare with Other Candidates
          </Button>
        </div>
      </FadeInUp>
    </StaggerContainer>
  );
}
