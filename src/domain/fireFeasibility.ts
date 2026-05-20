import type {
  FireFeasibilityInput,
  FireFeasibilityResults,
} from './fireFeasibility.types'

export function mockFireFeasibilityResults(
  _payload: FireFeasibilityInput,
): FireFeasibilityResults {
  return {
    clouds: { enabled: false },
  }
}
