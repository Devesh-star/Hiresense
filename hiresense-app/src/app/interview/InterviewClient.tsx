"use client";

import { useState } from "react";
import { TopNavBar } from "@/components/layout/TopNavBar";
import { InterviewSidebar } from "@/components/layout/InterviewSidebar";
import { QuestionDisplay } from "@/components/interview/QuestionDisplay";
import { AIVisualizer } from "@/components/interview/AIVisualizer";
import { RecordingControls } from "@/components/interview/RecordingControls";
import { AIStatusIndicator } from "@/components/interview/AIStatusIndicator";
import { AICoachTip } from "@/components/interview/AICoachTip";
import { interviewData } from "@/data/mockData";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

export function InterviewClient() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const currentQuestion = interviewData.questions[questionIndex];

  const handleSkip = () => {
    toast("Question skipped. Loading next question...", "info");
    if (questionIndex < interviewData.questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      toast("Interview complete!", "success");
      router.push("/dashboard");
    }
  };

  const handleSubmit = async (data?: { mode: "voice" | "type", audioBlob?: Blob, textInput?: string }) => {
    toast("Evaluating your answer via AI...", "info");

    try {
      if (data && data.mode === "voice" && data.audioBlob) {
        const formData = new FormData();
        formData.append("audio", data.audioBlob, "answer.webm");
        formData.append("question", currentQuestion.question);
        if (data.textInput) {
          formData.append("transcript", data.textInput);
        }
        
        const res = await fetch("http://localhost:5000/api/evaluate", {
          method: "POST",
          body: formData,
        });

        const resData = await res.json();
        if (resData.success) {
           const evalText = `AI Evaluation Score: ${resData.data.score}/10. Strengths: ${resData.data.strengths}.`;
           toast(evalText, "success");
           setEvaluations(prev => [...prev, { question: currentQuestion.question, evaluation: resData.data }]);
        } else {
           toast("Analysis failed.", "error");
        }
      } else {
        toast("Answer submitted textually.", "success");
        setEvaluations(prev => [...prev, { question: currentQuestion.question, evaluation: { score: 7, strengths: "Good effort textual" } }]);
      }
    } catch(err) {
      console.error("AI Evaluation error:", err);
      toast("Error connecting to AI backend. Check if it's running..", "error");
    }

    if (questionIndex < interviewData.questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      toast("Generating your complete final AI Report...", "info");
      try {
        const finalRes = await fetch("http://localhost:5000/api/evaluate/report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ evaluations })
        });
        const reportData = await finalRes.json();
        if (reportData.success) {
          sessionStorage.setItem("hiresense_report", JSON.stringify(reportData.data));
          toast("Interview complete and Report Built!", "success");
        } else {
          toast("Failed to generate report.", "error");
        }
      } catch (err) {
         console.error(err);
      }
      router.push("/dashboard");
    }
  };

  const handleExit = () => {
    toast("Interview ended early. Progress saved.", "info");
    router.push("/dashboard");
  };

  const handleSupport = () => {
    toast("Connecting to support team...", "info");
  };

  const progressPercent = Math.round(((questionIndex + 1) / interviewData.questions.length) * 100);

  return (
    <>
      <TopNavBar variant="interview" onExit={handleExit} onSupport={handleSupport} />

      <div className="flex h-screen pt-20">
        <InterviewSidebar onExit={handleExit} onSupport={handleSupport} progressPercent={progressPercent} />

        {/* Main Content Area */}
        <main className="lg:ml-64 flex-1 flex flex-col overflow-hidden relative w-full pt-16 lg:pt-0 pb-28 lg:pb-0">
          {/* Mobile Horizontal Progress Bar (Hidden on lg) */}
          <div className="lg:hidden absolute top-0 left-0 w-full px-6 py-4 bg-surface-container-low border-b border-outline-variant/10 z-10 flex items-center shadow-lg">
            <div className="flex-1 mr-4">
              <div className="flex justify-between text-xs mb-1.5 font-bold tracking-wider">
                <span className="text-on-surface">Interview Progress</span>
                <span className="text-primary">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="flex flex-col items-center">
              <QuestionDisplay 
                question={currentQuestion.question} 
                highlightedWords={currentQuestion.highlightedWords} 
                topic={currentQuestion.topic} 
              />
              <AIVisualizer />
            </div>
          </div>

          {/* Bottom Control Panel */}
          <RecordingControls onSkip={handleSkip} onSubmit={handleSubmit} />
        </main>

        {/* Right Side Panel (AI Indicators) */}
        <aside className="hidden lg:flex w-80 bg-surface-container-low border-l border-outline-variant/[0.15] p-6 space-y-8 flex-col z-20">
          <AIStatusIndicator />
          <AICoachTip />
        </aside>
      </div>
    </>
  );
}
