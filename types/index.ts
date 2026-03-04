// 아파트 검색 결과
export interface AptResult {
  apt_name: string;
  dong: string;
  sigungu_code: string;
}

// 실거래 데이터
export interface Trade {
  deal_date: string;
  price: number;
  price_per_m2: number;
  floor: number;
  area: number;
  dong: string;
}

// 차트 데이터
export interface ChartData {
  date: string;
  price: number;
}

// 통계 요약
export interface TradeSummary {
  avg: number;
  max: number;
  count: number;
  latest: ChartData | null;
  prev: ChartData | null;
  diff: number;
}
