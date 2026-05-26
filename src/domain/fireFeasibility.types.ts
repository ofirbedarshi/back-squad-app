export type FireFeasibilityMode = 'coords' | 'distances-heights'

export interface FireFeasibilityFormData {
  positionToTargetRange: number | null
}

export interface FireFeasibilityCategoryResult {
  enabled: boolean
}

export interface FireFeasibilityResults {
  clouds: FireFeasibilityCategoryResult
}

