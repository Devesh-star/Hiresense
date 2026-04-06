"use client";

import { Heart, MessageCircle, Star } from "lucide-react";
import { cultureFitData, dashboardData } from "@/data/mockData";
import {
  StaggerContainer,
  FadeInUp,
  ScaleIn,
} from "@/components/motion/MotionPrimitives";

function ScoreRing({ score, label }: { score: number; label: string }) {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 10) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(133,173,255,0.1)" strokeWidth="6" />
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke={score >= 8 ? "#69f6b8" : score >= 7 ? "#85adff" : "#fbabff"}
            strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-black font-headline text-on-surface">{score}</span>
        </div>
      </div>
      <span className="text-xs font-semibold text-on-surface-variant text-center">{label}</span>
    </div>
  );
}

export default function CultureFitPage() {
  return (
    <StaggerContainer delayStart={0.05} staggerInterval={0.08}>
      {/* Header */}
      <FadeInUp>
        <div className="mb-10">
          <h1 className="text-3xl font-black font-headline text-on-surface tracking-tight">
            Culture Fit Assessment
          </h1>
          <p className="text-on-surface-variant mt-2 text-lg">
            Behavioral analysis and cultural alignment for{" "}
            <span className="text-primary font-semibold">{dashboardData.fullName}</span>.
          </p>
        </div>
      </FadeInUp>

      {/* Overall + Dimension Rings */}
      <FadeInUp>
        <div className="bg-surface-container-low rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-5 h-5 text-tertiary" />
            <h2 className="text-lg font-bold font-headline text-on-surface">
              Cultural Dimensions
            </h2>
            <div className="ml-auto text-sm text-on-surface-variant">
              Overall: <span className="text-2xl font-black text-on-surface ml-1">{cultureFitData.overallScore}</span>/10
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {cultureFitData.dimensions.map((dim) => (
              <ScoreRing key={dim.name} score={dim.score} label={dim.name} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
            {cultureFitData.dimensions.map((dim) => (
              <div key={dim.name} className="text-center">
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {dim.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeInUp>

      {/* Behavioral Highlights */}
      <FadeInUp>
        <div className="bg-surface-container-low rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold font-headline text-on-surface">
              Behavioral Interview Highlights
            </h2>
          </div>
          <StaggerContainer className="space-y-6" delayStart={0} staggerInterval={0.1}>
            {cultureFitData.behavioralHighlights.map((item, i) => (
              <FadeInUp key={i}>
                <div className="bg-surface-container-high rounded-xl p-6 border border-outline-variant/10">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-bold text-primary italic flex-1 mr-4">
                      &quot;{item.question}&quot;
                    </h3>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Star className="w-4 h-4 text-secondary" fill="currentColor" />
                      <span className="text-lg font-black font-headline text-on-surface">
                        {item.rating}
                      </span>
                      <span className="text-xs text-on-surface-variant">/10</span>
                    </div>
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed">
                    {item.response}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </StaggerContainer>
        </div>
      </FadeInUp>
    </StaggerContainer>
  );
}
