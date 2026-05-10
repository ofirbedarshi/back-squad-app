import { useState } from 'react'
import Modal from './base/Modal'

interface NoteAddModalProps {
  onClose: () => void
  /** Return true to close the modal; false keeps it open (e.g. validation failed). */
  onSubmit: (text: string) => boolean
}

function NoteAddModal({ onClose, onSubmit }: NoteAddModalProps) {
  const [draft, setDraft] = useState('')

  function handleSave() {
    const trimmed = draft.trim()
    if (trimmed === '') return
    if (onSubmit(trimmed)) {
      setDraft('')
      onClose()
    }
  }

  const saveDisabled = draft.trim() === ''

  return (
    <Modal title="הערה חדשה" onClose={onClose} onSave={handleSave} saveDisabled={saveDisabled}>
      <div className="flex flex-col gap-3">
        <label htmlFor="note-add-body" className="text-sm font-medium text-neutral-600">
          טקסט ההערה
        </label>
        <textarea
          id="note-add-body"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={6}
          placeholder="כתוב כאן…"
          className="w-full min-h-[140px] border border-neutral-300 rounded-xl px-4 py-3 text-lg text-right bg-white focus:outline-none focus:border-blue-400 resize-y"
        />
      </div>
    </Modal>
  )
}

export default NoteAddModal
