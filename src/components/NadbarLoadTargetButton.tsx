import TargetLoadButton from './TargetLoadButton'
import type { Target } from '../domain/target.types'

interface NadbarLoadTargetButtonProps {
  targetId?: string
  onSelect: (target: Target) => void
  onClear: () => void
}

function NadbarLoadTargetButton({ targetId, onSelect, onClear }: NadbarLoadTargetButtonProps) {
  return (
    <TargetLoadButton
      targetId={targetId}
      onSelect={onSelect}
      onClear={onClear}
      loadLabel="טען מטרה"
    />
  )
}

export default NadbarLoadTargetButton
