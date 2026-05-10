import type { UserNote } from './notes.types'

export function assertNonEmptyNoteText(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed) {
    throw new Error('תוכן ההערה ריק')
  }
  return trimmed
}

export function buildUserNote(id: string, text: string, createdAtIso: string): UserNote {
  return { id, text, createdAtIso }
}

export function withNoteAppended(notes: readonly UserNote[], note: UserNote): UserNote[] {
  return [...notes, note]
}

export function withNoteRemoved(notes: readonly UserNote[], id: string): UserNote[] {
  return notes.filter((n) => n.id !== id)
}

export function withNoteTextUpdated(
  notes: readonly UserNote[],
  id: string,
  text: string,
  updatedAtIso: string,
): UserNote[] {
  const idx = notes.findIndex((n) => n.id === id)
  if (idx === -1) {
    throw new Error('הערה לא נמצאה')
  }
  return notes.map((n) =>
    n.id === id ? { ...n, text, updatedAtIso } : n,
  )
}

export function noteLastActivityIso(note: UserNote): string {
  return note.updatedAtIso ?? note.createdAtIso
}

const NOTE_DATETIME_FORMAT = new Intl.DateTimeFormat('he-IL', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Asia/Jerusalem',
})

export function formatUserNoteSavedAt(isoUtc: string): string {
  const d = new Date(isoUtc)
  if (Number.isNaN(d.getTime())) {
    return '—'
  }
  return NOTE_DATETIME_FORMAT.format(d)
}

export function parseNotesJson(raw: unknown): UserNote[] {
  if (!Array.isArray(raw)) return []
  const out: UserNote[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const rec = item as Record<string, unknown>
    if (typeof rec.id !== 'string' || typeof rec.text !== 'string' || typeof rec.createdAtIso !== 'string') {
      continue
    }
    const updatedAtIso =
      typeof rec.updatedAtIso === 'string' && rec.updatedAtIso.length > 0 ? rec.updatedAtIso : undefined
    out.push({
      id: rec.id,
      text: rec.text,
      createdAtIso: rec.createdAtIso,
      ...(updatedAtIso !== undefined ? { updatedAtIso } : {}),
    })
  }
  return out
}
