"use client";

import { CheckCircle, CircleDot, Circle, Headset, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { interviewData } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

const statusConfig = {
  completed: {
    Icon: CheckCircle,
    fill: true,
    classes: "text-on-surface-variant opacity-60",
    iconClass: "text-secondary",
  },
  active: {
    Icon: CircleDot,
    fill: true,
    classes: "bg-surface-container-high text-primary rounded-lg",
    iconClass: "text-primary",
  },
  pending: {
    Icon: Circle,
    fill: false,
    classes:
      "text-on-surface-variant hover:bg-surface-bright rounded-lg",
    iconClass: "text-on-surface-variant",
  },
};

interface InterviewSidebarProps {
  onExit?: () => void;
  onSupport?: () => void;
  progressPercent?: number;
}

export function InterviewSidebar({ onExit, onSupport, progressPercent }: InterviewSidebarProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      toast("Interview ended early. Progress saved.", "info");
      router.push("/dashboard");
    }
  };

  const handleSupport = () => {
    if (onSupport) {
      onSupport();
    } else {
      toast("Connecting to support team...", "info");
    }
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full flex-col pt-20 bg-surface-container-low w-64 border-r border-outline-variant/[0.15] shadow-[40px_0_40px_rgba(25,37,64,0.08)] z-40">
      {/* Progress Header */}
      <div className="px-6 py-8">
        <h2 className="text-lg font-bold text-on-surface font-headline mb-1">
          Interview Progress
        </h2>
        <p className="font-body text-sm font-medium text-on-surface-variant">
          {progressPercent ?? interviewData.completionPercent}% Completed
        </p>
      </div>

      {/* Progress Nodes */}
      <nav className="flex-1 space-y-1">
        {interviewData.progress.map((step) => {
          const config = statusConfig[step.status];
          const { Icon } = config;
          return (
            <div
              key={step.label}
              className={cn(
                "flex items-center gap-3 p-3 mx-2 transition-all duration-300 ease-in-out cursor-default",
                config.classes
              )}
            >
              <Icon
                className={cn("w-5 h-5", config.iconClass)}
                fill={config.fill ? "currentColor" : "none"}
              />
              <span className="font-body text-sm font-medium">
                {step.label}
              </span>
            </div>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 mt-auto space-y-4">
        <Button
          variant="secondary"
          size="sm"
          className="w-full uppercase tracking-wider"
        >
          View Guidelines
        </Button>
        <div className="border-t border-outline-variant/10 pt-4 space-y-1">
          <div 
            onClick={handleSupport}
            className="flex items-center gap-3 text-on-surface-variant p-2 hover:bg-surface-bright rounded-lg cursor-pointer transition-colors"
          >
            <Headset className="w-4 h-4" />
            <span className="text-xs">Support</span>
          </div>
          <div 
            onClick={handleExit}
            className="flex items-center gap-3 text-on-surface-variant p-2 hover:bg-surface-bright rounded-lg cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs">Exit</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
