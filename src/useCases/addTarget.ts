import { createTarget } from '../domain/target'
import type { Target, TargetInput } from '../domain/target.types'
import { addTarget } from '../storage/targetStorage'

export function addTargetUseCase(input: TargetInput): Target {
  const target = createTarget(input)
  addTarget(target)
  return target
}
