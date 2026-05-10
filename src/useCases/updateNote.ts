import {
  assertNonEmptyNoteText,
  withNoteTextUpdated,
} from '../domain/notes'
import { loadNotesFromStorage, saveNotesToStorage } from '../storage/notesStorage'
import type { UserNote } from '../domain/notes.types'

export function updateNoteUseCase(id: string, rawText: string): UserNote[] {
  const text = assertNonEmptyNoteText(rawText)
  const next = withNoteTextUpdated(loadNotesFromStorage(), id, text, new Date().toISOString())
  saveNotesToStorage(next)
  return next
}
