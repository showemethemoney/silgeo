"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { colors, radius } from "@/styles/tokens";
import { getSidoList, getSggList } from "@/lib/queries";

interface Props {
  currentCode: string; // sgg_cd (5자리) 또는 sido_cd (2자리)
}

const selectStyle = {
  background: "#1c2128",
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radius.md,
  padding: "8px 12px",
  fontSize: 14,
  color: colors.text.primary,
  cursor: "pointer",
  outline: "none",
  minWidth: 110,
};

export default function RegionSelector({ currentCode }: Props) {
  const router = useRouter();
  const isSido = currentCode.length === 2;
  const currentSido = isSido ? currentCode : currentCode.slice(0, 2);

  const [selectedSido, setSelectedSido] = useState<string>(currentSido);
  const [sidoList, setSidoList]         = useState<{ sido_cd: string; sido_nm: string }[]>([]);
  const [sggList, setSggList]           = useState<{ sgg_cd: string; sgg_nm: string }[]>([]);

  // 시/도 목록 로드
  useEffect(() => {
    getSidoList().then(setSidoList);
  }, []);

  // 구/군 목록 로드
  useEffect(() => {
    if (selectedSido) getSggList(selectedSido).then(setSggList);
  }, [selectedSido]);

  const handleSidoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sido = e.target.value;
    setSelectedSido(sido);
    router.push(`/region/sido/${sido}`);
  };

  const handleSggChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "all") {
      router.push(`/region/sido/${selectedSido}`);
    } else {
      router.push(`/region/${val}`);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <span style={{ fontSize: 13, color: colors.text.secondary }}>지역 선택</span>

      {/* 시/도 */}
      <select value={selectedSido} onChange={handleSidoChange} style={selectStyle}>
        {sidoList.map(s => (
          <option key={s.sido_cd} value={s.sido_cd}>{s.sido_nm}</option>
        ))}
      </select>

      {/* 구/군 - 전체 포함 */}
      <select
        value={isSido ? "all" : currentCode}
        onChange={handleSggChange}
        style={selectStyle}
      >
        <option value="all">전체</option>
        {sggList.map(s => (
          <option key={s.sgg_cd} value={s.sgg_cd}>{s.sgg_nm}</option>
        ))}
      </select>
    </div>
  );
}
