import { useEffect, useState } from 'react'
import type { NoteVoicePayload, UserNote } from '../domain/notes.types'
import { formatVoiceDurationSec } from '../domain/voiceNote'
import NoteDeleteIconButton from './NoteDeleteIconButton'
import NoteVoicePlayback from './NoteVoicePlayback'
import VoiceRecorderPanel from './VoiceRecorderPanel'
import { useConfirm } from '../hooks/useConfirm'

interface UserNoteRowProps {
  note: UserNote
  savedAtLabel: string
  onRemove: () => void | Promise<void>
  onSave: (id: string, text: string, voice: NoteVoicePayload | null) => Promise<boolean>
  onRemoveVoice: (id: string) => Promise<void>
  onPlaybackError: (message: string) => void
}

function UserNoteRow({
  note,
  savedAtLabel,
  onRemove,
  onSave,
  onRemoveVoice,
  onPlaybackError,
}: UserNoteRowProps) {
  const confirm = useConfirm()
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(note.text)
  const [voiceEditDraft, setVoiceEditDraft] = useState<NoteVoicePayload | null>(null)
  const [recorderKey, setRecorderKey] = useState(0)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEditing) {
      setDraft(note.text)
      setVoiceEditDraft(null)
    }
  }, [note.text, note.id, note.hasVoice, isEditing])

  function handleStartEdit() {
    setDraft(note.text)
    setVoiceEditDraft(null)
    setRecorderKey((k) => k + 1)
    setIsEditing(true)
  }

  async function handleSaveEdit() {
    setSaving(true)
    try {
      const ok = await onSave(note.id, draft, voiceEditDraft)
      if (ok) {
        setIsEditing(false)
        setVoiceEditDraft(null)
        setRecorderKey((k) => k + 1)
      }
    } finally {
      setSaving(false)
    }
  }

  function handleCancelEdit() {
    setDraft(note.text)
    setVoiceEditDraft(null)
    setRecorderKey((k) => k + 1)
    setIsEditing(false)
  }

  async function handleRemoveVoiceClick() {
    const willDeleteWholeNote = !note.text.trim()
    const confirmed = await confirm({
      title: willDeleteWholeNote ? 'מחיקת הערה' : 'הסרת הקלטה',
      message: willDeleteWholeNote
        ? 'אין טקסט בהערה. ההקלטה תוסר וההערה כולה תימחק. להמשיך?'
        : 'להסיר את ההקלטה הקולית מההערה?',
      confirmLabel: willDeleteWholeNote ? 'מחק הערה' : 'הסר הקלטה',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (confirmed) {
      await onRemoveVoice(note.id)
    }
  }

  function handleViewKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleStartEdit()
    }
  }

  const textDisplay = note.text.trim() ? note.text : '— ללא טקסט —'

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      {isEditing ? (
        <>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
            className="w-full rounded-2xl border border-neutral-200/90 bg-neutral-50/30 px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-1 focus:ring-neutral-900/10 resize-y min-h-[100px] transition"
          />
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <VoiceRecorderPanel
                key={`${note.id}-rec-${recorderKey}`}
                onChange={setVoiceEditDraft}
                onMicError={onPlaybackError}
              />
            </div>
            {note.hasVoice ? (
              <button
                type="button"
                onClick={() => void handleRemoveVoiceClick()}
                className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full transition hover:scale-105 active:scale-95 touch-manipulation select-none"
                style={{ background: '#fff0f2', color: '#d90429' }}
                aria-label="הסר הקלטה"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M9 7V5h6v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M10 11v5M14 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 7l1 12h6l1-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            ) : null}
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => void handleSaveEdit()}
              disabled={saving}
              className="flex-1 rounded-full bg-neutral-900 py-3 text-sm font-medium text-white shadow-sm active:scale-[0.99] active:bg-neutral-800 touch-manipulation select-none disabled:opacity-45 transition"
            >
              שמור
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={saving}
              className="flex-1 rounded-full border border-neutral-200 bg-white py-3 text-sm font-medium text-neutral-700 shadow-sm active:bg-neutral-50 touch-manipulation select-none disabled:opacity-45 transition"
            >
              ביטול
            </button>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 items-start">
          <div
            role="button"
            tabIndex={0}
            onClick={handleStartEdit}
            onKeyDown={handleViewKeyDown}
            className="min-w-0 flex flex-col gap-1 text-right rounded-xl -m-1 p-1 cursor-pointer active:bg-neutral-50/80 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
          >
            <p
              className={`text-base leading-snug whitespace-pre-wrap break-words pointer-events-none ${
                note.text.trim() ? 'text-neutral-900' : 'text-neutral-400 italic'
              }`}
            >
              {textDisplay}
            </p>
            <p className="text-xs text-neutral-500 tabular-nums leading-normal pointer-events-none">
              {savedAtLabel}
              {note.hasVoice && typeof note.durationSec === 'number' ? (
                <span className="text-neutral-600"> · {formatVoiceDurationSec(note.durationSec)}</span>
              ) : null}
            </p>
          </div>
          <div className="flex flex-row gap-1 shrink-0 self-start pt-0.5">
            {note.hasVoice ? <NoteVoicePlayback noteId={note.id} onError={onPlaybackError} /> : null}
            <NoteDeleteIconButton onClick={onRemove} />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserNoteRow
