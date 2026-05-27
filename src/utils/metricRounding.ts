export const METRIC_DECIMALS = 2

/** Round numeric metric to {@link METRIC_DECIMALS} decimal places. */
export function roundMetric(value: number): number {
  if (!Number.isFinite(value)) {
    throw new Error('ערך מספרי לא תקין')
  }
  const factor = 10 ** METRIC_DECIMALS
  return Math.round(value * factor) / factor
}

/** Same rounding as {@link roundMetric}; omits trailing zeros for UI (90 → "90", 90.1 → "90.1"). */
export function formatMetric(value: number): string {
  const rounded = roundMetric(value)
  return String(parseFloat(rounded.toFixed(METRIC_DECIMALS)))
}
