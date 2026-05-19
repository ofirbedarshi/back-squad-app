import { useMemo, useState } from 'react'
import LoadPickerChip from './base/LoadPickerChip'
import LoadPickerEmptyButton from './base/LoadPickerEmptyButton'
import LoadPickerLargeSelected from './base/LoadPickerLargeSelected'
import TargetPickerModal from './TargetPickerModal'
import type { Target } from '../domain/target.types'
import { loadTargetsUseCase } from '../useCases/loadTargets'

interface TargetLoadButtonProps {
  targetId?: string
  onSelect: (target: Target) => void
  onClear: () => void
  compact?: boolean
  large?: boolean
  loadLabel?: string
  errorMessage?: string
}

function TargetLoadButton({
  targetId,
  onSelect,
  onClear,
  compact = false,
  large = false,
  loadLabel = 'טען מטרה',
  errorMessage,
}: TargetLoadButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const targets = useMemo(() => loadTargetsUseCase(), [showModal])
  const loadedTarget = targets.find((target) => target.id === targetId)

  function handlePick(target: Target) {
    onSelect(target)
    setShowModal(false)
  }

  function openPicker() {
    setShowModal(true)
  }

  return (
    <>
      {loadedTarget ? (
        large ? (
          <LoadPickerLargeSelected
            displayName={loadedTarget.targetName}
            onReplace={openPicker}
            onClear={onClear}
          />
        ) : (
          <LoadPickerChip displayName={loadedTarget.targetName} onClear={onClear} compact={compact} clearAriaLabel="נקה מטרה" />
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

      <TargetPickerModal
        open={showModal}
        title="בחר מטרה"
        onClose={() => setShowModal(false)}
        targets={targets}
        onPick={handlePick}
      />
    </>
  )
}

export default TargetLoadButton
