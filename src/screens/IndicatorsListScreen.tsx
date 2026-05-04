import { useState, useEffect } from 'react'
import IndicatorCard from '../components/IndicatorCard'
import IndicatorForm from '../components/IndicatorForm'
import Modal from '../components/base/Modal'
import { addIndicatorUseCase } from '../useCases/addIndicator'
import { loadIndicatorsUseCase } from '../useCases/loadIndicators'
import type { Indicator, IndicatorInput } from '../domain/indicator.types'

function IndicatorsListScreen() {
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingIndicator, setEditingIndicator] = useState<Indicator | null>(null)

  useEffect(() => {
    setIndicators(loadIndicatorsUseCase())
  }, [])

  function handleAdd(data: IndicatorInput) {
    addIndicatorUseCase(data)
    setIndicators(loadIndicatorsUseCase())
    setShowForm(false)
  }

  function handleEdit(data: IndicatorInput) {
    console.log('עריכת מציין:', { id: editingIndicator?.id, ...data })
    setEditingIndicator(null)
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
          <IndicatorCard key={indicator.id} indicator={indicator} onClick={() => setEditingIndicator(indicator)} />
        ))}

        {showForm && (
          <Modal title="הוסף מציין" onClose={() => setShowForm(false)}>
            <IndicatorForm onSubmit={handleAdd} submitLabel="הוסף" />
          </Modal>
        )}

        {editingIndicator && (
          <Modal title="עריכת מציין" onClose={() => setEditingIndicator(null)}>
            <IndicatorForm onSubmit={handleEdit} submitLabel="שמור שינויים" initialValues={editingIndicator} />
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
    </div>
  )
}

export default IndicatorsListScreen
