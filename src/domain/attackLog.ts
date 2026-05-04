import type { AttackLog, AttackLogInput } from './attackLog.types'

export function createAttackLog(input: AttackLogInput): AttackLog {
  return {
    ...input,
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  }
}

export function applyAttackLogUpdate(existing: AttackLog, input: AttackLogInput): AttackLog {
  return {
    ...input,
    id: existing.id,
    savedAt: existing.savedAt,
  }
}
