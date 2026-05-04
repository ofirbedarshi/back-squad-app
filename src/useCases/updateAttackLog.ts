import { applyAttackLogUpdate } from '../domain/attackLog'
import { loadAttackLogs, updateAttackLog } from '../storage/attackLogStorage'
import type { AttackLogInput } from '../domain/attackLog.types'

export function updateAttackLogUseCase(id: string, input: AttackLogInput): void {
  const logs = loadAttackLogs()
  const existing = logs.find((log) => log.id === id)
  if (!existing) throw new Error(`AttackLog with id "${id}" not found`)
  const updated = applyAttackLogUpdate(existing, input)
  updateAttackLog(updated)
}
