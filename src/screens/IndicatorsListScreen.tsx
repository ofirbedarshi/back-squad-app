import { useState, useEffect } from 'react'
import IndicatorCard from '../components/IndicatorCard'
import IndicatorForm from '../components/IndicatorForm'
import IndicatorSearchBar from '../components/IndicatorSearchBar'
import DocFeedbackModal from '../components/base/DocFeedbackModal'
import HeaderOptionsMenu from '../components/base/HeaderOptionsMenu'
import Modal from '../components/base/Modal'
import OptionsMenu from '../components/base/OptionsMenu'
import { useConfirm } from '../hooks/useConfirm'
import { useDomainError } from '../hooks/useDomainError'
import { useNotification } from '../hooks/useNotification'
import { useUIError } from '../hooks/useUIError'
import { filterByQuery } from '../utils/search'
import { getIndicatorSearchFields } from '../utils/indicatorSearch'
import { addIndicatorUseCase } from '../useCases/addIndicator'
import { clearFormDraftUseCase } from '../useCases/clearFormDraft'
import { loadIndicatorsUseCase } from '../useCases/loadIndicators'
import { removeAllIndicatorsUseCase } from '../useCases/removeAllIndicators'
import { removeIndicatorUseCase } from '../useCases/removeIndicator'
import { updateIndicatorUseCase } from '../useCases/updateIndicator'
import type { Indicator, IndicatorInput } from '../domain/indicator.types'
import { FORM_DRAFT_KEYS } from '../domain/formDraft.types'
import indicatorsDocMarkdown from '../../docs/מציינים.md?raw'

function IndicatorsListScreen() {
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Indicator | null>(null)
  const [menuIndicator, setMenuIndicator] = useState<Indicator | null>(null)
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
    clearFormDraftUseCase(FORM_DRAFT_KEYS.INDICATOR_CREATE)
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
      clearFormDraftUseCase(FORM_DRAFT_KEYS.indicatorEdit(editingItem.id))
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
      <header className="relative py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        מציינים
        <HeaderOptionsMenu
          items={[
            {
              label: 'מחק את כל המציינים',
              variant: 'danger',
              onSelect: handleRemoveAll,
            },
          ]}
        />
      </header>

      <div className="flex flex-col gap-3 p-4">
        <IndicatorSearchBar searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />

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
            onLongPress={() => setMenuIndicator(indicator)}
          />
        ))}

        {showForm && (
          <Modal title="הוסף מציין" onClose={() => setShowForm(false)}>
            <IndicatorForm
              key={FORM_DRAFT_KEYS.INDICATOR_CREATE}
              draftKey={FORM_DRAFT_KEYS.INDICATOR_CREATE}
              onSubmit={handleAdd}
              submitLabel="הוסף"
            />
          </Modal>
        )}

        {editingItem && (
          <Modal title="עריכת מציין" onClose={() => setEditingItem(null)}>
            <IndicatorForm
              key={FORM_DRAFT_KEYS.indicatorEdit(editingItem.id)}
              draftKey={FORM_DRAFT_KEYS.indicatorEdit(editingItem.id)}
              onSubmit={handleEdit}
              submitLabel="שמור שינויים"
              initialValues={editingItem}
            />
          </Modal>
        )}

        {menuIndicator && (
          <OptionsMenu
            title={menuIndicator.indicatorName}
            items={[
              {
                label: 'מחק מציין',
                variant: 'danger',
                onSelect: () => handleRemove(menuIndicator),
              },
            ]}
            onClose={() => setMenuIndicator(null)}
          />
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
