import { supabase } from "./supabase";
import { AptResult, Trade, RegionStat } from "@/types";

// ─── 아파트 검색 자동완성 (apt_search 뷰) ────────────────────
export async function searchApts(keyword: string): Promise<AptResult[]> {
  if (!keyword?.trim()) return [];
  const { data, error } = await supabase
    .from("apt_search")
    .select("apt_id, apt_nm, umd_nm, sgg_cd, build_year")
    .ilike("apt_nm", `%${keyword}%`)
    .limit(10);

  if (error) console.error("searchApts error:", error);
  return data ?? [];
}

// ─── 아파트 거래 이력 (deal + dim_apt + dim_region 조인) ─────
export async function getAptTrades(aptNm: string): Promise<Trade[]> {
  // 1단계: apt_search에서 apt_id 가져오기
  const { data: aptData, error: aptError } = await supabase
    .from("apt_search")
    .select("apt_id, umd_nm, sgg_cd, build_year")
    .eq("apt_nm", aptNm)
    .limit(1)
    .single();

  if (aptError || !aptData) {
    console.error("getAptTrades apt error:", aptError);
    return [];
  }

  // 2단계: apt_id로 거래 이력 가져오기
  const { data, error } = await supabase
    .from("deal")
    .select("contract_yyyymmdd, price_man, area_x100, floor, trade_type, buyer_type")
    .eq("apt_id", aptData.apt_id)
    .is("cancel_yyyymmdd", null)
    .order("contract_yyyymmdd", { ascending: true })
    .limit(500);

  if (error) {
    console.error("getAptTrades deal error:", error);
    return [];
  }

  return (data ?? []).map((d) => ({
    contract_yyyymmdd: d.contract_yyyymmdd,
    price_man:         d.price_man,
    area:              d.area_x100 / 100,
    floor:             d.floor,
    trade_type:        d.trade_type,
    buyer_type:        d.buyer_type,
    apt_nm:            aptNm,
    build_year:        aptData.build_year,
    umd_nm:            aptData.umd_nm,
    sgg_cd:            aptData.sgg_cd,
  }));
}
