import { removeTarget } from '../storage/targetStorage'

export function removeTargetUseCase(id: string): void {
  removeTarget(id)
}
