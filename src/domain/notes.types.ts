/** Binary voice attachment saved in IndexedDB under the same id as the note. */
export interface NoteVoicePayload {
  blob: Blob
  mimeType: string
  durationSec: number
}

export interface UserNote {
  id: string
  text: string
  createdAtIso: string
  /** Set when the note text was edited after creation */
  updatedAtIso?: string
  /** When true, a voice blob exists in IndexedDB for this note id */
  hasVoice?: boolean
  voiceMimeType?: string
  /** Whole seconds, for display */
  durationSec?: number
}
