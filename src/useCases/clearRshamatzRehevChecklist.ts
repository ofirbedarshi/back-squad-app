import { createDefaultRshamatzRehevChecklist } from '../domain/rshamatzRehevChecklist'
import type { RshamatzRehevChecklistState } from '../domain/rshamatzRehevChecklist.types'
import { removeRshamatzRehevChecklist } from '../storage/rshamatzRehevChecklistStorage'

export function clearRshamatzRehevChecklistUseCase(): RshamatzRehevChecklistState {
  removeRshamatzRehevChecklist()
  return createDefaultRshamatzRehevChecklist()
}
