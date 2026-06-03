import { removeAllMissChecklists } from '../storage/missChecklistStorage'

export function removeAllMissChecklistsUseCase(): void {
  removeAllMissChecklists()
}
