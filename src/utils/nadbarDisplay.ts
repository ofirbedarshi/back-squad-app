import type { Nadbar, NadbarType } from '../domain/nadbar.types'

const NADBAR_TYPE_LABELS: Record<NadbarType, string> = {
  PointerTeam: 'צוות ציון',
  Katmam: 'נדבר כטמ״מ',
  TzurPointer: 'נדבר צור מציין',
}

export function getNadbarCardTitle(nadbar: Nadbar): string {
  return `נדבר · ${nadbar.id.slice(0, 8)}`
}

export function getNadbarTypeLabel(type: NadbarType): string {
  return NADBAR_TYPE_LABELS[type]
}
