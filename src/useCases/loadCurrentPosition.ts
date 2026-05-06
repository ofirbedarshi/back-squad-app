import { loadCurrentPosition } from '../storage/positionStorage'
import type { Position } from '../domain/position.types'

export function loadCurrentPositionUseCase(): Position | null {
  return loadCurrentPosition()
}
