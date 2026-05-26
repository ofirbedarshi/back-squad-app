import type { FireFeasibilityMode } from './fireFeasibility.types'

export interface FireFeasibilityModeConfig {
  linksTitle: string
  linksSubtitle: string
  formTitle: string
}

export const FIRE_FEASIBILITY_RESULTS_TITLE = 'היתכנות לירי — תוצאות'

export const FIRE_FEASIBILITY_MODE_CONFIG: Record<
  FireFeasibilityMode,
  FireFeasibilityModeConfig
> = {
  coords: {
    linksTitle: 'היתכנות לירי - נ.צ',
    linksSubtitle: 'בחר מטרה ועמדה',
    formTitle: 'היתכנות לירי - נ.צ',
  },
  'distances-heights': {
    linksTitle: 'מרחקים וגבהים',
    linksSubtitle: 'בחר מטרה ועמדה',
    formTitle: 'היתכנות לירי - טווח גובה',
  },
}
