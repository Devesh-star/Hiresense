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
    <>
      <TopNavBar variant="dashboard" />
      <Sidebar />
      <PageTransition>
        <main className="ml-64 pt-24 px-8 pb-12">{children}</main>
      </PageTransition>
      <FloatingChatButton />
    </>
  );
}
