// ─── AptHeader.tsx ────────────────────────────────────────────
"use client";
import { useRouter } from "next/navigation";
import { Trade, TradeSummary } from "@/types";
import { colors, radius } from "@/styles/tokens";
import { formatPrice } from "./utils";

interface AptHeaderProps {
  aptName: string;
  trades: Trade[];
  summary: TradeSummary;
  areas: string[];
}

export default function AptHeader({ aptName, trades, summary, areas }: AptHeaderProps) {
  const router = useRouter();

  return (
    <div style={{ paddingTop: 16, paddingBottom: 24, borderBottom: `1px solid ${colors.border.default}` }}>
      {/* 브레드크럼 */}
      <div style={{ paddingBottom: 12, fontSize: 12, color: colors.text.secondary, display: "flex", gap: 6 }}>
        <span onClick={() => router.push("/")} style={{ cursor: "pointer", color: colors.text.accent }}>홈</span>
        <span>›</span>
        <span>{aptName}</span>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, letterSpacing: "-0.5px" }}>{aptName}</h1>
          {trades[0] && (
            <p style={{ margin: "6px 0 0", color: colors.text.secondary, fontSize: 13 }}>{trades[0].dong}</p>
          )}
        </div>
        {summary.latest && (
          <div style={{
            background: colors.bg.secondary, border: `1px solid ${colors.border.subtle}`,
            borderRadius: radius.md, padding: "12px 18px",
            textAlign: "right", minWidth: 140,
          }}>
            <div style={{ fontSize: 11, color: colors.text.secondary, marginBottom: 4 }}>최근 평균 거래가</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: colors.text.accent }}>
              {formatPrice(summary.latest.price)}
            </div>
            {summary.diff !== 0 && (
              <div style={{ fontSize: 12, color: summary.diff >= 0 ? colors.status.up : colors.status.down, marginTop: 2 }}>
                {summary.diff >= 0 ? "▲" : "▼"} {formatPrice(Math.abs(summary.diff))} 전월比
              </div>
            )}
          </div>
        )}
      </div>

      {/* 태그 */}
      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        {[`거래 ${summary.count}건`, ...areas].map(tag => (
          <span key={tag} style={{
            background: colors.bg.secondary, border: `1px solid ${colors.border.subtle}`,
            borderRadius: 20, padding: "4px 10px", fontSize: 12, color: colors.text.secondary,
          }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
