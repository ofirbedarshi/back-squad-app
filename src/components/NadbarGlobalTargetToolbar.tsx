import TargetLoadButton from './TargetLoadButton'
import type { Target } from '../domain/target.types'

interface NadbarGlobalTargetToolbarProps {
  targetId?: string
  onSelect: (target: Target) => void
  onClear: () => void
  replaceMode?: boolean
}

function NadbarGlobalTargetToolbar({
  targetId,
  onSelect,
  onClear,
  replaceMode = false,
}: NadbarGlobalTargetToolbarProps) {
  const loadLabel = replaceMode ? 'החלף מטרה' : 'טען מטרה'

  return (
    <TargetLoadButton
      variant="toolbar"
      loadLabel={loadLabel}
      targetId={targetId}
      onSelect={onSelect}
      onClear={onClear}
    />
  )
}

export default NadbarGlobalTargetToolbar
