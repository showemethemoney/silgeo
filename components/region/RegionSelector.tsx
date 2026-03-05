"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { colors, radius } from "@/styles/tokens";

// ─── 시/도 목록 ───────────────────────────────────────────────
const SIDO_LIST = [
  { code: "11", name: "서울" },
  { code: "21", name: "부산" },
  { code: "22", name: "대구" },
  { code: "23", name: "인천" },
  { code: "24", name: "광주" },
  { code: "25", name: "대전" },
  { code: "26", name: "울산" },
  { code: "29", name: "세종" },
  { code: "31", name: "경기" },
  { code: "32", name: "강원" },
  { code: "33", name: "충북" },
  { code: "34", name: "충남" },
  { code: "35", name: "전북" },
  { code: "36", name: "전남" },
  { code: "37", name: "경북" },
  { code: "38", name: "경남" },
  { code: "39", name: "제주" },
];

// ─── 구/군 목록 ───────────────────────────────────────────────
const SGG_LIST: Record<string, { code: string; name: string }[]> = {
  "11": [
    { code: "11110", name: "종로구" }, { code: "11140", name: "중구" },
    { code: "11170", name: "용산구" }, { code: "11200", name: "성동구" },
    { code: "11215", name: "광진구" }, { code: "11230", name: "동대문구" },
    { code: "11260", name: "중랑구" }, { code: "11290", name: "성북구" },
    { code: "11305", name: "강북구" }, { code: "11320", name: "도봉구" },
    { code: "11350", name: "노원구" }, { code: "11380", name: "은평구" },
    { code: "11410", name: "서대문구" },{ code: "11440", name: "마포구" },
    { code: "11470", name: "양천구" }, { code: "11500", name: "강서구" },
    { code: "11530", name: "구로구" }, { code: "11545", name: "금천구" },
    { code: "11560", name: "영등포구" },{ code: "11590", name: "동작구" },
    { code: "11620", name: "관악구" }, { code: "11650", name: "서초구" },
    { code: "11680", name: "강남구" }, { code: "11710", name: "송파구" },
    { code: "11740", name: "강동구" },
  ],
  "21": [
    { code: "21110", name: "중구" },    { code: "21120", name: "서구" },
    { code: "21130", name: "동구" },    { code: "21140", name: "영도구" },
    { code: "21150", name: "부산진구" },{ code: "21160", name: "동래구" },
    { code: "21170", name: "남구" },    { code: "21180", name: "북구" },
    { code: "21190", name: "해운대구" },{ code: "21200", name: "사하구" },
    { code: "21210", name: "금정구" },  { code: "21220", name: "강서구" },
    { code: "21230", name: "연제구" },  { code: "21240", name: "수영구" },
    { code: "21250", name: "사상구" },  { code: "21310", name: "기장군" },
  ],
  "22": [
    { code: "22110", name: "중구" },    { code: "22120", name: "동구" },
    { code: "22130", name: "서구" },    { code: "22140", name: "남구" },
    { code: "22150", name: "북구" },    { code: "22170", name: "수성구" },
    { code: "22180", name: "달서구" },  { code: "22320", name: "달성군" },
  ],
  "23": [
    { code: "23110", name: "중구" },    { code: "23140", name: "동구" },
    { code: "23170", name: "남구" },    { code: "23180", name: "연수구" },
    { code: "23190", name: "남동구" },  { code: "23200", name: "부평구" },
    { code: "23210", name: "계양구" },  { code: "23230", name: "서구" },
    { code: "23720", name: "강화군" },  { code: "23800", name: "옹진군" },
  ],
  "24": [
    { code: "24110", name: "동구" },    { code: "24140", name: "서구" },
    { code: "24155", name: "남구" },    { code: "24170", name: "북구" },
    { code: "24180", name: "광산구" },
  ],
  "25": [
    { code: "25110", name: "동구" },    { code: "25140", name: "중구" },
    { code: "25170", name: "서구" },    { code: "25200", name: "유성구" },
    { code: "25710", name: "대덕구" },
  ],
  "26": [
    { code: "26110", name: "중구" },    { code: "26140", name: "남구" },
    { code: "26170", name: "동구" },    { code: "26200", name: "북구" },
    { code: "26710", name: "울주군" },
  ],
  "29": [
    { code: "29110", name: "세종시" },
  ],
  "31": [
    { code: "31010", name: "수원시" },  { code: "31030", name: "성남시" },
    { code: "31040", name: "의정부시" },{ code: "31050", name: "안양시" },
    { code: "31060", name: "부천시" },  { code: "31070", name: "광명시" },
    { code: "31080", name: "평택시" },  { code: "31090", name: "동두천시" },
    { code: "31100", name: "안산시" },  { code: "31110", name: "고양시" },
    { code: "31120", name: "과천시" },  { code: "31130", name: "구리시" },
    { code: "31150", name: "남양주시" },{ code: "31160", name: "오산시" },
    { code: "31170", name: "시흥시" },  { code: "31180", name: "군포시" },
    { code: "31190", name: "의왕시" },  { code: "31200", name: "하남시" },
    { code: "31210", name: "용인시" },  { code: "31220", name: "파주시" },
    { code: "31230", name: "이천시" },  { code: "31240", name: "안성시" },
    { code: "31250", name: "김포시" },  { code: "31260", name: "화성시" },
    { code: "31270", name: "광주시" },  { code: "31280", name: "양주시" },
    { code: "31290", name: "포천시" },  { code: "31310", name: "여주시" },
  ],
  "32": [
    { code: "32010", name: "춘천시" },  { code: "32020", name: "원주시" },
    { code: "32030", name: "강릉시" },  { code: "32040", name: "동해시" },
    { code: "32050", name: "태백시" },  { code: "32060", name: "속초시" },
    { code: "32070", name: "삼척시" },
  ],
  "33": [
    { code: "33010", name: "청주시" },  { code: "33020", name: "충주시" },
    { code: "33030", name: "제천시" },
  ],
  "34": [
    { code: "34010", name: "천안시" },  { code: "34020", name: "공주시" },
    { code: "34030", name: "보령시" },  { code: "34040", name: "아산시" },
    { code: "34050", name: "서산시" },  { code: "34060", name: "논산시" },
    { code: "34070", name: "계룡시" },  { code: "34080", name: "당진시" },
  ],
  "35": [
    { code: "35010", name: "전주시" },  { code: "35020", name: "군산시" },
    { code: "35030", name: "익산시" },  { code: "35040", name: "정읍시" },
    { code: "35050", name: "남원시" },  { code: "35060", name: "김제시" },
  ],
  "36": [
    { code: "36010", name: "목포시" },  { code: "36020", name: "여수시" },
    { code: "36030", name: "순천시" },  { code: "36040", name: "나주시" },
    { code: "36060", name: "광양시" },
  ],
  "37": [
    { code: "37010", name: "포항시" },  { code: "37020", name: "경주시" },
    { code: "37030", name: "김천시" },  { code: "37040", name: "안동시" },
    { code: "37050", name: "구미시" },  { code: "37060", name: "영주시" },
    { code: "37070", name: "영천시" },  { code: "37080", name: "상주시" },
    { code: "37090", name: "문경시" },  { code: "37100", name: "경산시" },
  ],
  "38": [
    { code: "38010", name: "창원시" },  { code: "38020", name: "진주시" },
    { code: "38030", name: "통영시" },  { code: "38040", name: "사천시" },
    { code: "38050", name: "김해시" },  { code: "38060", name: "밀양시" },
    { code: "38070", name: "거제시" },  { code: "38080", name: "양산시" },
  ],
  "39": [
    { code: "39010", name: "제주시" },  { code: "39020", name: "서귀포시" },
  ],
};

interface Props {
  currentSggCd: string;
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

export default function RegionSelector({ currentSggCd }: Props) {
  const router = useRouter();
  const currentSido = currentSggCd.slice(0, 2);
  const [selectedSido, setSelectedSido] = useState<string>(currentSido);

  const sggList = SGG_LIST[selectedSido] ?? [];

  const handleSidoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sido = e.target.value;
    setSelectedSido(sido);
    // 시/도 변경 시 첫 번째 구/군으로 자동 이동
    const first = SGG_LIST[sido]?.[0];
    if (first) router.push(`/region/${first.code}`);
  };

  const handleSggChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/region/${e.target.value}`);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <span style={{ fontSize: 13, color: colors.text.secondary }}>지역 선택</span>

      {/* 시/도 */}
      <select
        value={selectedSido}
        onChange={handleSidoChange}
        style={selectStyle}
      >
        {SIDO_LIST.map(s => (
          <option key={s.code} value={s.code}>{s.name}</option>
        ))}
      </select>

      {/* 구/군 */}
      <select
        value={currentSggCd}
        onChange={handleSggChange}
        style={selectStyle}
      >
        {sggList.map(s => (
          <option key={s.code} value={s.code}>{s.name}</option>
        ))}
      </select>
    </div>
  );
}
