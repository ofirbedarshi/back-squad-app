import type { Position } from '../domain/position.types'

export function getPositionSearchFields(position: Position): string[] {
  return [
    position.stationName,
    position.coordinates.east,
    position.coordinates.north,
  ]
}
