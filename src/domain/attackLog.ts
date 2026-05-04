import type { AttackLog, AttackLogInput } from './attackLog.types'

export function createAttackLog(input: AttackLogInput): AttackLog {
  return {
    ...input,
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  }
}
