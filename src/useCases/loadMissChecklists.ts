import { sortByUpdatedAtDesc } from '../domain/sortByUpdatedAt'
import type { MissChecklist } from '../domain/missChecklist.types'
import { loadMissChecklists } from '../storage/missChecklistStorage'

export function loadMissChecklistsUseCase(): MissChecklist[] {
  return sortByUpdatedAtDesc(loadMissChecklists())
}
