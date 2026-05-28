import type { FireFeasibilityFlightPath } from './fireFeasibility.types'
import type { PositionCoordinates } from './position.types'

export interface ObstaclesFeasibilityFixtureSolveInput {
  positionAltitudeMeters: number
  desiredGenAEnabled: boolean
  flightPath: FireFeasibilityFlightPath
}

export interface ObstaclesFeasibilityFixtureSolution {
  rangeMeters: number
  heightDifferenceMeters: number
  targetAltitudeMeters: number
  obstacleRangeMeters: number
  obstacleHeightDifferenceMeters: number
  obstacleHeightMeters: number
  flightPath: FireFeasibilityFlightPath
}

export interface ObstaclesFeasibilityFixtureTargetPlacementInput {
  positionCoordinates: PositionCoordinates
  rangeMeters: number
}

export interface ObstaclesMockTargetNameInput {
  genAEnabled: boolean
  flightPath: FireFeasibilityFlightPath
}
