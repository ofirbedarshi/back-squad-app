import { useMemo, useState } from 'react'
import LoadPickerChip from './base/LoadPickerChip'
import LoadPickerEmptyButton from './base/LoadPickerEmptyButton'
import LoadPickerLargeSelected from './base/LoadPickerLargeSelected'
import TargetPickerModal from './TargetPickerModal'
import type { Target } from '../domain/target.types'
import type { LoadPickerVariant } from './loadPicker.types'
import { loadTargetsUseCase } from '../useCases/loadTargets'

interface TargetLoadButtonProps {
  targetId?: string
  onSelect: (target: Target) => void
  onClear: () => void
  variant?: LoadPickerVariant
  loadLabel?: string
  errorMessage?: string
}

function TargetLoadButton({
  targetId,
  onSelect,
  onClear,
  variant = 'default',
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
        variant === 'section' ? (
          <LoadPickerLargeSelected
            displayName={loadedTarget.targetName}
            onReplace={openPicker}
            onClear={onClear}
          />
        ) : (
          <LoadPickerChip displayName={loadedTarget.targetName} onClear={onClear} dense={variant === 'toolbar'} clearAriaLabel="נקה מטרה" />
        )
      ) : (
        <LoadPickerEmptyButton
          label={loadLabel}
          onClick={openPicker}
          variant={variant}
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
