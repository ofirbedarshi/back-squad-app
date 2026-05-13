import { removeAllPositions } from '../storage/positionStorage'

export function removeAllPositionsUseCase(): void {
  removeAllPositions()
}
