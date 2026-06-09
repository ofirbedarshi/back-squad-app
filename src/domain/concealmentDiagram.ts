import type {
  EvaluateConcealmentFeasibilityInput,
  ConcealmentLookupResult,
} from './concealmentFeasibility.types'
import type { ConcealmentDiagramModel } from './concealmentDiagram.types'

export function buildConcealmentDiagramModel(
  input: EvaluateConcealmentFeasibilityInput,
  result: ConcealmentLookupResult,
  enabled: boolean,
): ConcealmentDiagramModel {
  return {
    target: {
      label: 'מטרה',
      distanceFromTargetMeters: 0,
      heightAboveTargetMeters: 0,
    },
    concealment: {
      label: 'הסתר',
      distanceFromTargetMeters: input.concealment.targetToConcealmentRangeMeters,
      heightAboveTargetMeters: input.concealment.targetToConcealmentHeightDifferenceMeters,
    },
    missile: {
      label: 'הטיל',
      distanceFromTargetMeters: result.rangeFromTargetMeters,
      heightAboveTargetMeters: result.missileHeightAboveTargetMeters,
    },
    concealmentAngleDeg: result.concealmentAngleDeg,
    missileAngleDeg: result.missileAngleDeg,
    enabled,
  }
}
