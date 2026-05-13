import { removePosition } from '../storage/positionStorage'

export function removePositionUseCase(id: string): void {
  removePosition(id)
}
