import { withNoteRemoved } from '../domain/notes'
import type { UserNote } from '../domain/notes.types'
import { loadNotesFromStorage, saveNotesToStorage } from '../storage/notesStorage'
import { idbDeleteNoteVoice } from '../storage/voiceNotesIDB'

export async function removeNoteUseCase(id: string): Promise<UserNote[]> {
  const current = loadNotesFromStorage()
  const target = current.find((n) => n.id === id)
  if (target?.hasVoice) {
    await idbDeleteNoteVoice(id)
  }
  const next = withNoteRemoved(current, id)
  saveNotesToStorage(next)
  return next
}
