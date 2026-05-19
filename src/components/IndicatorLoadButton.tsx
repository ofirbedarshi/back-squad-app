import { useMemo, useState } from 'react'
import LoadPickerChip from './base/LoadPickerChip'
import LoadPickerEmptyButton from './base/LoadPickerEmptyButton'
import LoadPickerLargeSelected from './base/LoadPickerLargeSelected'
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

  function openPicker() {
    setShowModal(true)
  }

  return (
    <>
      {loadedIndicator ? (
        large ? (
          <LoadPickerLargeSelected
            displayName={loadedIndicator.indicatorName}
            onReplace={openPicker}
            onClear={onClear}
          />
        ) : (
          <LoadPickerChip
            displayName={loadedIndicator.indicatorName}
            onClear={onClear}
            compact={compact}
            clearAriaLabel="נקה מציין"
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
