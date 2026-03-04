import { getAptTrades } from "@/lib/queries";
import { Trade } from "@/types";
import AptDetailClient from "@/components/apt/AptDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ aptId: string }> }) {
  const { aptId } = await params;
  const aptName = decodeURIComponent(aptId);
  return {
    title: `${aptName} 실거래가 조회 | 실거래맵`,
    description: `${aptName} 최신 실거래가, 시세 추이, 평형별 거래 이력을 확인하세요. 국토교통부 공식 데이터 기준.`,
  };
}

export default async function AptPage({ params }: { params: Promise<{ aptId: string }> }) {
  const { aptId } = await params;
  const aptName = decodeURIComponent(aptId);
  const trades: Trade[] = await getAptTrades(aptName);

  return <AptDetailClient aptName={aptName} trades={trades} />;
}
