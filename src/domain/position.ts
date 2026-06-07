import { applyWithUpdatedAt } from './applyWithUpdatedAt'
import { createWithUpdatedAt } from './createWithUpdatedAt'
import { assertOptionalPitchRollFields } from './pitchRoll'
import type { Position, PositionInput } from './position.types'

export function createPosition(input: PositionInput): Position {
  assertOptionalPitchRollFields(input)
  return createWithUpdatedAt(input)
}

export function applyPositionUpdate(existing: Position, input: PositionInput): Position {
  assertOptionalPitchRollFields(input)
  return applyWithUpdatedAt(existing, input)
}
