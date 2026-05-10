import { setReferencePositionId } from '../storage/positionStorage'

export function setReferencePositionIdUseCase(id: string | null): void {
  setReferencePositionId(id)
}
