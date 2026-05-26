import { createFireFeasibilityRecord } from '../domain/fireFeasibility'
import type { FireFeasibilityRecordInput } from '../domain/fireFeasibility.types'
import { addFireFeasibilityRecord } from '../storage/fireFeasibilityStorage'

export function saveFireFeasibilityRecordUseCase(input: FireFeasibilityRecordInput): void {
  if (!input.targetId.trim()) {
    throw new Error('לא נבחרה מטרה לשמירה')
  }
  if (!input.positionId.trim()) {
    throw new Error('לא נבחרה עמדה לשמירה')
  }
  if (!input.results) {
    throw new Error('אין תוצאות לשמירה')
  }

  const record = createFireFeasibilityRecord(input)
  addFireFeasibilityRecord(record)
}
