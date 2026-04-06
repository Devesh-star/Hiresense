"use client";

import { HeroScore } from "@/components/dashboard/HeroScore";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { QuestionBreakdown } from "@/components/dashboard/QuestionBreakdown";
import { AIRecommendedPitch } from "@/components/dashboard/AIRecommendedPitch";
import { RadarChartWidget } from "@/components/dashboard/RadarChartWidget";
import { NextSteps } from "@/components/dashboard/NextSteps";
import {
  StaggerContainer,
  FadeInUp,
  ScaleIn,
  SlideInRight,
} from "@/components/motion/MotionPrimitives";
import { dashboardData } from "@/data/mockData";

export default function PerformancePage() {
  return (
    <StaggerContainer delayStart={0.05} staggerInterval={0.1}>
      <FadeInUp>
        <HeroScore />
      </FadeInUp>

      <FadeInUp>
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          delayStart={0}
          staggerInterval={0.08}
        >
          {dashboardData.metrics.map((metric) => (
            <ScaleIn key={metric.label}>
              <MetricCard
                label={metric.label}
                score={metric.score}
                icon={metric.icon}
                barHeights={metric.barHeights}
                barOpacities={metric.barOpacities}
              />
            </ScaleIn>
          ))}
        </StaggerContainer>
      </FadeInUp>

      <FadeInUp>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <StaggerContainer
            className="lg:col-span-8 space-y-8"
            delayStart={0}
            staggerInterval={0.12}
          >
            <FadeInUp>
              <QuestionBreakdown />
            </FadeInUp>
            <FadeInUp>
              <AIRecommendedPitch />
            </FadeInUp>
          </StaggerContainer>

          <StaggerContainer
            className="lg:col-span-4 space-y-8"
            delayStart={0.1}
            staggerInterval={0.12}
          >
            <SlideInRight>
              <RadarChartWidget />
            </SlideInRight>
            <SlideInRight>
              <NextSteps />
            </SlideInRight>
          </StaggerContainer>
        </div>
      </FadeInUp>
    </StaggerContainer>
  );
}
