import { sortByUpdatedAtDesc } from '../domain/sortByUpdatedAt'
import type { Indicator } from '../domain/indicator.types'
import { loadIndicators } from '../storage/indicatorStorage'

export function loadIndicatorsUseCase(): Indicator[] {
  return sortByUpdatedAtDesc(loadIndicators())
}
