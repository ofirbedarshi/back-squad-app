import type { FLIGHT_PATH_OPTIONS } from './fireFeasibility.constants'
import type { ObstaclesFeasibilityEvaluationInput } from './obstaclesFeasibility.types'

export type FireFeasibilityMode = 'coords' | 'distances-heights'

export type FireFeasibilityFlightPath = (typeof FLIGHT_PATH_OPTIONS)[number]['value']

export interface FireFeasibilityFormData {
  positionToTargetRange: number | null
  positionToTargetHeightDifference: number | null
  targetAltitudeMeters: number | null
  flightPath: FireFeasibilityFlightPath
  obstacle: ObstaclesFeasibilityEvaluationInput | null
}

export interface FireFeasibilityCategoryResult {
  enabled: boolean
  notes: string
  logs: string[]
}

export type FireFeasibilityGeneration = 'a' | 'b'

export type FireFeasibilityCategoryResultsByGeneration = Record<
  FireFeasibilityGeneration,
  FireFeasibilityCategoryResult
>

export type FireFeasibilityFlightPathPercentByPath = Record<FireFeasibilityFlightPath, number>

export interface FireFeasibilityFlightPathGenerationResult {
  percentByFlightPath: FireFeasibilityFlightPathPercentByPath
  logs: string[]
}

export type FireFeasibilityFlightPathResultsByGeneration = Record<
  FireFeasibilityGeneration,
  FireFeasibilityFlightPathGenerationResult
>

export interface FireFeasibilityResults {
  clouds: FireFeasibilityCategoryResultsByGeneration
  obstacles: FireFeasibilityCategoryResultsByGeneration
  concealment: FireFeasibilityCategoryResultsByGeneration
  flightPaths: FireFeasibilityFlightPathResultsByGeneration
}

export interface FireFeasibilityRecordInput {
  mode: FireFeasibilityMode
  targetId: string
  positionId: string
  results: FireFeasibilityResults
}

export interface FireFeasibilityRecord extends FireFeasibilityRecordInput {
  id: string
  updatedAt: string
}

