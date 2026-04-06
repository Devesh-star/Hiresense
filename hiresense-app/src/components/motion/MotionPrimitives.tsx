"use client";

import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

/* ─── Shared Easing ──────────────────────────────────────────────────────── */
const expoOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Stagger Container ─────────────────────────────────────────────────── */

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before the stagger sequence starts (seconds). Default: 0.1 */
  delayStart?: number;
  /** Stagger interval between children (seconds). Default: 0.08 */
  staggerInterval?: number;
}

const containerVariants = (
  delayStart: number,
  staggerInterval: number
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: delayStart,
      staggerChildren: staggerInterval,
    },
  },
});

/**
 * Orchestrates staggered entrance of children.
 * Wrap child elements with FadeInUp / ScaleIn / SlideInRight etc.
 */
export function StaggerContainer({
  children,
  className,
  delayStart = 0.1,
  staggerInterval = 0.08,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants(delayStart, staggerInterval)}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Fade In Up ─────────────────────────────────────────────────────────── */

interface FadeInUpProps {
  children: React.ReactNode;
  className?: string;
  /** Override the vertical offset in px. Default: 24 */
  offset?: number;
  /** Override duration in seconds. Default: 0.6 */
  duration?: number;
}

const fadeInUpVariants = (offset: number, duration: number): Variants => ({
  hidden: { opacity: 0, y: offset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: expoOut },
  },
});

export function FadeInUp({
  children,
  className,
  offset = 24,
  duration = 0.6,
}: FadeInUpProps) {
  return (
    <motion.div
      variants={fadeInUpVariants(offset, duration)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Scale In ───────────────────────────────────────────────────────────── */

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  /** Starting scale. Default: 0.92 */
  from?: number;
  duration?: number;
}

const scaleInVariants = (from: number, duration: number): Variants => ({
  hidden: { opacity: 0, scale: from },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, ease: expoOut },
  },
});

export function ScaleIn({
  children,
  className,
  from = 0.92,
  duration = 0.5,
}: ScaleInProps) {
  return (
    <motion.div
      variants={scaleInVariants(from, duration)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Slide In Right ─────────────────────────────────────────────────────── */

interface SlideInRightProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  duration?: number;
}

const slideInRightVariants = (
  offset: number,
  duration: number
): Variants => ({
  hidden: { opacity: 0, x: offset },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, ease: expoOut },
  },
});

export function SlideInRight({
  children,
  className,
  offset = 30,
  duration = 0.6,
}: SlideInRightProps) {
  return (
    <motion.div
      variants={slideInRightVariants(offset, duration)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Masked Text Reveal ─────────────────────────────────────────────────── */

interface MaskedLineRevealProps {
  /** The text line to reveal */
  children: React.ReactNode;
  className?: string;
  /** Duration of the slide-up per line (seconds). Default: 0.7 */
  duration?: number;
}

const lineRevealVariants = (duration: number): Variants => ({
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration, ease: expoOut },
  },
});

/**
 * A single line that slides up from a clipped mask container.
 * Wrap each line of text in this component for a staggered reveal.
 */
export function MaskedLineReveal({
  children,
  className,
  duration = 0.7,
}: MaskedLineRevealProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        variants={lineRevealVariants(duration)}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Parallax Layer ─────────────────────────────────────────────────────── */

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  /** How much slower/faster relative to scroll. e.g. 0.3 = 30% speed. Default: 0.3 */
  speed?: number;
  /** Whether to invert the parallax direction. Default: false */
  invert?: boolean;
}

/**
 * Applies a subtle scroll-linked parallax offset using `useScroll`.
 * Place behind other content for depth. Uses `will-change: transform`
 * and hardware-accelerated transforms for performance.
 */
export function ParallaxLayer({
  children,
  className,
  speed = 0.3,
  invert = false,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const factor = invert ? speed : -speed;
  const y = useTransform(scrollYProgress, [0, 1], [
    `${factor * -100}px`,
    `${factor * 100}px`,
  ]);

  return (
    <motion.div
      ref={ref}
      style={{ y, willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
