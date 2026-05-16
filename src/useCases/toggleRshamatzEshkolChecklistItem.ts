import { toggleChecklistItem } from '../domain/rshamatzEshkolChecklist'
import type { RshamatzEshkolChecklistState } from '../domain/rshamatzEshkolChecklist.types'
import { saveRshamatzEshkolChecklist } from '../storage/rshamatzEshkolChecklistStorage'

export function toggleRshamatzEshkolChecklistItemUseCase(
  itemId: string,
  current: RshamatzEshkolChecklistState
): RshamatzEshkolChecklistState {
  const next: RshamatzEshkolChecklistState = {
    ...current,
    checked: toggleChecklistItem(current.checked, itemId),
  }
  saveRshamatzEshkolChecklist(next)
  return next
}
