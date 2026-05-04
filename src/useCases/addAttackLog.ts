import { createAttackLog } from '../domain/attackLog'
import { addAttackLog } from '../storage/attackLogStorage'
import type { AttackLogInput } from '../domain/attackLog.types'

export function addAttackLogUseCase(input: AttackLogInput): void {
  const log = createAttackLog(input)
  addAttackLog(log)
}
