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

export type FireFeasibilityCloudsResults = Record<
  FireFeasibilityGeneration,
  FireFeasibilityCategoryResult
>

export interface FireFeasibilityResults {
  clouds: FireFeasibilityCloudsResults
}

