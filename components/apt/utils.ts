// ─── utils.ts ─────────────────────────────────────────────────
export function formatPrice(val: number): string {
  if (!val) return "-";
  if (val >= 10000) return `${(val / 10000).toFixed(1)}억`;
  return `${val.toLocaleString()}만`;
}
