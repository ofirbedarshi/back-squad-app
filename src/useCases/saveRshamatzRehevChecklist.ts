import type { RshamatzRehevChecklistState } from '../domain/rshamatzRehevChecklist.types'
import { saveRshamatzRehevChecklist } from '../storage/rshamatzRehevChecklistStorage'

export function saveRshamatzRehevChecklistUseCase(state: RshamatzRehevChecklistState): void {
  saveRshamatzRehevChecklist(state)
}
