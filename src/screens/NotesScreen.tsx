import { useState } from 'react'
import NoteComposer from '../components/NoteComposer'
import UserNoteRow from '../components/UserNoteRow'
import { useConfirm } from '../hooks/useConfirm'
import { useDomainError } from '../hooks/useDomainError'
import { useNotification } from '../hooks/useNotification'
import { formatUserNoteSavedAt, noteLastActivityIso } from '../domain/notes'
import type { UserNote } from '../domain/notes.types'
import { addNoteUseCase } from '../useCases/addNote'
import { loadNotesUseCase } from '../useCases/loadNotes'
import { removeNoteUseCase } from '../useCases/removeNote'
import { updateNoteUseCase } from '../useCases/updateNote'

function NotesScreen() {
  const confirm = useConfirm()
  const { triggerError } = useDomainError()
  const { notifySuccess } = useNotification()
  const [notes, setNotes] = useState<UserNote[]>(() => loadNotesUseCase())
  const [composerOpen, setComposerOpen] = useState(false)
  const [draft, setDraft] = useState('')

  function handleSave() {
    try {
      const next = addNoteUseCase(draft)
      setNotes(next)
      setDraft('')
      setComposerOpen(false)
      notifySuccess('ההערה נשמרה')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'שמירת ההערה נכשלה'
      triggerError(msg)
    }
  }

  function handleCancelComposer() {
    setDraft('')
    setComposerOpen(false)
  }

  async function handleRemoveRequest(id: string) {
    const confirmed = await confirm({
      title: 'מחיקת הערה',
      message: 'האם למחוק את ההערה? לא ניתן לשחזר אחרי המחיקה.',
      confirmLabel: 'מחק',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (confirmed) {
      setNotes(removeNoteUseCase(id))
    }
  }

  function handleUpdate(id: string, text: string): boolean {
    try {
      const next = updateNoteUseCase(id, text)
      setNotes(next)
      notifySuccess('ההערה עודכנה')
      return true
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'עדכון ההערה נכשל'
      triggerError(msg)
      return false
    }
  }

  const sorted = [...notes].sort(
    (a, b) =>
      new Date(noteLastActivityIso(b)).getTime() - new Date(noteLastActivityIso(a)).getTime(),
  )

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <header className="py-3.5 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        הערות
      </header>

      <div className="flex flex-col gap-3 p-4">
        <NoteComposer
          isOpen={composerOpen}
          draftText={draft}
          onDraftTextChange={setDraft}
          onRequestOpen={() => setComposerOpen(true)}
          onSave={handleSave}
          onCancel={handleCancelComposer}
        />

        {sorted.length === 0 && !composerOpen && (
          <p className="text-center text-neutral-400 py-6 text-sm">אין הערות שמורות</p>
        )}

        {sorted.map((note) => (
          <UserNoteRow
            key={note.id}
            note={note}
            savedAtLabel={formatUserNoteSavedAt(noteLastActivityIso(note))}
            onRemove={() => void handleRemoveRequest(note.id)}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  )
}

export default NotesScreen
