import type { PositionCoordinates } from './position.types'

export interface BachRearPositionFormFields {
  rearPositionId: string
  positionName: string
  positionCoords: PositionCoordinates
  positionAltitude: string
  aka: string
}

export const EMPTY_REAR_POSITION_COORDS: PositionCoordinates = {
  east: '',
  north: '',
  palach: '',
}

export const EMPTY_BACH_REAR_POSITION_FORM_FIELDS: BachRearPositionFormFields = {
  rearPositionId: '',
  positionName: '',
  positionCoords: EMPTY_REAR_POSITION_COORDS,
  positionAltitude: '',
  aka: '',
}
