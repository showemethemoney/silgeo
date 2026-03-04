"use client";
import { useRef } from "react";
import { colors, shadows, radius } from "@/styles/tokens";
import SearchDropdown from "./SearchDropdown";
import { AptResult } from "@/types";

interface SearchBarProps {
  query: string;
  setQuery: (v: string) => void;
  results: AptResult[];
  loading: boolean;
  focused: boolean;
  setFocused: (v: boolean) => void;
  recentSearches: string[];
  showDropdown: boolean;
  goToApt: (name: string) => void;
}

export default function SearchBar({
  query, setQuery, results, loading,
  focused, setFocused, recentSearches,
  showDropdown, goToApt,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ width: "100%", maxWidth: 560, position: "relative" }}>
      {/* 입력창 */}
      <div style={{
        background: focused ? "rgba(31,111,235,0.08)" : "rgba(22,27,34,0.9)",
        border: `1.5px solid ${focused ? colors.border.active : colors.border.subtle}`,
        borderRadius: radius.lg,
        transition: "all 0.2s ease",
        boxShadow: focused ? shadows.focus : shadows.card,
        display: "flex", alignItems: "center",
        padding: "4px 8px 4px 20px", gap: 8,
      }}>
        <span style={{ fontSize: 18, opacity: 0.5 }}>🔍</span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results.length > 0) goToApt(results[0].apt_name);
          }}
          placeholder="아파트 이름을 입력하세요 (예: 래미안, 힐스테이트)"
          style={{
            flex: 1, background: "transparent", border: "none",
            fontSize: 15, color: colors.text.primary,
            padding: "14px 0", caretColor: colors.border.active,
            outline: "none",
          }}
        />
        {loading && (
          <div style={{
            width: 16, height: 16,
            border: `2px solid ${colors.border.subtle}`,
            borderTopColor: colors.border.active,
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            flexShrink: 0,
          }} />
        )}
        {query && (
          <button onClick={() => setQuery("")} style={{
            background: "none", border: "none",
            color: colors.text.secondary, cursor: "pointer",
            padding: "4px 8px", fontSize: 18, flexShrink: 0,
          }}>×</button>
        )}
        <button
          onClick={() => results.length > 0 && goToApt(results[0].apt_name)}
          style={{
            background: colors.gradient.blue,
            border: "none", borderRadius: radius.sm,
            padding: "10px 20px", color: "#fff",
            fontSize: 14, fontWeight: 600,
            cursor: "pointer", flexShrink: 0,
            boxShadow: "0 2px 8px rgba(31,111,235,0.4)",
          }}>
          검색
        </button>
      </div>

      {/* 드롭다운 */}
      {showDropdown && (
        <SearchDropdown
          query={query}
          results={results}
          loading={loading}
          recentSearches={recentSearches}
          goToApt={goToApt}
        />
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
