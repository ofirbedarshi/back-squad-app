import type { RangeFilter } from './search.types'

export interface TargetAdvancedFilter {
  range: RangeFilter
  azimuth: RangeFilter
}

export const emptyTargetAdvancedFilter: TargetAdvancedFilter = {
  range: { min: '', max: '' },
  azimuth: { min: '', max: '' },
}
