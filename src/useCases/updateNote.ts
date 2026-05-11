import { assertNoteHasBody, withNoteTextUpdated } from '../domain/notes'
import type { UserNote } from '../domain/notes.types'
import { loadNotesFromStorage, saveNotesToStorage } from '../storage/notesStorage'

export function updateNoteUseCase(id: string, rawText: string): UserNote[] {
  const notes = loadNotesFromStorage()
  const existing = notes.find((n) => n.id === id)
  if (!existing) {
    throw new Error('הערה לא נמצאה')
  }
  const text = rawText.trim()
  assertNoteHasBody(text, existing.hasVoice === true)
  const next = withNoteTextUpdated(notes, id, text, new Date().toISOString())
  saveNotesToStorage(next)
  return next
}
