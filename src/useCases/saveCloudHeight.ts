import { normalizeCloudHeightMeters } from '../domain/cloudHeight'
import { saveCloudHeightSettings } from '../storage/cloudHeightStorage'
import type { CloudHeightSettings, CloudHeightUnit } from '../domain/cloudHeight.types'

export function saveCloudHeight(
  heightMeters: number | null,
  displayUnit: CloudHeightUnit,
): CloudHeightSettings {
  if (heightMeters !== null && (!Number.isFinite(heightMeters) || heightMeters < 0)) {
    throw new Error('גובה ענן לא תקין')
  }
  const settings: CloudHeightSettings = {
    heightMeters: normalizeCloudHeightMeters(heightMeters),
    displayUnit,
  }
  saveCloudHeightSettings(settings)
  return settings
}
