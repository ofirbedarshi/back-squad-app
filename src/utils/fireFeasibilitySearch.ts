import type { FireFeasibilityRecord } from '../domain/fireFeasibility.types'
import type { Target } from '../domain/target.types'
import { getFireFeasibilityCardDetails, getFireFeasibilityCardTitle } from './fireFeasibilityDisplay'
import type { Position } from '../domain/position.types'

export function getFireFeasibilitySearchFields(
  record: FireFeasibilityRecord,
  targets: Target[],
  positions: Position[],
): string[] {
  const { targetName } = getFireFeasibilityCardDetails(record, targets, positions)
  return [getFireFeasibilityCardTitle(record), targetName]
}
