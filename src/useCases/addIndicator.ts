import { createIndicator } from '../domain/indicator'
import { addIndicator } from '../storage/indicatorStorage'
import type { IndicatorInput } from '../domain/indicator.types'

export function addIndicatorUseCase(input: IndicatorInput): void {
  const indicator = createIndicator(input)
  addIndicator(indicator)
}
