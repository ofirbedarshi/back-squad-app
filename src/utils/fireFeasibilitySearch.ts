import type { FireFeasibilityRecord } from '../domain/fireFeasibility.types'
import { getFireFeasibilityCardTitle } from './fireFeasibilityDisplay'

export function getFireFeasibilitySearchFields(record: FireFeasibilityRecord): string[] {
  return [getFireFeasibilityCardTitle(record)]
}
