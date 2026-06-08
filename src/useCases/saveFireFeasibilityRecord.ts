import { createFireFeasibilityRecord } from '../domain/fireFeasibility'
import type { FireFeasibilityRecord, FireFeasibilityRecordInput } from '../domain/fireFeasibility.types'
import { addFireFeasibilityRecord } from '../storage/fireFeasibilityStorage'

export function saveFireFeasibilityRecordUseCase(input: FireFeasibilityRecordInput): FireFeasibilityRecord {
  if (!input.positionId.trim()) {
    throw new Error('לא נבחרה עמדה לשמירה')
  }
  if (!input.results) {
    throw new Error('אין תוצאות לשמירה')
  }

  if (input.mode === 'coords') {
    if (!input.targetId.trim()) {
      throw new Error('לא נבחרה מטרה לשמירה')
    }
  } else {
    if (!Number.isFinite(input.rangeMeters)) {
      throw new Error('חסר טווח לשמירה')
    }
    if (!Number.isFinite(input.heightDifferenceMeters)) {
      throw new Error('חסר הפרש גובה לשמירה')
    }
  }

  const record = createFireFeasibilityRecord(input)
  addFireFeasibilityRecord(record)
  return record
}
