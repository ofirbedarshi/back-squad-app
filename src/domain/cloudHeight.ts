import { metersToFeet } from './unitConversion'
import type { CloudHeightSettings, CloudHeightUnit } from './cloudHeight.types'

export const CLOUD_HEIGHT_UNIT_OPTIONS = [
  { label: 'מטרים', value: 'meters' },
  { label: 'רגל', value: 'feet' },
] as const satisfies ReadonlyArray<{ label: string; value: CloudHeightUnit }>

export function cloudHeightToDisplayNumber(
  settings: CloudHeightSettings,
  displayUnit: CloudHeightUnit = settings.displayUnit,
): number | null {
  if (settings.heightMeters === null) return null
  const value =
    displayUnit === 'feet' ? metersToFeet(settings.heightMeters) : settings.heightMeters
  return Math.round(value)
}

export function formatCloudHeightInputValue(
  settings: CloudHeightSettings,
  displayUnit?: CloudHeightUnit,
): string {
  const displayNumber = cloudHeightToDisplayNumber(settings, displayUnit)
  return displayNumber === null ? '' : String(displayNumber)
}

export function formatCloudHeightWidgetLabel(settings: CloudHeightSettings): string {
  const displayNumber = cloudHeightToDisplayNumber(settings)
  if (displayNumber === null) return '—'
  const unit = settings.displayUnit === 'feet' ? 'רגל' : 'מ׳'
  return `${displayNumber.toLocaleString('he-IL')} ${unit}`
}
