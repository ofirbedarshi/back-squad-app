import { sortByUpdatedAtDesc } from '../domain/sortByUpdatedAt'
import type { Target } from '../domain/target.types'
import { loadTargets } from '../storage/targetStorage'

export function loadTargetsUseCase(): Target[] {
  return sortByUpdatedAtDesc(loadTargets())
}
