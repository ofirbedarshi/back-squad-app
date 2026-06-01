import { formatUpdatedAt } from '../domain/formatUpdatedAt'
import { resolveLastFilledNadbarBlockTargetName } from '../domain/nadbarBlockTarget'
import type { Nadbar, NadbarType } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import type { NadbarCardDetails } from './nadbarDisplay.types'

const NADBAR_TYPE_LABELS: Record<NadbarType, string> = {
  PointerTeam: 'צוות ציון',
  PointerTeamUpdated: 'צוות ציון מעודכן',
  Katmam: 'נדבר כטמ״מ',
  TzurPointer: 'נדבר צור מציין',
}

export function getNadbarCardTitle(nadbar: Nadbar): string {
  return getNadbarTypeLabel(nadbar.type)
}

export function getNadbarTypeLabel(type: NadbarType): string {
  return NADBAR_TYPE_LABELS[type]
}

export function getNadbarCardDetails(nadbar: Nadbar, targets: Target[]): NadbarCardDetails {
  return {
    targetName: resolveLastFilledNadbarBlockTargetName(nadbar, targets) ?? 'ללא מטרה',
    updatedAtLabel: formatUpdatedAt(nadbar.updatedAt),
  }
}
