import type { Indicator } from '../domain/indicator.types'

export function getIndicatorSearchFields(indicator: Indicator): string[] {
  return [
    indicator.indicatorName,
    indicator.means,
    String(indicator.markCode),
  ]
}
