import { loadPositions } from '../storage/positionStorage'
import type { Position } from '../domain/position.types'

export function loadPositionsUseCase(): Position[] {
  return loadPositions()
}
