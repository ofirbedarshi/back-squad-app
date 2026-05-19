import { useEffect, useState } from 'react'
import type { NoteVoicePayload, UserNote } from '../domain/notes.types'
import { useConfirm } from '../hooks/useConfirm'
import Modal from './base/Modal'
import VoiceRecorderPanel from './VoiceRecorderPanel'

interface NoteEditModalProps {
  note: UserNote
  onClose: () => void
  onSubmit: (id: string, text: string, voice: NoteVoicePayload | null) => Promise<boolean>
  onRemoveVoice: (id: string) => Promise<void>
  onMicError?: (message: string) => void
}

function NoteEditModal({ note, onClose, onSubmit, onRemoveVoice, onMicError }: NoteEditModalProps) {
  const confirm = useConfirm()
  const [draft, setDraft] = useState(note.text)
  const [voiceEditDraft, setVoiceEditDraft] = useState<NoteVoicePayload | null>(null)
  const [recorderKey, setRecorderKey] = useState(0)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setDraft(note.text)
    setVoiceEditDraft(null)
    setRecorderKey((k) => k + 1)
  }, [note.id, note.text, note.hasVoice])

  async function handleSave() {
    setSaving(true)
    try {
      const ok = await onSubmit(note.id, draft, voiceEditDraft)
      if (ok) {
        onClose()
      }
    } finally {
      setSaving(false)
    }
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
      onClose()
    }
  }

  const saveDisabled = saving

  return (
    <Modal title="עריכת הערה" onClose={onClose} onSave={() => void handleSave()} saveDisabled={saveDisabled}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="note-edit-body" className="text-sm font-medium text-neutral-600">
            טקסט (אופציונלי אם יש הקלטה)
          </label>
          <textarea
            id="note-edit-body"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
            className="w-full min-h-[120px] border border-neutral-300 rounded-xl px-4 py-3 text-lg text-right bg-white focus:outline-none focus:border-blue-400 resize-y"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <VoiceRecorderPanel
              key={`${note.id}-rec-${recorderKey}`}
              onChange={setVoiceEditDraft}
              onMicError={onMicError}
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
      </div>
    </Modal>
  )
}

export default NoteEditModal
