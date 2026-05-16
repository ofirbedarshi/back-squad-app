import type { RshamatzEshkolChecklistState } from './rshamatzEshkolChecklist.types'

export function createDefaultRshamatzEshkolChecklist(): RshamatzEshkolChecklistState {
  return { checked: {}, notes: '' }
}

export function toggleChecklistItem(
  checked: Record<string, boolean>,
  itemId: string
): Record<string, boolean> {
  return { ...checked, [itemId]: !checked[itemId] }
}

export function normalizeRshamatzEshkolChecklist(raw: unknown): RshamatzEshkolChecklistState {
  const fallback = createDefaultRshamatzEshkolChecklist()
  if (!raw || typeof raw !== 'object') return fallback

  const value = raw as Record<string, unknown>
  const checked =
    value.checked && typeof value.checked === 'object' && !Array.isArray(value.checked)
      ? { ...(value.checked as Record<string, boolean>) }
      : {}
  const notes = typeof value.notes === 'string' ? value.notes : ''

  return { checked, notes }
}
