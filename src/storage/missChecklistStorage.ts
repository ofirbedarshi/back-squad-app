import type { MissChecklist } from '../domain/missChecklist.types'

const MISS_CHECKLISTS_KEY = 'missChecklists'

function readMissChecklists(): MissChecklist[] {
  const raw = localStorage.getItem(MISS_CHECKLISTS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as MissChecklist[]
  } catch {
    return []
  }
}

function writeMissChecklists(items: MissChecklist[]): void {
  localStorage.setItem(MISS_CHECKLISTS_KEY, JSON.stringify(items))
}

export function addMissChecklist(item: MissChecklist): void {
  const items = readMissChecklists()
  items.push(item)
  writeMissChecklists(items)
}

export function loadMissChecklists(): MissChecklist[] {
  return readMissChecklists()
}

export function loadMissChecklistById(id: string): MissChecklist | undefined {
  return readMissChecklists().find((item) => item.id === id)
}

export function updateMissChecklist(updated: MissChecklist): void {
  const items = readMissChecklists()
  writeMissChecklists(items.map((item) => (item.id === updated.id ? updated : item)))
}

export function removeMissChecklist(id: string): void {
  writeMissChecklists(readMissChecklists().filter((item) => item.id !== id))
}

export function removeAllMissChecklists(): void {
  writeMissChecklists([])
}
