import { FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE } from './fireFeasibility.constants'
import type { FireFeasibilityCategoryResultsByGeneration } from './fireFeasibility.types'

export function createNotImplementedCategoryResultsByGeneration(): FireFeasibilityCategoryResultsByGeneration {
  return {
    a: { enabled: false, notes: FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE },
    b: { enabled: false, notes: FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE },
  }
}
