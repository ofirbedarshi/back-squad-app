import { removeAttackLog } from '../storage/attackLogStorage'

export function removeAttackLogUseCase(id: string): void {
  removeAttackLog(id)
}
