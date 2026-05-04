import { loadAttackLogs } from '../storage/attackLogStorage'
import type { AttackLog } from '../domain/attackLog.types'

export function loadAttackLogsUseCase(): AttackLog[] {
  return loadAttackLogs()
}
