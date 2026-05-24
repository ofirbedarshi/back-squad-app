import { removeTargetAid } from '../storage/targetAidStorage'

export function removeTargetAidUseCase(id: string): void {
  removeTargetAid(id)
}
