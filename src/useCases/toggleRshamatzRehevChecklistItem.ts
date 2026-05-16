import { toggleChecklistItem } from '../domain/rshamatzRehevChecklist'
import type { RshamatzRehevChecklistState } from '../domain/rshamatzRehevChecklist.types'
import { saveRshamatzRehevChecklist } from '../storage/rshamatzRehevChecklistStorage'

export function toggleRshamatzRehevChecklistItemUseCase(
  itemId: string,
  current: RshamatzRehevChecklistState
): RshamatzRehevChecklistState {
  const next: RshamatzRehevChecklistState = {
    ...current,
    checked: toggleChecklistItem(current.checked, itemId),
  }
  saveRshamatzRehevChecklist(next)
  return next
}
