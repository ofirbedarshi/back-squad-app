import { applyWithUpdatedAt } from './applyWithUpdatedAt'
import { createWithUpdatedAt } from './createWithUpdatedAt'
import { assertPositionPitchRoll } from './pitchRoll'
import type { Position, PositionInput } from './position.types'

export function createPosition(input: PositionInput): Position {
  assertPositionPitchRoll(input)
  return createWithUpdatedAt(input)
}

export function applyPositionUpdate(existing: Position, input: PositionInput): Position {
  assertPositionPitchRoll(input)
  return applyWithUpdatedAt(existing, input)
}
