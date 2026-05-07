import { createTarget } from '../domain/target'
import type { TargetInput } from '../domain/target.types'
import { addTarget } from '../storage/targetStorage'

export function addTargetUseCase(input: TargetInput): void {
  const target = createTarget(input)
  addTarget(target)
}
