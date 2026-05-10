import { parseNotesJson } from '../domain/notes'
import type { UserNote } from '../domain/notes.types'

const NOTES_KEY = 'userNotes'

export function loadNotesFromStorage(): UserNote[] {
  const raw = localStorage.getItem(NOTES_KEY)
  if (!raw) return []
  try {
    return parseNotesJson(JSON.parse(raw) as unknown)
  } catch {
    return []
  }
}

export function saveNotesToStorage(notes: UserNote[]): void {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
}
