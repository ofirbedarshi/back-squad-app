import type { FLIGHT_PATH_OPTIONS } from './fireFeasibility.constants'

export type FireFeasibilityMode = 'coords' | 'distances-heights'

export type FireFeasibilityFlightPath = (typeof FLIGHT_PATH_OPTIONS)[number]['value']

export interface FireFeasibilityFormData {
  positionToTargetRange: number | null
  positionToTargetHeightDifference: number | null
  targetAltitudeMeters: number | null
  flightPath: FireFeasibilityFlightPath
}

export interface FireFeasibilityCategoryResult {
  enabled: boolean
  notes: string
}

export type FireFeasibilityGeneration = 'a' | 'b'

export type FireFeasibilityCategoryResultsByGeneration = Record<
  FireFeasibilityGeneration,
  FireFeasibilityCategoryResult
>

export type FireFeasibilityFlightPathPercentByPath = Record<FireFeasibilityFlightPath, number>

export type FireFeasibilityFlightPathResultsByGeneration = Record<
  FireFeasibilityGeneration,
  FireFeasibilityFlightPathPercentByPath
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
  savedAt: string
}

