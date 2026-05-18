import { useEffect, useState } from 'react'
import Modal from '../components/base/Modal'
import DocFeedbackModal from '../components/base/DocFeedbackModal'
import HeaderOptionsMenu from '../components/base/HeaderOptionsMenu'
import OptionsMenu from '../components/base/OptionsMenu'
import TargetSearchBar from '../components/TargetSearchBar'
import ReferencePositionSummarySelector from '../components/ReferencePositionSummarySelector'
import TargetCard from '../components/TargetCard'
import TargetForm from '../components/TargetForm'
import { FORM_DRAFT_KEYS } from '../domain/formDraft.types'
import type { Target, TargetInput } from '../domain/target.types'
import { useConfirm } from '../hooks/useConfirm'
import { useNotification } from '../hooks/useNotification'
import { addTargetUseCase } from '../useCases/addTarget'
import { clearFormDraftUseCase } from '../useCases/clearFormDraft'
import { loadTargetsUseCase } from '../useCases/loadTargets'
import { removeAllTargetsUseCase } from '../useCases/removeAllTargets'
import { removeTargetUseCase } from '../useCases/removeTarget'
import { updateTargetUseCase } from '../useCases/updateTarget'
import { filterByQuery } from '../utils/search'
import { getTargetSearchFields, filterTargetsByAdvancedFilter } from '../utils/targetSearch'
import type { TargetAdvancedFilter } from '../utils/targetSearch.types'
import { emptyTargetAdvancedFilter } from '../utils/targetSearch.types'
import { calculateTargetLiveMetricsUseCase } from '../useCases/calculateTargetLiveMetrics'
import targetsDocMarkdown from '../../docs/מטרות.md?raw'

function TargetListScreen() {
  const [targets, setTargets] = useState<Target[]>(() => loadTargetsUseCase())
  const [searchQuery, setSearchQuery] = useState('')
  const [advancedFilter, setAdvancedFilter] = useState<TargetAdvancedFilter>(emptyTargetAdvancedFilter)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Target | null>(null)
  const [menuTarget, setMenuTarget] = useState<Target | null>(null)

  const textFilteredTargets = filterByQuery(targets, searchQuery, getTargetSearchFields)

  const filteredTargets = filterTargetsByAdvancedFilter(
    textFilteredTargets,
    advancedFilter,
    (target) => calculateTargetLiveMetricsUseCase({ targetCoordinates: target.coordinates, targetHeight: target.altitude }),
  )
  const { notifySuccess } = useNotification()
  const confirm = useConfirm()

  useEffect(() => {
    setTargets(loadTargetsUseCase())
  }, [])

  function handleAdd(data: TargetInput) {
    addTargetUseCase(data)
    clearFormDraftUseCase(FORM_DRAFT_KEYS.TARGET_CREATE)
    setTargets(loadTargetsUseCase())
    setShowForm(false)
    notifySuccess('המטרה נוספה בהצלחה')
  }

  function handleEdit(data: TargetInput) {
    if (!editingItem) {
      return
    }

    updateTargetUseCase(editingItem.id, data)
    clearFormDraftUseCase(FORM_DRAFT_KEYS.targetEdit(editingItem.id))
    setTargets(loadTargetsUseCase())
    setEditingItem(null)
    notifySuccess('השינויים נשמרו')
  }

  async function handleRemove(target: Target) {
    const confirmed = await confirm({
      title: 'מחיקת מטרה',
      message: `למחוק את "${target.targetName}"?`,
      confirmLabel: 'מחק',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    removeTargetUseCase(target.id)
    setTargets(loadTargetsUseCase())
    notifySuccess('המטרה נמחקה')
  }

  async function handleRemoveAll() {
    const confirmed = await confirm({
      title: 'מחיקת כל המטרות',
      message: 'פעולה זו תמחק את כל המטרות השמורות ללא אפשרות שחזור.',
      confirmLabel: 'מחק הכל',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    removeAllTargetsUseCase()
    setTargets(loadTargetsUseCase())
    notifySuccess('כל המטרות נמחקו')
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <header className="relative py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        מטרות
        <HeaderOptionsMenu
          items={[
            {
              label: 'מחק את כל המטרות',
              variant: 'danger',
              onSelect: handleRemoveAll,
            },
          ]}
        />
      </header>

      <div className="flex flex-col gap-3 p-4">
        <ReferencePositionSummarySelector />

        <TargetSearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          advancedFilter={advancedFilter}
          onAdvancedFilterChange={setAdvancedFilter}
        />

        {targets.length === 0 && !showForm && (
          <p className="text-center text-neutral-400 py-8">אין מטרות שמורות</p>
        )}

        {targets.length > 0 && filteredTargets.length === 0 && (
          <p className="text-center text-neutral-400 py-8">לא נמצאו תוצאות</p>
        )}

        {filteredTargets.map((target) => (
          <TargetCard
            key={target.id}
            target={target}
            onClick={() => setEditingItem(target)}
            onLongPress={() => setMenuTarget(target)}
          />
        ))}

        {showForm && (
          <Modal title="הוסף מטרה" onClose={() => setShowForm(false)}>
            <TargetForm
              key={FORM_DRAFT_KEYS.TARGET_CREATE}
              draftKey={FORM_DRAFT_KEYS.TARGET_CREATE}
              onSubmit={handleAdd}
              submitLabel="שמור"
            />
          </Modal>
        )}

        {editingItem && (
          <Modal title="עריכת מטרה" onClose={() => setEditingItem(null)}>
            <TargetForm
              key={FORM_DRAFT_KEYS.targetEdit(editingItem.id)}
              draftKey={FORM_DRAFT_KEYS.targetEdit(editingItem.id)}
              onSubmit={handleEdit}
              submitLabel="שמור שינויים"
              initialValues={editingItem}
            />
          </Modal>
        )}

        {menuTarget && (
          <OptionsMenu
            title={menuTarget.targetName}
            items={[
              {
                label: 'מחק מטרה',
                variant: 'danger',
                onSelect: () => handleRemove(menuTarget),
              },
            ]}
            onClose={() => setMenuTarget(null)}
          />
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
