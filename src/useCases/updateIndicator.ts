import { applyIndicatorUpdate } from '../domain/indicator'
import { loadIndicators, updateIndicator } from '../storage/indicatorStorage'
import type { IndicatorInput } from '../domain/indicator.types'

export function updateIndicatorUseCase(id: string, input: IndicatorInput): void {
  const indicators = loadIndicators()
  const existing = indicators.find((ind) => ind.id === id)
  if (!existing) throw new Error(`Indicator with id "${id}" not found`)
  const updated = applyIndicatorUpdate(existing, input)
  updateIndicator(updated)
}
