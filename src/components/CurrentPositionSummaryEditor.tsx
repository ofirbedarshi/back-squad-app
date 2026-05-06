import { useEffect, useState } from 'react'
import Modal from './base/Modal'
import SummaryEditCard from './base/SummaryEditCard'
import PositionForm from './PositionForm'
import { loadCurrentPositionUseCase } from '../useCases/loadCurrentPosition'
import { updatePositionUseCase } from '../useCases/updatePosition'
import type { Position, PositionInput } from '../domain/position.types'

function CurrentPositionSummaryEditor() {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null)
  const [showCurrentPositionModal, setShowCurrentPositionModal] = useState(false)

  useEffect(() => {
    setCurrentPosition(loadCurrentPositionUseCase())
  }, [])

  function handleCurrentPositionSave(updatedPositionData: PositionInput) {
    if (!currentPosition) {
      return
    }

    updatePositionUseCase(currentPosition.id, updatedPositionData)
    setCurrentPosition(loadCurrentPositionUseCase())
    setShowCurrentPositionModal(false)
  }

  const east = currentPosition?.coordinates.east ?? ''
  const north = currentPosition?.coordinates.north ?? ''
  const summary = currentPosition ? (
    <p className="line-clamp-2">
      <span className="font-semibold text-neutral-800">עמדה נוכחית:</span> {currentPosition.stationName} | נ"צ {east} / {north} | גובה {currentPosition.altitude} מ'
    </p>
  ) : (
    <p className="truncate">לא נבחרה עמדה נוכחית</p>
  )

  return (
    <>
      <SummaryEditCard
        summary={summary}
        onEdit={() => setShowCurrentPositionModal(true)}
        editButtonLabel="ערוך עמדה נוכחית"
        disabled={!currentPosition}
      />

      {showCurrentPositionModal && currentPosition && (
        <Modal title="עריכת עמדה נוכחית" onClose={() => setShowCurrentPositionModal(false)}>
          <PositionForm onSubmit={handleCurrentPositionSave} submitLabel="שמור שינויים" initialValues={currentPosition} />
        </Modal>
      )}
    </>
  )
}

export default CurrentPositionSummaryEditor
