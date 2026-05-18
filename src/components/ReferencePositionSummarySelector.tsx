import { useMemo, useState } from 'react'
import PositionCurrentArchiveBadge from './base/PositionCurrentArchiveBadge'
import SummaryEditCard from './base/SummaryEditCard'
import PositionPickerModal from './PositionPickerModal'
import { useReferencePosition } from '../hooks/useReferencePosition'
import { useCurrentPosition } from '../hooks/useCurrentPosition'
import { loadPositionsUseCase } from '../useCases/loadPositions'
import { setReferencePositionIdUseCase } from '../useCases/setReferencePositionId'
import type { Position } from '../domain/position.types'

function ReferencePositionSummarySelector() {
  const referencePosition = useReferencePosition()
  const currentPosition = useCurrentPosition()
  const [showPicker, setShowPicker] = useState(false)

  /** Re-read storage when the modal opens so the list matches other screens. */
  const positions = useMemo(() => loadPositionsUseCase(), [showPicker])

  function handlePick(position: Position) {
    setReferencePositionIdUseCase(position.id)
  }

  const east = referencePosition?.coordinates.east ?? ''
  const north = referencePosition?.coordinates.north ?? ''
  const isCurrentPosition = referencePosition != null && referencePosition.id === currentPosition?.id
  const summary = referencePosition ? (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <p className="font-semibold text-neutral-800">עמדת ייחוס:</p>
        <PositionCurrentArchiveBadge isCurrentStation={isCurrentPosition} />
      </div>
      <p className="line-clamp-1">
        <span className="font-medium text-neutral-800">{referencePosition.stationName}</span> | נ"צ {north} / {east}
      </p>
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

      <PositionPickerModal
        open={showPicker}
        title="בחר עמדת ייחוס"
        onClose={() => setShowPicker(false)}
        positions={positions}
        currentStationId={currentPosition?.id}
        selectedPositionId={referencePosition?.id ?? null}
        onPick={handlePick}
      />
    </>
  )
}

export default ReferencePositionSummarySelector
