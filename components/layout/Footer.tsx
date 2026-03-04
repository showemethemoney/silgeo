import { colors } from "@/styles/tokens";

export default function Footer() {
  return (
    <footer style={{
      textAlign: "center",
      padding: "20px",
      fontSize: 11,
      color: colors.text.secondary,
      borderTop: `1px solid ${colors.border.default}`,
    }}>
      데이터 출처: 국토교통부 실거래가 공개시스템 · © 2025 실거래맵
    </footer>
  );
}
