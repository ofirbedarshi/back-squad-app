import { withNoteRemoved, withNoteVoiceRemoved } from '../domain/notes'
import type { UserNote } from '../domain/notes.types'
import { loadNotesFromStorage, saveNotesToStorage } from '../storage/notesStorage'
import { idbDeleteNoteVoice } from '../storage/voiceNotesIDB'

/**
 * Removes the voice blob. If the note had no text, the whole note is removed.
 */
export async function removeVoiceFromNoteUseCase(id: string): Promise<UserNote[]> {
  const notes = loadNotesFromStorage()
  const n = notes.find((x) => x.id === id)
  if (!n?.hasVoice) {
    return notes
  }
  await idbDeleteNoteVoice(id)
  if (!n.text.trim()) {
    const next = withNoteRemoved(notes, id)
    saveNotesToStorage(next)
    return next
  }
  const next = withNoteVoiceRemoved(notes, id)
  saveNotesToStorage(next)
  return next
}
