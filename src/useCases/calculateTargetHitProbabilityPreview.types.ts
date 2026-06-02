import type { PositionCoordinates } from '../domain/position.types'

export interface CalculateTargetHitProbabilityPreviewInput {
  targetCoordinates: PositionCoordinates | undefined
  targetHeight?: number
}
