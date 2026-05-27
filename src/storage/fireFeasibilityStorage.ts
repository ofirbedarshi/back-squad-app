import type { FireFeasibilityRecord } from '../domain/fireFeasibility.types'

const FIRE_FEASIBILITY_RECORDS_KEY = 'fireFeasibilityRecords'

function readRecords(): FireFeasibilityRecord[] {
  const raw = localStorage.getItem(FIRE_FEASIBILITY_RECORDS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as FireFeasibilityRecord[]
  } catch {
    return []
  }
}

function writeRecords(records: FireFeasibilityRecord[]): void {
  localStorage.setItem(FIRE_FEASIBILITY_RECORDS_KEY, JSON.stringify(records))
}

export function addFireFeasibilityRecord(record: FireFeasibilityRecord): void {
  const records = readRecords()
  records.push(record)
  writeRecords(records)
}

export function loadFireFeasibilityRecords(): FireFeasibilityRecord[] {
  return readRecords()
}

export function getFireFeasibilityRecordById(id: string): FireFeasibilityRecord | undefined {
  return readRecords().find((record) => record.id === id)
}

export function removeFireFeasibilityRecord(id: string): void {
  writeRecords(readRecords().filter((record) => record.id !== id))
}

export function removeAllFireFeasibilityRecords(): void {
  writeRecords([])
}
