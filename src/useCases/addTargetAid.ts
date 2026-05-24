import { createTargetAid } from '../domain/targetAid'
import { normalizeTargetAidForm } from '../domain/targetAidForm'
import type { TargetAidInput } from '../domain/targetAid.types'
import { addTargetAid } from '../storage/targetAidStorage'

export function addTargetAidUseCase(input: TargetAidInput): void {
  addTargetAid(
    createTargetAid({
      values: normalizeTargetAidForm(input.values),
    }),
  )
}
