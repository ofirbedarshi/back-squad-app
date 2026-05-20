import { applyWithUpdatedAt } from './applyWithUpdatedAt'
import { createWithUpdatedAt } from './createWithUpdatedAt'
import type { Target, TargetInput } from './target.types'

export function createTarget(input: TargetInput): Target {
  return createWithUpdatedAt(input)
}

export function applyTargetUpdate(existing: Target, input: TargetInput): Target {
  return applyWithUpdatedAt(existing, input)
}
