import { useEffect, useMemo, useState } from 'react'
import Modal from './base/Modal'
import VoiceRecorderPanel from './VoiceRecorderPanel'
import type { NoteVoicePayload } from '../domain/notes.types'
import { FORM_DRAFT_DEBOUNCE_MS, FORM_DRAFT_KEYS } from '../domain/formDraft.types'
import { loadFormDraftUseCase } from '../useCases/loadFormDraft'
import { saveFormDraftUseCase } from '../useCases/saveFormDraft'
import { clearFormDraftUseCase } from '../useCases/clearFormDraft'
import { debounce } from '../utils/debounce'
import { useConfirm } from '../hooks/useConfirm'

interface NoteAddModalProps {
  onClose: () => void
  onSubmit: (text: string, voice: NoteVoicePayload | null) => Promise<boolean>
  onMicError?: (message: string) => void
}

function readInitialDraftText(): string {
  const raw = loadFormDraftUseCase(FORM_DRAFT_KEYS.NOTE_CREATE)
  if (!raw || typeof raw !== 'object' || typeof raw.text !== 'string') return ''
  return raw.text
}

function NoteAddModal({ onClose, onSubmit, onMicError }: NoteAddModalProps) {
  const confirm = useConfirm()
  const [draft, setDraft] = useState(readInitialDraftText)
  const [voiceDraft, setVoiceDraft] = useState<NoteVoicePayload | null>(null)
  const [saving, setSaving] = useState(false)

  const debouncedPersistDraft = useMemo(
    () =>
      debounce((text: string) => {
        saveFormDraftUseCase(FORM_DRAFT_KEYS.NOTE_CREATE, { text })
      }, FORM_DRAFT_DEBOUNCE_MS),
    [],
  )

  useEffect(() => () => debouncedPersistDraft.cancel(), [debouncedPersistDraft])

  useEffect(() => {
    debouncedPersistDraft(draft)
  }, [draft, debouncedPersistDraft])

  async function handleSave() {
    const trimmed = draft.trim()
    const hasVoice = voiceDraft !== null && voiceDraft.blob.size > 0
    if (!trimmed && !hasVoice) return
    setSaving(true)
    try {
      const ok = await onSubmit(trimmed, hasVoice && voiceDraft ? voiceDraft : null)
      if (ok) {
        clearFormDraftUseCase(FORM_DRAFT_KEYS.NOTE_CREATE)
        debouncedPersistDraft.cancel()
        setDraft('')
        setVoiceDraft(null)
        onClose()
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleClearDraft() {
    const ok = await confirm({
      title: 'ניקוי טיוטה',
      message: 'למחוק את הטקסט בטיוטה? ההקלטה המקומית בחלון נמחקת גם היא מהמסך.',
      confirmLabel: 'נקה טיוטה',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!ok) return
    clearFormDraftUseCase(FORM_DRAFT_KEYS.NOTE_CREATE)
    debouncedPersistDraft.cancel()
    setDraft('')
    setVoiceDraft(null)
  }

  const saveDisabled = (!draft.trim() && !(voiceDraft && voiceDraft.blob.size > 0)) || saving

  return (
    <Modal
      title="הערה חדשה"
      onClose={onClose}
      onSave={() => void handleSave()}
      saveDisabled={saveDisabled}
      headerExtra={
        <button
          type="button"
          onClick={() => void handleClearDraft()}
          className="text-xs font-semibold text-red-700 border border-red-200 rounded-lg px-2.5 py-1.5 active:bg-red-50 touch-manipulation"
        >
          נקה טיוטה
        </button>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="note-add-body" className="text-sm font-medium text-neutral-600">
            טקסט (אופציונלי אם יש הקלטה)
          </label>
          <textarea
            id="note-add-body"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
            placeholder="כתוב כאן…"
            className="w-full min-h-[120px] border border-neutral-300 rounded-xl px-4 py-3 text-lg text-right bg-white focus:outline-none focus:border-blue-400 resize-y"
          />
        </div>
        <VoiceRecorderPanel onChange={setVoiceDraft} onMicError={onMicError} />
      </div>
    </Modal>
  )
}

export default NoteAddModal
