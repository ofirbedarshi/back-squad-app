import Modal from './base/Modal'
import IndicatorCard from './IndicatorCard'
import type { Indicator } from '../domain/indicator.types'

interface IndicatorPickerModalProps {
  open: boolean
  title: string
  onClose: () => void
  indicators: Indicator[]
  emptyListMessage?: string
  onPick: (indicator: Indicator) => void
}

function IndicatorPickerModal({
  open,
  title,
  onClose,
  indicators,
  emptyListMessage = 'אין מציינים שמורים לבחירה',
  onPick,
}: IndicatorPickerModalProps) {
  if (!open) return null

  function handleCardPick(indicator: Indicator) {
    onPick(indicator)
    onClose()
  }

  return (
    <Modal title={title} onClose={onClose}>
      <div className="flex flex-col gap-3">
        {indicators.length === 0 ? (
          <p className="text-center text-neutral-500 text-sm py-6">{emptyListMessage}</p>
        ) : (
          indicators.map((indicator) => (
            <IndicatorCard
              key={indicator.id}
              indicator={indicator}
              onClick={() => handleCardPick(indicator)}
              onLongPress={() => {}}
            />
          ))
        )}
      </div>
    </Modal>
  )
}

export default IndicatorPickerModal
