"use client";

import { TopNavBar } from "@/components/layout/TopNavBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { FloatingChatButton } from "@/components/dashboard/FloatingChatButton";
import { PageTransition } from "@/components/motion/PageTransition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransition>
      <TopNavBar variant="dashboard" />
      <Sidebar />
      <main className="ml-64 pt-24 px-8 pb-12">{children}</main>
      <FloatingChatButton />
    </PageTransition>
  );
}
