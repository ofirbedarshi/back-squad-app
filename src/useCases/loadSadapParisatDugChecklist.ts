import { loadCheckedItems } from '../storage/sadapParisatDugChecklistStorage'

export function loadSadapParisatDugChecklistUseCase(): Record<string, boolean> {
  return loadCheckedItems()
}
