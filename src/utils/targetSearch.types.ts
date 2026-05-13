import type { MetricFilter } from './search.types'

export interface TargetAdvancedFilter {
  range: MetricFilter
  azimuth: MetricFilter
}

export const emptyMetricFilter: MetricFilter = {
  mode: 'max',
  exact: '',
  min: '',
  max: '',
}

export const emptyTargetAdvancedFilter: TargetAdvancedFilter = {
  range: { ...emptyMetricFilter },
  azimuth: { ...emptyMetricFilter },
}
