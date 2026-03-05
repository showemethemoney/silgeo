import { getRanking } from "@/lib/queries";
import RankingClient from "@/components/ranking/RankingClient";

export const metadata = {
  title: "아파트 랭킹 | 실거래맵",
  description: "이번달 거래량 TOP 20, 최고가 거래, 급등 아파트, 법인 매수 비율 랭킹을 확인하세요.",
};

export default async function RankingPage() {
  const [byTrade, byMax, byRise, byCorp] = await Promise.all([
    getRanking("trade_count"),
    getRanking("max_price"),
    getRanking("price_diff_pct"),
    getRanking("corp_ratio"),
  ]);

  return (
    <RankingClient
      byTrade={byTrade}
      byMax={byMax}
      byRise={byRise}
      byCorp={byCorp}
    />
  );
}
