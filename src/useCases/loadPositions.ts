import { sortByUpdatedAtDesc } from '../domain/sortByUpdatedAt'
import type { Position } from '../domain/position.types'
import { loadPositions } from '../storage/positionStorage'

export function loadPositionsUseCase(): Position[] {
  return sortByUpdatedAtDesc(loadPositions())
}
