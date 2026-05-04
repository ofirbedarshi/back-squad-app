import { useState, useEffect } from 'react'
import AttackLogCard from '../components/AttackLogCard'
import AttackLogForm from '../components/AttackLogForm'
import Modal from '../components/base/Modal'
import { addAttackLogUseCase } from '../useCases/addAttackLog'
import { loadAttackLogsUseCase } from '../useCases/loadAttackLogs'
import type { AttackLog, AttackLogInput } from '../domain/attackLog.types'

function AttackLogScreen() {
  const [logs, setLogs] = useState<AttackLog[]>([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setLogs(loadAttackLogsUseCase())
  }, [])

  function handleAdd(data: AttackLogInput) {
    addAttackLogUseCase(data)
    setLogs(loadAttackLogsUseCase())
    setShowForm(false)
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
          <AttackLogCard key={log.id} log={log} />
        ))}

        {showForm && (
          <Modal title="הוסף תקיפה" onClose={() => setShowForm(false)}>
            <AttackLogForm onSubmit={handleAdd} submitLabel="שמור" />
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
    </div>
  )
}

export default AttackLogScreen
