import { sortByUpdatedAtDesc } from '../domain/sortByUpdatedAt'
import type { FireFeasibilityRecord } from '../domain/fireFeasibility.types'
import { loadFireFeasibilityRecords } from '../storage/fireFeasibilityStorage'

export function loadFireFeasibilityRecordsUseCase(): FireFeasibilityRecord[] {
  return sortByUpdatedAtDesc(loadFireFeasibilityRecords())
}
