import type { TargetLiveMetrics, TargetLiveMetricsInput } from './targetLiveMetrics.types'

export const LIVE_METRIC_DECIMALS = 2

/** Round live metric to {@link LIVE_METRIC_DECIMALS} decimal places. */
export function roundLiveMetric(value: number): number {
  if (!Number.isFinite(value)) {
    throw new Error('ערך מטריקה לא תקין')
  }
  const factor = 10 ** LIVE_METRIC_DECIMALS
  return Math.round(value * factor) / factor
}

/** Same rounding as {@link roundLiveMetric}; omits trailing zeros for UI (90 → "90", 90.1 → "90.1"). */
export function formatLiveMetric(value: number): string {
  const rounded = roundLiveMetric(value)
  return String(parseFloat(rounded.toFixed(LIVE_METRIC_DECIMALS)))
}

export function calculateTargetLiveMetrics(input: TargetLiveMetricsInput): TargetLiveMetrics | null {
  if (input.targetHeight === undefined || Number.isNaN(input.targetHeight)) {
    return null
  }

  const sourceEast = Number(input.sourceEast)
  const sourceNorth = Number(input.sourceNorth)
  const sourceHeight = Number(input.sourceHeight)
  if (Number.isNaN(sourceEast) || Number.isNaN(sourceNorth) || Number.isNaN(sourceHeight)) {
    return null
  }

  const targetEast = Number(input.targetCoordinates.east)
  const targetNorth = Number(input.targetCoordinates.north)
  if (Number.isNaN(targetEast) || Number.isNaN(targetNorth)) {
    return null
  }

  const dE = targetEast - sourceEast
  const dN = targetNorth - sourceNorth
  const altitudeDiff = input.targetHeight - sourceHeight

  const range = Math.sqrt(dE ** 2 + dN ** 2)

  let theta = Math.atan2(dE, dN)
  if (theta < 0) {
    theta += 2 * Math.PI
  }
  const azimuth = (theta / (2 * Math.PI)) * 360

  return {
    azimuth: roundLiveMetric(azimuth),
    range: roundLiveMetric(range),
    altitudeDiff: roundLiveMetric(altitudeDiff),
  }
}
