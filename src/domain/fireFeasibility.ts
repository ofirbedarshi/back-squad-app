import type {
  FireFeasibilityInput,
  FireFeasibilityResults,
} from './fireFeasibility.types'

const ZERO_METRICS = { L: 0, LPlus: 0, Low: 0, F: 0 } as const

export function mockFireFeasibilityResults(
  _payload: FireFeasibilityInput,
): FireFeasibilityResults {
  return {
    obstacles: { enabled: true },
    clouds: {
      enabled: false,
      blockingReason: 'גובה עננים מעל המסלול המותר',
    },
    concealments: { enabled: true },
    generationA: { ...ZERO_METRICS },
    generationB: { ...ZERO_METRICS },
  }
}
