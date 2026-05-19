import { useMemo, useState } from 'react'
import IndicatorPickerModal from './IndicatorPickerModal'
import type { Indicator } from '../domain/indicator.types'
import { loadIndicatorsUseCase } from '../useCases/loadIndicators'

interface IndicatorLoadButtonProps {
  indicatorId?: string
  onSelect: (indicator: Indicator) => void
  onClear: () => void
  compact?: boolean
  large?: boolean
  loadLabel?: string
  errorMessage?: string
}

function IndicatorLoadButton({
  indicatorId,
  onSelect,
  onClear,
  compact = false,
  large = false,
  loadLabel = 'טען מציין',
  errorMessage,
}: IndicatorLoadButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const indicators = useMemo(() => loadIndicatorsUseCase(), [showModal])
  const loadedIndicator = indicators.find((indicator) => indicator.id === indicatorId)

  function handlePick(indicator: Indicator) {
    onSelect(indicator)
    setShowModal(false)
  }

  const chipGap = compact ? 'gap-0.5' : 'gap-1.5'
  const chipMaxW = compact ? 'max-w-[72px]' : large ? 'max-w-none' : 'max-w-[140px]'
  const clearPx = compact ? 'px-0.5' : 'px-1'
  const loadPx = compact ? 'px-2.5 py-1' : large ? 'px-4 py-3.5' : 'px-3 py-1'
  const loadText = large ? 'text-base' : 'text-xs'

  const loadButtonClass = [
    large ? 'w-full rounded-2xl' : 'shrink-0 rounded-full',
    loadText,
    'font-semibold touch-manipulation',
    loadPx,
    errorMessage
      ? 'text-red-600 bg-red-50 border border-red-300 active:bg-red-100'
      : 'text-blue-600 bg-blue-50 border border-blue-200 active:bg-blue-100',
  ].join(' ')

  return (
    <>
      {loadedIndicator ? (
        large ? (
          <div className="w-full flex flex-col items-center gap-3 py-2">
            <span className="text-lg font-bold text-neutral-800 text-center px-2">{loadedIndicator.indicatorName}</span>
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
          <div className={`flex items-center shrink-0 ${chipGap}`}>
            <span
              className={`text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5 truncate ${chipMaxW}`}
            >
              {loadedIndicator.indicatorName}
            </span>
            <button
              type="button"
              onClick={onClear}
              className={`text-neutral-400 text-base leading-none active:text-neutral-600 touch-manipulation ${clearPx}`}
              aria-label="נקה מציין"
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

      <IndicatorPickerModal
        open={showModal}
        title="בחר מציין"
        onClose={() => setShowModal(false)}
        indicators={indicators}
        onPick={handlePick}
      />
    </>
  )
}

export default IndicatorLoadButton
