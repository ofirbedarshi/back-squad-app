import { removeIndicator } from '../storage/indicatorStorage'

export function removeIndicatorUseCase(id: string): void {
  removeIndicator(id)
}
