import { createPosition } from '../domain/position'
import { addPosition } from '../storage/positionStorage'
import type { PositionInput } from '../domain/position.types'

export function addPositionUseCase(input: PositionInput): void {
  const position = createPosition(input)
  addPosition(position)
}
