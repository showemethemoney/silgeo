"use client";
import { useRouter } from "next/navigation";
import { colors, fonts } from "@/styles/tokens";

interface HeaderProps {
  showSearch?: boolean;
}

export default function Header({ showSearch = false }: HeaderProps) {
  const router = useRouter();

  return (
    <header style={{
      borderBottom: `1px solid ${colors.border.default}`,
      padding: "16px 24px",
      display: "flex", alignItems: "center", gap: 12,
      position: "sticky", top: 0,
      background: "rgba(13,17,23,0.95)",
      backdropFilter: "blur(12px)",
      zIndex: 100,
      fontFamily: fonts.base,
    }}>
      {/* 로고 */}
      <div
        onClick={() => router.push("/")}
        style={{
          width: 28, height: 28,
          background: colors.gradient.blue,
          borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 800, color: "#fff",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(31,111,235,0.4)",
        }}>실</div>

      <span
        onClick={() => router.push("/")}
        style={{
          fontWeight: 700, fontSize: 16,
          letterSpacing: "-0.3px",
          color: colors.text.primary,
          cursor: "pointer",
        }}>
        실거래맵
      </span>

      <div style={{ flex: 1 }} />

      {/* 검색 버튼 (상세 페이지에서만 표시) */}
      {showSearch && (
        <div
          onClick={() => router.push("/")}
          style={{
            background: colors.bg.secondary,
            border: `1px solid ${colors.border.subtle}`,
            borderRadius: 20,
            padding: "6px 14px",
            fontSize: 13,
            color: colors.text.secondary,
            display: "flex", alignItems: "center", gap: 6,
            cursor: "pointer",
          }}>
          <span>🔍</span>
          <span>아파트 검색</span>
        </div>
      )}
    </header>
  );
}
