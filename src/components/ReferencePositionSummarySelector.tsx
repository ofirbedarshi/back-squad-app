import { useEffect, useState } from 'react'
import Modal from './base/Modal'
import SummaryEditCard from './base/SummaryEditCard'
import PositionCard from './PositionCard'
import { useReferencePosition } from '../hooks/useReferencePosition'
import { useCurrentPosition } from '../hooks/useCurrentPosition'
import { loadPositionsUseCase } from '../useCases/loadPositions'
import { setReferencePositionIdUseCase } from '../useCases/setReferencePositionId'
import type { Position } from '../domain/position.types'

function ReferencePositionSummarySelector() {
  const referencePosition = useReferencePosition()
  const currentPosition = useCurrentPosition()
  const [showPicker, setShowPicker] = useState(false)
  const [positions, setPositions] = useState<Position[]>(() => loadPositionsUseCase())

  useEffect(() => {
    if (!showPicker) return
    setPositions(loadPositionsUseCase())
  }, [showPicker])

  function handleSelect(position: Position) {
    setReferencePositionIdUseCase(position.id)
    setShowPicker(false)
  }

  function handleUseCurrentAsReference() {
    setReferencePositionIdUseCase(null)
    setShowPicker(false)
  }

  const east = referencePosition?.coordinates.east ?? ''
  const north = referencePosition?.coordinates.north ?? ''
  const summary = referencePosition ? (
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-neutral-800">עמדת ייחוס:</p>
      <p className="line-clamp-1">
        <span className="font-medium text-neutral-800">{referencePosition.stationName}</span> | נ"צ {east} / {north}
      </p>
      <p className="line-clamp-1">גובה {referencePosition.altitude} מ'</p>
    </div>
  ) : (
    <p className="truncate">לא נבחרה עמדה (אין עמדה נוכחית ולא נבחרה עמדת ייחוס)</p>
  )

  return (
    <>
      <SummaryEditCard
        summary={summary}
        onEdit={() => setShowPicker(true)}
        editButtonLabel="בחר עמדת ייחוס"
        disabled={positions.length === 0 && !currentPosition}
      />

      {showPicker && (
        <Modal title="בחר עמדת ייחוס" onClose={() => setShowPicker(false)}>
          <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
            {currentPosition && (
              <button
                type="button"
                onClick={handleUseCurrentAsReference}
                className="text-right text-sm font-semibold text-blue-700 py-2 px-3 rounded-xl border border-blue-200 bg-blue-50 active:bg-blue-100 touch-manipulation"
              >
                ברירת מחדל: לפי העמדה הנוכחית
              </button>
            )}

            {positions.length === 0 ? (
              <p className="text-center text-neutral-500 text-sm py-4">אין עמדות שמורות לבחירה</p>
            ) : (
              positions.map((position) => {
                const isSelectedReference = referencePosition?.id === position.id
                const isCurrentStation = currentPosition?.id === position.id
                return (
                  <div
                    key={position.id}
                    className={isSelectedReference ? 'rounded-2xl ring-2 ring-blue-400 ring-offset-1' : ''}
                  >
                    <PositionCard
                      position={position}
                      isCurrent={isCurrentStation}
                      onClick={() => handleSelect(position)}
                    />
                  </div>
                )
              })
            )}
          </div>
        </Modal>
      )}
    </>
  )
}

export default ReferencePositionSummarySelector
