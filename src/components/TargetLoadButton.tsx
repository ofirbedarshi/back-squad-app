import { useMemo, useState } from 'react'
import TargetPickerModal from './TargetPickerModal'
import type { Target } from '../domain/target.types'
import { loadTargetsUseCase } from '../useCases/loadTargets'

interface TargetLoadButtonProps {
  targetId?: string
  onSelect: (target: Target) => void
  onClear: () => void
  compact?: boolean
  errorMessage?: string
}

function TargetLoadButton({ targetId, onSelect, onClear, compact = false, errorMessage }: TargetLoadButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const targets = useMemo(() => loadTargetsUseCase(), [showModal])
  const loadedTarget = targets.find((target) => target.id === targetId)

  function handlePick(target: Target) {
    onSelect(target)
  }

  return (
    <>
      {loadedTarget ? (
        <div className={['flex items-center shrink-0', compact ? 'gap-0.5' : 'gap-1.5'].join(' ')}>
          <span
            className={[
              'text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5 truncate',
              compact ? 'max-w-[72px]' : 'max-w-[140px]',
            ].join(' ')}
          >
            {loadedTarget.targetName}
          </span>
          <button
            type="button"
            onClick={onClear}
            className={[
              'text-neutral-400 text-base leading-none active:text-neutral-600 touch-manipulation',
              compact ? 'px-0.5' : 'px-1',
            ].join(' ')}
            aria-label="נקה מטרה"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className={[
            'shrink-0 text-xs font-semibold rounded-full touch-manipulation',
            compact ? 'px-2.5 py-1' : 'px-3 py-1',
            errorMessage
              ? 'text-red-600 bg-red-50 border border-red-300 active:bg-red-100'
              : 'text-blue-600 bg-blue-50 border border-blue-200 active:bg-blue-100',
          ].join(' ')}
        >
          טען מטרה
        </button>
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
