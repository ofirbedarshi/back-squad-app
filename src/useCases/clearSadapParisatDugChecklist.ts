import { removeCheckedItems } from '../storage/sadapParisatDugChecklistStorage'

export function clearSadapParisatDugChecklistUseCase(): Record<string, boolean> {
  removeCheckedItems()
  return {}
}
