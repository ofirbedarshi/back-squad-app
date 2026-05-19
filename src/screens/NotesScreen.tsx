import { useState } from 'react'
import NoteAddModal from '../components/NoteAddModal'
import NoteAddTriggerButton from '../components/NoteAddTriggerButton'
import UserNoteRow from '../components/UserNoteRow'
import DocFeedbackModal from '../components/base/DocFeedbackModal'
import HeaderOptionsMenu from '../components/base/HeaderOptionsMenu'
import notesScreenDocMarkdown from '../../docs/מסך-הערות.md?raw'
import { formatUserNoteSavedAt, noteLastActivityIso } from '../domain/notes'
import type { NoteVoicePayload, UserNote } from '../domain/notes.types'
import { useConfirm } from '../hooks/useConfirm'
import { useDomainError } from '../hooks/useDomainError'
import { useNotification } from '../hooks/useNotification'
import { addNoteUseCase } from '../useCases/addNote'
import { attachVoiceToNoteUseCase } from '../useCases/attachVoiceToNote'
import { loadNotesUseCase } from '../useCases/loadNotes'
import { removeNoteUseCase } from '../useCases/removeNote'
import { removeVoiceFromNoteUseCase } from '../useCases/removeVoiceFromNote'
import { updateNoteUseCase } from '../useCases/updateNote'
import { exportNotesCsvUseCase } from '../useCases/exportNotesCsv'

function NotesScreen() {
  const confirm = useConfirm()
  const { triggerError } = useDomainError()
  const { notifySuccess } = useNotification()
  const [notes, setNotes] = useState<UserNote[]>(() => loadNotesUseCase())
  const [addModalOpen, setAddModalOpen] = useState(false)

  async function handleSubmitNewNote(text: string, voice: NoteVoicePayload | null): Promise<boolean> {
    try {
      const next = await addNoteUseCase(text, voice)
      setNotes(next)
      notifySuccess('ההערה נשמרה')
      return true
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'שמירת ההערה נכשלה'
      triggerError(msg)
      return false
    }
  }

  async function handleRemoveNote(id: string) {
    const confirmed = await confirm({
      title: 'מחיקת הערה',
      message: 'האם למחוק את ההערה? לא ניתן לשחזר אחרי המחיקה.',
      confirmLabel: 'מחק',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (confirmed) {
      try {
        setNotes(await removeNoteUseCase(id))
      } catch {
        triggerError('מחיקת ההערה נכשלה')
      }
    }
  }

  async function handleRemoveVoiceFromNote(id: string) {
    try {
      setNotes(await removeVoiceFromNoteUseCase(id))
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'עדכון ההערה נכשל'
      triggerError(msg)
    }
  }

  async function handleSaveNoteEdit(
    id: string,
    text: string,
    voice: NoteVoicePayload | null,
  ): Promise<boolean> {
    try {
      let next = updateNoteUseCase(id, text)
      setNotes(next)
      if (voice) {
        next = await attachVoiceToNoteUseCase(id, voice)
        setNotes(next)
      }
      notifySuccess('ההערה עודכנה')
      return true
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'עדכון ההערה נכשל'
      triggerError(msg)
      return false
    }
  }

  function handleExportNotes() {
    try {
      const fileName = exportNotesCsvUseCase()
      notifySuccess(`הקובץ נשמר בתיקיית ההורדות: ${fileName}`)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'ייצוא ההערות נכשל'
      triggerError(msg)
    }
  }

  const sorted = [...notes].sort(
    (a, b) =>
      new Date(noteLastActivityIso(b)).getTime() - new Date(noteLastActivityIso(a)).getTime(),
  )

  return (
    <div dir="rtl" className="relative flex flex-col bg-neutral-50 min-h-full">
      <header className="relative grid grid-cols-[auto_1fr_auto] items-center gap-2 py-3 px-3 border-b border-neutral-200 text-neutral-800 bg-white">
        <div className="justify-self-start shrink-0">
          <NoteAddTriggerButton layout="header" onClick={() => setAddModalOpen(true)} />
        </div>
        <h1 className="font-bold text-lg text-center min-w-0">הערות</h1>
        <div className="w-24 shrink-0 justify-self-end" aria-hidden />
        <HeaderOptionsMenu
          items={[
            {
              label: 'ייצוא הערות לקובץ',
              onSelect: handleExportNotes,
            },
          ]}
        />
      </header>

      <div className="flex flex-col gap-3 p-4">
        <NoteAddTriggerButton layout="listRow" onClick={() => setAddModalOpen(true)} />

        {sorted.length === 0 && !addModalOpen && (
          <p className="text-center text-neutral-400 py-6 text-sm">אין הערות שמורות</p>
        )}

        {sorted.map((note) => (
          <UserNoteRow
            key={note.id}
            note={note}
            savedAtLabel={formatUserNoteSavedAt(noteLastActivityIso(note))}
            onRemove={() => void handleRemoveNote(note.id)}
            onSave={handleSaveNoteEdit}
            onRemoveVoice={handleRemoveVoiceFromNote}
            onPlaybackError={triggerError}
          />
        ))}
      </div>

      {addModalOpen && (
        <NoteAddModal
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleSubmitNewNote}
          onMicError={triggerError}
        />
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
