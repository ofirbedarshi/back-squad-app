import { useState } from 'react'
import type { NoteVoicePayload } from '../domain/notes.types'
import Modal from './base/Modal'
import VoiceRecorderPanel from './VoiceRecorderPanel'

interface NoteAddModalProps {
  onClose: () => void
  onSubmit: (text: string, voice: NoteVoicePayload | null) => Promise<boolean>
  onMicError?: (message: string) => void
}

function NoteAddModal({ onClose, onSubmit, onMicError }: NoteAddModalProps) {
  const [draft, setDraft] = useState('')
  const [voiceDraft, setVoiceDraft] = useState<NoteVoicePayload | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    const trimmed = draft.trim()
    const hasVoice = voiceDraft !== null && voiceDraft.blob.size > 0
    if (!trimmed && !hasVoice) return
    setSaving(true)
    try {
      const ok = await onSubmit(trimmed, hasVoice && voiceDraft ? voiceDraft : null)
      if (ok) {
        setDraft('')
        setVoiceDraft(null)
        onClose()
      }
    } finally {
      setSaving(false)
    }
  }

  const saveDisabled = (!draft.trim() && !(voiceDraft && voiceDraft.blob.size > 0)) || saving

  return (
    <Modal title="הערה חדשה" onClose={onClose} onSave={() => void handleSave()} saveDisabled={saveDisabled}>
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
