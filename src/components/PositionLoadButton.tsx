import { useMemo, useState } from 'react'
import LoadPickerChip from './base/LoadPickerChip'
import LoadPickerEmptyButton from './base/LoadPickerEmptyButton'
import LoadPickerLargeSelected from './base/LoadPickerLargeSelected'
import PositionCurrentArchiveBadge from './base/PositionCurrentArchiveBadge'
import PositionPickerModal from './PositionPickerModal'
import { useCurrentPosition } from '../hooks/useCurrentPosition'
import type { Position } from '../domain/position.types'
import { loadPositionsUseCase } from '../useCases/loadPositions'

interface PositionLoadButtonProps {
  positionId?: string
  onSelect: (position: Position) => void
  onClear: () => void
  compact?: boolean
  large?: boolean
  loadLabel?: string
  errorMessage?: string
}

function PositionLoadButton({
  positionId,
  onSelect,
  onClear,
  compact = false,
  large = false,
  loadLabel = 'טען עמדה',
  errorMessage,
}: PositionLoadButtonProps) {
  const currentPosition = useCurrentPosition()
  const [showModal, setShowModal] = useState(false)
  const positions = useMemo(() => loadPositionsUseCase(), [showModal])
  const loadedPosition = positions.find((position) => position.id === positionId)
  const isCurrentStation = loadedPosition != null && loadedPosition.id === currentPosition?.id

  function handlePick(position: Position) {
    onSelect(position)
    setShowModal(false)
  }

  function openPicker() {
    setShowModal(true)
  }

  return (
    <>
      {loadedPosition ? (
        large ? (
          <LoadPickerLargeSelected
            displayName={loadedPosition.stationName}
            badge={<PositionCurrentArchiveBadge isCurrentStation={isCurrentStation} />}
            onReplace={openPicker}
            onClear={onClear}
          />
        ) : (
          <LoadPickerChip
            displayName={loadedPosition.stationName}
            onClear={onClear}
            compact={compact}
            clearAriaLabel="נקה עמדה"
          />
        )
      ) : (
        <LoadPickerEmptyButton
          label={loadLabel}
          onClick={openPicker}
          compact={compact}
          large={large}
          errorMessage={errorMessage}
        />
      )}

      <PositionPickerModal
        open={showModal}
        title="בחר עמדה"
        onClose={() => setShowModal(false)}
        positions={positions}
        currentStationId={currentPosition?.id}
        selectedPositionId={positionId}
        onPick={handlePick}
      />
    </>
  )
}

export default PositionLoadButton
