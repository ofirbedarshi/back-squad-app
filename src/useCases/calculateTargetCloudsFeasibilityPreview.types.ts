import type { PositionCoordinates } from '../domain/position.types'
import type { CloudsFeasibilityFlightPathResultsByGeneration } from './buildCloudsFeasibilityFlightPathResultsByGeneration.types'

export interface TargetCloudsFeasibilityPreview {
  cloudCeilingMaxFlyHeightMeters: number
  byGeneration: CloudsFeasibilityFlightPathResultsByGeneration
}

export interface CalculateTargetCloudsFeasibilityPreviewInput {
  targetCoordinates: PositionCoordinates | undefined
  targetHeight?: number
}
