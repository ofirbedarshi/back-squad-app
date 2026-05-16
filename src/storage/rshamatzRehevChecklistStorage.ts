import { normalizeRshamatzRehevChecklist } from '../domain/rshamatzRehevChecklist'
import type { RshamatzRehevChecklistState } from '../domain/rshamatzRehevChecklist.types'

const STORAGE_KEY = 'rshamatz-rehev-checklist'

export function loadRshamatzRehevChecklist(): RshamatzRehevChecklistState {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return normalizeRshamatzRehevChecklist(null)

  try {
    return normalizeRshamatzRehevChecklist(JSON.parse(raw))
  } catch {
    return normalizeRshamatzRehevChecklist(null)
  }
}

export function saveRshamatzRehevChecklist(state: RshamatzRehevChecklistState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function removeRshamatzRehevChecklist(): void {
  localStorage.removeItem(STORAGE_KEY)
}
