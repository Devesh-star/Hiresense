"use client";

import { dashboardData } from "@/data/mockData";
import {
  StaggerContainer,
  MaskedLineReveal,
  FadeInUp,
  ParallaxLayer,
} from "@/components/motion/MotionPrimitives";
import { motion, type Variants } from "framer-motion";

/* ─── Score gauge animation variant ──────────────────────────────────────── */
const gaugeVariants: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.2,
    },
  },
};

const scoreTextVariants: Variants = {
  hidden: { scale: 0.4, opacity: 0, filter: "blur(8px)" },
  visible: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.5,
    },
  },
};

export function HeroScore() {
  return (
    <div className="mb-12 flex flex-col md:flex-row items-center gap-12 relative">
      {/* ── Parallax background elements ─────────────────────────────── */}
      <ParallaxLayer
        speed={0.15}
        className="absolute -top-16 -left-16 w-72 h-72 pointer-events-none"
      >
        <div className="w-full h-full rounded-full bg-primary/[0.03] blur-3xl" />
      </ParallaxLayer>

      <ParallaxLayer
        speed={0.25}
        invert
        className="absolute -bottom-20 right-10 w-56 h-56 pointer-events-none"
      >
        <div className="w-full h-full rounded-full bg-secondary/[0.04] blur-3xl" />
      </ParallaxLayer>

      {/* ── Score Gauge ──────────────────────────────────────────────── */}
      <motion.div
        variants={gaugeVariants}
        initial="hidden"
        animate="visible"
        className="relative w-48 h-48 flex items-center justify-center flex-shrink-0"
      >
        <div className="absolute inset-0 rounded-full score-gauge opacity-20 animate-shimmer-glow" />
        <div className="absolute inset-2 rounded-full bg-surface" />

        {/* Animated score number */}
        <motion.div
          variants={scoreTextVariants}
          initial="hidden"
          animate="visible"
          className="relative text-center"
        >
          <div className="text-5xl font-black font-headline text-on-surface">
            {dashboardData.hireabilityScore}
          </div>
          <div className="text-on-surface-variant font-label uppercase tracking-widest text-[10px]">
            Hireability Score
          </div>
        </motion.div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full shadow-[0_0_60px_rgba(133,173,255,0.15)] pointer-events-none" />
      </motion.div>

      {/* ── Hero Text with staggered masked reveal ───────────────────── */}
      <StaggerContainer
        className="flex-1 space-y-4 text-center md:text-left relative z-10"
        delayStart={0.4}
        staggerInterval={0.12}
      >
        {/* Line 1 — "Congratulations," */}
        <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-on-surface">
          <MaskedLineReveal>
            <span>Congratulations,</span>
          </MaskedLineReveal>
          <MaskedLineReveal>
            <span>{dashboardData.candidateName}!</span>
          </MaskedLineReveal>
        </h1>

        {/* Body text */}
        <FadeInUp offset={16} duration={0.7}>
          <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Your interview performance ranks in the{" "}
            <span className="text-secondary font-bold">
              {dashboardData.percentile}
            </span>{" "}
            of applicants for the Senior Architect role. The AI has identified
            significant strengths in technical depth and leadership readiness.
          </p>
        </FadeInUp>
      </StaggerContainer>
    </div>
  );
}
