import type { AttackLog } from '../domain/attackLog.types'

export function getAttackLogSearchFields(log: AttackLog): string[] {
  return [log.targetName]
}
