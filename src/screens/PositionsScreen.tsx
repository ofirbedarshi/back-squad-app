import { useState, useEffect } from 'react'
import PositionCard from '../components/PositionCard'
import PositionForm from '../components/PositionForm'
import Modal from '../components/base/Modal'
import { addPositionUseCase } from '../useCases/addPosition'
import { loadPositionsUseCase } from '../useCases/loadPositions'
import type { Position, PositionInput } from '../domain/position.types'

function PositionsScreen() {
  const [positions, setPositions] = useState<Position[]>([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setPositions(loadPositionsUseCase())
  }, [])

  function handleAdd(data: PositionInput) {
    addPositionUseCase(data)
    setPositions(loadPositionsUseCase())
    setShowForm(false)
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        עמדות
      </header>

      <div className="flex flex-col gap-3 p-4">
        {positions.length === 0 && !showForm && (
          <p className="text-center text-neutral-400 py-8">אין עמדות שמורות</p>
        )}

        {positions.map((position) => (
          <PositionCard key={position.id} position={position} />
        ))}

        {showForm && (
          <Modal title="הוסף עמדה" onClose={() => setShowForm(false)}>
            <PositionForm onSubmit={handleAdd} submitLabel="הוסף" />
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

export default PositionsScreen
