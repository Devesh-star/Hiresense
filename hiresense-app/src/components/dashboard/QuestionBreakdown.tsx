import { CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { dashboardData } from "@/data/mockData";

export function QuestionBreakdown() {
  const { questionBreakdown: q } = dashboardData;

  // Parse transcript to highlight filler words
  const renderTranscript = () => {
    const parts = q.transcript.split(/<\/?filler>/);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        // This is a filler word
        return (
          <span key={i} className="bg-error/20 text-error-dim px-1 rounded">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="bg-surface-container-low p-8 rounded-2xl hover-lift">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold font-headline text-on-surface">
          Question Breakdown
        </h2>
        <Badge>
          Question {q.currentQuestion} of {q.totalQuestions}
        </Badge>
      </div>

      {/* Question Text */}
      <div className="mb-8">
        <h3 className="text-on-surface-variant font-bold mb-3 italic">
          &quot;{q.questionText}&quot;
        </h3>
        <div className="p-6 bg-surface-container-highest rounded-xl leading-relaxed text-on-surface border-l-4 border-primary">
          {renderTranscript()}
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-secondary/10 bg-secondary/5">
          <div className="flex items-center gap-2 mb-2 text-secondary">
            <CheckCircle className="w-4 h-4" fill="currentColor" />
            <span className="font-bold text-xs uppercase tracking-wider">
              Strengths
            </span>
          </div>
          <p className="text-sm text-on-surface">{q.strengths}</p>
        </div>
        <div className="p-5 rounded-xl border border-tertiary/10 bg-tertiary/5">
          <div className="flex items-center gap-2 mb-2 text-tertiary">
            <AlertTriangle className="w-4 h-4" fill="currentColor" />
            <span className="font-bold text-xs uppercase tracking-wider">
              Improvements
            </span>
          </div>
          <p className="text-sm text-on-surface">{q.improvements}</p>
        </div>
      </div>
    </div>
  );
}
