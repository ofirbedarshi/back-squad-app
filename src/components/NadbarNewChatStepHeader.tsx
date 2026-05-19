import NadbarLinksToolbar from './NadbarLinksToolbar'
import type { NadbarLinksUpdate, NadbarType } from '../domain/nadbar.types'
import { getNadbarTypeLabel } from '../utils/nadbarDisplay'

interface NadbarNewChatStepHeaderProps {
  nadbarType: NadbarType
  pointerId?: string
  targetId?: string
  onLinksChange: (links: NadbarLinksUpdate) => void
  onSave: () => void
}

function NadbarNewChatStepHeader({
  nadbarType,
  pointerId,
  targetId,
  onLinksChange,
  onSave,
}: NadbarNewChatStepHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center gap-2 border-b border-neutral-200 shrink-0">
      <span className="flex-1 text-center font-bold text-lg text-neutral-800 truncate px-1 min-w-0">
        הוסף · {getNadbarTypeLabel(nadbarType)}
      </span>
      <div className="flex items-center gap-1 shrink-0">
        <NadbarLinksToolbar pointerId={pointerId} targetId={targetId} onLinksChange={onLinksChange} />
        <button
          type="button"
          onClick={onSave}
          className="text-sm font-bold text-white bg-blue-600 rounded-xl px-3 py-1.5 active:bg-blue-700 touch-manipulation"
        >
          שמור
        </button>
      </div>
    </header>
  )
}

export default NadbarNewChatStepHeader
