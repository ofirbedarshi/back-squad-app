import { useState, useEffect } from 'react'
import AttackLogCard from '../components/AttackLogCard'
import DynamicForm from '../components/DynamicForm/DynamicForm'
import HeaderOptionsMenu from '../components/base/HeaderOptionsMenu'
import ListSearchBar from '../components/base/ListSearchBar'
import Modal from '../components/base/Modal'
import { attackLogFormSchema } from '../domain/attackLogForm.schema'
import { attackLogInputToFormValues, formValuesToAttackLogInput } from '../domain/attackLogForm'
import type { FormValues } from '../domain/dynamicForm.types'
import type { AttackLog } from '../domain/attackLog.types'
import { useConfirm } from '../hooks/useConfirm'
import { useDomainError } from '../hooks/useDomainError'
import { useNotification } from '../hooks/useNotification'
import { useUIError } from '../hooks/useUIError'
import { addAttackLogUseCase } from '../useCases/addAttackLog'
import { loadAttackLogsUseCase } from '../useCases/loadAttackLogs'
import { removeAllAttackLogsUseCase } from '../useCases/removeAllAttackLogs'
import { removeAttackLogUseCase } from '../useCases/removeAttackLog'
import { updateAttackLogUseCase } from '../useCases/updateAttackLog'
import { filterByQuery } from '../utils/search'
import { getAttackLogSearchFields } from '../utils/attackLogSearch'

function AttackLogListScreen() {
  const [logs, setLogs] = useState<AttackLog[]>(() => loadAttackLogsUseCase())
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<AttackLog | null>(null)
  const confirm = useConfirm()
  const { triggerError } = useDomainError()
  const { reportUIError } = useUIError()
  const { notifySuccess } = useNotification()

  const filteredLogs = filterByQuery(logs, searchQuery, getAttackLogSearchFields)

  useEffect(() => {
    setLogs(loadAttackLogsUseCase())
  }, [])

  function reloadLogs() {
    setLogs(loadAttackLogsUseCase())
  }

  function handleAdd(values: FormValues) {
    addAttackLogUseCase(formValuesToAttackLogInput(values))
    reloadLogs()
    setShowForm(false)
    notifySuccess('התקיפה נוספה בהצלחה')
  }

  function handleEdit(values: FormValues) {
    if (!editingItem) {
      reportUIError('לא ניתן לערוך: אין פריט נבחר')
      return
    }
    try {
      updateAttackLogUseCase(editingItem.id, formValuesToAttackLogInput(values))
      reloadLogs()
      setEditingItem(null)
      notifySuccess('השינויים נשמרו')
    } catch {
      triggerError('שמירת השינויים נכשלה. אנא נסה שנית.')
    }
  }

  async function handleRemove(log: AttackLog) {
    const confirmed = await confirm({
      title: 'מחיקת תקיפה',
      message: `למחוק את "${log.targetName}"? לא ניתן לשחזר אחרי המחיקה.`,
      confirmLabel: 'מחק',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    try {
      removeAttackLogUseCase(log.id)
      reloadLogs()
      notifySuccess('התקיפה נמחקה')
    } catch {
      triggerError('מחיקת התקיפה נכשלה')
    }
  }

  async function handleRemoveAll() {
    const confirmed = await confirm({
      title: 'מחיקת כל התקיפות',
      message: 'פעולה זו תמחק את כל התקיפות השמורות ללא אפשרות שחזור.',
      confirmLabel: 'מחק הכל',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    try {
      removeAllAttackLogsUseCase()
      reloadLogs()
      notifySuccess('כל התקיפות נמחקו')
    } catch {
      triggerError('מחיקת כל התקיפות נכשלה')
    }
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <header className="relative grid grid-cols-[auto_1fr_auto] items-center gap-2 py-3 px-3 border-b border-neutral-200 text-neutral-800 bg-white">
        <div className="justify-self-start shrink-0">
          {!showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="py-2 px-3 rounded-xl border-2 border-dashed border-neutral-300 text-neutral-600 font-semibold text-sm active:bg-neutral-100 transition-colors touch-manipulation select-none max-w-[11rem] leading-tight"
            >
              + הוסף תקיפה
            </button>
          )}
        </div>
        <h1 className="font-bold text-lg text-center min-w-0">יומן תקיפות</h1>
        <div className="w-24 shrink-0 justify-self-end" aria-hidden />
        <HeaderOptionsMenu
          items={[
            {
              label: 'מחק את כל התקיפות',
              variant: 'danger',
              onSelect: () => void handleRemoveAll(),
            },
          ]}
        />
      </header>

      <div className="flex flex-col gap-3 p-4">
        <ListSearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          placeholder="חפש לפי שם מטרה..."
        />

        {logs.length === 0 && !showForm && (
          <p className="text-center text-neutral-400 py-8">אין תקיפות שמורות</p>
        )}

        {logs.length > 0 && filteredLogs.length === 0 && (
          <p className="text-center text-neutral-400 py-8">לא נמצאו תוצאות</p>
        )}

        {filteredLogs.map((log) => (
          <AttackLogCard
            key={log.id}
            log={log}
            onClick={() => setEditingItem(log)}
            menuItems={[
              {
                label: 'מחק תקיפה',
                variant: 'danger',
                onSelect: () => void handleRemove(log),
              },
            ]}
          />
        ))}

        {showForm && (
          <Modal title="הוסף תקיפה" onClose={() => setShowForm(false)}>
            <DynamicForm schema={attackLogFormSchema} onSubmit={handleAdd} submitLabel="שמור" />
          </Modal>
        )}

        {editingItem && (
          <Modal title="עריכת תקיפה" onClose={() => setEditingItem(null)}>
            <DynamicForm
              schema={attackLogFormSchema}
              onSubmit={handleEdit}
              submitLabel="שמור שינויים"
              defaultValues={attackLogInputToFormValues(editingItem)}
            />
          </Modal>
        )}
      </div>
    </div>
  )
}

export default AttackLogListScreen
