import { sortByUpdatedAtDesc } from '../domain/sortByUpdatedAt'
import type { AttackLog } from '../domain/attackLog.types'
import { loadAttackLogs } from '../storage/attackLogStorage'

export function loadAttackLogsUseCase(): AttackLog[] {
  return sortByUpdatedAtDesc(loadAttackLogs())
}
