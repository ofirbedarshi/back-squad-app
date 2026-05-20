import type { PositionCoordinates } from './position.types'

export type FireFeasibilityMode = 'coords' | 'distances-heights'

/** Editable coords form fields (cloud height added at calculate time). */
export interface FireFeasibilityCoordsFormFields {
  obstacleCoords: string
  obstacleHeight: string
  hide1Coordinates: PositionCoordinates | undefined
  hide1Height: string
  hide2Coordinates: PositionCoordinates | undefined
  hide2Height: string
  flightPath: string
}

/** Coords step form state shown in UI (includes read-only cloud height display). */
export interface FireFeasibilityCoordsFormUiState extends FireFeasibilityCoordsFormFields {
  cloudHeightValue: string
  cloudHeightViewUnit: string
}

/** Editable distances/heights form fields (cloud height added at calculate time). */
export interface FireFeasibilityDistancesHeightsFormFields {
  obstacleHeight: string
  positionObstacleRange: string
  hide1Distance: string
  hide1HeightDiff: string
  hide2Distance: string
  hide2HeightDiff: string
  flightPath: string
}

/** Distances/heights step form state shown in UI (includes read-only cloud height display). */
export interface FireFeasibilityDistancesHeightsFormUiState
  extends FireFeasibilityDistancesHeightsFormFields {
  cloudHeightValue: string
  cloudHeightViewUnit: string
}

export interface FireFeasibilityCoordsInput {
  obstacleCoords: string
  obstacleHeight: string
  hide1Coordinates: PositionCoordinates | undefined
  hide1Height: string
  hide2Coordinates: PositionCoordinates | undefined
  hide2Height: string
  cloudHeightDisplay: string
  cloudHeightUnit: string
  flightPath: string
}

export interface FireFeasibilityDistancesHeightsInput {
  obstacleHeight: string
  positionObstacleRange: string
  hide1Distance: string
  hide1HeightDiff: string
  hide2Distance: string
  hide2HeightDiff: string
  cloudHeightDisplay: string
  cloudHeightUnit: string
  flightPath: string
}

export type FireFeasibilityInput =
  | { mode: 'coords'; input: FireFeasibilityCoordsInput }
  | { mode: 'distances-heights'; input: FireFeasibilityDistancesHeightsInput }

export interface FireFeasibilityCategoryResult {
  enabled: boolean
  blockingReason?: string
}

export interface FireFeasibilityGenerationMetrics {
  L: number
  LPlus: number
  Low: number
  F: number
}

export interface FireFeasibilityResults {
  obstacles: FireFeasibilityCategoryResult
  clouds: FireFeasibilityCategoryResult
  concealments: FireFeasibilityCategoryResult
  generationA: FireFeasibilityGenerationMetrics
  generationB: FireFeasibilityGenerationMetrics
}

