import { applyWithUpdatedAt } from './applyWithUpdatedAt'
import { createWithUpdatedAt } from './createWithUpdatedAt'
import type { TargetAid, TargetAidInput } from './targetAid.types'

export function createTargetAid(input: TargetAidInput): TargetAid {
  return createWithUpdatedAt(input)
}

export function applyTargetAidUpdate(existing: TargetAid, input: TargetAidInput): TargetAid {
  return applyWithUpdatedAt(existing, input)
}
