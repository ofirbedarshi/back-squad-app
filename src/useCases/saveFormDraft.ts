import type { FormDraftValues } from '../domain/formDraft.types'
import { saveFormDraft as saveToStorage } from '../storage/formDraftStorage'

export function saveFormDraftUseCase(formDraftKey: string, values: FormDraftValues): void {
  saveToStorage(formDraftKey, values)
}
