import { removeAllAttackLogs } from './attackLogStorage'
import { removeAllBachs } from './bachStorage'
import { clearCloudHeightSettings } from './cloudHeightStorage'
import { removeAllFireFeasibilityRecords } from './fireFeasibilityStorage'
import { removeAllIndicators } from './indicatorStorage'
import { removeAllMissChecklists } from './missChecklistStorage'
import { removeAllNadbars } from './nadbarStorage'
import { removeAllPositions } from './positionStorage'
import { removeRshamatzEshkolChecklist } from './rshamatzEshkolChecklistStorage'
import { removeRshamatzRehevChecklist } from './rshamatzRehevChecklistStorage'
import { removeCheckedItems } from './sadapParisatDugChecklistStorage'
import { removeAllTargetAids } from './targetAidStorage'
import { removeAllTargets } from './targetStorage'

/** Wipes all localStorage-backed app data except notes (handled async via use-case). */
export function clearAllAppData(): void {
  removeAllPositions()
  removeAllTargets()
  removeAllIndicators()
  removeAllNadbars()
  removeAllFireFeasibilityRecords()
  removeAllAttackLogs()
  removeAllBachs()
  removeAllMissChecklists()
  removeAllTargetAids()
  removeRshamatzRehevChecklist()
  removeRshamatzEshkolChecklist()
  removeCheckedItems()
  clearCloudHeightSettings()
}
