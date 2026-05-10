import { loadCloudHeightSettings } from '../storage/cloudHeightStorage'
import type { CloudHeightSettings } from '../domain/cloudHeight.types'

export function loadCloudHeight(): CloudHeightSettings {
  return loadCloudHeightSettings()
}
