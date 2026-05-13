import type { Target } from '../domain/target.types'
import type { TargetLiveMetrics } from '../domain/targetLiveMetrics.types'
import type { TargetAdvancedFilter } from './targetSearch.types'

export function getTargetSearchFields(target: Target): string[] {
  return [
    target.targetName,
    target.coordinates.east,
    target.coordinates.north,
  ]
}

function passesMinMax(value: number, min: string, max: string): boolean {
  const minNum = min !== '' ? parseFloat(min) : -Infinity
  const maxNum = max !== '' ? parseFloat(max) : Infinity
  return value >= minNum && value <= maxNum
}

export function filterTargetsByAdvancedFilter(
  targets: Target[],
  filter: TargetAdvancedFilter,
  getMetrics: (target: Target) => TargetLiveMetrics | null,
): Target[] {
  const hasRangeFilter = filter.range.min !== '' || filter.range.max !== ''
  const hasAzimuthFilter = filter.azimuth.min !== '' || filter.azimuth.max !== ''

  if (!hasRangeFilter && !hasAzimuthFilter) return targets

  return targets.filter((target) => {
    const metrics = getMetrics(target)
    if (!metrics) return false

    if (hasRangeFilter && !passesMinMax(metrics.range, filter.range.min, filter.range.max)) return false
    if (hasAzimuthFilter && !passesMinMax(metrics.azimuth, filter.azimuth.min, filter.azimuth.max)) return false

    return true
  })
}
