import { useEffect, useState } from 'react'
import Modal from '../components/base/Modal'
import DocFeedbackModal from '../components/base/DocFeedbackModal'
import ReferencePositionSummarySelector from '../components/ReferencePositionSummarySelector'
import TargetCard from '../components/TargetCard'
import TargetForm from '../components/TargetForm'
import type { Target, TargetInput } from '../domain/target.types'
import { useNotification } from '../hooks/useNotification'
import { addTargetUseCase } from '../useCases/addTarget'
import { loadTargetsUseCase } from '../useCases/loadTargets'
import { updateTargetUseCase } from '../useCases/updateTarget'
import targetsDocMarkdown from '../../docs/מטרות.md?raw'

function TargetListScreen() {
  const [targets, setTargets] = useState<Target[]>(() => loadTargetsUseCase())
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Target | null>(null)
  const { notifySuccess } = useNotification()

  useEffect(() => {
    setTargets(loadTargetsUseCase())
  }, [])

  function handleAdd(data: TargetInput) {
    addTargetUseCase(data)
    setTargets(loadTargetsUseCase())
    setShowForm(false)
    notifySuccess('המטרה נוספה בהצלחה')
  }

  function handleEdit(data: TargetInput) {
    if (!editingItem) {
      return
    }

    updateTargetUseCase(editingItem.id, data)
    setTargets(loadTargetsUseCase())
    setEditingItem(null)
    notifySuccess('השינויים נשמרו')
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        מטרות
      </header>

      <div className="flex flex-col gap-3 p-4">
        <ReferencePositionSummarySelector />

        {targets.length === 0 && !showForm && (
          <p className="text-center text-neutral-400 py-8">אין מטרות שמורות</p>
        )}

        {targets.map((target) => (
          <TargetCard key={target.id} target={target} onClick={() => setEditingItem(target)} />
        ))}

        {showForm && (
          <Modal title="הוסף מטרה" onClose={() => setShowForm(false)}>
            <TargetForm onSubmit={handleAdd} submitLabel="שמור" />
          </Modal>
        )}

        {editingItem && (
          <Modal title="עריכת מטרה" onClose={() => setEditingItem(null)}>
            <TargetForm onSubmit={handleEdit} submitLabel="שמור שינויים" initialValues={editingItem} />
          </Modal>
        )}

        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-500 font-semibold text-base active:bg-neutral-100 transition-colors touch-manipulation select-none"
          >
            + הוסף מטרה
          </button>
        )}
      </div>
      <DocFeedbackModal
        markdown={targetsDocMarkdown}
        modalTitle="מידע על מסך מטרות"
        shareTitle="מסך מטרות"
        openButtonAriaLabel="פתח מידע על מסך מטרות"
      />
    </div>
  )
}

export default TargetListScreen
