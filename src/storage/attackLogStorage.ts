import type { AttackLog } from '../domain/attackLog.types'

const ATTACK_LOGS_KEY = 'attackLogs'

function readAttackLogs(): AttackLog[] {
  const raw = localStorage.getItem(ATTACK_LOGS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as AttackLog[]
  } catch {
    return []
  }
}

function writeAttackLogs(logs: AttackLog[]): void {
  localStorage.setItem(ATTACK_LOGS_KEY, JSON.stringify(logs))
}

export function addAttackLog(log: AttackLog): void {
  const logs = readAttackLogs()
  logs.push(log)
  writeAttackLogs(logs)
}

export function updateAttackLog(updated: AttackLog): void {
  const logs = readAttackLogs()
  const next = logs.map((log) => (log.id === updated.id ? updated : log))
  writeAttackLogs(next)
}

export function loadAttackLogs(): AttackLog[] {
  return readAttackLogs()
}

export function removeAttackLog(id: string): void {
  writeAttackLogs(readAttackLogs().filter((log) => log.id !== id))
}

export function removeAllAttackLogs(): void {
  writeAttackLogs([])
}
