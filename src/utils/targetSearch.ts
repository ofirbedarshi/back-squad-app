import type { Target } from '../domain/target.types'
import type { TargetLiveMetrics } from '../domain/targetLiveMetrics.types'
import type { MetricFilter } from './search.types'
import type { TargetAdvancedFilter } from './targetSearch.types'

export function getTargetSearchFields(target: Target): string[] {
  return [
    target.targetName,
    target.coordinates.east,
    target.coordinates.north,
  ]
}

function isMetricFilterActive(filter: MetricFilter): boolean {
  if (filter.mode === 'exact') return filter.exact !== ''
  if (filter.mode === 'max') return filter.max !== ''
  return filter.min !== '' || filter.max !== ''
}

function passesMetricFilter(value: number, filter: MetricFilter): boolean {
  if (filter.mode === 'exact') {
    if (filter.exact === '') return true
    return value === parseFloat(filter.exact)
  }
  if (filter.mode === 'max') {
    if (filter.max === '') return true
    return value >= 0 && value <= parseFloat(filter.max)
  }
  const minNum = filter.min !== '' ? parseFloat(filter.min) : -Infinity
  const maxNum = filter.max !== '' ? parseFloat(filter.max) : Infinity
  return value >= minNum && value <= maxNum
}

export function filterTargetsByAdvancedFilter(
  targets: Target[],
  filter: TargetAdvancedFilter,
  getMetrics: (target: Target) => TargetLiveMetrics | null,
): Target[] {
  const hasRangeFilter = isMetricFilterActive(filter.range)
  const hasAzimuthFilter = isMetricFilterActive(filter.azimuth)

  if (!hasRangeFilter && !hasAzimuthFilter) return targets

  return targets.filter((target) => {
    const metrics = getMetrics(target)
    if (!metrics) return false

    if (hasRangeFilter && !passesMetricFilter(metrics.range, filter.range)) return false
    if (hasAzimuthFilter && !passesMetricFilter(metrics.azimuth, filter.azimuth)) return false

    return true
  })
}
