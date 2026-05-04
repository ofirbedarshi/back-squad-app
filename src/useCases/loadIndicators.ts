import { loadIndicators } from '../storage/indicatorStorage'
import type { Indicator } from '../domain/indicator.types'

export function loadIndicatorsUseCase(): Indicator[] {
  return loadIndicators()
}
