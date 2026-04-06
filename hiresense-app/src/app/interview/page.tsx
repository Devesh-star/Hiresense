import { InterviewClient } from "./InterviewClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interview Simulation | HireSense",
  description:
    "Practice your interview skills with AI-powered real-time feedback, voice analysis, and intelligent coaching.",
};

export default function InterviewPage() {
  return <InterviewClient />;
}
