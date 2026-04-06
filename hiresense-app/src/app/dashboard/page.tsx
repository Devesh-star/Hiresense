"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mic, BarChart3, Brain, Users, BadgeCheck,
  ArrowRight, TrendingUp, Clock, Target,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { dashboardData, reportsData, candidatesData } from "@/data/mockData";
import {
  StaggerContainer,
  FadeInUp,
  ScaleIn,
} from "@/components/motion/MotionPrimitives";

const quickLinks = [
  {
    label: "Performance",
    description: "Detailed score breakdown & question analysis",
    href: "/dashboard/performance",
    icon: BarChart3,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Skill Gap",
    description: "Skills vs. role requirements analysis",
    href: "/dashboard/skill-gap",
    icon: Brain,
    color: "text-tertiary",
    bg: "bg-tertiary/10",
  },
  {
    label: "Culture Fit",
    description: "Behavioral & cultural alignment scores",
    href: "/dashboard/culture-fit",
    icon: Users,
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    label: "Final Verdict",
    description: "AI hiring recommendation & summary",
    href: "/dashboard/verdict",
    icon: BadgeCheck,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export default function OverviewPage() {
  const router = useRouter();

  return (
    <StaggerContainer delayStart={0.05} staggerInterval={0.1}>
      {/* Welcome Header */}
      <FadeInUp>
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black font-headline text-on-surface tracking-tight">
              Welcome back, {dashboardData.candidateName}
            </h1>
            <p className="text-on-surface-variant mt-2 text-lg">
              Here&apos;s a quick snapshot of your interview journey.
            </p>
          </div>
          <Button
            onClick={() => router.push("/interview")}
            size="lg"
            className="flex items-center gap-2 shadow-lg hover:shadow-primary/20"
          >
            <Mic className="w-5 h-5" />
            Start New Interview
          </Button>
        </div>
      </FadeInUp>

      {/* Stats Overview */}
      <FadeInUp>
        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          delayStart={0}
          staggerInterval={0.06}
        >
          {[
            {
              label: "Hireability Score",
              value: `${dashboardData.hireabilityScore}/10`,
              sub: dashboardData.percentile,
              icon: Target,
              accent: "text-primary",
            },
            {
              label: "Interviews Taken",
              value: reportsData.totalInterviews,
              sub: `Avg ${reportsData.averageScore}/10`,
              icon: Clock,
              accent: "text-tertiary",
            },
            {
              label: "Improvement Rate",
              value: reportsData.improvementRate,
              sub: "vs. last month",
              icon: TrendingUp,
              accent: "text-secondary",
            },
            {
              label: "Candidate Rank",
              value: `#2 / ${candidatesData.totalApplicants}`,
              sub: "96th percentile",
              icon: BarChart3,
              accent: "text-primary",
            },
          ].map((stat) => (
            <ScaleIn key={stat.label}>
              <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10 hover-lift">
                <stat.icon className={`w-5 h-5 ${stat.accent} mb-3`} />
                <p className="text-2xl font-black font-headline text-on-surface">
                  {stat.value}
                </p>
                <p className="text-xs text-on-surface-variant mt-1 font-medium">
                  {stat.label}
                </p>
                <p className="text-[10px] text-on-surface-variant/60 mt-0.5">
                  {stat.sub}
                </p>
              </div>
            </ScaleIn>
          ))}
        </StaggerContainer>
      </FadeInUp>

      {/* Quick Score Preview */}
      <FadeInUp>
        <div className="bg-surface-container-low rounded-2xl p-6 mb-8 border border-outline-variant/10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold font-headline text-on-surface">
              Latest Scores
            </h2>
            <Link
              href="/dashboard/performance"
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
            >
              View Details <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {dashboardData.metrics.map((metric) => (
              <div key={metric.label} className="flex items-center gap-4">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(133,173,255,0.1)" strokeWidth="4" />
                    <circle
                      cx="24" cy="24" r="20" fill="none"
                      stroke={metric.score >= 8.5 ? "#69f6b8" : metric.score >= 7.5 ? "#85adff" : "#fbabff"}
                      strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={`${(metric.score / 10) * 125.6} 125.6`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-black font-headline text-on-surface">
                      {metric.score}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-surface">{metric.label}</p>
                  <p className="text-xs text-on-surface-variant">
                    {metric.score >= 8.5 ? "Excellent" : metric.score >= 7.5 ? "Good" : "Needs Work"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInUp>

      {/* Quick Nav Cards */}
      <FadeInUp>
        <h2 className="text-lg font-bold font-headline text-on-surface mb-4">
          Explore Your Analysis
        </h2>
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          delayStart={0}
          staggerInterval={0.08}
        >
          {quickLinks.map((link) => (
            <ScaleIn key={link.label}>
              <div
                onClick={() => router.push(link.href)}
                className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10 hover-lift cursor-pointer group flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-xl ${link.bg} flex items-center justify-center flex-shrink-0`}>
                  <link.icon className={`w-6 h-6 ${link.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {link.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </ScaleIn>
          ))}
        </StaggerContainer>
      </FadeInUp>

      {/* Recent Activity */}
      <FadeInUp>
        <div className="mt-8 bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold font-headline text-on-surface">
              Recent Activity
            </h2>
            <Link
              href="/reports"
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
            >
              All Reports <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {reportsData.reports.slice(0, 3).map((report) => (
              <div
                key={report.id}
                onClick={() => router.push("/dashboard/performance")}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-bright/50 cursor-pointer transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-black text-primary">{report.score}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                    {report.title}
                  </p>
                  <p className="text-xs text-on-surface-variant">{report.date} · {report.duration}</p>
                </div>
                <div className="flex gap-1.5">
                  {report.strengths.slice(0, 2).map((s) => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInUp>
    </StaggerContainer>
  );
}
