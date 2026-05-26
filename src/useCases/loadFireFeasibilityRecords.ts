import type { FireFeasibilityRecord } from '../domain/fireFeasibility.types'
import { loadFireFeasibilityRecords } from '../storage/fireFeasibilityStorage'

export function loadFireFeasibilityRecordsUseCase(): FireFeasibilityRecord[] {
  return loadFireFeasibilityRecords()
}
