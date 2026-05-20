import { applyWithUpdatedAt } from './applyWithUpdatedAt'
import { createWithUpdatedAt } from './createWithUpdatedAt'
import type { Indicator, IndicatorInput } from './indicator.types'

export function createIndicator(input: IndicatorInput): Indicator {
  return createWithUpdatedAt(input)
}

export function applyIndicatorUpdate(existing: Indicator, input: IndicatorInput): Indicator {
  return applyWithUpdatedAt(existing, input)
}
