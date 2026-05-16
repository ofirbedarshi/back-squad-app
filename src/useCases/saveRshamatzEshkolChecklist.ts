import type { RshamatzEshkolChecklistState } from '../domain/rshamatzEshkolChecklist.types'
import { saveRshamatzEshkolChecklist } from '../storage/rshamatzEshkolChecklistStorage'

export function saveRshamatzEshkolChecklistUseCase(state: RshamatzEshkolChecklistState): void {
  saveRshamatzEshkolChecklist(state)
}
