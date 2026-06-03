import { clearAllAppData } from '../storage/clearAllAppData'
import { removeAllNotesUseCase } from './removeAllNotes'

export async function clearAllAppDataUseCase(): Promise<void> {
  clearAllAppData()
  await removeAllNotesUseCase()
}
