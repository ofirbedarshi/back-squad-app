import { formatUpdatedAt } from './formatUpdatedAt'
import { nowIsoUtc } from './nowIsoUtc'
import type { UserNote } from './notes.types'

export function assertNoteHasBody(trimmedText: string, hasVoice: boolean): void {
  if (!trimmedText && !hasVoice) {
    throw new Error('חובה טקסט או הקלטה קולית')
  }
}

export function buildUserNote(
  id: string,
  text: string,
  createdAtIso: string,
  voiceMeta?: { mimeType: string; durationSec: number },
): UserNote {
  if (!voiceMeta) {
    return { id, text, createdAtIso }
  }
  return {
    id,
    text,
    createdAtIso,
    hasVoice: true,
    voiceMimeType: voiceMeta.mimeType,
    durationSec: voiceMeta.durationSec,
  }
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
  return notes.map((n) => (n.id === id ? { ...n, text, updatedAtIso } : n))
}

export function withNoteVoiceAttached(
  notes: readonly UserNote[],
  id: string,
  mimeType: string,
  durationSec: number,
): UserNote[] {
  const idx = notes.findIndex((n) => n.id === id)
  if (idx === -1) {
    throw new Error('הערה לא נמצאה')
  }
  const updatedAtIso = nowIsoUtc()
  return notes.map((n) =>
    n.id === id
      ? {
          ...n,
          hasVoice: true,
          voiceMimeType: mimeType,
          durationSec,
          updatedAtIso,
        }
      : n,
  )
}

export function withNoteVoiceRemoved(notes: readonly UserNote[], id: string): UserNote[] {
  const idx = notes.findIndex((n) => n.id === id)
  if (idx === -1) {
    throw new Error('הערה לא נמצאה')
  }
  const updatedAtIso = nowIsoUtc()
  return notes.map((n) =>
    n.id === id
      ? {
          ...n,
          hasVoice: false,
          voiceMimeType: undefined,
          durationSec: undefined,
          updatedAtIso,
        }
      : n,
  )
}

export function noteLastActivityIso(note: UserNote): string {
  return note.updatedAtIso ?? note.createdAtIso
}

export function formatUserNoteSavedAt(isoUtc: string): string {
  return formatUpdatedAt(isoUtc)
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
    const hasVoice = rec.hasVoice === true
    const voiceMimeType =
      typeof rec.voiceMimeType === 'string' && rec.voiceMimeType.length > 0 ? rec.voiceMimeType : undefined
    const durationSec =
      typeof rec.durationSec === 'number' && Number.isFinite(rec.durationSec) ? Math.floor(rec.durationSec) : undefined
    out.push({
      id: rec.id,
      text: rec.text,
      createdAtIso: rec.createdAtIso,
      ...(updatedAtIso !== undefined ? { updatedAtIso } : {}),
      ...(hasVoice ? { hasVoice: true } : {}),
      ...(voiceMimeType !== undefined ? { voiceMimeType } : {}),
      ...(durationSec !== undefined ? { durationSec } : {}),
    })
  }
  return out
}
