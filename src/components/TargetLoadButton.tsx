import { useMemo, useState } from 'react'
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

  const chipGap = compact ? 'gap-0.5' : 'gap-1.5'
  const chipMaxW = compact ? 'max-w-[72px]' : large ? 'max-w-none' : 'max-w-[140px]'

  const loadButtonClass = [
    large ? 'w-full rounded-2xl' : 'shrink-0 rounded-full',
    large ? 'text-base' : 'text-xs',
    'font-semibold touch-manipulation',
    compact ? 'px-2.5 py-1' : large ? 'px-4 py-3.5' : 'px-3 py-1',
    errorMessage
      ? 'text-red-600 bg-red-50 border border-red-300 active:bg-red-100'
      : 'text-blue-600 bg-blue-50 border border-blue-200 active:bg-blue-100',
  ].join(' ')

  return (
    <>
      {loadedTarget ? (
        large ? (
          <div className="w-full flex flex-col items-center gap-3 py-2">
            <span className="text-lg font-bold text-neutral-800 text-center px-2">{loadedTarget.targetName}</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="text-sm font-semibold text-blue-600 active:opacity-70 touch-manipulation"
              >
                החלף
              </button>
              <button
                type="button"
                onClick={onClear}
                className="text-sm font-semibold text-neutral-500 active:opacity-70 touch-manipulation"
              >
                נקה
              </button>
            </div>
          </div>
        ) : (
          <div className={['flex items-center shrink-0', chipGap].join(' ')}>
            <span
              className={[
                'text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5 truncate',
                chipMaxW,
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
        )
      ) : (
        <button type="button" onClick={() => setShowModal(true)} className={loadButtonClass}>
          {loadLabel}
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
