import { useMemo } from 'react'
import Modal from './base/Modal'
import PositionCard from './PositionCard'
import { sortPositionsCurrentFirst } from '../domain/sortPositionsCurrentFirst'
import type { Position } from '../domain/position.types'

interface PositionPickerModalProps {
  open: boolean
  title: string
  onClose: () => void
  positions: Position[]
  /** Sort: current station first; also drives "עמדה נוכחית" label on card. */
  currentStationId?: string | null
  /** Blue selection ring on the row matching this id (active reference / form pick). */
  selectedPositionId?: string | null
  emptyListMessage?: string
  /** Tap card: apply choice, then modal closes via onClose. */
  onPick: (position: Position) => void
}

function PositionPickerModal({
  open,
  title,
  onClose,
  positions,
  currentStationId,
  selectedPositionId,
  emptyListMessage = 'אין עמדות שמורות לבחירה',
  onPick,
}: PositionPickerModalProps) {
  const sorted = useMemo(
    () => sortPositionsCurrentFirst(positions, currentStationId ?? undefined),
    [positions, currentStationId]
  )

  if (!open) return null

  function handleCardPick(position: Position) {
    onPick(position)
    onClose()
  }

  return (
    <Modal title={title} onClose={onClose}>
      <div className="flex flex-col gap-3 px-2">
        {sorted.length === 0 ? (
          <p className="text-center text-neutral-500 text-sm py-4">{emptyListMessage}</p>
        ) : (
          sorted.map((position) => {
            const isCurrentStation = currentStationId === position.id
            const selected = selectedPositionId != null && selectedPositionId === position.id
            return (
              <PositionCard
                key={position.id}
                position={position}
                isCurrent={isCurrentStation}
                emphasizeCurrent={false}
                selected={selected}
                onClick={() => handleCardPick(position)}
              />
            )
          })
        )}
      </div>
    </Modal>
  )
}

export default PositionPickerModal
