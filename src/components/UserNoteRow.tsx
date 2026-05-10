import { useEffect, useState } from 'react'
import type { UserNote } from '../domain/notes.types'
import NoteDeleteIconButton from './NoteDeleteIconButton'

interface UserNoteRowProps {
  note: UserNote
  savedAtLabel: string
  onRemove: () => void
  onUpdate: (id: string, text: string) => boolean
}

function UserNoteRow({ note, savedAtLabel, onRemove, onUpdate }: UserNoteRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(note.text)

  useEffect(() => {
    if (!isEditing) {
      setDraft(note.text)
    }
  }, [note.text, note.id, isEditing])

  function handleStartEdit() {
    setDraft(note.text)
    setIsEditing(true)
  }

  function handleSaveEdit() {
    if (onUpdate(note.id, draft)) {
      setIsEditing(false)
    }
  }

  function handleCancelEdit() {
    setDraft(note.text)
    setIsEditing(false)
  }

  function handleViewKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleStartEdit()
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-3.5 shadow-sm">
      {isEditing ? (
        <>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-y min-h-[100px]"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSaveEdit}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm active:brightness-90 touch-manipulation select-none"
            >
              שמור
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex-1 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-800 font-semibold text-sm active:bg-neutral-100 touch-manipulation select-none"
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
            <p className="text-base leading-snug text-neutral-900 whitespace-pre-wrap break-words pointer-events-none">
              {note.text}
            </p>
            <p className="text-xs text-neutral-500 tabular-nums leading-normal pointer-events-none">
              {savedAtLabel}
            </p>
          </div>
          <div className="flex flex-row gap-1 shrink-0 self-start pt-0.5">
            <NoteDeleteIconButton onClick={onRemove} />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserNoteRow
