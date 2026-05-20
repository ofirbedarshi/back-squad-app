import { applyWithUpdatedAt } from './applyWithUpdatedAt'
import { createWithUpdatedAt } from './createWithUpdatedAt'
import type { Position, PositionInput } from './position.types'

export function createPosition(input: PositionInput): Position {
  return createWithUpdatedAt(input)
}

export function applyPositionUpdate(existing: Position, input: PositionInput): Position {
  return applyWithUpdatedAt(existing, input)
}
