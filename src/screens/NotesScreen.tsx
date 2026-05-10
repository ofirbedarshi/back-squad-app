import { useState } from 'react'
import NoteAddModal from '../components/NoteAddModal'
import NoteAddTriggerButton from '../components/NoteAddTriggerButton'
import UserNoteRow from '../components/UserNoteRow'
import DocFeedbackModal from '../components/base/DocFeedbackModal'
import notesScreenDocMarkdown from '../../docs/מסך-הערות.md?raw'
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
  const [addModalOpen, setAddModalOpen] = useState(false)

  function handleSubmitNewNote(text: string): boolean {
    try {
      const next = addNoteUseCase(text)
      setNotes(next)
      notifySuccess('ההערה נשמרה')
      return true
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'שמירת ההערה נכשלה'
      triggerError(msg)
      return false
    }
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
    <div dir="rtl" className="relative flex flex-col bg-neutral-50 min-h-full">
      <header className="grid grid-cols-[auto_1fr_auto] items-center gap-2 py-3 px-3 border-b border-neutral-200 text-neutral-800 bg-white">
        <div className="justify-self-start shrink-0">
          <NoteAddTriggerButton layout="header" onClick={() => setAddModalOpen(true)} />
        </div>
        <h1 className="font-bold text-lg text-center min-w-0">הערות</h1>
        <div className="w-24 shrink-0 justify-self-end" aria-hidden />
      </header>

      <div className="flex flex-col gap-3 p-4">

        {sorted.length === 0 && !addModalOpen && (
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
         <NoteAddTriggerButton layout="listRow" onClick={() => setAddModalOpen(true)} />
      </div>

      {addModalOpen && (
        <NoteAddModal onClose={() => setAddModalOpen(false)} onSubmit={handleSubmitNewNote} />
      )}

      <DocFeedbackModal
        markdown={notesScreenDocMarkdown}
        modalTitle="מידע על מסך הערות"
        shareTitle="מסך הערות"
        openButtonAriaLabel="פתח מידע על מסך ההערות"
      />
    </div>
  )
}

export default NotesScreen
