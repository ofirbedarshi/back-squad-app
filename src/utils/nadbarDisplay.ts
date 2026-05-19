import type { Indicator } from '../domain/indicator.types'
import type { Nadbar, NadbarType } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import type { NadbarCardDetails } from './nadbarDisplay.types'

const NADBAR_TYPE_LABELS: Record<NadbarType, string> = {
  PointerTeam: 'צוות ציון',
  Katmam: 'נדבר כטמ״מ',
  TzurPointer: 'נדבר צור מציין',
}

const NADBAR_UPDATED_AT_FORMAT = new Intl.DateTimeFormat('he-IL', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Asia/Jerusalem',
})

export function getNadbarCardTitle(nadbar: Nadbar): string {
  return getNadbarTypeLabel(nadbar.type)
}

export function getNadbarTypeLabel(type: NadbarType): string {
  return NADBAR_TYPE_LABELS[type]
}

export function formatNadbarUpdatedAt(isoUtc: string): string {
  const date = new Date(isoUtc)
  if (Number.isNaN(date.getTime())) {
    return '—'
  }
  return NADBAR_UPDATED_AT_FORMAT.format(date)
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

export function getNadbarCardDetails(
  nadbar: Nadbar,
  targets: Target[],
  indicators: Indicator[],
): NadbarCardDetails {
  return {
    targetName: resolveTargetName(nadbar.links?.targetId, targets),
    indicatorName: resolveIndicatorName(nadbar.links?.pointerId, indicators),
    updatedAtLabel: formatNadbarUpdatedAt(nadbar.updatedAt),
  }
}
