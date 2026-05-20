import { mockFireFeasibilityResults } from '../domain/fireFeasibility'
import type {
  FireFeasibilityCoordsInput,
  FireFeasibilityDistancesHeightsInput,
  FireFeasibilityMode,
  FireFeasibilityResults,
} from '../domain/fireFeasibility.types'

export function computeFireFeasibilityResults(
  mode: FireFeasibilityMode,
  input: FireFeasibilityCoordsInput | FireFeasibilityDistancesHeightsInput,
): FireFeasibilityResults {
  if (mode === 'coords') {
    return mockFireFeasibilityResults({
      mode: 'coords',
      input: input as FireFeasibilityCoordsInput,
    })
  }
  return mockFireFeasibilityResults({
    mode: 'distances-heights',
    input: input as FireFeasibilityDistancesHeightsInput,
  })
}
