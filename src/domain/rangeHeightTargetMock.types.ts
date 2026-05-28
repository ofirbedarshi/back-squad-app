import type { PositionCoordinates } from './position.types'

export interface RangeHeightTargetMockInput {
  rangeMeters: number
  heightDifferenceMeters: number
}

export interface RangeHeightTargetMockNameInput {
  rangeMeters: number
  heightDifferenceMeters: number
}

export interface RangeHeightTargetMockPlacementInput {
  positionCoordinates: PositionCoordinates
  rangeMeters: number
}
