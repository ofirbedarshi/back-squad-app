import type { FireFeasibilityMode } from './fireFeasibility.types'

export interface FireFeasibilityModeConfig {
  modeLabel: string
}

export const FIRE_FEASIBILITY_RESULTS_TITLE = 'היתכנות לירי — תוצאות'
export const FIRE_FEASIBILITY_FLOW_TITLE = 'היתכנות לירי'

export const FIRE_FEASIBILITY_MODE_CONFIG: Record<
  FireFeasibilityMode,
  FireFeasibilityModeConfig
> = {
  coords: {
    modeLabel: 'היתכנות לירי - נ.צ',
  },
  'distances-heights': {
    modeLabel: 'היתכנות לירי - טווח גובה',
  },
}
