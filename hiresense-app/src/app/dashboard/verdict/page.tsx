"use client";

import { BadgeCheck, ThumbsUp, ThumbsDown, Trophy, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { verdictData as mockVerdictData, dashboardData as mockDashboardData } from "@/data/mockData";
import {
  StaggerContainer,
  FadeInUp,
  ScaleIn,
} from "@/components/motion/MotionPrimitives";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip as RechartsTooltip
} from 'recharts';

const recommendationColors = {
  "Strong Hire": "text-secondary bg-secondary/10 border-secondary/30",
  "Hire": "text-primary bg-primary/10 border-primary/30",
  "Lean Hire": "text-tertiary bg-tertiary/10 border-tertiary/30",
  "No Hire": "text-error bg-error/10 border-error/30",
};

export default function VerdictPage() {
  const router = useRouter();
  const [verdictData, setVerdictData] = useState(mockVerdictData);
  const [dashboardData, setDashboardData] = useState(mockDashboardData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const rawReport = sessionStorage.getItem("hiresense_report");
    if (rawReport) {
      try {
        const report = JSON.parse(rawReport);
        if (report.verdictData) {
          setVerdictData(report.verdictData);
        }
        if (report.dashboardData) {
          setDashboardData(report.dashboardData);
        }
      } catch (err) {
        console.error("Failed to parse AI report:", err);
      }
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

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

      {/* Category Scores / Radar Chart & Detailed Analysis */}
      <FadeInUp>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 relative group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
            <h2 className="text-lg font-bold font-headline text-on-surface mb-2">
              Weighted Score Breakdown
            </h2>
            <p className="text-sm text-on-surface-variant mb-6">Interactive view of your performance across key dimensions.</p>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={verdictData.categoryScores}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="score" stroke="#85adff" fill="#85adff" fillOpacity={0.4} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#192540', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 flex flex-col justify-center">
             <h2 className="text-lg font-bold font-headline text-on-surface mb-6">
              Detailed AI Analysis
            </h2>
            <div className="space-y-6">
               <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/10">
                  <h3 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2"><Trophy className="w-4 h-4"/> Key Differentiator</h3>
                  <p className="text-sm text-on-surface-variant">The candidate&apos;s deep understanding of React internals places them in the top 4% of applicants. Their technical depth significantly outperforms the average pool.</p>
               </div>
               <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/10">
                  <h3 className="text-sm font-semibold text-tertiary mb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4"/> Recommendation & Action Plan</h3>
                  <p className="text-sm text-on-surface-variant">We recommend proceeding with a follow-up interview focusing on System Design edge-cases. The candidate should prioritize succinctness when answering behavioral questions, perhaps using the STAR method.</p>
               </div>
            </div>
          </div>
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
