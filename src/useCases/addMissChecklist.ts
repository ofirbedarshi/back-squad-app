import { createMissChecklist } from '../domain/missChecklist'
import type { MissChecklistInput } from '../domain/missChecklist.types'
import { addMissChecklist } from '../storage/missChecklistStorage'

export function addMissChecklistUseCase(input: MissChecklistInput): void {
  addMissChecklist(createMissChecklist(input))
}
