import { normalizeRshamatzEshkolChecklist } from '../domain/rshamatzEshkolChecklist'
import type { RshamatzEshkolChecklistState } from '../domain/rshamatzEshkolChecklist.types'

const STORAGE_KEY = 'rshamatz-eshkol-checklist'

export function loadRshamatzEshkolChecklist(): RshamatzEshkolChecklistState {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return normalizeRshamatzEshkolChecklist(null)

  try {
    return normalizeRshamatzEshkolChecklist(JSON.parse(raw))
  } catch {
    return normalizeRshamatzEshkolChecklist(null)
  }
}

export function saveRshamatzEshkolChecklist(state: RshamatzEshkolChecklistState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function removeRshamatzEshkolChecklist(): void {
  localStorage.removeItem(STORAGE_KEY)
}
