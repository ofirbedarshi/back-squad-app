import { setCurrentPositionId } from '../storage/positionStorage'
import { updatePositionUseCase } from './updatePosition'
import type { PositionInput } from '../domain/position.types'

export function promoteStoredPositionToCurrentUseCase(id: string, input: PositionInput): void {
  updatePositionUseCase(id, input)
  setCurrentPositionId(id)
}
