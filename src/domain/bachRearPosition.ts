import type { Position } from './position.types'
import type { BachRearPositionFormFields } from './bachRearPosition.types'

export function positionToRearFormFields(position: Position): BachRearPositionFormFields {
  return {
    rearPositionId: position.id,
    positionName: position.stationName,
    positionCoords: {
      east: position.coordinates.east,
      north: position.coordinates.north,
      palach: position.coordinates.palach,
    },
    positionAltitude: String(position.altitude),
    aka: position.aka != null ? String(position.aka) : '',
  }
}
