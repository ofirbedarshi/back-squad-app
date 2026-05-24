import { normalizeTargetAidForm } from '../domain/targetAidForm'
import { sortByUpdatedAtDesc } from '../domain/sortByUpdatedAt'
import type { TargetAid } from '../domain/targetAid.types'
import { loadTargetAids } from '../storage/targetAidStorage'

export function loadTargetAidsUseCase(): TargetAid[] {
  return sortByUpdatedAtDesc(loadTargetAids()).map((item) => ({
    ...item,
    values: normalizeTargetAidForm(item.values),
  }))
}
