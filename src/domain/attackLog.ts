import { applyWithUpdatedAt } from './applyWithUpdatedAt'
import { createWithUpdatedAt } from './createWithUpdatedAt'
import type { AttackLog, AttackLogInput } from './attackLog.types'

export function createAttackLog(input: AttackLogInput): AttackLog {
  return createWithUpdatedAt(input)
}

export function applyAttackLogUpdate(existing: AttackLog, input: AttackLogInput): AttackLog {
  return applyWithUpdatedAt(existing, input)
}
