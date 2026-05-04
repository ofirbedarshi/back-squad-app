import { addIndicator } from '../storage/indicatorStorage'
import type { IndicatorInput, Indicator } from '../domain/indicator.types'

export function addIndicatorUseCase(_input: IndicatorInput): void {
  const indicator: Indicator = {
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  }
  addIndicator(indicator)
}
