import type { Nadbar, NadbarType } from '../domain/nadbar.types'

const NADBAR_TYPE_LABELS: Record<NadbarType, string> = {
  PointerTeam: 'צוות ציון',
  Katmam: 'נדבר כטמ״מ',
  TzurPointer: 'נדבר צור מציין',
}

const MESSAGE_PREVIEW_MAX_LENGTH = 48

export function getNadbarCardTitle(nadbar: Nadbar): string {
  return getNadbarTypeLabel(nadbar.type)
}

export function getNadbarCardSubtitle(nadbar: Nadbar): string {
  const firstMessage = nadbar.messages[0]
  if (!firstMessage) return ''
  const trimmed = firstMessage.content.trim()
  if (trimmed.length <= MESSAGE_PREVIEW_MAX_LENGTH) return trimmed
  return `${trimmed.slice(0, MESSAGE_PREVIEW_MAX_LENGTH)}…`
}

export function getNadbarTypeLabel(type: NadbarType): string {
  return NADBAR_TYPE_LABELS[type]
}
