import { Terminal, AudioLines, Zap } from "lucide-react";

const iconMap = {
  Terminal,
  AudioLines,
  Zap,
};

interface MetricCardProps {
  label: string;
  score: number;
  icon: keyof typeof iconMap;
  barHeights: number[];
  barOpacities: number[];
}

export function MetricCard({
  label,
  score,
  icon,
  barHeights,
  barOpacities,
}: MetricCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className="bg-surface-container-high p-6 rounded-xl relative overflow-hidden group hover-lift border border-outline-variant/10 animate-border-glow">
      <div className="flex justify-between items-start mb-4">
        <div className="text-on-surface-variant text-xs font-label uppercase tracking-wider">
          {label}
        </div>
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="text-3xl font-bold font-headline text-on-surface">
        {score.toFixed(1)}
        <span className="text-sm text-on-surface-variant font-normal">/10</span>
      </div>
      <div className="mt-4 h-8 flex items-end gap-1">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-full transition-all duration-500"
            style={{
              height: `${(h / 8) * 100}%`,
              backgroundColor: `rgba(133, 173, 255, ${barOpacities[i] / 100})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
