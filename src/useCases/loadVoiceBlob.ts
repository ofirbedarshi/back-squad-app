import { idbGetNoteVoice } from '../storage/voiceNotesIDB'

export async function loadVoiceBlobUseCase(noteId: string): Promise<Blob> {
  const row = await idbGetNoteVoice(noteId)
  if (!row?.blob || row.blob.size === 0) {
    throw new Error('הקלטה לא נמצאה')
  }
  return row.blob
}
