import { useState } from 'react'
import Modal from './base/Modal'
import SummaryEditCard from './base/SummaryEditCard'
import PositionForm from './PositionForm'
import { useCurrentPosition } from '../hooks/useCurrentPosition'
import { updatePositionUseCase } from '../useCases/updatePosition'
import type { PositionInput } from '../domain/position.types'

function CurrentPositionSummaryEditor() {
  const currentPosition = useCurrentPosition()
  const [showCurrentPositionModal, setShowCurrentPositionModal] = useState(false)

  function handleCurrentPositionSave(updatedPositionData: PositionInput) {
    if (!currentPosition) {
      return
    }

    updatePositionUseCase(currentPosition.id, updatedPositionData)
    setShowCurrentPositionModal(false)
  }

  const east = currentPosition?.coordinates.east ?? ''
  const north = currentPosition?.coordinates.north ?? ''
  const summary = currentPosition ? (
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-neutral-800">עמדה נוכחית:</p>
      <p className="line-clamp-1">
        <span className="font-medium text-neutral-800">{currentPosition.stationName}</span> | נ"צ {east} / {north}
      </p>
      <p className="line-clamp-1">גובה {currentPosition.altitude} מ'</p>
    </div>
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
