import { createPosition } from '../domain/position'
import { addPosition, setCurrentPositionId } from '../storage/positionStorage'
import type { PositionInput } from '../domain/position.types'

export function saveCurrentPositionUseCase(input: PositionInput): void {
  const position = createPosition(input)
  addPosition(position)
  setCurrentPositionId(position.id)
}
