import { applyTargetUpdate } from '../domain/target'
import type { TargetInput } from '../domain/target.types'
import { loadTargets, updateTarget } from '../storage/targetStorage'

export function updateTargetUseCase(id: string, input: TargetInput): void {
  const targets = loadTargets()
  const existing = targets.find((target) => target.id === id)
  if (!existing) throw new Error(`Target with id "${id}" not found`)
  const updated = applyTargetUpdate(existing, input)
  updateTarget(updated)
}
