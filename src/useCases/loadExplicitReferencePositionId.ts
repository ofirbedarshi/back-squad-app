import { loadExplicitReferencePositionId } from '../storage/positionStorage'

export function loadExplicitReferencePositionIdUseCase(): string | null {
  return loadExplicitReferencePositionId()
}
