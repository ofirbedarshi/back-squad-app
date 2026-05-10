import { useMemo, useState } from 'react'
import Modal from './base/Modal'
import SummaryEditCard from './base/SummaryEditCard'
import PositionCard from './PositionCard'
import { useReferencePosition } from '../hooks/useReferencePosition'
import { useCurrentPosition } from '../hooks/useCurrentPosition'
import { loadExplicitReferencePositionIdUseCase } from '../useCases/loadExplicitReferencePositionId'
import { loadPositionsUseCase } from '../useCases/loadPositions'
import { setReferencePositionIdUseCase } from '../useCases/setReferencePositionId'
import type { Position } from '../domain/position.types'

function ReferencePositionSummarySelector() {
  const referencePosition = useReferencePosition()
  const currentPosition = useCurrentPosition()
  const [showPicker, setShowPicker] = useState(false)
  /** Saved explicit id when the picker opened (`null` = ברירת מחדל לפי עמדה נוכחית). */
  const [baselineExplicitId, setBaselineExplicitId] = useState<string | null>(null)
  /** Pending choice until the user taps שמור. */
  const [draftExplicitId, setDraftExplicitId] = useState<string | null>(null)

  /** Re-read storage when the modal opens so the list matches other screens. */
  const positions = useMemo(() => loadPositionsUseCase(), [showPicker])

  const positionsWithCurrentFirst = useMemo(() => {
    const cid = currentPosition?.id
    if (!cid) return positions
    return [...positions].sort((a, b) => {
      if (a.id === cid) return -1
      if (b.id === cid) return 1
      return 0
    })
  }, [positions, currentPosition?.id])

  function openPicker() {
    const baseline = loadExplicitReferencePositionIdUseCase()
    setBaselineExplicitId(baseline)
    setDraftExplicitId(baseline)
    setShowPicker(true)
  }

  function handleSelectPosition(position: Position) {
    setDraftExplicitId(position.id)
  }

  function handleSavePicker() {
    setReferencePositionIdUseCase(draftExplicitId)
    setShowPicker(false)
  }

  const pickerHasChanges = baselineExplicitId !== draftExplicitId

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
        onEdit={openPicker}
        editButtonLabel="בחר עמדת ייחוס"
        disabled={positions.length === 0 && !currentPosition}
      />

      {showPicker && (
        <Modal
          title="בחר עמדת ייחוס"
          onClose={() => setShowPicker(false)}
          onSave={handleSavePicker}
          saveDisabled={!pickerHasChanges}
        >
          <div className="flex flex-col gap-3 px-2">
            {positions.length === 0 ? (
              <p className="text-center text-neutral-500 text-sm py-4">אין עמדות שמורות לבחירה</p>
            ) : (
              positionsWithCurrentFirst.map((position) => {
                const isDraftSelected = draftExplicitId === position.id
                const isCurrentStation = currentPosition?.id === position.id
                return (
                  <PositionCard
                    key={position.id}
                    position={position}
                    isCurrent={isCurrentStation}
                    emphasizeCurrent={false}
                    selected={isDraftSelected}
                    onClick={() => handleSelectPosition(position)}
                  />
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
