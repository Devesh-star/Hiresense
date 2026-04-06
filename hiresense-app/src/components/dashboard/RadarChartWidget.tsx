"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { dashboardData } from "@/data/mockData";

export function RadarChartWidget() {
  return (
    <div className="bg-surface-container-high p-6 rounded-2xl hover-lift animate-shimmer-glow">
      <h2 className="text-lg font-bold font-headline text-on-surface mb-6">
        Skill Breakdown
      </h2>
      <div className="aspect-square relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={dashboardData.skillBreakdown}
            cx="50%"
            cy="50%"
            outerRadius="70%"
          >
            <PolarGrid
              stroke="#40485d"
              strokeOpacity={0.3}
              radialLines={false}
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: "#a3aac4",
                fontSize: 10,
                fontWeight: 800,
              }}
              tickLine={false}
            />
            <Radar
              dataKey="score"
              stroke="#85adff"
              fill="rgba(133, 173, 255, 0.4)"
              strokeWidth={1.5}
              dot={false}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
