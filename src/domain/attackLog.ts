import { applyWithUpdatedAt } from './applyWithUpdatedAt'
import { createWithUpdatedAt } from './createWithUpdatedAt'
import { assertAttackLogPitchRoll } from './pitchRoll'
import type { AttackLog, AttackLogInput } from './attackLog.types'

export function createAttackLog(input: AttackLogInput): AttackLog {
  assertAttackLogPitchRoll(input)
  return createWithUpdatedAt(input)
}

export function applyAttackLogUpdate(existing: AttackLog, input: AttackLogInput): AttackLog {
  assertAttackLogPitchRoll(input)
  return applyWithUpdatedAt(existing, input)
}
