import type { CloudHeightSettings } from '../domain/cloudHeight.types'

const CLOUD_HEIGHT_KEY = 'cloudHeight'

const DEFAULT_SETTINGS: CloudHeightSettings = {
  heightMeters: null,
  displayUnit: 'meters',
}

export function loadCloudHeightSettings(): CloudHeightSettings {
  const raw = localStorage.getItem(CLOUD_HEIGHT_KEY)
  if (!raw) return { ...DEFAULT_SETTINGS }
  try {
    return JSON.parse(raw) as CloudHeightSettings
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveCloudHeightSettings(settings: CloudHeightSettings): void {
  localStorage.setItem(CLOUD_HEIGHT_KEY, JSON.stringify(settings))
}

export function clearCloudHeightSettings(): void {
  localStorage.removeItem(CLOUD_HEIGHT_KEY)
}
