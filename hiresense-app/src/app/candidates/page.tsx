"use client";

import { useRouter } from "next/navigation";
import {
  Search, Filter, Users, Briefcase, ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { TopNavBar } from "@/components/layout/TopNavBar";
import { PageTransition } from "@/components/motion/PageTransition";
import { Button } from "@/components/ui/Button";
import {
  StaggerContainer,
  FadeInUp,
  ScaleIn,
} from "@/components/motion/MotionPrimitives";
import { candidatesData } from "@/data/mockData";
import { FloatingChatButton } from "@/components/dashboard/FloatingChatButton";

const statusStyles = {
  shortlisted: "bg-secondary/10 text-secondary",
  "under-review": "bg-tertiary/10 text-tertiary",
  rejected: "bg-error/10 text-error",
};

const statusLabels = {
  shortlisted: "Shortlisted",
  "under-review": "Under Review",
  rejected: "Rejected",
};

export default function CandidatesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = candidatesData.candidates.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase())
      || c.topSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <PageTransition>
      <TopNavBar variant="dashboard" />
      <main className="max-w-6xl mx-auto pt-24 px-8 pb-12">
        <StaggerContainer delayStart={0.05} staggerInterval={0.08}>
          {/* Header */}
          <FadeInUp>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="text-3xl font-black font-headline text-on-surface tracking-tight">
                  Candidates
                </h1>
                <p className="text-on-surface-variant mt-2 text-lg">
                  {candidatesData.totalApplicants} applicants · {candidatesData.openPositions} open positions
                </p>
              </div>
              <Button onClick={() => router.push("/interview")} className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                New Interview
              </Button>
            </div>
          </FadeInUp>

          {/* Search & Filter */}
          <FadeInUp>
            <div className="flex gap-3 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  type="text"
                  placeholder="Search by name or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 text-sm rounded-xl pl-11 pr-4 py-3 border border-outline-variant/10 focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                {["all", "shortlisted", "under-review", "rejected"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      filterStatus === status
                        ? "bg-primary/10 text-primary border-primary/30"
                        : "bg-surface-container-low text-on-surface-variant border-outline-variant/10 hover:bg-surface-bright"
                    }`}
                  >
                    {status === "all" ? "All" : status === "under-review" ? "Review" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Candidates Grid */}
          <FadeInUp>
            <StaggerContainer className="space-y-3" delayStart={0} staggerInterval={0.06}>
              {filtered.map((candidate) => (
                <ScaleIn key={candidate.id}>
                  <div
                    onClick={() => router.push("/dashboard")}
                    className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10 hover-lift cursor-pointer group flex items-center gap-5"
                  >
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-black text-white">{candidate.avatar}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                        {candidate.name}
                      </h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        {candidate.role} · Interviewed {candidate.interviewDate}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {candidate.topSkills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-center flex-shrink-0 mr-2">
                      <div className="text-2xl font-black font-headline text-on-surface">
                        {candidate.score}
                      </div>
                      <div className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                        /10
                      </div>
                    </div>

                    {/* Status + Arrow */}
                    <span className={`text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${
                      statusStyles[candidate.status]
                    }`}>
                      {statusLabels[candidate.status]}
                    </span>
                    <ChevronRight className="w-5 h-5 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                </ScaleIn>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <Users className="w-12 h-12 text-on-surface-variant/30 mx-auto mb-4" />
                  <p className="text-on-surface-variant text-sm">No candidates match your search.</p>
                </div>
              )}
            </StaggerContainer>
          </FadeInUp>
        </StaggerContainer>
      </main>
      <FloatingChatButton />
    </PageTransition>
  );
}
