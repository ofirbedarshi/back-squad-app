import type { FormDraftValues } from '../domain/formDraft.types'

const PREFIX = 'form-draft:'

export function storageKeyForFormDraft(formDraftKey: string): string {
  return PREFIX + formDraftKey
}

export function loadFormDraft(formDraftKey: string): FormDraftValues | null {
  try {
    const raw = localStorage.getItem(storageKeyForFormDraft(formDraftKey))
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return null
    return parsed as FormDraftValues
  } catch {
    return null
  }
}

export function saveFormDraft(formDraftKey: string, values: FormDraftValues): void {
  localStorage.setItem(storageKeyForFormDraft(formDraftKey), JSON.stringify(values))
}

export function clearFormDraft(formDraftKey: string): void {
  localStorage.removeItem(storageKeyForFormDraft(formDraftKey))
}
