"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

interface PageTransitionProviderProps {
  children: React.ReactNode;
}

/**
 * Wraps the application in AnimatePresence to enable
 * smooth exit animations when navigating between pages.
 * Uses pathname as the unique key for each page.
 */
export function PageTransitionProvider({
  children,
}: PageTransitionProviderProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <React.Fragment key={pathname}>{children}</React.Fragment>
    </AnimatePresence>
  );
}
