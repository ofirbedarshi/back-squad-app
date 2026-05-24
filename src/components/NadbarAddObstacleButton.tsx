import { canAddObstacleGroup } from '../domain/nadbarObstacles'
import { useNadbarBlockChatContext } from './NadbarBlockChatContext'

interface NadbarAddObstacleButtonProps {
  onClick: () => void
}

function NadbarAddObstacleButton({ onClick }: NadbarAddObstacleButtonProps) {
  const { messageVars } = useNadbarBlockChatContext()

  if (!canAddObstacleGroup(messageVars)) {
    return null
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-3 rounded-xl bg-neutral-700 text-white font-semibold text-sm active:bg-neutral-800 transition-colors touch-manipulation select-none"
      aria-label="הוסף הסתר"
    >
      הוסף הסתר
    </button>
  )
}

export default NadbarAddObstacleButton
