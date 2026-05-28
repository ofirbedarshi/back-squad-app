import { sortByUpdatedAtDesc } from '../domain/sortByUpdatedAt'
import type { FireFeasibilityRecord } from '../domain/fireFeasibility.types'
import { loadFireFeasibilityRecords } from '../storage/fireFeasibilityStorage'

export function loadFireFeasibilityRecordsUseCase(): FireFeasibilityRecord[] {
  const sorted = sortByUpdatedAtDesc(
    loadFireFeasibilityRecords().map((record) => ({
      ...record,
      updatedAt: record.savedAt,
    })),
  )
  return sorted.map(({ updatedAt, ...record }) => {
    void updatedAt
    return record
  })
}
