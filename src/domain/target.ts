import type { Target, TargetInput } from './target.types'

export function createTarget(input: TargetInput): Target {
  return {
    id: crypto.randomUUID(),
    ...input,
  }
}

export function applyTargetUpdate(existing: Target, input: TargetInput): Target {
  return {
    ...input,
    id: existing.id,
  }
}
