"use client";

import { BookOpen, ExternalLink, AlertTriangle, CheckCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { skillGapData, dashboardData } from "@/data/mockData";
import {
  StaggerContainer,
  FadeInUp,
  ScaleIn,
} from "@/components/motion/MotionPrimitives";

const priorityColors = {
  high: "bg-error/10 text-error border-error/20",
  medium: "bg-tertiary/10 text-tertiary border-tertiary/20",
};

export default function SkillGapPage() {
  return (
    <StaggerContainer delayStart={0.05} staggerInterval={0.08}>
      {/* Header */}
      <FadeInUp>
        <div className="mb-10">
          <h1 className="text-3xl font-black font-headline text-on-surface tracking-tight">
            Skill Gap Analysis
          </h1>
          <p className="text-on-surface-variant mt-2 text-lg">
            Comparing {dashboardData.fullName}&apos;s skills against the{" "}
            <span className="text-primary font-semibold">{dashboardData.role}</span> requirements.
          </p>
        </div>
      </FadeInUp>

      {/* Skill Bars */}
      <FadeInUp>
        <div className="bg-surface-container-low rounded-2xl p-8 mb-8">
          <h2 className="text-lg font-bold font-headline text-on-surface mb-6">
            Skills vs. Requirements
          </h2>
          <div className="space-y-6">
            {skillGapData.required.map((skill) => (
              <div key={skill.skill}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-on-surface">
                    {skill.skill}
                  </span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-on-surface-variant">
                      Required: {skill.required}%
                    </span>
                    <span className={skill.gap > 0 ? "text-error font-bold" : "text-secondary font-bold"}>
                      You: {skill.current}%
                    </span>
                  </div>
                </div>
                <div className="relative h-3 bg-surface-container-highest rounded-full overflow-hidden">
                  {/* Required level marker */}
                  <div
                    className="absolute top-0 h-full border-r-2 border-dashed border-on-surface-variant/40 z-10"
                    style={{ left: `${skill.required}%` }}
                  />
                  {/* Current level bar */}
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      skill.gap > 0 ? "bg-gradient-to-r from-error/60 to-error" : "bg-gradient-to-r from-secondary/60 to-secondary"
                    }`}
                    style={{ width: `${skill.current}%` }}
                  />
                </div>
                {skill.gap > 0 && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <AlertTriangle className="w-3 h-3 text-error" />
                    <span className="text-xs text-error">
                      {skill.gap}% gap — improvement needed
                    </span>
                  </div>
                )}
                {skill.gap === 0 && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <CheckCircle className="w-3 h-3 text-secondary" />
                    <span className="text-xs text-secondary">Meets or exceeds requirement</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </FadeInUp>

      {/* Recommended Resources */}
      <FadeInUp>
        <div className="bg-surface-container-low rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold font-headline text-on-surface">
              Recommended Learning Resources
            </h2>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4" delayStart={0} staggerInterval={0.06}>
            {skillGapData.recommendations.map((rec) => (
              <ScaleIn key={rec.title}>
                <div className="bg-surface-container-high rounded-xl p-5 border border-outline-variant/10 hover-lift group cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${priorityColors[rec.priority]}`}>
                      {rec.priority} priority
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-sm font-bold text-on-surface mb-1">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    {rec.provider} · {rec.duration}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-3 gap-1 px-0">
                    <ExternalLink className="w-3 h-3" />
                    Start Learning
                  </Button>
                </div>
              </ScaleIn>
            ))}
          </StaggerContainer>
        </div>
      </FadeInUp>
    </StaggerContainer>
  );
}
