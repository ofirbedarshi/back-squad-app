import type { RshamatzRehevChecklistState } from '../domain/rshamatzRehevChecklist.types'
import { loadRshamatzRehevChecklist } from '../storage/rshamatzRehevChecklistStorage'

export function loadRshamatzRehevChecklistUseCase(): RshamatzRehevChecklistState {
  return loadRshamatzRehevChecklist()
}
