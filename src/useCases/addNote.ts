import { assertNoteHasBody, buildUserNote, withNoteAppended } from '../domain/notes'
import type { NoteVoicePayload, UserNote } from '../domain/notes.types'
import { assertVoiceBlobReady } from '../domain/voiceNote'
import { loadNotesFromStorage, saveNotesToStorage } from '../storage/notesStorage'
import { idbSaveNoteVoice } from '../storage/voiceNotesIDB'

export async function addNoteUseCase(rawText: string, voice: NoteVoicePayload | null): Promise<UserNote[]> {
  const textTrimmed = rawText.trim()
  const hasVoice = voice !== null && voice.blob.size > 0
  assertNoteHasBody(textTrimmed, hasVoice)

  const id = crypto.randomUUID()
  const createdAtIso = new Date().toISOString()
  const durationSec = hasVoice && voice ? Math.max(0, Math.floor(voice.durationSec)) : 0

  if (hasVoice && voice) {
    const blob = assertVoiceBlobReady(voice.blob)
    await idbSaveNoteVoice({ id, blob, mimeType: voice.mimeType || blob.type || 'audio/webm' })
  }

  const note = buildUserNote(
    id,
    textTrimmed,
    createdAtIso,
    hasVoice && voice
      ? { mimeType: voice.mimeType || voice.blob.type || 'audio/webm', durationSec }
      : undefined,
  )

  const next = withNoteAppended(loadNotesFromStorage(), note)
  saveNotesToStorage(next)
  return next
}
