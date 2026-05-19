import Modal from './base/Modal'
import TargetCard from './TargetCard'
import type { Target } from '../domain/target.types'

interface TargetPickerModalProps {
  open: boolean
  title: string
  onClose: () => void
  targets: Target[]
  emptyListMessage?: string
  onPick: (target: Target) => void
}

function TargetPickerModal({
  open,
  title,
  onClose,
  targets,
  emptyListMessage = 'אין מטרות שמורות לבחירה',
  onPick,
}: TargetPickerModalProps) {
  if (!open) return null

  function handleCardPick(target: Target) {
    onPick(target)
    onClose()
  }

  return (
    <Modal title={title} onClose={onClose}>
      <div className="flex flex-col gap-3">
        {targets.length === 0 ? (
          <p className="text-center text-neutral-500 text-sm py-6">{emptyListMessage}</p>
        ) : (
          targets.map((target) => (
            <TargetCard key={target.id} target={target} onClick={() => handleCardPick(target)} onLongPress={() => {}} />
          ))
        )}
      </div>
    </Modal>
  )
}

export default TargetPickerModal
