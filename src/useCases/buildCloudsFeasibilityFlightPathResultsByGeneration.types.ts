import type { FireFeasibilityFlightPath, FireFeasibilityGeneration } from '../domain/fireFeasibility.types'

export interface CloudsFeasibilityFlightPathCellResult {
  enabled: boolean
  notes: string
}

export type CloudsFeasibilityFlightPathCellsByPath = Record<
  FireFeasibilityFlightPath,
  CloudsFeasibilityFlightPathCellResult
>

export type CloudsFeasibilityFlightPathResultsByGeneration = Record<
  FireFeasibilityGeneration,
  CloudsFeasibilityFlightPathCellsByPath
>

export interface BuildCloudsFeasibilityFlightPathResultsInput {
  positionToTargetRangeMeters: number
  positionToTargetHeightDifferenceMeters: number
  targetHeightMeters: number
  cloudHeightMeters: number
}
