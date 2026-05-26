import { formatUpdatedAt } from '../domain/formatUpdatedAt'
import { FIRE_FEASIBILITY_MODE_CONFIG } from '../domain/fireFeasibilityModeConfig'
import type { FireFeasibilityRecord } from '../domain/fireFeasibility.types'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import type { FireFeasibilityCardDetails } from './fireFeasibilityDisplay.types'

function resolveTargetName(targetId: string, targets: Target[]): string {
  const target = targets.find((item) => item.id === targetId)
  return target?.targetName ?? 'מטרה לא נמצאה'
}

function resolvePositionName(positionId: string, positions: Position[]): string {
  const position = positions.find((item) => item.id === positionId)
  return position?.stationName ?? 'עמדה לא נמצאה'
}

export function getFireFeasibilityCardTitle(record: FireFeasibilityRecord): string {
  return FIRE_FEASIBILITY_MODE_CONFIG[record.mode].formTitle
}

export function getFireFeasibilityCardDetails(
  record: FireFeasibilityRecord,
  targets: Target[],
  positions: Position[],
): FireFeasibilityCardDetails {
  return {
    modeLabel: getFireFeasibilityCardTitle(record),
    targetName: resolveTargetName(record.targetId, targets),
    positionName: resolvePositionName(record.positionId, positions),
    savedAtLabel: formatUpdatedAt(record.savedAt),
  }
}
