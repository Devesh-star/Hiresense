"use client";

import { useRouter } from "next/navigation";
import { GraduationCap, Mic, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { dashboardData } from "@/data/mockData";

const iconMap = {
  GraduationCap,
  Mic,
  Users,
};

export function NextSteps() {
  const router = useRouter();
  const { toast } = useToast();

  const handleStepClick = (title: string) => {
    toast(`Opening resource: ${title}`, "info");
  };

  const handleSchedule = () => {
    toast("Starting mock interview session...", "success");
    setTimeout(() => router.push("/interview"), 500);
  };

  return (
    <div className="bg-surface-container-low p-6 rounded-2xl hover-lift">
      <h2 className="text-lg font-bold font-headline text-on-surface mb-6">
        Next Steps
      </h2>
      <ul className="space-y-4">
        {dashboardData.nextSteps.map((step) => {
          const Icon = iconMap[step.icon as keyof typeof iconMap];
          return (
            <li
              key={step.title}
              onClick={() => handleStepClick(step.title)}
              className="flex gap-4 group cursor-pointer"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded bg-surface-variant flex items-center justify-center group-hover:bg-primary transition-colors">
                <Icon className="w-4 h-4 text-primary group-hover:text-on-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-1.5">
                  {step.title}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <Button
        onClick={handleSchedule}
        className="w-full mt-8 py-3 hover:shadow-[0_0_30px_rgba(133,173,255,0.3)]"
      >
        Schedule Mock Interview
      </Button>
    </div>
  );
}
