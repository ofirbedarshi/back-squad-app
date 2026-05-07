import { useState, useEffect } from 'react'
import AttackLogCard from '../components/AttackLogCard'
import AttackLogForm from '../components/AttackLogForm'
import DocFeedbackModal from '../components/base/DocFeedbackModal'
import Modal from '../components/base/Modal'
import { useDomainError } from '../hooks/useDomainError'
import { useUIError } from '../hooks/useUIError'
import { addAttackLogUseCase } from '../useCases/addAttackLog'
import { loadAttackLogsUseCase } from '../useCases/loadAttackLogs'
import { updateAttackLogUseCase } from '../useCases/updateAttackLog'
import type { AttackLog, AttackLogInput } from '../domain/attackLog.types'
import attackLogDocMarkdown from '../../docs/יומן-תקיפות.md?raw'

function AttackLogListScreen() {
  const [logs, setLogs] = useState<AttackLog[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<AttackLog | null>(null)
  const { triggerError } = useDomainError()
  const { reportUIError } = useUIError()

  useEffect(() => {
    setLogs(loadAttackLogsUseCase())
  }, [])

  function handleAdd(data: AttackLogInput) {
    addAttackLogUseCase(data)
    setLogs(loadAttackLogsUseCase())
    setShowForm(false)
  }

  function handleEdit(data: AttackLogInput) {
    if (!editingItem) {
      reportUIError('לא ניתן לערוך: אין פריט נבחר')
      return
    }
    try {
      updateAttackLogUseCase(editingItem.id, data)
      setLogs(loadAttackLogsUseCase())
      setEditingItem(null)
    } catch {
      triggerError('שמירת השינויים נכשלה. אנא נסה שנית.')
    }
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        יומן תקיפות
      </header>

      <div className="flex flex-col gap-3 p-4">
        {logs.length === 0 && !showForm && (
          <p className="text-center text-neutral-400 py-8">אין תקיפות שמורות</p>
        )}

        {logs.map((log) => (
          <AttackLogCard key={log.id} log={log} onClick={() => setEditingItem(log)} />
        ))}

        {showForm && (
          <Modal title="הוסף תקיפה" onClose={() => setShowForm(false)}>
            <AttackLogForm onSubmit={handleAdd} submitLabel="שמור" />
          </Modal>
        )}

        {editingItem && (
          <Modal title="עריכת תקיפה" onClose={() => setEditingItem(null)}>
            <AttackLogForm onSubmit={handleEdit} submitLabel="שמור שינויים" initialValues={editingItem} />
          </Modal>
        )}

        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-500 font-semibold text-base active:bg-neutral-100 transition-colors touch-manipulation select-none"
          >
            + הוסף תקיפה
          </button>
        )}
      </div>
      <DocFeedbackModal
        markdown={attackLogDocMarkdown}
        modalTitle="מידע על מסך יומן תקיפות"
        shareTitle="מסך יומן תקיפות"
        openButtonAriaLabel="פתח מידע על מסך יומן תקיפות"
      />
    </div>
  )
}

export default AttackLogListScreen
