import { clearFormDraft as clearInStorage } from '../storage/formDraftStorage'

export function clearFormDraftUseCase(formDraftKey: string): void {
  clearInStorage(formDraftKey)
}
