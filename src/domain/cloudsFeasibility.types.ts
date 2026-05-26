export type CloudsFeasibilityTrajectory = 'low' | 'lofted'

export interface CloudsFeasibilityNumericBand {
  id: string
  min: number
  max: number
  label: string
}

export type CloudsFeasibilityLookupCells = Partial<
  Record<CloudsFeasibilityTrajectory, number>
>

export interface CloudsFeasibilityLookupData {
  heightBands: CloudsFeasibilityNumericBand[]
  rangeBands: CloudsFeasibilityNumericBand[]
  lookup: Record<string, CloudsFeasibilityLookupCells>
}

export interface CloudsFeasibilityEvaluationInput {
  positionToTargetRangeMeters: number
  positionToTargetHeightDifferenceMeters: number
  flightPath: string
}

export interface CloudsFeasibilityEvaluationResult {
  lookupValue: number
  enabled: boolean
}
