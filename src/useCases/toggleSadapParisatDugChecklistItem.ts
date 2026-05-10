import { loadCheckedItems, saveCheckedItems } from '../storage/sadapParisatDugChecklistStorage'

export function toggleSadapParisatDugChecklistItemUseCase(id: string): Record<string, boolean> {
  const current = loadCheckedItems()
  const updated = { ...current, [id]: !current[id] }
  saveCheckedItems(updated)
  return updated
}
