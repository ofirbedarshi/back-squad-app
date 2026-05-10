import {
  assertNonEmptyNoteText,
  buildUserNote,
  withNoteAppended,
} from '../domain/notes'
import { loadNotesFromStorage, saveNotesToStorage } from '../storage/notesStorage'
import type { UserNote } from '../domain/notes.types'

export function addNoteUseCase(rawText: string): UserNote[] {
  const text = assertNonEmptyNoteText(rawText)
  const note = buildUserNote(crypto.randomUUID(), text, new Date().toISOString())
  const next = withNoteAppended(loadNotesFromStorage(), note)
  saveNotesToStorage(next)
  return next
}
