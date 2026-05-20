import { formatUpdatedAt } from '../domain/formatUpdatedAt'
import type { Indicator } from '../domain/indicator.types'
import type { Nadbar, NadbarType } from '../domain/nadbar.types'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import type { NadbarCardDetails } from './nadbarDisplay.types'

const NADBAR_TYPE_LABELS: Record<NadbarType, string> = {
  PointerTeam: 'צוות ציון',
  Katmam: 'נדבר כטמ״מ',
  TzurPointer: 'נדבר צור מציין',
}

export function getNadbarCardTitle(nadbar: Nadbar): string {
  return getNadbarTypeLabel(nadbar.type)
}

export function getNadbarTypeLabel(type: NadbarType): string {
  return NADBAR_TYPE_LABELS[type]
}

function resolveTargetName(targetId: string | undefined, targets: Target[]): string {
  if (!targetId) return 'ללא מטרה'
  const target = targets.find((item) => item.id === targetId)
  return target?.targetName ?? 'מטרה לא נמצאה'
}

function resolveIndicatorName(pointerId: string | undefined, indicators: Indicator[]): string {
  if (!pointerId) return 'ללא מציין'
  const indicator = indicators.find((item) => item.id === pointerId)
  return indicator?.indicatorName ?? 'מציין לא נמצא'
}

function resolvePositionName(positionId: string | undefined, positions: Position[]): string {
  if (!positionId) return 'ללא עמדה'
  const position = positions.find((item) => item.id === positionId)
  return position?.stationName ?? 'עמדה לא נמצאה'
}

export function getNadbarCardDetails(
  nadbar: Nadbar,
  targets: Target[],
  indicators: Indicator[],
  positions: Position[],
): NadbarCardDetails {
  return {
    targetName: resolveTargetName(nadbar.links?.targetId, targets),
    indicatorName: resolveIndicatorName(nadbar.links?.pointerId, indicators),
    positionName: resolvePositionName(nadbar.links?.positionId, positions),
    updatedAtLabel: formatUpdatedAt(nadbar.updatedAt),
  }
}
