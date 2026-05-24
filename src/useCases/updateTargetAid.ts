import { applyTargetAidUpdate } from '../domain/targetAid'
import { normalizeTargetAidForm } from '../domain/targetAidForm'
import type { TargetAid, TargetAidInput } from '../domain/targetAid.types'
import { updateTargetAid } from '../storage/targetAidStorage'

export function updateTargetAidUseCase(existing: TargetAid, input: TargetAidInput): void {
  updateTargetAid(
    applyTargetAidUpdate(existing, {
      values: normalizeTargetAidForm(input.values),
    }),
  )
}
