import type { FormDraftValues } from '../domain/formDraft.types'
import { loadFormDraft as loadFromStorage } from '../storage/formDraftStorage'

export function loadFormDraftUseCase(formDraftKey: string): FormDraftValues | null {
  return loadFromStorage(formDraftKey)
}
