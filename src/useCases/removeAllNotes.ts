import type { UserNote } from '../domain/notes.types'
import { removeAllNotesFromStorage } from '../storage/notesStorage'
import { idbClearAllNoteVoices } from '../storage/voiceNotesIDB'

export async function removeAllNotesUseCase(): Promise<UserNote[]> {
  await idbClearAllNoteVoices()
  removeAllNotesFromStorage()
  return []
}
