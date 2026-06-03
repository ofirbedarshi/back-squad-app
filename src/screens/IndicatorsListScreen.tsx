import { useState, useEffect } from 'react'
import IndicatorCard from '../components/IndicatorCard'
import IndicatorForm from '../components/IndicatorForm'
import ListSearchBar from '../components/base/ListSearchBar'
import ListScreenHeader from '../components/base/ListScreenHeader'
import Modal from '../components/base/Modal'
import { useConfirm } from '../hooks/useConfirm'
import { useDomainError } from '../hooks/useDomainError'
import { useNotification } from '../hooks/useNotification'
import { useUIError } from '../hooks/useUIError'
import { filterByQuery } from '../utils/search'
import { getIndicatorSearchFields } from '../utils/indicatorSearch'
import { addIndicatorUseCase } from '../useCases/addIndicator'
import { loadIndicatorsUseCase } from '../useCases/loadIndicators'
import { removeAllIndicatorsUseCase } from '../useCases/removeAllIndicators'
import { removeIndicatorUseCase } from '../useCases/removeIndicator'
import { updateIndicatorUseCase } from '../useCases/updateIndicator'
import type { Indicator, IndicatorInput } from '../domain/indicator.types'

function IndicatorsListScreen() {
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Indicator | null>(null)
  const filteredIndicators = filterByQuery(indicators, searchQuery, getIndicatorSearchFields)

  const { triggerError } = useDomainError()
  const { reportUIError } = useUIError()
  const { notifySuccess } = useNotification()
  const confirm = useConfirm()

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

  async function handleRemove(indicator: Indicator) {
    const confirmed = await confirm({
      title: 'מחיקת מציין',
      message: `למחוק את "${indicator.indicatorName}"?`,
      confirmLabel: 'מחק',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    removeIndicatorUseCase(indicator.id)
    setIndicators(loadIndicatorsUseCase())
    notifySuccess('המציין נמחק')
  }

  async function handleRemoveAll() {
    const confirmed = await confirm({
      title: 'מחיקת כל המציינים',
      message: 'פעולה זו תמחק את כל המציינים השמורים ללא אפשרות שחזור.',
      confirmLabel: 'מחק הכל',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    removeAllIndicatorsUseCase()
    setIndicators(loadIndicatorsUseCase())
    notifySuccess('כל המציינים נמחקו')
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <ListScreenHeader
        title="מציינים"
        addLabel="+ הוסף מציין"
        onAdd={() => setShowForm(true)}
        hideAdd={showForm}
        menuItems={[
          {
            label: 'מחק את כל המציינים',
            variant: 'danger',
            onSelect: handleRemoveAll,
          },
        ]}
      />

      <div className="flex flex-col gap-3 p-4">
        <ListSearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          placeholder="חפש לפי שם, אמצעי, קוד ציון..."
        />

        {indicators.length === 0 && !showForm && (
          <p className="text-center text-neutral-400 py-8">אין מציינים שמורים</p>
        )}

        {indicators.length > 0 && filteredIndicators.length === 0 && (
          <p className="text-center text-neutral-400 py-8">לא נמצאו תוצאות</p>
        )}

        {filteredIndicators.map((indicator) => (
          <IndicatorCard
            key={indicator.id}
            indicator={indicator}
            onClick={() => setEditingItem(indicator)}
            menuItems={[
              {
                label: 'מחק מציין',
                variant: 'danger',
                onSelect: () => void handleRemove(indicator),
              },
            ]}
          />
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
    </div>
  )
}

export default IndicatorsListScreen
