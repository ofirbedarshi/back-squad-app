import { createDefaultRshamatzEshkolChecklist } from '../domain/rshamatzEshkolChecklist'
import type { RshamatzEshkolChecklistState } from '../domain/rshamatzEshkolChecklist.types'
import { removeRshamatzEshkolChecklist } from '../storage/rshamatzEshkolChecklistStorage'

export function clearRshamatzEshkolChecklistUseCase(): RshamatzEshkolChecklistState {
  removeRshamatzEshkolChecklist()
  return createDefaultRshamatzEshkolChecklist()
}
