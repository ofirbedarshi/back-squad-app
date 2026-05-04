import { applyPositionUpdate } from '../domain/position'
import { loadPositions, updatePosition } from '../storage/positionStorage'
import type { PositionInput } from '../domain/position.types'

export function updatePositionUseCase(id: string, input: PositionInput): void {
  const positions = loadPositions()
  const existing = positions.find((pos) => pos.id === id)
  if (!existing) throw new Error(`Position with id "${id}" not found`)
  const updated = applyPositionUpdate(existing, input)
  updatePosition(updated)
}
