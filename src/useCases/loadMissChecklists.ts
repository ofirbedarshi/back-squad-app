import type { MissChecklist } from '../domain/missChecklist.types'
import { loadMissChecklists } from '../storage/missChecklistStorage'

export function loadMissChecklistsUseCase(): MissChecklist[] {
  return loadMissChecklists()
}
