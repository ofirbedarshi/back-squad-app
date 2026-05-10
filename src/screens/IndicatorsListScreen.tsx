import { useState, useEffect } from 'react'
import IndicatorCard from '../components/IndicatorCard'
import IndicatorForm from '../components/IndicatorForm'
import DocFeedbackModal from '../components/base/DocFeedbackModal'
import Modal from '../components/base/Modal'
import { useDomainError } from '../hooks/useDomainError'
import { useNotification } from '../hooks/useNotification'
import { useUIError } from '../hooks/useUIError'
import { addIndicatorUseCase } from '../useCases/addIndicator'
import { loadIndicatorsUseCase } from '../useCases/loadIndicators'
import { updateIndicatorUseCase } from '../useCases/updateIndicator'
import type { Indicator, IndicatorInput } from '../domain/indicator.types'
import indicatorsDocMarkdown from '../../docs/מציינים.md?raw'

function IndicatorsListScreen() {
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Indicator | null>(null)
  const { triggerError } = useDomainError()
  const { reportUIError } = useUIError()
  const { notifySuccess } = useNotification()

  useEffect(() => {
    setIndicators(loadIndicatorsUseCase())
  }, [])

  function handleAdd(data: IndicatorInput) {
    addIndicatorUseCase(data)
    setIndicators(loadIndicatorsUseCase())
    setShowForm(false)
    notifySuccess('המציין נוסף בהצלחה')
  }

  function handleEdit(data: IndicatorInput) {
    if (!editingItem) {
      reportUIError('לא ניתן לערוך: אין פריט נבחר')
      return
    }
    try {
      updateIndicatorUseCase(editingItem.id, data)
      setIndicators(loadIndicatorsUseCase())
      setEditingItem(null)
      notifySuccess('השינויים נשמרו')
    } catch {
      triggerError('שמירת השינויים נכשלה. אנא נסה שנית.')
    }
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        מציינים
      </header>

      <div className="flex flex-col gap-3 p-4">
        {indicators.length === 0 && !showForm && (
          <p className="text-center text-neutral-400 py-8">אין מציינים שמורים</p>
        )}

        {indicators.map((indicator) => (
          <IndicatorCard key={indicator.id} indicator={indicator} onClick={() => setEditingItem(indicator)} />
        ))}

        {showForm && (
          <Modal title="הוסף מציין" onClose={() => setShowForm(false)}>
            <IndicatorForm onSubmit={handleAdd} submitLabel="הוסף" />
          </Modal>
        )}

        {editingItem && (
          <Modal title="עריכת מציין" onClose={() => setEditingItem(null)}>
            <IndicatorForm onSubmit={handleEdit} submitLabel="שמור שינויים" initialValues={editingItem} />
          </Modal>
        )}

        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-500 font-semibold text-base active:bg-neutral-100 transition-colors touch-manipulation select-none"
          >
            + הוסף מציין
          </button>
        )}
      </div>
      <DocFeedbackModal
        markdown={indicatorsDocMarkdown}
        modalTitle="מידע על מסך מציינים"
        shareTitle="מסך מציינים"
        openButtonAriaLabel="פתח מידע על מסך מציינים"
      />
    </div>
  )
}

export default IndicatorsListScreen
