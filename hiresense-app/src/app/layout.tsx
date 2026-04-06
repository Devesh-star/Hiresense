import type { Metadata } from "next";
import "./globals.css";
import { PageTransitionProvider } from "@/components/motion/PageTransitionProvider";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "HireSense | AI-Powered Interview Intelligence",
  description:
    "HireSense is an AI-powered interview simulation and analytics platform that helps candidates ace their interviews with real-time feedback and detailed performance analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full bg-surface text-on-surface font-body selection:bg-primary selection:text-on-primary-container">
        <ToastProvider>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
