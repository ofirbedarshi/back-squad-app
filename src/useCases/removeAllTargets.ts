import { removeAllTargets } from '../storage/targetStorage'

export function removeAllTargetsUseCase(): void {
  removeAllTargets()
}
