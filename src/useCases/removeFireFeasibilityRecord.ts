import { removeFireFeasibilityRecord } from '../storage/fireFeasibilityStorage'

export function removeFireFeasibilityRecordUseCase(id: string): void {
  if (!id.trim()) {
    throw new Error('מזהה רשומה חסר')
  }
  removeFireFeasibilityRecord(id)
}
