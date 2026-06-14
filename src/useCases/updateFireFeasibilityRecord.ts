import { applyFireFeasibilityRecordUpdate } from '../domain/fireFeasibility'
import type { FireFeasibilityRecord, FireFeasibilityRecordInput } from '../domain/fireFeasibility.types'
import { getFireFeasibilityRecordById, updateFireFeasibilityRecord } from '../storage/fireFeasibilityStorage'

export function updateFireFeasibilityRecordUseCase(
  id: string,
  input: FireFeasibilityRecordInput,
): FireFeasibilityRecord {
  const existing = getFireFeasibilityRecordById(id)
  if (!existing) {
    throw new Error('הרשומה לא נמצאה')
  }
  if (!input.positionId.trim()) {
    throw new Error('לא נבחרה עמדה לשמירה')
  }
  if (!input.results) {
    throw new Error('אין תוצאות לשמירה')
  }
  if (!input.formData) {
    throw new Error('חסרים נתוני טופס לשמירה')
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

  const record = applyFireFeasibilityRecordUpdate(existing, input)
  updateFireFeasibilityRecord(record)
  return record
}
