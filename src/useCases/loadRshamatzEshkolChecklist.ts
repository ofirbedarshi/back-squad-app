import type { RshamatzEshkolChecklistState } from '../domain/rshamatzEshkolChecklist.types'
import { loadRshamatzEshkolChecklist } from '../storage/rshamatzEshkolChecklistStorage'

export function loadRshamatzEshkolChecklistUseCase(): RshamatzEshkolChecklistState {
  return loadRshamatzEshkolChecklist()
}
