import { loadNotesFromStorage } from '../storage/notesStorage'
import type { UserNote } from '../domain/notes.types'

export function loadNotesUseCase(): UserNote[] {
  return loadNotesFromStorage()
}
