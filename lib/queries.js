import { supabase } from "./supabase";

// 아파트 거래 이력 조회 (실제 DB)
export async function getAptTrades(aptName, area = null) {
  let q = supabase
    .from("apt_trades")
    .select("deal_date, price, price_per_m2, floor, area, dong")
    .eq("apt_name", aptName)
    .order("deal_date", { ascending: true })
    .limit(500);

  if (area) q = q.eq("area", area);
  const { data, error } = await q;
  if (error) console.error("getAptTrades error:", error);
  return data ?? [];
}

// 아파트 검색 자동완성
export async function searchApts(keyword) {
  if (!keyword?.trim()) return [];
  const { data, error } = await supabase
    .from("apt_trades")
    .select("apt_name, dong, sigungu_code")
    .ilike("apt_name", `%${keyword}%`)
    .limit(50);

  if (error) console.error("searchApts error:", error);

  // 중복 제거 (apt_name 기준)
  const unique = [...new Map(
    (data ?? []).map(d => [d.apt_name, d])
  ).values()];

  return unique.slice(0, 10);
}

// 지역별 최근 거래 목록
export async function getRegionTrades(sigunguCode, limit = 20) {
  const { data, error } = await supabase
    .from("apt_trades")
    .select("apt_name, deal_date, price, area, floor, dong")
    .eq("sigungu_code", sigunguCode)
    .order("deal_date", { ascending: false })
    .limit(limit);

  if (error) console.error("getRegionTrades error:", error);
  return data ?? [];
}

// 아파트 목록 (정적 페이지 생성용)
export async function getAllAptNames() {
  const { data, error } = await supabase
    .from("apt_trades")
    .select("apt_name")
    .limit(30000);

  if (error) console.error("getAllAptNames error:", error);

  return [...new Set((data ?? []).map(d => d.apt_name))];
}
