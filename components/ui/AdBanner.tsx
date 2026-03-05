import { colors, radius } from "@/styles/tokens";

export default function AdBanner() {
  return (
    <div style={{
      marginTop: 24,
      background: colors.bg.secondary,
      border: `1px dashed ${colors.border.subtle}`,
      borderRadius: radius.md,
      padding: "20px",
      textAlign: "center",
      color: colors.text.secondary,
      fontSize: 12,
    }}>
      📢 Google AdSense 광고 영역
    </div>
  );
}
