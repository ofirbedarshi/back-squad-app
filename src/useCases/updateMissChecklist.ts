import { applyMissChecklistUpdate } from '../domain/missChecklist'
import type { MissChecklist, MissChecklistInput } from '../domain/missChecklist.types'
import { updateMissChecklist } from '../storage/missChecklistStorage'

export function updateMissChecklistUseCase(existing: MissChecklist, input: MissChecklistInput): void {
  updateMissChecklist(applyMissChecklistUpdate(existing, input))
}
