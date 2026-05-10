import { loadReferencePosition } from '../storage/positionStorage'
import type { Position } from '../domain/position.types'

export function loadReferencePositionUseCase(): Position | null {
  return loadReferencePosition()
}
