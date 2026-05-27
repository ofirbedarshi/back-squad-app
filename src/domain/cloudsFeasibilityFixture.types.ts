import type { FireFeasibilityFlightPath } from './fireFeasibility.types'
import type { PositionCoordinates } from './position.types'

export interface CloudsFeasibilityFixtureSolveInput {
  cloudHeightMeters: number
  positionAltitudeMeters: number
  desiredGenAEnabled: boolean
  desiredGenBEnabled: boolean
  flightPath: FireFeasibilityFlightPath
}

export interface CloudsFeasibilityFixtureSolution {
  rangeMeters: number
  heightDifferenceMeters: number
  targetAltitudeMeters: number
  flightPath: FireFeasibilityFlightPath
}

export interface CloudsFeasibilityFixtureTargetPlacementInput {
  positionCoordinates: PositionCoordinates
  rangeMeters: number
}

export interface CloudsMockTargetNameInput {
  genAEnabled: boolean
  genBEnabled: boolean
  flightPath: FireFeasibilityFlightPath
}
