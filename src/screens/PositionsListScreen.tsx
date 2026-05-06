import { useState, useEffect } from 'react'
import PositionCard from '../components/PositionCard'
import PositionForm from '../components/PositionForm'
import Modal from '../components/base/Modal'
import { useCurrentPosition } from '../hooks/useCurrentPosition'
import { useDomainError } from '../hooks/useDomainError'
import { useUIError } from '../hooks/useUIError'
import { addPositionUseCase } from '../useCases/addPosition'
import { loadPositionsUseCase } from '../useCases/loadPositions'
import { updatePositionUseCase } from '../useCases/updatePosition'
import type { Position, PositionInput } from '../domain/position.types'

function PositionsListScreen() {
  const [positions, setPositions] = useState<Position[]>([])
  const currentPosition = useCurrentPosition()
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Position | null>(null)
  const { triggerError } = useDomainError()
  const { reportUIError } = useUIError()

  useEffect(() => {
    setPositions(loadPositionsUseCase())
  }, [])

  function handleAdd(data: PositionInput) {
    addPositionUseCase(data)
    setPositions(loadPositionsUseCase())
    setShowForm(false)
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
    } catch {
      triggerError('שמירת השינויים נכשלה. אנא נסה שנית.')
    }
  }

  const currentPositionId = currentPosition?.id ?? null
  const storedPositions = positions.filter((position) => position.id !== currentPositionId)

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        עמדות
      </header>

      <div className="flex flex-col gap-4 p-4">
        <section className="rounded-2xl border border-neutral-200 bg-white p-3 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-800">עמדה נוכחית</h2>
          </div>
          {currentPosition ? (
            <PositionCard position={currentPosition} isCurrent onClick={() => setEditingItem(currentPosition)} />
          ) : (
            <p className="text-sm text-neutral-500 bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-center">
              לא נבחרה עמדה נוכחית
            </p>
          )}
        </section>

        <hr className="border-0 border-t-2 border-dashed border-neutral-300" />

        <section className="rounded-2xl border border-neutral-200 bg-white p-3 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-800">עמדות מאגר</h2>
            <span className="text-xs text-neutral-500 font-medium">{storedPositions.length} עמדות</span>
          </div>

          {storedPositions.length === 0 && (
            <p className="text-center text-neutral-400 py-5 border border-dashed border-neutral-200 rounded-xl">
              אין עמדות נוספות במאגר
            </p>
          )}

          {storedPositions.map((position) => (
            <PositionCard key={position.id} position={position} onClick={() => setEditingItem(position)} />
          ))}
        </section>

        {positions.length === 0 && !showForm && (
          <p className="text-center text-neutral-400 py-2">אין עמדות שמורות</p>
        )}

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

        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-500 font-semibold text-base active:bg-neutral-100 transition-colors touch-manipulation select-none"
          >
            + הוסף עמדה
          </button>
        )}
      </div>
    </div>
  )
}

export default PositionsListScreen
