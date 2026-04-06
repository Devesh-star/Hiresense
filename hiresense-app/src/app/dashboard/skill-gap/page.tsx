"use client";

import { BookOpen, ExternalLink, AlertTriangle, CheckCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { skillGapData as mockSkillGapData, dashboardData as mockDashboardData } from "@/data/mockData";
import {
  StaggerContainer,
  FadeInUp,
  ScaleIn,
} from "@/components/motion/MotionPrimitives";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, Cell
} from 'recharts';

const priorityColors = {
  high: "bg-error/10 text-error border-error/20",
  medium: "bg-tertiary/10 text-tertiary border-tertiary/20",
};

export default function SkillGapPage() {
  const [skillGapData, setSkillGapData] = useState(mockSkillGapData);
  const [dashboardData, setDashboardData] = useState(mockDashboardData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const rawReport = sessionStorage.getItem("hiresense_report");
    if (rawReport) {
      try {
        const report = JSON.parse(rawReport);
        if (report.skillGapData) {
          setSkillGapData(report.skillGapData);
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
            Skill Gap Analysis
          </h1>
          <p className="text-on-surface-variant mt-2 text-lg">
            Comparing {dashboardData.fullName}&apos;s skills against the{" "}
            <span className="text-primary font-semibold">{dashboardData.role}</span> requirements.
          </p>
        </div>
      </FadeInUp>

      {/* Skill Bars */}
      {/* Skill Bars */}
      <FadeInUp>
        <div className="bg-surface-container-low rounded-2xl p-8 mb-8 border border-outline-variant/10 relative group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
          <h2 className="text-lg font-bold font-headline text-on-surface mb-2">
            Skills vs. Requirements
          </h2>
          <p className="text-sm text-on-surface-variant mb-6">Interactive comparison of your current proficiency vs. role expectations.</p>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={skillGapData.required.map(s => ({ name: s.skill, Current: s.current, Required: s.required, gap: s.gap }))} 
                layout="vertical" 
                margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.5)" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 500 }} width={150} axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#192540', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Required" fill="rgba(255,255,255,0.15)" radius={[0, 4, 4, 0]} barSize={16} />
                <Bar dataKey="Current" radius={[0, 4, 4, 0]} barSize={16}>
                  {skillGapData.required.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.gap > 0 ? '#ffb4ab' : '#69f6b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillGapData.required.filter(s => s.gap > 0).map((skill) => (
              <div key={skill.skill} className="flex items-center gap-2 p-3 rounded-lg bg-error/10 border border-error/20">
                <AlertTriangle className="w-4 h-4 text-error flex-shrink-0" />
                <span className="text-sm font-medium text-error">
                  <span className="font-bold">{skill.skill}:</span> {skill.gap}% gap — improvement needed
                </span>
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
            {/* Optional chaining and fallback for recommendations to prevent crash */}
            {(skillGapData.recommendations || []).map((rec) => (
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
