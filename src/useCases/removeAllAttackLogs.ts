import { removeAllAttackLogs } from '../storage/attackLogStorage'

export function removeAllAttackLogsUseCase(): void {
  removeAllAttackLogs()
}
