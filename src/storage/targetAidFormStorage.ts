import { normalizeTargetAidForm } from '../domain/targetAidForm'
import type { FormValues } from '../domain/dynamicForm.types'

const STORAGE_KEY = 'target-aid-commander-draft'

export function loadTargetAidFormRaw(): unknown {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function loadTargetAidForm(): FormValues {
  return normalizeTargetAidForm(loadTargetAidFormRaw())
}

export function saveTargetAidForm(state: FormValues): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function removeTargetAidForm(): void {
  localStorage.removeItem(STORAGE_KEY)
}
