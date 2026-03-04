"use client";
import { useState } from "react";
import { Trade } from "@/types";
import { colors, radius } from "@/styles/tokens";
import { formatPrice } from "./utils";

export default function AptTable({ trades }: { trades: Trade[] }) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div style={{
      background: colors.bg.secondary, border: `1px solid ${colors.border.default}`,
      borderRadius: radius.lg, overflow: "hidden",
    }}>
      <div style={{ padding: "20px 20px 12px", fontSize: 13, fontWeight: 600 }}>
        실거래 이력 ({trades.length}건)
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderTop: `1px solid ${colors.border.default}`, borderBottom: `1px solid ${colors.border.default}` }}>
            {["거래일", "면적", "층", "거래가", "㎡당"].map(h => (
              <th key={h} style={{
                padding: "10px 20px",
                textAlign: (h === "거래가" || h === "㎡당") ? "right" : "left",
                color: colors.text.secondary, fontWeight: 500, fontSize: 12,
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...trades].reverse().slice(0, 50).map((t, i) => (
            <tr key={i}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                borderBottom: `1px solid ${colors.border.default}`,
                background: hoveredRow === i ? colors.bg.hover : "transparent",
                transition: "background 0.1s",
              }}>
              <td style={{ padding: "12px 20px", color: colors.text.secondary }}>{t.deal_date}</td>
              <td style={{ padding: "12px 20px" }}>{t.area}㎡</td>
              <td style={{ padding: "12px 20px", color: colors.text.secondary }}>{t.floor}층</td>
              <td style={{ padding: "12px 20px", textAlign: "right", fontWeight: 700, color: colors.text.accent }}>
                {formatPrice(t.price)}
              </td>
              <td style={{ padding: "12px 20px", textAlign: "right", color: colors.text.secondary, fontSize: 12 }}>
                {t.price_per_m2 ? `${t.price_per_m2.toLocaleString()}만` : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
