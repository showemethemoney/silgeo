import { TradeSummary } from "@/types";
import { colors, radius } from "@/styles/tokens";
import { formatPrice } from "./utils";

export default function AptSummary({ summary }: { summary: TradeSummary }) {
  const cards = [
    { label: "평균 거래가", value: formatPrice(summary.avg), sub: "전체 기간" },
    { label: "거래 건수",   value: `${summary.count}건`,     sub: "전체 기간" },
    { label: "최고가",      value: formatPrice(summary.max), sub: "" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, padding: "24px 0" }}>
      {cards.map(card => (
        <div key={card.label} style={{
          background: colors.bg.secondary,
          border: `1px solid ${colors.border.default}`,
          borderRadius: radius.md, padding: "16px",
          transition: "border-color 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = colors.border.active)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = colors.border.default)}
        >
          <div style={{ fontSize: 11, color: colors.text.secondary, marginBottom: 8 }}>{card.label}</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{card.value}</div>
          <div style={{ fontSize: 11, color: colors.text.secondary, marginTop: 4 }}>{card.sub}</div>
        </div>
      ))}
    </div>
  );
}
