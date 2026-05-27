import { roundMetric } from '../utils/metricRounding.ts'
import { metersToFeet } from './unitConversion.ts'
import type { CloudHeightSettings, CloudHeightUnit } from './cloudHeight.types'

/** Same 2-decimal rounding as azimuth, range, and other live metrics. */
export function normalizeCloudHeightMeters(heightMeters: number | null): number | null {
  if (heightMeters === null) return null
  return roundMetric(heightMeters)
}

export function normalizeCloudHeightSettings(settings: CloudHeightSettings): CloudHeightSettings {
  return {
    ...settings,
    heightMeters: normalizeCloudHeightMeters(settings.heightMeters),
  }
}

export const CLOUD_HEIGHT_UNIT_OPTIONS = [
  { label: 'מטרים', value: 'meters' },
  { label: 'רגל', value: 'feet' },
] as const satisfies ReadonlyArray<{ label: string; value: CloudHeightUnit }>

export function cloudHeightToDisplayNumber(
  settings: CloudHeightSettings,
  displayUnit: CloudHeightUnit = settings.displayUnit,
): number | null {
  const heightMeters = normalizeCloudHeightMeters(settings.heightMeters)
  if (heightMeters === null) return null
  const value = displayUnit === 'feet' ? metersToFeet(heightMeters) : heightMeters
  return Math.round(value)
}

export function formatCloudHeightInputValue(
  settings: CloudHeightSettings,
  displayUnit?: CloudHeightUnit,
): string {
  const displayNumber = cloudHeightToDisplayNumber(settings, displayUnit)
  return displayNumber === null ? '' : String(displayNumber)
}

export function cloudHeightDisplayUnitLabel(unit: CloudHeightUnit): string {
  return unit === 'feet' ? 'רגל' : 'מטר'
}

export function formatCloudHeightWidgetLabel(settings: CloudHeightSettings): string {
  const displayNumber = cloudHeightToDisplayNumber(settings)
  if (displayNumber === null) return '—'
  const unit = settings.displayUnit === 'feet' ? 'רגל' : 'מ׳'
  return `${displayNumber.toLocaleString('he-IL')} ${unit}`
}
