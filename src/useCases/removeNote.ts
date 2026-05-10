import { withNoteRemoved } from '../domain/notes'
import { loadNotesFromStorage, saveNotesToStorage } from '../storage/notesStorage'
import type { UserNote } from '../domain/notes.types'

export function removeNoteUseCase(id: string): UserNote[] {
  const next = withNoteRemoved(loadNotesFromStorage(), id)
  saveNotesToStorage(next)
  return next
}
