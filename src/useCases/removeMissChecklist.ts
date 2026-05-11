import { removeMissChecklist } from '../storage/missChecklistStorage'

export function removeMissChecklistUseCase(id: string): void {
  removeMissChecklist(id)
}
