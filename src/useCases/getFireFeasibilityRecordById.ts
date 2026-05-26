import type { FireFeasibilityRecord } from '../domain/fireFeasibility.types'
import { getFireFeasibilityRecordById } from '../storage/fireFeasibilityStorage'

export function getFireFeasibilityRecordByIdUseCase(id: string): FireFeasibilityRecord | undefined {
  return getFireFeasibilityRecordById(id)
}
