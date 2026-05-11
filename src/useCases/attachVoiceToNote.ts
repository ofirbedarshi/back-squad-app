import { withNoteVoiceAttached } from '../domain/notes'
import type { NoteVoicePayload, UserNote } from '../domain/notes.types'
import { assertVoiceBlobReady } from '../domain/voiceNote'
import { loadNotesFromStorage, saveNotesToStorage } from '../storage/notesStorage'
import { idbSaveNoteVoice } from '../storage/voiceNotesIDB'

export async function attachVoiceToNoteUseCase(id: string, voice: NoteVoicePayload): Promise<UserNote[]> {
  const blob = assertVoiceBlobReady(voice.blob)
  const mimeType = voice.mimeType || blob.type || 'audio/webm'
  const durationSec = Math.max(0, Math.floor(voice.durationSec))
  await idbSaveNoteVoice({ id, blob, mimeType })
  const next = withNoteVoiceAttached(loadNotesFromStorage(), id, mimeType, durationSec)
  saveNotesToStorage(next)
  return next
}
