import { useState, useEffect } from 'react'
import PositionCard from '../components/PositionCard'
import CurrentPositionForm from '../components/CurrentPositionForm'
import PositionForm from '../components/PositionForm'
import PositionSearchBar from '../components/PositionSearchBar'
import HeaderOptionsMenu from '../components/base/HeaderOptionsMenu'
import Modal from '../components/base/Modal'
import { useConfirm } from '../hooks/useConfirm'
import { useCurrentPosition } from '../hooks/useCurrentPosition'
import { useDomainError } from '../hooks/useDomainError'
import { useNotification } from '../hooks/useNotification'
import { useUIError } from '../hooks/useUIError'
import { filterByQuery } from '../utils/search'
import { getPositionSearchFields } from '../utils/positionSearch'
import { addPositionUseCase } from '../useCases/addPosition'
import { loadPositionsUseCase } from '../useCases/loadPositions'
import { promoteStoredPositionToCurrentUseCase } from '../useCases/promoteStoredPositionToCurrent'
import { removeAllPositionsUseCase } from '../useCases/removeAllPositions'
import { removePositionUseCase } from '../useCases/removePosition'
import { updatePositionUseCase } from '../useCases/updatePosition'
import type { Position, PositionInput } from '../domain/position.types'

function PositionsListScreen() {
  const [positions, setPositions] = useState<Position[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const currentPosition = useCurrentPosition()
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Position | null>(null)
  const [promotingPosition, setPromotingPosition] = useState<Position | null>(null)
  const { triggerError } = useDomainError()
  const { reportUIError } = useUIError()
  const { notifySuccess } = useNotification()
  const confirm = useConfirm()

  useEffect(() => {
    setPositions(loadPositionsUseCase())
  }, [])

  function handleAdd(data: PositionInput) {
    addPositionUseCase(data)
    setPositions(loadPositionsUseCase())
    setShowForm(false)
    notifySuccess('העמדה נוספה בהצלחה')
  }

  function handleEdit(data: PositionInput) {
    if (!editingItem) {
      reportUIError('לא ניתן לערוך: אין פריט נבחר')
      return
    }
    try {
      updatePositionUseCase(editingItem.id, data)
      setPositions(loadPositionsUseCase())
      setEditingItem(null)
      notifySuccess('השינויים נשמרו')
    } catch {
      triggerError('שמירת השינויים נכשלה. אנא נסה שנית.')
    }
  }

  function handlePromoteToCurrent(data: PositionInput) {
    if (!promotingPosition) {
      reportUIError('לא ניתן להגדיר: אין עמדה נבחרת')
      return
    }
    try {
      promoteStoredPositionToCurrentUseCase(promotingPosition.id, data)
      setPositions(loadPositionsUseCase())
      setPromotingPosition(null)
      notifySuccess('העמדה הוגדרה כעמדה נוכחית')
    } catch {
      triggerError('שמירת העמדה נכשלה. אנא נסה שנית.')
    }
  }

  async function handleRemove(position: Position) {
    const confirmed = await confirm({
      title: 'מחיקת עמדה',
      message: `למחוק את "${position.stationName}"?`,
      confirmLabel: 'מחק',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    removePositionUseCase(position.id)
    setPositions(loadPositionsUseCase())
    notifySuccess('העמדה נמחקה')
  }

  async function handleRemoveAll() {
    const confirmed = await confirm({
      title: 'מחיקת כל העמדות',
      message: 'פעולה זו תמחק את כל העמדות השמורות כולל העמדה הנוכחית, ללא אפשרות שחזור.',
      confirmLabel: 'מחק הכל',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    removeAllPositionsUseCase()
    setPositions(loadPositionsUseCase())
    notifySuccess('כל העמדות נמחקו')
  }

  const currentPositionId = currentPosition?.id ?? null
  const storedPositions = positions.filter((position) => position.id !== currentPositionId)
  const filteredStoredPositions = filterByQuery(storedPositions, searchQuery, getPositionSearchFields)
  const hasAnySavedPositions = positions.length > 0
  const archiveIsEmpty = filteredStoredPositions.length === 0
  const archiveEmptyMessage = hasAnySavedPositions
    ? 'אין עמדות נוספות במאגר'
    : 'אין עמדות שמורות במאגר'

  function getPositionMenuItems(position: Position) {
    return [
      ...(position.id !== currentPositionId
        ? [
            {
              label: 'הפוך לעמדה נוכחית',
              onSelect: () => setPromotingPosition(position),
            },
          ]
        : []),
      {
        label: 'מחק עמדה',
        variant: 'danger' as const,
        onSelect: () => void handleRemove(position),
      },
    ]
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-100 min-h-full">
      <header className="relative py-3 px-4 text-center font-bold text-base border-b border-neutral-200 text-neutral-800 bg-white">
        עמדות
        <HeaderOptionsMenu
          items={[
            {
              label: 'מחק את כל העמדות',
              variant: 'danger',
              onSelect: handleRemoveAll,
            },
          ]}
        />
      </header>

      <div className="flex flex-col gap-3 p-3">
        <section className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 flex flex-col gap-2 shadow-sm">
          <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-wide">עמדה נוכחית</h2>
          {currentPosition ? (
            <PositionCard
              position={currentPosition}
              isCurrent
              onClick={() => setEditingItem(currentPosition)}
              menuItems={getPositionMenuItems(currentPosition)}
            />
          ) : (
            <p className="text-xs text-neutral-400 text-center py-2">
              לא נבחרה עמדה נוכחית
            </p>
          )}
        </section>

        <hr className="border-0 border-t-2 border-dashed border-neutral-300" />

        <section className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-3 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wide">עמדות מאגר</h2>
            {hasAnySavedPositions ? (
              <span className="shrink-0 text-xs text-neutral-500 font-medium">{storedPositions.length} עמדות</span>
            ) : null}
          </div>

          {storedPositions.length > 0 && (
            <PositionSearchBar searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
          )}

          {archiveIsEmpty && searchQuery === '' && (
            <p className="text-center text-neutral-400 py-3 text-sm border border-dashed border-neutral-200 rounded-xl">
              {archiveEmptyMessage}
            </p>
          )}

          {storedPositions.length > 0 && filteredStoredPositions.length === 0 && searchQuery !== '' && (
            <p className="text-center text-neutral-400 py-3 text-sm">לא נמצאו תוצאות</p>
          )}

          <div className="flex flex-col gap-3">
            {filteredStoredPositions.map((position) => (
              <PositionCard
                key={position.id}
                position={position}
                onClick={() => setEditingItem(position)}
                menuItems={getPositionMenuItems(position)}
              />
            ))}
          </div>
        </section>

        {showForm && (
          <Modal title="הוסף עמדה" onClose={() => setShowForm(false)}>
            <PositionForm onSubmit={handleAdd} submitLabel="הוסף" />
          </Modal>
        )}

        {editingItem && (
          <Modal title="עריכת עמדה" onClose={() => setEditingItem(null)}>
            <PositionForm onSubmit={handleEdit} submitLabel="שמור שינויים" initialValues={editingItem} />
          </Modal>
        )}

        {promotingPosition && (
          <Modal title="הגדרה כעמדה נוכחית" onClose={() => setPromotingPosition(null)}>
            <CurrentPositionForm
              onSubmit={handlePromoteToCurrent}
              initialValues={promotingPosition}
              submitLabel="הפוך לעמדה נוכחית"
            />
          </Modal>
        )}

        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full py-2.5 rounded-xl border-2 border-dashed border-neutral-300 text-neutral-500 font-semibold text-sm active:bg-neutral-100 transition-colors touch-manipulation select-none"
          >
            + הוסף עמדה
          </button>
        )}
      </div>
    </div>
  )
}

export default PositionsListScreen
