"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";
import { ChartData } from "@/types";
import { colors, radius } from "@/styles/tokens";
import { formatPrice } from "./utils";

interface AptChartProps {
  chartData: ChartData[];
  avg: number;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: colors.bg.primary, border: `1px solid ${colors.border.subtle}`,
      borderRadius: 8, padding: "10px 14px", fontSize: 13,
    }}>
      <div style={{ color: colors.text.secondary, marginBottom: 4 }}>{label}</div>
      <div style={{ color: colors.text.accent, fontWeight: 700, fontSize: 15 }}>
        {formatPrice(payload[0].value)}
      </div>
    </div>
  );
}

export default function AptChart({ chartData, avg }: AptChartProps) {
  return (
    <div style={{
      background: colors.bg.secondary, border: `1px solid ${colors.border.default}`,
      borderRadius: radius.lg, padding: "24px 16px 12px", marginBottom: 24,
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, paddingLeft: 8 }}>
        월별 평균 거래가 추이
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border.default} vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: colors.text.secondary }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={v => formatPrice(v)}
            tick={{ fontSize: 11, fill: colors.text.secondary }}
            axisLine={false} tickLine={false} width={56}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={avg} stroke={colors.border.active} strokeDasharray="4 4" strokeOpacity={0.5} />
          <Line
            type="monotone" dataKey="price"
            stroke={colors.text.accent} strokeWidth={2.5}
            dot={{ r: 3, fill: colors.text.accent, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: colors.border.active }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ textAlign: "right", fontSize: 11, color: colors.text.secondary, marginTop: 8, paddingRight: 8 }}>
        ━ ━ 평균 {formatPrice(avg)}
      </div>
    </div>
  );
}
