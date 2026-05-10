import { saveCloudHeightSettings } from '../storage/cloudHeightStorage'
import type { CloudHeightUnit } from '../domain/cloudHeight.types'

export function saveCloudHeight(heightMeters: number | null, displayUnit: CloudHeightUnit): void {
  if (heightMeters !== null && (!Number.isFinite(heightMeters) || heightMeters < 0)) {
    throw new Error('גובה ענן לא תקין')
  }
  saveCloudHeightSettings({ heightMeters, displayUnit })
}
