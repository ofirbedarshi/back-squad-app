import type { FLIGHT_PATH_OPTIONS } from './fireFeasibility.constants'

export type FireFeasibilityMode = 'coords' | 'distances-heights'

export type FireFeasibilityFlightPath = (typeof FLIGHT_PATH_OPTIONS)[number]['value']

export interface FireFeasibilityFormData {
  positionToTargetRange: number | null
  positionToTargetHeightDifference: number | null
  flightPath: FireFeasibilityFlightPath
}

export interface FireFeasibilityCategoryResult {
  enabled: boolean
}

export interface FireFeasibilityResults {
  clouds: FireFeasibilityCategoryResult
}

